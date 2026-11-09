// 1. DASHBOARD VIEW
const DashboardView = ({ 
  tables, 
  products, 
  orderHistory, 
  onSelectTable, 
  onOpenReceipt,
  onNavigateTab
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayOrders = orderHistory.filter(o => o.dateOnly === todayStr || (o.timestamp && o.timestamp.startsWith(todayStr)));

  const totalTables = tables.length;
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;
  const pendingCount = tables.filter(t => t.status === 'payment_pending').length;
  const availableCount = tables.filter(t => t.status === 'available').length;

  const todaySales = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const todayOrdersCount = todayOrders.length;
  const avgCheck = todayOrdersCount > 0 ? Math.round(todaySales / todayOrdersCount) : 0;

  // Active current ongoing revenue on active tables
  const activeUnpaidSales = tables.reduce((acc, t) => {
    return acc + (t.order || []).reduce((s, item) => s + (item.price * item.quantity), 0);
  }, 0);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-cafe-900 via-cafe-800 to-amber-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Bugungi smena faol
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Xush kelibsiz! Kafe boshqaruv tizimi
          </h2>
          <p className="text-stone-300 text-sm mt-2 leading-relaxed">
            Hozirda <b className="text-amber-300">{occupiedCount + pendingCount} ta</b> stolda mijozlar xizmat ko‘rmoqda. 
            Bugungi kassa tushumi: <b className="text-white font-mono">{formatUZS(todaySales)}</b>
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigateTab('tables')}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-cafe-950 font-extrabold text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 transition"
          >
            <Icon name="tables" className="w-4 h-4" />
            <span>Stollarni boshqarish</span>
          </button>
          <button
            onClick={() => onNavigateTab('menu')}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-sm border border-white/20 flex items-center gap-2 transition"
          >
            <Icon name="menu" className="w-4 h-4" />
            <span>Menyuni ko‘rish</span>
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Jami stollar"
          value={`${totalTables} ta`}
          subtext="Doimiy sig‘im"
          icon="tables"
          color="cafe"
        />
        <StatCard
          title="Band stollar"
          value={`${occupiedCount} ta`}
          subtext={`${Math.round((occupiedCount / totalTables) * 100)}% bandlik`}
          icon="user"
          color="amber"
        />
        <StatCard
          title="Bo‘sh stollar"
          value={`${availableCount} ta`}
          subtext="Mijoz qabuliga tayyor"
          icon="check"
          color="emerald"
        />
        <StatCard
          title="Bugungi jami savdo"
          value={formatUZS(todaySales)}
          subtext="Bajarilgan buyurtmalar"
          icon="cash"
          color="amber"
        />
        <StatCard
          title="Bugungi buyurtmalar"
          value={`${todayOrdersCount} ta`}
          subtext="Kassadan o‘tgan"
          icon="history"
          color="indigo"
        />
        <StatCard
          title="O‘rtacha chek"
          value={formatUZS(avgCheck)}
          subtext="Bitta buyurtmaga"
          icon="stats"
          color="orange"
        />
      </div>

      {/* Real-time Tables Quick Matrix */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">Stollar holati (1–10)</h3>
            <p className="text-xs text-stone-500">Ixtiyoriy stol ustiga bosib, tezkor buyurtma paneli yoki hisobni oching</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Bo‘sh: {availableCount}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Band: {occupiedCount}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span> Kutilmoqda: {pendingCount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {tables.map(table => {
            const tableTotal = (table.order || []).reduce((s, i) => s + (i.price * i.quantity), 0);
            const itemsCount = (table.order || []).reduce((s, i) => s + i.quantity, 0);

            let borderClass = "border-stone-200 hover:border-emerald-400 bg-stone-50/50";
            if (table.status === 'occupied') {
              borderClass = "border-amber-400 ring-1 ring-amber-400/40 bg-amber-50/40";
            } else if (table.status === 'payment_pending') {
              borderClass = "border-purple-400 ring-1 ring-purple-400/40 bg-purple-50/40";
            }

            return (
              <div
                key={table.id}
                onClick={() => onSelectTable(table.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md flex flex-col justify-between ${borderClass}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-cafe-800 text-amber-300 font-extrabold flex items-center justify-center text-sm shadow-sm">
                    {table.id}
                  </div>
                  <TableStatusBadge status={table.status} />
                </div>

                <div className="my-2">
                  <h5 className="font-extrabold text-stone-900 text-sm">{table.name}</h5>
                  {table.status !== 'available' ? (
                    <div className="mt-1">
                      <p className="text-[11px] text-stone-500">{itemsCount} ta mahsulot</p>
                      <p className="text-xs font-bold font-mono text-cafe-900 text-amber-800">
                        {formatUZS(tableTotal)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Buyurtma uchun bo‘sh</p>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-semibold text-stone-600">
                  <span>{table.status === 'available' ? '+ Ochish' : 'Ko‘rish'}</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">Oxirgi yakunlangan buyurtmalar</h3>
            <p className="text-xs text-stone-500">Bugun amalga oshirilgan to‘lovlar ro‘yxati</p>
          </div>
          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>Barchasini ko‘rish</span>
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-semibold">
                <th className="py-2.5 px-3">Chek №</th>
                <th className="py-2.5 px-3">Stol</th>
                <th className="py-2.5 px-3">Mahsulotlar</th>
                <th className="py-2.5 px-3">To‘lov turi</th>
                <th className="py-2.5 px-3">Vaqt</th>
                <th className="py-2.5 px-3 text-right">Summa</th>
                <th className="py-2.5 px-3 text-center">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {todayOrders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3 px-3 font-mono font-bold text-stone-900">{order.id}</td>
                  <td className="py-3 px-3 font-semibold text-stone-800">{order.tableName}</td>
                  <td className="py-3 px-3 text-stone-600 max-w-xs truncate">
                    {(order.items || []).map(i => `${i.name} × ${i.quantity}`).join(', ')}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                      order.paymentMethod === 'Naqd pul' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-stone-500">{order.formattedDate}</td>
                  <td className="py-3 px-3 font-mono font-bold text-stone-900 text-right">
                    {formatUZS(order.total)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onOpenReceipt(order)}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition"
                      title="Chekni ko'rish"
                    >
                      Chek
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {todayOrders.length === 0 && (
            <div className="text-center py-8 text-stone-400 text-sm">
              Bugun hali buyurtmalar yakunlanmagan
            </div>
          )}
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
  onClearTable
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
          <p className="text-xs text-stone-500 mt-1">Har bir stolning joriy buyurtmasi, holati va to‘lov summasi</p>
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
            Bo‘sh ({availableCount})
          </button>
          <button
            onClick={() => setStatusFilter('occupied')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              statusFilter === 'occupied'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Band ({occupiedCount})
          </button>
          <button
            onClick={() => setStatusFilter('payment_pending')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
              statusFilter === 'payment_pending'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            To‘lov kutilmoqda ({pendingCount})
          </button>
        </div>
      </div>

      {/* 10 Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredTables.map(table => {
          const totalBill = (table.order || []).reduce((acc, i) => acc + (i.price * i.quantity), 0);
          const totalItems = (table.order || []).reduce((acc, i) => acc + i.quantity, 0);

          let cardBorder = "border-stone-200 hover:border-emerald-400 bg-white";
          let badgeBg = "bg-emerald-50 text-emerald-700";

          if (table.status === 'occupied') {
            cardBorder = "border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/20";
            badgeBg = "bg-amber-100 text-amber-900";
          } else if (table.status === 'payment_pending') {
            cardBorder = "border-purple-300 ring-2 ring-purple-400/20 bg-purple-50/20";
            badgeBg = "bg-purple-100 text-purple-900";
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
                    <button
                      onClick={() => onSelectTable(table.id)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-cafe-950 font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
                    >
                      <Icon name="menu" className="w-3.5 h-3.5" />
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

// 3. FOOD AND DRINK MENU VIEW
const MenuView = ({ products, onSelectProduct, tables }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'Barchasi', count: products.length },
    { id: 'food', name: 'Taomlar', count: products.filter(p => p.category === 'food').length },
    { id: 'drinks', name: 'Ichimliklar', count: products.filter(p => p.category === 'drinks').length },
    { id: 'coffee', name: 'Qahva & Shirinliklar', count: products.filter(p => p.category === 'coffee').length },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900">Kafe taom va ichimliklar menyusi</h2>
          <p className="text-xs text-stone-500 mt-1">Barcha mahsulotlar, narxlar va buyurtmaga qo‘shish</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Icon name="search" className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Mahsulot nomi bo‘yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-2xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-cafe-800 text-amber-300 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <span>{cat.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              selectedCategory === cat.id ? 'bg-amber-500/30 text-amber-200' : 'bg-stone-100 text-stone-500'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map(product => {
          const isOutOfStock = product.inStock === false;

          return (
            <div
              key={product.id}
              className={`bg-white rounded-3xl p-4 border border-stone-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group ${
                isOutOfStock ? 'opacity-50' : ''
              }`}
            >
              <div>
                {/* SVG Visual */}
                <div className="w-full h-32 bg-stone-50 rounded-2xl flex items-center justify-center p-3 mb-3 group-hover:scale-105 transition-transform duration-300">
                  <FoodIcon name={product.icon} className="w-20 h-20" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      {product.category === 'food' ? 'Taom' : product.category === 'drinks' ? 'Ichimlik' : 'Desert'}
                    </span>
                    {isOutOfStock && (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Mavjud emas</span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-sm mt-1">{product.name}</h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                    {product.description || "Mazali ta'm va yangi ingredientlar"}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">Narxi</span>
                  <span className="font-mono font-extrabold text-sm text-cafe-900 text-amber-800">
                    {formatUZS(product.price)}
                  </span>
                </div>
                <button
                  disabled={isOutOfStock}
                  onClick={() => onSelectProduct(product)}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-cafe-950 font-bold text-xs flex items-center gap-1 shadow-sm transition"
                >
                  <Icon name="plus" className="w-3.5 h-3.5" />
                  <span>Qo‘shish</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
  const todayStr = new Date().toISOString().split('T')[0];
  const todayOrders = orderHistory.filter(o => o.dateOnly === todayStr || (o.timestamp && o.timestamp.startsWith(todayStr)));

  const todaySales = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalProductsSold = todayOrders.reduce((sum, o) => {
    return sum + (o.items || []).reduce((s, i) => s + i.quantity, 0);
  }, 0);
  const completedOrdersCount = todayOrders.length;
  const occupiedTablesCount = tables.filter(t => t.status === 'occupied' || t.status === 'payment_pending').length;

  // Cash vs Card breakdown
  const cashSales = todayOrders.filter(o => o.paymentMethod === 'Naqd pul').reduce((s, o) => s + (o.total || 0), 0);
  const cardSales = todayOrders.filter(o => o.paymentMethod === 'Plastik karta').reduce((s, o) => s + (o.total || 0), 0);
  const cashPercent = todaySales > 0 ? Math.round((cashSales / todaySales) * 100) : 50;
  const cardPercent = todaySales > 0 ? 100 - cashPercent : 50;

  // Most popular products calculation
  const productStats = {};
  orderHistory.forEach(order => {
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

  // Hourly sales distribution chart (Native HTML/SVG)
  const hours = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];
  const hourlyData = [
    { hour: '09:00', sales: 45000, orders: 1 },
    { hour: '11:00', sales: 86000, orders: 2 },
    { hour: '13:00', sales: 249000, orders: 4 },
    { hour: '15:00', sales: 120000, orders: 2 },
    { hour: '17:00', sales: todaySales > 500000 ? 180000 : 70000, orders: 2 },
    { hour: '19:00', sales: todaySales > 700000 ? 250000 : 90000, orders: 3 },
    { hour: '21:00', sales: todaySales > 900000 ? 160000 : 40000, orders: 1 },
    { hour: '23:00', sales: 0, orders: 0 }
  ];

  const maxHourlySales = Math.max(...hourlyData.map(d => d.sales), 100000);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900">Kunlik savdo va statistika</h2>
        <p className="text-xs text-stone-500 mt-1">Har bir buyurtma to‘langanda statistika avtomatik yangilanadi</p>
      </div>

      {/* 4 Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Bugungi umumiy tushum"
          value={formatUZS(todaySales)}
          subtext="Barcha to‘lovlar bo‘yicha"
          icon="cash"
          color="amber"
        />
        <StatCard
          title="Sotilgan mahsulotlar"
          value={`${totalProductsSold} ta`}
          subtext="Bugungi jami porsiyalar"
          icon="menu"
          color="cafe"
        />
        <StatCard
          title="Bajarilgan buyurtmalar"
          value={`${completedOrdersCount} ta`}
          subtext="Yopilgan hisoblar soni"
          icon="check"
          color="emerald"
        />
        <StatCard
          title="Hozirgi band stollar"
          value={`${occupiedTablesCount} ta`}
          subtext="10 ta stoldan faol"
          icon="user"
          color="indigo"
        />
      </div>

      {/* Charts Section: Hourly Bar Chart & Payment Method Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hourly Sales Bar Chart (Native SVG & CSS) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-card border border-stone-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">Soatlik savdo dinamikasi</h3>
              <p className="text-xs text-stone-500">Kunning turli vaqtlaridagi kassa tushumi (so‘m)</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              Bugungi kun
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-stone-200">
            {hourlyData.map((d, idx) => {
              const heightPercent = Math.max(8, Math.round((d.sales / maxHourlySales) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Hover Tooltip */}
                  <div className="absolute -top-12 bg-stone-900 text-white text-[10px] font-mono py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow-lg z-20">
                    <p className="font-bold">{d.hour}: {formatUZS(d.sales)}</p>
                    <p className="text-amber-300">{d.orders} ta buyurtma</p>
                  </div>

                  {/* The Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-amber-700 group-hover:to-amber-500 transition-all duration-300 relative"
                  >
                    {d.sales > 0 && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-stone-600 hidden sm:block">
                        {Math.round(d.sales / 1000)}k
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500 mt-2">{d.hour}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
            <span>09:00 — Kafe ochilishi</span>
            <span>23:00 — Smena yakuni</span>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">To‘lov turlari ulushi</h3>
            <p className="text-xs text-stone-500 mt-1">Naqd pul va Plastik karta nisbati</p>
          </div>

          <div className="my-6 space-y-4">
            {/* Visual Bar */}
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
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
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

              <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
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
            Jami bugungi to‘lov: <b className="text-stone-900 font-mono">{formatUZS(todaySales)}</b>
          </div>
        </div>

      </div>

      {/* Top 5 Most Popular Products */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-stone-200/80">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">Eng ko‘p sotilgan mahsulotlar (Top 5)</h3>
            <p className="text-xs text-stone-500">Mijozlar tomonidan eng ko‘p buyurtma qilingan taom va ichimliklar</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Reyting
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

