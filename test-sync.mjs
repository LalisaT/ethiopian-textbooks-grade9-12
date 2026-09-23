import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

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

async function run() {
  console.log('--- Checking official_announcements ---');
  const annSnap = await getDocs(collection(db, 'official_announcements'));
  console.log(`Found ${annSnap.size} announcements`);
  annSnap.forEach(d => console.log('Doc:', d.id, d.data().title));

  console.log('\n--- Checking broadcast_notifications ---');
  const notifSnap = await getDocs(collection(db, 'broadcast_notifications'));
  console.log(`Found ${notifSnap.size} notifications`);
  notifSnap.forEach(d => console.log('Doc:', d.id, d.data().title));

  // Remove test_sync_probe if present
  try {
    await deleteDoc(doc(db, 'official_announcements', 'test_sync_probe'));
    console.log('Cleaned up test_sync_probe');
  } catch (e) {
    console.log('No test_sync_probe to clean');
  }
}

run().catch(console.error).then(() => process.exit(0));
