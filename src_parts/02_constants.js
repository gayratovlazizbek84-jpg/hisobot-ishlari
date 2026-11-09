// Web Audio API Sound Synthesizer
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (type === 'add') {
      // Pleasant high tap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'cash') {
      // Cash register bell chord
      const chords = [523.25, 659.25, 783.99, 1046.50];
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = ctx.currentTime + idx * 0.05;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.36);
      });
    } else if (type === 'delete') {
      // Soft low blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    }
  } catch (err) {
    // Ignore audio permission errors
  }
};

// Formatting helpers
const formatUZS = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "0 so'm";
  return Number(num).toLocaleString('uz-UZ').replace(/,/g, ' ') + " so'm";
};

const formatTime = (dateObj) => {
  const d = dateObj ? new Date(dateObj) : new Date();
  return d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateObj) => {
  const d = dateObj ? new Date(dateObj) : new Date();
  return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatDateTime = (dateObj) => {
  const d = dateObj ? new Date(dateObj) : new Date();
  return `${formatDate(d)}, ${formatTime(d)}`;
};

// CSV Export Helper
const exportToCSV = (data, filename = 'rayhon_kafe_savdo_tarixi.csv') => {
  if (!data || data.length === 0) return;
  const headers = ["Chek raqami", "Stol", "Ofitsiant", "Mahsulotlar", "Oraliq summa (so'm)", "Xizmat haqi (so'm)", "Chegirma (so'm)", "Jami to'lov (so'm)", "To'lov turi", "Sana va vaqt"];
  const rows = data.map(o => [
    `"${o.id}"`,
    `"${o.tableName}"`,
    `"${o.waiter || 'Alisher'}"`,
    `"${(o.items || []).map(i => `${i.name} (${i.quantity}x)`).join('; ')}"`,
    o.subtotal || o.total,
    o.serviceCharge || 0,
    o.discountAmount || 0,
    o.total,
    `"${o.paymentMethod}"`,
    `"${o.formattedDate}"`
  ]);
  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Waiters Staff List
const WAITERS_LIST = ["Alisher", "Sardor", "Malika", "Bobur", "Jasur"];

// Initial Sample Products
const DEFAULT_PRODUCTS = [
  // FOOD (Taomlar)
  { id: 'f1', name: 'Hot Dog', category: 'food', price: 18000, icon: 'hotdog', inStock: true, description: "Xantalli va sosiskali klassik issiq hot-dog" },
  { id: 'f2', name: 'Hamburger', category: 'food', price: 25000, icon: 'hamburger', inStock: true, description: "Shirali go'shtli kotlet va maxsus sousli burger" },
  { id: 'f3', name: 'Cheeseburger', category: 'food', price: 30000, icon: 'cheeseburger', inStock: true, description: "Eritilgan cheddar pishloqli mazali burger" },
  { id: 'f4', name: 'Lavash', category: 'food', price: 28000, icon: 'lavash', inStock: true, description: "Grilda qarsildoq pishirilgan tovuqli/go'shtli lavash" },
  { id: 'f5', name: 'French Fries', category: 'food', price: 15000, icon: 'fries', inStock: true, description: "Oltin rang qarsildoq fri kartoshkasi" },
  { id: 'f6', name: 'Pizza', category: 'food', price: 55000, icon: 'pizza', inStock: true, description: "Mozzarella pishlog'i va pepperoni kolbasali pitsa" },

  // DRINKS (Ichimliklar)
  { id: 'd1', name: 'Fanta 0.5L', category: 'drinks', price: 8000, icon: 'fanta', inStock: true, description: "Muzdek apelsinli tetiklantiruvchi ichimlik" },
  { id: 'd2', name: 'Fanta 2L', category: 'drinks', price: 20000, icon: 'fanta', inStock: true, description: "Katta dasturxonlar uchun 2 litrli gazli ichimlik" },
  { id: 'd3', name: 'Coca-Cola 1L', category: 'drinks', price: 12000, icon: 'cola', inStock: true, description: "Klassik ta'mga ega tetiklantiruvchi ichimlik" },
  { id: 'd4', name: 'Suv (0.5L)', category: 'drinks', price: 5000, icon: 'water', inStock: true, description: "Toza tabiiy gazsiz tog' suvi" },
  { id: 'd5', name: 'Sharbat (Sok)', category: 'drinks', price: 12000, icon: 'juice', inStock: true, description: "100% tabiiy mevali sharbat" },

  // COFFEE & DESSERT (Qahva va Shirinliklar)
  { id: 'c1', name: "Limonli ko'k choy", category: 'coffee', price: 7000, icon: 'tea', inStock: true, description: "Yalpiz va limonli xushbo'y shifobaxsh choy" },
  { id: 'c2', name: 'Kofe Americano', category: 'coffee', price: 14000, icon: 'coffee', inStock: true, description: "Yangi yanchilgan donali achchiq qora kofe" },
  { id: 'c3', name: 'Kapuchino', category: 'coffee', price: 18000, icon: 'coffee', inStock: true, description: "Qalin sut ko'pikli va dolchinli kapuchino" },
  { id: 'c4', name: 'Chizkeyk', category: 'coffee', price: 24000, icon: 'cake', inStock: true, description: "Klassik Nyu-York chizkeyki mevali qaymoq bilan" }
];

// Initial 10 Tables (Exact table 5 example from prompt included!)
const DEFAULT_TABLES = [
  { id: 1, name: "Stol 1", status: "available", order: [], openedAt: null, waiter: "Alisher", notes: "", discountPercent: 0 },
  { 
    id: 2, 
    name: "Stol 2", 
    status: "occupied", 
    order: [
      { id: 'f4', name: 'Lavash', price: 28000, quantity: 2, category: 'food' },
      { id: 'd3', name: 'Coca-Cola 1L', price: 12000, quantity: 2, category: 'drinks' },
      { id: 'f5', name: 'French Fries', price: 15000, quantity: 1, category: 'food' }
    ], 
    openedAt: "13:20", 
    waiter: "Sardor", 
    notes: "Sous alohida idishda berilsin",
    discountPercent: 0
  },
  { id: 3, name: "Stol 3", status: "available", order: [], openedAt: null, waiter: "Alisher", notes: "", discountPercent: 0 },
  { id: 4, name: "Stol 4", status: "available", order: [], openedAt: null, waiter: "Sardor", notes: "", discountPercent: 0 },
  { 
    id: 5, 
    name: "Stol 5", 
    status: "occupied", 
    order: [
      { id: 'f1', name: 'Hot Dog', price: 18000, quantity: 2, category: 'food' },
      { id: 'f2', name: 'Hamburger', price: 25000, quantity: 1, category: 'food' },
      { id: 'd2', name: 'Fanta 2L', price: 20000, quantity: 1, category: 'drinks' }
    ], 
    openedAt: "13:45", 
    waiter: "Alisher", 
    notes: "Ikkita stakan bering",
    discountPercent: 0
  },
  { id: 6, name: "Stol 6", status: "available", order: [], openedAt: null, waiter: "Alisher", notes: "", discountPercent: 0 },
  { 
    id: 7, 
    name: "Stol 7", 
    status: "payment_pending", 
    order: [
      { id: 'f6', name: 'Pizza', price: 55000, quantity: 1, category: 'food' },
      { id: 'f3', name: 'Cheeseburger', price: 30000, quantity: 1, category: 'food' },
      { id: 'd1', name: 'Fanta 0.5L', price: 8000, quantity: 1, category: 'drinks' }
    ], 
    openedAt: "13:10", 
    waiter: "Malika", 
    notes: "Hisob so'radi",
    discountPercent: 0
  },
  { id: 8, name: "Stol 8", status: "available", order: [], openedAt: null, waiter: "Bobur", notes: "", discountPercent: 0 },
  { id: 9, name: "Stol 9", status: "available", order: [], openedAt: null, waiter: "Jasur", notes: "", discountPercent: 0 },
  { id: 10, name: "Stol 10", status: "available", order: [], openedAt: null, waiter: "Alisher", notes: "", discountPercent: 0 }
];

// Initial Order History (Today's realistic orders)
const getInitialHistory = () => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const dateFormatted = formatDate(now);
  
  return [
    {
      id: "ORD-1091",
      tableId: 1,
      tableName: "Stol 1",
      items: [
        { id: 'f2', name: 'Hamburger', price: 25000, quantity: 2, category: 'food' },
        { id: 'd3', name: 'Coca-Cola 1L', price: 12000, quantity: 2, category: 'drinks' }
      ],
      subtotal: 74000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 74000,
      paymentMethod: "Naqd pul",
      cashReceived: 100000,
      cashChange: 26000,
      timestamp: `${todayStr}T10:45:00`,
      formattedDate: `${dateFormatted}, 10:45`,
      dateOnly: todayStr,
      waiter: "Alisher"
    },
    {
      id: "ORD-1092",
      tableId: 3,
      tableName: "Stol 3",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 1, category: 'food' },
        { id: 'f5', name: 'French Fries', price: 15000, quantity: 1, category: 'food' },
        { id: 'd1', name: 'Fanta 0.5L', price: 8000, quantity: 2, category: 'drinks' }
      ],
      subtotal: 86000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 86000,
      paymentMethod: "Plastik karta",
      cashReceived: 86000,
      cashChange: 0,
      timestamp: `${todayStr}T11:30:00`,
      formattedDate: `${dateFormatted}, 11:30`,
      dateOnly: todayStr,
      waiter: "Sardor"
    },
    {
      id: "ORD-1093",
      tableId: 4,
      tableName: "Stol 4",
      items: [
        { id: 'f4', name: 'Lavash', price: 28000, quantity: 3, category: 'food' },
        { id: 'd4', name: 'Suv (0.5L)', price: 5000, quantity: 3, category: 'drinks' }
      ],
      subtotal: 99000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 99000,
      paymentMethod: "Naqd pul",
      cashReceived: 100000,
      cashChange: 1000,
      timestamp: `${todayStr}T12:15:00`,
      formattedDate: `${dateFormatted}, 12:15`,
      dateOnly: todayStr,
      waiter: "Alisher"
    },
    {
      id: "ORD-1094",
      tableId: 8,
      tableName: "Stol 8",
      items: [
        { id: 'f3', name: 'Cheeseburger', price: 30000, quantity: 2, category: 'food' },
        { id: 'c3', name: 'Kapuchino', price: 18000, quantity: 2, category: 'coffee' },
        { id: 'c4', name: 'Chizkeyk', price: 24000, quantity: 1, category: 'coffee' }
      ],
      subtotal: 120000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 120000,
      paymentMethod: "Plastik karta",
      cashReceived: 120000,
      cashChange: 0,
      timestamp: `${todayStr}T12:55:00`,
      formattedDate: `${dateFormatted}, 12:55`,
      dateOnly: todayStr,
      waiter: "Malika"
    },
    {
      id: "ORD-1095",
      tableId: 6,
      tableName: "Stol 6",
      items: [
        { id: 'f1', name: 'Hot Dog', price: 18000, quantity: 1, category: 'food' },
        { id: 'd5', name: 'Sharbat (Sok)', price: 12000, quantity: 1, category: 'drinks' }
      ],
      subtotal: 30000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 30000,
      paymentMethod: "Naqd pul",
      cashReceived: 50000,
      cashChange: 20000,
      timestamp: `${todayStr}T13:25:00`,
      formattedDate: `${dateFormatted}, 13:25`,
      dateOnly: todayStr,
      waiter: "Bobur"
    }
  ];
};

const DEFAULT_SETTINGS = {
  cafeName: "Rayhon Cafe & Lounge",
  cafeTagline: "Shinam muhit va a'lo ta'm",
  phone: "+998 71 200-00-22",
  address: "Toshkent sh., Chilonzor tumani, 9-mavze",
  receiptNote: "Tashrifingiz uchun tashakkur! Yana kutamiz!",
  serviceFeePercent: 0,
  soundEnabled: true,
  currencySymbol: "so'm",
  currentCashier: "Alisher (Kassir)"
};
