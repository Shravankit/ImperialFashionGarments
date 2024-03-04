import React from 'react'
import Layout from '../Components/layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout title={"Page not found"}>
        <div className='pnf'>
          <h1 className='pnf-title'>404</h1>
          <h2 className='pnf-heading'>! Page not found</h2>
          <Link to='/' className='pnf-button'>Go Back</Link>
        </div>
    </Layout>
  )
}

export default PageNotFound