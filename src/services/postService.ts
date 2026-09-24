import { CommunityPost, PostComment } from '../types/post';
import { NotificationService } from './notificationService';
import { db, sanitizeForFirestore } from './firebaseConfig';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const STORAGE_KEY_POSTS = 'ethio_community_posts';
const STORAGE_KEY_LIKES = 'ethio_community_user_likes';
const STORAGE_KEY_BOOKMARKS = 'ethio_community_user_bookmarks';
const STORAGE_KEY_DELETED = 'ethio_community_deleted_posts';

export function getDeletedPostIds(): string[] {
  try {
    const list: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED) || '[]');
    // Clean out any real posts that were erroneously blacklisted by older client code.
    // Only 'post-tip-3' (the legacy mock) should remain suppressed.
    const cleaned = list.filter((id) => id === 'post-tip-3');
    try {
      localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(cleaned));
    } catch {}
    return cleaned;
  } catch {
    return ['post-tip-3'];
  }
}

/**
 * Universal parser for Google Cloud Firestore REST API field values.
 * Allows 100% reliable direct HTTP/REST sync across all mobile devices & network conditions.
 */
export function parseFirestoreRestFields(fields: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, val] of Object.entries(fields)) {
    if (!val || typeof val !== 'object') continue;
    if (val.stringValue !== undefined) result[key] = val.stringValue;
    else if (val.booleanValue !== undefined) result[key] = val.booleanValue;
    else if (val.integerValue !== undefined) result[key] = parseInt(val.integerValue, 10);
    else if (val.doubleValue !== undefined) result[key] = parseFloat(val.doubleValue);
    else if (val.timestampValue !== undefined) result[key] = val.timestampValue;
    else if (val.arrayValue !== undefined) {
      const values = val.arrayValue.values || [];
      result[key] = values.map((item: any) => {
        if (!item || typeof item !== 'object') return item;
        if (item.stringValue !== undefined) return item.stringValue;
        if (item.mapValue !== undefined) return parseFirestoreRestFields(item.mapValue.fields || {});
        return item;
      });
    } else if (val.mapValue !== undefined) {
      result[key] = parseFirestoreRestFields(val.mapValue.fields || {});
    } else if (val.nullValue !== undefined) {
      result[key] = null;
    }
  }
  return result;
}

export const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: 'post-guide-2',
    author: 'Ethiopian Textbooks Hub',
    authorRole: 'admin',
    title: 'Welcome to Ethiopian Textbooks & EUEE Hub! 🇪🇹',
    content:
      'Welcome new students and teachers! Your offline digital library and entrance exam simulator is now ready. Access official Ethiopian Ministry of Education Grade 9-12 textbooks, teacher guides, unit summaries, and national EUEE model exams with zero internet required once downloaded.',
    category: 'Curriculum Update',
    grade: 'All Grades (9-12)',
    subject: 'All Subjects & Guides',
    date: new Date(Date.now() - 3600000 * 1).toISOString(),
    likes: 54,
    comments: [],
    pinned: false,
    isOfficial: true,
    linkUrl: 'https://t.me/Ethiopianstudentbooks',
    linkTitle: 'Join High School Telegram Community (@Ethiopianstudentbooks)',
    linkType: 'telegram',
    imageUrl: '/brand/welcome-banner.jpg',
    imageCaption: 'Official Welcome Guide for New Ethiopian Textbooks App Downloaders',
  },
  {
    id: 'post-official-1',
    author: 'Exam Practice Hub',
    authorRole: 'admin',
    title: 'Official Grade 12 EUEE / Matric National Exam Practice Hub',
    content:
      'All Grade 12 Natural and Social Science students nationwide are invited to practice with authentic past papers and 50-question mock exams covering high-yield syllabus concepts across Grades 9, 10, 11, and 12 with detailed explanations!',
    category: 'Exam Announcement',
    grade: 'Grade 12 (EUEE / Matric)',
    subject: 'Physics, Chemistry, Math & Social',
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    likes: 42,
    comments: [],
    pinned: false,
    isOfficial: true,
    actionUrl: 'tab:examprep',
    linkUrl: 'https://eaes.et',
    linkTitle: 'Official EAES Examination Portal',
    linkType: 'portal',
    imageUrl: '/brand/exam-prep-banner.jpg',
    imageCaption: 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator',
  },
];

