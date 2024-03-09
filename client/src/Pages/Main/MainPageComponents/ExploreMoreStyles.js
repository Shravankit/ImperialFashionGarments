import React from 'react';
import { Link } from 'react-router-dom';

const ExploreMoreStyles = () => {
  return (
    <div className="card bg-dark text-white w-100 position-relative" height={900}>
      <img src={'/images/menFashion.jpg'} className="card-img" height={950} alt="mens fashion" />
      <div className="card-img-overlay row align-items-end">
        <h5 className="card-title">Explore more Mens Fashion</h5>
        <div className='d-grid gap-2 d-md-flex justify-content-center text-uppercase'>
        <button className='btn btn-success'><Link to='/home' className='text-decoration-none'>Explore More</Link></button>
        </div>
      </div>
    </div>
  )
}

export default ExploreMoreStyles