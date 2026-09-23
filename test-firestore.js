import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';

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

async function testFirestore() {
  console.log('Testing connection to Firebase project: ethiopian-textbooks');
  try {
    const testDocRef = doc(db, 'official_announcements', 'test_sync_probe');
    await setDoc(testDocRef, {
      title: 'Sync Probe Test',
      content: 'Testing Firestore writes',
      date: new Date().toISOString()
    });
    console.log('SUCCESS: Written test doc to official_announcements!');

    const querySnapshot = await getDocs(collection(db, 'official_announcements'));
    console.log(`SUCCESS: Read ${querySnapshot.size} documents from official_announcements:`);
    querySnapshot.forEach((d) => {
      console.log(' - Doc ID:', d.id, 'Data:', JSON.stringify(d.data()).slice(0, 100));
    });
  } catch (error) {
    console.error('FAILED Firestore test with error:', error);
  }
  process.exit(0);
}

testFirestore();
