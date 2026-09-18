export interface PostComment {
  id: string;
  author: string;
  authorRole: 'admin' | 'teacher' | 'student';
  content: string;
  date: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: 'admin' | 'teacher' | 'student';
  title: string;
  content: string;
  category: 'Exam Announcement' | 'Curriculum Update' | 'Study Tip' | 'Q&A' | 'General Notice';
  grade: string;
  subject?: string;
  date: string;
  likes: number;
  likedByMe?: boolean;
  isBookmarked?: boolean;
  comments: PostComment[];
  pinned?: boolean;
  isOfficial?: boolean;
  attachedBookId?: string;
  attachedBookTitle?: string;
  actionUrl?: string;
  linkUrl?: string;
  linkTitle?: string;
  linkType?: 'website' | 'telegram' | 'youtube' | 'drive' | 'portal' | 'download';
  imageUrl?: string;
  imageCaption?: string;
}
