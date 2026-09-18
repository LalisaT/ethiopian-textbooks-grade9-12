import { CommunityPost, PostComment } from '../types/post';
import { NotificationService } from './notificationService';

const STORAGE_KEY_POSTS = 'ethio_community_posts';
const STORAGE_KEY_LIKES = 'ethio_community_user_likes';
const STORAGE_KEY_BOOKMARKS = 'ethio_community_user_bookmarks';

const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: 'post-official-1',
    author: 'Educational Assessment and Examinations Service (EAES)',
    authorRole: 'admin',
    title: '🚨 Official Grade 12 ESSLCE / Matric National Exam Practice Hub',
    content:
      'All Grade 12 Natural and Social Science students nationwide are invited to practice with authentic past papers and 50-question mock exams covering high-yield syllabus concepts across Grades 9, 10, 11, and 12 with detailed explanations!',
    category: 'Exam Announcement',
    grade: 'Grade 12 (ESSLCE / Matric)',
    subject: 'Physics, Chemistry, Math & Social',
    date: new Date(Date.now() - 3600000 * 3).toISOString(),
    likes: 42,
    comments: [
      {
        id: 'c-1',
        author: 'Daniel Bekele',
        authorRole: 'student',
        content: 'Thank you! The kinematics and organic chemistry questions across Grades 9-12 are extremely helpful for matric preparation.',
        date: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'c-2',
        author: 'Teacher Tigist',
        authorRole: 'teacher',
        content: 'I recommend all students review Grade 11 & 12 fundamentals before attempting the timed past papers.',
        date: new Date(Date.now() - 3600000 * 1).toISOString(),
      },
    ],
    pinned: true,
    isOfficial: true,
    actionUrl: 'tab:examprep',
    linkUrl: 'https://eaes.et',
    linkTitle: 'Official EAES Examination Portal',
    linkType: 'portal',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Grade 12 National University Entrance Preparation Session',
  },
  {
    id: 'post-guide-2',
    author: 'Admin @lalion',
    authorRole: 'admin',
    title: '📚 Grade 9-12 Textbooks & ESSLCE Auto Solver Activated',
    content:
      'You can now access and download all official New Curriculum Grade 9-12 textbooks for Natural Science and Social Science streams. The system automatically extracts notes and provides interactive mock exams with full explanations.',
    category: 'Curriculum Update',
    grade: 'All Grades (9-12)',
    subject: 'All Subjects',
    date: new Date(Date.now() - 3600000 * 12).toISOString(),
    likes: 38,
    comments: [],
    pinned: true,
    isOfficial: true,
    actionUrl: 'tab:explore',
    linkUrl: 'https://t.me/ethio_students_grade9_12',
    linkTitle: 'Join High School Telegram Community',
    linkType: 'telegram',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Ethiopian High School Digital Curriculum Textbooks Collection',
  },
  {
    id: 'post-tip-3',
    author: 'Chala Desta',
    authorRole: 'student',
    title: '💡 Study Tip: High-Yield Kinematics & Calculus for ESSLCE Physics',
    content:
      'For Natural Science candidates: Remember that constant acceleration kinematic formulas from Grade 9 & 10 are frequently paired with Grade 12 rotational dynamics and calculus in university entrance questions!',
    category: 'Study Tip',
    grade: 'Grade 12',
    subject: 'Physics (Natural Science)',
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    likes: 19,
    comments: [],
    pinned: false,
    isOfficial: false,
  },
];

export const PostService = {
  // Get all posts with user like & bookmark state
  getPosts(): CommunityPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_POSTS);
      const userLikes: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES) || '[]');
      const userBookmarks: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]');
      const posts: CommunityPost[] = data ? JSON.parse(data) : DEFAULT_POSTS;

      return posts.map((p) => ({
        ...p,
        likedByMe: userLikes.includes(p.id),
        isBookmarked: userBookmarks.includes(p.id),
      }));
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

    // Trigger Notification with Sound for new post!
    NotificationService.addNotification(
      `📢 New Post: ${post.title}`,
      `${post.content.slice(0, 100)}... (By ${post.author} • ${post.grade})`,
      'admin_broadcast',
      post.actionUrl || `tab:community`,
      post.category,
      post.grade
    );

    return newPost;
  },

  // Edit an existing post (Admin only)
  editPost(postId: string, updatedFields: Partial<CommunityPost>): CommunityPost[] {
    const posts = this.getPosts().map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          ...updatedFields,
        };
      }
      return p;
    });
    this.savePosts(posts);
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
    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        const newComment: PostComment = {
          id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          author: comment.author,
          authorRole: comment.authorRole,
          content: comment.content,
          date: new Date().toISOString(),
        };
        return {
          ...p,
          comments: [...p.comments, newComment],
        };
      }
      return p;
    });

    this.savePosts(updatedPosts);
    return updatedPosts;
  },

  // Delete a post
  deletePost(postId: string): CommunityPost[] {
    const posts = this.getPosts().filter((p) => p.id !== postId);
    this.savePosts(posts);
    return posts;
  },

  // Pin / Unpin a post (Admin only)
  togglePin(postId: string): CommunityPost[] {
    const posts = this.getPosts().map((p) => {
      if (p.id === postId) {
        return { ...p, pinned: !p.pinned };
      }
      return p;
    });
    this.savePosts(posts);
    return posts;
  },
};
