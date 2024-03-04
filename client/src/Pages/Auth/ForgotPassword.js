import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [userEmail, setUserEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',{
                email: userEmail,
                answer: answer,
                newPassword: newPassword
            });

            if(res.data && res.data.success)
            {
                toast.success('Password Succesfully');
                navigate('/login');
            }
            else{
                toast.error('Error in Changing Password');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in Changing Password');
        }
    }

  return (
    <Layout>
        <div className='form-container'>
        <form onSubmit={handleChange}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Your Lucky number</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={answer} onChange={e => setAnswer(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword