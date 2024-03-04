import React from 'react';
import AdminMenu from '../../Components/layout/AdminMenu';
import Layout from '../../Components/layout/Layout';

const Users = () => {
  return (
    <Layout>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h1>Users</h1>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Users