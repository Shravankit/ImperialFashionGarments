import React from 'react'
import Layout from '../../Components/layout/Layout'
import UserMenu from '../../Components/layout/UserMenu'

const Order = () => {
  return (
    <Layout>
         <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3>Orders</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Order