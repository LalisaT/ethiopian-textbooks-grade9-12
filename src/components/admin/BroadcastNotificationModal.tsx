import React, { useState, useRef } from 'react';
import {
  Megaphone,
  X,
  Send,
  Volume2,
  Bell,
  Sparkles,
  Award,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Link as LinkIcon,
  Globe,
  PlayCircle,
  FileText,
  ExternalLink,
  Image as ImageIcon,
  Upload,
  Trash2,
  Camera,
  Layers,
  Download,
} from 'lucide-react';
import { NotificationService } from '../../services/notificationService';
import { PostService } from '../../services/postService';
import { Book } from '../../types/book';

interface BroadcastNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  allBooks?: Book[];
}

export const BroadcastNotificationModal: React.FC<BroadcastNotificationModalProps> = ({
  isOpen,
  onClose,
  allBooks = [],
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'Urgent Alert' | 'New Book' | 'Exam Prep' | 'Study Challenge'>('Exam Prep');
  const [targetGrade, setTargetGrade] = useState('All Grades (9-12)');
  const [isSuccess, setIsSuccess] = useState(false);

  // Picture States
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Link & Destination States
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkType, setLinkType] = useState<'website' | 'telegram' | 'youtube' | 'drive' | 'portal' | 'download'>('website');
  const [actionUrl, setActionUrl] = useState('tab:community');
  const [attachedBookId, setAttachedBookId] = useState('');
  const [alsoPostToCommunity, setAlsoPostToCommunity] = useState(true);

  // Active Attachment Toolbar Section
  const [activeTab, setActiveTab] = useState<'photo' | 'link' | 'book'>('photo');

  if (!isOpen) return null;

  const handlePlaySoundSample = () => {
    NotificationService.playSound();
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
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

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    let targetAttachedBookTitle: string | undefined;
    if (attachedBookId) {
      const book = allBooks.find((b) => b.id === attachedBookId);
      if (book) targetAttachedBookTitle = book.title;
    }

    // Determine target destination
    const destination = attachedBookId ? `book:${attachedBookId}` : actionUrl || 'tab:community';

    // 1. Dispatch Notification with Phone Chime & Vibration
    NotificationService.broadcastAdminAlert(
      title.trim(),
      message.trim(),
      category,
      targetGrade,
      destination
    );

    // 2. Also Publish to Community Notice Board if selected
    if (alsoPostToCommunity) {
      let postCat: 'Exam Announcement' | 'Curriculum Update' | 'Study Tip' | 'General Notice' = 'General Notice';
      if (category === 'Exam Prep') postCat = 'Exam Announcement';
      else if (category === 'New Book') postCat = 'Curriculum Update';
      else if (category === 'Study Challenge') postCat = 'Study Tip';

      PostService.createPost({
        author: 'Admin @lalion',
        authorRole: 'admin',
        title: title.trim(),
        content: message.trim(),
        category: postCat,
        grade: targetGrade,
        subject: 'Official Broadcast',
        isOfficial: true,
        pinned: true,
        attachedBookId: attachedBookId || undefined,
        attachedBookTitle: targetAttachedBookTitle,
        actionUrl: destination,
        linkUrl: linkUrl.trim() || undefined,
        linkTitle: linkTitle.trim() || undefined,
        linkType: linkType || undefined,
        imageUrl: imageUrl.trim() || undefined,
        imageCaption: imageCaption.trim() || undefined,
      });
    }

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setTitle('');
      setMessage('');
      setImageUrl('');
      setImageCaption('');
      setLinkUrl('');
      setLinkTitle('');
      setAttachedBookId('');
      setActionUrl('tab:community');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-800 shadow-2xl overflow-hidden flex flex-col my-auto text-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-black border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admin Push Broadcast with Sound</span>
              </div>
              <h3 className="font-black text-lg text-white">
                Post Announcement & Alert
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendBroadcast} className="p-6 sm:p-7 space-y-4">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-white">Broadcast & Post Dispatched!</h4>
              <p className="text-xs text-slate-400">
                Notification chime alert sent & published to Student Notice Board with picture & links.
              </p>
            </div>
          ) : (
            <>
              {/* 🌟 ACTION BUTTONS TOOLBAR FIRST (Picture, Link, Book, Templates) */}
              <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Quick Attachment Toolbar:</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Select what to attach</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('photo')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
                      activeTab === 'photo'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>📷 Picture</span>
                    {imageUrl && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('link')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
                      activeTab === 'link'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span>🔗 Link</span>
                    {linkUrl && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('book')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
                      activeTab === 'book'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>📚 Textbook</span>
                    {attachedBookId && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>
                    )}
                  </button>
                </div>
              </div>

              {/* 📷 PICTURE ATTACHMENT CARD */}
              {activeTab === 'photo' && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>Attach Post Picture / Photo:</span>
                    </label>
                    <span className="text-[10px] text-slate-400">File upload or URL</span>
                  </div>

                  {/* Hidden file input */}
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
                      className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Upload from Device / Phone</span>
                    </button>

                    <input
                      type="url"
                      value={imageUrl.startsWith('data:') ? '' : imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or paste Image URL..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-amber-300 border border-slate-800 font-bold"
                    >
                      🏆 Exam Session
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Ethiopian Curriculum Textbooks');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-emerald-300 border border-slate-800 font-bold"
                    >
                      📚 Textbooks Library
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Science & Laboratory Experiment');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-sky-300 border border-slate-800 font-bold"
                    >
                      🔬 Science Lab
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
                        setImageCaption('Student Study Group');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-purple-300 border border-slate-800 font-bold"
                    >
                      🎓 Student Group
                    </button>
                  </div>

                  {/* Live Picture Preview Card */}
                  {imageUrl && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/60 p-2 space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 🔗 LINK ATTACHMENT CARD */}
              {activeTab === 'link' && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4 text-amber-400" />
                      <span>Attach Web / Resource Link Button:</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Creates clickable button on post</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="sm:col-span-2 space-y-1">
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://t.me/... or https://moe.gov.et"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <select
                        value={linkType}
                        onChange={(e) => setLinkType(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="website">🌐 Web / Portal</option>
                        <option value="download">📥 Download / File Link</option>
                        <option value="telegram">📱 Telegram</option>
                        <option value="youtube">📺 Video Lesson</option>
                        <option value="drive">📁 Google Drive</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                      placeholder="Button Display Text (e.g. 'Join Official Telegram', 'Download Ministry PDF')"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  {/* Quick Link Helper Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] text-slate-400 font-bold">Quick Fill:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://moe.gov.et/downloads');
                        setLinkTitle('Download Curriculum PDF');
                        setLinkType('download');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-bold hover:bg-blue-900 transition-colors"
                    >
                      📥 Download File
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://t.me/ethio_students_grade5_8');
                        setLinkTitle('Join Telegram Student Channel');
                        setLinkType('telegram');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-sky-950 text-sky-300 border border-sky-800 text-[10px] font-bold hover:bg-sky-900 transition-colors"
                    >
                      📱 Telegram
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://moe.gov.et');
                        setLinkTitle('Visit Ministry of Education Portal');
                        setLinkType('website');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold hover:bg-indigo-900 transition-colors"
                    >
                      🏛 MOE Portal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://youtube.com');
                        setLinkTitle('Watch Video Lesson');
                        setLinkType('youtube');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold hover:bg-rose-900 transition-colors"
                    >
                      📺 Video Lesson
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkUrl('https://drive.google.com');
                        setLinkTitle('Open Google Drive Documents');
                        setLinkType('drive');
                      }}
                      className="px-2 py-0.5 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold hover:bg-amber-900 transition-colors"
                    >
                      📁 Google Drive
                    </button>
                  </div>
                </div>
              )}

              {/* 📚 TEXTBOOK ATTACHMENT CARD */}
              {activeTab === 'book' && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Attach Specific Grade 9-12 Textbook:</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Direct 1-click reader</span>
                  </div>

                  <select
                    value={attachedBookId}
                    onChange={(e) => setAttachedBookId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">None (General Announcement)</option>
                    {allBooks.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} (Grade {b.grade})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Preset Quick Chips */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">
                  Template Presets:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTitle('🚨 New Grade 12 ESSLCE Model Exam Papers Released!');
                      setMessage('Take the timed practice entrance tests across Natural and Social Science streams with step-by-step solutions.');
                      setCategory('Exam Prep');
                      setActionUrl('tab:examprep');
                      setLinkUrl('https://eaes.et');
                      setLinkTitle('Official EAES Exam Portal');
                      setLinkType('portal');
                      setImageUrl('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80');
                      setImageCaption('Grade 12 ESSLCE Exam Simulation Test');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-amber-300 font-bold border border-slate-700 transition-colors"
                  >
                    🏆 Exam Model Alert
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTitle('📚 New Grade 12 Textbooks Uploaded!');
                      setMessage('Official Ethiopian Curriculum textbooks are now available for 100% offline reading and study.');
                      setCategory('New Book');
                      setActionUrl('tab:explore');
                      setLinkUrl('https://t.me/ethio_students_grade9_12');
                      setLinkTitle('Join Telegram Student Channel');
                      setLinkType('telegram');
                      setImageUrl('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80');
                      setImageCaption('Grade 12 Textbooks Series');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-emerald-300 font-bold border border-slate-700 transition-colors"
                  >
                    📖 New Book Upload
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTitle('⏰ Daily 15-Minute Study Challenge');
                      setMessage('Complete your daily goal today to stay on track for your semester examinations.');
                      setCategory('Study Challenge');
                      setActionUrl('tab:examprep');
                      setLinkUrl('https://youtube.com');
                      setLinkTitle('Watch Video Study Guide');
                      setLinkType('youtube');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-blue-300 font-bold border border-slate-700 transition-colors"
                  >
                    💡 Daily Study Goal
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Announcement / Alert Title:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 🚨 New Grade 12 ESSLCE National Exam Papers Uploaded!"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Message Details (Pops up on phone notification area):
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write clear instructions or information for students..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              {/* 🔘 ATTACH ACTION & RESOURCE BUTTONS SECTION (In the exact circled area) */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-amber-400" />
                    <span>Attach Link & Resource Button:</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Adds clickable button to post</span>
                </div>

                {/* Quick Fill Button Presets */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://moe.gov.et/downloads');
                      setLinkTitle('Download Curriculum PDF');
                      setLinkType('download');
                      setActionUrl('tab:community');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                      linkType === 'download'
                        ? 'bg-blue-500 text-white border-blue-400 shadow-sm'
                        : 'bg-blue-950/60 text-blue-300 border-blue-800 hover:bg-blue-900'
                    }`}
                  >
                    📥 Download File
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://t.me/ethio_students_grade5_8');
                      setLinkTitle('Join Telegram Student Channel');
                      setLinkType('telegram');
                      setActionUrl('tab:community');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                      linkType === 'telegram' && linkUrl.includes('t.me')
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sm'
                        : 'bg-sky-950/60 text-sky-300 border-sky-800 hover:bg-sky-900'
                    }`}
                  >
                    📱 Telegram Channel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://moe.gov.et');
                      setLinkTitle('Visit Ministry of Education Portal');
                      setLinkType('website');
                      setActionUrl('tab:community');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                      linkType === 'website' && linkUrl.includes('moe.gov.et')
                        ? 'bg-indigo-500 text-white border-indigo-400 shadow-sm'
                        : 'bg-indigo-950/60 text-indigo-300 border-indigo-800 hover:bg-indigo-900'
                    }`}
                  >
                    🏛 MOE Portal
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://youtube.com');
                      setLinkTitle('Watch Video Lesson');
                      setLinkType('youtube');
                      setActionUrl('tab:community');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                      linkType === 'youtube'
                        ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                        : 'bg-rose-950/60 text-rose-300 border-rose-800 hover:bg-rose-900'
                    }`}
                  >
                    📺 Video Lesson
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://drive.google.com');
                      setLinkTitle('Open Google Drive Documents');
                      setLinkType('drive');
                      setActionUrl('tab:community');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                      linkType === 'drive'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-amber-950/60 text-amber-300 border-amber-800 hover:bg-amber-900'
                    }`}
                  >
                    📁 Google Drive
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActionUrl('tab:examprep');
                      setLinkTitle('Launch Model Exam Practice');
                      setLinkUrl('');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                      actionUrl === 'tab:examprep'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                    }`}
                  >
                    🏆 Exam Prep Hub
                  </button>
                </div>

                {/* Link URL & Type Selector Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="sm:col-span-2 space-y-1">
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="Enter Link URL (https://...)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <select
                      value={linkType}
                      onChange={(e) => setLinkType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="website">🌐 Web / Portal</option>
                      <option value="download">📥 Download / File Link</option>
                      <option value="telegram">📱 Telegram</option>
                      <option value="youtube">📺 Video Lesson</option>
                      <option value="drive">📁 Google Drive</option>
                    </select>
                  </div>
                </div>

                {/* Button Display Text & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    placeholder="Button Display Text (e.g. 'Download Ministry Exam PDF')"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />

                  <select
                    value={actionUrl}
                    onChange={(e) => setActionUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="tab:community">📢 Notice Board (Community)</option>
                    <option value="tab:examprep">🏆 Exam Practice Hub</option>
                    <option value="tab:explore">📚 Explore Textbooks</option>
                    <option value="tab:saved">🔖 Saved Library</option>
                  </select>
                </div>

                {/* Attach Specific Textbook Dropdown */}
                {allBooks.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Or Attach Specific Textbook Shortcut:</span>
                      </label>
                      {attachedBookId && (
                        <button
                          type="button"
                          onClick={() => setAttachedBookId('')}
                          className="text-[10px] text-rose-400 hover:underline"
                        >
                          Clear Book
                        </button>
                      )}
                    </div>
                    <select
                      value={attachedBookId}
                      onChange={(e) => setAttachedBookId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="">None (General Alert / Web Link Only)</option>
                      {allBooks.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.title} (Grade {b.grade})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Live Button Preview */}
                {(linkUrl || linkTitle || attachedBookId) && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-bold">Button Preview:</span>
                    {linkUrl ? (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold border ${
                        linkType === 'download'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : linkType === 'telegram'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : linkType === 'youtube'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : linkType === 'drive'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      }`}>
                        {linkType === 'download' ? '📥' : linkType === 'telegram' ? '📱' : linkType === 'youtube' ? '📺' : linkType === 'drive' ? '📁' : '🌐'}
                        <span>{linkTitle || (linkType === 'download' ? 'Download Resource' : 'Open Link')}</span>
                        {linkType === 'download' ? <Download className="w-3 h-3 text-blue-400" /> : <ExternalLink className="w-3 h-3" />}
                      </span>
                    ) : attachedBookId ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <BookOpen className="w-3 h-3" />
                        <span>Open Attached Textbook &rarr;</span>
                      </span>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Category & Target Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Exam Prep">🏆 Exam Prep Alert</option>
                    <option value="New Book">📚 New Textbook Published</option>
                    <option value="Urgent Alert">🚨 Urgent Announcement</option>
                    <option value="Study Challenge">💡 Study Goal / Tip</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Target Audience:
                  </label>
                  <select
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="All Grades (9-12)">All Grades (9, 10, 11, 12)</option>
                    <option value="Grade 12 Only">Grade 12 (ESSLCE / Matric)</option>
                    <option value="Grade 11 Only">Grade 11 (Preparatory)</option>
                    <option value="Grade 10 Only">Grade 10 (Secondary)</option>
                    <option value="Grade 9 Only">Grade 9 (Secondary)</option>
                  </select>
                </div>
              </div>

              {/* Also Publish to Notice Board Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="alsoPost"
                  checked={alsoPostToCommunity}
                  onChange={(e) => setAlsoPostToCommunity(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400 bg-slate-950 border-slate-700"
                />
                <label htmlFor="alsoPost" className="text-xs font-bold text-slate-300 cursor-pointer">
                  📢 Also publish as interactive post on Student Notice Board
                </label>
              </div>

              {/* Sound sample preview */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Phone chime sound & vibration will trigger</span>
                </div>
                <button
                  type="button"
                  onClick={handlePlaySoundSample}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold transition-all"
                >
                  Test Sound 🔊
                </button>
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-xl transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast Alert & Publish Post</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
