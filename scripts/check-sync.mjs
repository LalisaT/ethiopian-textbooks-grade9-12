import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

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

async function check() {
  console.log('--- Checking official_announcements ---');
  const annSnap = await getDocs(collection(db, 'official_announcements'));
  console.log(`Found ${annSnap.size} announcements:`);
  annSnap.forEach(d => console.log(' [Ann] ID:', d.id, 'Title:', d.data().title));

  console.log('\n--- Checking broadcast_notifications ---');
  const notifSnap = await getDocs(collection(db, 'broadcast_notifications'));
  console.log(`Found ${notifSnap.size} notifications:`);
  for (const d of notifSnap.docs) {
    console.log(' [Notif] ID:', d.id, 'Title:', d.data().title);
    if (d.data().title?.toLowerCase().includes('test') || d.id.includes('test')) {
      console.log(' -> Deleting test notification from Firestore:', d.id);
      await deleteDoc(doc(db, 'broadcast_notifications', d.id));
    }
  }

  console.log('\nDone.');
  process.exit(0);
}

check().catch(console.error);
