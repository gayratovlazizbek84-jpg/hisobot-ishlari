// Payment Checkout Modal
const PaymentModal = ({
  isOpen,
  table,
  settings,
  onClose,
  onConfirmPayment
}) => {
  if (!isOpen || !table) return null;

  const [paymentMethod, setPaymentMethod] = React.useState('Naqd pul'); // 'Naqd pul' or 'Plastik karta'
  const subtotal = (table.order || []).reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const serviceAmount = Math.round(subtotal * ((settings.serviceFeePercent || 0) / 100));
  const grandTotal = subtotal + serviceAmount;

  const [cashReceived, setCashReceived] = React.useState(grandTotal);

  // When grandTotal changes or modal opens, reset cashReceived
  React.useEffect(() => {
    setCashReceived(grandTotal);
  }, [grandTotal]);

  const change = Math.max(0, cashReceived - grandTotal);
  const isCashShort = paymentMethod === 'Naqd pul' && cashReceived < grandTotal;

  // Preset cash options
  const presetAmounts = [
    grandTotal,
    Math.ceil(grandTotal / 10000) * 10000,
    Math.ceil(grandTotal / 50000) * 50000,
    100000,
    200000,
    500000
  ].filter((val, idx, self) => val >= grandTotal && self.indexOf(val) === idx).slice(0, 5);

  const handlePay = () => {
    if (isCashShort) return;
    onConfirmPayment({
      table,
      paymentMethod,
      cashReceived: paymentMethod === 'Naqd pul' ? cashReceived : grandTotal,
      cashChange: paymentMethod === 'Naqd pul' ? change : 0,
      subtotal,
      serviceAmount,
      grandTotal
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-modal border border-stone-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Icon name="cash" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">To‘lovni qabul qilish</h3>
              <p className="text-xs text-stone-500">{table.name} — {table.order?.length || 0} xil mahsulot</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Bill Total Banner */}
        <div className="my-5 p-4 rounded-2xl bg-cafe-50 border border-amber-200 text-center">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Jami to‘lanishi kerak bo‘lgan summa</span>
          <div className="text-3xl font-extrabold text-cafe-900 font-mono mt-1 text-amber-700">
            {formatUZS(grandTotal)}
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-stone-600 mb-2 uppercase">To‘lov turini tanlang</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('Naqd pul')}
              className={`p-3.5 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2.5 transition ${
                paymentMethod === 'Naqd pul'
                  ? 'border-amber-600 bg-amber-50/60 text-amber-900 shadow-sm'
                  : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Icon name="cash" className="w-5 h-5" />
              <span>Naqd pul</span>
            </button>
            <button
              onClick={() => setPaymentMethod('Plastik karta')}
              className={`p-3.5 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2.5 transition ${
                paymentMethod === 'Plastik karta'
                  ? 'border-amber-600 bg-amber-50/60 text-amber-900 shadow-sm'
                  : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Icon name="card" className="w-5 h-5" />
              <span>Plastik karta</span>
            </button>
          </div>
        </div>

        {/* Cash Calculator Section (If Cash Selected) */}
        {paymentMethod === 'Naqd pul' && (
          <div className="mb-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Mijoz bergan summa (so‘m):</label>
              <input
                type="number"
                value={cashReceived}
                onChange={(e) => setCashReceived(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-lg font-mono font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-1.5">
              {presetAmounts.map((amt, i) => (
                <button
                  key={i}
                  onClick={() => setCashReceived(amt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                    cashReceived === amt ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {amt === grandTotal ? 'Aniq summa' : formatUZS(amt).replace(" so'm", '')}
                </button>
              ))}
            </div>

            {/* Change Display */}
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600">Qaytim miqdori:</span>
              {isCashShort ? (
                <span className="text-xs font-bold text-red-600 font-mono">
                  Yetarli emas (-{formatUZS(grandTotal - cashReceived)})
                </span>
              ) : (
                <span className="text-base font-extrabold text-emerald-600 font-mono">
                  {formatUZS(change)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Card info if card selected */}
        {paymentMethod === 'Plastik karta' && (
          <div className="mb-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Icon name="card" className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-stone-800">Terminal orqali to‘lov</h5>
              <p className="text-xs text-stone-500">Uzcard, Humo, Visa yoki Mastercard kartasini terminalga ulang</p>
            </div>
          </div>
        )}

        {/* Confirmation buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 text-sm transition"
          >
            Bekor qilish
          </button>
          <button
            disabled={isCashShort}
            onClick={handlePay}
            className="flex-1 py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition disabled:opacity-40"
          >
            <Icon name="check" className="w-5 h-5" />
            <span>To‘lovni tasdiqlash</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// Thermal Printable Receipt Modal
const ReceiptModal = ({ isOpen, order, settings, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-modal border border-stone-200 flex flex-col max-h-[90vh]">
        
        {/* Receipt Action Buttons (No-print) */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 no-print">
          <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
            <Icon name="printer" className="w-5 h-5 text-amber-600" />
            <span>Kassa cheki</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-cafe-800 hover:bg-cafe-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <Icon name="printer" className="w-3.5 h-3.5" />
              <span>Chop etish</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area - Thermal Paper Look */}
        <div className="flex-1 overflow-y-auto my-3 p-4 bg-stone-50/60 rounded-2xl border border-stone-200 font-mono text-xs text-stone-800" id="printable-receipt-area">
          
          {/* Cafe Header */}
          <div className="text-center pb-3 border-b border-dashed border-stone-300">
            <h2 className="text-base font-extrabold tracking-wider uppercase text-stone-900">{settings.cafeName}</h2>
            {settings.cafeTagline && <p className="text-[10px] text-stone-500">{settings.cafeTagline}</p>}
            <p className="text-[11px] text-stone-600 mt-1">{settings.address}</p>
            <p className="text-[11px] text-stone-600">Tel: {settings.phone}</p>
          </div>

          {/* Receipt Metadata */}
          <div className="py-2.5 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>Chek №:</span>
              <span className="font-bold text-stone-900">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Stol:</span>
              <span className="font-bold text-stone-900">{order.tableName}</span>
            </div>
            <div className="flex justify-between">
              <span>Sana & Vaqt:</span>
              <span>{order.formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Ofitsiant:</span>
              <span>{order.waiter || "Alisher"}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-3 border-b border-dashed border-stone-300">
            <div className="flex justify-between font-bold text-[11px] pb-1 border-b border-stone-200 mb-1.5">
              <span>Mahsulot</span>
              <span>Jami</span>
            </div>
            <div className="space-y-1.5">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-[11px]">
                  <div>
                    <div className="font-semibold text-stone-900">{item.name}</div>
                    <div className="text-[10px] text-stone-500">
                      {item.quantity} x {formatUZS(item.price)}
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 whitespace-nowrap">
                    {formatUZS(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="py-3 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
            <div className="flex justify-between text-stone-600">
              <span>Oraliq summa:</span>
              <span>{formatUZS(order.subtotal || order.total)}</span>
            </div>
            {order.serviceCharge > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Xizmat haqi:</span>
                <span>{formatUZS(order.serviceCharge)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline text-sm font-extrabold text-stone-900 pt-1.5 border-t border-stone-200">
              <span>JAMI TO‘LOV:</span>
              <span className="text-base text-amber-800">{formatUZS(order.total)}</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="py-2.5 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>To‘lov usuli:</span>
              <span className="font-bold">{order.paymentMethod}</span>
            </div>
            {order.paymentMethod === 'Naqd pul' && (
              <>
                <div className="flex justify-between text-stone-600">
                  <span>Mijoz berdi:</span>
                  <span>{formatUZS(order.cashReceived || order.total)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Qaytim:</span>
                  <span className="font-bold text-emerald-700">{formatUZS(order.cashChange || 0)}</span>
                </div>
              </>
            )}
          </div>

          {/* Barcode Visual */}
          <div className="pt-4 text-center">
            <div className="inline-block p-1 bg-white rounded border border-stone-300">
              <div className="h-8 w-44 flex items-center justify-between px-2 bg-stone-900 text-white text-[8px] font-mono tracking-widest">
                |||| | ||||| || |||| ||| |||||
              </div>
            </div>
            <p className="text-[10px] text-stone-500 mt-2 font-sans font-medium">{settings.receiptNote}</p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-2 no-print">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 font-bold text-stone-700 text-sm transition"
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
};

// Customer Bill / Pre-Check Modal: Mijoz nima yeganini hisoblash va mijozga aytish oynasi
const CustomerBillModal = ({
  isOpen,
  table,
  settings,
  onClose,
  onProceedToPayment
}) => {
  const [copied, setCopied] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  if (!isOpen || !table) return null;

  const orderItems = table.order || [];
  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const serviceAmount = Math.round(subtotal * ((settings.serviceFeePercent || 0) / 100));
  const discountAmount = Math.round(subtotal * ((table.discountPercent || 0) / 100));
  const grandTotal = Math.max(0, subtotal + serviceAmount - discountAmount);

  // Generate plain speech text in Uzbek
  const itemsSpeech = orderItems.map(i => `${i.quantity} ta ${i.name} (${formatUZS(i.price * i.quantity)})`).join(', ');
  const speechText = orderItems.length > 0 
    ? `Hurmatli mijoz! Sizning ${table.name}dagi buyurtmangiz: ${itemsSpeech}. Jami to‘lov: ${formatUZS(grandTotal)} bo‘ldi.`
    : `Hurmatli mijoz! ${table.name}da hozircha hech qanday buyurtma mavjud emas.`;

  const handleSpeak = () => {
    playSound('add');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = 'uz-UZ';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Brauzeringiz ovozli eshittirishni qo'llab-quvvatlamaydi.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(speechText);
    setCopied(true);
    playSound('click');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-modal border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 no-print">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-cafe-950 flex items-center justify-center font-extrabold text-lg shadow-md">
              {table.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-stone-900">{table.name} — Mijoz hisobi</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {orderItems.reduce((acc, i) => acc + i.quantity, 0)} ta taom
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Ofitsiant: <b className="text-stone-700">{table.waiter || "Alisher"}</b>
                {table.openedAt && <span className="ml-2">| Ochilgan vaqti: <b className="text-stone-700">{table.openedAt}</b></span>}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition"
          >
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
          
          {/* Grand Total Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-2 border-amber-300/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Mijoz to‘lashi kerak bo‘lgan summa:</span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-cafe-950 text-amber-900 mt-0.5 block">
                {formatUZS(grandTotal)}
              </span>
            </div>
            <div className="p-3 bg-amber-500 text-cafe-950 rounded-2xl shadow-sm">
              <Icon name="cash" className="w-7 h-7" />
            </div>
          </div>

          {/* List of items customer consumed */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
              Mijoz nimalar iste'mol qildi (Buyurtma tafsiloti):
            </h4>
            
            {orderItems.length > 0 ? (
              <div className="bg-stone-50 rounded-2xl border border-stone-200 divide-y divide-stone-200/60 overflow-hidden">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-3 hover:bg-white transition">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0">
                        <FoodIcon name={item.icon} className="w-8 h-8" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-extrabold text-stone-900 text-sm truncate">{item.name}</h5>
                        <p className="text-xs text-stone-500 font-mono">
                          {item.quantity} ta × {formatUZS(item.price)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right font-mono font-black text-sm text-stone-900 whitespace-nowrap">
                      {formatUZS(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-stone-400 bg-stone-50 rounded-2xl border border-stone-200">
                Ushbu stolda hozircha buyurtma yo‘q.
              </div>
            )}
          </div>

          {/* Calculations Summary */}
          {orderItems.length > 0 && (
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Oraliq summa (Taomlar narxi):</span>
                <span className="font-mono font-bold text-stone-800">{formatUZS(subtotal)}</span>
              </div>
              {serviceAmount > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Xizmat haqi ({settings.serviceFeePercent}%):</span>
                  <span className="font-mono font-bold text-stone-800">+{formatUZS(serviceAmount)}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Chegirma ({table.discountPercent}%):</span>
                  <span className="font-mono font-bold">-{formatUZS(discountAmount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm font-black text-stone-900">
                <span>JAMI TO‘LOV:</span>
                <span className="font-mono text-base text-amber-800">{formatUZS(grandTotal)}</span>
              </div>
            </div>
          )}

          {/* Verbal Script Box (Mijozga aytish uchun tayyor matn) */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase">
                <Icon name="speech" className="w-4 h-4 text-amber-700" />
                <span>Mijozga aytish uchun tayyor matn:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-[11px] font-bold text-amber-900 hover:bg-amber-100 flex items-center gap-1 transition shadow-xs"
                  title="Matnni nusxalash"
                >
                  <Icon name={copied ? 'check' : 'copy'} className="w-3.5 h-3.5 text-amber-700" />
                  <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
                </button>
                <button
                  onClick={handleSpeak}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition shadow-xs ${
                    isSpeaking 
                      ? 'bg-amber-600 text-white animate-pulse' 
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                  title="Ovoz chiqarib aytish"
                >
                  <Icon name="volume" className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Gapirilmoqda...' : 'Ovozli aytish'}</span>
                </button>
              </div>
            </div>
            
            <p className="text-xs font-medium text-amber-950 bg-white/80 p-3 rounded-xl border border-amber-200/60 leading-relaxed italic">
              "{speechText}"
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center gap-2.5 no-print">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 px-3 rounded-2xl border border-stone-300 hover:bg-stone-100 font-bold text-stone-700 text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Icon name="printer" className="w-4 h-4" />
            <span>Pre-chek chiqarish</span>
          </button>
          <button
            disabled={orderItems.length === 0}
            onClick={() => {
              onClose();
              onProceedToPayment(table);
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-extrabold text-xs shadow-lg shadow-amber-600/25 flex items-center justify-center gap-1.5 transition"
          >
            <Icon name="cash" className="w-4 h-4" />
            <span>To‘lovni qabul qilish</span>
          </button>
        </div>

      </div>
    </div>
  );
};

