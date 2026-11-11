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

// Cashier Avatar Component with Dynamic Src & Offline Fallback
const CashierAvatar = ({ src, size = "w-10 h-10", className = "", alt = "Alisher Gayratov" }) => {
  const avatarSrc = src || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80";
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [avatarSrc]);

  if (hasError || !avatarSrc) {
    const initials = (alt || 'AG').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return (
      <div className={`${size} rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-stone-950 flex items-center justify-center font-black text-xs shadow-inner uppercase shrink-0 ${className}`}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={avatarSrc}
      alt={alt}
      onError={() => setHasError(true)}
      className={`${size} rounded-full object-cover shrink-0 ${className}`}
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

// PRODUCT CARD (Matching screenshot media_1794389708896_9c2eb201.jpg)
const ProductCard = ({ product, onSelect, inCartQuantity = 0, disabled = false }) => {
  const isDrinks = product.category === 'drinks';
  const badgeLabel = product.badge || (isDrinks ? 'ICHIMLIK' : 'TAOM');

  return (
    <div
      className={`bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full relative ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {/* Top Image Showcase Area */}
      <div>
        <div className="w-full h-40 sm:h-44 rounded-2xl flex items-center justify-center p-2 mb-3 bg-[#FAF8F5]/80 overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-full h-full items-center justify-center ${product.image ? 'hidden' : 'flex'}`}
          >
            <FoodIcon name={product.icon} className="w-24 h-24" />
          </div>

          {/* Cart Quantity Badge (if in active table order) */}
          {inCartQuantity > 0 && (
            <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-xs shadow-md border border-amber-300 animate-scale-up">
              {inCartQuantity}x
            </div>
          )}
        </div>

        {/* Category Badge & Product Info */}
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#FDF0E6] text-[#C05621] inline-block mb-1">
            {badgeLabel}
          </span>
          <h3 className="font-black text-stone-900 text-base sm:text-lg tracking-tight leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 font-medium leading-relaxed mt-1 line-clamp-2 min-h-[34px]">
            {product.description || "Mazali ta'm va yuqori sifatli ingredientlar"}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & Add Button */}
      <div className="pt-3.5 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <span className="font-black text-sm sm:text-base text-stone-900 tracking-tight">
          {formatUZS(product.price)}
        </span>
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect(product);
          }}
          className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:brightness-105 active:scale-95 disabled:opacity-50 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition shrink-0"
        >
          <Icon name="cart" className="w-3.5 h-3.5" />
          <span>Qo‘shish</span>
        </button>
      </div>
    </div>
  );
};

