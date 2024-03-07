import React, { useEffect, useState } from 'react'
import Layout from '../Components/layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ProductDetails = () => {
    //params
    const params = useParams();

    const [product, setProduct] = useState({});

    //get product
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-single-product/${params.slug}`);
            if(data.success)
            {
                setProduct(data?.oneProduct);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {if(params?.slug) getProduct()}, [params]);
  return (
    <Layout>
        <div className='row container mt-3'>
            <div className='col-md-6'>
                <img
                src={`/api/v1/product/get-product-photo/${product._id}`}
                className='card-img-top'
                alt={product.name}
                height='500'
                width='400px' />
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
    </Layout>
  )
}

export default ProductDetails