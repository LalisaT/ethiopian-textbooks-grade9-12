import React, { useState, useEffect } from 'react';
import { CommunityPost } from '../types/post';
import { Book } from '../types/book';
import { PostService } from '../services/postService';
import { NotificationService } from '../services/notificationService';
import {
  Megaphone,
  PlusCircle,
  Heart,
  MessageSquare,
  Pin,
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
} from 'lucide-react';

interface CommunityPostsPageProps {
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
  onSelectBook?: (book: Book) => void;
  onNavigateTab?: (tab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about') => void;
  allBooks?: Book[];
}

export const CommunityPostsPage: React.FC<CommunityPostsPageProps> = ({
  isAdmin = false,
  onOpenAdminLogin,
  onSelectBook,
  onNavigateTab,
  allBooks = [],
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityPost['category']>('Exam Announcement');
  const [grade, setGrade] = useState('All Grades (9-12)');
  const [subject, setSubject] = useState('All Subjects');
  const [isPinned, setIsPinned] = useState(true);
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

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const refreshPosts = () => {
    setPosts(PostService.getPosts());
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  // Web Speech Audio Synthesizer for Read Aloud
  const handleReadAloud = (post: CommunityPost) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this device/browser.');
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
      setActionUrl('tab:explore');
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
      setActionUrl('tab:examprep');
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
      // Edit existing post
      PostService.editPost(editingPost.id, {
        title: title.trim(),
        content: content.trim(),
        category,
        grade,
        subject: subject.trim() || 'General',
        pinned: isPinned,
        attachedBookId: attachedBookId || undefined,
        attachedBookTitle: targetAttachedBookTitle,
        actionUrl: actionUrl || undefined,
        linkUrl: linkUrl.trim() || undefined,
        linkTitle: linkTitle.trim() || undefined,
        linkType: linkType || undefined,
        imageUrl: imageUrl.trim() || undefined,
        imageCaption: imageCaption.trim() || undefined,
      });
      setEditingPost(null);
    } else {
      // Create new post
      PostService.createPost({
        author: authorName.trim() || 'Admin @lalion',
        authorRole: 'admin',
        title: title.trim(),
        content: content.trim(),
        category,
        grade,
        subject: subject.trim() || 'General',
        isOfficial: true,
        pinned: isPinned,
        attachedBookId: attachedBookId || undefined,
        attachedBookTitle: targetAttachedBookTitle,
        actionUrl: actionUrl || undefined,
        linkUrl: linkUrl.trim() || undefined,
        linkTitle: linkTitle.trim() || undefined,
        linkType: linkType || undefined,
        imageUrl: imageUrl.trim() || undefined,
        imageCaption: imageCaption.trim() || undefined,
      });
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
    setIsCreateModalOpen(false);
    refreshPosts();
  };

  const handleOpenEditModal = (post: CommunityPost) => {
    setEditingPost(post);
    setAuthorName(post.author);
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-8 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Megaphone className="w-4 h-4" />
              <span>Student Notice Board & Alerts Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Official Announcements & Study Notices
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Stay updated with Ministry of Education alerts, Grade 12 EUEE schedules, curriculum updates, and discussion tips for Grades 9-12.
            </p>
          </div>

          {/* Admin Create / Broadcast Action */}
          <div>
            {isAdmin ? (
              <button
                onClick={() => {
                  setEditingPost(null);
                  setTitle('');
                  setContent('');
                  setIsCreateModalOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm shrink-0"
              >
                <PlusCircle className="w-5 h-5" />
                <span>+ Post Announcement</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Admin Feed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills & Quick Filter Buttons */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setShowOnlyBookmarked(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all' && !showOnlyBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>All Notices ({posts.length})</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('Exam Announcement');
              setShowOnlyBookmarked(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'Exam Announcement' && !showOnlyBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Exam Alerts</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('Curriculum Update');
              setShowOnlyBookmarked(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'Curriculum Update' && !showOnlyBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Updates</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('Study Tip');
              setShowOnlyBookmarked(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'Study Tip' && !showOnlyBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Study Tips</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('General Notice');
              setShowOnlyBookmarked(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'General Notice' && !showOnlyBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Ministry Notices</span>
          </button>

          <button
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              showOnlyBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-current' : ''}`} />
            <span>Saved Bookmarks</span>
          </button>
        </div>

        {/* Search & Grade Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements by keyword, topic, or subject..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Grade Filter */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-bold"
            >
              <option value="all">All Grades (9-12)</option>
              <option value="Grade 12">Grade 12 (EUEE / Matric)</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
            </select>
          </div>
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
              className={`bg-white dark:bg-slate-900 rounded-3xl border p-6 sm:p-7 shadow-md transition-all space-y-5 ${
                post.pinned
                  ? 'border-amber-400 dark:border-amber-600/60 ring-1 ring-amber-400/30'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${
                      post.authorRole === 'admin'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950'
                        : post.authorRole === 'teacher'
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                    }`}
                  >
                    {post.authorRole === 'admin' ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {post.author}
                      </span>
                      {post.isOfficial && (
                        <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 rounded-full text-[10px] font-black border border-amber-300 dark:border-amber-800">
                          Official
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.grade}</span>
                      {post.subject && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">{post.subject}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                    {post.category}
                  </span>

                  {post.pinned && (
                    <span className="p-1.5 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl" title="Pinned Announcement">
                      <Pin className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePin(post.id)}
                        className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg transition-colors"
                        title={post.pinned ? 'Unpin' : 'Pin to top'}
                      >
                        <Pin className={`w-3.5 h-3.5 ${post.pinned ? 'fill-current text-amber-500' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(post)}
                        className="p-1.5 text-slate-400 hover:text-emerald-500 rounded-lg transition-colors"
                        title="Edit post"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Body Content */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
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
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 cursor-pointer shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="aspect-[16/9] sm:aspect-[21/9] max-h-80 w-full overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.imageCaption || post.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Hover Zoom Overlay Banner */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 sm:p-4 text-white">
                      <span className="text-xs font-bold truncate max-w-[80%]">
                        {post.imageCaption || 'Click to view full image'}
                      </span>
                      <div className="p-1.5 rounded-xl bg-black/60 backdrop-blur-xs text-white">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Persistent Caption Tag if present */}
                    {post.imageCaption && (
                      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                        <span>{post.imageCaption}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Attached Resource / Action Link / External URL Buttons */}
              {(post.attachedBookId || post.actionUrl || post.linkUrl) && (
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  {post.attachedBookId && (
                    <button
                      onClick={() => {
                        const book = allBooks.find((b) => b.id === post.attachedBookId);
                        if (book && onSelectBook) {
                          onSelectBook(book);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors shadow-sm active:scale-95"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Open Attached Textbook: {post.attachedBookTitle || 'View Textbook'} &rarr;</span>
                    </button>
                  )}

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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors shadow-sm active:scale-95"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Launch Associated Practice / Portal &rarr;</span>
                    </button>
                  )}

                  {post.linkUrl && (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 border ${
                        post.linkType === 'download'
                          ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20'
                          : post.linkType === 'telegram'
                          ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900'
                          : post.linkType === 'youtube'
                          ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900'
                          : post.linkType === 'drive'
                          ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900'
                          : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900'
                      }`}
                    >
                      {post.linkType === 'download' ? (
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Download className="w-3.5 h-3.5 text-white" />
                        </div>
                      ) : post.linkType === 'telegram' ? (
                        <Send className="w-4 h-4 text-sky-500" />
                      ) : post.linkType === 'youtube' ? (
                        <PlayCircle className="w-4 h-4 text-rose-500" />
                      ) : post.linkType === 'drive' ? (
                        <FileText className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Globe className="w-4 h-4 text-indigo-500" />
                      )}
                      <span>{post.linkTitle || (post.linkType === 'download' ? 'Download Resource File' : 'Open Official Link')}</span>
                      {post.linkType === 'download' ? <Download className="w-3.5 h-3.5 text-white/90" /> : <ExternalLink className="w-3.5 h-3.5 opacity-70" />}
                    </a>
                  )}
                </div>
              )}

              {/* Post Interactive Buttons Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Like Button */}
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      post.likedByMe
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title="Like Post"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        post.likedByMe ? 'fill-current text-rose-500' : ''
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment / Reply Button */}
                  <button
                    onClick={() =>
                      setExpandedComments({
                        ...expandedComments,
                        [post.id]: !expandedComments[post.id],
                      })
                    }
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      expandedComments[post.id]
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                    title="View & Post Comments"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {post.comments.length > 0
                        ? `${post.comments.length} Comments`
                        : 'Comments'}
                    </span>
                  </button>

                  {/* Read Aloud (Audio) Button */}
                  <button
                    onClick={() => handleReadAloud(post)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      speakingPostId === post.id
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 animate-pulse'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                    title={speakingPostId === post.id ? 'Stop audio' : 'Listen to announcement (Read Aloud)'}
                  >
                    {speakingPostId === post.id ? (
                      <>
                        <VolumeX className="w-4 h-4 text-rose-500" />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="hidden sm:inline">Listen</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(post.id)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      post.isBookmarked
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-amber-500'
                    }`}
                    title={post.isBookmarked ? 'Remove Bookmark' : 'Bookmark Announcement'}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current text-amber-500' : ''}`} />
                  </button>

                  {/* Share / Copy Link Button */}
                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors active:scale-95"
                    title="Share announcement"
                  >
                    {copiedPostId === post.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-black">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Expandable Comments Section */}
              {expandedComments[post.id] && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                  {/* Existing comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {post.comments.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/60 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-900 dark:text-white">
                              {c.author}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(c.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300">
                            {c.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({
                          ...commentInputs,
                          [post.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      placeholder="Write a comment or question..."
                      className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Post Modal (Admin Only) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-auto text-slate-900 dark:text-slate-100">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg">
                    {editingPost ? 'Edit Announcement' : 'Publish New Announcement'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official announcements are broadcasted to all students with push notification alerts & sound chimes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingPost(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Template Presets */}
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/40 space-y-2">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Preset Templates:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('exam')}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                >
                  <Award className="w-3 h-3 text-amber-500" />
                  <span>Ministry Exam Alert</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('book')}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-emerald-500" />
                  <span>New Textbook Notice</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('tip')}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                >
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  <span>Weekly Study Tip</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('moe')}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                >
                  <Landmark className="w-3 h-3 text-cyan-500" />
                  <span>MOE Notice</span>
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS TOOLBAR FIRST */}
            <div className="p-4 bg-amber-500/10 dark:bg-amber-950/20 border-b border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Attach Media & Resources:</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">Select to customize</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalTab('photo')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all ${
                    activeModalTab === 'photo'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Picture</span>
                  {imageUrl && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalTab('link')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all ${
                    activeModalTab === 'link'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Link</span>
                  {linkUrl && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalTab('book')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all ${
                    activeModalTab === 'book'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Book</span>
                  {attachedBookId && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>}
                </button>
              </div>

              {/* Template Presets Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 font-bold">Presets:</span>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('exam')}
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[10px] font-bold transition-colors"
                >
                  Exam Alert
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('book')}
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[10px] font-bold transition-colors"
                >
                  Book Notice
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('tip')}
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[10px] font-bold transition-colors"
                >
                  Study Tip
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('moe')}
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 text-slate-800 dark:text-slate-200 rounded-lg text-[10px] font-bold transition-colors"
                >
                  MOE Notice
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 py-2 px-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-300 rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device / Phone</span>
                    </button>

                    <input
                      type="url"
                      value={imageUrl.startsWith('data:') ? '' : imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or paste Image URL..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] text-amber-600 dark:text-amber-300 border border-slate-200 dark:border-slate-700 font-bold"
                    >
                      Exam Session
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Ethiopian Curriculum Textbooks');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] text-emerald-600 dark:text-emerald-300 border border-slate-200 dark:border-slate-700 font-bold"
                    >
                      Textbooks Library
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Science & Laboratory Experiment');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] text-sky-600 dark:text-sky-300 border border-slate-200 dark:border-slate-700 font-bold"
                    >
                      Science Lab
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Student Study Group');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] text-purple-600 dark:text-purple-300 border border-slate-200 dark:border-slate-700 font-bold"
                    >
                      Student Group
                    </button>
                  </div>

                  {/* Live Picture Preview Card */}
                  {imageUrl && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-2 space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-black/40">
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
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white transition-all shadow-md active:scale-95"
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
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 🔗 LINK ATTACHMENT SECTION */}
              {activeModalTab === 'link' && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-amber-500" />
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
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <select
                        value={linkType}
                        onChange={(e) => setLinkType(e.target.value as any)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
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
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
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
                      className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-[10px] font-bold"
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
                      className="px-2 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 text-[10px] font-bold"
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
                      className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold"
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
                      className="px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-[10px] font-bold"
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
                      className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-[10px] font-bold"
                    >
                      Google Drive
                    </button>
                  </div>
                </div>
              )}

              {/* 📚 TEXTBOOK ATTACHMENT SECTION */}
              {activeModalTab === 'book' && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">
                        Attach Specific Textbook:
                      </label>
                      <select
                        value={attachedBookId}
                        onChange={(e) => setAttachedBookId(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
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
                      <label className="font-bold text-slate-700 dark:text-slate-300">
                        Action Destination Link:
                      </label>
                      <select
                        value={actionUrl}
                        onChange={(e) => setActionUrl(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Publisher / Admin Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Admin @lalion"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Post Title:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grade 12 EUEE National Exam Revision Center Activated"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Exam Announcement">Exam Announcement</option>
                    <option value="Curriculum Update">Curriculum Update</option>
                    <option value="Study Tip">Study Tip</option>
                    <option value="Q&A">Q&A</option>
                    <option value="General Notice">General Notice</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Target Grade:
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="All Grades (9-12)">All Grades (9-12)</option>
                    <option value="Grade 12 (EUEE / Matric)">Grade 12 (EUEE / Matric)</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Subject / Topic:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Mathematics, Science"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Announcement Message:
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your official announcement here..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Pin Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                />
                <label htmlFor="pinCheck" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pin this announcement at top of notice board</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Megaphone className="w-4 h-4" />
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
