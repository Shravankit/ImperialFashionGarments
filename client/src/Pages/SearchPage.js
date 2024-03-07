import React from 'react';
import Layout from '../Components/layout/Layout';
import { useSearch } from '../Components/context/Search';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
  return (
    <Layout>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6>
                <div className='d-flex flex-wrap mt-3'>
              <div className='d-flex flex-wrap'>
                    {values?.results.map((p) => {
                       return <div className="card m-1" style={{width: '18rem'}} key={p._id}>
                          <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'2rem'} />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 20)}</p>
                            <p className="card-text">${p.price}</p>
                            <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                            <button className='btn btn-warning ms-1'>Add To cart</button>
                          </div>
                        </div>
                    })}
                </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default SearchPage