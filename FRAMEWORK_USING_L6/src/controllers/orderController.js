const { getAllFoods, getFoodById, createFood } = require('../controllers/foodController');

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
  }
};