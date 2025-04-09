// server.js

const http = require('http');
const path = require('path');

console.log('Current directory:', __dirname);

console.log('Importing routes...');
const foodRoutes = require('./src/routes/foodRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
console.log('Routes imported successfully.');

const errorMiddleware = require('./src/middlewares/errorMiddleware');

const server = http.createServer((req, res) => {
  try {
    console.log(`Incoming request: ${req.method} ${req.url}`);

    // Обработка корневого пути
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Welcome to the Food Delivery API!');
      return;
    }

    // Роутинг для блюд
    if (req.url.startsWith('/api/v1/food')) {
      foodRoutes(req, res);
    } else if (req.url.startsWith('/api/v1/orders')) {
      orderRoutes(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  } catch (err) {
    errorMiddleware(err, req, res);
  }
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
  errorMiddleware(err, null, null);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});