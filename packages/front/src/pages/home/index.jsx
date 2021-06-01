import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from "react-router-dom";
import api from '../../api';
import Context from '../../context';

const Home = () => {
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
    if(messages.includes('update')) {
      getCities();
      setMessages((oldMessages) => oldMessages.filter(msg => msg !== 'update'));
    }
  }, [messages, getCities, setMessages]);
  useEffect(() => getCities(), [getCities]);

  return (
    <>
      <h1>Home</h1>
      <div className="cards">
        {
          cities
            .map(({ city, customers_total }) => (
              <Link to={`/city/${city}/customers`} key={city}>
                <div className="card">
                  <p>{`Cidade: ${city}`}</p>
                  <p>{`Total de clientes: ${customers_total}`}</p>
                </div>
              </Link>
            ))
        }
      </div>
    </>
  );
};

export default Home;
