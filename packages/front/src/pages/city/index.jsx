import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import api from '../../api';
import './styles.scss';

const limit = 5;

const City = () => {
  const history = useHistory();
  const { city } = useParams();
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const { data } = await api.get(`customers/city/${city}`, {
          params: {
            limit,
            offset: (page - 1) * limit,
          },
        });

        setCustomers(data.customers);
        setCount(data.count);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (city) {
      getCustomers();
    }
  }, [city, page]);

  return (
    <>
      <h1 className="table__title">{city}</h1>
      <table className="table">
        <thead className="table__thead">
          <tr className="table__tr">
            <th className="table__th">ID</th>
            <th className="table__th">First name</th>
            <th className="table__th">Last name</th>
            <th className="table__th">Email</th>
            <th className="table__th">Gender</th>
            <th className="table__th">Company</th>
            <th className="table__th">City</th>
            <th className="table__th">Title</th>
            <th className="table__th" colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody className="table__tbody">
          {
            customers
              .map((customer) => (
                <tr className="table__tr" key={customer.id}>
                  <td className="table__td">{customer.id}</td>
                  <td className="table__td">{customer.first_name}</td>
                  <td className="table__td">{customer.last_name}</td>
                  <td className="table__td">{customer.email}</td>
                  <td className="table__td">{customer.gender}</td>
                  <td className="table__td">{customer.company}</td>
                  <td className="table__td">{customer.city}</td>
                  <td className="table__td">{customer.title}</td>
                  <td className="table__td">
                    <button
                      className="button button--text"
                      onClick={() => history.push(`/customer/${customer.id}/edit`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="table__td">
                    <button
                      className="button button--text"
                      onClick={() => history.push(`/customer/${customer.id}`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
        <tfoot className="table__tfoot">
          <tr className="table__tr">
            <td className="table__td" colSpan="10">
              <button
                className="tfoot__button"
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </button>
              {`Page ${page} of ${Math.ceil(count / limit)} | Count: ${count}`}
              <button
                className="tfoot__button"
                disabled={(page >= count / limit)}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default City;
