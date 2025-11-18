// Firebase Configuration
// Bu bilgileri Firebase Console'dan alacaksınız:
// 1. Firebase Console'a gidin (https://console.firebase.google.com)
// 2. Yeni proje oluşturun veya mevcut projeyi seçin
// 3. Project Settings > General > Your apps > Web app ekleyin
// 4. Firebase SDK snippet'i kopyalayın ve aşağıya yapıştırın

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:xxxxxxxxxxxxx"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();