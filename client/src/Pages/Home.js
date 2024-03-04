import React, { useEffect, useState } from 'react';
import Layout from '../Components/layout/Layout';
import { useAuth } from '../Components/context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Prices} from "../Components/Prices";
import {Checkbox, Radio} from "antd";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //get all products
  const getAllCategory = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/categories');
      if(data.success)
      {
        setCategory(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Getting all products');
    }
  }
  
  useEffect(() => {getAllCategory()}, []);


  //get all products
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get('/api/v1/product/get-all-product');
      if(data.success)
      {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Getting all products');
    }
  }

  //filter products
  const filterProducts =  (value, id) => {
    let all = [...checked];

    if(value)
    {
      all.push(id);
    }
    else
    {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }

  useEffect(() => {
    if(!checked.length || !radio.length)
    {
      getAllProducts();
    }
  }, [checked.length, radio.length]);


  useEffect(() => {
    if(checked.length || radio.length)
    {
      handleFilter();
    }
  }, [radio, checked]);

  //get filters 
  const handleFilter = async () => {
    try {
      const {data} = await axios.post('/api/v1/product/product-filters',{checked, radio});
      setProducts(data?.products);

    } catch (error) {
      console.log(error);
      toast.error('Error in Setting a filter');
    }
  }

  return (
    <Layout title={"Best Offers"}>
        <div className='row mt-3'>
          <div className='col-md-3'>
            <h5 className='text-center'>Filter By Category</h5>
            <div className='d-flex flex-column'>
            {category?.map((c) => {
              return <Checkbox key={c._id} onChange={(e) => filterProducts(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            })}
            </div>
            
            <h5 className='text-center'>Filter By Rates</h5>
            <div className='d-flex flex-column'>
              {Prices?.map((price) => {
                return <Radio.Group onChange={(e) => {setRadio(e.target.value)}}>
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                </Radio.Group>
              })}
            </div>
            <div className='d-flex flex-column'>
             <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset</button>
            </div>
          </div>
          <div className='col-md-9'>
          {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)}
            <h1 className='text-center'>All Products</h1>
            <div className='d-flex flex-wrap'>
              <div className='d-flex flex-wrap'>
                    {products?.map((p) => {
                       return <div className="card m-1" style={{width: '18rem'}} key={p._id}>
                          <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'2rem'} />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 20)}</p>
                            <p className="card-text">${p.price}</p>
                            <button className='btn btn-primary ms-1'>More Details</button>
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

export default Home