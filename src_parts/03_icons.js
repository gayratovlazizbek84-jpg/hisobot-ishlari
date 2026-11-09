// UI & General Icons
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  switch (name) {
    case 'dashboard':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      );
    case 'tables':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M4 18v3" /><path d="M20 18v3" />
          <path d="M4 11h16" />
          <rect width="18" height="6" x="3" y="5" rx="2" />
        </svg>
      );
    case 'menu':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      );
    case 'history':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l4 2" />
        </svg>
      );
    case 'stats':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    case 'settings':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'plus':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M5 12h14" /><path d="M12 5v14" />
        </svg>
      );
    case 'minus':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M5 12h14" />
        </svg>
      );
    case 'trash':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      );
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case 'close':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      );
    case 'search':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
      );
    case 'cash':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect width="20" height="12" x="2" y="6" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      );
    case 'card':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      );
    case 'printer':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect width="12" height="8" x="6" y="14" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'user':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      );
    case 'refresh':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
        </svg>
      );
    case 'edit':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      );
    case 'move':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" />
          <polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" />
          <line x1="2" x2="22" y1="12" y2="12" /><line x1="12" x2="12" y1="2" y2="22" />
        </svg>
      );
    case 'coffee-cup':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" />
        </svg>
      );
    case 'chef':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M6 13.8a4.5 4.5 0 1 1 2.6-8.2 4.5 4.5 0 0 1 6.8 0A4.5 4.5 0 1 1 18 13.8" />
          <path d="M6 17h12" />
          <path d="M6 21h12" />
          <path d="M7 14v7" /><path d="M17 14v7" />
        </svg>
      );
    case 'discount':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="m9 15 6-6" />
          <circle cx="9.5" cy="9.5" r="1.5" fill="currentColor" />
          <circle cx="14.5" cy="14.5" r="1.5" fill="currentColor" />
          <path d="M2.5 12a9.5 9.5 0 1 0 19 0 9.5 9.5 0 1 0-19 0Z" />
        </svg>
      );
    case 'download':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      );
    case 'calculator':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <line x1="8" x2="16" y1="6" y2="6" />
          <line x1="16" x2="16" y1="14" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      );
    case 'file-text':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
        </svg>
      );
    default:
      return null;
  }
};

