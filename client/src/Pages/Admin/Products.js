import Layout from '../../Components/layout/Layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminMenu from '../../Components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    //handle all products
    const handleAllProducts = async () => {
        try {
            const {data} = await axios.get('/api/v1/product/get-all-product');
            if(data?.success)
            {
                toast.success(data.message);
                setProducts(data.products);
            }
            else
            {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in Fetching Products");
        }
    }

    useEffect(() => {handleAllProducts()}, [])
  return (
    <Layout>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products</h1>
                <div className='d-flex flex-wrap'>
                    {products?.map((p) => {
                       return <Link
                          key={p._id}
                          to={`/dashboard/admin/product/${p.slug}`}
                          className="product-link"
                        >
                        <div className="card" style={{width: '18rem'}}>
                          <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'2rem'} />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                            <p className="card-text">{p.price}</p>
                          </div>
                        </div>
                    </Link>
                    })}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products