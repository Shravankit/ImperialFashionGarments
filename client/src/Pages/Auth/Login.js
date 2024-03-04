import React, {useState} from 'react';
import Layout from '../../Components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Components/context/authContext';



const Login = () => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
   try {
    const response = await axios.post('/api/v1/auth/login', {
      email: userEmail,
      password: userPassword,
    });
    if(response.data && response.data.success)
    {
      toast.success(response.data.message);
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem('auth', JSON.stringify(response.data));
      setTimeout(() => {
        navigate(location.state ||'/');
      }, 500);
    }
    else
    {
      toast.error(response.data.message);
    }
   } catch (error) {
    console.log(error);
    toast.error("Error in submition");
   }
}


  return (
    <Layout title={"login - imperialFashions"}>
        <div className='form-container'>
        <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <div className='mb-3'>
              <button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>Forgot Password</button>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>
  )
}

export default Login