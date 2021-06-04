import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../api';
import './styles.scss';

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
    <div className="customer">
      <div className="customer__card">
        <h1 className="customer__card__title">{`${customer.first_name} ${customer.last_name}`}</h1>
        <p className="customer__card__label">First name:</p>
        <p className="customer__card__value">{customer.first_name}</p>
        <p className="customer__card__label">Last name:</p>
        <p className="customer__card__value">{customer.last_name}</p>
        <p className="customer__card__label">Email:</p>
        <p className="customer__card__value">{customer.email}</p>
        <p className="customer__card__label">Gender:</p>
        <p className="customer__card__value">{customer.gender}</p>
        <p className="customer__card__label">Company:</p>
        <p className="customer__card__value">{customer.company}</p>
        <p className="customer__card__label">City:</p>
        <p className="customer__card__value">{customer.city}</p>
        <p className="customer__card__label">Title:</p>
        <p className="customer__card__value">{customer.title}</p>
      </div>
    </div>
  );
};

export default EditCustomer;
