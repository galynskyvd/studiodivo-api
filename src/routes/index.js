const express = require('express');
const router = express.Router();
const database = require('../database');
const telegram = require('../plugins/telegram');
const time = require('../plugins/moment');
const {telegram: {users}} = require('../config.json');

router.get('/', (req, res) => res.send('Server API working'));

router.post('/order', async (req, res) => {
    let {name, phone} = req.body,
        query = 'INSERT INTO orders (name, phone, time) VALUES($1, $2, $3) RETURNING id',
        values = [name, phone, time.now],
        {rows} = await database.query(query, values),
        message = `Новый заказ\nИмя: ${name}\nТелефон: ${phone}\nВремя: ${time.now}`;

    telegram.sendMessage(users.vladimir, message);
    res.send({id: rows[0].id})
});

module.exports = router;