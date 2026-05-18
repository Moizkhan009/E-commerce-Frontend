import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCustomers } from '../../redux/Coustomers/customerslice';

const CustomerList = () => {

  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);
  useEffect(() => { 
    dispatch(fetchCustomers());
  }, [dispatch]);
  

  // const customers = [
  //   { name: 'Ahmad Khan', email: 'ahmad@email.com', orders: 24, spent: '$1,234', status: 'active', lastOrder: '2 hours ago' },
  //   { name: 'Fatima Ali', email: 'fatima@email.com', orders: 18, spent: '$987', status: 'active', lastOrder: '5 hours ago' },
  //   { name: 'Usman Raza', email: 'usman@email.com', orders: 12, spent: '$756', status: 'inactive', lastOrder: '3 days ago' },
  //   { name: 'Ayesha Noor', email: 'ayesha@email.com', orders: 31, spent: '$2,345', status: 'active', lastOrder: '1 hour ago' },
  //   { name: 'Bilal Ahmed', email: 'bilal@email.com', orders: 8, spent: '$432', status: 'active', lastOrder: '1 day ago' },
  // ];

  return (
    <div>
      <h1 className="page-title">👥 Customers</h1>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Customers</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-outline">Export</button>
            <button className="btn btn-primary">+ Add Customer</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Last Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        background: '#DEF9EC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#3BB77E'
                      }}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{customer.name}</div>
                        <div style={{ fontSize: 12, color: '#7E7E7E' }}>{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{customer.orders}</td>
                  <td style={{ fontWeight: 700 }}>{customer.spent}</td>
                  <td>
                    <span className={`status-badge ${customer.status === 'active' ? 'completed' : 'pending'}`}>
                      <span className="status-dot" style={{ 
                        background: customer.status === 'active' ? '#3BB77E' : '#FFA000'
                      }}></span>
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ color: '#7E7E7E', fontSize: 13 }}>{customer.lastOrder}</td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;