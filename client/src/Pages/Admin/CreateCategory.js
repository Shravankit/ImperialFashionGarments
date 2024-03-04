import React, {useEffect, useState} from 'react';
import Layout from '../../Components/layout/Layout';
import AdminMenu from '../../Components/layout/AdminMenu';
import axios from 'axios';
import { Modal } from 'antd';
import toast from 'react-hot-toast';
import CategoryForm from '../../Components/Form/CategoryForm';

const CreateCategory = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  //Modal
  const [visable, setVisable] = useState(false);

  //update
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/v1/category/create-category', {
        name
      });

      if(data?.success)
      {
        toast.success(`${name} is Created`);
        getAllCategories();
        setName('');
      }
      else
      {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Creating Category');
    }
  }

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
  
  useEffect(() => {
    getAllCategories();
  }, []);

  //handle delete
  const handleDelete = async (_id) => {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${_id}`);
      if(data.success)
      {
        toast.success('Category Deleted Succesfully');
        getAllCategories();
      }
      else
      {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Deleting Category')
    }
  }

  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updatedName});
      if(data.success)
      {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisable(false);
        getAllCategories();
      }
      else
      {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error');
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
                <h3>Manage Category</h3>
                <div className='p-3'>
                  <CategoryForm 
                  handleSubmit={handleSubmit} 
                  value={name} 
                  setValue={setName} />
                </div>
                <div className='w-75'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {categories?.map((e) => {
                        return (<>
                        <tr key={e._id}>
                          <td>{e.name}</td>
                          <td>
                            <button type='primary' className='btn btn-primary ms-2' onClick={() => {setVisable(true); setUpdatedName(e.name); setSelected(e)}}>Edit</button>
                            <button type='danger' className='btn btn-danger ms-2' onClick={() => handleDelete(e._id)}>Delete</button>
                          </td>
                        </tr>
                          </>)
                      })}
                  </tbody>
                </table>

                </div>
              </div>
              <Modal onCancel={() => setVisable(false)} footer={null} open={visable}>
                      <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
              </Modal>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CreateCategory