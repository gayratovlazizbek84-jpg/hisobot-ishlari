// POS Order Drawer / Full Order Workspace
const POSDrawer = ({ 
  isOpen, 
  table, 
  products, 
  onClose, 
  onAddItem, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToPayment, 
  onChangeStatus, 
  onClearTable, 
  onTransferTable,
  tablesList,
  serviceFeePercent = 0
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [transferTargetId, setTransferTargetId] = React.useState('');
  const [isTransferring, setIsTransferring] = React.useState(false);

  if (!isOpen || !table) return null;

  // Filter products by category and search
  const filteredProducts = products.filter(product => {
    const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate order totals
  const subtotal = (table.order || []).reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const serviceAmount = Math.round(subtotal * (serviceFeePercent / 100));
  const grandTotal = subtotal + serviceAmount;

  // Available destination tables for transfer
  const availableTables = (tablesList || []).filter(t => t.id !== table.id && t.status === 'available');

  const categories = [
    { id: 'all', name: 'Barchasi', icon: 'menu' },
    { id: 'food', name: 'Taomlar', icon: 'coffee-cup' },
    { id: 'drinks', name: 'Ichimliklar', icon: 'coffee-cup' },
    { id: 'coffee', name: 'Qahva & Shirinlik', icon: 'coffee-cup' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl w-full max-w-6xl h-[92vh] max-h-[850px] shadow-2xl border border-stone-200/80 flex flex-col overflow-hidden">
        
        {/* Drawer Header */}
        <div className="bg-white px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cafe-800 text-amber-400 flex items-center justify-center font-bold text-lg shadow-md">
              {table.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-stone-900">{table.name} — Buyurtma paneli</h2>
                <TableStatusBadge status={table.status} />
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Ofitsiant: <span className="font-semibold text-stone-700">{table.waiter || "Alisher"}</span>
                {table.openedAt && <span className="ml-2">| Ochilgan: <b className="text-stone-700">{table.openedAt}</b></span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Quick Changer */}
            <select
              value={table.status}
              onChange={(e) => onChangeStatus(table.id, e.target.value)}
              className="bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 outline-none cursor-pointer transition"
            >
              <option value="available">Holat: Bo‘sh</option>
              <option value="occupied">Holat: Band</option>
              <option value="payment_pending">Holat: To‘lov kutilmoqda</option>
            </select>

            {/* Transfer table toggle */}
            {table.order && table.order.length > 0 && (
              <button
                onClick={() => setIsTransferring(!isTransferring)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                  isTransferring ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
                title="Stolni ko'chirish"
              >
                <Icon name="move" className="w-4 h-4" />
                <span className="hidden sm:inline">Ko‘chirish</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              title="Yopish"
            >
              <Icon name="close" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Optional Transfer Bar */}
        {isTransferring && (
          <div className="bg-amber-50 px-6 py-3 border-b border-amber-200 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-amber-900">
              <Icon name="move" className="w-5 h-5 text-amber-700" />
              <span className="font-semibold">Ushbu stol buyurtmasini boshqa bo‘sh stolga ko‘chirish:</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={transferTargetId}
                onChange={(e) => setTransferTargetId(e.target.value)}
                className="bg-white border border-amber-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800 outline-none"
              >
                <option value="">Bo‘sh stolni tanlang...</option>
                {availableTables.map(t => (
                  <option key={t.id} value={t.id}>{t.name} (Bo‘sh)</option>
                ))}
              </select>
              <button
                disabled={!transferTargetId}
                onClick={() => {
                  if (transferTargetId) {
                    onTransferTable(table.id, parseInt(transferTargetId));
                    setIsTransferring(false);
                    setTransferTargetId('');
                  }
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition"
              >
                Ko‘chirishni tasdiqlash
              </button>
            </div>
          </div>
        )}

        {/* Drawer Body (Split Screen) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* LEFT: Product Catalog & Quick Add */}
          <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-stone-200 bg-[#FAF7F2] p-4 md:p-6 overflow-hidden">
            {/* Search & Category Pills */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Icon name="search" className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Taom yoki ichimlik qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <Icon name="close" className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-cafe-800 text-amber-300 shadow-md'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-3">
                {filteredProducts.map(product => {
                  const inCartItem = (table.order || []).find(i => i.id === product.id);
                  const isOutOfStock = product.inStock === false;

                  return (
                    <div
                      key={product.id}
                      onClick={() => !isOutOfStock && onAddItem(table.id, product)}
                      className={`relative bg-white rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between select-none ${
                        isOutOfStock
                          ? 'opacity-50 cursor-not-allowed border-stone-200 bg-stone-50'
                          : inCartItem
                          ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md cursor-pointer hover:shadow-lg'
                          : 'border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md cursor-pointer group'
                      }`}
                    >
                      {/* Quantity in cart badge */}
                      {inCartItem && (
                        <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[11px] shadow-sm animate-scale-up">
                          {inCartItem.quantity}x
                        </div>
                      )}

                      <div>
                        {/* Food Image */}
                        <div className="w-full h-24 rounded-xl bg-[#FAF8F5] mb-2 flex items-center justify-center p-1 overflow-hidden group-hover:scale-105 transition duration-300">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain drop-shadow-xs"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full items-center justify-center ${product.image ? 'hidden' : 'flex'}`}>
                            <FoodIcon name={product.icon} className="w-12 h-12" />
                          </div>
                        </div>

                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-amber-100/70 text-amber-800">
                          {product.badge || (product.category === 'drinks' ? 'ICHIMLIK' : 'TAOM')}
                        </span>
                        <h4 className="font-extrabold text-stone-900 text-xs mt-1 line-clamp-1">{product.name}</h4>
                        <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">{product.description}</p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
                        <span className="font-black text-xs text-stone-900 font-mono">
                          {formatUZS(product.price)}
                        </span>
                        <button
                          disabled={isOutOfStock}
                          className="px-2 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-[10px] flex items-center gap-1 transition shadow-xs"
                        >
                          <Icon name="cart" className="w-3 h-3" />
                          <span>Qo‘shish</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 text-stone-400">
                  <Icon name="search" className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p className="font-medium text-sm">Bunday mahsulot topilmadi</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Current Active Order Ticket */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-white flex flex-col h-full border-t md:border-t-0 shadow-lg">
            
            {/* Ticket Header */}
            <div className="p-4 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">Joriy buyurtma</h3>
                <p className="text-xs text-stone-500">
                  Jami pozitsiyalar: <b className="text-stone-800">{(table.order || []).reduce((a, b) => a + b.quantity, 0)} ta</b>
                </p>
              </div>

              {table.order && table.order.length > 0 && (
                <button
                  onClick={() => onClearTable(table.id)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition flex items-center gap-1"
                  title="Buyurtmani tozalash"
                >
                  <Icon name="trash" className="w-3.5 h-3.5" />
                  <span>Tozalash</span>
                </button>
              )}
            </div>

            {/* Order Items List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
              {table.order && table.order.length > 0 ? (
                table.order.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 group">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center shrink-0 border border-stone-200/60">
                        <FoodIcon name={item.icon || 'hotdog'} className="w-8 h-8" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-stone-800 text-sm truncate">{item.name}</h5>
                        <p className="text-xs text-stone-400 font-mono">
                          {formatUZS(item.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                      <button
                        onClick={() => onUpdateQuantity(table.id, item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center shadow-xs transition"
                      >
                        <Icon name="minus" className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs font-mono text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(table.id, item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center shadow-xs transition"
                      >
                        <Icon name="plus" className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Line Total & Remove */}
                    <div className="text-right pl-2">
                      <div className="font-mono font-bold text-sm text-stone-900 whitespace-nowrap">
                        {formatUZS(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => onRemoveItem(table.id, item.id)}
                        className="text-[11px] text-stone-400 hover:text-red-600 transition"
                      >
                        O‘chirish
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                    <Icon name="menu" className="w-8 h-8 opacity-40 text-stone-600" />
                  </div>
                  <h4 className="font-bold text-stone-700 text-sm">Buyurtma hali bo‘sh</h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-[200px]">
                    Chap tomondagi menyudan taom yoki ichimlik tanlab ustiga bosing
                  </p>
                </div>
              )}
            </div>

            {/* Calculations & Checkout Bar */}
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <div className="space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-stone-500 font-medium">
                  <span>Oraliq summa:</span>
                  <span className="font-mono font-semibold text-stone-800">{formatUZS(subtotal)}</span>
                </div>
                {serviceFeePercent > 0 && (
                  <div className="flex justify-between text-stone-500 font-medium">
                    <span>Xizmat haqi ({serviceFeePercent}%):</span>
                    <span className="font-mono font-semibold text-stone-800">{formatUZS(serviceAmount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-stone-900">Jami to‘lov:</span>
                  <span className="text-xl font-extrabold text-cafe-900 font-mono text-amber-700">
                    {formatUZS(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={!table.order || table.order.length === 0}
                  onClick={() => onChangeStatus(table.id, 'payment_pending')}
                  className="py-3 px-3 rounded-2xl border border-stone-300 hover:bg-stone-200/70 text-stone-700 text-xs font-bold transition disabled:opacity-40"
                >
                  To‘lov kutilmoqda
                </button>

                <button
                  disabled={!table.order || table.order.length === 0}
                  onClick={() => onProceedToPayment(table)}
                  className="py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition disabled:opacity-40"
                >
                  <Icon name="cash" className="w-4 h-4" />
                  <span>To‘lovga o‘tish</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

