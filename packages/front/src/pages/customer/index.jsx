import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../api';

const EditCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const getCustomer = async () => {
      const { data } = await api.get(`/customers/${id}`);
      setCustomer(data);
    };

    if (id) {
      getCustomer();
    }
  }, [id]);

  return customer && (
    <>
      <h1>{`${customer.first_name} ${customer.last_name}`}</h1>
      <div>
        <p>{`First name: ${customer.first_name}`}</p>
        <p>{`Last name: ${customer.last_name}`}</p>
        <p>{`Email: ${customer.email}`}</p>
        <p>{`Gender: ${customer.gender}`}</p>
        <p>{`Company: ${customer.company}`}</p>
        <p>{`City: ${customer.city}`}</p>
        <p>{`Title: ${customer.title}`}</p>
      </div>
    </>
  );
};

export default EditCustomer;