export const PostService = {
  // Get all posts with user like & bookmark state
  getPosts(): CommunityPost[] {
    try {
      const deletedIds = getDeletedPostIds();
      const data = localStorage.getItem(STORAGE_KEY_POSTS);
      const userLikes: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES) || '[]');
      const userBookmarks: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]');
      let posts: CommunityPost[] = data ? JSON.parse(data) : DEFAULT_POSTS;
      posts = posts.filter((p) => p && p.id && !deletedIds.includes(p.id));

      return posts.map((p) => {
        let author = p.author;
        let authorRole = p.authorRole;
        let isOfficial = p.isOfficial;
        let pinned = p.pinned;
        let title = p.title;
        let content = p.content;
        let imageUrl = p.imageUrl;
        let imageCaption = p.imageCaption;
        let subject = p.subject;

        // Auto-migrate legacy mock attribution to Admin @lalion
        if (p.id === 'post-tip-3' && (p.author === 'Chala Desta' || p.authorRole === 'student')) {
          author = 'Admin @lalion';
          authorRole = 'admin';
          isOfficial = true;
          pinned = true;
        }

        // Auto-migrate legacy attribution to Exam Practice Hub & banner
        if (p.id === 'post-official-1') {
          if (p.author.includes('Educational Assessment') || !p.author) {
            author = 'Exam Practice Hub';
          }
          if (p.imageUrl?.includes('unsplash') || !p.imageUrl) {
            imageUrl = '/brand/exam-prep-banner.jpg';
            imageCaption = 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator';
          }
        }

        // Auto-migrate post-guide-2 to new welcome banner for new downloaders
        if (p.id === 'post-guide-2') {
          title = 'Welcome to Ethiopian Textbooks & EUEE Hub! 🇪🇹';
          content = 'Welcome new students and teachers! Your offline digital library and entrance exam simulator is now ready. Access official Ethiopian Ministry of Education Grade 9-12 textbooks, teacher guides, unit summaries, and national EUEE model exams with zero internet required once downloaded.';
          imageUrl = '/brand/welcome-banner.jpg';
          imageCaption = 'Official Welcome Guide for New Ethiopian Textbooks App Downloaders';
          subject = 'All Subjects & Guides';
          delete (p as any).actionUrl;
        }

        return {
          ...p,
          author,
          authorRole,
          isOfficial,
          pinned,
          title: p.title?.replace(/ESSLCE/g, 'EUEE') || '',
          content: p.content?.replace(/ESSLCE/g, 'EUEE') || '',
          grade: p.grade?.replace(/ESSLCE/g, 'EUEE') || 'All Grades',
          linkUrl: p.linkUrl?.includes('ethio_students_grade9_12')
            ? 'https://t.me/Ethiopianstudentbooks'
            : p.linkUrl,
          linkTitle: p.linkUrl?.includes('ethio_students_grade9_12')
            ? 'Join High School Telegram Community (@Ethiopianstudentbooks)'
            : p.linkTitle,
          likedByMe: userLikes.includes(p.id),
          isBookmarked: userBookmarks.includes(p.id),
        };
      });
    } catch {
      return DEFAULT_POSTS;
    }
  },

  // Save posts to localStorage
  savePosts(posts: CommunityPost[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
    } catch (e) {
      console.error('Error saving posts:', e);
    }
  },

  // Real-time Firestore sync listener across all devices
  subscribeToPosts(callback: (posts: CommunityPost[]) => void): () => void {
    try {
      // Query official announcements in real time without index dependencies
      const coll = collection(db, 'official_announcements');

      const unsubscribe = onSnapshot(
        coll,
        (snapshot) => {
          let userLikes: string[] = [];
          let userBookmarks: string[] = [];
          try {
            userLikes = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES) || '[]');
            userBookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]');
          } catch {}

          const deletedIds = getDeletedPostIds();

          // 1. Base map initialized with default official announcements (excluding explicitly deleted legacy mocks)
          const postMap = new Map<string, CommunityPost>();
          DEFAULT_POSTS.forEach((p) => {
            if (!deletedIds.includes(p.id)) {
              postMap.set(p.id, { ...p });
            }
          });

          // 2. Authoritative remote Firestore posts overwrite/populate the feed
          snapshot.forEach((docSnap) => {
            if (docSnap.id.startsWith('test_')) return;
            const data = docSnap.data() as CommunityPost;
            if (data && data.title && !data.isDeleted) {
              const postItem: CommunityPost = {
                ...data,
                id: docSnap.id,
              };

              if (postItem.id === 'post-official-1') {
                if (postItem.author.includes('Educational Assessment') || !postItem.author) {
                  postItem.author = 'Exam Practice Hub';
                }
                if (postItem.imageUrl?.includes('unsplash') || !postItem.imageUrl) {
                  postItem.imageUrl = '/brand/exam-prep-banner.jpg';
                  postItem.imageCaption = 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator';
                }
              }
              if (postItem.id === 'post-guide-2') {
                postItem.title = 'Welcome to Ethiopian Textbooks & EUEE Hub! 🇪🇹';
                postItem.content = 'Welcome new students and teachers! Your offline digital library and entrance exam simulator is now ready. Access official Ethiopian Ministry of Education Grade 9-12 textbooks, teacher guides, unit summaries, and national EUEE model exams with zero internet required once downloaded.';
                postItem.imageUrl = '/brand/welcome-banner.jpg';
                postItem.imageCaption = 'Official Welcome Guide for New Ethiopian Textbooks App Downloaders';
                postItem.subject = 'All Subjects & Guides';
                delete (postItem as any).actionUrl;
              }

              postMap.set(postItem.id, postItem);
            }
          });

          // 3. Convert to array and format/sort: pinned first, then newest date
          const mergedPosts = Array.from(postMap.values())
            .filter((p) => p && p.title && !p.id.startsWith('test_'))
            .map((p) => ({
              ...p,
              title: p.title?.replace(/ESSLCE/g, 'EUEE') || '',
              content: p.content?.replace(/ESSLCE/g, 'EUEE') || '',
              grade: p.grade?.replace(/ESSLCE/g, 'EUEE') || 'All Grades',
              linkUrl: p.linkUrl?.includes('ethio_students_grade9_12')
                ? 'https://t.me/Ethiopianstudentbooks'
                : p.linkUrl,
              linkTitle: p.linkUrl?.includes('ethio_students_grade9_12')
                ? 'Join High School Telegram Community (@Ethiopianstudentbooks)'
                : p.linkTitle,
              likedByMe: userLikes.includes(p.id),
              isBookmarked: userBookmarks.includes(p.id),
            }))
            .sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

          this.savePosts(mergedPosts);
          callback(mergedPosts);

          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('posts-changed'));
          }
        },
        (error) => {
          console.warn('Firestore announcements listener notice:', error);
        }
      );

      return () => {
        unsubscribe();
      };
    } catch (e) {
      console.warn('Error subscribing to Firestore announcements:', e);
      return () => {};
    }
  },

  // Guaranteed Direct REST Sync from Cloud Firestore (100% reliable across all Android devices & networks)
  async syncPostsFromRemote(callback?: (posts: CommunityPost[]) => void): Promise<CommunityPost[]> {
    try {
      const url = 'https://firestore.googleapis.com/v1/projects/ethiopian-textbooks/databases/(default)/documents/official_announcements?pageSize=100';
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        console.warn('REST official_announcements fetch warning, status:', res.status);
        return this.getPosts();
      }
      const data = await res.json();
      const docs = data.documents || [];

      let userLikes: string[] = [];
      let userBookmarks: string[] = [];
      try {
        userLikes = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES) || '[]');
        userBookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]');
      } catch {}

      const deletedIds = getDeletedPostIds();
      const postMap = new Map<string, CommunityPost>();
      DEFAULT_POSTS.forEach((p) => {
        if (!deletedIds.includes(p.id)) {
          postMap.set(p.id, { ...p });
        }
      });

      docs.forEach((d: any) => {
        const id = d.name?.split('/').pop();
        if (!id || id.startsWith('test_') || deletedIds.includes(id)) return;
        const parsed = parseFirestoreRestFields(d.fields || {}) as CommunityPost;
        if (parsed && parsed.title && !parsed.isDeleted) {
          postMap.set(id, { ...parsed, id });
        }
      });

      const mergedPosts = Array.from(postMap.values())
        .filter((p) => p && p.title && !p.id.startsWith('test_'))
        .map((p) => ({
          ...p,
          title: p.title?.replace(/ESSLCE/g, 'EUEE') || '',
          content: p.content?.replace(/ESSLCE/g, 'EUEE') || '',
          grade: p.grade?.replace(/ESSLCE/g, 'EUEE') || 'All Grades',
          linkUrl: p.linkUrl?.includes('ethio_students_grade9_12')
            ? 'https://t.me/Ethiopianstudentbooks'
            : p.linkUrl,
          linkTitle: p.linkUrl?.includes('ethio_students_grade9_12')
            ? 'Join High School Telegram Community (@Ethiopianstudentbooks)'
            : p.linkTitle,
          likedByMe: userLikes.includes(p.id),
          isBookmarked: userBookmarks.includes(p.id),
        }))
        .sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

      this.savePosts(mergedPosts);
      if (callback) callback(mergedPosts);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('posts-changed'));
      }

      return mergedPosts;
    } catch (e) {
      console.warn('syncPostsFromRemote error:', e);
      return this.getPosts();
    }
  },

  // Create a new post & dispatch push notification with sound
  createPost(post: {
    author: string;
    authorRole: 'admin' | 'teacher' | 'student';
    title: string;
    content: string;
    category: CommunityPost['category'];
    grade: string;
    subject?: string;
    isOfficial?: boolean;
    pinned?: boolean;
    attachedBookId?: string;
    attachedBookTitle?: string;
    actionUrl?: string;
    linkUrl?: string;
    linkTitle?: string;
    linkType?: CommunityPost['linkType'];
    imageUrl?: string;
    imageCaption?: string;
    sendPush?: boolean;
  }): CommunityPost {
    const list = this.getPosts();
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
      isBookmarked: false,
      comments: [],
      pinned: post.pinned !== undefined ? post.pinned : post.authorRole === 'admin',
      isOfficial: post.authorRole === 'admin',
    };

    const updated = [newPost, ...list];
    this.savePosts(updated);

    // Sync to Cloud Firestore in background safely
    try {
      setDoc(doc(db, 'official_announcements', newPost.id), sanitizeForFirestore(newPost), { merge: true }).catch((err) => {
        console.warn('Firestore announcement sync error:', err);
      });
    } catch (err) {
      console.warn('Firestore setDoc failed:', err);
    }

    // Trigger Notification with Sound for new post!
    NotificationService.syncPostNotification(newPost, post.sendPush !== false);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('posts-changed'));
    }

    return newPost;
  },

  // Edit an existing post (Admin only)
  editPost(postId: string, updatedFields: Partial<CommunityPost>, broadcastAlert: boolean = false): CommunityPost[] {
    let updatedPost: CommunityPost | null = null;
    let currentPosts = this.getPosts();

    const exists = currentPosts.some((p) => p.id === postId);
    if (!exists) {
      const defaultPost = DEFAULT_POSTS.find((p) => p.id === postId);
      if (defaultPost) {
        currentPosts = [{ ...defaultPost }, ...currentPosts];
      }
    }

    const posts = currentPosts.map((p) => {
      if (p.id === postId) {
        updatedPost = {
          ...p,
          ...updatedFields,
          id: postId,
        };
        return updatedPost;
      }
      return p;
    });

    this.savePosts(posts);

    if (updatedPost) {
      // Sync to Firestore official_announcements safely
      try {
        setDoc(doc(db, 'official_announcements', postId), sanitizeForFirestore(updatedPost), { merge: true }).catch((err) => {
          console.warn('Firestore editPost error:', err);
        });
      } catch (err) {
        console.warn('Firestore editPost exception:', err);
      }

      // Keep Notification in sync across all devices & students in real-time
      NotificationService.syncPostNotification(updatedPost, broadcastAlert);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('posts-changed'));
    }

    return posts;
  },

  // Toggle Like on a post
  toggleLike(postId: string): CommunityPost[] {
    const posts = this.getPosts();
    let userLikes: string[] = [];
    try {
      userLikes = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES) || '[]');
    } catch {}

    const isLiked = userLikes.includes(postId);
    const updatedLikes = isLiked
      ? userLikes.filter((id) => id !== postId)
      : [...userLikes, postId];

    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(updatedLikes));

    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          likes: isLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
          likedByMe: !isLiked,
        };
      }
      return p;
    });

    this.savePosts(updatedPosts);
    return updatedPosts;
  },

  // Toggle Bookmark on a post
  toggleBookmark(postId: string): CommunityPost[] {
    const posts = this.getPosts();
    let userBookmarks: string[] = [];
    try {
      userBookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]');
    } catch {}

    const isBookmarked = userBookmarks.includes(postId);
    const updatedBookmarks = isBookmarked
      ? userBookmarks.filter((id) => id !== postId)
      : [...userBookmarks, postId];

    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(updatedBookmarks));

    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          isBookmarked: !isBookmarked,
        };
      }
      return p;
    });

    this.savePosts(updatedPosts);
    return updatedPosts;
  },

  // Add Comment to a post
  addComment(postId: string, comment: { author: string; authorRole: 'admin' | 'teacher' | 'student'; content: string }): CommunityPost[] {
    const posts = this.getPosts();
    let updatedComments: PostComment[] = [];
    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        const newComment: PostComment = {
          id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          author: comment.author,
          authorRole: comment.authorRole,
          content: comment.content,
          date: new Date().toISOString(),
        };
        updatedComments = [...p.comments, newComment];
        return {
          ...p,
          comments: updatedComments,
        };
      }
      return p;
    });

    this.savePosts(updatedPosts);

    try {
      updateDoc(doc(db, 'official_announcements', postId), sanitizeForFirestore({ comments: updatedComments })).catch(() => {});
    } catch {}

    return updatedPosts;
  },

  // Delete a post
  deletePost(postId: string): CommunityPost[] {
    const deletedIds = getDeletedPostIds();
    if (!deletedIds.includes(postId)) {
      try {
        localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify([...deletedIds, postId]));
      } catch {}
    }

    const posts = this.getPosts().filter((p) => p.id !== postId);
    this.savePosts(posts);

    try {
      deleteDoc(doc(db, 'official_announcements', postId)).catch(() => {});
      deleteDoc(doc(db, 'broadcast_notifications', `notif-post-${postId}`)).catch(() => {});
    } catch {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('posts-changed'));
      window.dispatchEvent(new CustomEvent('notifications-changed'));
    }

    return posts;
  },

  // Pin / Unpin a post (Admin only)
  togglePin(postId: string): CommunityPost[] {
    let newPinned = false;
    const posts = this.getPosts().map((p) => {
      if (p.id === postId) {
        newPinned = !p.pinned;
        return { ...p, pinned: newPinned };
      }
      return p;
    });
    this.savePosts(posts);

    try {
      updateDoc(doc(db, 'official_announcements', postId), { pinned: newPinned }).catch(() => {});
    } catch {}

    return posts;
  },
};