// Delicious SVG Food & Drink Visuals
const FoodIcon = ({ name, className = "w-12 h-12" }) => {
  switch (name) {
    case 'hotdog':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <ellipse cx="32" cy="46" rx="26" ry="9" fill="#D4A373" />
          <ellipse cx="32" cy="43" rx="23" ry="7" fill="#FAEDCD" />
          <rect x="8" y="26" width="48" height="14" rx="7" transform="rotate(-4 32 33)" fill="#C84B31" />
          <path d="M12 30 Q 18 24, 24 33 T 36 31 T 48 33 T 54 28" stroke="#F1C40F" strokeWidth="3" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="24" rx="25" ry="9" fill="#E0A96D" />
          <circle cx="20" cy="22" r="1" fill="#FFF" opacity="0.7" />
          <circle cx="32" cy="19" r="1" fill="#FFF" opacity="0.7" />
          <circle cx="44" cy="22" r="1" fill="#FFF" opacity="0.7" />
        </svg>
      );
    case 'hamburger':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M14 46 C14 52, 50 52, 50 46 L50 42 L14 42 Z" fill="#D4A373" />
          <rect x="11" y="36" width="42" height="7" rx="3.5" fill="#58311B" />
          <path d="M12 34 L52 34 L48 40 L38 36 L24 40 L16 36 Z" fill="#F39C12" />
          <path d="M10 32 Q16 28 22 33 Q28 27 34 32 Q40 28 46 33 Q50 28 54 32 L53 35 L11 35 Z" fill="#2ECC71" />
          <rect x="13" y="27" width="38" height="5" rx="2.5" fill="#E74C3C" />
          <path d="M12 26 C12 12, 52 12, 52 26 Z" fill="#E0A96D" />
          <ellipse cx="22" cy="18" rx="1.5" ry="1" fill="#FFF" opacity="0.8" transform="rotate(-15 22 18)" />
          <ellipse cx="32" cy="15" rx="1.5" ry="1" fill="#FFF" opacity="0.8" />
          <ellipse cx="42" cy="19" rx="1.5" ry="1" fill="#FFF" opacity="0.8" transform="rotate(20 42 19)" />
          <ellipse cx="27" cy="22" rx="1.5" ry="1" fill="#FFF" opacity="0.8" />
          <ellipse cx="37" cy="22" rx="1.5" ry="1" fill="#FFF" opacity="0.8" />
        </svg>
      );
    case 'cheeseburger':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M14 47 C14 53, 50 53, 50 47 L50 43 L14 43 Z" fill="#D4A373" />
          <rect x="11" y="37" width="42" height="7" rx="3.5" fill="#58311B" />
          <path d="M10 36 L54 36 L48 44 L40 38 L30 44 L20 38 L14 44 Z" fill="#F1C40F" />
          <rect x="12" y="31" width="40" height="6" rx="3" fill="#6E2C00" />
          <path d="M11 31 Q17 26 23 31 Q29 25 35 30 Q41 26 47 31 L52 31 L12 31 Z" fill="#27AE60" />
          <rect x="14" y="26" width="36" height="5" rx="2.5" fill="#C0392B" />
          <path d="M12 25 C12 11, 52 11, 52 25 Z" fill="#E0A96D" />
          <ellipse cx="24" cy="17" rx="1.5" ry="1" fill="#FFF" opacity="0.85" />
          <ellipse cx="33" cy="15" rx="1.5" ry="1" fill="#FFF" opacity="0.85" />
          <ellipse cx="41" cy="18" rx="1.5" ry="1" fill="#FFF" opacity="0.85" />
        </svg>
      );
    case 'lavash':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M18 36 L22 56 L42 56 L46 36 Z" fill="#BDC3C7" />
          <path d="M18 36 L22 41 L42 41 L46 36 Z" fill="#E5E8E8" />
          <path d="M20 18 C20 15, 44 15, 44 18 L46 38 L18 38 Z" fill="#F7DC6F" />
          <line x1="22" y1="22" x2="42" y2="25" stroke="#BA4A00" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="21" y1="28" x2="43" y2="31" stroke="#BA4A00" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="20" y1="34" x2="44" y2="37" stroke="#BA4A00" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M22 18 C22 12 28 10 32 14 C36 10 42 12 42 18 Z" fill="#27AE60" />
          <circle cx="28" cy="13" r="3" fill="#C0392B" />
          <circle cx="36" cy="14" r="3.5" fill="#6E2C00" />
        </svg>
      );
    case 'fries':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="19" y="10" width="5" height="24" rx="2" fill="#F1C40F" transform="rotate(-12 21 22)" />
          <rect x="27" y="6" width="5" height="28" rx="2" fill="#F39C12" transform="rotate(-3 29 20)" />
          <rect x="34" y="8" width="5" height="26" rx="2" fill="#F1C40F" transform="rotate(7 36 21)" />
          <rect x="41" y="12" width="5" height="22" rx="2" fill="#F39C12" transform="rotate(15 43 23)" />
          <rect x="23" y="14" width="4" height="18" rx="2" fill="#FCF3CF" />
          <rect x="37" y="13" width="4" height="18" rx="2" fill="#FCF3CF" />
          <path d="M16 28 L20 56 L44 56 L48 28 C42 32 22 32 16 28 Z" fill="#E74C3C" />
          <circle cx="32" cy="42" r="7" fill="#F1C40F" />
          <circle cx="32" cy="42" r="5" fill="#E74C3C" />
        </svg>
      );
    case 'pizza':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M14 16 C26 12 38 12 50 16 L48 22 C38 18 26 18 16 22 Z" fill="#D35400" />
          <path d="M16 22 C26 18 38 18 48 22 L32 54 Z" fill="#F1C40F" />
          <circle cx="28" cy="27" r="4.5" fill="#C0392B" />
          <circle cx="29" cy="28" r="1.5" fill="#922B21" />
          <circle cx="38" cy="31" r="4" fill="#C0392B" />
          <circle cx="39" cy="32" r="1.5" fill="#922B21" />
          <circle cx="32" cy="41" r="3.5" fill="#C0392B" />
          <ellipse cx="23" cy="35" rx="3" ry="1.5" fill="#27AE60" transform="rotate(-30 23 35)" />
          <ellipse cx="36" cy="24" rx="2.5" ry="1.2" fill="#27AE60" transform="rotate(40 36 24)" />
        </svg>
      );
    case 'fanta':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="29" y="8" width="6" height="5" rx="1.5" fill="#2980B9" />
          <path d="M29 13 L27 22 L37 22 L35 13 Z" fill="#E67E22" />
          <rect x="24" y="22" width="16" height="34" rx="4" fill="#E67E22" />
          <rect x="24" y="30" width="16" height="15" fill="#2980B9" />
          <circle cx="32" cy="37.5" r="5" fill="#F39C12" />
          <circle cx="28" cy="48" r="1.2" fill="#FFF" opacity="0.7" />
          <circle cx="35" cy="51" r="1.5" fill="#FFF" opacity="0.7" />
          <circle cx="31" cy="26" r="1" fill="#FFF" opacity="0.7" />
        </svg>
      );
    case 'cola':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="29" y="8" width="6" height="5" rx="1.5" fill="#BDC3C7" />
          <path d="M29 13 C29 13 25 18 24 24 C23 30 26 34 24 42 C23 48 24 56 25 56 L39 56 C40 56 41 48 40 42 C38 34 41 30 40 24 C39 18 35 13 35 13 Z" fill="#78281F" />
          <path d="M24.5 32 C26 34 38 34 39.5 32 L39.5 42 C38 44 26 44 24.5 42 Z" fill="#C0392B" />
          <path d="M25 38 Q32 34 39 37" stroke="#FFF" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'water':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="29" y="8" width="6" height="5" rx="1.5" fill="#3498DB" />
          <rect x="26" y="13" width="12" height="42" rx="4" fill="#EBF5FB" stroke="#AED6F1" strokeWidth="1.5" />
          <rect x="26" y="27" width="12" height="14" fill="#5DADE2" />
          <path d="M32 31 C32 31 35 34.5 35 36.5 C35 38.2 33.7 39.5 32 39.5 C30.3 39.5 29 38.2 29 36.5 C29 34.5 32 31 32 31 Z" fill="#FFF" />
        </svg>
      );
    case 'juice':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <line x1="38" y1="6" x2="30" y2="26" stroke="#E74C3C" strokeWidth="3" strokeLinecap="round" />
          <line x1="38" y1="6" x2="44" y2="10" stroke="#E74C3C" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 18 L24 54 L40 54 L44 18 Z" fill="#FAD7A0" stroke="#E59866" strokeWidth="1.5" />
          <path d="M21.5 24 L24.5 52 L39.5 52 L42.5 24 Z" fill="#F39C12" />
          <circle cx="44" cy="18" r="7" fill="#E67E22" />
          <circle cx="44" cy="18" r="5" fill="#F39C12" />
          <rect x="28" y="32" width="7" height="7" rx="1.5" fill="#FFF" opacity="0.6" transform="rotate(15 31 35)" />
        </svg>
      );
    case 'tea':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M26 12 Q28 8 26 5" stroke="#BDC3C7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M32 10 Q34 6 32 3" stroke="#BDC3C7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M38 12 Q40 8 38 5" stroke="#BDC3C7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="52" rx="22" ry="5" fill="#D5D8DC" />
          <path d="M18 20 C18 42 46 42 46 20 Z" fill="#2ECC71" />
          <path d="M19 20 C23 38 41 38 45 20 Z" fill="#F9E79F" />
          <ellipse cx="32" cy="20" rx="13" ry="3" fill="#D4AC0D" />
          <circle cx="43" cy="18" r="6" fill="#F4D03F" stroke="#F1C40F" strokeWidth="1" />
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M27 12 Q29 8 27 5" stroke="#BDC3C7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M35 12 Q37 8 35 5" stroke="#BDC3C7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="52" rx="22" ry="5" fill="#BDC3C7" />
          <path d="M18 20 L22 46 C22 48 42 48 42 46 L46 20 Z" fill="#3E2723" />
          <path d="M44 24 C50 24 50 36 43 38" stroke="#3E2723" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="21" rx="14" ry="4" fill="#6D4C41" />
          <path d="M32 23 C30 20 28 21 28 22 C28 23 32 25 32 25 C32 25 36 23 36 22 C36 21 34 20 32 23 Z" fill="#FFF" opacity="0.9" />
        </svg>
      );
    case 'cake':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M14 44 L48 44 L52 26 L26 26 Z" fill="#FADBD8" />
          <rect x="14" y="42" width="34" height="4" fill="#D35400" rx="1" />
          <line x1="16" y1="36" x2="50" y2="36" stroke="#F1948A" strokeWidth="2" />
          <path d="M26 26 L52 26 L42 20 L18 20 Z" fill="#FDFEFE" />
          <path d="M32 12 C30 15 28 18 32 21 C36 18 34 15 32 12 Z" fill="#E74C3C" />
          <circle cx="32" cy="11" r="1.5" fill="#27AE60" />
        </svg>
      );
    default:
      return (
        <div className={`flex items-center justify-center bg-amber-100 text-amber-800 rounded-xl ${className}`}>
          <Icon name="coffee-cup" className="w-6 h-6" />
        </div>
      );
  }
};
