import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import api from 'axios';

const EditCustomer = () => {
  const history = useHistory();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const getCustomer = async () => {
      const { data } = await api.get(`http://localhost:3001/api/customers/${id}`);
      setCustomer(data);
    };

    if (id) {
      getCustomer();
    }
  }, [id]);

  const handleChange = ({ target }) => setCustomer((oldCustomer) => ({
    ...oldCustomer,
    [target.name]: target.value,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { status } = await api.put(`http://localhost:3001/api/customers/${id}`, customer);

      if (status === 204) {
        history.push('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h1>{`Editar cliente (id: ${id})`}</h1>
      {
        customer && (
          <form onSubmit={handleSubmit}>
            <label>
              First name:
              <input
                name="first_name"
                type="text"
                value={customer.first_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Last name:
              <input
                name="last_name"
                type="text"
                value={customer.last_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                type="text"
                value={customer.email}
                onChange={handleChange}
              />
            </label>
            <div>
              <label>
                Male
                <input
                  name="gender"
                  type="radio"
                  value="Male"
                  checked={customer.gender === 'Male'}
                  onChange={handleChange}
                />
              </label>
              <label>
                Female
                <input
                  name="gender"
                  type="radio"
                  value="Female"
                  checked={customer.gender === 'Female'}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label>
              Company:
              <input
                name="company"
                type="text"
                value={customer.company}
                onChange={handleChange}
              />
            </label>
            <label>
              City:
              <input
                name="city"
                type="text"
                value={customer.city}
                onChange={handleChange}
              />
            </label>
            <label>
              Title:
              <input
                name="title"
                type="text"
                value={customer.title}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Salvar</button>
            <button onClick={() => history.push('/')}>Cancelar</button>
          </form>
        )
      }
    </>
  );
};

export default EditCustomer;
