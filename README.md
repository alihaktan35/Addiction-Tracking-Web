# Addiction Tracker 🎯

Modern, PWA uyumlu bağımlılık takip uygulaması. Firebase backend ile çalışır.

## 🎥 Demo

[![Demo Video](https://img.shields.io/badge/Demo-Video-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1HnzCBKecuTi3-WT2dFxipmZ0FbDmjgYQ/view)

## ✨ Özellikler

- 🔐 Kullanıcı kaydı ve girişi
- 📊 Çoklu bağımlılık takibi (Sigara, Alkol, Sosyal Medya, Şeker)
- ⏱️ Gün sayacı ve ilerleme gösterimi
- 💡 Kişiselleştirilmiş motivasyon ipuçları
- 📱 PWA desteği (Offline çalışma)
- 🎨 Responsive tasarım

## 🚀 Kurulum

### 1. Firebase Projesi

1. [Firebase Console](https://console.firebase.google.com)'da yeni proje oluşturun
2. **Authentication** > Email/Password'ü aktif edin
3. **Firestore Database** oluşturun ve Security Rules ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2. Config Dosyası

`config.js` oluşturun ve Firebase bilgilerinizi ekleyin:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

**⚠️ ÖNEMLİ:** `config.js` dosyasını `.gitignore`'a ekleyin!

### 3. Icon'ları Oluşturun

`icon-192.png` (192x192px) ve `icon-512.png` (512x512px) oluşturun.

### 4. Deploy

HTTPS destekli hosting'e yükleyin.

## 📱 PWA Kurulumu

- **Android:** Chrome > ⋮ > "Add to Home screen"
- **iOS:** Safari > Share > "Add to Home Screen"

## 🛠️ Teknolojiler

- Vanilla JavaScript
- Firebase (Auth + Firestore)
- Service Workers (PWA)
- CSS3 Animations

## 📝 Lisans

MIT License - Eğitim amaçlıdır.

---

⭐ Beğendiyseniz yıldız vermeyi unutmayın!