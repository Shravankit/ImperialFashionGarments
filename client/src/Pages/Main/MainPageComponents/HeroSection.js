import React from 'react'

const HeroSection = () => {
  return (
    <div className='container'>
      <div className='row d-flex align-items-center' style={{height:'100vh'}}>
        <div className='col-md-6'>
          <h1>
            Express Your Passoin With Clothing
          </h1>
        </div>
        <div className='col-md-6'>
          <img src={'/images/logo.png'} alt='imperial passion' style={{width:'100%'}}/>
        </div>
      </div>
    </div>
  )
}

export default HeroSection