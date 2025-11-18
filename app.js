// Global Variables
let currentUser = null;
let currentAddiction = {
    type: '',
    reason: '',
    goalDays: 0,
    startDate: null
};

// Addiction Types with emojis and tips
const addictionData = {
    'cigarette': {
        emoji: '🚬',
        name: 'Sigara',
        tips: [
            'Sigara içme isteği genellikle 3-5 dakika sürer. Bu süreyi atlatın!',
            'Bol su için. Su içmek nikotin isteğini azaltır.',
            'Derin nefes egzersizleri yapın. 4 saniye içeri, 7 saniye tut, 8 saniye dışarı.',
            'Ellerinizi meşgul edin. Kalem, stres topu veya rozary kullanın.',
            'Sigarayı bıraktıktan sonraki ilk 3 gün en zor dönemdir. Dayanın!'
        ]
    },
    'alcohol': {
        emoji: '🍺',
        name: 'Alkol',
        tips: [
            'Alkol tükettiğiniz sosyal ortamlardan uzak durun.',
            'Sağlıklı alternatifler bulun: Meyve suyu, smoothie, çay.',
            'Spor yapın. Endorfin salgılanması alkol isteğini azaltır.',
            'Bir destek grubu bulun veya terapist ile görüşün.',
            'İlk 30 gün çok kritik. Her temiz gün bir başarıdır!'
        ]
    },
    'social-media': {
        emoji: '📱',
        name: 'Sosyal Medya',
        tips: [
            'Telefon bildirimlerini kapatın.',
            'Sosyal medya uygulamalarını ana ekrandan kaldırın.',
            'Ekran sürenizi takip edin ve günlük limitler koyun.',
            'Sabah uyandığınızda ilk 1 saat telefona bakmayın.',
            'Gerçek hayatta insanlarla yüz yüze vakit geçirin.'
        ]
    },
    'sugar': {
        emoji: '🍭',
        name: 'Şeker',
        tips: [
            'Evde şekerli yiyecek bulundurmayın.',
            'Tatlı krizlerinde meyve yiyin.',
            'Yeterli protein tüketin. Protein tokluk hissi verir.',
            'Bol su için. Bazen susuzluk tatlı isteği olarak algılanır.',
            'Kan şekerinizi dengede tutmak için düzenli ve sağlıklı öğünler yiyin.'
        ]
    }
};

// DOM Elements
const screens = {
    loading: document.getElementById('loading-screen'),
    auth: document.getElementById('auth-screen'),
    onboarding: document.getElementById('onboarding-screen'),
    dashboard: document.getElementById('dashboard-screen')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initOnboarding();
    initDashboard();
    
    // Check auth state
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            checkUserData();
        } else {
            showScreen('auth');
        }
    });
});

// Screen Management
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function showLoading(show = true) {
    screens.loading.classList.toggle('active', show);
}

// Authentication Functions
function initAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotForm = document.getElementById('forgot-form');
    
    // Form switches
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        forgotForm.classList.add('hidden');
        hideError();
    });
    
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        forgotForm.classList.add('hidden');
        hideError();
    });
    
    document.getElementById('show-forgot').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        forgotForm.classList.remove('hidden');
        hideError();
    });
    
    document.getElementById('back-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        forgotForm.classList.add('hidden');
        hideError();
    });
    
    // Login
    document.getElementById('login-btn').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            showError('Lütfen tüm alanları doldurun');
            return;
        }
        
        showLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            hideError();
        } catch (error) {
            showLoading(false);
            showError(getErrorMessage(error.code));
        }
    });
    
    // Register
    document.getElementById('register-btn').addEventListener('click', async () => {
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-password-confirm').value;
        
        if (!email || !password || !confirmPassword) {
            showError('Lütfen tüm alanları doldurun');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('Şifreler eşleşmiyor');
            return;
        }
        
        if (password.length < 6) {
            showError('Şifre en az 6 karakter olmalı');
            return;
        }
        
        showLoading(true);
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            hideError();
        } catch (error) {
            showLoading(false);
            showError(getErrorMessage(error.code));
        }
    });
    
    // Forgot Password
    document.getElementById('forgot-btn').addEventListener('click', async () => {
        const email = document.getElementById('forgot-email').value.trim();
        
        if (!email) {
            showError('Lütfen e-posta adresinizi girin');
            return;
        }
        
        showLoading(true);
        try {
            await auth.sendPasswordResetEmail(email);
            showLoading(false);
            showError('Şifre sıfırlama linki e-postanıza gönderildi', 'success');
        } catch (error) {
            showLoading(false);
            showError(getErrorMessage(error.code));
        }
    });
}

