// 1. DASHBOARD VIEW (Matching the new premium layout from screenshot)
const DashboardView = ({ 
  tables, 
  products, 
  orderHistory, 
  onSelectTable, 
  onOpenReceipt,
  onNavigateTab,
  onOpenCustomerBill,
  currentUser
}) => {
  const revenueMetrics = calculateRevenueMetrics(orderHistory);

  const totalTables = tables.length;
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;
  const pendingCount = tables.filter(t => t.status === 'payment_pending').length;
  const availableCount = tables.filter(t => t.status === 'available').length;

  return (
    <div className="space-y-4">
      
      {/* 1. TOP ROW: PANORAMA BANNER (LEFT) + BUGUNGI DAROMAD WITH GOLDEN WAVE (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Hero Card (~70% width) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-sm bg-[#160E08] text-white p-6 sm:p-7 flex items-center justify-between min-h-[160px]">
          {/* Real Cafe Photography with cozy bokeh */}
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80" 
            alt="Rayhon Cafe"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity filter blur-[0.5px]"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#170E08]/95 via-[#23150C]/90 to-[#120B06]/85 pointer-events-none"></div>

          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2 shadow-xs">
              <AppLogo size="w-4 h-4" className="rounded-xs" />
              <span>Rayhon Cafe & Lounge</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              Yaxshi kayfiyat,<br />mazali taom!
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-medium mt-1.5 flex items-center gap-1">
              <span>Bizning kafeda har doim iliq muhit</span>
              <span>🌿</span>
            </p>
          </div>

          {/* Official Emblem Logo (Right side of Hero Card) */}
          <div className="hidden sm:flex items-center justify-center shrink-0 relative z-10 pr-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40 p-1 bg-[#1A1009] flex items-center justify-center group hover:scale-105 transition">
              <AppLogo size="w-full h-full" className="rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Right "Bugungi daromad" Card (~30% width) with Golden Glowing Wave */}
        <div className="lg:col-span-4 bg-[#1C120B] text-white rounded-3xl p-5 border border-stone-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-1 relative z-10">
            <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <Icon name="trend-up" className="w-4 h-4 text-amber-400" />
              <span>Bugungi daromad</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              +12%
            </span>
          </div>

          <div className="my-2 relative z-10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              {formatUZS(revenueMetrics.today.sales)}
            </div>
          </div>

          {/* Golden Glowing Sparkline Area Wave */}
          <div className="h-12 w-full relative mt-1 overflow-hidden pointer-events-none z-0">
            <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="amberWaveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 Q40,65 75,45 T150,50 T225,25 T300,35 L300,80 L0,80 Z"
                fill="url(#amberWaveGrad)"
              />
              <path
                d="M0,60 Q40,65 75,45 T150,50 T225,25 T300,35"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </div>

      {/* 2. REVENUE CARDS ROW: 1 KUNLIK, 1 HAFTALIK, 1 OYLIK + KASSIR KIMLIGI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: 1 Kunlik */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center">
                <Icon name="calendar" className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-600">1 Kunlik</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              ↑ +12%
            </span>
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-stone-900 mt-2">
            {formatUZS(revenueMetrics.today.sales)}
          </div>
          {/* Subtle bottom wave */}
          <div className="h-4 w-full mt-2 overflow-hidden opacity-60">
            <svg viewBox="0 0 200 30" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,15 Q50,5 100,18 T200,12 L200,30 L0,30 Z" fill="#FDE68A" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Card 2: 1 Haftalik */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center">
                <Icon name="calendar" className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-600">1 Haftalik</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              ↑ +8%
            </span>
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-stone-900 mt-2">
            {formatUZS(revenueMetrics.week.sales)}
          </div>
          {/* Subtle bottom wave */}
          <div className="h-4 w-full mt-2 overflow-hidden opacity-60">
            <svg viewBox="0 0 200 30" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,15 Q50,8 100,20 T200,10 L200,30 L0,30 Z" fill="#FDE68A" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Card 3: 1 Oylik */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center">
                <Icon name="calendar" className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-600">1 Oylik</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              ↑ +15%
            </span>
          </div>
          <div className="text-lg sm:text-xl font-black font-mono text-stone-900 mt-2">
            {formatUZS(revenueMetrics.month.sales)}
          </div>
          {/* Subtle bottom wave */}
          <div className="h-4 w-full mt-2 overflow-hidden opacity-60">
            <svg viewBox="0 0 200 30" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,15 Q50,5 100,16 T200,14 L200,30 L0,30 Z" fill="#FDE68A" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Card 4: Kassir kimligi */}
        <div 
          onClick={() => onNavigateTab && onNavigateTab('menu')}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md cursor-pointer transition group"
          title="Kassir ish stoliga o‘tish"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Icon name="crown" className="w-4 h-4 text-amber-600" />
              <span>Kassir kimligi</span>
            </span>
            <span className="text-[10px] text-amber-600 font-bold group-hover:translate-x-0.5 transition">Kassir paneli →</span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-2.5">
              <CashierAvatar 
                src={currentUser?.avatar} 
                alt={currentUser?.name || "Alisher Gayratov"} 
                size="w-10 h-10" 
                className="border-2 border-stone-100 shadow-xs" 
              />
              <div>
                <h5 className="font-extrabold text-xs text-stone-900 leading-tight">
                  {currentUser?.name || "Alisher Gayratov"}
                </h5>
                <p className="text-[10px] text-stone-400 font-medium">{currentUser?.role || "Kassir"}</p>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot"></span>
              <span>Onlayn</span>
            </span>
          </div>
        </div>

      </div>

      {/* 3. MAIN SECTION: STOLLAR (1-10) [LEFT] + SO'NGGI FAOLIYAT [RIGHT] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Stollar (1-10) Grid (~70% width) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header row */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-amber-50 text-amber-800">
                  <Icon name="chair" className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-stone-900 tracking-tight">
                  Stollar (1-10)
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="flex items-center gap-1 text-stone-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Bo‘sh
                  </span>
                  <span className="flex items-center gap-1 text-stone-600">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Band
                  </span>
                </div>

                <button
                  onClick={() => onNavigateTab('tables')}
                  className="text-xs font-bold text-stone-500 hover:text-amber-800 flex items-center gap-1 transition ml-2"
                >
                  <span>Barchasini ko‘rish</span>
                  <span className="text-amber-600">→</span>
                </button>
              </div>
            </div>

            {/* 10 Tables Grid (Exact 2 rows of 5 cards with Dining Table SVG) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3.5">
              {tables.slice(0, 10).map((table, idx) => {
                const isOccupied = table.status === 'occupied' || table.status === 'payment_pending';
                const guestCount = idx === 0 ? 3 : idx === 3 ? 2 : idx === 6 ? 4 : idx === 9 ? 2 : 2;

                return (
                  <div
                    key={table.id}
                    onClick={() => onSelectTable(table.id)}
                    className="rounded-2xl border border-stone-200/90 bg-white p-3 flex flex-col justify-between hover:shadow-md hover:border-amber-400 transition cursor-pointer group"
                  >
                    <div>
                      {/* Top: Black Badge + Dining Table Icon + Status Pill */}
                      <div className="flex items-center justify-between">
                        <span className="w-5 h-5 rounded-md bg-stone-900 text-white font-black text-[11px] flex items-center justify-center shadow-xs">
                          {table.id}
                        </span>

                        <div className="text-stone-700">
                          <Icon name="dining-table" className="w-4 h-4" />
                        </div>

                        {isOccupied ? (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            Band
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Bo‘sh
                          </span>
                        )}
                      </div>

                      {/* Middle: Guest count or dash */}
                      <div className="my-2.5 text-center min-h-[36px] flex items-center justify-center">
                        {isOccupied ? (
                          <div className="text-[11px] font-bold text-stone-600">
                            Mijoz: {guestCount} kishi
                          </div>
                        ) : (
                          <div className="text-stone-300 font-bold text-base">
                            —
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] font-bold">
                      {isOccupied ? (
                        <>
                          <span className="text-stone-700 group-hover:text-amber-800 transition">
                            Ko‘rish →
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenCustomerBill(table);
                            }}
                            className="px-2 py-0.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-stone-950 text-amber-900 border border-amber-400/40 font-black flex items-center gap-1 transition shadow-2xs"
                            title="Mijoz ovqatlanib bo‘lgach, shotni hisoblab aytish"
                          >
                            <Icon name="speech" className="w-3 h-3 text-amber-700" />
                            <span>Shotni aytish</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-stone-400 group-hover:text-emerald-700 transition w-full text-center">
                          Ochilish →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: So'nggi faoliyat (~30% width) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Icon name="clock" className="w-4 h-4 text-stone-700" />
                <h4 className="font-extrabold text-sm text-stone-900">
                  So‘nggi faoliyat
                </h4>
              </div>
              <button
                onClick={() => onNavigateTab('history')}
                className="text-xs font-bold text-stone-500 hover:text-amber-800 transition flex items-center gap-1"
              >
                <span>Barchasi</span>
                <span className="text-amber-600">→</span>
              </button>
            </div>

            {/* List of Recent Items matching screenshot */}
            <div className="divide-y divide-stone-100 mt-2">
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    ☕
                  </div>
                  <div>
                    <h6 className="font-extrabold text-xs text-stone-900">Latte</h6>
                    <p className="text-[10px] text-stone-400">2 dona</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>13:20</span>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    🍕
                  </div>
                  <div>
                    <h6 className="font-extrabold text-xs text-stone-900">Pitsa</h6>
                    <p className="text-[10px] text-stone-400">1 dona</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>13:18</span>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    ☕
                  </div>
                  <div>
                    <h6 className="font-extrabold text-xs text-stone-900">Americano</h6>
                    <p className="text-[10px] text-stone-400">1 dona</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>13:15</span>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    🍰
                  </div>
                  <div>
                    <h6 className="font-extrabold text-xs text-stone-900">Cheesecake</h6>
                    <p className="text-[10px] text-stone-400">1 dona</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>13:12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Thank You Banner matching screenshot */}
          <div className="mt-4 p-3 rounded-2xl bg-[#1C120B] text-white flex items-center justify-between shadow-xs border border-amber-900/30">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <span>🎁</span>
              <span className="text-[11px]">Rahmat, Rayhon Cafe tanlaganingiz uchun! ❤️</span>
            </div>
            <span className="text-amber-500 opacity-60">🌿</span>
          </div>
        </div>

      </div>

    </div>
  );
};

// 2. TABLES MANAGEMENT VIEW
const TablesView = ({
  tables,
  onSelectTable,
  onChangeStatus,
  onProceedToPayment,
  onClearTable,
  onOpenCustomerBill
}) => {
  const [statusFilter, setStatusFilter] = React.useState('all');

  const filteredTables = tables.filter(t => {
    if (statusFilter === 'all') return true;
    return t.status === statusFilter;
  });

  const availableCount = tables.filter(t => t.status === 'available').length;
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;
  const pendingCount = tables.filter(t => t.status === 'payment_pending').length;

  return (
    <div className="space-y-6">
      
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900">Stollar boshqaruvi (10 ta stol)</h2>
          <p className="text-xs text-stone-500 mt-1">Har bir stolning bandligi, nima yeyilayotgani, hisob-kitobi va holati</p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              statusFilter === 'all'
                ? 'bg-cafe-800 text-amber-300 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Barchasi (10)
          </button>
          <button
            onClick={() => setStatusFilter('available')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              statusFilter === 'available'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            🟢 Bo‘sh ({availableCount})
          </button>
          <button
            onClick={() => setStatusFilter('occupied')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              statusFilter === 'occupied'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            🔴 Band ({occupiedCount})
          </button>
          <button
            onClick={() => setStatusFilter('payment_pending')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              statusFilter === 'payment_pending'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            🟣 To‘lov kutilmoqda ({pendingCount})
          </button>
        </div>
      </div>

      {/* 10 Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredTables.map(table => {
          const totalBill = (table.order || []).reduce((acc, i) => acc + (i.price * i.quantity), 0);
          const totalItems = (table.order || []).reduce((acc, i) => acc + i.quantity, 0);

          let cardBorder = "border-stone-200 hover:border-emerald-400 bg-white";
          if (table.status === 'occupied') {
            cardBorder = "border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/20";
          } else if (table.status === 'payment_pending') {
            cardBorder = "border-purple-300 ring-2 ring-purple-400/20 bg-purple-50/20";
          }

          return (
            <div
              key={table.id}
              className={`rounded-3xl p-5 border-2 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between ${cardBorder}`}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-cafe-900 text-amber-400 flex items-center justify-center font-extrabold text-base shadow-sm">
                      {table.id}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-base">{table.name}</h4>
                      <p className="text-[11px] text-stone-400">Ofitsiant: {table.waiter || "Alisher"}</p>
                    </div>
                  </div>
                  <TableStatusBadge status={table.status} />
                </div>

                {/* Table Content */}
                {table.status !== 'available' && table.order && table.order.length > 0 ? (
                  <div className="my-3 p-3 bg-white rounded-2xl border border-stone-200/80 space-y-2">
                    <div className="flex justify-between text-xs text-stone-500 font-medium">
                      <span>Joriy buyurtma ({totalItems} ta):</span>
                      {table.openedAt && <span>{table.openedAt}</span>}
                    </div>
                    <ul className="space-y-1 text-xs text-stone-700 max-h-24 overflow-y-auto pr-1">
                      {table.order.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-[11px]">
                          <span className="truncate max-w-[120px] font-medium">{item.name}</span>
                          <span className="font-mono text-stone-500 font-semibold">{item.quantity} × {formatUZS(item.price).replace(" so'm", '')}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-stone-600">Jami hisob:</span>
                      <span className="text-sm font-extrabold font-mono text-amber-700">
                        {formatUZS(totalBill)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="my-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                      <Icon name="check" className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-emerald-800">Stol bo‘sh</p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">Yangi mijozlarni qabul qilishga tayyor</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200/70 space-y-2">
                {table.status === 'available' ? (
                  <button
                    onClick={() => onSelectTable(table.id)}
                    className="w-full py-2.5 px-3 rounded-2xl bg-cafe-800 hover:bg-cafe-900 text-amber-300 font-bold text-xs shadow-md shadow-cafe-900/10 flex items-center justify-center gap-1.5 transition"
                  >
                    <Icon name="plus" className="w-4 h-4" />
                    <span>Buyurtma ochish</span>
                  </button>
                ) : (
                  <>
                    {/* MIJOZGA HISOBNI AYTISH TUGMASI */}
                    <button
                      onClick={() => onOpenCustomerBill(table)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-cafe-950 font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition"
                      title="Mijoz nima yeganini hisoblash va aytish"
                    >
                      <Icon name="speech" className="w-3.5 h-3.5" />
                      <span>🗣️ Mijoz hisobini aytish</span>
                    </button>

                    <button
                      onClick={() => onSelectTable(table.id)}
                      className="w-full py-1.5 px-3 rounded-xl bg-cafe-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Icon name="menu" className="w-3.5 h-3.5 text-amber-600" />
                      <span>Buyurtmaga qo‘shish / Ko‘rish</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onProceedToPayment(table)}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-cafe-800 hover:bg-cafe-900 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1 transition"
                      >
                        <Icon name="cash" className="w-3.5 h-3.5" />
                        <span>To‘lov</span>
                      </button>
                      <button
                        onClick={() => onClearTable(table.id)}
                        className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 border border-stone-200 transition"
                        title="Stolni tozalash"
                      >
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

// 3. MENYU VA TAOMLAR BOSHQARUVI VIEW
const MenuView = ({ 
  products, 
  onSelectProduct, 
  tables = [], 
  currentUser,
  orderHistory = [],
  onSelectTable,
  onProceedToPayment,
  onOpenCustomerBill
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTableForOrder, setSelectedTableForOrder] = React.useState(() => {
    const firstOccupied = (tables || []).find(t => t.status === 'occupied');
    return firstOccupied ? firstOccupied.id : 1;
  });

  const revenueMetrics = typeof calculateRevenueMetrics === 'function'
    ? calculateRevenueMetrics(orderHistory)
    : { today: { sales: 0, ordersCount: 0, avgCheck: 0 } };

  const occupiedTables = (tables || []).filter(t => t.status === 'occupied' || t.status === 'payment_pending');

  const filteredProducts = products.filter(p => {
    let matchesCat = true;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'fastfood') {
        matchesCat = p.category === 'fastfood' || p.category === 'food';
      } else {
        matchesCat = p.category === selectedCategory;
      }
    }
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'Barchasi', count: products.length },
    { id: 'fastfood', name: '🍔 Fastfud', count: products.filter(p => p.category === 'fastfood' || p.category === 'food').length },
    { id: 'salad', name: '🥗 Salatlar', count: products.filter(p => p.category === 'salad').length },
    { id: 'dessert', name: '🍰 Desertlar', count: products.filter(p => p.category === 'dessert').length },
    { id: 'drinks', name: '🥤 Ichimliklar', count: products.filter(p => p.category === 'drinks').length },
    { id: 'coffee', name: '☕ Qahva & Choy', count: products.filter(p => p.category === 'coffee').length },
  ];

  const handleFastAdd = (product) => {
    if (onSelectProduct) {
      onSelectProduct(product, selectedTableForOrder);
    }
  };

  return (
    <div className="space-y-5">
      
      {/* 1. MENYU VA TERMINAL BOSHQARUVI BANNERI */}
      <div className="bg-[#1C120B] text-white rounded-3xl p-5 sm:p-6 border border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md ring-4 ring-amber-500/20 shrink-0 bg-[#140C07] p-0.5">
            <AppLogo size="w-full h-full" className="rounded-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Menyu va Buyurtmalar</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {products.length} ta mahsulot
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1 flex items-center gap-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot"></span>
                Katalog faol
              </span>
              <span className="text-stone-500">•</span>
              <span>Fastfud, Salatlar, Desertlar, Ichimliklar va Qahva</span>
            </p>
            <p className="text-[11px] text-stone-400 font-mono mt-0.5">Mas’ul xodim: {currentUser?.name || "Alisher Gayratov"}</p>
          </div>
        </div>

        {/* Shift Stats Counters */}
        <div className="grid grid-cols-3 gap-2.5 w-full md:w-auto relative z-10">
          <div className="bg-[#281A12] border border-amber-900/40 rounded-2xl p-3 text-center min-w-[100px]">
            <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">Bugungi kassa</span>
            <span className="text-sm sm:text-base font-black font-mono text-white mt-0.5 block">{formatUZS(revenueMetrics.today.sales)}</span>
          </div>
          <div className="bg-[#281A12] border border-amber-900/40 rounded-2xl p-3 text-center min-w-[90px]">
            <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">Cheklar</span>
            <span className="text-sm sm:text-base font-black font-mono text-white mt-0.5 block">{revenueMetrics.today.ordersCount} ta</span>
          </div>
          <div className="bg-[#281A12] border border-amber-900/40 rounded-2xl p-3 text-center min-w-[90px]">
            <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">O‘rtacha chek</span>
            <span className="text-sm sm:text-base font-black font-mono text-white mt-0.5 block">{formatUZS(revenueMetrics.today.avgCheck)}</span>
          </div>
        </div>
      </div>

      {/* 2. BAND STOLLARNING TO'LOV VA HISOB PANELI */}
      {occupiedTables.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <h3 className="font-extrabold text-sm text-stone-900">
                To‘lov kutilayotgan band stollar ({occupiedTables.length} ta)
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">Mijoz hisobini aytish va to‘lovni qabul qilish</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {occupiedTables.map(t => {
              const subtotal = (t.order || []).reduce((sum, i) => sum + (i.price * i.quantity), 0);
              const itemsCount = (t.order || []).reduce((sum, i) => sum + i.quantity, 0);

              return (
                <div key={t.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-sm text-stone-900">Stol {t.id} ({t.name})</span>
                      <p className="text-[11px] text-stone-500">{itemsCount} ta taom · {t.openedAt || 'Band'}</p>
                    </div>
                    <span className="font-mono font-extrabold text-sm text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                      {formatUZS(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                    <button
                      onClick={() => onOpenCustomerBill && onOpenCustomerBill(t)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs shadow-2xs flex items-center justify-center gap-1.5 transition"
                      title="Mijoz nima yeganini hisoblash va aytish"
                    >
                      <Icon name="speech" className="w-3.5 h-3.5" />
                      <span>Mijozga aytish</span>
                    </button>
                    <button
                      onClick={() => onProceedToPayment && onProceedToPayment(t)}
                      className="py-1.5 px-3 rounded-xl bg-cafe-800 hover:bg-cafe-900 text-white font-extrabold text-xs shadow-2xs flex items-center gap-1 transition"
                    >
                      <Icon name="cash" className="w-3.5 h-3.5" />
                      <span>To‘lov</span>
                    </button>
                    <button
                      onClick={() => onSelectTable && onSelectTable(t.id)}
                      className="p-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 transition"
                      title="Buyurtmani ko‘rish"
                    >
                      <Icon name="eye" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. MAHSULOTLAR KATALOGI */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-stone-900">Taomlar, Salatlar, Desertlar va Ichimliklar</h3>
            <p className="text-xs text-stone-500">Mahsulotni tanlang va to‘g‘ridan-to‘g‘ri stol buyurtmasiga qo‘shing</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-stone-600">Buyurtma beriladigan stol:</span>
            <select
              value={selectedTableForOrder}
              onChange={(e) => setSelectedTableForOrder(parseInt(e.target.value, 10))}
              className="py-1.5 px-3 rounded-xl bg-stone-100 border border-stone-300 text-xs font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {tables.map(t => (
                <option key={t.id} value={t.id}>
                  Stol {t.id} ({t.name}) — {t.status === 'occupied' ? '🔴 Band' : '🟢 Bo‘sh'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === cat.id ? 'bg-stone-950 text-amber-300' : 'bg-stone-200 text-stone-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Icon name="search" className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Mahsulot nomi yoki ta'rifi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-2">
          {filteredProducts.map(product => {
            const isOutOfStock = product.inStock === false;

            return (
              <ProductCard
                key={product.id}
                product={product}
                disabled={isOutOfStock}
                onSelect={() => handleFastAdd(product)}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};


// 7. XODIMLAR VA OYLIK MAOSHLAR BOSHQARUVI VIEW
const StaffView = ({ staff = [], onUpdateStaff, onAddStaff, onDeleteStaff }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState('all');
  const [editingStaff, setEditingStaff] = React.useState(null);
  const [newStaffModal, setNewStaffModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    role: 'Ofitsiant',
    department: 'Zal',
    phone: '+998 90 ',
    salary: 4000000,
    shift: '09:00 - 21:00',
    status: 'Faol',
    experience: '1 yil',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
  });

  const totalPayroll = staff.reduce((sum, s) => sum + (s.salary || 0), 0);
  const activeCount = staff.filter(s => s.status === 'Faol').length;
  const avgSalary = staff.length > 0 ? Math.round(totalPayroll / staff.length) : 0;

  const departments = [
    { id: 'all', name: 'Barcha xodimlar', count: staff.length },
    { id: 'Kassa', name: 'Kassa', count: staff.filter(s => s.department === 'Kassa').length },
    { id: 'Oshxona', name: 'Oshxona', count: staff.filter(s => s.department === 'Oshxona').length },
    { id: 'Zal', name: 'Zal / Xizmat', count: staff.filter(s => s.department === 'Zal').length },
    { id: 'Qandolat', name: 'Qandolat', count: staff.filter(s => s.department === 'Qandolat').length },
    { id: 'Bar', name: 'Bar', count: staff.filter(s => s.department === 'Bar').length },
    { id: 'Servis', name: 'Servis / Tozalik', count: staff.filter(s => s.department === 'Servis').length }
  ];

  const filteredStaff = staff.filter(s => {
    const matchesDept = selectedDept === 'all' || s.department === selectedDept;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.phone.includes(searchQuery);
    return matchesDept && matchesQuery;
  });

  const handleSaveSalary = (e) => {
    e.preventDefault();
    if (!editingStaff) return;
    onUpdateStaff(editingStaff.id, {
      ...editingStaff,
      salary: parseInt(editingStaff.salary, 10) || 0
    });
    setEditingStaff(null);
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    const newEmp = {
      id: 'emp_' + Date.now(),
      name: formData.name,
      role: formData.role,
      department: formData.department,
      phone: formData.phone,
      salary: parseInt(formData.salary, 10) || 3000000,
      shift: formData.shift,
      status: formData.status,
      experience: formData.experience,
      avatar: formData.avatar,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    onAddStaff(newEmp);
    setNewStaffModal(false);
    setFormData({
      name: '',
      role: 'Ofitsiant',
      department: 'Zal',
      phone: '+998 90 ',
      salary: 4000000,
      shift: '09:00 - 21:00',
      status: 'Faol',
      experience: '1 yil',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Jami Xodimlar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">Jami xodimlar</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Icon name="users" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900">{staff.length}</span>
            <span className="text-xs text-stone-500 ml-1 font-bold">nafar</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{activeCount} nafari bugun faol</span>
          </p>
        </div>

        {/* Card 2: Jami Oylik Fondi */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">Oylik maosh fondi</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Icon name="cash" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-700">{formatUZS(totalPayroll)}</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium mt-1">Har oylik umumiy ish haqi</p>
        </div>

        {/* Card 3: O'rtacha Oylik */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">O‘rtacha oylik maosh</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Icon name="stats" className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-stone-900">{formatUZS(avgSalary)}</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium mt-1">1 nafar xodim hisobiga</p>
        </div>

        {/* Card 4: Smena Intizomi */}
        <div className="bg-[#1C120B] text-white rounded-3xl p-5 border border-stone-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-300">Smena jadvali</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300">Rayhon Staff</span>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-white">2 smena</span>
          </div>
          <p className="text-[11px] text-amber-400/90 font-medium mt-1">08:00–20:00 / 11:00–23:00</p>
        </div>
      </div>

      {/* 2. FILTER & ACTION BAR */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-stone-900">Xodimlar ro‘yxati va Maoshlar</h3>
            <p className="text-xs text-stone-500">Har bir xodimning lavozimi, aloqa ma’lumotlari va belgilangan oylik maoshi</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setNewStaffModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span>Yangi xodim qo‘shish</span>
            </button>
          </div>
        </div>

        {/* Department Filter & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedDept === dept.id
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{dept.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedDept === dept.id ? 'bg-stone-950 text-amber-300' : 'bg-stone-200 text-stone-600'
                }`}>
                  {dept.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Icon name="search" className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ism, lavozim yoki telefon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* 3. STAFF CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStaff.map((emp) => {
          return (
            <div
              key={emp.id}
              className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4 group"
            >
              {/* Employee Top: Avatar, Name, Role */}
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <CashierAvatar src={emp.avatar} alt={emp.name} size="w-13 h-13" className="border-2 border-stone-100 shadow-xs" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    emp.status === 'Faol' ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}></span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-sm text-stone-900 truncate leading-snug group-hover:text-amber-800 transition">
                    {emp.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-800">
                      {emp.role}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold">• {emp.department}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-mono mt-1 flex items-center gap-1">
                    <span>📞</span>
                    <span>{emp.phone}</span>
                  </p>
                </div>
              </div>

              {/* Salary Block (Prominent) */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-800/80 block uppercase tracking-wider">Oylik maoshi:</span>
                  <span className="text-base font-black font-mono text-amber-900 mt-0.5 block">
                    {formatUZS(emp.salary)}
                  </span>
                </div>
                <button
                  onClick={() => setEditingStaff(emp)}
                  className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-extrabold shadow-2xs transition"
                  title="Oylik maoshni o‘zgartirish"
                >
                  Tahrirlash ✏️
                </button>
              </div>

              {/* Shift and Experience Details */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Smena:</span>
                  <span className="font-bold text-stone-800">{emp.shift}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Tajriba:</span>
                  <span className="font-bold text-stone-800">{emp.experience || '1 yil'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Holat:</span>
                  <button
                    onClick={() => {
                      const newStatus = emp.status === 'Faol' ? 'Dam olishda' : 'Faol';
                      onUpdateStaff(emp.id, { ...emp, status: newStatus });
                    }}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition ${
                      emp.status === 'Faol' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {emp.status}
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${emp.phone.replace(/\s/g, '')}`}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <span>Qo‘ng‘iroq</span>
                </a>
                <button
                  onClick={() => onDeleteStaff(emp.id)}
                  className="p-1.5 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 border border-stone-200 transition"
                  title="Xodimni o‘chirish"
                >
                  <Icon name="trash" className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. MODAL: EDIT SALARY */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-black text-base text-stone-900">Oylik maoshni o‘zgartirish</h3>
              <button onClick={() => setEditingStaff(null)} className="text-stone-400 hover:text-stone-600">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSalary} className="space-y-4 mt-4">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl">
                <CashierAvatar src={editingStaff.avatar} size="w-10 h-10" />
                <div>
                  <h4 className="font-extrabold text-xs text-stone-900">{editingStaff.name}</h4>
                  <p className="text-[10px] text-stone-400">{editingStaff.role} ({editingStaff.department})</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Oylik maosh summasi (so‘mda):</label>
                <input
                  type="number"
                  step="50000"
                  required
                  value={editingStaff.salary}
                  onChange={(e) => setEditingStaff({ ...editingStaff, salary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-black font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] font-mono text-amber-700 font-extrabold mt-1">
                  = {formatUZS(editingStaff.salary)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Smena vaqti:</label>
                <input
                  type="text"
                  value={editingStaff.shift || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, shift: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs shadow-md transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: ADD NEW STAFF */}
      {newStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-black text-base text-stone-900">Yangi xodim qo‘shish</h3>
              <button onClick={() => setNewStaffModal(false)} className="text-stone-400 hover:text-stone-600">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNew} className="space-y-3 mt-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ism va familiya:</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Jamshid Aliyev"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Lavozimi:</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Barista"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Bo‘lim:</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Kassa">Kassa</option>
                    <option value="Oshxona">Oshxona</option>
                    <option value="Zal">Zal / Xizmat</option>
                    <option value="Qandolat">Qandolat</option>
                    <option value="Bar">Bar</option>
                    <option value="Servis">Servis / Tozalik</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Telefon raqam:</label>
                  <input
                    type="text"
                    placeholder="+998 90 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Oylik maosh (so‘m):</label>
                  <input
                    type="number"
                    step="50000"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-black font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Smena vaqti:</label>
                <input
                  type="text"
                  placeholder="08:00 - 20:00"
                  value={formData.shift}
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewStaffModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs shadow-md transition"
                >
                  Qo‘shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// 4. ORDER HISTORY VIEW
const HistoryView = ({ orderHistory, onOpenReceipt }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState('all'); // 'all', 'today', 'yesterday'
  const [paymentFilter, setPaymentFilter] = React.useState('all');
  const [tableFilter, setTableFilter] = React.useState('all');

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const filteredOrders = orderHistory.filter(order => {
    // Search by ID, table name or item name
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.items || []).some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Date filter
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = order.dateOnly === todayStr || (order.timestamp && order.timestamp.startsWith(todayStr));
    } else if (dateFilter === 'yesterday') {
      matchesDate = order.dateOnly === yesterday || (order.timestamp && order.timestamp.startsWith(yesterday));
    }

    // Payment method filter
    const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;

    // Table filter
    const matchesTable = tableFilter === 'all' || String(order.tableId) === tableFilter;

    return matchesSearch && matchesDate && matchesPayment && matchesTable;
  });

  const totalFilteredSales = filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900">Buyurtmalar va to‘lovlar tarixi</h2>
          <p className="text-xs text-stone-500 mt-1">Barcha yakunlangan hisoblar xotirada doimiy saqlanadi</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
            Jami ko‘rsatilgan: <span className="font-mono text-sm ml-1">{formatUZS(totalFilteredSales)}</span> ({filteredOrders.length} ta)
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-stone-200/80 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Icon name="search" className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Chek №, stol yoki taom qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 outline-none"
          >
            <option value="all">Sana: Barchasi</option>
            <option value="today">Sana: Bugun</option>
            <option value="yesterday">Sana: Kecha</option>
          </select>

          {/* Payment Method Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 outline-none"
          >
            <option value="all">To‘lov turi: Barchasi</option>
            <option value="Naqd pul">Naqd pul</option>
            <option value="Plastik karta">Plastik karta</option>
          </select>

          {/* Table Number Filter */}
          <select
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 outline-none"
          >
            <option value="all">Stol: Barcha stollar</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>Stol {i + 1}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-card border border-stone-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Chek raqami</th>
                <th className="py-3 px-4">Stol</th>
                <th className="py-3 px-4">Buyurtma tarkibi</th>
                <th className="py-3 px-4">To‘lov usuli</th>
                <th className="py-3 px-4">Sana va vaqt</th>
                <th className="py-3 px-4 text-right">Jami summa</th>
                <th className="py-3 px-4 text-center">Chek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-amber-50/30 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{order.id}</td>
                  <td className="py-3.5 px-4 font-bold text-cafe-900">{order.tableName}</td>
                  <td className="py-3.5 px-4 text-stone-600 max-w-sm">
                    <div className="truncate">
                      {(order.items || []).map(i => `${i.name} (${i.quantity}x)`).join(', ')}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      order.paymentMethod === 'Naqd pul' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      <Icon name={order.paymentMethod === 'Naqd pul' ? 'cash' : 'card'} className="w-3.5 h-3.5" />
                      <span>{order.paymentMethod}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 font-medium">{order.formattedDate}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-sm text-stone-900">
                    {formatUZS(order.total)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onOpenReceipt(order)}
                      className="px-3 py-1.5 rounded-xl bg-cafe-50 hover:bg-cafe-800 hover:text-amber-300 text-cafe-800 font-bold transition flex items-center gap-1.5 mx-auto border border-cafe-200"
                    >
                      <Icon name="printer" className="w-3.5 h-3.5" />
                      <span>Chek</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-16 text-stone-400">
              <Icon name="history" className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="font-bold text-stone-700">Tarixda buyurtma topilmadi</p>
              <p className="text-xs text-stone-400 mt-1">Filtrlarni o‘zgartiring yoki yangi to‘lov amalga oshiring</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

// 5. DAILY SALES AND STATISTICS VIEW
const StatisticsView = ({ orderHistory, tables, products }) => {
  const [statPeriod, setStatPeriod] = React.useState('day'); // 'day', 'week', 'month'
  const revenueMetrics = calculateRevenueMetrics(orderHistory);

  const activeMetric = statPeriod === 'day' 
    ? revenueMetrics.today 
    : statPeriod === 'week' 
    ? revenueMetrics.week 
    : revenueMetrics.month;

  const currentPeriodOrders = activeMetric.orders;
  const currentSales = activeMetric.sales;
  const currentOrdersCount = activeMetric.ordersCount;
  const currentAvgCheck = activeMetric.avgCheck;
  const currentItemsSold = activeMetric.itemsSold;
  const occupiedTablesCount = tables.filter(t => t.status === 'occupied' || t.status === 'payment_pending').length;

  // Cash vs Card breakdown for active period
  const cashSales = currentPeriodOrders.filter(o => o.paymentMethod === 'Naqd pul').reduce((s, o) => s + (o.total || 0), 0);
  const cardSales = currentPeriodOrders.filter(o => o.paymentMethod === 'Plastik karta').reduce((s, o) => s + (o.total || 0), 0);
  const cashPercent = currentSales > 0 ? Math.round((cashSales / currentSales) * 100) : 50;
  const cardPercent = currentSales > 0 ? 100 - cashPercent : 50;

  // Most popular products calculation for active period
  const productStats = {};
  currentPeriodOrders.forEach(order => {
    (order.items || []).forEach(item => {
      if (!productStats[item.name]) {
        productStats[item.name] = { name: item.name, quantity: 0, revenue: 0, icon: item.icon };
      }
      productStats[item.name].quantity += item.quantity;
      productStats[item.name].revenue += item.price * item.quantity;
    });
  });

  const popularProducts = Object.values(productStats)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const maxPopularQty = popularProducts.length > 0 ? popularProducts[0].quantity : 1;

  // 1. Hourly data for 1 Kunlik (Today)
  const hourlyData = [
    { label: '09:00', sales: 45000, orders: 1 },
    { label: '11:00', sales: 86000, orders: 2 },
    { label: '13:00', sales: 249000, orders: 4 },
    { label: '15:00', sales: 120000, orders: 2 },
    { label: '17:00', sales: currentSales > 500000 ? 180000 : 70000, orders: 2 },
    { label: '19:00', sales: currentSales > 700000 ? 250000 : 90000, orders: 3 },
    { label: '21:00', sales: currentSales > 900000 ? 160000 : 40000, orders: 1 },
    { label: '23:00', sales: 0, orders: 0 }
  ];

  // 2. 7-Day daily breakdown for 1 Haftalik (Week)
  const now = new Date();
  const dayNames = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
  const weekDaysData = [...Array(7)].map((_, i) => {
    const d = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const dayOrders = orderHistory.filter(o => o.dateOnly === dateStr);
    const dayTotal = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    return {
      label: dayNames[d.getDay()],
      fullDate: d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' }),
      sales: dayTotal || (i === 6 ? currentSales : Math.max(80000, Math.round(currentSales * 0.7 * (0.8 + (i % 3) * 0.2)))),
      orders: dayOrders.length || (i === 6 ? currentOrdersCount : 3 + (i % 4))
    };
  });

  // 3. 4-Week breakdown for 1 Oylik (Month)
  const monthWeeksData = [
    { label: '1-Hafta', fullDate: '01-07 kun', sales: Math.round(revenueMetrics.month.sales * 0.22), orders: Math.round(revenueMetrics.month.ordersCount * 0.22) },
    { label: '2-Hafta', fullDate: '08-14 kun', sales: Math.round(revenueMetrics.month.sales * 0.26), orders: Math.round(revenueMetrics.month.ordersCount * 0.25) },
    { label: '3-Hafta', fullDate: '15-21 kun', sales: Math.round(revenueMetrics.month.sales * 0.24), orders: Math.round(revenueMetrics.month.ordersCount * 0.24) },
    { label: '4-Hafta (Hozirgi)', fullDate: '22-30 kun', sales: Math.round(revenueMetrics.month.sales * 0.28), orders: Math.round(revenueMetrics.month.ordersCount * 0.29) },
  ];

  // Current active chart data based on selected tab
  const activeChartData = statPeriod === 'day' 
    ? hourlyData 
    : statPeriod === 'week' 
    ? weekDaysData 
    : monthWeeksData;

  const maxChartSales = Math.max(...activeChartData.map(d => d.sales), 100000);

  return (
    <div className="space-y-6">
      
      {/* Header and Period Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900">Daromadlar va Savdo Statistikasi</h2>
          <p className="text-xs text-stone-500 mt-1">1 kunlik, 1 haftalik va 1 oylik tushumlar, o‘rtacha chek va taomlar tahlili</p>
        </div>

        {/* 1 KUNLIK, 1 HAFTALIK, 1 OYLIK TABS */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shadow-xs">
          <button
            onClick={() => setStatPeriod('day')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              statPeriod === 'day'
                ? 'bg-amber-500 text-cafe-950 shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <span>📅 1 Kunlik (Bugun)</span>
          </button>
          <button
            onClick={() => setStatPeriod('week')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              statPeriod === 'week'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <span>📆 1 Haftalik (7 kun)</span>
          </button>
          <button
            onClick={() => setStatPeriod('month')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              statPeriod === 'month'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <span>🗓️ 1 Oylik (30 kun)</span>
          </button>
        </div>
      </div>

      {/* 3 Overview Cards for 1 Kunlik, 1 Haftalik, 1 Oylik Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1 Kunlik Card */}
        <div 
          onClick={() => setStatPeriod('day')}
          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
            statPeriod === 'day' 
              ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-500/20 shadow-md' 
              : 'bg-white border-stone-200 hover:border-amber-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              1 Kunlik Daromad
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">Bugun</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cafe-950 text-amber-900">
            {formatUZS(revenueMetrics.today.sales)}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-200/60 text-xs text-stone-500 flex justify-between">
            <span>{revenueMetrics.today.ordersCount} ta hisob</span>
            <span>O‘rtacha: <b className="font-mono text-stone-800">{formatUZS(revenueMetrics.today.avgCheck)}</b></span>
          </div>
        </div>

        {/* 1 Haftalik Card */}
        <div 
          onClick={() => setStatPeriod('week')}
          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
            statPeriod === 'week' 
              ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-md' 
              : 'bg-white border-stone-200 hover:border-emerald-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              1 Haftalik Daromad
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">Oxirgi 7 kun</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-950 text-emerald-900">
            {formatUZS(revenueMetrics.week.sales)}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-200/60 text-xs text-stone-500 flex justify-between">
            <span>{revenueMetrics.week.ordersCount} ta hisob</span>
            <span>O‘rtacha: <b className="font-mono text-stone-800">{formatUZS(revenueMetrics.week.avgCheck)}</b></span>
          </div>
        </div>

        {/* 1 Oylik Card */}
        <div 
          onClick={() => setStatPeriod('month')}
          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
            statPeriod === 'month' 
              ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-md' 
              : 'bg-white border-stone-200 hover:border-indigo-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              1 Oylik Daromad
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-bold">Oxirgi 30 kun</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-950 text-indigo-900">
            {formatUZS(revenueMetrics.month.sales)}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-200/60 text-xs text-stone-500 flex justify-between">
            <span>{revenueMetrics.month.ordersCount} ta hisob</span>
            <span>O‘rtacha: <b className="font-mono text-stone-800">{formatUZS(revenueMetrics.month.avgCheck)}</b></span>
          </div>
        </div>

      </div>

      {/* 4 Detail Metric Cards for Active Period */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title={statPeriod === 'day' ? "Bugungi tushum" : statPeriod === 'week' ? "7 kunlik tushum" : "30 kunlik tushum"}
          value={formatUZS(currentSales)}
          subtext="Jami kassa daromadi"
          icon="cash"
          color={statPeriod === 'day' ? 'amber' : statPeriod === 'week' ? 'emerald' : 'indigo'}
        />
        <StatCard
          title="Sotilgan taomlar"
          value={`${currentItemsSold} ta`}
          subtext="Jami porsiyalar soni"
          icon="menu"
          color="cafe"
        />
        <StatCard
          title="Yakunlangan hisoblar"
          value={`${currentOrdersCount} ta`}
          subtext="Bajarilgan buyurtmalar"
          icon="check"
          color="emerald"
        />
        <StatCard
          title="O‘rtacha chek"
          value={formatUZS(currentAvgCheck)}
          subtext="Bitta buyurtmaga"
          icon="stats"
          color="orange"
        />
      </div>

      {/* Dynamic Interactive SVG Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Period Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-card border border-stone-200/80 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">
                {statPeriod === 'day' 
                  ? "Bugungi soatlik savdo dinamikasi" 
                  : statPeriod === 'week' 
                  ? "7 kunlik kunma-kun savdo dinamikasi" 
                  : "30 kunlik haftalik savdo dinamikasi"}
              </h3>
              <p className="text-xs text-stone-500">
                {statPeriod === 'day' 
                  ? "09:00 dan 23:00 gacha bo‘lgan tushumlar (so‘m)" 
                  : statPeriod === 'week' 
                  ? "Haftaning har bir kunidagi tushum va cheklar soni" 
                  : "Oxirgi 4 haftadagi umumiy tushumlar"}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto bg-amber-50 text-amber-900 border border-amber-200">
              {statPeriod === 'day' ? "Bugun" : statPeriod === 'week' ? "Oxirgi 7 kun" : "Oxirgi 30 kun"}
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-stone-200">
            {activeChartData.map((d, idx) => {
              const heightPercent = Math.max(8, Math.round((d.sales / maxChartSales) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Hover Tooltip */}
                  <div className="absolute -top-12 bg-stone-900 text-white text-[10px] font-mono py-1 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow-xl z-20">
                    <p className="font-bold">{d.label} {d.fullDate ? `(${d.fullDate})` : ''}: {formatUZS(d.sales)}</p>
                    <p className="text-amber-300">{d.orders} ta buyurtma</p>
                  </div>

                  {/* The Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[46px] rounded-t-xl transition-all duration-500 relative ${
                      statPeriod === 'day'
                        ? 'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-amber-700 group-hover:to-amber-500'
                        : statPeriod === 'week'
                        ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-700 group-hover:to-emerald-500'
                        : 'bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-indigo-700 group-hover:to-indigo-500'
                    }`}
                  >
                    {d.sales > 0 && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-stone-600 hidden sm:block">
                        {Math.round(d.sales / 1000)}k
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 mt-2">{d.label}</span>
                  {d.fullDate && <span className="text-[9px] text-stone-400 hidden sm:block">{d.fullDate}</span>}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
            <span>Tanlangan davr jami daromadi: <b className="text-stone-800 font-mono">{formatUZS(currentSales)}</b></span>
            <span>Jami hisoblar: <b className="text-stone-800">{currentOrdersCount} ta</b></span>
          </div>
        </div>

        {/* Payment Methods Breakdown for Active Period */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">To‘lov turlari ulushi</h3>
            <p className="text-xs text-stone-500 mt-1">Naqd pul va Plastik karta nisbati</p>
          </div>

          <div className="my-6 space-y-4">
            {/* Visual Dual-color Bar */}
            <div className="h-6 w-full rounded-2xl bg-stone-100 p-1 flex overflow-hidden">
              <div 
                style={{ width: `${cashPercent}%` }} 
                className="bg-emerald-500 rounded-l-xl transition-all duration-500"
                title={`Naqd pul: ${cashPercent}%`}
              ></div>
              <div 
                style={{ width: `${cardPercent}%` }} 
                className="bg-blue-600 rounded-r-xl transition-all duration-500"
                title={`Plastik karta: ${cardPercent}%`}
              ></div>
            </div>

            {/* Details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white">
                    <Icon name="cash" className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-800 text-xs">Naqd pul</h5>
                    <p className="text-[11px] text-stone-500">{cashPercent}% barcha to‘lovlardan</p>
                  </div>
                </div>
                <span className="font-mono font-extrabold text-xs text-emerald-800">
                  {formatUZS(cashSales)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <Icon name="card" className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-800 text-xs">Plastik karta</h5>
                    <p className="text-[11px] text-stone-500">{cardPercent}% barcha to‘lovlardan</p>
                  </div>
                </div>
                <span className="font-mono font-extrabold text-xs text-blue-800">
                  {formatUZS(cardSales)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center text-xs text-stone-600 font-medium">
            Jami to‘lov summasi: <b className="text-stone-900 font-mono">{formatUZS(currentSales)}</b>
          </div>
        </div>

      </div>

      {/* Top 5 Most Popular Products in Active Period */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">
              Eng ko‘p sotilgan taomlar ({statPeriod === 'day' ? "Bugun" : statPeriod === 'week' ? "1 Hafta" : "1 Oy"})
            </h3>
            <p className="text-xs text-stone-500">Mijozlar tomonidan eng ko‘p buyurtma qilingan taom va ichimliklar reytingi</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Top 5
          </span>
        </div>

        <div className="space-y-4">
          {popularProducts.map((prod, idx) => {
            const barWidth = Math.round((prod.quantity / maxPopularQty) * 100);

            return (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl hover:bg-stone-50 transition border border-stone-100">
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="w-8 h-8 rounded-xl bg-cafe-800 text-amber-300 font-extrabold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-stone-900 text-sm">{prod.name}</h5>
                    <span className="text-xs text-stone-400 font-medium">{prod.quantity} ta sotilgan</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex-1 max-w-md mx-2">
                  <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-extrabold text-sm text-stone-900">
                    {formatUZS(prod.revenue)}
                  </span>
                  <span className="text-[10px] text-stone-400 block">Jami tushum</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

// 6. SETTINGS VIEW
const SettingsView = ({
  settings,
  onUpdateSettings,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetAllData,
  onClearHistory
}) => {
  const [activeTab, setActiveTab] = React.useState('menu'); // 'menu' | 'cafe' | 'data'

  // Form state for adding/editing product
  const [productModal, setProductModal] = React.useState({ isOpen: false, isNew: true, product: null });
  const [formData, setFormData] = React.useState({ name: '', price: 20000, category: 'food', icon: 'hotdog', description: '' });

  // Cafe info form
  const [cafeForm, setCafeForm] = React.useState({ ...settings });

  const handleOpenNew = () => {
    setFormData({ name: '', price: 20000, category: 'food', icon: 'hotdog', description: '' });
    setProductModal({ isOpen: true, isNew: true, product: null });
  };

  const handleOpenEdit = (product) => {
    setFormData({ ...product });
    setProductModal({ isOpen: true, isNew: false, product });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0) return;

    if (productModal.isNew) {
      onAddProduct({
        ...formData,
        id: 'p_' + Date.now(),
        inStock: true
      });
    } else {
      onUpdateProduct({
        ...productModal.product,
        ...formData
      });
    }
    setProductModal({ isOpen: false, isNew: true, product: null });
  };

  const handleSaveCafe = (e) => {
    e.preventDefault();
    onUpdateSettings(cafeForm);
  };

  const iconOptions = [
    'hotdog', 'hamburger', 'cheeseburger', 'lavash', 'fries', 'pizza',
    'fanta', 'cola', 'water', 'juice', 'tea', 'coffee', 'cake'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900">Tizim sozlamalari</h2>
          <p className="text-xs text-stone-500 mt-1">Menyu tahrirlash, yangi mahsulot qo‘shish, narxlarni o‘zgartirish va ma’lumotlar</p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'menu' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Menyuni boshqarish
          </button>
          <button
            onClick={() => setActiveTab('cafe')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'cafe' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Kafe ma’lumotlari
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'data' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Ma’lumotlar bazasi
          </button>
        </div>
      </div>

      {/* 1. MENU MANAGEMENT TAB */}
      {activeTab === 'menu' && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">Mahsulotlar ro‘yxati</h3>
              <p className="text-xs text-stone-500">Narxlarni o‘zgartirish, mahsulot o‘chirish yoki yangi taom qo‘shish</p>
            </div>
            <button
              onClick={handleOpenNew}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-cafe-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span>Yangi mahsulot qo‘shish</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Rasm</th>
                  <th className="py-3 px-3">Nomi</th>
                  <th className="py-3 px-3">Kategoriya</th>
                  <th className="py-3 px-3 font-mono">Narxi</th>
                  <th className="py-3 px-3">Holati</th>
                  <th className="py-3 px-3 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center border border-stone-200/70">
                        <FoodIcon name={product.icon} className="w-8 h-8" />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-extrabold text-stone-900 text-sm">{product.name}</div>
                      <div className="text-[11px] text-stone-400">{product.description}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="capitalize px-2.5 py-1 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700">
                        {product.category === 'food' ? 'Taom' : product.category === 'drinks' ? 'Ichimlik' : 'Desert'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-sm text-stone-900">
                      {formatUZS(product.price)}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => onUpdateProduct({ ...product, inStock: !product.inStock })}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          product.inStock !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {product.inStock !== false ? 'Mavjud' : 'Mavjud emas'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
                          title="Tahrirlash"
                        >
                          <Icon name="edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                          title="O‘chirish"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. CAFE PROFILE SETTINGS TAB */}
      {activeTab === 'cafe' && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80 max-w-2xl">
          <h3 className="text-lg font-extrabold text-stone-900 mb-1">Kafe rekvizitlari va chek sozlamalari</h3>
          <p className="text-xs text-stone-500 mb-6">Ushbu ma’lumotlar chop etiladigan kassa cheklarida aks etadi</p>

          <form onSubmit={handleSaveCafe} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Kafe nomi:</label>
              <input
                type="text"
                value={cafeForm.cafeName}
                onChange={(e) => setCafeForm({ ...cafeForm, cafeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Shior / Ta’rif:</label>
              <input
                type="text"
                value={cafeForm.cafeTagline}
                onChange={(e) => setCafeForm({ ...cafeForm, cafeTagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Telefon raqami:</label>
                <input
                  type="text"
                  value={cafeForm.phone}
                  onChange={(e) => setCafeForm({ ...cafeForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Xizmat haqi (%):</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={cafeForm.serviceFeePercent}
                  onChange={(e) => setCafeForm({ ...cafeForm, serviceFeePercent: Number(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Manzil:</label>
              <input
                type="text"
                value={cafeForm.address}
                onChange={(e) => setCafeForm({ ...cafeForm, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Chekdagi minnatdorchilik xabari:</label>
              <textarea
                rows="2"
                value={cafeForm.receiptNote}
                onChange={(e) => setCafeForm({ ...cafeForm, receiptNote: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-2xl bg-cafe-800 hover:bg-cafe-900 text-amber-300 font-extrabold text-sm shadow-md transition"
            >
              Sozlamalarni saqlash
            </button>
          </form>
        </div>
      )}

      {/* 3. DATA & SYSTEM MANAGEMENT TAB */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80 max-w-2xl space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">Ma’lumotlar bazasi va xotira boshqaruvi</h3>
            <p className="text-xs text-stone-500 mt-1">Browser localStorage orqali barcha buyurtmalar saqlanadi</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-sm text-amber-950">Namuna ma’lumotlarni qayta tiklash</h5>
                <p className="text-xs text-amber-800 mt-0.5">Barcha 10 ta stol va menyuni dastlabki holatga qaytarish</p>
              </div>
              <button
                onClick={onResetAllData}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition"
              >
                Tiklash
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-sm text-red-950">Buyurtmalar tarixini tozalash</h5>
                <p className="text-xs text-red-700 mt-0.5">Barcha yakunlangan cheklar arxivini tozalaydi</p>
              </div>
              <button
                onClick={onClearHistory}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition"
              >
                Tozalash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {productModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-modal border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-lg font-extrabold text-stone-900">
                {productModal.isNew ? "Yangi mahsulot qo‘shish" : "Mahsulotni tahrirlash"}
              </h3>
              <button onClick={() => setProductModal({ isOpen: false, isNew: true, product: null })} className="p-1.5 text-stone-400 hover:text-stone-700">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 my-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Mahsulot nomi:</label>
                <input
                  type="text"
                  placeholder="Masalan: Double Cheeseburger"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Narxi (so‘m):</label>
                  <input
                    type="number"
                    step="1000"
                    min="1000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Kategoriya:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold outline-none"
                  >
                    <option value="food">Taom</option>
                    <option value="drinks">Ichimlik</option>
                    <option value="coffee">Qahva & Shirinlik</option>
                  </select>
                </div>
              </div>

              {/* Icon selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Ikonka tanlang:</label>
                <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-2 bg-stone-50 rounded-xl border border-stone-200">
                  {iconOptions.map(iconKey => (
                    <button
                      key={iconKey}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: iconKey })}
                      className={`p-2 rounded-xl border flex items-center justify-center transition ${
                        formData.icon === iconKey ? 'border-amber-500 bg-amber-100 ring-2 ring-amber-500/20' : 'border-stone-200 bg-white hover:bg-stone-100'
                      }`}
                    >
                      <FoodIcon name={iconKey} className="w-8 h-8" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Qisqacha ta’rif:</label>
                <input
                  type="text"
                  placeholder="Ingredientlar va xususiyati"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProductModal({ isOpen: false, isNew: true, product: null })}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-700 text-xs hover:bg-stone-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

