const { getAllOrders, getOrderById, createOrder, updateOrder, partiallyUpdateOrder, deleteOrder } = require('../controllers/orderController');

module.exports = function orderRoutes(req, res) {
  const urlParts = req.url.split('/');
  const id = urlParts[4]; 
  if (req.method === 'GET' && !id) {
    getAllOrders(req, res);
  } else if (req.method === 'GET' && id) {
    getOrderById(req, res, id);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => createOrder(req, res, body));
  } else if (req.method === 'PUT' && id) {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => updateOrder(req, res, id, body));
  } else if (req.method === 'PATCH' && id) {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => partiallyUpdateOrder(req, res, id, body));
  } else if (req.method === 'DELETE' && id) {
    deleteOrder(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};