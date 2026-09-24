import React, { useState, useEffect } from 'react';
import { CommunityPost } from '../types/post';
import { Book } from '../types/book';
import { PostService } from '../services/postService';
import { NotificationService } from '../services/notificationService';
import { compressImageForUpload } from '../utils/imageCompressor';
import {
  Megaphone,
  PlusCircle,
  Heart,
  MessageSquare,
  Pin,
  Bell,
  Sparkles,
  ShieldCheck,
  Search,
  Filter,
  Trash2,
  Send,
  User,
  BookOpen,
  Award,
  CheckCircle,
  X,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  Edit3,
  ExternalLink,
  Check,
  Globe,
  Link as LinkIcon,
  PlayCircle,
  FileText,
  Layers,
  Image as ImageIcon,
  Upload,
  Camera,
  ZoomIn,
  Maximize2,
  Download,
  Lightbulb,
  Landmark,
  GraduationCap,
  Calendar,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';

interface CommunityPostsPageProps {
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
  onSelectBook?: (book: Book) => void;
  onNavigateTab?: (tab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about') => void;
  allBooks?: Book[];
  targetPostId?: string | null;
}

export const CommunityPostsPage: React.FC<CommunityPostsPageProps> = ({
  isAdmin = false,
  onOpenAdminLogin,
  onSelectBook,
  onNavigateTab,
  allBooks = [],
  targetPostId,
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<CommunityPost | null>(null);

  // New Post Form State (Admin Only)
  const [authorName, setAuthorName] = useState('Admin @lalion');
  const [authorRole, setAuthorRole] = useState<'admin' | 'teacher' | 'student'>('admin');
  const [isOfficial, setIsOfficial] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityPost['category']>('Exam Announcement');
  const [grade, setGrade] = useState('All Grades (9-12)');
  const [subject, setSubject] = useState('All Subjects');
  const [isPinned, setIsPinned] = useState(true);
  const [sendPushNotification, setSendPushNotification] = useState(true);
  const [attachedBookId, setAttachedBookId] = useState<string>('');
  const [actionUrl, setActionUrl] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkTitle, setLinkTitle] = useState<string>('');
  const [linkType, setLinkType] = useState<CommunityPost['linkType']>('website');

  // Picture States
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageCaption, setImageCaption] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeModalTab, setActiveModalTab] = useState<'photo' | 'link' | 'book'>('photo');

  // Lightbox Modal for Full Size Photo View
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(null);

  // UI Interactive States
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commenterNames, setCommenterNames] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [speakingPostId, setSpeakingPostId] = useState<string | null>(null);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageForUpload(file);
      setImageUrl(compressed);
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [isSyncing, setIsSyncing] = useState(false);

  const refreshPosts = () => {
    setPosts(PostService.getPosts());
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    try {
      const updated = await PostService.syncPostsFromRemote();
      setPosts(updated);
    } finally {
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  useEffect(() => {
    refreshPosts();
    // Guaranteed instant cloud REST pull on mount (bypasses any WebSocket/cache deadlock)
    PostService.syncPostsFromRemote().then((updated) => setPosts(updated)).catch(() => {});

    // Real-time Firestore Live Sync across all student & admin devices
    const unsubscribe = PostService.subscribeToPosts((updatedPosts) => {
      setPosts(updatedPosts);
    });

    const handlePostsChanged = () => {
      refreshPosts();
    };
    window.addEventListener('posts-changed', handlePostsChanged);
    window.addEventListener('storage', handlePostsChanged);

    return () => {
      unsubscribe();
      window.removeEventListener('posts-changed', handlePostsChanged);
      window.removeEventListener('storage', handlePostsChanged);
    };
  }, []);

  // Smooth scroll and focus on target post when navigated from a notification
  useEffect(() => {
    if (targetPostId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`post-${targetPostId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [targetPostId, posts]);

  // Web Speech Audio Synthesizer for Read Aloud
  const handleReadAloud = (post: CommunityPost) => {
    if (!window.speechSynthesis) {
      alert('Text-to-speech is not supported on this device.');
      return;
    }

    if (speakingPostId === post.id) {
      window.speechSynthesis.cancel();
      setSpeakingPostId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${post.title}. ${post.content}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onend = () => {
      setSpeakingPostId(null);
    };
    utterance.onerror = () => {
      setSpeakingPostId(null);
    };

    setSpeakingPostId(post.id);
    window.speechSynthesis.speak(utterance);
  };

  // Share / Copy Link Handler
  const handleShare = (post: CommunityPost) => {
    const text = `${post.title}\n\n${post.content}\n\n— Ethiopian Grade 9-12 Textbooks & EUEE Hub`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPostId(post.id);
      setTimeout(() => setCopiedPostId(null), 2500);
    }
  };

  // Toggle Bookmark Handler
  const handleToggleBookmark = (postId: string) => {
    const updated = PostService.toggleBookmark(postId);
    setPosts(updated);
  };

  // Preset Template Quick Fill
  const applyPresetTemplate = (type: 'exam' | 'book' | 'tip' | 'moe') => {
    if (type === 'exam') {
      setTitle('Grade 12 EUEE / Matric Model Exam Simulation Schedule');
      setCategory('Exam Announcement');
      setGrade('Grade 12 (EUEE / Matric)');
      setSubject('Natural & Social Science Streams');
      setContent(
        'Practice authentic model examination questions categorized by subject with timers, scorecards, and step-by-step solutions in the Exam Prep tab!'
      );
      setActionUrl('tab:examprep');
      setLinkUrl('https://eaes.et');
      setLinkTitle('Official EAES Exam Portal');
      setLinkType('portal');
      setImageUrl('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80');
      setImageCaption('Grade 12 EUEE National Exam Preparation');
    } else if (type === 'book') {
      setTitle('New Ethiopian Curriculum Grade 9-12 Textbooks Uploaded');
      setCategory('Curriculum Update');
      setGrade('All Grades (9-12)');
      setSubject('All Subjects');
      setContent(
        'The latest Ministry of Education official textbooks are now available for offline reading and chapter unit practice!'
      );
      setActionUrl('');
      setLinkUrl('https://t.me/ethio_students_grade9_12');
      setLinkTitle('Join Telegram Student Channel');
      setLinkType('telegram');
      setImageUrl('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80');
      setImageCaption('Ethiopian Curriculum Grade 9-12 Digital Textbooks');
    } else if (type === 'tip') {
      setTitle('Study Tip: How to Score 600+ in Grade 12 EUEE');
      setCategory('Study Tip');
      setGrade('All Grades (9-12)');
      setSubject('Study Strategy');
      setContent(
        '1. Review high-yield formulas from Grades 9-12.\n2. Work through the 25-50 practice quiz questions under timed conditions.\n3. Analyze step-by-step solutions for past entrance questions.'
      );
      setActionUrl('');
      setLinkUrl('https://youtube.com');
      setLinkTitle('Watch Study Tips Video');
      setLinkType('youtube');
      setImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
      setImageCaption('Active Learning and Group Discussion');
    } else if (type === 'moe') {
      setTitle('Ministry of Education (MOE) Official Notice');
      setCategory('General Notice');
      setGrade('All Grades (9-12)');
      setSubject('National Curriculum');
      setContent(
        'Official notification regarding standardized Grade 12 EUEE university entrance examination guidelines and high school curriculum materials.'
      );
      setActionUrl('tab:community');
      setLinkUrl('https://eaes.et');
      setLinkTitle('National Educational Assessment Agency');
      setLinkType('website');
      setImageUrl('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80');
      setImageCaption('Standardized Educational Assessment Protocol');
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Only administrators can publish posts and announcements.');
      return;
    }
    if (!title.trim() || !content.trim()) return;

    let targetAttachedBookTitle: string | undefined;
    if (attachedBookId) {
      const book = allBooks.find((b) => b.id === attachedBookId);
      if (book) targetAttachedBookTitle = book.title;
    }

    if (editingPost) {
      // Edit existing post with real-time broadcast option
      const updated = PostService.editPost(
        editingPost.id,
        {
          author: authorName.trim() || 'Admin @lalion',
          authorRole: authorRole || 'admin',
          isOfficial: isOfficial,
          title: title.trim(),
          content: content.trim(),
          category,
          grade,
          subject: subject.trim() || 'General',
          pinned: isPinned,
          attachedBookId: attachedBookId || '',
          attachedBookTitle: targetAttachedBookTitle || '',
          actionUrl: actionUrl || '',
          linkUrl: linkUrl.trim() || '',
          linkTitle: linkTitle.trim() || '',
          linkType: linkType || 'website',
          imageUrl: imageUrl.trim() || '',
          imageCaption: imageCaption.trim() || '',
        },
        sendPushNotification
      );
      setPosts(updated);
      setEditingPost(null);
    } else {
      // Create new post & broadcast notification
      PostService.createPost({
        author: authorName.trim() || 'Admin @lalion',
        authorRole: authorRole || 'admin',
        title: title.trim(),
        content: content.trim(),
        category,
        grade,
        subject: subject.trim() || 'General',
        isOfficial: isOfficial,
        pinned: isPinned,
        attachedBookId: attachedBookId || '',
        attachedBookTitle: targetAttachedBookTitle || '',
        actionUrl: actionUrl || '',
        linkUrl: linkUrl.trim() || '',
        linkTitle: linkTitle.trim() || '',
        linkType: linkType || 'website',
        imageUrl: imageUrl.trim() || '',
        imageCaption: imageCaption.trim() || '',
        sendPush: sendPushNotification,
      });
      setPosts(PostService.getPosts());
    }

    setTitle('');
    setContent('');
    setImageUrl('');
    setImageCaption('');
    setAttachedBookId('');
    setActionUrl('');
    setLinkUrl('');
    setLinkTitle('');
    setLinkType('website');
    setSendPushNotification(true);
    setIsCreateModalOpen(false);
    refreshPosts();
  };

  const handleOpenEditModal = (post: CommunityPost) => {
    setEditingPost(post);
    setAuthorName(post.author);
    setAuthorRole(post.authorRole || 'admin');
    setIsOfficial(post.isOfficial !== false);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setGrade(post.grade);
    setSubject(post.subject || 'All Subjects');
    setIsPinned(!!post.pinned);
    setAttachedBookId(post.attachedBookId || '');
    setActionUrl(post.actionUrl || '');
    setLinkUrl(post.linkUrl || '');
    setLinkTitle(post.linkTitle || '');
    setLinkType(post.linkType || 'website');
    setImageUrl(post.imageUrl || '');
    setImageCaption(post.imageCaption || '');
    setSendPushNotification(false);
    setIsCreateModalOpen(true);
  };

  const handleToggleLike = (postId: string) => {
    const updated = PostService.toggleLike(postId);
    setPosts(updated);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    const name = commenterNames[postId] || (isAdmin ? 'Admin @lalion' : 'Student');
    if (!text || !text.trim()) return;

    const updated = PostService.addComment(postId, {
      author: name.trim(),
      authorRole: isAdmin ? 'admin' : 'student',
      content: text.trim(),
    });

    setPosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updated = PostService.deletePost(postId);
      setPosts(updated);
    }
  };

  const handleTogglePin = (postId: string) => {
    const updated = PostService.togglePin(postId);
    setPosts(updated);
  };

  // Filtered Posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    const matchesGrade =
      selectedGrade === 'all' || p.grade.includes(selectedGrade);

    const matchesBookmark = !showOnlyBookmarked || p.isBookmarked;

    return matchesSearch && matchesCategory && matchesGrade && matchesBookmark;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Luxury Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 text-white p-7 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden group">
        {/* Luxury top flowing light runner */}
        <div className="luxury-flow-line h-[2px] absolute top-0 left-0 right-0 opacity-90" />

        {/* Ambient atmospheric backlight orbs */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/4 -mb-16 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3.5">
            {/* Pulsing Beacon Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent border border-amber-500/30 text-amber-300 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAdmin ? 'Executive Notice Studio & Broadcast Deck' : 'Official Student Bulletin & Exam Alerts Hub'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 leading-tight">
              Official Announcements & Study Notices
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300/90 max-w-2xl leading-relaxed">
              {isAdmin
                ? 'Create, pin, manage, and broadcast official Ministry alerts, EUEE matric schedules, and curriculum updates for Grades 9-12.'
                : 'Stay updated with Ministry of Education alerts, Grade 12 EUEE matric schedules, curriculum updates, and discussion tips for Grades 9-12.'}
            </p>

            {/* Quick Live Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/80 text-[11px] font-bold text-sky-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Verified MOE & EAES Feed</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/80 text-[11px] font-bold text-emerald-300 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Real-Time Cloud Broadcast</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/80 text-[11px] font-bold text-amber-300 shadow-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{posts.length} Active Bulletins</span>
              </span>
              <button
                onClick={handleSyncNow}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-[11px] font-bold text-sky-300 shadow-sm active:scale-95 transition-all cursor-pointer"
                title="Tap to sync with cloud database"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Cloud'}</span>
              </button>
            </div>
          </div>

          {/* Admin Create / Broadcast Action */}
          <div className="shrink-0">
            {isAdmin ? (
              <button
                onClick={() => {
                  setEditingPost(null);
                  setTitle('');
                  setContent('');
                  setIsCreateModalOpen(true);
                }}
                className="btn-luxury-active luxury-pressable luxury-sheen-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-amber-200 font-black rounded-2xl shadow-xl shadow-amber-500/25 transition-all text-xs sm:text-sm cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <span>+ Post Announcement</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Luxury Filter & Search Control Deck */}
      <div className="luxury-control-deck rounded-3xl p-4 sm:p-5 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800/80">
        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setShowOnlyBookmarked(false);
            }}
            className={`luxury-pressable luxury-sheen-sweep px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              selectedCategory === 'all' && !showOnlyBookmarked
                ? 'btn-luxury-active font-black'
                : 'btn-luxury-idle'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-400" />
            <span>All Notices ({posts.length})</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('Exam Announcement');
              setShowOnlyBookmarked(false);
            }}
            className={`luxury-pressable luxury-sheen-sweep px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              selectedCategory === 'Exam Announcement' && !showOnlyBookmarked
                ? 'btn-luxury-active font-black'
                : 'btn-luxury-idle'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Exam Alerts</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('Curriculum Update');
              setShowOnlyBookmarked(false);
            }}
            className={`luxury-pressable luxury-sheen-sweep px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              selectedCategory === 'Curriculum Update' && !showOnlyBookmarked
                ? 'btn-luxury-active font-black'
                : 'btn-luxury-idle text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Curriculum Updates</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('Study Tip');
              setShowOnlyBookmarked(false);
            }}
            className={`luxury-pressable luxury-sheen-sweep px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              selectedCategory === 'Study Tip' && !showOnlyBookmarked
                ? 'btn-luxury-active font-black'
                : 'btn-luxury-idle text-slate-300'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Study Tips</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('General Notice');
              setShowOnlyBookmarked(false);
            }}
            className={`luxury-pressable luxury-sheen-sweep px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              selectedCategory === 'General Notice' && !showOnlyBookmarked
                ? 'btn-luxury-active font-black'
                : 'btn-luxury-idle text-slate-300'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Ministry Notices</span>
          </button>

          <button
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            className={`luxury-pressable luxury-sheen-sweep px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              showOnlyBookmarked
                ? 'btn-luxury-active font-black'
                : 'btn-luxury-idle'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-current text-amber-400' : 'text-slate-400'}`} />
            <span>Saved Bookmarks</span>
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Megaphone className="w-12 h-12 mx-auto text-slate-400 opacity-40" />
            <h3 className="text-base font-extrabold text-slate-700 dark:text-slate-300">
              No Announcements Found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              id={`post-${post.id}`}
              className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 space-y-4 group overflow-hidden ${
                targetPostId === post.id
                  ? 'bg-slate-900/98 ring-4 ring-amber-400 dark:ring-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.35)] border-2 border-amber-400 scale-[1.01]'
                  : post.pinned
                  ? 'bg-gradient-to-b from-slate-900/95 via-slate-900/98 to-slate-950 border border-amber-500/40 shadow-[0_8px_32px_-8px_rgba(245,158,11,0.18)] hover:shadow-[0_16px_48px_-8px_rgba(245,158,11,0.25)] hover:-translate-y-0.5'
                  : 'bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-950 border border-slate-800/90 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.4)] hover:border-slate-700 hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)] hover:-translate-y-0.5'
              }`}
            >
              {/* Luxury hairline light runner on top edge for pinned posts */}
              {post.pinned && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90 pointer-events-none" />
              )}

              {/* Ambient corner flare */}
              {post.pinned && (
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Top Eyebrow Badges & Admin Controls */}
              <div className="flex items-center justify-between gap-2 pb-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Pill with unified luxury styling */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-900/90 border border-amber-500/30 text-amber-300 shadow-xs">
                    {post.category === 'Exam Announcement' ? (
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                    ) : post.category === 'Curriculum Update' ? (
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    ) : post.category === 'Study Tip' ? (
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Landmark className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>{post.category}</span>
                  </span>

                  {/* Pinned Golden Seal - Icon Only */}
                  {post.pinned && (
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-400/25 to-amber-500/20 border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.25)] text-amber-300"
                      title="Pinned Announcement"
                    >
                      <Pin className="w-3.5 h-3.5 fill-current text-amber-400" />
                    </span>
                  )}
                </div>

                {/* Admin quick controls */}
                {isAdmin && (
                  <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-700/60 rounded-xl p-0.5 shadow-sm">
                    <button
                      onClick={() => handleTogglePin(post.id)}
                      className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg transition-colors cursor-pointer"
                      title={post.pinned ? 'Unpin announcement' : 'Pin to top'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${post.pinned ? 'fill-current text-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(post)}
                      className="p-1.5 text-slate-400 hover:text-sky-400 rounded-lg transition-colors cursor-pointer"
                      title="Edit announcement"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                      title="Delete announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Author Profile Row */}
              <div className="flex items-start gap-3.5 pt-1">
                {/* Luxury Squircle Avatar with Metallic Rim */}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/80 via-amber-500/40 to-slate-800 p-[1.5px] shadow-md shadow-amber-500/10">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      {post.authorRole === 'admin' ? (
                        <ShieldCheck className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                      ) : post.authorRole === 'teacher' ? (
                        <Award className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                      ) : (
                        <User className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Author Info & Structured Metadata Row */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-base sm:text-lg text-white tracking-tight leading-tight">
                      {post.author}
                    </span>
                    {post.isOfficial && (
                      <span
                        className="inline-flex items-center justify-center text-amber-400"
                        title="Official Verified Channel"
                      >
                        <CheckCircle className="w-4 h-4 text-amber-400 fill-amber-400/20 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
                      </span>
                    )}
                  </div>

                  {/* Clean Luxury Metadata Chips Row (Unified Obsidian Glass) */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {/* Date Chip */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-300 shadow-xs">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </span>

                    {/* Grade Chip */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-300 shadow-xs">
                      <GraduationCap className="w-3 h-3 text-slate-400" />
                      <span>{post.grade}</span>
                    </span>

                    {/* Subject Chip */}
                    {post.subject && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-300 shadow-xs">
                        <BookOpen className="w-3 h-3 text-slate-400" />
                        <span>{post.subject}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Body Content */}
              <div className="space-y-3 pt-1">
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                  {post.title}
                </h3>
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-inner">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
              </div>

              {/* Attached Picture / Photo Banner */}
              {post.imageUrl && (
                <div className="pt-2">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        url: post.imageUrl!,
                        caption: post.imageCaption || post.title,
                      })
                    }
                    className="group/img relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="aspect-[16/9] sm:aspect-[21/9] max-h-80 w-full overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.imageCaption || post.title}
                        className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Hover Zoom Overlay Banner */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-3 sm:p-4 text-white">
                      <span className="text-xs font-bold truncate max-w-[80%]">
                        {post.imageCaption || 'Click to view full image'}
                      </span>
                      <div className="p-2 rounded-xl bg-black/70 backdrop-blur-xs text-white">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Persistent Caption Tag if present */}
                    {post.imageCaption && (
                      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>{post.imageCaption}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Attached Resource / Action Link / External URL Buttons (Where user circled) */}
              {(post.attachedBookId || post.actionUrl || post.linkUrl) && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* Practice Exam / Destination Button */}
                  {!post.attachedBookId && post.actionUrl && (
                    <button
                      onClick={() => {
                        if (post.actionUrl === 'tab:examprep' && onNavigateTab) {
                          onNavigateTab('examprep');
                        } else if (post.actionUrl === 'tab:explore' && onNavigateTab) {
                          onNavigateTab('explore');
                        } else if (post.actionUrl === 'tab:saved' && onNavigateTab) {
                          onNavigateTab('saved');
                        }
                      }}
                      className="btn-luxury-active luxury-pressable luxury-sheen-sweep inline-flex items-center justify-between gap-3 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black text-amber-200 cursor-pointer shadow-lg shadow-amber-500/15 group/btn"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm">
                          <Award className="w-4 h-4" />
                        </div>
                        <span>
                          {post.actionUrl === 'tab:explore'
                            ? 'Explore Digital Textbooks'
                            : post.actionUrl === 'tab:saved'
                            ? 'View Saved Textbooks'
                            : 'Launch Associated Practice & Mock Exams'}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  )}

                  {/* Attached Book Button */}
                  {post.attachedBookId && (
                    <button
                      onClick={() => {
                        const book = allBooks.find((b) => b.id === post.attachedBookId);
                        if (book && onSelectBook) {
                          onSelectBook(book);
                        }
                      }}
                      className="btn-luxury-action luxury-pressable luxury-sheen-sweep inline-flex items-center justify-between gap-3 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 cursor-pointer group/book"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm font-black text-xs">
                          G{allBooks.find((b) => b.id === post.attachedBookId)?.grade || '12'}
                        </div>
                        <div className="text-left">
                          <div className="text-[10px] uppercase font-black text-amber-400 tracking-wider">Official Curriculum Textbook</div>
                          <div className="font-bold text-white text-xs">{post.attachedBookTitle || 'Open Attached Book'}</div>
                        </div>
                      </div>
                      <BookOpen className="w-4 h-4 text-amber-400 group-hover/book:translate-x-0.5 transition-transform" />
                    </button>
                  )}

                  {/* External Resource URL Button */}
                  {post.linkUrl && (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-action luxury-pressable luxury-sheen-sweep inline-flex items-center justify-between gap-3 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 hover:text-amber-200 cursor-pointer group/link"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-sm">
                          {post.linkType === 'telegram' ? (
                            <Send className="w-4 h-4 text-amber-400" />
                          ) : post.linkType === 'youtube' ? (
                            <PlayCircle className="w-4 h-4 text-rose-400" />
                          ) : post.linkType === 'download' ? (
                            <Download className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Globe className="w-4 h-4 text-amber-400" />
                          )}
                        </div>
                        <span>{post.linkTitle || (post.linkType === 'download' ? 'Download Resource File' : 'Official Portal Link')}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-amber-400 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              )}

              {/* Post Action Buttons Bar (Clean Executive Deck) */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Read Aloud (Audio) Button */}
                  <button
                    onClick={() => handleReadAloud(post)}
                    className={`luxury-pressable luxury-sheen-sweep flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      speakingPostId === post.id
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)] animate-pulse font-black'
                        : 'btn-luxury-idle hover:text-amber-300'
                    }`}
                    title={speakingPostId === post.id ? 'Stop audio' : 'Listen to announcement (Read Aloud)'}
                  >
                    {speakingPostId === post.id ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-400" />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-amber-400" />
                        <span className="hidden sm:inline">Listen</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(post.id)}
                    className={`luxury-pressable luxury-sheen-sweep p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      post.isBookmarked
                        ? 'bg-amber-500/20 border border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'btn-luxury-idle hover:text-amber-400'
                    }`}
                    title={post.isBookmarked ? 'Remove Bookmark' : 'Bookmark Announcement'}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current text-amber-400' : ''}`} />
                  </button>

                  {/* Share / Copy Link Button */}
                  <button
                    onClick={() => handleShare(post)}
                    className="btn-luxury-idle luxury-pressable luxury-sheen-sweep flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                    title="Share announcement"
                  >
                    {copiedPostId === post.id ? (
                      <>
                        <Check className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-300 font-black">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-slate-300" />
                        <span className="hidden sm:inline">Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Post Modal (Admin Only) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-950/95 backdrop-blur-2xl rounded-3xl max-w-xl w-full border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto text-slate-100 relative group">
            {/* Top luxury flow line */}
            <div className="luxury-flow-line h-[2px] absolute top-0 left-0 right-0 opacity-90 z-20" />
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/90 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/25 shrink-0">
                  <Megaphone className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white">
                    {editingPost ? 'Edit Announcement' : 'Publish New Announcement'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Official announcements are broadcasted to all students with push notification alerts & sound chimes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingPost(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Template Presets */}
            <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 space-y-2">
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Preset Templates:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('exam')}
                  className="btn-luxury-idle luxury-pressable luxury-sheen-sweep px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ministry Exam Alert</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('book')}
                  className="btn-luxury-idle luxury-pressable luxury-sheen-sweep px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                  <span>New Textbook Notice</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('tip')}
                  className="btn-luxury-idle luxury-pressable luxury-sheen-sweep px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Weekly Study Tip</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('moe')}
                  className="btn-luxury-idle luxury-pressable luxury-sheen-sweep px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Landmark className="w-3.5 h-3.5 text-indigo-400" />
                  <span>MOE Notice</span>
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS TOOLBAR FIRST */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Attach Media & Resources:</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">Select to customize</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalTab('photo')}
                  className={`luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeModalTab === 'photo'
                      ? 'btn-luxury-active font-black'
                      : 'btn-luxury-idle'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Picture</span>
                  {imageUrl && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalTab('link')}
                  className={`luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeModalTab === 'link'
                      ? 'btn-luxury-active font-black'
                      : 'btn-luxury-idle'
                  }`}
                >
                  <LinkIcon className="w-4 h-4 text-sky-400" />
                  <span>Link</span>
                  {linkUrl && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalTab('book')}
                  className={`luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeModalTab === 'book'
                      ? 'btn-luxury-active font-black'
                      : 'btn-luxury-idle'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Book</span>
                  {attachedBookId && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>}
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCreatePost} className="p-6 space-y-4 text-xs">
              {/* 📷 PICTURE ATTACHMENT SECTION */}
              {activeModalTab === 'photo' && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-amber-500" />
                      <span>Attach Post Picture / Photo:</span>
                    </label>
                    <span className="text-[10px] text-slate-400">File upload or URL</span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-luxury-action luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-amber-300 cursor-pointer shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Upload from Device / Phone</span>
                    </button>

                    <input
                      type="url"
                      value={imageUrl.startsWith('data:') ? '' : imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or paste Image URL..."
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 shadow-inner"
                    />
                  </div>

                  {/* Sample Photo Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] text-slate-400 font-bold">Photo Ideas:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Ministry Examination Preparation');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2.5 py-1 rounded-lg text-[10px] text-amber-300 font-bold cursor-pointer"
                    >
                      Exam Session
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Ethiopian Curriculum Textbooks');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2.5 py-1 rounded-lg text-[10px] text-sky-300 font-bold cursor-pointer"
                    >
                      Textbooks Library
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Science & Laboratory Experiment');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2.5 py-1 rounded-lg text-[10px] text-emerald-300 font-bold cursor-pointer"
                    >
                      Science Lab
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Student Study Group');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2.5 py-1 rounded-lg text-[10px] text-purple-300 font-bold cursor-pointer"
                    >
                      Student Group
                    </button>
                  </div>

                  {/* Live Picture Preview Card */}
                  {imageUrl && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-2.5 space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-slate-800">
                        <img
                          src={imageUrl}
                          alt="Attachment preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl('');
                            setImageCaption('');
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white transition-all shadow-md active:scale-95 cursor-pointer"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        placeholder="Add image caption / description (optional)..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 🔗 LINK ATTACHMENT SECTION */}
              {activeModalTab === 'link' && (
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-300 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Attach Web / Resource Link Button:</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Opens in new tab</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="sm:col-span-2 space-y-1">
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://t.me/... or https://moe.gov.et"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <select
                        value={linkType}
                        onChange={(e) => setLinkType(e.target.value as any)}
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/60 cursor-pointer font-bold"
                      >
                        <option value="website">Web / Portal</option>
                        <option value="download">Download / File Link</option>
                        <option value="telegram">Telegram</option>
                        <option value="youtube">YouTube</option>
                        <option value="drive">Google Drive</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                      placeholder="Button Display Text (e.g. 'Download Ministry Exam PDF', 'Join Official Telegram')"
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/60"
                    />
                  </div>

                  {/* Quick Link Helper Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-400 font-bold">Quick Fill:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://moe.gov.et/downloads');
                        setLinkTitle('Download Curriculum PDF');
                        setLinkType('download');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2 py-0.5 rounded-lg text-sky-300 text-[10px] font-bold cursor-pointer"
                    >
                      Download File
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://t.me/ethio_students_grade5_8');
                        setLinkTitle('Join Telegram Student Channel');
                        setLinkType('telegram');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2 py-0.5 rounded-lg text-sky-400 text-[10px] font-bold cursor-pointer"
                    >
                      Telegram
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://moe.gov.et');
                        setLinkTitle('Visit Ministry of Education Portal');
                        setLinkType('website');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2 py-0.5 rounded-lg text-indigo-300 text-[10px] font-bold cursor-pointer"
                    >
                      MOE Portal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://youtube.com');
                        setLinkTitle('Watch Video Lesson');
                        setLinkType('youtube');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2 py-0.5 rounded-lg text-rose-300 text-[10px] font-bold cursor-pointer"
                    >
                      Video Lesson
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://drive.google.com');
                        setLinkTitle('Open Google Drive Documents');
                        setLinkType('drive');
                      }}
                      className="btn-luxury-idle luxury-pressable px-2 py-0.5 rounded-lg text-amber-300 text-[10px] font-bold cursor-pointer"
                    >
                      Google Drive
                    </button>
                  </div>
                </div>
              )}

              {/* 📚 TEXTBOOK ATTACHMENT SECTION */}
              {activeModalTab === 'book' && (
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">
                        Attach Specific Textbook:
                      </label>
                      <select
                        value={attachedBookId}
                        onChange={(e) => setAttachedBookId(e.target.value)}
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 cursor-pointer font-bold"
                      >
                        <option value="">None (General Post)</option>
                        {allBooks.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.title} (Grade {b.grade})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">
                        Action Destination Link:
                      </label>
                      <select
                        value={actionUrl}
                        onChange={(e) => setActionUrl(e.target.value)}
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 cursor-pointer font-bold"
                      >
                        <option value="">Default (Notice Board)</option>
                        <option value="tab:examprep">Exam Practice Hub</option>
                        <option value="tab:explore">Explore Textbooks</option>
                        <option value="tab:saved">Saved Books</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 text-xs">
                    Publisher / Author Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Admin @lalion"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 text-xs">
                    Author Role:
                  </label>
                  <select
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value as 'admin' | 'teacher' | 'student')}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 cursor-pointer font-bold"
                  >
                    <option value="admin">Administrator</option>
                    <option value="teacher">Teacher / Educator</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>

              {/* Official Badge Toggle */}
              <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 cursor-pointer select-none hover:border-slate-700 transition-all">
                <input
                  type="checkbox"
                  checked={isOfficial}
                  onChange={(e) => setIsOfficial(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400 cursor-pointer accent-amber-500"
                />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200">Display "Official" verification badge on notice</span>
                </div>
              </label>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">
                  Post Title:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grade 12 EUEE National Exam Revision Center Activated"
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 shadow-inner font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">
                    Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 cursor-pointer font-bold"
                  >
                    <option value="Exam Announcement">Exam Announcement</option>
                    <option value="Curriculum Update">Curriculum Update</option>
                    <option value="Study Tip">Study Tip</option>
                    <option value="Q&A">Q&A</option>
                    <option value="General Notice">General Notice</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">
                    Target Grade:
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/60 cursor-pointer font-bold"
                  >
                    <option value="All Grades (9-12)">All Grades (9-12)</option>
                    <option value="Grade 12 (EUEE / Matric)">Grade 12 (EUEE / Matric)</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">
                    Subject / Topic:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Mathematics, Science"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">
                  Announcement Message:
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your official announcement here..."
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 shadow-inner leading-relaxed"
                />
              </div>

              {/* Pin & Push Notification Options */}
              <div className="space-y-2.5 pt-2 pb-1">
                {/* Pin Toggle */}
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 cursor-pointer select-none hover:border-slate-700 transition-all">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400 cursor-pointer accent-amber-500"
                  />
                  <div className="flex items-center gap-2">
                    <Pin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200">Pin this announcement to top of Notice Board</span>
                  </div>
                </label>

                {/* Push Notification Toggle (Highlighted as circled by user) */}
                <label className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 cursor-pointer select-none shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-500/50 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-amber-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-amber-300">
                        Send Push Notification Alert with Sound
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Triggers real-time audio chime alert across all student devices
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={sendPushNotification}
                    onChange={(e) => setSendPushNotification(e.target.checked)}
                    className="w-5 h-5 text-amber-500 rounded focus:ring-amber-400 cursor-pointer accent-amber-500 shrink-0"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="btn-luxury-idle luxury-pressable px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-active luxury-pressable luxury-sheen-sweep px-7 py-3 text-amber-200 font-black rounded-2xl shadow-xl shadow-amber-500/25 transition-all text-xs cursor-pointer flex items-center gap-2"
                >
                  <Megaphone className="w-4 h-4 text-amber-400" />
                  <span>{editingPost ? 'Save Changes' : 'Publish & Broadcast Alert'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔍 LIGHTBOX MODAL FOR FULL-SIZE PHOTO ZOOM */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-3"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              title="Close image"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 max-h-[80vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption || 'Full resolution image'}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            {lightboxImage.caption && (
              <div className="px-5 py-2 rounded-full bg-black/80 border border-white/10 text-white text-xs font-bold text-center">
                {lightboxImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
