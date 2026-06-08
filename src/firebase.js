// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, orderBy, serverTimestamp, query } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";


// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// console.log(app)
// console.log(db)


export async function saveQuestion(questionGivenByUser) {
    try {
        const docRef = await addDoc(collection(db, "questions"), {
            question: questionGivenByUser,
            reply: "awaiting reply...",
            createdAt: serverTimestamp()

        })
        // console.log("Document written with ID: ", docRef.id);
        window.location.reload()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


// const querySnapshot = await getDocs(collection(db, "questions"));
// querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data().question}`);
//     console.log(`${doc.id} => ${doc.data().reply}`);
// });

export async function getQuestions() {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"))   // desc => newest question first, asc => oldest question first
    const querySnapshot = await getDocs(q);
    const questions = [];
    querySnapshot.forEach((doc) => {
        questions.push(doc.data());
    });
    return questions;
}