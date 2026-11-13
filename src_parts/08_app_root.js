// MAIN ROOT APPLICATION COMPONENT
const App = () => {
  // 1. Persistent State initialized from localStorage or defaults
  const [tables, setTables] = React.useState(() => {
    try {
      const saved = localStorage.getItem('RAYHON_CAFE_TABLES_V1');
      return saved ? JSON.parse(saved) : DEFAULT_TABLES;
    } catch (e) {
      return DEFAULT_TABLES;
    }
  });

  const [products, setProducts] = React.useState(() => {
    try {
      const saved = localStorage.getItem('RAYHON_CAFE_PRODUCTS_V2');
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  });

  const [orderHistory, setOrderHistory] = React.useState(() => {
    try {
      const saved = localStorage.getItem('RAYHON_CAFE_HISTORY_V1');
      return saved ? JSON.parse(saved) : getInitialHistory();
    } catch (e) {
      return getInitialHistory();
    }
  });

  const [settings, setSettings] = React.useState(() => {
    try {
      const saved = localStorage.getItem('RAYHON_CAFE_SETTINGS_V1');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  });

  // UI state
  const [activeTab, setActiveTab] = React.useState('dashboard'); // 'dashboard', 'tables', 'menu', 'history', 'stats', 'settings'
  const [selectedTableId, setSelectedTableId] = React.useState(null);
  const [paymentTable, setPaymentTable] = React.useState(null);
  const [receiptOrder, setReceiptOrder] = React.useState(null);
  const [customerBillTable, setCustomerBillTable] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date());

  // Auth State ('app', 'login', 'register')
  const [authPage, setAuthPage] = React.useState('app');
  const [currentUser, setCurrentUser] = React.useState(() => {
    try {
      const saved = localStorage.getItem('RAYHON_CAFE_AUTH_USER');
      return saved ? JSON.parse(saved) : {
        name: "Alisher Gayratov",
        role: "Kassir",
        email: "alisher@rayhon.uz",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
      };
    } catch (e) {
      return {
        name: "Alisher Gayratov",
        role: "Kassir",
        email: "alisher@rayhon.uz",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
      };
    }
  });

  // Dark Mode Theme State & Persistence
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    try {
      return localStorage.getItem('RAYHON_CAFE_THEME') === 'dark';
    } catch (e) {
      return false;
    }
  });

  React.useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    } catch (e) {}
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('RAYHON_CAFE_THEME', next ? 'dark' : 'light');
      } catch (e) {}
      if (soundEnabled) playSound('click');
      addToast(
        next ? 'info' : 'success', 
        next ? 'Qorong‘u rejim yoqildi 🌙' : 'Yorug‘lik rejimi yoqildi ☀️', 
        next ? 'Tungi kafe muhiti faollashtirildi' : 'Kunduzgi yorug‘ muhit faollashtirildi'
      );
      return next;
    });
  };

  // Notifications State & Dropdown
  const [notificationMenuOpen, setNotificationMenuOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(() => {
    try {
      const saved = localStorage.getItem('RAYHON_CAFE_NOTIFICATIONS');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [
      {
        id: 'notif_1',
        type: 'payment',
        title: "Stol 1 to‘lov kutilmoqda",
        message: "Stol 1 mijozlari hisob-kitob qilishni so‘radi. Jami hisob: 120 000 so‘m.",
        tableId: 1,
        time: "3 daqiqa oldin",
        timestamp: Date.now() - 3 * 60 * 1000,
        isRead: false
      },
      {
        id: 'notif_2',
        type: 'order',
        title: "Stol 7 yangi buyurtma",
        message: "3 ta taom buyurtmasi kiritildi (Hamburger, Lavash, Fanta). Oshxonaga jo‘natildi.",
        tableId: 7,
        time: "8 daqiqa oldin",
        timestamp: Date.now() - 8 * 60 * 1000,
        isRead: false
      },
      {
        id: 'notif_3',
        type: 'system',
        title: "Kassa tushumi yangilandi",
        message: "Bugungi tushum rejadagidan yuqori: +12% o‘sish qayd etildi.",
        time: "15 daqiqa oldin",
        timestamp: Date.now() - 15 * 60 * 1000,
        isRead: true
      },
      {
        id: 'notif_4',
        type: 'ready',
        title: "Buyurtma tayyor (Bar)",
        message: "Stol 10 uchun 2 dona qahva va shirinliklar tayyorlandi.",
        tableId: 10,
        time: "25 daqiqa oldin",
        timestamp: Date.now() - 25 * 60 * 1000,
        isRead: true
      }
    ];
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('RAYHON_CAFE_NOTIFICATIONS', JSON.stringify(notifications));
    } catch(e) {}
  }, [notifications]);

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => (prev || []).map(n => ({ ...n, isRead: true })));
    if (soundEnabled) playSound('click');
    addToast('success', "Barcha xabarlar o‘qildi deb belgilandi");
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    if (soundEnabled) playSound('delete');
    addToast('info', "Barcha xabarnomalar tozalandi");
  };

  const handleNotificationClick = (item) => {
    setNotifications(prev => (prev || []).map(n => n.id === item.id ? { ...n, isRead: true } : n));
    setNotificationMenuOpen(false);

    if (item.tableId) {
      const table = tables.find(t => t.id === item.tableId);
      if (table) {
        if (item.type === 'payment' && (table.status === 'occupied' || table.status === 'payment_pending')) {
          handleProceedToPayment(table);
        } else {
          handleSelectTable(table.id);
        }
      }
    } else {
      addToast('info', item.title, item.message);
    }
  };

  // Global Header Search
  const [headerSearch, setHeaderSearch] = React.useState('');

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = React.useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Ha, tasdiqlayman',
    isDestructive: false,
    onConfirm: () => {}
  });

  // Toasts
  const [toasts, setToasts] = React.useState([]);

  const addToast = (type, title, message = '') => {
    const id = 't_' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, type, title, message }]);
    if (soundEnabled) {
      if (type === 'success') playSound('add');
      else if (type === 'error') playSound('delete');
    }
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('RAYHON_CAFE_TABLES_V1', JSON.stringify(tables));
    } catch (e) {}
  }, [tables]);

  React.useEffect(() => {
    try {
      localStorage.setItem('RAYHON_CAFE_PRODUCTS_V2', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  React.useEffect(() => {
    try {
      localStorage.setItem('RAYHON_CAFE_HISTORY_V1', JSON.stringify(orderHistory));
    } catch (e) {}
  }, [orderHistory]);

  React.useEffect(() => {
    try {
      localStorage.setItem('RAYHON_CAFE_SETTINGS_V1', JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Live Clock
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handlers for Tables & Orders
  const handleSelectTable = (tableId) => {
    if (soundEnabled) playSound('click');
    setSelectedTableId(tableId);
  };

  const handleAddItem = (tableId, product) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        const currentOrder = t.order || [];
        const existingIndex = currentOrder.findIndex(item => item.id === product.id);
        let updatedOrder;

        if (existingIndex > -1) {
          updatedOrder = currentOrder.map((item, idx) => 
            idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedOrder = [
            ...currentOrder,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              category: product.category,
              icon: product.icon,
              quantity: 1
            }
          ];
        }

        // Auto change status to 'occupied' if it was 'available'
        const newStatus = t.status === 'available' ? 'occupied' : t.status;
        const openedAtTime = t.openedAt || formatTime(new Date());

        return {
          ...t,
          status: newStatus,
          order: updatedOrder,
          openedAt: openedAtTime
        };
      }
      return t;
    }));

    if (soundEnabled) playSound('add');
    addToast('success', `${product.name} qo‘shildi`, `Stol ${tableId} buyurtmasiga kiritildi`);

    // Add Live Notification
    const notifItem = {
      id: 'notif_' + Date.now() + Math.random().toString(36).substr(2, 4),
      type: 'order',
      title: `Stol ${tableId} yangi taom qo‘shildi`,
      message: `${product.name} buyurtmaga kiritildi (${formatUZS(product.price)}).`,
      tableId: tableId,
      time: 'Hozirgina',
      timestamp: Date.now(),
      isRead: false
    };
    setNotifications(prev => [notifItem, ...(prev || []).slice(0, 19)]);
  };

  const handleUpdateQuantity = (tableId, itemId, newQuantity) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        let updatedOrder;
        if (newQuantity <= 0) {
          updatedOrder = (t.order || []).filter(item => item.id !== itemId);
        } else {
          updatedOrder = (t.order || []).map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );
        }
        return { ...t, order: updatedOrder };
      }
      return t;
    }));

    if (soundEnabled) {
      if (newQuantity <= 0) playSound('delete');
      else playSound('click');
    }
  };

  const handleRemoveItem = (tableId, itemId) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          order: (t.order || []).filter(item => item.id !== itemId)
        };
      }
      return t;
    }));

    if (soundEnabled) playSound('delete');
    addToast('info', "Mahsulot o‘chirildi");
  };

  const handleChangeStatus = (tableId, newStatus) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
    if (soundEnabled) playSound('click');
    addToast('info', `Stol ${tableId} holati o‘zgardi`);
  };

  const handleClearTable = (tableId) => {
    const tableObj = tables.find(t => t.id === tableId);
    if (!tableObj) return;

    setConfirmModal({
      isOpen: true,
      title: `${tableObj.name}ni tozalash`,
      message: `Haqiqatan ham ${tableObj.name} buyurtmasini bekor qilib, stolni bo‘shatmoqchimisiz? Ushbu amal ortga qaytarilmaydi.`,
      confirmText: 'Ha, tozalash',
      isDestructive: true,
      onConfirm: () => {
        setTables(prev => prev.map(t => {
          if (t.id === tableId) {
            return {
              ...t,
              status: 'available',
              order: [],
              openedAt: null,
              notes: ''
            };
          }
          return t;
        }));
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        if (soundEnabled) playSound('delete');
        addToast('info', `${tableObj.name} tozalandi va bo‘shatildi`);
      }
    });
  };

  const handleTransferTable = (fromTableId, toTableId) => {
    const fromTable = tables.find(t => t.id === fromTableId);
    const toTable = tables.find(t => t.id === toTableId);
    if (!fromTable || !toTable) return;

    setTables(prev => prev.map(t => {
      if (t.id === toTableId) {
        return {
          ...t,
          status: 'occupied',
          order: [...(fromTable.order || [])],
          openedAt: fromTable.openedAt || formatTime(new Date()),
          notes: fromTable.notes || ''
        };
      }
      if (t.id === fromTableId) {
        return {
          ...t,
          status: 'available',
          order: [],
          openedAt: null,
          notes: ''
        };
      }
      return t;
    }));

    if (soundEnabled) playSound('add');
    addToast('success', "Stol ko‘chirildi", `${fromTable.name} buyurtmasi ${toTable.name}ga o‘tkazildi`);
  };

  const handleProceedToPayment = (table) => {
    setSelectedTableId(null);
    setPaymentTable(table);
  };

  const handleConfirmPayment = ({ table, paymentMethod, cashReceived, cashChange, subtotal, serviceAmount, grandTotal }) => {
    const now = new Date();
    const orderRecord = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      tableId: table.id,
      tableName: table.name,
      items: [...(table.order || [])],
      subtotal,
      serviceCharge: serviceAmount,
      total: grandTotal,
      paymentMethod,
      cashReceived,
      cashChange,
      timestamp: now.toISOString(),
      formattedDate: formatDateTime(now),
      dateOnly: now.toISOString().split('T')[0],
      waiter: table.waiter || "Alisher"
    };

    // Save to order history
    setOrderHistory(prev => [orderRecord, ...prev]);

    // Clear and mark table as available
    setTables(prev => prev.map(t => {
      if (t.id === table.id) {
        return {
          ...t,
          status: 'available',
          order: [],
          openedAt: null,
          notes: ''
        };
      }
      return t;
    }));

    setPaymentTable(null);
    if (soundEnabled) playSound('cash');
    addToast('success', "To‘lov muvaffaqiyatli qabul qilindi!", `${table.name} bo‘shatildi`);

    // Add Live Notification
    const payNotif = {
      id: 'notif_' + Date.now() + Math.random().toString(36).substr(2, 4),
      type: 'payment',
      title: `${table.name} to‘lovi yakunlandi`,
      message: `${formatUZS(grandTotal)} qabul qilindi (${paymentMethod === 'cash' ? 'Naqd' : 'Karta'}). Chek #${orderRecord.id}`,
      tableId: table.id,
      time: 'Hozirgina',
      timestamp: Date.now(),
      isRead: false
    };
    setNotifications(prev => [payNotif, ...(prev || []).slice(0, 19)]);

    // Show thermal receipt modal
    setReceiptOrder(orderRecord);
  };

  // Menu Product Handlers
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    addToast('success', "Yangi mahsulot menyuga qo‘shildi");
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    addToast('success', "Mahsulot ma’lumotlari yangilandi");
  };

  const handleDeleteProduct = (productId) => {
    setConfirmModal({
      isOpen: true,
      title: "Mahsulotni o‘chirish",
      message: "Haqiqatan ham ushbu mahsulotni menyudan butunlay o‘chirmoqchimisiz?",
      confirmText: "Ha, o‘chirish",
      isDestructive: true,
      onConfirm: () => {
        setProducts(prev => prev.filter(p => p.id !== productId));
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        addToast('info', "Mahsulot menyudan o‘chirildi");
      }
    });
  };

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    addToast('success', "Sozlamalar muvaffaqiyatli saqlandi");
  };

  const handleResetAllData = () => {
    setConfirmModal({
      isOpen: true,
      title: "Boshlang‘ich ma’lumotlarni tiklash",
      message: "Barcha 10 ta stol va menyu dastlabki holatga qaytariladi. Rozimisiz?",
      confirmText: "Ha, qayta tiklash",
      isDestructive: true,
      onConfirm: () => {
        setTables(DEFAULT_TABLES);
        setProducts(DEFAULT_PRODUCTS);
        setOrderHistory(getInitialHistory());
        setSettings(DEFAULT_SETTINGS);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        addToast('success', "Barcha ma’lumotlar tiklandi");
      }
    });
  };

  const handleClearHistory = () => {
    setConfirmModal({
      isOpen: true,
      title: "Tarixni tozalash",
      message: "Barcha yopilgan hisoblar va buyurtmalar tarixi o‘chiriladi. Davom etasizmi?",
      confirmText: "Ha, tozalash",
      isDestructive: true,
      onConfirm: () => {
        setOrderHistory([]);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        addToast('info', "Buyurtmalar tarixi tozalandi");
      }
    });
  };

  const activeSelectedTable = tables.find(t => t.id === selectedTableId);
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;
  const pendingCount = tables.filter(t => t.status === 'payment_pending').length;

  const navItems = [
    { id: 'dashboard', name: 'Stollar', icon: 'chair', badge: occupiedCount + pendingCount > 0 ? `${occupiedCount + pendingCount}` : null },
    { id: 'stats', name: 'Hisobotlar', icon: 'stats' },
    { id: 'menu', name: 'Kassir', icon: 'card' },
    { id: 'settings', name: 'Sozlamalar', icon: 'settings' },
  ];

  // Live Search filter
  const searchResults = React.useMemo(() => {
    if (!headerSearch.trim()) return null;
    const q = headerSearch.toLowerCase().trim();
    const numberMatch = q.match(/\d+/);
    const matchedTableNum = numberMatch ? parseInt(numberMatch[0], 10) : null;

    const matchedTables = tables.filter(t => 
      t.id === matchedTableNum || 
      t.name.toLowerCase().includes(q) ||
      (t.order && t.order.some(item => item.name.toLowerCase().includes(q)))
    );

    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    return { tables: matchedTables, products: matchedProducts };
  }, [headerSearch, tables, products]);

  // Handle Login and Register Pages
  if (authPage === 'login') {
    return (
      <div className="relative">
        <LoginPage
          onLoginSuccess={(user) => {
            if (user) setCurrentUser(user);
            setAuthPage('app');
            addToast('success', `Xush kelibsiz, ${user?.name || 'Alisher'}!`, 'Tizimga muvaffaqiyatli kirdingiz');
          }}
          onGoToRegister={() => setAuthPage('register')}
          onBackToApp={() => setAuthPage('app')}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  if (authPage === 'register') {
    return (
      <div className="relative">
        <RegisterPage
          onRegisterSuccess={(user) => {
            if (user) setCurrentUser(user);
            setAuthPage('app');
            addToast('success', `Tabriklaymiz, ${user?.name || 'Alisher'}!`, 'Hisobingiz yaratildi');
          }}
          onGoToLogin={() => setAuthPage('login')}
          onBackToApp={() => setAuthPage('app')}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF7F2]">
      
      {/* SIDEBAR (Desktop - Matching Screenshot Layout & Coffee Branding) */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#1B120C] text-white border-r border-[#26180E] select-none relative overflow-hidden">
        
        {/* Coffee Leaf Watermark in Bottom Left Corner */}
        <div className="absolute -bottom-8 -left-8 pointer-events-none z-0">
          <CoffeeLeafWatermark className="w-52 h-52 text-amber-500/15" />
        </div>

        {/* Brand Header */}
        <div className="p-5 pb-3 border-b border-[#2A1C13] flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 p-0.5 bg-[#140C07] mb-2 hover:scale-105 transition cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <AppLogo size="w-full h-full" className="rounded-xl" />
          </div>
          <h1 className="font-black text-lg tracking-wide text-white leading-tight">{settings.cafeName}</h1>
          <p className="text-[11px] text-amber-400 font-bold tracking-wide">Cafe & Lounge · Boshqaruv</p>

          {/* Date & Time pill container */}
          <div className="w-full mt-3 px-3 py-1.5 rounded-xl bg-[#281A12] border border-amber-900/30 flex items-center justify-center gap-3 text-[11px] font-mono text-stone-300">
            <span className="flex items-center gap-1">
              <Icon name="calendar" className="w-3 h-3 text-amber-400" />
              <span>{formatDateISO(currentTime)}</span>
            </span>
            <span className="text-stone-600">|</span>
            <span className="flex items-center gap-1 font-bold text-amber-300">
              <Icon name="clock" className="w-3 h-3 text-amber-400" />
              <span>{formatTime(currentTime)}</span>
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto relative z-10">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (soundEnabled) playSound('click');
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 font-black shadow-lg shadow-amber-500/25 translate-x-1'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon} className={`w-5 h-5 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span className="text-sm font-bold">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-stone-950 text-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Card & Chiqish Footer */}
        <div className="p-4 border-t border-[#2A1C13] bg-[#140C07]/70 space-y-2.5 relative z-10">
          <div 
            onClick={() => setAuthPage('login')}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#24170F] border border-amber-900/40 cursor-pointer hover:border-amber-500/50 transition"
            title="Profil / Kirish oynasi"
          >
            <CashierAvatar 
              src={currentUser?.avatar} 
              alt={currentUser?.name || 'Alisher (Kassir)'} 
              size="w-10 h-10" 
              className="border border-amber-400/50" 
            />
            <div className="min-w-0 flex-1">
              <h5 className="font-black text-xs text-white truncate">{currentUser?.name || 'Alisher (Kassir)'}</h5>
              <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Tizimda onlayn
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (soundEnabled) playSound('click');
              addToast('info', 'Tizimdan chiqildi', 'Kirish oynasiga yo‘naltirildi');
              setAuthPage('login');
            }}
            className="w-full py-2 px-3 rounded-xl bg-transparent hover:bg-white/5 text-stone-400 hover:text-white border border-stone-800 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Icon name="logout" className="w-4 h-4" />
            <span>Chiqish</span>
          </button>
        </div>

      </aside>

      {/* MOBILE SIDEBAR DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-72 bg-[#1B120C] text-white flex flex-col h-full shadow-2xl z-10">
            <div className="p-5 border-b border-[#2A1C13] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-amber-500/40 shadow-xs p-0.5 bg-[#140C07] shrink-0">
                  <AppLogo size="w-full h-full" className="rounded-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white leading-tight">{settings.cafeName}</h3>
                  <p className="text-[10px] text-amber-400 font-bold">Cafe & Lounge</p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400 hover:text-white">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
                    activeTab === item.id ? 'bg-amber-500 text-stone-950 font-black' : 'text-stone-300 hover:bg-[#2A1C13]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon} className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header Bar Matching Screenshot media_1794387252139_792d7e03.jpg */}
        <header className="px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 shrink-0">
          
          {/* Left: Mobile hamburger + Rounded Search Bar */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xs sm:max-w-sm md:max-w-md relative">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/60"
            >
              <Icon name="menu" className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
                <Icon name="search" className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Stol yoki buyurtma qidirish..."
                className="w-full bg-[#EFE9DF] hover:bg-[#EAE2D6] focus:bg-white text-stone-800 placeholder-stone-400 text-xs font-semibold pl-11 pr-8 py-2.5 rounded-full border border-stone-300/40 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition"
              />
              {headerSearch && (
                <button
                  onClick={() => setHeaderSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <Icon name="close" className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Live Search Results Dropdown */}
              {searchResults && (searchResults.tables.length > 0 || searchResults.products.length > 0) && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 max-h-80 overflow-y-auto space-y-2 animate-scale-up">
                  {searchResults.tables.length > 0 && (
                    <div>
                      <div className="text-[10px] font-extrabold uppercase text-stone-400 px-2 mb-1">
                        Stollar ({searchResults.tables.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.tables.map(t => (
                          <div
                            key={t.id}
                            onClick={() => {
                              handleSelectTable(t.id);
                              setHeaderSearch('');
                            }}
                            className="p-2 rounded-xl hover:bg-amber-50 cursor-pointer flex items-center justify-between text-xs transition"
                          >
                            <span className="font-extrabold text-stone-800">Stol {t.id} ({t.name})</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              t.status === 'occupied' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {t.status === 'occupied' ? 'Band' : 'Bo‘sh'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.products.length > 0 && (
                    <div className="pt-2 border-t border-stone-100">
                      <div className="text-[10px] font-extrabold uppercase text-stone-400 px-2 mb-1">
                        Menyu mahsulotlari ({searchResults.products.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.products.map(p => (
                          <div
                            key={p.id}
                            onClick={() => {
                              setActiveTab('menu');
                              setHeaderSearch('');
                            }}
                            className="p-2 rounded-xl hover:bg-amber-50 cursor-pointer flex items-center justify-between text-xs transition"
                          >
                            <span className="font-bold text-stone-800">{p.name}</span>
                            <span className="font-mono text-amber-800 font-extrabold">{formatUZS(p.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Header Controls matching screenshot */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Quick Auth Switcher (Allows user to inspect Login & Register pages directly) */}
            <div className="hidden md:flex items-center bg-[#EFE9DF] p-0.5 rounded-full border border-stone-300/40 text-[11px] font-bold">
              <button
                onClick={() => setAuthPage('login')}
                className="px-2.5 py-1 rounded-full text-stone-700 hover:text-stone-950 hover:bg-white transition"
                title="Tizimga kirish sahifasini ko‘rish"
              >
                Kirish
              </button>
              <button
                onClick={() => setAuthPage('register')}
                className="px-2.5 py-1 rounded-full text-stone-700 hover:text-stone-950 hover:bg-white transition"
                title="Ro‘yxatdan o‘tish sahifasini ko‘rish"
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>

            {/* Date & Time pill container */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE9DF] border border-stone-300/40 text-xs font-mono text-stone-700 shadow-2xs">
              <span className="flex items-center gap-1.5">
                <Icon name="calendar" className="w-3.5 h-3.5 text-stone-500" />
                <span>{formatDateISO(currentTime)}</span>
              </span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5 font-bold text-stone-900">
                <Icon name="clock" className="w-3.5 h-3.5 text-stone-500" />
                <span>{formatTime(currentTime)}</span>
              </span>
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full bg-[#EFE9DF] hover:bg-[#E5DDD2] border border-stone-300/40 text-stone-700 flex items-center justify-center transition shadow-2xs"
              title={isDarkMode ? "Yorug‘lik rejimiga o‘tish (Kunduzgi)" : "Qorong‘u rejimga o‘tish (Tungi)"}
            >
              {isDarkMode ? (
                <Icon name="sun" className="w-4 h-4 text-amber-400" />
              ) : (
                <Icon name="moon" className="w-4 h-4 text-stone-700" />
              )}
            </button>

            {/* Notification Bell with Badge & Interactive Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  if (soundEnabled) playSound('click');
                  setNotificationMenuOpen(prev => !prev);
                }}
                className={`relative w-9 h-9 rounded-full border transition shadow-2xs flex items-center justify-center ${
                  notificationMenuOpen 
                    ? 'bg-amber-500 text-stone-950 border-amber-600 scale-105 shadow-md shadow-amber-500/20' 
                    : 'bg-[#EFE9DF] hover:bg-[#E5DDD2] border-stone-300/40 text-stone-700'
                }`}
                title="Xabarnomalar"
              >
                <Icon name="bell" className="w-4 h-4 text-stone-800" />
                {(notifications || []).filter(n => !n.isRead).length > 0 && (
                  <span className="absolute -top-1 -right-0.5 min-w-[17px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-pulse">
                    {(notifications || []).filter(n => !n.isRead).length}
                  </span>
                )}
              </button>

              {/* Interactive Notifications Dropdown */}
              {notificationMenuOpen && (
                <NotificationsDropdown
                  notifications={notifications}
                  onClose={() => setNotificationMenuOpen(false)}
                  onMarkAllRead={handleMarkAllNotificationsRead}
                  onClearAll={handleClearNotifications}
                  onNotificationClick={handleNotificationClick}
                />
              )}
            </div>

            {/* Cashier Profile Avatar with online status */}
            <div 
              onClick={() => setAuthPage('login')}
              className="relative cursor-pointer group"
              title={`${currentUser?.name || 'Alisher Gayratov'} (${currentUser?.role || 'Kassir'}) - Chiqish / Kirish oynasi`}
            >
              <CashierAvatar 
                src={currentUser?.avatar} 
                alt={currentUser?.name || 'Alisher Gayratov'} 
                size="w-9 h-9" 
                className="border border-stone-300/60 shadow-2xs group-hover:scale-105 transition" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>

          </div>
        </header>

        {/* Main Tab Screen Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full flex-1">
            {activeTab === 'dashboard' && (
              <DashboardView
                tables={tables}
                products={products}
                orderHistory={orderHistory}
                onSelectTable={handleSelectTable}
                onOpenReceipt={(order) => setReceiptOrder(order)}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenCustomerBill={(table) => setCustomerBillTable(table)}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'tables' && (
              <TablesView
                tables={tables}
                onSelectTable={handleSelectTable}
                onChangeStatus={handleChangeStatus}
                onProceedToPayment={handleProceedToPayment}
                onClearTable={handleClearTable}
                onOpenCustomerBill={(table) => setCustomerBillTable(table)}
              />
            )}

            {activeTab === 'menu' && (
              <MenuView
                products={products}
                tables={tables}
                currentUser={currentUser}
                orderHistory={orderHistory}
                onSelectTable={handleSelectTable}
                onProceedToPayment={handleProceedToPayment}
                onOpenCustomerBill={(table) => setCustomerBillTable(table)}
                onSelectProduct={(product, targetTableId) => {
                  const tableId = targetTableId || (tables.find(t => t.status === 'occupied')?.id || tables.find(t => t.status === 'available')?.id || 1);
                  handleAddItem(tableId, product);
                }}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                orderHistory={orderHistory}
                onOpenReceipt={(order) => setReceiptOrder(order)}
              />
            )}

            {activeTab === 'stats' && (
              <StatisticsView
                orderHistory={orderHistory}
                tables={tables}
                products={products}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onResetAllData={handleResetAllData}
                onClearHistory={handleClearHistory}
              />
            )}
          </div>

          {/* Bottom Footer Bar Matching Screenshot */}
          <footer className="max-w-7xl mx-auto w-full pt-5 pb-1 border-t border-stone-200/70 mt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-base">☕</span>
              <span className="font-extrabold text-stone-800">Rayhon Cafe</span>
              <span className="text-stone-300">—</span>
              <span className="text-stone-600">Har doim siz bilan!</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-stone-500 text-[11px]">
              <Icon name="clock" className="w-3.5 h-3.5 text-stone-400" />
              <span>{formatTime(currentTime)} · {formatDateISO(currentTime)}</span>
            </div>
          </footer>
        </main>

      </div>

      {/* POS Order Modal Drawer */}
      <POSDrawer
        isOpen={Boolean(selectedTableId)}
        table={activeSelectedTable}
        products={products}
        onClose={() => setSelectedTableId(null)}
        onAddItem={handleAddItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToPayment={handleProceedToPayment}
        onChangeStatus={handleChangeStatus}
        onClearTable={handleClearTable}
        onTransferTable={handleTransferTable}
        tablesList={tables}
        serviceFeePercent={settings.serviceFeePercent || 0}
      />

      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={Boolean(paymentTable)}
        table={paymentTable}
        settings={settings}
        onClose={() => setPaymentTable(null)}
        onConfirmPayment={handleConfirmPayment}
      />

      {/* Customer Bill / Verbal Breakdown Modal (Mijoz nima yeganini hisoblash va aytish) */}
      <CustomerBillModal
        isOpen={Boolean(customerBillTable)}
        table={customerBillTable}
        settings={settings}
        onClose={() => setCustomerBillTable(null)}
        onProceedToPayment={(table) => {
          setCustomerBillTable(null);
          handleProceedToPayment(table);
        }}
      />

      {/* Thermal Receipt Print Modal */}
      <ReceiptModal
        isOpen={Boolean(receiptOrder)}
        order={receiptOrder}
        settings={settings}
        onClose={() => setReceiptOrder(null)}
      />

      {/* Confirmation Dialog */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDestructive={confirmModal.isDestructive}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Floating Toast Alerts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
      />

    </div>
  );
};

// Render React App to DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

