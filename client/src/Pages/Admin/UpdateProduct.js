import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from '../../Components/layout/AdminMenu';
import {Select} from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';
import Layout from '../../Components/layout/Layout';
const {Option} = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [photo, setPhoto] = useState('');
  const [id, setId] = useState("");


  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-product/${params.slug}`
      );
      setName(data.oneProduct.name);
      setId(data.oneProduct._id);
      setDescription(data.oneProduct.description);
      setPrice(data.oneProduct.price);
      setPrice(data.oneProduct.price);
      setQuantity(data.oneProduct.quantity);
      setShipping(data.oneProduct.shipping);
      setCategory(data.oneProduct.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

   //handle Create Products
   const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData);
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


  const deleteProduct = async () => {
    try {
      let answer = window.prompt('Are You Sure, You Want to Delete This Product?');
      if(!answer) return;

      const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success(data.message);
      navigate('/dashboard/admin/products');

    } catch (error) {
      console.log(error);
      toast.error('Error in Delete');
    }
  }

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
                <Select variant={false} placeholder='Select a Category' size='large' showSearch className='form-select mb-3' onChange={(value) => {setCategory(value)}} value={category}>
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
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-primary' onClick={updateProduct}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-danger' onClick={deleteProduct}>
                    DELETE PRODUCT
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

export default UpdateProduct