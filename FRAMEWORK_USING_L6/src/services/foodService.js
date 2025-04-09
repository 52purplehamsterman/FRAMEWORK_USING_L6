const { readDB, writeDB } = require('../db/db');
exports.getAllFoods = () => {
  const db = readDB();
  return db.food;
};

exports.getFoodById = (id) => {
  const db = readDB();
  return db.food.find((food) => food.id === parseInt(id));
};

exports.createFood = (newFoodData) => {
  const db = readDB();
  const newFood = {
    id: db.food.length + 1,
    ...newFoodData,
    createdAt: new Date().toISOString(),
  };
  db.food.push(newFood);
  writeDB(db);
  return newFood;
};

exports.updateFood = (id, updatedData) => {
  const db = readDB();
  const index = db.food.findIndex((food) => food.id === parseInt(id));
  if (index === -1) {
    throw new Error('Food not found');
  }
  db.food[index] = { ...db.food[index], ...updatedData };
  writeDB(db);
  return db.food[index];
};
exports.partiallyUpdateFood = (id, partialData) => {
  const db = readDB();
  const index = db.food.findIndex((food) => food.id === parseInt(id));
  if (index === -1) {
    throw new Error('Food not found');
  }
  db.food[index] = { ...db.food[index], ...partialData };
  writeDB(db);
  return db.food[index];
};
exports.deleteFood = (id) => {
  const db = readDB();
  const index = db.food.findIndex((food) => food.id === parseInt(id));
  if (index === -1) {
    throw new Error('Food not found');
  }
  const deletedFood = db.food.splice(index, 1)[0];
  writeDB(db);
  return deletedFood;
};