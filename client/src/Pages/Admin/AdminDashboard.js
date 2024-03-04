import React from 'react'
import Layout from '../../Components/layout/Layout';
import AdminMenu from '../../Components/layout/AdminMenu';
import { useAuth } from '../../Components/context/authContext';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'admin dashboard - imperial garments'}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h1>Admin Name: {auth.user.name} </h1>
                <h2>Admin Email: {auth.user.email} </h2>
                <h2>Admin Contact: {auth.user.phone} </h2>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard