import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';

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

async function cleanPostGuide2() {
  console.log('--- Inspecting post-guide-2 in Firestore ---');
  const snap = await getDoc(doc(db, 'official_announcements', 'post-guide-2'));
  if (snap.exists()) {
    console.log('Current post-guide-2 data:', snap.data());
    // Remove actionUrl from post-guide-2
    await updateDoc(doc(db, 'official_announcements', 'post-guide-2'), {
      actionUrl: deleteField(),
    });
    console.log('Successfully deleted actionUrl from post-guide-2 in official_announcements');
  } else {
    console.log('post-guide-2 not found in official_announcements');
  }

  // Also check broadcast_notifications for post-guide-2
  const notifSnap = await getDoc(doc(db, 'broadcast_notifications', 'notif-post-post-guide-2'));
  if (notifSnap.exists()) {
    console.log('Current notification data:', notifSnap.data());
    await updateDoc(doc(db, 'broadcast_notifications', 'notif-post-post-guide-2'), {
      actionUrl: deleteField(),
    });
    console.log('Updated notif-post-post-guide-2');
  }

  const notifSnap2 = await getDoc(doc(db, 'broadcast_notifications', 'notif-post-guide-2'));
  if (notifSnap2.exists()) {
    await updateDoc(doc(db, 'broadcast_notifications', 'notif-post-guide-2'), {
      actionUrl: deleteField(),
    });
    console.log('Updated notif-post-guide-2');
  }

  process.exit(0);
}

cleanPostGuide2().catch(console.error);
