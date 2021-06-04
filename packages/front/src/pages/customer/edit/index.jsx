import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import api from '../../../api';
import './styles.scss';

const EditCustomer = () => {
  const history = useHistory();
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

  const handleChange = ({ target }) => setCustomer((oldCustomer) => ({
    ...oldCustomer,
    [target.name]: target.value,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { status } = await api.put(`/customers/${id}`, customer);

      if (status === 204) {
        history.push('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="form__container">
      <h1 className="title">{`Edit customer (id: ${id})`}</h1>
      {
        customer && (
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="first_name__input" className="label">
              First name:
            </label>
            <input
              id="first_name__input"
              className="input"
              name="first_name"
              type="text"
              value={customer.first_name}
              onChange={handleChange}
            />
            <label htmlFor="last_name__input" className="label">
              Last name:
            </label>
            <input
              id="last_name__input"
              className="input"
              name="last_name"
              type="text"
              value={customer.last_name}
              onChange={handleChange}
            />
            <label htmlFor="email__input" className="label">
              Email:
            </label>
            <input
              id="email__input"
              className="input"
              name="email"
              type="text"
              value={customer.email}
              onChange={handleChange}
            />
            <label htmlFor="gender__input" className="label">
              Gender:
            </label>
            <div id="gender__input" className="gender__input">
              <label htmlFor="gender_male__input" className="label">
                Male
              </label>
              <input
                id="gender_male__input"
                className="input"
                name="gender"
                type="radio"
                value="Male"
                checked={customer.gender === 'Male'}
                onChange={handleChange}
              />
              <label htmlFor="gender_female__input" className="label">
                Female
              </label>
              <input
                id="gender_female__input"
                className="input"
                name="gender"
                type="radio"
                value="Female"
                checked={customer.gender === 'Female'}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="conpany__input" className="label">
              Company:
            </label>
            <input
              id="conpany__input"
              className="input"
              name="company"
              type="text"
              value={customer.company}
              onChange={handleChange}
            />
            <label htmlFor="city__input" className="label">
              City:
            </label>
            <input
              id="city__input"
              className="input"
              name="city"
              type="text"
              value={customer.city}
              onChange={handleChange}
            />
            <label htmlFor="title__input" className="label">
              Title:
            </label>
            <input
              id="title__input"
              className="input"
              name="title"
              type="text"
              value={customer.title}
              onChange={handleChange}
            />
            <div className="form__buttons">
              <button
                className="button button--filled"
                type="submit"
              >
                Send
              </button>
              <button
                className="button button--text"
                onClick={() => history.push('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        )
      }
    </div>
  );
};

export default EditCustomer;
