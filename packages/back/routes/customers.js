const router = require('express').Router();

const { Customers } = require('../models');

router.get('/', async (_req, res, next) => {
  try {
    const customers = await Customers.findAll();

    res.status(200).send(customers);
  } catch (e) {
    console.error(`customers-route-get-error: ${e.message}`);
    next(e);
  }
});

router.get('/city/:city/total', async (req, res, next) => {
  try {
    const { params } = req;
    const { city } = params;

    const customers = await Customers.findAll({
      where: {
        city,
      },
    });

    const response = {
      city,
      customers_total: customers.length,
    }

    res.status(200).send(response);
  } catch (e) {
    console.error(`customers-route-get-total: ${e.message}`);
    next(e);
  }
});

router.get('/city/:city', async (req, res, next) => {
  try {
    const { params } = req;
    const { city } = params;

    const customers = await Customers.findAll({
      where: {
        city,
      },
    });

    res.status(200).send(customers);
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

    res.status(204).send(customerUpdated);
  } catch (error) {
    console.error(`customer-route-put-:id-/error: ${error.message}`);
    next(error);
  }
});


module.exports = router;
