const { readDB, writeDB } = require('../db/db');
exports.getAllOrders = () => {
  const db = readDB();
  return db.orders;
};
exports.getOrderById = (id) => {
  const db = readDB();
  return db.orders.find((order) => order.id === parseInt(id));
};
exports.createOrder = (newOrderData) => {
  const db = readDB();
  const newOrder = {
    id: db.orders.length + 1,
    ...newOrderData,
    createdAt: new Date().toISOString(),
  };
  db.orders.push(newOrder);
  writeDB(db);
  return newOrder;
};
exports.updateOrder = (id, updatedData) => {
  const db = readDB();
  const index = db.orders.findIndex((order) => order.id === parseInt(id));
  if (index === -1) {
    throw new Error('Order not found');
  }
  db.orders[index] = { ...db.orders[index], ...updatedData };
  writeDB(db);
  return db.orders[index];
};
exports.partiallyUpdateOrder = (id, partialData) => {
  const db = readDB();
  const index = db.orders.findIndex((order) => order.id === parseInt(id));
  if (index === -1) {
    throw new Error('Order not found');
  }
  db.orders[index] = { ...db.orders[index], ...partialData };
  writeDB(db);
  return db.orders[index];
};
exports.deleteOrder = (id) => {
  const db = readDB();
  const index = db.orders.findIndex((order) => order.id === parseInt(id));
  if (index === -1) {
    throw new Error('Order not found');
  }
  const deletedOrder = db.orders.splice(index, 1)[0];
  writeDB(db);
  return deletedOrder;
};