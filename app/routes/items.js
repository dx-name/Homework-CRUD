import express from 'express';
const router = express.Router();

let items = [
  { id: 1, name: 'Товар 1', price: 100 },
  { id: 2, name: 'Товар 2', price: 200 }
];
let nextId = 3;

router.post('/', (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price === 'undefined') {
    return res.status(400).json({ error: 'name и price обязательны' });
  }
  const item = { id: nextId++, name, price };
  items.push(item);
  res.status(201).json(item);
});

router.get('/', (req, res) => res.json(items));
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Не найдено' });
  res.json(item);
});

export default router; 
