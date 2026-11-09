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

