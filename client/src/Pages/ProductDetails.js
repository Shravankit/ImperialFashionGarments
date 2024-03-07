import React, { useEffect, useState } from 'react'
import Layout from '../Components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const ProductDetails = () => {
    //params
    const params = useParams();

    const [product, setProduct] = useState({});

    //similar products
    const [similarProducts, setSimilarProducts] = useState([]);

    //navigation
    const navigate = useNavigate();

    //get product
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-single-product/${params.slug}`);
            
            setProduct(data?.oneProduct);
            handleSimilarProduct(data.oneProduct._id, data.oneProduct.category._id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {if(params?.slug) getProduct()}, [params]);

    const handleSimilarProduct = async (pid, cid) => {
        try {
            const {data} = await axios.get(`/api/v1/product/similar-product/${pid}/${cid}`);
            console.log('Similar products:', data);
            setSimilarProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
        <div className='row container mt-3 align-items-center'>
            <div className='col-md-6'>
            {product._id && (
                        <img
                            src={`/api/v1/product/get-product-photo/${product._id}`}
                            className='card-img-top'
                            alt={product.name}
                            height='700'
                            width='400px' />
                    )}
            </div>
            <div className='col-md-6 text-center'>
            <h2>Product Details</h2>
                <h6>
                    Name: {product.name}
                </h6>
                <h6>
                    Description: {product.description}
                </h6>
                <h6>
                    Category: {product.category?.name}
                </h6>
                <h6>
                    Shipping: {product.shipping}
                </h6>
                <h4>
                    Price: ${product.price}
                </h4>

                <button className='btn btn-primary ms-1'>Add To cart</button>
                <button className='btn btn-warning ms-1'>Buy Now</button>
            </div>       
        </div>
        <div>
            <div className='d-flex flex-wrap'>
                {similarProducts.length < 1 && (<p>No Similar Products</p>)}
                {similarProducts?.map((p) => {
                   return <div className="card ms-5 mt-2" style={{width: '20rem'}} key={p._id}>
                      <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'2rem'} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 20)}</p>
                        <p className="card-text">${p.price}</p>
                        <button className='btn btn-primary ms-1' onClick={() => {navigate(`/product/${p.slug}`)}}>More Details</button>
                        <button className='btn btn-warning ms-1'>Add To cart</button>
                      </div>
                    </div>
                })}
            </div>
        </div>
    </Layout>
  )
}

export default ProductDetails