function showError(message, type = 'error') {
    const errorDiv = document.getElementById('auth-error');
    errorDiv.textContent = message;
    errorDiv.className = type === 'success' ? 'success-message' : 'error-message';
    errorDiv.classList.remove('hidden');
}

function hideError() {
    document.getElementById('auth-error').classList.add('hidden');
}

function getErrorMessage(code) {
    const messages = {
        'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanımda',
        'auth/invalid-email': 'Geçersiz e-posta adresi',
        'auth/user-not-found': 'Kullanıcı bulunamadı',
        'auth/wrong-password': 'Hatalı şifre',
        'auth/weak-password': 'Şifre çok zayıf',
        'auth/too-many-requests': 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin'
    };
    return messages[code] || 'Bir hata oluştu. Lütfen tekrar deneyin';
}

// Check if user has addictions data
async function checkUserData() {
    showLoading(true);
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        
        if (userDoc.exists && userDoc.data().addictions && userDoc.data().addictions.length > 0) {
            showScreen('dashboard');
            loadDashboard();
        } else {
            showScreen('onboarding');
        }
    } catch (error) {
        console.error('Error checking user data:', error);
        showScreen('onboarding');
    } finally {
        showLoading(false);
    }
}

// Onboarding Functions
function initOnboarding() {
    const progress = document.getElementById('onboarding-progress');
    let currentStep = 1;
    
    // Cancel buttons - return to dashboard (no confirmation)
    document.getElementById('step1-cancel').addEventListener('click', () => {
        resetOnboarding();
        showScreen('dashboard');
    });
    
    document.getElementById('reason-cancel').addEventListener('click', () => {
        resetOnboarding();
        showScreen('dashboard');
    });
    
    document.getElementById('goal-cancel').addEventListener('click', () => {
        resetOnboarding();
        showScreen('dashboard');
    });
    
    // Step 1: Addiction Type Selection
    document.querySelectorAll('.addiction-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.addiction-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            currentAddiction.type = card.dataset.type;
            
            // Auto-advance after selection
            setTimeout(() => {
                goToStep(2);
            }, 300);
        });
    });
    
    // Step 2: Reason
    document.getElementById('reason-back').addEventListener('click', () => goToStep(1));
    document.getElementById('reason-next').addEventListener('click', () => {
        const reasonInput = document.getElementById('addiction-reason');
        const reason = reasonInput.value.trim();
        if (!reason) {
            // Visual feedback - shake and red border
            reasonInput.classList.add('error');
            reasonInput.focus();
            setTimeout(() => reasonInput.classList.remove('error'), 500);
            return;
        }
        currentAddiction.reason = reason;
        goToStep(3);
    });
    
    // Step 3: Goal Days
    document.getElementById('goal-back').addEventListener('click', () => goToStep(2));
    
    document.querySelectorAll('.goal-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('goal-days').value = btn.dataset.days;
        });
    });
    
    document.getElementById('goal-finish').addEventListener('click', async () => {
        const goalInput = document.getElementById('goal-days');
        const goalDays = parseInt(goalInput.value);
        
        if (!goalDays || goalDays < 1) {
            // Visual feedback - shake and red border
            goalInput.classList.add('error');
            goalInput.focus();
            setTimeout(() => goalInput.classList.remove('error'), 500);
            return;
        }
        
        currentAddiction.goalDays = goalDays;
        currentAddiction.startDate = new Date().toISOString();
        
        await saveAddiction();
    });
    
    function goToStep(step) {
        currentStep = step;
        document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step-${step}`).classList.add('active');
        progress.style.width = `${(step / 3) * 100}%`;
    }
}

// Reset onboarding to initial state
function resetOnboarding() {
    // Reset current addiction data
    currentAddiction = {
        type: '',
        reason: '',
        goalDays: 0,
        startDate: null
    };
    
    // Reset form fields
    document.querySelectorAll('.addiction-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('addiction-reason').value = '';
    document.getElementById('goal-days').value = '';
    
    // Reset to step 1
    document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step-1').classList.add('active');
    document.getElementById('onboarding-progress').style.width = '33.33%';
}

async function saveAddiction() {
    showLoading(true);
    try {
        const userRef = db.collection('users').doc(currentUser.uid);
        const userDoc = await userRef.get();
        
        let addictions = [];
        if (userDoc.exists && userDoc.data().addictions) {
            addictions = userDoc.data().addictions;
        }
        
        addictions.push(currentAddiction);
        
        await userRef.set({
            email: currentUser.email,
            addictions: addictions,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        // Reset onboarding
        resetOnboarding();
        
        showScreen('dashboard');
        loadDashboard();
    } catch (error) {
        console.error('Error saving addiction:', error);
        // Silently fail - user can try again
    } finally {
        showLoading(false);
    }
}

// Dashboard Functions
function initDashboard() {
    document.getElementById('logout-btn').addEventListener('click', async () => {
        await auth.signOut();
        showScreen('auth');
    });
    
    document.getElementById('info-btn').addEventListener('click', () => {
        document.getElementById('info-modal').classList.add('active');
    });
    
    document.getElementById('close-info-modal').addEventListener('click', () => {
        document.getElementById('info-modal').classList.remove('active');
    });
    
    // Close info modal on background click
    document.getElementById('info-modal').addEventListener('click', (e) => {
        if (e.target.id === 'info-modal') {
            document.getElementById('info-modal').classList.remove('active');
        }
    });
    
    document.getElementById('add-addiction-btn').addEventListener('click', () => {
        resetOnboarding();
        showScreen('onboarding');
    });
    
    document.getElementById('close-detail-modal').addEventListener('click', () => {
        document.getElementById('detail-modal').classList.remove('active');
    });
    
    // Close modal on background click
    document.getElementById('detail-modal').addEventListener('click', (e) => {
        if (e.target.id === 'detail-modal') {
            document.getElementById('detail-modal').classList.remove('active');
        }
    });
    
    // Start timer updater
    startTimerUpdater();
}

async function loadDashboard() {
    showLoading(true);
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        const addictions = userDoc.data()?.addictions || [];
        
        const listContainer = document.getElementById('addictions-list');
        listContainer.innerHTML = '';
        
        if (addictions.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎯</div>
                    <p>Henüz bağımlılık eklemedin.<br>Hemen başla!</p>
                </div>
            `;
        } else {
            addictions.forEach((addiction, index) => {
                const item = createAddictionItem(addiction, index);
                listContainer.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
    } finally {
        showLoading(false);
    }
}

function createAddictionItem(addiction, index) {
    const data = addictionData[addiction.type];
    const startDate = new Date(addiction.startDate);
    const now = new Date();
    
    // Calculate time difference
    const diffMs = now - startDate;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    const daysPassed = days;
    const progress = Math.min((daysPassed / addiction.goalDays) * 100, 100);
    
    const div = document.createElement('div');
    div.className = 'addiction-item';
    div.innerHTML = `
        <div class="addiction-header">
            <div class="addiction-type">
                <span class="addiction-emoji">${data.emoji}</span>
                <span>${data.name}</span>
            </div>
        </div>
        <div class="addiction-stats">
            <div class="time-display">
                <div class="time-unit">
                    <span class="time-value">${days}</span>
                    <span class="time-label">Gün</span>
                </div>
                <span class="time-separator">:</span>
                <div class="time-unit">
                    <span class="time-value">${hours.toString().padStart(2, '0')}</span>
                    <span class="time-label">Saat</span>
                </div>
                <span class="time-separator">:</span>
                <div class="time-unit">
                    <span class="time-value">${minutes.toString().padStart(2, '0')}</span>
                    <span class="time-label">Dakika</span>
                </div>
            </div>
            <div class="days-label" style="margin-top: 12px;">Temiz Süre</div>
        </div>
        <div class="addiction-progress">
            <div class="progress-bar-addiction">
                <div class="progress-bar-fill" style="width: ${progress}%"></div>
            </div>
            <div class="progress-text">Hedef: ${addiction.goalDays} gün (${Math.round(progress)}%)</div>
        </div>
    `;
    
    div.addEventListener('click', () => showAddictionDetail(addiction, index));
    
    return div;
}

function showAddictionDetail(addiction, index) {
    const data = addictionData[addiction.type];
    const startDate = new Date(addiction.startDate);
    const now = new Date();
    const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('detail-content');
    
    content.innerHTML = `
        <div class="detail-header">
            <div class="detail-icon">${data.emoji}</div>
            <h2 class="detail-title">${data.name}</h2>
            <p>${daysPassed} gün temiz kaldın!</p>
        </div>
        
        <div class="detail-section">
            <h3>Neden Bırakıyorum?</h3>
            <p>${addiction.reason}</p>
        </div>
        
        <div class="detail-section">
            <h3>İpuçları ve Öneriler</h3>
            <ul class="tips-list">
                ${data.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
        
        <button class="btn delete-btn" onclick="deleteAddiction(${index})">
            Bağımlılığı Sil
        </button>
    `;
    
    modal.classList.add('active');
}

async function deleteAddiction(index) {
    showLoading(true);
    try {
        const userRef = db.collection('users').doc(currentUser.uid);
        const userDoc = await userRef.get();
        const addictions = userDoc.data().addictions;
        
        addictions.splice(index, 1);
        
        await userRef.update({
            addictions: addictions,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        document.getElementById('detail-modal').classList.remove('active');
        loadDashboard();
    } catch (error) {
        console.error('Error deleting addiction:', error);
        // Silently fail - modal will stay open, user can try again
    } finally {
        showLoading(false);
    }
}

// Make deleteAddiction globally accessible
window.deleteAddiction = deleteAddiction;

// Timer updater - updates every minute
let timerInterval = null;

function startTimerUpdater() {
    // Clear existing interval if any
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Update every minute (60000ms)
    timerInterval = setInterval(() => {
        // Only update if dashboard is active
        if (screens.dashboard.classList.contains('active')) {
            updateTimers();
        }
    }, 60000);
}

function stopTimerUpdater() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

async function updateTimers() {
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        const addictions = userDoc.data()?.addictions || [];
        
        addictions.forEach((addiction, index) => {
            updateSingleTimer(addiction, index);
        });
    } catch (error) {
        console.error('Error updating timers:', error);
    }
}

function updateSingleTimer(addiction, index) {
    const startDate = new Date(addiction.startDate);
    const now = new Date();
    
    // Calculate time difference
    const diffMs = now - startDate;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // Find the addiction item in DOM
    const addictionItems = document.querySelectorAll('.addiction-item');
    if (addictionItems[index]) {
        const timeValues = addictionItems[index].querySelectorAll('.time-value');
        if (timeValues.length === 3) {
            timeValues[0].textContent = days;
            timeValues[1].textContent = hours.toString().padStart(2, '0');
            timeValues[2].textContent = minutes.toString().padStart(2, '0');
        }
    }
}

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(err => console.log('SW registration failed:', err));
    });
}

// Cleanup timer on page unload
window.addEventListener('beforeunload', () => {
    stopTimerUpdater();
});

// Theme Management
function initTheme() {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved theme or default to user's system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');

    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update icon
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

// Initialize theme on page load
initTheme();

// Add theme toggle button event listener when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});