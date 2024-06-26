const express = require('express')
const app = express()
const port = 1245

const redis = require('redis');
const client = redis.createClient();

const listProducts = [
  {id: '1',
   name: 'Suitcase 250',
   price: '50',
   stock: '4'},
  {id: '2',
   name: 'Suitcase 450',
   price: '100',
   stock: '10'},
  {id: '3',
   name: 'Suitcase 650',
   price: '350',
   stock: '2'},
  {id: '4',
   name: 'Suitcase 1050',
   price: '550',
   stock: '5'},
];

function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

app.get('/list_products', (req, res) => {
  res.json(listProducts)
})

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);

    if (!product) {
        res.json({ status: 'Product not found' });
        return;
    }

    const currentStock = await getCurrentReservedStockById(itemId);
    const currentQuantity = currentStock !== null ? parseInt(currentStock) : product.initialAvailableQuantity;

    res.json({
        ...product,
        currentQuantity
    });
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);

    if (!product) {
        res.json({ status: 'Product not found' });
        return;
    }

    const currentStock = await getCurrentReservedStockById(itemId);
    const currentQuantity = currentStock !== null ? parseInt(currentStock) : product.initialAvailableQuantity;

    if (currentQuantity > 0) {
        await reserveStockById(itemId, currentQuantity - 1);
        res.json({ status: 'Reservation confirmed', itemId });
    } else {
        res.json({ status: 'Not enough stock available', itemId });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    return new Promise((resolve, reject) => {
        redisClient.get(`item.${itemId}`, (err, stock) => {
            if (err) {
                reject(err);
            } else {
                resolve(stock);
            }
        });
    });
}
