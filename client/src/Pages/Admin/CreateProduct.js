import React, { useEffect, useState } from 'react';
import Layout from '../../Components/layout/Layout';
import AdminMenu from '../../Components/layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
// import ProductForm from '../../Components/Form/ProductForm';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';

const {Option} = Select;

const CreateProduct = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [photo, setPhoto] = useState('');

  //handel get all Products
  // const hanndleProducts = async () => {
  //   try {
  //     const {data} = await axios.get('/api/v1/product/get-all-product');
  //     if(data.success)
  //     {
  //       toast.success(data.message);
  //       setProducts(data.products)
  //     }
  //     else
  //     {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Error in Getting Products');
  //   }
  // }

  //handle Create Products
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const {data} = await axios.post('/api/v1/product/create-product', productData);
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.success("Product Created");
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Creating Product');
    }
  }

  //handle get all categories
  const getAllCategories = async () => {
    try {
        const {data} = await axios.get('/api/v1/category/categories');
        if(data.success)
        {
          setCategories(data.categories);
          toast.success(data.message);
        }
    } catch (error) {
      console.log(error);
      toast.error('Error in Fetching Categories')
    }
  }

  useEffect(() => {getAllCategories()}, []);


  return (
    <Layout>
         <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
              <h3>Create Products</h3>
                {/* <div className='p-3'>
                  <ProductForm  />
                </div> */}
              <div className='w-75 m-1'>
                <Select variant={false} placeholder='Select a Category' size='large' showSearch className='form-select mb-3' onChange={(value) => {setCategory(value)}}>
                  {categories?.map((e) => {
                    return <Option key={e._id} value={e._id}>
                      {e.name}
                    </Option>
                  })}
                </Select>
                <div className='mn-3'>
                  <label className='btn btn-outline-secondary col-md-12'>
                    {photo ? photo.name : "Upload Photo"}
                    <input type='file' name='photo' accept='image/*' onChange={(e) => {setPhoto(e.target.files[0])}} hidden/>
                  </label>
                </div>
                <div className='mb-3'>
                  {photo && <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt='product' height={'200px'} className='img img-responsive'/>
                  </div>}
                </div>
                <div className='mb-3'>
                  <input value={name} placeholder='Product Name' className='form-control' onChange={(e) => {setName(e.target.value)}} />
                </div>
                <div className='mb-3'>
                  <textarea value={description} placeholder='Product Description' className='form-control' onChange={(e) => {setDescription(e.target.value)}} />
                </div>
                <div className='mb-3'>
                  <input type='number' value={price} placeholder='Product Price' className='form-control' onChange={(e) => {setPrice(e.target.value)}} />
                </div>
                <div className='mb-3'>
                  <input type='number' value={quantity} placeholder='Product Quantity' className='form-control' onChange={(e) => {setQuantity(e.target.value)}} />
                </div>
                <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-primary' onClick={createProduct}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CreateProduct