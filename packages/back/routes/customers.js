const Sequelize = require('sequelize');
const router = require('express').Router();
const { Customers } = require('../models');
const ws = require('../ws');

router.get('/', async (_req, res, next) => {
  try {
    const customers = await Customers.findAll();

    res.status(200).send(customers);
  } catch (e) {
    console.error(`customers-route-get-error: ${e.message}`);
    next(e);
  }
});

router.get('/cities/total', async (_req, res, next) => {
  try {
    const cities = await Customers.findAll({
      attributes: [
        'city',
        [Sequelize.fn('COUNT', Sequelize.col('city')), 'customers_total'],
      ],
      group: ['city'],
    });

    res.status(200).send(cities);
  } catch (e) {
    console.error(`customers-route-get-total: ${e.message}`);
    next(e);
  }
});

router.get('/city/:city', async (req, res, next) => {
  try {
    const { query, params } = req;
    const { limit, offset } = query;
    const { city } = params;

    const { count, rows } = await Customers.findAndCountAll({
      where: {
        city,
      },
      order: [
        ['first_name', 'ASC'],
        ['last_name', 'ASC'],
      ],
      limit: Number(limit),
      offset: Number(offset),
    });

    res.status(200).send({ count, customers: rows });
  } catch (e) {
    console.error(`customers-route-get-:city-error: ${e.message}`);
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;

    const customer = await Customers.findOne({
      where: {
        id,
      },
    });

    res.status(200).send(customer);
  } catch (e) {
    console.error(`customers-route-get-:id-error: ${e.message}`);
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const {
      first_name,
      last_name,
      email,
      gender,
      company,
      city,
      title,
    } = body;

    const customerUpdated = await Customers.update({
      first_name,
      last_name,
      email,
      gender,
      company,
      city,
      title,
      updatedAt: new Date(),
    }, {
      where: {
        id,
      },
    });

    ws.sendUpdate();
    res.status(204).send(customerUpdated);
  } catch (error) {
    console.error(`customer-route-put-:id-/error: ${error.message}`);
    next(error);
  }
});


module.exports = router;
