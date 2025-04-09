const { getAllFoods, getFoodById, createFood, updateFood, partiallyUpdateFood, deleteFood } = require('../controllers/foodController');

module.exports = function foodRoutes(req, res) {
  const urlParts = req.url.split('/');
  const id = urlParts[4]; 
  if (req.method === 'GET' && !id) {
    getAllFoods(req, res);
  } else if (req.method === 'GET' && id) {

    getFoodById(req, res, id);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => createFood(req, res, body));
  } else if (req.method === 'PUT' && id) {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => updateFood(req, res, id, body));
  } else if (req.method === 'PATCH' && id) {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => partiallyUpdateFood(req, res, id, body));
  } else if (req.method === 'DELETE' && id) {
    deleteFood(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};