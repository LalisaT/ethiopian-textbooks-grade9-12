import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArJuvaayl0rM8GxxgGU_Birr9OiClGUEM",
  authDomain: "ethiopian-textbooks.firebaseapp.com",
  projectId: "ethiopian-textbooks",
  storageBucket: "ethiopian-textbooks.firebasestorage.app",
  messagingSenderId: "83809959551",
  appId: "1:83809959551:web:fa4d274718caeddb4b894a",
  measurementId: "G-VXRKFZRVB8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function sanitize(data) {
  const clean = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        clean[key] = sanitize(value);
      } else {
        clean[key] = value;
      }
    }
  }
  return clean;
}

const DEFAULT_POSTS = [
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

async function seed() {
  console.log('--- Cleaning up any test probe documents ---');
  try {
    await deleteDoc(doc(db, 'official_announcements', 'test_sync_probe'));
    await deleteDoc(doc(db, 'official_announcements', 'test_undef'));
    console.log('Cleaned probe documents.');
  } catch (e) {}

  console.log('--- Seeding official announcements to Firestore ---');
  for (const post of DEFAULT_POSTS) {
    const cleanPost = sanitize(post);
    await setDoc(doc(db, 'official_announcements', post.id), cleanPost, { merge: true });
    console.log(`Seeded post: ${post.id} - ${post.title}`);

    // Also seed corresponding broadcast notification
    const notif = sanitize({
      id: `notif-post-${post.id}`,
      postId: post.id,
      title: post.title,
      body: post.content,
      date: post.date,
      read: false,
      type: 'admin_broadcast',
      category: post.category,
      grade: post.grade,
      actionUrl: post.actionUrl || `tab:community#${post.id}`,
      imageUrl: post.imageUrl || '',
      imageCaption: post.imageCaption || '',
      linkUrl: post.linkUrl || '',
      linkTitle: post.linkTitle || '',
    });
    await setDoc(doc(db, 'broadcast_notifications', notif.id), notif, { merge: true });
    console.log(`Seeded notification: ${notif.id}`);
  }

  console.log('\n--- Current state of official_announcements ---');
  const annSnap = await getDocs(collection(db, 'official_announcements'));
  annSnap.forEach(d => console.log(' ->', d.id, ':', d.data().title));

  console.log('\n--- Current state of broadcast_notifications ---');
  const notifSnap = await getDocs(collection(db, 'broadcast_notifications'));
  notifSnap.forEach(d => console.log(' ->', d.id, ':', d.data().title));

  console.log('\nSeeding completed successfully!');
}

seed().catch(console.error).then(() => process.exit(0));
