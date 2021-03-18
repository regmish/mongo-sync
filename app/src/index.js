const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const DB_URI = process.env.DB_URI;
const PORT = process.env.port || 3030;

const app = express();

const bootstrap = async () => {
  const dbClient = await MongoClient.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = dbClient.db('sync')

  app.use(bodyParser.json());

  app.get('/users', async (req, res) => {
    const users = await db.collection('users').find().toArray();

    res.status(200).json(users);
  });

  app.post('/users', async (req, res) => {
    const user = await db.collection('users').insertOne({
      ...req.body
    });

    res.status(200).json(user.ops);
  });

  app.listen(PORT, () => console.log('Application running on ', PORT))
};

bootstrap();