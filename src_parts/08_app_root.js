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
      const saved = localStorage.getItem('RAYHON_CAFE_PRODUCTS_V1');
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date());

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
      localStorage.setItem('RAYHON_CAFE_PRODUCTS_V1', JSON.stringify(products));
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
    { id: 'dashboard', name: 'Bosh sahifa', icon: 'dashboard' },
    { id: 'tables', name: 'Stollar', icon: 'tables', badge: occupiedCount + pendingCount > 0 ? `${occupiedCount + pendingCount} band` : null },
    { id: 'menu', name: 'Menyu', icon: 'menu' },
    { id: 'history', name: 'Tarix', icon: 'history' },
    { id: 'stats', name: 'Statistika', icon: 'stats' },
    { id: 'settings', name: 'Sozlamalar', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF7F2]">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-72 flex-col bg-cafe-950 text-white border-r border-cafe-900 select-none">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-cafe-900/80 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-cafe-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
            <Icon name="coffee-cup" className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide text-white">{settings.cafeName}</h1>
            <p className="text-[11px] text-amber-300/80 font-medium">Boshqaruv tizimi (POS)</p>
          </div>
        </div>

        {/* Live Clock Card */}
        <div className="px-6 py-4 border-b border-cafe-900/50 bg-cafe-900/30">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Icon name="clock" className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatDate(currentTime)}</span>
            </span>
            <span className="font-mono font-bold text-amber-300 text-sm">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
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
                    ? 'bg-amber-500 text-cafe-950 shadow-lg shadow-amber-500/20 translate-x-1'
                    : 'text-stone-300 hover:text-white hover:bg-cafe-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon} className={`w-5 h-5 ${isActive ? 'text-cafe-950' : 'text-stone-400'}`} />
                  <span className="text-sm">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-cafe-950 text-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sound toggle & Waiter Profile Footer */}
        <div className="p-4 border-t border-cafe-900/80 bg-cafe-900/40 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 px-2">
            <span>Ovozli signallar</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-xl border transition ${
                soundEnabled ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-500'
              }`}
              title={soundEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
            >
              <Icon name="check" className={`w-3.5 h-3.5 ${soundEnabled ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-2xl bg-cafe-900/60 border border-cafe-800">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
              <Icon name="user" className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="font-bold text-xs text-white truncate">Alisher (Kassir)</h5>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Tizimda onlayn
              </p>
            </div>
          </div>
        </div>

      </aside>

      {/* MOBILE SIDEBAR DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-72 bg-cafe-950 text-white flex flex-col h-full shadow-2xl z-10">
            <div className="p-6 border-b border-cafe-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-cafe-950 flex items-center justify-center font-black">
                  <Icon name="coffee-cup" className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">{settings.cafeName}</h3>
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
                    activeTab === item.id ? 'bg-amber-500 text-cafe-950 font-extrabold' : 'text-stone-300 hover:bg-cafe-900'
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
        
        {/* Top Header Bar */}
        <header className="h-18 px-4 sm:px-8 py-3.5 bg-white border-b border-stone-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg font-extrabold text-stone-900 capitalize">
                {navItems.find(i => i.id === activeTab)?.name || 'Boshqaruv'}
              </h2>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Toshkent vaqti: {formatTime(currentTime)} | 10 ta stol monitoringi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Active Tables Pill */}
            <div 
              onClick={() => setActiveTab('tables')}
              className="cursor-pointer px-3.5 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2 transition"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-dot"></span>
              <span>Band stollar: <b>{occupiedCount + pendingCount}/10</b></span>
            </div>

            {/* Quick POS opener */}
            <button
              onClick={() => {
                const firstAvailable = tables.find(t => t.status === 'available') || tables[0];
                handleSelectTable(firstAvailable.id);
              }}
              className="px-4 py-2 rounded-2xl bg-cafe-800 hover:bg-cafe-900 text-amber-300 font-bold text-xs shadow-md shadow-cafe-900/10 flex items-center gap-1.5 transition"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span className="hidden sm:inline">Tezkor buyurtma</span>
            </button>
          </div>
        </header>

        {/* Main Tab Screen Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                tables={tables}
                products={products}
                orderHistory={orderHistory}
                onSelectTable={handleSelectTable}
                onOpenReceipt={(order) => setReceiptOrder(order)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'tables' && (
              <TablesView
                tables={tables}
                onSelectTable={handleSelectTable}
                onChangeStatus={handleChangeStatus}
                onProceedToPayment={handleProceedToPayment}
                onClearTable={handleClearTable}
              />
            )}

            {activeTab === 'menu' && (
              <MenuView
                products={products}
                tables={tables}
                onSelectProduct={(product) => {
                  // If a table is active, add to it; else prompt to open table
                  const firstOccupiedOrAvail = tables.find(t => t.status === 'occupied') || tables.find(t => t.status === 'available') || tables[0];
                  handleSelectTable(firstOccupiedOrAvail.id);
                  handleAddItem(firstOccupiedOrAvail.id, product);
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

