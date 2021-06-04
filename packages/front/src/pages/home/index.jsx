import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import api from '../../api';
import Context from '../../context';
import './styles.scss';

const Home = () => {
  const history = useHistory();
  const { messages, setMessages } = useContext(Context);
  const [cities, setCities] = useState([]);

  const getCities = useCallback(async () => {
    try {
      const { data } = await api.get('/customers/cities/total');
      setCities(data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (messages.includes('update')) {
      getCities();
      setMessages((oldMessages) => oldMessages.filter(msg => msg !== 'update'));
    }
  }, [messages, getCities, setMessages]);
  useEffect(() => getCities(), [getCities]);

  return (
    <div className="cards">
      {
        cities
          .map(({ city, customers_total }) => (
            <div
              key={city}
              className="card"
              onClick={() => history.push(`/city/${city}/customers`)}
            >
              <p className="card__city">{city}</p>
              <div className="card__customers">
                <p className="card__customers__num">{customers_total}</p>
                <p className="card__customers__label">Customers</p>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default Home;
