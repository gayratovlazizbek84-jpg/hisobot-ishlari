const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = parseInt(process.env.PORT, 10) || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const reqFile = urlPath === '/' ? 'index.html' : urlPath.slice(1);
  const filePath = path.join(__dirname, reqFile);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/html; charset=UTF-8';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Fallback to index.html for SPA
      fs.readFile(path.join(__dirname, 'index.html'), (errIndex, indexContent) => {
        if (errIndex) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('404: Sahifa topilmadi');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(indexContent, 'utf-8');
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

let currentPort = PORT;

function startServer(portToTry) {
  server.listen(portToTry, () => {
    currentPort = portToTry;
    console.log(`\n======================================================`);
    console.log(`☕ Rayhon Cafe POS — Zamonaviy Kafe Boshqaruv Tizimi`);
    console.log(`🚀 Mahalliy server muvaffaqiyatli ishga tushdi!`);
    console.log(`🌐 Brauzerda oching: http://localhost:${portToTry}`);
    console.log(`   (Serverni to'xtatish uchun: Ctrl + C)`);
    console.log(`======================================================\n`);

    // Avtomatik ravishda brauzerda ochish
    try {
      if (process.platform === 'win32') {
        exec(`start http://localhost:${portToTry}`);
      } else if (process.platform === 'darwin') {
        exec(`open http://localhost:${portToTry}`);
      } else {
        exec(`xdg-open http://localhost:${portToTry}`);
      }
    } catch (e) {
      // Brauzerni ochishda xatolik bo'lsa e'tiborsiz qoldirish
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${portToTry} band, ${portToTry + 1}-port sinab ko'rilmoqda...`);
      server.close();
      startServer(portToTry + 1);
    } else {
      console.error('Server xatosi:', err);
    }
  });
}

startServer(PORT);
