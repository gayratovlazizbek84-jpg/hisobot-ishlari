# RAYHON CAFE — ZAMONAVIY KAFE BOSHQARUV TIZIMI (POS)

Ushbu loyiha zamonaviy, qulay va professional Kafe Boshqaruv Tizimi (Cafe Management System / Point of Sale) bo‘lib, to‘liq va faqatgina **HTML, React JS va Tailwind CSS** texnologiyalari yordamida yaratilgan. Hech qanday tashqi og‘ir freymvorklar, ortiqcha kutubxonalar yoki tashqi ma’lumotlar bazasi talab etilmaydi.

Barcha ma’lumotlar brauzerning `localStorage` xotirasida avtomatik va ishonchli saqlanadi.

---

## 🚀 ISHGA TUSHIRISH (2 ta oson usul)

### 1-usul: To‘g‘ridan-to‘g‘ri brauzerda ochish (Hech narsa o‘rnatish shart emas!)
* Papkadagi `index.html` faylini sichqoncha bilan ikki marta bosing yoki ixtiyoriy zamonaviy brauzerga (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari) sudrab tashlang.
* Tizim zudlik bilan to‘liq quvvatda ishga tushadi!

### 2-usul: Mahalliy server orqali ishga tushirish (Terminal orqali)
```bash
npm start
# yoki
node serve.js
```
So‘ngra brauzeringizda oching:
👉 **`http://localhost:3000`**

---

## 🌟 ASOSIY IMKONIYATLAR VA BO‘LIMLAR

### 1. Dizayn va Foydalanuvchi Interfeysi (UI/UX)
* **Kofe uslubidagi issiq ranglar palitrasi**: Chuqur espresso (`#26180E`), issiq karamel/amber (`#D97706`), qaymoqrang (`#FAF7F2`) va oq ranglar uyg‘unligi.
* **To‘liq O‘zbek tilidagi interfeys**: Barcha tugmalar, holatlar, cheklar va hisobotlar milliy tilda yozilgan.
* **Sezgir va moslashuvchan dizayn (Responsive)**: Kompyuter (Desktop), planshet (Tablet) va smartfonlarda qulay ishlaydi.
* **Web Audio API ovoz effektlari**: Mahsulot qo‘shish, o‘chirish va to‘lov qabul qilinganda yoqimli kassa jarangdor ovozlari (tashqi mp3 fayllarsiz 100% ishonchli).
* **Vektorli taom illyustratsiyalari (SVG)**: Barcha taom va ichimliklar uchun yuqori sifatli inline SVG grafikalar (offline holatda ham chiroyli ko‘rinadi).

### 2. Bosh sahifa (Dashboard)
* **6 ta asosiy ko‘rsatkich kartasi**:
  1. *Jami stollar* — 10 ta.
  2. *Band stollar* — real vaqtda faol mijozlar soni.
  3. *Bo‘sh stollar* — yangi mijoz qabul qilishga tayyor stollar.
  4. *Bugungi jami savdo* — yakunlangan barcha to‘lovlar summasi.
  5. *Bugungi buyurtmalar* — kassadan o‘tgan cheklar soni.
  6. *O‘rtacha chek* — har bir buyurtmaga to‘g‘ri kelgan o‘rtacha tushum.
* **10 ta stolning tezkor matritsasi**: Har bir stolning holati va buyurtma summasini bir qarashda ko‘rish hamda 1 ta bosish orqali buyurtma panelini ochish.
* **Oxirgi yakunlangan buyurtmalar jadvali** va tezkor chek chiqarish.

### 3. Stollar Boshqaruvi (10 ta Stol)
* Aniq 10 ta mustaqil stol (Stol 1 dan Stol 10 gacha).
* Stol holatlari:
  - 🟢 **Bo‘sh (Available)** — yashil indikator, buyurtma ochish tugmasi.
  - 🟠 **Band (Occupied)** — to‘q sariq indikator, joriy buyurtma pozitsiyalari va jonli hisob summasi.
  - 🟣 **To‘lov kutilmoqda (Payment pending)** — binafsha indikator, mijoz hisob so‘ragan holat.
* Stolga birinchi taom qo‘shilishi bilan stol holati avtomatik ravishda **"Band"**ga aylanadi.
* **Stolni ko‘chirish (Transfer)**: Bir stoldagi buyurtmani boshqa bo‘sh stolga bexato ko‘chirish imkoniyati.
* **Stolni tozalash**: Buyurtmani tasdiqlash oynasi orqali bekor qilish va stolni bo‘shatish.

### 4. Taom va Ichimliklar Menyusi (Menyu)
* Kategoriyalar:
  - *Barchasi*
  - *Taomlar (Food)*
  - *Ichimliklar (Drinks)*
  - *Qahva va Shirinliklar (Coffee & Desserts)*
