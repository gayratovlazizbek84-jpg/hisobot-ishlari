// Concatenates src_parts into index.html
const fs = require('fs');
const path = require('path');

const parts = [
  '01_header.html',
  '02_constants.js',
  '03_icons.js',
  '04_ui_components.js',
  '05_pos_modal.js',
  '06_payment_receipt.js',
  '07_views.js',
  '08_app_root.js',
  '09_footer.html'
];

let finalHtml = '';
for (const part of parts) {
  const filePath = path.join(__dirname, 'src_parts', part);
  const content = fs.readFileSync(filePath, 'utf8');
  finalHtml += content + '\n';
  console.log(`Included: ${part} (${content.length} bytes)`);
}

fs.writeFileSync(path.join(__dirname, 'index.html'), finalHtml, 'utf8');
console.log(`\nSuccessfully created index.html (${finalHtml.length} bytes, ${(finalHtml.length / 1024).toFixed(1)} KB)`);