// REUSABLE LOGIN CARD (Matching screenshot bottom-left)
const LoginCard = ({ onLoginSuccess, onGoToRegister }) => {
  const [email, setEmail] = React.useState('alisher@rayhon.uz');
  const [password, setPassword] = React.useState('123456');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError("Iltimos, barcha maydonlarni to‘ldiring");
      return;
    }
    let existingUser = null;
    try {
      const saved = localStorage.getItem('RAYHON_CAFE_AUTH_USER');
      if (saved) existingUser = JSON.parse(saved);
    } catch(e) {}

    const user = {
      name: (existingUser && existingUser.email === email && existingUser.name) 
        ? existingUser.name 
        : (email.includes('alisher') ? "Alisher Gayratov" : (existingUser?.name || "Kassir")),
      email: email,
      role: "Kassir",
      avatar: (existingUser && existingUser.avatar) 
        ? existingUser.avatar 
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    };
    try {
      localStorage.setItem('RAYHON_CAFE_AUTH_USER', JSON.stringify(user));
    } catch(e) {}
    if (typeof playSound === 'function') playSound('cash');
    if (onLoginSuccess) onLoginSuccess(user);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200/90 grid grid-cols-1 md:grid-cols-2 relative h-full">
      {/* Left Side: Brand Showcase with Coffee Cup & Beans */}
      <div className="relative bg-[#170E08] text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] md:min-h-[460px]">
        {/* Background photo of cafe ambiance */}
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt="Cafe"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C120B]/95 via-[#23150C]/90 to-[#120A05]/95 pointer-events-none"></div>

        {/* Brand header */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30 mb-2 p-2">
            <Icon name="coffee-cup" className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">Rayhon Cafe</h1>
          <p className="text-amber-400/90 text-xs font-semibold mt-1">Har doim siz bilan!</p>
        </div>

        {/* Center Latte Art Cup on Saucer with Beans illustration */}
        <div className="relative z-10 my-4 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl border-4 border-[#3D2516]/80 ring-2 ring-amber-500/30 flex items-center justify-center relative bg-[#1B110A]">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                alt="Latte Cup"
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <p className="mt-3 text-xs text-amber-200/90 font-medium tracking-wide">
              Iliq muhit va mazali qahva ☕
            </p>
          </div>
        </div>

        <div className="relative z-10 text-center text-stone-400 text-xs">
          Boshqaruv tizimiga xavfsiz ulanish
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="p-6 sm:p-8 flex flex-col justify-center bg-white">
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">Tizimga kirish</h2>
          <p className="text-xs text-stone-500 mt-1">Hisobingizga kirish uchun ma’lumotlarni kiriting</p>
        </div>

        {error && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
              <Icon name="mail" className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email manzilingiz"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50/80 border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
              <Icon name="lock" className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-stone-50/80 border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
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
            <label className="flex items-center gap-2 cursor-pointer text-stone-600 select-none text-[11px] sm:text-xs">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span>Meni eslab qolish</span>
            </label>
            <button
              type="button"
              onClick={() => alert("Parolni tiklash uchun administratorga murojaat qiling.")}
              className="text-amber-700 hover:text-amber-800 font-bold text-[11px] sm:text-xs"
            >
              Parolni unutdingizmi?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition"
          >
            <span>Kirish</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </form>

        {/* Social login divider */}
        <div className="relative my-3.5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <span className="relative px-3 bg-white text-[11px] text-stone-400 font-medium">
            yoki
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-[11px] flex items-center justify-center gap-2 transition"
          >
            <Icon name="google" className="w-3.5 h-3.5" />
            <span>Google bilan</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-[11px] flex items-center justify-center gap-2 transition"
          >
            <Icon name="telegram" className="w-3.5 h-3.5" />
            <span>Telegram bilan</span>
          </button>
        </div>

        {/* Switch to Register */}
        <div className="text-center mt-4 text-[11px] sm:text-xs text-stone-600">
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
  );
};

// REUSABLE REGISTER CARD (Matching screenshot bottom-right)
const RegisterCard = ({ onRegisterSuccess, onGoToLogin }) => {
  const [fullName, setFullName] = React.useState('Alisher Gayratov');
  const [email, setEmail] = React.useState('alisher@rayhon.uz');
  const [password, setPassword] = React.useState('123456');
  const [confirmPassword, setConfirmPassword] = React.useState('123456');
  const [showPassword, setShowPassword] = React.useState(false);
  const [avatar, setAvatar] = React.useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80');
  const [error, setError] = React.useState('');

  const presetAvatars = [
    { label: "Alisher", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" },
    { label: "Sardor", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80" },
    { label: "Malika", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80" },
    { label: "Jasur", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80" }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setError("Rasm hajmi 3MB dan oshmasligi kerak");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      avatar: avatar
    };
    try {
      localStorage.setItem('RAYHON_CAFE_AUTH_USER', JSON.stringify(user));
    } catch(e) {}
    if (typeof playSound === 'function') playSound('cash');
    if (onRegisterSuccess) onRegisterSuccess(user);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200/90 grid grid-cols-1 md:grid-cols-2 relative h-full">
      {/* Left Side: Brand Showcase */}
      <div className="relative bg-[#170E08] text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] md:min-h-[460px]">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt="Cafe"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C120B]/95 via-[#23150C]/90 to-[#120A05]/95 pointer-events-none"></div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30 mb-2 p-2">
            <Icon name="coffee-cup" className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">Rayhon Cafe</h1>
          <p className="text-amber-400/90 text-xs font-semibold mt-1">Yangi hisob oching</p>
        </div>

        <div className="relative z-10 my-4 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl border-4 border-[#3D2516]/80 ring-2 ring-amber-500/30 flex items-center justify-center relative bg-[#1B110A]">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                alt="Latte Cup"
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <p className="mt-3 text-xs text-amber-200/90 font-medium tracking-wide">
              Biz bilan yangi marralar sari ✨
            </p>
          </div>
        </div>

        <div className="relative z-10 text-center text-stone-400 text-xs">
          Xush kelibsiz! Tizimga a’zo bo‘ling
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="p-6 sm:p-8 flex flex-col justify-center bg-white">
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">Ro‘yxatdan o‘tish</h2>
          <p className="text-xs text-stone-500 mt-0.5">Yangi hisob yaratish uchun ma’lumotlarni kiriting</p>
        </div>

        {error && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Avatar Selector / Upload */}
          <div className="flex items-center gap-3 p-2 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="relative group shrink-0">
              <CashierAvatar src={avatar} size="w-12 h-12" className="border-2 border-amber-500 shadow-xs" />
              <label className="absolute inset-0 bg-stone-950/60 rounded-full flex items-center justify-center cursor-pointer transition opacity-0 group-hover:opacity-100 text-white" title="Rasm yuklash">
                <Icon name="camera" className="w-4 h-4 text-amber-300" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-stone-700 block">Profil rasmi:</span>
              <div className="flex items-center gap-1.5 mt-1">
                {presetAvatars.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(p.url)}
                    className={`w-6 h-6 rounded-full overflow-hidden border transition ${
                      avatar === p.url ? 'ring-2 ring-amber-500 border-white scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={p.label}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  </button>
                ))}
                <label className="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1 ml-auto">
                  <Icon name="camera" className="w-3 h-3 text-amber-800" />
                  <span>Rasm qo‘yish</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
              <Icon name="user" className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="To‘liq ism"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50/80 border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
              <Icon name="mail" className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email manzilingiz"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50/80 border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
              <Icon name="lock" className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-stone-50/80 border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
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
              <Icon name="lock" className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Parolni tasdiqlang"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50/80 border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition"
          >
            <span>Ro‘yxatdan o‘tish</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-center mt-4 text-[11px] sm:text-xs text-stone-600">
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
  );
};

// LOGIN STANDALONE PAGE
const LoginPage = ({ onLoginSuccess, onGoToRegister, onBackToApp }) => (
  <div className="min-h-screen bg-[#EDE5D8] flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fade-in relative">
    {onBackToApp && (
      <button
        onClick={onBackToApp}
        className="absolute top-4 right-4 z-20 px-3.5 py-2 rounded-full bg-white shadow-md text-stone-800 text-xs font-extrabold transition hover:bg-stone-100 flex items-center gap-1.5"
      >
        <span>Boshqaruvga qaytish</span>
        <Icon name="arrow-right" className="w-3.5 h-3.5" />
      </button>
    )}
    <div className="max-w-4xl w-full">
      <LoginCard onLoginSuccess={onLoginSuccess} onGoToRegister={onGoToRegister} />
    </div>
  </div>
);

// REGISTER STANDALONE PAGE
const RegisterPage = ({ onRegisterSuccess, onGoToLogin, onBackToApp }) => (
  <div className="min-h-screen bg-[#EDE5D8] flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fade-in relative">
    {onBackToApp && (
      <button
        onClick={onBackToApp}
        className="absolute top-4 right-4 z-20 px-3.5 py-2 rounded-full bg-white shadow-md text-stone-800 text-xs font-extrabold transition hover:bg-stone-100 flex items-center gap-1.5"
      >
        <span>Boshqaruvga qaytish</span>
        <Icon name="arrow-right" className="w-3.5 h-3.5" />
      </button>
    )}
    <div className="max-w-4xl w-full">
      <RegisterCard onRegisterSuccess={onRegisterSuccess} onGoToLogin={onGoToLogin} />
    </div>
  </div>
);

