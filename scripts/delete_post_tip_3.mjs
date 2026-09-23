import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc, setDoc, getDocs, collection } from 'firebase/firestore';

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

async function purgePostTip3() {
  console.log('--- Purging post-tip-3 from Firestore ---');
  try {
    await deleteDoc(doc(db, 'official_announcements', 'post-tip-3'));
    console.log('Deleted post-tip-3 from official_announcements');
  } catch (e) {
    console.error('Error deleting announcement:', e);
  }

  try {
    await deleteDoc(doc(db, 'broadcast_notifications', 'notif-post-post-tip-3'));
    await deleteDoc(doc(db, 'broadcast_notifications', 'notif-post-tip-3'));
    console.log('Deleted notification from broadcast_notifications');
  } catch (e) {
    console.error('Error deleting notification:', e);
  }

  try {
    await setDoc(doc(db, 'deleted_announcements', 'post-tip-3'), {
      id: 'post-tip-3',
      deletedAt: new Date().toISOString()
    });
    console.log('Registered post-tip-3 in deleted_announcements tombstone');
  } catch (e) {
    console.error('Error registering in deleted_announcements:', e);
  }

  console.log('\n--- Current official_announcements ---');
  const annSnap = await getDocs(collection(db, 'official_announcements'));
  annSnap.forEach(d => console.log(' ->', d.id, ':', d.data().title));

  process.exit(0);
}

purgePostTip3().catch(console.error);
