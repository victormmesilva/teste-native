import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from 'axios';

const Home = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const { data } = await api.get('http://localhost:3001/api/customers/cities/total');
        setCities(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    getCities();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div>
        {
          cities
            .map(({ city, customers_total }) => (
              <div key={city}>
                <Link to={`/city/${city}`}>
                  {`city: ${city} | total: ${customers_total}`}
                </Link>
              </div>
            ))
        }
      </div>
    </>
  );
};

export default Home;