* Dastlabki namunaviy mahsulotlar:
  - **Hot Dog** — 18 000 so‘m
  - **Hamburger** — 25 000 so‘m
  - **Cheeseburger** — 30 000 so‘m
  - **Lavash** — 28 000 so‘m
  - **French Fries (Fri)** — 15 000 so‘m
  - **Pizza** — 55 000 so‘m
  - **Fanta 0.5L** — 8 000 so‘m
  - **Fanta 2L** — 20 000 so‘m
  - **Coca-Cola 1L** — 12 000 so‘m
  - **Suv (0.5L)** — 5 000 so‘m
  - **Sharbat (Sok)** — 12 000 so‘m
  - **Limonli ko‘k choy** — 7 000 so‘m
  - **Kofe Americano** — 14 000 so‘m
  - **Kapuchino** — 18 000 so‘m
  - **Chizkeyk** — 24 000 so‘m
* Tezkor qidiruv va savatga qo‘shish indikatorlari.

### 5. Buyurtmalar Boshqaruvi (POS Paneli)
* Aniq talab qilingan stol namunasi:
  **Stol 5:**
  - 2 × Hot Dog = 36 000 so‘m
  - 1 × Hamburger = 25 000 so‘m
  - 1 × Fanta 2L = 20 000 so‘m
  - **JAMI: 81 000 so‘m**
* Mahsulot sonini oshirish `[+]` va kamaytirish `[-]`.
* Pozitsiyani o‘chirish.
* Narxlarni real vaqt rejimida avtomatik va aniq hisoblab borish.

### 6. To‘lov Tizimi (Kassa & Chek)
* To‘lov usullari:
  - 💵 **Naqd pul (Cash)** — tezkor summa tugmalari (`Aniq summa`, `50 000`, `100 000`, `200 000`, `500 000`), kiritilgan pul va **Qaytim (Change)** miqdorini avtomatik hisoblash.
  - 💳 **Plastik karta (Card)** — terminal orqali to‘lov.
* To‘lov tasdiqlanganda:
  - Stol avtomatik tozalanadi va **"Bo‘sh"** holatga qaytadi.
  - Buyurtma arxivga (Tarix) vaqt, sana, to‘lov turi bilan saqlanadi.
  - Haqiqiy 80mm termal kassa cheki (Kassa orderi) ekranda hosil bo‘ladi va brauzer orqali chop etishga tayyor bo‘ladi (`window.print()`).

### 7. Kunlik Savdo va Statistika
* **Soatlik savdo grafigi (Hourly Sales Chart)** — HTML/CSS/SVG orqali qurilgan interaktiv diagramma, kursorni ustiga olib borganda soatlik tushum va cheklar sonini ko‘rsatadi.
* **To‘lov turlari taqsimoti**: Naqd pul va Plastik karta nisbati (foiz va summada).
* **Eng ko‘p sotilgan mahsulotlar (Top 5)**: Reyting, sotilgan donasi va keltirgan umumiy daromadi.

### 8. Buyurtmalar Tarixi (Arxiv)
* Har bir to‘langan buyurtma doimiy saqlanadi.
* Chek №, Stol raqami, taomlar ro‘yxati, to‘lov turi va aniq vaqti.
* Qidiruv va ko‘p qirrali filtrlar (Bugun, Kecha, Naqd, Karta, Stol bo‘yicha).
* Har qanday o‘tgan buyurtmaning chekini qayta ko‘rish va qayta chop etish imkoniyati.

### 9. Sozlamalar (Admin boshqaruvi)
* **Yangi mahsulot qo‘shish**: Nomi, narxi, toifasi, rasmi va ta’rifi.
* **Mahsulotlarni tahrirlash va o‘chirish**: Narxni yangilash yoki omborda qolmagan bo‘lsa "Mavjud emas" holatiga o‘tkazish.
* **Kafe rekvizitlarini sozlash**: Kafe nomi, telefon, manzil, chekdagi minnatdorchilik xabari, xizmat haqi foizi.
* **Xotirani boshqarish**: Boshlang‘ich namunaviy ma’lumotlarni qaytarish yoki tarixni tozalash (xavfsiz tasdiqlash oynalari bilan).

---

## 📁 LOYIHA TUZILISHI

```
hisobot/
├── index.html          # Asosiy to'liq mustaqil POS ilovasi (HTML + React + Tailwind)
├── package.json        # NPM skriptlari (npm start, npm run build)
├── serve.js            # Yengil, 0-dependency Node.js mahalliy serveri
├── build.js            # Manba modullarini index.html ga yig'uvchi skript
├── src_parts/          # Qismlarga ajratilgan toza kod bloklari
│   ├── 01_header.html
│   ├── 02_constants.js
│   ├── 03_icons.js
│   ├── 04_ui_components.js
│   ├── 05_pos_modal.js
│   ├── 06_payment_receipt.js
│   ├── 07_views.js
│   ├── 08_app_root.js
│   └── 09_footer.html
└── README.md           # Ushbu qo'llanma
```

---

## 🛡️ ISHONCHLILIK VA XAVFSIZLIK
- Barcha hisob-kitoblar bir tiyingacha aniq.
- Stollar bir-biridan butunlay ajratilgan — buyurtmalar aralashib ketmaydi.
- Muhim va o‘chirish amallari uchun chiroyli tasdiqlash oynalari (Confirm Dialog) mavjud.
- Brauzer yangilansa (F5) ham ma’lumotlar yo‘qolmaydi (`localStorage`).
- Soxta yoki ishlamaydigan tugmalar mavjud emas — barcha 100% interaktiv.

