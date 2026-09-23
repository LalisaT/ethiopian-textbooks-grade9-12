import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArJuvaayl0rM8GxxgGU_Birr9OiClGUEM",
  authDomain: "ethiopian-textbooks.firebaseapp.com",
  projectId: "ethiopian-textbooks",
  storageBucket: "ethiopian-textbooks.firebasestorage.app",
  messagingSenderId: "83809959551",
  appId: "1:83809959551:web:fa4d274718caeddb4b894a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updatePostOfficial1() {
  console.log('--- Updating post-official-1 in Firestore with custom luxury banner ---');
  const snap = await getDoc(doc(db, 'official_announcements', 'post-official-1'));
  if (snap.exists()) {
    await updateDoc(doc(db, 'official_announcements', 'post-official-1'), {
      author: 'Exam Practice Hub',
      imageUrl: '/brand/exam-prep-banner.jpg',
      imageCaption: 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator',
    });
    console.log('Updated post-official-1 in official_announcements');
  }

  const notifSnap = await getDoc(doc(db, 'broadcast_notifications', 'notif-post-post-official-1'));
  if (notifSnap.exists()) {
    await updateDoc(doc(db, 'broadcast_notifications', 'notif-post-post-official-1'), {
      imageUrl: '/brand/exam-prep-banner.jpg',
      imageCaption: 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator',
    });
    console.log('Updated notif-post-post-official-1 in broadcast_notifications');
  }

  const notifSnap2 = await getDoc(doc(db, 'broadcast_notifications', 'notif-post-official-1'));
  if (notifSnap2.exists()) {
    await updateDoc(doc(db, 'broadcast_notifications', 'notif-post-official-1'), {
      imageUrl: '/brand/exam-prep-banner.jpg',
      imageCaption: 'Official Grade 12 EUEE / Matric National Exam Practice Hub & Model Simulator',
    });
    console.log('Updated notif-post-official-1 in broadcast_notifications');
  }

  console.log('Done!');
  process.exit(0);
}

updatePostOfficial1().catch(console.error);
