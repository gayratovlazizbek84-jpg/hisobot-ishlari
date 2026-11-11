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
const formatCurrency = formatUZS;

const formatTime = (dateObj) => {
  const d = dateObj ? new Date(dateObj) : new Date();
  return d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateObj) => {
  const d = dateObj ? new Date(dateObj) : new Date();
  return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatDateISO = (dateObj) => {
  const d = dateObj ? new Date(dateObj) : new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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

// Revenue Analysis Helper: 1 Kunlik, 1 Haftalik va 1 Oylik Daromatlar
const calculateRevenueMetrics = (orderHistory) => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  
  // Timestamps thresholds
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;

  // 1 Kunlik (Bugun)
  const todayOrders = orderHistory.filter(o => {
    const oTime = new Date(o.timestamp || o.dateOnly).getTime();
    return o.dateOnly === todayStr || oTime >= startOfToday;
  });
  const todaySales = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const todayOrdersCount = todayOrders.length;
  const todayAvgCheck = todayOrdersCount > 0 ? Math.round(todaySales / todayOrdersCount) : 0;
  const todayItemsSold = todayOrders.reduce((acc, o) => acc + (o.items || []).reduce((s, i) => s + i.quantity, 0), 0);

  // 1 Haftalik (Oxirgi 7 kun)
  const weekOrders = orderHistory.filter(o => {
    const oTime = new Date(o.timestamp || o.dateOnly).getTime();
    return oTime >= sevenDaysAgo;
  });
  const weekSales = weekOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const weekOrdersCount = weekOrders.length;
  const weekAvgCheck = weekOrdersCount > 0 ? Math.round(weekSales / weekOrdersCount) : 0;
  const weekItemsSold = weekOrders.reduce((acc, o) => acc + (o.items || []).reduce((s, i) => s + i.quantity, 0), 0);

  // 1 Oylik (Oxirgi 30 kun)
  const monthOrders = orderHistory.filter(o => {
    const oTime = new Date(o.timestamp || o.dateOnly).getTime();
    return oTime >= thirtyDaysAgo;
  });
  const monthSales = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const monthOrdersCount = monthOrders.length;
  const monthAvgCheck = monthOrdersCount > 0 ? Math.round(monthSales / monthOrdersCount) : 0;
  const monthItemsSold = monthOrders.reduce((acc, o) => acc + (o.items || []).reduce((s, i) => s + i.quantity, 0), 0);

  return {
    today: {
      sales: todaySales,
      ordersCount: todayOrdersCount,
      avgCheck: todayAvgCheck,
      itemsSold: todayItemsSold,
      orders: todayOrders
    },
    week: {
      sales: weekSales,
      ordersCount: weekOrdersCount,
      avgCheck: weekAvgCheck,
      itemsSold: weekItemsSold,
      orders: weekOrders
    },
    month: {
      sales: monthSales,
      ordersCount: monthOrdersCount,
      avgCheck: monthAvgCheck,
      itemsSold: monthItemsSold,
      orders: monthOrders
    }
  };
};

// Waiters Staff List
const WAITERS_LIST = ["Alisher", "Sardor", "Malika", "Bobur", "Jasur"];

// Initial Sample Products (Matching exact 10 products from screenshot media_1794389708896_9c2eb201.jpg)
const DEFAULT_PRODUCTS = [
  // 1. Hot Dog
  {
    id: 'f1',
    name: 'Hot Dog',
    category: 'food',
    badge: 'TAOM',
    price: 18000,
    icon: 'hotdog',
    inStock: true,
    description: "Xantal va sosiskali klassik issiq hot-dog",
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80"
  },
  // 2. Hamburger
  {
    id: 'f2',
    name: 'Hamburger',
    category: 'food',
    badge: 'TAOM',
    price: 25000,
    icon: 'hamburger',
    inStock: true,
    description: "Shirali go‘shtli kotlet va maxsus sousli burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  // 3. Cheeseburger
  {
    id: 'f3',
    name: 'Cheeseburger',
    category: 'food',
    badge: 'TAOM',
    price: 30000,
    icon: 'cheeseburger',
    inStock: true,
    description: "Eritilgan cheddar pishloqli mazali burger",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80"
  },
  // 4. Lavash
  {
    id: 'f4',
    name: 'Lavash',
    category: 'food',
    badge: 'TAOM',
    price: 28000,
    icon: 'lavash',
    inStock: true,
    description: "Grilda qarsildoq pishirilgan tovuqli go‘shtli lavash",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  // 5. French Fries
  {
    id: 'f5',
    name: 'French Fries',
    category: 'food',
    badge: 'TAOM',
    price: 15000,
    icon: 'fries',
    inStock: true,
    description: "Oltin rang qarsildoq fri kartoshkasi",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"
  },
  // 6. Pizza
  {
    id: 'f6',
    name: 'Pizza',
    category: 'food',
    badge: 'TAOM',
    price: 45000,
    icon: 'pizza',
    inStock: true,
    description: "Mozzarella pishlog‘i va pepperoni kolbasali pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  // 7. Fanta 0.5L
  {
    id: 'd1',
    name: 'Fanta 0.5L',
    category: 'drinks',
    badge: 'ICHIMLIK',
    price: 8000,
    icon: 'fanta',
    inStock: true,
    description: "Muzdek apelsinli tetiklantiruvchi ichimlik",
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=600&q=80"
  },
  // 8. Fanta 2L
  {
    id: 'd2',
    name: 'Fanta 2L',
    category: 'drinks',
    badge: 'ICHIMLIK',
    price: 15000,
    icon: 'fanta',
    inStock: true,
    description: "Katta dastuxonlar uchun 2 litrli gazli ichimlik",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80"
  },
  // 9. Coca-Cola 1L
  {
    id: 'd3',
    name: 'Coca-Cola 1L',
    category: 'drinks',
    badge: 'ICHIMLIK',
    price: 12000,
    icon: 'cola',
    inStock: true,
    description: "Klassik ta’mga ega tetiklantiruvchi ichimlik",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  // 10. Suv (0.5L)
  {
    id: 'd4',
    name: 'Suv (0.5L)',
    category: 'drinks',
    badge: 'ICHIMLIK',
    price: 5000,
    icon: 'water',
    inStock: true,
    description: "Toza tabiiy gazsiz tog‘ suvi",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80"
  },

  // Qahva va qo'shimcha
  {
    id: 'c1',
    name: "Limonli choy",
    category: 'coffee',
    badge: 'ICHIMLIK',
    price: 7000,
    icon: 'tea',
    inStock: true,
    description: "Yalpiz va limonli xushbo‘y shifobaxsh choy",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'c2',
    name: 'Kofe Americano',
    category: 'coffee',
    badge: 'ICHIMLIK',
    price: 14000,
    icon: 'coffee',
    inStock: true,
    description: "Yangi yanchilgan donali achchiq qora kofe",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'c3',
    name: 'Kapuchino',
    category: 'coffee',
    badge: 'ICHIMLIK',
    price: 18000,
    icon: 'coffee',
    inStock: true,
    description: "Qalin sut ko‘pikli va dolchinli kapuchino",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'c4',
    name: 'Cheesecake',
    category: 'coffee',
    badge: 'DESERT',
    price: 24000,
    icon: 'cake',
    inStock: true,
    description: "Klassik Nyu-York chizkeyki mevali qaymoq bilan",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  }
];

// Initial 10 Tables (Exact state matching Dashboard preview)
const DEFAULT_TABLES = [
  { 
    id: 1, 
    name: "Stol 1", 
    status: "occupied", 
    order: [
      { id: 'f6', name: 'Pizza', price: 55000, quantity: 2, category: 'food' },
      { id: 'd3', name: 'Coca-Cola 1L', price: 10000, quantity: 1, category: 'drinks' }
    ], 
    openedAt: "12:45", 
    waiter: "Alisher", 
    notes: "", 
    discountPercent: 0 
  },
  { id: 2, name: "Stol 2", status: "available", order: [], openedAt: null, waiter: "Alisher", notes: "", discountPercent: 0 },
  { 
    id: 3, 
    name: "Stol 3", 
    status: "occupied", 
    order: [
      { id: 'f6', name: 'Pizza', price: 55000, quantity: 1, category: 'food' },
      { id: 'f2', name: 'Hamburger', price: 25000, quantity: 1, category: 'food' }
    ], 
    openedAt: "13:15", 
    waiter: "Sardor", 
    notes: "", 
    discountPercent: 0 
  },
  { id: 4, name: "Stol 4", status: "available", order: [], openedAt: null, waiter: "Sardor", notes: "", discountPercent: 0 },
  { 
    id: 5, 
    name: "Stol 5", 
    status: "payment_pending", 
    order: [
      { id: 'f2', name: 'Hamburger', price: 25000, quantity: 2, category: 'food' }
    ], 
    openedAt: "13:30", 
    waiter: "Alisher", 
    notes: "Hisob so'radi", 
    discountPercent: 0 
  },
  { id: 6, name: "Stol 6", status: "available", order: [], openedAt: null, waiter: "Alisher", notes: "", discountPercent: 0 },
  { 
    id: 7, 
    name: "Stol 7", 
    status: "occupied", 
    order: [
      { id: 'f6', name: 'Pizza', price: 55000, quantity: 2, category: 'food' },
      { id: 'f4', name: 'Lavash', price: 28000, quantity: 2, category: 'food' },
      { id: 'd1', name: 'Fanta 0.5L', price: 7000, quantity: 2, category: 'drinks' }
    ], 
    openedAt: "12:50", 
    waiter: "Malika", 
    notes: "", 
    discountPercent: 0 
  },
  { id: 8, name: "Stol 8", status: "available", order: [], openedAt: null, waiter: "Bobur", notes: "", discountPercent: 0 },
  { id: 9, name: "Stol 9", status: "available", order: [], openedAt: null, waiter: "Jasur", notes: "", discountPercent: 0 },
  { 
    id: 10, 
    name: "Stol 10", 
    status: "occupied", 
    order: [
      { id: 'f6', name: 'Pizza', price: 55000, quantity: 2, category: 'food' },
      { id: 'f3', name: 'Cheeseburger', price: 30000, quantity: 1, category: 'food' }
    ], 
    openedAt: "13:00", 
    waiter: "Alisher", 
    notes: "", 
    discountPercent: 0 
  }
];

// Initial Order History: Realistic orders across today (1 kunlik), last 7 days (1 haftalik) and last 30 days (1 oylik)
const getInitialHistory = () => {
  const now = new Date();
  const formatIso = (daysAgo, hours, minutes) => {
    const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    d.setHours(hours, minutes, 0, 0);
    return {
      iso: d.toISOString(),
      formatted: `${d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      dateOnly: d.toISOString().split('T')[0]
    };
  };

  const t0_1 = formatIso(0, 10, 45);
  const t0_2 = formatIso(0, 11, 30);
  const t0_3 = formatIso(0, 12, 15);
  const t0_4 = formatIso(0, 12, 55);
  const t0_5 = formatIso(0, 13, 25);

  const t1_1 = formatIso(1, 12, 10);
  const t1_2 = formatIso(1, 14, 40);
  const t1_3 = formatIso(1, 18, 20);
  const t1_4 = formatIso(1, 20, 15);

  const t2_1 = formatIso(2, 13, 0);
  const t2_2 = formatIso(2, 16, 30);
  const t2_3 = formatIso(2, 19, 45);

  const t3_1 = formatIso(3, 11, 20);
  const t3_2 = formatIso(3, 15, 10);
  const t3_3 = formatIso(3, 18, 50);

  const t5_1 = formatIso(5, 13, 15);
  const t5_2 = formatIso(5, 17, 30);
  const t5_3 = formatIso(5, 20, 40);

  const t6_1 = formatIso(6, 12, 0);
  const t6_2 = formatIso(6, 19, 10);

  const t12_1 = formatIso(12, 13, 30);
  const t12_2 = formatIso(12, 18, 0);

  const t18_1 = formatIso(18, 14, 15);
  const t18_2 = formatIso(18, 20, 0);

  const t25_1 = formatIso(25, 12, 45);
  const t25_2 = formatIso(25, 17, 20);

  return [
    // --- BUGUNGI BUYURTMALAR (1 Kunlik) ---
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
      timestamp: t0_1.iso,
      formattedDate: t0_1.formatted,
      dateOnly: t0_1.dateOnly,
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
      timestamp: t0_2.iso,
      formattedDate: t0_2.formatted,
      dateOnly: t0_2.dateOnly,
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
      timestamp: t0_3.iso,
      formattedDate: t0_3.formatted,
      dateOnly: t0_3.dateOnly,
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
      timestamp: t0_4.iso,
      formattedDate: t0_4.formatted,
      dateOnly: t0_4.dateOnly,
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
      timestamp: t0_5.iso,
      formattedDate: t0_5.formatted,
      dateOnly: t0_5.dateOnly,
      waiter: "Bobur"
    },

    // --- OXIRGI 7 KUNLIK (1 Haftalik) BUYURTMALAR ---
    {
      id: "ORD-1080",
      tableId: 2,
      tableName: "Stol 2",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 2, category: 'food' },
        { id: 'd2', name: 'Fanta 2L', price: 20000, quantity: 2, category: 'drinks' }
      ],
      subtotal: 150000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 150000,
      paymentMethod: "Plastik karta",
      cashReceived: 150000,
      cashChange: 0,
      timestamp: t1_1.iso,
      formattedDate: t1_1.formatted,
      dateOnly: t1_1.dateOnly,
      waiter: "Sardor"
    },
    {
      id: "ORD-1079",
      tableId: 5,
      tableName: "Stol 5",
      items: [
        { id: 'f4', name: 'Lavash', price: 28000, quantity: 4, category: 'food' },
        { id: 'f5', name: 'French Fries', price: 15000, quantity: 2, category: 'food' },
        { id: 'd3', name: 'Coca-Cola 1L', price: 12000, quantity: 2, category: 'drinks' }
      ],
      subtotal: 166000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 166000,
      paymentMethod: "Naqd pul",
      cashReceived: 200000,
      cashChange: 34000,
      timestamp: t1_2.iso,
      formattedDate: t1_2.formatted,
      dateOnly: t1_2.dateOnly,
      waiter: "Alisher"
    },
    {
      id: "ORD-1078",
      tableId: 7,
      tableName: "Stol 7",
      items: [
        { id: 'f3', name: 'Cheeseburger', price: 30000, quantity: 3, category: 'food' },
        { id: 'd1', name: 'Fanta 0.5L', price: 8000, quantity: 3, category: 'drinks' }
      ],
      subtotal: 114000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 114000,
      paymentMethod: "Plastik karta",
      cashReceived: 114000,
      cashChange: 0,
      timestamp: t1_3.iso,
      formattedDate: t1_3.formatted,
      dateOnly: t1_3.dateOnly,
      waiter: "Malika"
    },
    {
      id: "ORD-1077",
      tableId: 9,
      tableName: "Stol 9",
      items: [
        { id: 'f2', name: 'Hamburger', price: 25000, quantity: 4, category: 'food' },
        { id: 'f5', name: 'French Fries', price: 15000, quantity: 4, category: 'food' },
        { id: 'd2', name: 'Fanta 2L', price: 20000, quantity: 1, category: 'drinks' }
      ],
      subtotal: 180000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 180000,
      paymentMethod: "Naqd pul",
      cashReceived: 200000,
      cashChange: 20000,
      timestamp: t1_4.iso,
      formattedDate: t1_4.formatted,
      dateOnly: t1_4.dateOnly,
      waiter: "Bobur"
    },
    {
      id: "ORD-1075",
      tableId: 3,
      tableName: "Stol 3",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 2, category: 'food' },
        { id: 'c3', name: 'Kapuchino', price: 18000, quantity: 3, category: 'coffee' }
      ],
      subtotal: 164000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 164000,
      paymentMethod: "Plastik karta",
      cashReceived: 164000,
      cashChange: 0,
      timestamp: t2_1.iso,
      formattedDate: t2_1.formatted,
      dateOnly: t2_1.dateOnly,
      waiter: "Sardor"
    },
    {
      id: "ORD-1074",
      tableId: 1,
      tableName: "Stol 1",
      items: [
        { id: 'f4', name: 'Lavash', price: 28000, quantity: 5, category: 'food' },
        { id: 'd3', name: 'Coca-Cola 1L', price: 12000, quantity: 3, category: 'drinks' }
      ],
      subtotal: 176000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 176000,
      paymentMethod: "Naqd pul",
      cashReceived: 200000,
      cashChange: 24000,
      timestamp: t2_2.iso,
      formattedDate: t2_2.formatted,
      dateOnly: t2_2.dateOnly,
      waiter: "Alisher"
    },
    {
      id: "ORD-1073",
      tableId: 8,
      tableName: "Stol 8",
      items: [
        { id: 'f1', name: 'Hot Dog', price: 18000, quantity: 4, category: 'food' },
        { id: 'd5', name: 'Sharbat (Sok)', price: 12000, quantity: 2, category: 'drinks' }
      ],
      subtotal: 96000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 96000,
      paymentMethod: "Plastik karta",
      cashReceived: 96000,
      cashChange: 0,
      timestamp: t2_3.iso,
      formattedDate: t2_3.formatted,
      dateOnly: t2_3.dateOnly,
      waiter: "Malika"
    },
    {
      id: "ORD-1065",
      tableId: 5,
      tableName: "Stol 5",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 3, category: 'food' },
        { id: 'd2', name: 'Fanta 2L', price: 20000, quantity: 2, category: 'drinks' },
        { id: 'c4', name: 'Chizkeyk', price: 24000, quantity: 3, category: 'coffee' }
      ],
      subtotal: 277000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 277000,
      paymentMethod: "Plastik karta",
      cashReceived: 277000,
      cashChange: 0,
      timestamp: t3_1.iso,
      formattedDate: t3_1.formatted,
      dateOnly: t3_1.dateOnly,
      waiter: "Sardor"
    },
    {
      id: "ORD-1064",
      tableId: 2,
      tableName: "Stol 2",
      items: [
        { id: 'f2', name: 'Hamburger', price: 25000, quantity: 3, category: 'food' },
        { id: 'f5', name: 'French Fries', price: 15000, quantity: 3, category: 'food' },
        { id: 'd1', name: 'Fanta 0.5L', price: 8000, quantity: 3, category: 'drinks' }
      ],
      subtotal: 144000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 144000,
      paymentMethod: "Naqd pul",
      cashReceived: 150000,
      cashChange: 6000,
      timestamp: t3_2.iso,
      formattedDate: t3_2.formatted,
      dateOnly: t3_2.dateOnly,
      waiter: "Alisher"
    },
    {
      id: "ORD-1063",
      tableId: 4,
      tableName: "Stol 4",
      items: [
        { id: 'f3', name: 'Cheeseburger', price: 30000, quantity: 4, category: 'food' },
        { id: 'd3', name: 'Coca-Cola 1L', price: 12000, quantity: 2, category: 'drinks' }
      ],
      subtotal: 144000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 144000,
      paymentMethod: "Plastik karta",
      cashReceived: 144000,
      cashChange: 0,
      timestamp: t3_3.iso,
      formattedDate: t3_3.formatted,
      dateOnly: t3_3.dateOnly,
      waiter: "Bobur"
    },
    {
      id: "ORD-1052",
      tableId: 7,
      tableName: "Stol 7",
      items: [
        { id: 'f4', name: 'Lavash', price: 28000, quantity: 6, category: 'food' },
        { id: 'd4', name: 'Suv (0.5L)', price: 5000, quantity: 6, category: 'drinks' }
      ],
      subtotal: 198000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 198000,
      paymentMethod: "Naqd pul",
      cashReceived: 200000,
      cashChange: 2000,
      timestamp: t5_1.iso,
      formattedDate: t5_1.formatted,
      dateOnly: t5_1.dateOnly,
      waiter: "Malika"
    },
    {
      id: "ORD-1051",
      tableId: 10,
      tableName: "Stol 10",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 2, category: 'food' },
        { id: 'd2', name: 'Fanta 2L', price: 20000, quantity: 1, category: 'drinks' }
      ],
      subtotal: 130000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 130000,
      paymentMethod: "Plastik karta",
      cashReceived: 130000,
      cashChange: 0,
      timestamp: t5_2.iso,
      formattedDate: t5_2.formatted,
      dateOnly: t5_2.dateOnly,
      waiter: "Jasur"
    },
    {
      id: "ORD-1050",
      tableId: 1,
      tableName: "Stol 1",
      items: [
        { id: 'f1', name: 'Hot Dog', price: 18000, quantity: 5, category: 'food' },
        { id: 'd5', name: 'Sharbat (Sok)', price: 12000, quantity: 3, category: 'drinks' }
      ],
      subtotal: 126000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 126000,
      paymentMethod: "Naqd pul",
      cashReceived: 150000,
      cashChange: 24000,
      timestamp: t5_3.iso,
      formattedDate: t5_3.formatted,
      dateOnly: t5_3.dateOnly,
      waiter: "Alisher"
    },
    {
      id: "ORD-1045",
      tableId: 3,
      tableName: "Stol 3",
      items: [
        { id: 'f2', name: 'Hamburger', price: 25000, quantity: 4, category: 'food' },
        { id: 'c2', name: 'Kofe Americano', price: 14000, quantity: 4, category: 'coffee' }
      ],
      subtotal: 156000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 156000,
      paymentMethod: "Plastik karta",
      cashReceived: 156000,
      cashChange: 0,
      timestamp: t6_1.iso,
      formattedDate: t6_1.formatted,
      dateOnly: t6_1.dateOnly,
      waiter: "Sardor"
    },
    {
      id: "ORD-1044",
      tableId: 6,
      tableName: "Stol 6",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 2, category: 'food' },
        { id: 'f5', name: 'French Fries', price: 15000, quantity: 3, category: 'food' },
        { id: 'd3', name: 'Coca-Cola 1L', price: 12000, quantity: 2, category: 'drinks' }
      ],
      subtotal: 179000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 179000,
      paymentMethod: "Naqd pul",
      cashReceived: 200000,
      cashChange: 21000,
      timestamp: t6_2.iso,
      formattedDate: t6_2.formatted,
      dateOnly: t6_2.dateOnly,
      waiter: "Alisher"
    },

    // --- OXIRGI 30 KUNLIK (1 Oylik) BUYURTMALAR ---
    {
      id: "ORD-1020",
      tableId: 2,
      tableName: "Stol 2",
      items: [
        { id: 'f4', name: 'Lavash', price: 28000, quantity: 8, category: 'food' },
        { id: 'd2', name: 'Fanta 2L', price: 20000, quantity: 3, category: 'drinks' }
      ],
      subtotal: 284000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 284000,
      paymentMethod: "Plastik karta",
      cashReceived: 284000,
      cashChange: 0,
      timestamp: t12_1.iso,
      formattedDate: t12_1.formatted,
      dateOnly: t12_1.dateOnly,
      waiter: "Sardor"
    },
    {
      id: "ORD-1019",
      tableId: 8,
      tableName: "Stol 8",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 3, category: 'food' },
        { id: 'c4', name: 'Chizkeyk', price: 24000, quantity: 5, category: 'coffee' }
      ],
      subtotal: 285000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 285000,
      paymentMethod: "Naqd pul",
      cashReceived: 300000,
      cashChange: 15000,
      timestamp: t12_2.iso,
      formattedDate: t12_2.formatted,
      dateOnly: t12_2.dateOnly,
      waiter: "Malika"
    },
    {
      id: "ORD-1008",
      tableId: 5,
      tableName: "Stol 5",
      items: [
        { id: 'f3', name: 'Cheeseburger', price: 30000, quantity: 6, category: 'food' },
        { id: 'f5', name: 'French Fries', price: 15000, quantity: 6, category: 'food' },
        { id: 'd3', name: 'Coca-Cola 1L', price: 12000, quantity: 4, category: 'drinks' }
      ],
      subtotal: 318000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 318000,
      paymentMethod: "Plastik karta",
      cashReceived: 318000,
      cashChange: 0,
      timestamp: t18_1.iso,
      formattedDate: t18_1.formatted,
      dateOnly: t18_1.dateOnly,
      waiter: "Alisher"
    },
    {
      id: "ORD-1007",
      tableId: 7,
      tableName: "Stol 7",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 4, category: 'food' },
        { id: 'd2', name: 'Fanta 2L', price: 20000, quantity: 3, category: 'drinks' }
      ],
      subtotal: 280000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 280000,
      paymentMethod: "Naqd pul",
      cashReceived: 300000,
      cashChange: 20000,
      timestamp: t18_2.iso,
      formattedDate: t18_2.formatted,
      dateOnly: t18_2.dateOnly,
      waiter: "Bobur"
    },
    {
      id: "ORD-0995",
      tableId: 1,
      tableName: "Stol 1",
      items: [
        { id: 'f4', name: 'Lavash', price: 28000, quantity: 5, category: 'food' },
        { id: 'f2', name: 'Hamburger', price: 25000, quantity: 4, category: 'food' },
        { id: 'd1', name: 'Fanta 0.5L', price: 8000, quantity: 6, category: 'drinks' }
      ],
      subtotal: 288000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 288000,
      paymentMethod: "Plastik karta",
      cashReceived: 288000,
      cashChange: 0,
      timestamp: t25_1.iso,
      formattedDate: t25_1.formatted,
      dateOnly: t25_1.dateOnly,
      waiter: "Sardor"
    },
    {
      id: "ORD-0994",
      tableId: 9,
      tableName: "Stol 9",
      items: [
        { id: 'f6', name: 'Pizza', price: 55000, quantity: 5, category: 'food' },
        { id: 'c3', name: 'Kapuchino', price: 18000, quantity: 5, category: 'coffee' }
      ],
      subtotal: 365000,
      serviceCharge: 0,
      discountAmount: 0,
      total: 365000,
      paymentMethod: "Naqd pul",
      cashReceived: 400000,
      cashChange: 35000,
      timestamp: t25_2.iso,
      formattedDate: t25_2.formatted,
      dateOnly: t25_2.dateOnly,
      waiter: "Jasur"
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
