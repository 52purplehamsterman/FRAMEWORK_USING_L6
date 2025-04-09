const { readDB, writeDB } = require('../db/db');
exports.getAllFoods = (req, res) => {
  const foods = readDB().food;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(foods));
};
exports.getFoodById = (req, res, id) => {
  const foods = readDB().food;
  const food = foods.find((f) => f.id === parseInt(id));
  if (!food) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Food not found' }));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(food));
  }
};
exports.createFood = (req, res, body) => {
  const foods = readDB().food;
  const newFood = JSON.parse(body);
  newFood.id = foods.length + 1;
  newFood.createdAt = new Date().toISOString();
  foods.push(newFood);
  writeDB({ ...readDB(), food: foods });
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newFood));
};