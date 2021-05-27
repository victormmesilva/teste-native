import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import api from 'axios';

const City = () => {
  const { city } = useParams();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const { data } = await api.get(`http://localhost:3001/api/customers/city/${city}`);
        setCustomers(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (city) {
      getCustomers();
    }
  }, [city]);

  return (
    <>
      <h1>City</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Company</th>
            <th>City</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            customers
              .map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.company}</td>
                  <td>{customer.city}</td>
                  <td>{customer.title}</td>
                  <td><Link to={`/customer/${customer.id}/edit`}>Editar</Link></td>
                  <td><Link to={`/customer/${customer.id}`}>Detalhes</Link></td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </>
  );
};

export default City;
