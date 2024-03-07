import React from 'react';
import { useSearch } from '../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SearchForm = () => {
    const [value, setValue] = useSearch();

    const navigate = useNavigate();

    const handleSearch = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.get(`/api/v1/product/product-search/${value.keyword}`);
            setValue({...value, results: data});
            navigate('/search');
        } catch (error) {
            console.log(error);
            toast.error('Error in Search Function')
        }
    }
  return (
    <>
       <div className="container-fluid">
            <form className="d-flex" onSubmit={handleSearch}>
                <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search"  
                value={value.keyword} 
                onChange={(e) => {setValue(
                    {
                        ...value, 
                        keyword: e.target.value
                    })}} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>

    </>
  )
}

export default SearchForm