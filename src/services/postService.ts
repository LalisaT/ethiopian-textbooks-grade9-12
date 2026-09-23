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
    if (!list.includes('post-tip-3')) {
      list.push('post-tip-3');
      try {
        localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(list));
      } catch {}
    }
    return list;
  } catch {
    return ['post-tip-3'];
  }
}

export const DEFAULT_POSTS: CommunityPost[] = [
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
    date: new Date(Date.now() - 3600000 * 3).toISOString(),
    likes: 42,
    comments: [],
    pinned: true,
    isOfficial: true,
    actionUrl: 'tab:examprep',
    linkUrl: 'https://eaes.et',
    linkTitle: 'Official EAES Examination Portal',
    linkType: 'portal',
    imageUrl: '/brand/exam-prep-banner.jpg',
    imageCaption: 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator',
  },
  {
    id: 'post-guide-2',
    author: 'Admin @lalion',
    authorRole: 'admin',
    title: 'Welcome to Ethiopian Textbooks & EUEE Hub! 🇪🇹',
    content:
      'Welcome new students and teachers! Your offline digital library and entrance exam simulator is now ready. Access official Ethiopian Ministry of Education Grade 9-12 textbooks, teacher guides, unit summaries, and national EUEE model exams with zero internet required once downloaded.',
    category: 'Curriculum Update',
    grade: 'All Grades (9-12)',
    subject: 'All Subjects & Guides',
    date: new Date(Date.now() - 3600000 * 12).toISOString(),
    likes: 54,
    comments: [],
    pinned: true,
    isOfficial: true,
    linkUrl: 'https://t.me/Ethiopianstudentbooks',
    linkTitle: 'Join High School Telegram Community (@Ethiopianstudentbooks)',
    linkType: 'telegram',
    imageUrl: '/brand/welcome-banner.jpg',
    imageCaption: 'Official Welcome Guide for New Ethiopian Textbooks App Downloaders',
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
      const q = query(collection(db, 'official_announcements'), orderBy('date', 'desc'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          let userLikes: string[] = [];
          let userBookmarks: string[] = [];
          try {
            userLikes = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES) || '[]');
            userBookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]');
          } catch {}

          const deletedIds = getDeletedPostIds();

          // 1. Gather all active announcement IDs from Firestore snapshot
          const firestoreDocIds = new Set<string>();
          const remotePosts: CommunityPost[] = [];

          snapshot.forEach((docSnap) => {
            if (docSnap.id.startsWith('test_')) return;
            const data = docSnap.data() as CommunityPost;
            if (data && data.title && !data.isDeleted) {
              firestoreDocIds.add(docSnap.id);
              remotePosts.push({
                ...data,
                id: docSnap.id,
              });
            }
          });

          // 2. Base map initialized with default official announcements (excluding deleted ones)
          const postMap = new Map<string, CommunityPost>();
          DEFAULT_POSTS.forEach((p) => {
            if (!deletedIds.includes(p.id)) {
              postMap.set(p.id, { ...p });
            }
          });

          // 3. Reconcile local posts from localStorage:
          // Any custom announcement in localStorage that is NOT in Firestore was deleted by Admin!
          // We immediately purge it from this device's localStorage & add to deletedIds.
          let updatedDeletedIds = [...deletedIds];
          let deletedChanged = false;

          try {
            const data = localStorage.getItem(STORAGE_KEY_POSTS);
            if (data) {
              const localPosts: CommunityPost[] = JSON.parse(data);
              localPosts.forEach((p) => {
                if (!p || !p.id || p.id.startsWith('test_')) return;

                // Explicitly deleted
                if (updatedDeletedIds.includes(p.id)) {
                  postMap.delete(p.id);
                  return;
                }

                const isDefault = DEFAULT_POSTS.some((dp) => dp.id === p.id);
                // If it is a custom post not in Firestore, it was deleted from admin!
                if (!isDefault && !firestoreDocIds.has(p.id)) {
                  updatedDeletedIds.push(p.id);
                  deletedChanged = true;
                  postMap.delete(p.id);
                  return;
                }

                if (p.id === 'post-tip-3' && (p.author === 'Chala Desta' || p.authorRole === 'student')) {
                  p.author = 'Admin @lalion';
                  p.authorRole = 'admin';
                  p.isOfficial = true;
                  p.pinned = true;
                }
                if (p.id === 'post-official-1' && (p.author.includes('Educational Assessment') || !p.author)) {
                  p.author = 'Exam Practice Hub';
                }
                if (p.id === 'post-guide-2' && (p.imageUrl?.includes('unsplash') || !p.title.includes('Welcome'))) {
                  p.title = 'Welcome to Ethiopian Textbooks & EUEE Hub! 🇪🇹';
                  p.content = 'Welcome new students and teachers! Your offline digital library and entrance exam simulator is now ready. Access official Ethiopian Ministry of Education Grade 9-12 textbooks, teacher guides, unit summaries, and national EUEE model exams with zero internet required once downloaded.';
                  p.imageUrl = '/brand/welcome-banner.jpg';
                  p.imageCaption = 'Official Welcome Guide for New Ethiopian Textbooks App Downloaders';
                  p.subject = 'All Subjects & Guides';
                }
                postMap.set(p.id, p);
              });
            }
          } catch {}

          if (deletedChanged) {
            try {
              localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(updatedDeletedIds));
            } catch {}
          }

          // 4. Authoritative remote Firestore posts overwrite local copies
          remotePosts.forEach((p) => {
            if (!updatedDeletedIds.includes(p.id)) {
              if (p.id === 'post-official-1') {
                if (p.author.includes('Educational Assessment') || !p.author) {
                  p.author = 'Exam Practice Hub';
                }
                if (p.imageUrl?.includes('unsplash') || !p.imageUrl) {
                  p.imageUrl = '/brand/exam-prep-banner.jpg';
                  p.imageCaption = 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator';
                }
              }
              if (p.id === 'post-guide-2') {
                p.title = 'Welcome to Ethiopian Textbooks & EUEE Hub! 🇪🇹';
                p.content = 'Welcome new students and teachers! Your offline digital library and entrance exam simulator is now ready. Access official Ethiopian Ministry of Education Grade 9-12 textbooks, teacher guides, unit summaries, and national EUEE model exams with zero internet required once downloaded.';
                p.imageUrl = '/brand/welcome-banner.jpg';
                p.imageCaption = 'Official Welcome Guide for New Ethiopian Textbooks App Downloaders';
                p.subject = 'All Subjects & Guides';
                delete (p as any).actionUrl;
              }
              postMap.set(p.id, p);
            }
          });

          // 5. Convert to array and format/sort: pinned first, then newest date
          const mergedPosts = Array.from(postMap.values())
            .filter((p) => p && p.title && !p.id.startsWith('test_') && !updatedDeletedIds.includes(p.id))
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
