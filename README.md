# Addiction Tracker 🎯

Modern, PWA uyumlu bağımlılık takip uygulaması. Firebase backend ile çalışır.

## ✨ Özellikler

- Kullanıcı kaydı ve girişi (Firebase Authentication)
- Çoklu bağımlılık takibi (Sigara, Alkol, Sosyal Medya, Şeker)
- Gün sayacı ve ilerleme gösterimi
- Kişiselleştirilmiş motivasyon ipuçları
- Offline çalışma desteği (PWA)
- Mobil responsive tasarım
- Cross-platform (Web, Android, iOS)

## 🚀 Hızlı Başlangıç

### 1. Firebase Projesi Oluşturun

1. [Firebase Console](https://console.firebase.google.com)'da yeni proje oluşturun
2. **Authentication** > Email/Password'ü aktif edin
3. **Firestore Database** oluşturun (production mode)
4. Firestore Security Rules'u ayarlayın:

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

### 2. Firebase Config Ayarları

`config.js` dosyasını oluşturun ve Firebase bilgilerinizi ekleyin:

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

### 3. İcon Dosyaları

Aşağıdaki icon'ları oluşturun:
- `icon-192.png` (192x192 px)
- `icon-512.png` (512x512 px)

### 4. Yayınlama

Dosyaları HTTPS destekli bir hosting'e yükleyin.

## 📱 PWA Kurulumu

**Android:** Chrome > Menü > "Add to Home screen"  
**iOS:** Safari > Share > "Add to Home Screen"

## 🗂️ Proje Yapısı

```
├── index.html          # Ana sayfa
├── styles.css          # Stil dosyası
├── app.js              # Uygulama mantığı
├── config.js           # Firebase ayarları (gitignore'a ekleyin!)
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── icon-192.png        # PWA icon
└── icon-512.png        # PWA icon
```

## 🔒 Güvenlik

- Firebase ayarlarınızı asla GitHub'a yüklemeyin
- `config.js` dosyasını `.gitignore`'a ekleyin
- Firestore Security Rules'u mutlaka yapılandırın

## 📊 Veritabanı Yapısı

```
users/{userId}
  ├── email: string
  ├── addictions: array
  │   ├── type: string
  │   ├── reason: string
  │   ├── goalDays: number
  │   └── startDate: string
  └── updatedAt: timestamp
```

## 🛠️ Teknolojiler

- Vanilla JavaScript
- Firebase Authentication
- Firebase Firestore
- Service Workers (PWA)
- CSS3 Animations

## 📝 Lisans

Bu proje eğitim amaçlıdır ve özgürce kullanılabilir.

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!