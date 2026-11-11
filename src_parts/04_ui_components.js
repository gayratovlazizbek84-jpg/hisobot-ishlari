// Toast Notifications System
const ToastContainer = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map(toast => {
        let bg = "bg-white border-amber-500 text-stone-900";
        let iconName = "check";
        let iconColor = "text-amber-600 bg-amber-50";

        if (toast.type === 'success') {
          bg = "bg-white border-emerald-500 text-stone-900";
          iconName = "check";
          iconColor = "text-emerald-600 bg-emerald-50";
        } else if (toast.type === 'error') {
          bg = "bg-white border-red-500 text-stone-900";
          iconName = "close";
          iconColor = "text-red-600 bg-red-50";
        } else if (toast.type === 'info') {
          bg = "bg-white border-blue-500 text-stone-900";
          iconName = "clock";
          iconColor = "text-blue-600 bg-blue-50";
        }

        return (
          <div 
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border-l-4 ${bg} transition-all duration-300 transform translate-y-0 min-w-[280px] max-w-sm`}
          >
            <div className={`p-2 rounded-xl ${iconColor}`}>
              <Icon name={iconName} className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-medium">
              <p className="font-semibold text-stone-800">{toast.title}</p>
              {toast.message && <p className="text-stone-500 text-xs mt-0.5">{toast.message}</p>}
            </div>
            <button 
              onClick={() => onDismiss(toast.id)}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <Icon name="close" className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

// Confirmation Modal
const ConfirmModal = ({ isOpen, title, message, confirmText = "Ha, tasdiqlayman", cancelText = "Bekor qilish", isDestructive = false, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-modal border border-stone-200 transform scale-100 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-2xl ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
            <Icon name={isDestructive ? 'trash' : 'alert'} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">{title}</h3>
            <p className="text-xs text-stone-500">Iltimos, amalni tasdiqlang</p>
          </div>
        </div>
        <p className="text-stone-600 text-sm mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl font-semibold text-stone-600 hover:bg-stone-100 text-sm transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-semibold text-white text-sm shadow-md transition ${
              isDestructive 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' 
                : 'bg-cafe-800 hover:bg-cafe-900 shadow-cafe-900/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Table Status Badge
const TableStatusBadge = ({ status }) => {
  switch (status) {
    case 'available':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot"></span>
          Bo‘sh
        </span>
      );
    case 'occupied':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-dot"></span>
          Band
        </span>
      );
    case 'payment_pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse-dot"></span>
          To‘lov kutilmoqda
        </span>
      );
    default:
      return null;
  }
};

// Cashier Avatar Component with Offline Fallback
const CashierAvatar = ({ size = "w-10 h-10", className = "" }) => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div className={`${size} rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-cafe-950 flex items-center justify-center font-black text-xs shadow-inner ${className}`}>
        AG
      </div>
    );
  }

  return (
    <img
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      alt="Alisher"
      onError={() => setHasError(true)}
      className={`${size} rounded-full object-cover ${className}`}
    />
  );
};

// Coffee Branch & Leaf Decorative Watermark for Sidebar
const CoffeeLeafWatermark = ({ className = "w-44 h-44 text-amber-500/15" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g opacity="0.9">
      <path d="M15 185 C35 125 85 95 175 45 C155 105 115 155 45 185 Z" fill="currentColor" />
      <path d="M45 185 C65 130 115 95 175 45" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.35" />
      <path d="M75 145 C95 150 115 142 140 120" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.25" />
      <path d="M95 115 C115 120 130 112 150 90" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.25" />
      <path d="M35 165 C10 135 18 85 78 45 C72 85 60 125 35 165 Z" fill="currentColor" opacity="0.65" />
      <circle cx="168" cy="52" r="5" fill="#F59E0B" opacity="0.45" />
      <circle cx="180" cy="62" r="4" fill="#F59E0B" opacity="0.35" />
      <circle cx="68" cy="180" r="5" fill="#F59E0B" opacity="0.35" />
    </g>
  </svg>
);

// Dashboard Stat Card
const StatCard = ({ title, value, subtext, icon, trend, color = "amber" }) => {
  const colorMap = {
    amber: "from-amber-500/10 to-transparent text-amber-700 border-amber-200 bg-amber-500/10",
    emerald: "from-emerald-500/10 to-transparent text-emerald-700 border-emerald-200 bg-emerald-500/10",
    indigo: "from-indigo-500/10 to-transparent text-indigo-700 border-indigo-200 bg-indigo-500/10",
    cafe: "from-cafe-700/10 to-transparent text-cafe-800 border-cafe-200 bg-cafe-700/10",
    orange: "from-orange-500/10 to-transparent text-orange-700 border-orange-200 bg-orange-500/10",
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-card border border-stone-200/80 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${colorMap[color].split(' ')[0]} rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500`}></div>
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-2xl ${colorMap[color].split(' ').slice(1).join(' ')}`}>
          <Icon name={icon} className="w-5 h-5" />
        </div>
      </div>
      <div className="relative z-10">
        <h4 className="text-2xl font-extrabold text-stone-900 tracking-tight font-mono">{value}</h4>
        {subtext && (
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5 font-medium">
            {trend && <span className="text-emerald-600 font-bold">{trend}</span>}
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

// LOGIN PAGE COMPONENT (Matching screenshot bottom-left)
const LoginPage = ({ onLoginSuccess, onGoToRegister, onBackToApp }) => {
  const [email, setEmail] = React.useState('alisher@rayhon.uz');
  const [password, setPassword] = React.useState('123456');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError("Iltimos, email va parolni kiriting");
      return;
    }
    const user = {
      name: email.includes('alisher') ? "Alisher Gayratov" : "Kassir Foydalanuvchi",
      email: email,
      role: "Kassir",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    };
    try {
      localStorage.setItem('RAYHON_CAFE_AUTH_USER', JSON.stringify(user));
    } catch(e) {}
    playSound('cash');
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen bg-[#EDE5D8] flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200/80 grid grid-cols-1 md:grid-cols-2 relative">
        
        {/* Quick Back to App Button (if user already logged in) */}
        {onBackToApp && (
          <button
            onClick={onBackToApp}
            className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition flex items-center gap-1"
          >
            <span>Boshqaruvga qaytish</span>
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Left Side: Brand Showcase with Coffee Cup */}
        <div className="relative bg-[#170E08] text-white p-7 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[340px] md:min-h-[520px]">
          {/* Background image & gradient */}
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
            alt="Cafe"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C120B]/95 via-[#23150C]/90 to-[#120A05]/95 pointer-events-none"></div>

          {/* Brand header */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30 mb-2.5 p-2.5">
              <Icon name="coffee-cup" className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">Rayhon Cafe</h1>
            <p className="text-amber-400/90 text-xs font-semibold mt-1">Har doim siz bilan!</p>
          </div>

          {/* Center Latte Art Cup Illustration */}
          <div className="relative z-10 my-4 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#3D2516] to-[#1E110A] p-2 shadow-2xl border-2 border-amber-500/30 flex items-center justify-center relative">
              <div className="w-full h-full rounded-full bg-[#180E08] border border-amber-900/60 p-2 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#4F301D] to-[#2B180E] flex items-center justify-center relative shadow-inner">
                  <div className="w-12 h-12 rounded-full bg-[#D4A373] flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white drop-shadow" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <span className="absolute -top-2.5 left-1/3 w-1 h-3.5 bg-white/25 rounded-full animate-pulse"></span>
              <span className="absolute -top-3.5 right-1/3 w-1.5 h-4 bg-white/30 rounded-full animate-pulse delay-100"></span>
            </div>
          </div>

          <div className="relative z-10 text-center text-stone-400 text-xs">
            Boshqaruv tizimiga xavfsiz ulanish
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-7 sm:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Tizimga kirish</h2>
            <p className="text-xs text-stone-500 mt-1">Hisobingizga kirish uchun ma’lumotlarni kiriting</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Icon name="mail" className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingiz"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Icon name="lock" className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <Icon name={showPassword ? "eye-off" : "eye"} className="w-4 h-4" />
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-stone-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>Meni eslab qolish</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Parolni tiklash uchun administratorga murojaat qiling.")}
                className="text-amber-700 hover:text-amber-800 font-bold"
              >
                Parolni unutdingizmi?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
            >
              <span>Kirish</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <span className="relative px-3 bg-white text-xs text-stone-400 font-medium">
              yoki
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Icon name="google" className="w-4 h-4" />
              <span>Google bilan</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Icon name="telegram" className="w-4 h-4" />
              <span>Telegram bilan</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="text-center mt-5 text-xs text-stone-600">
            Hisobingiz yo‘qmi?{' '}
            <button
              type="button"
              onClick={onGoToRegister}
              className="text-amber-700 hover:text-amber-800 font-extrabold underline ml-1"
            >
              Ro‘yxatdan o‘ting
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// REGISTER PAGE COMPONENT (Matching screenshot bottom-right)
const RegisterPage = ({ onRegisterSuccess, onGoToLogin, onBackToApp }) => {
  const [fullName, setFullName] = React.useState('Alisher Gayratov');
  const [email, setEmail] = React.useState('alisher@rayhon.uz');
  const [password, setPassword] = React.useState('123456');
  const [confirmPassword, setConfirmPassword] = React.useState('123456');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Iltimos, barcha maydonlarni to‘ldiring");
      return;
    }
    if (password !== confirmPassword) {
      setError("Parollar mos kelmadi");
      return;
    }
    const user = {
      name: fullName,
      email: email,
      role: "Kassir",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    };
    try {
      localStorage.setItem('RAYHON_CAFE_AUTH_USER', JSON.stringify(user));
    } catch(e) {}
    playSound('cash');
    onRegisterSuccess(user);
  };

  return (
    <div className="min-h-screen bg-[#EDE5D8] flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200/80 grid grid-cols-1 md:grid-cols-2 relative">
        
        {/* Quick Back to App Button (if user already logged in) */}
        {onBackToApp && (
          <button
            onClick={onBackToApp}
            className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition flex items-center gap-1"
          >
            <span>Boshqaruvga qaytish</span>
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Left Side: Brand Showcase */}
        <div className="relative bg-[#170E08] text-white p-7 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[340px] md:min-h-[540px]">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
            alt="Cafe"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C120B]/95 via-[#23150C]/90 to-[#120A05]/95 pointer-events-none"></div>

          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30 mb-2.5 p-2.5">
              <Icon name="coffee-cup" className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">Rayhon Cafe</h1>
            <p className="text-amber-400/90 text-xs font-semibold mt-1">Yangi hisob oching</p>
          </div>

          <div className="relative z-10 my-4 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#3D2516] to-[#1E110A] p-2 shadow-2xl border-2 border-amber-500/30 flex items-center justify-center relative">
              <div className="w-full h-full rounded-full bg-[#180E08] border border-amber-900/60 p-2 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#4F301D] to-[#2B180E] flex items-center justify-center relative shadow-inner">
                  <div className="w-12 h-12 rounded-full bg-[#D4A373] flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white drop-shadow" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <span className="absolute -top-2.5 left-1/3 w-1 h-3.5 bg-white/25 rounded-full animate-pulse"></span>
              <span className="absolute -top-3.5 right-1/3 w-1.5 h-4 bg-white/30 rounded-full animate-pulse delay-100"></span>
            </div>
          </div>

          <div className="relative z-10 text-center text-stone-400 text-xs">
            Xush kelibsiz! Tizimga a’zo bo‘ling
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="p-7 sm:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-5">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Ro‘yxatdan o‘tish</h2>
            <p className="text-xs text-stone-500 mt-1">Yangi hisob yaratish uchun ma’lumotlarni kiriting</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Icon name="user" className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="To‘liq ism"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Icon name="mail" className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingiz"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Icon name="lock" className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <Icon name={showPassword ? "eye-off" : "eye"} className="w-4 h-4" />
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Icon name="lock" className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Parolni tasdiqlang"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
            >
              <span>Ro‘yxatdan o‘tish</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-center mt-5 text-xs text-stone-600">
            Allaqachon hisobingiz bormi?{' '}
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-amber-700 hover:text-amber-800 font-extrabold underline ml-1"
            >
              Kirish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

