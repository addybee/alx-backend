import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();
const getAsync = promisify(client.get).bind(client);

const listProducts = [
  {
    id: 1,
    name: 'Suitcase 250',
    price: 50,
    stock: 4,
  },
  {
    id: 2,
    name: 'Suitcase 450',
    price: 100,
    stock: 10,
  },
  {
    id: 3,
    name: 'Suitcase 650',
    price: 350,
    stock: 2,
  },
  {
    id: 4,
    name: 'Suitcase 1050',
    price: 550,
    stock: 5,
  },
];

const app = express();

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const result = getItemById(parseInt(itemId));

  if (!result) {
    res.status(404).json({"status":"Product not found"});
  } else {
    const currentQuantity = await getCurrentReservedStockById(itemId);
    res.json({
      "itemId": itemId,
      "itemName": result.name,
      "price": result.price,
      "initialAvailableQuantity": result.stock,
      "currentQuantity": currentQuantity
    });
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const result = getItemById(parseInt(itemId));

  if (!result) {
    res.status(404).json({"status":"Product not found"});
    return;
  }
  const currentQuantity = await getCurrentReservedStockById(result.id);
  if (!currentQuantity || !parseInt(currentQuantity)) {
    res.status(400).json({"status":"Not enough stock available","itemId": result.id});
  } else {
    reserveStockById(result.id, result.stock);
    res.json({"status":"Reservation confirmed","itemId":result.id});
  }
});

app.listen(1245);


function getItemById(id) {
  return listProducts.find((item) => item.id === id);
}

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  return await getAsync(`item.${itemId}`);
}
