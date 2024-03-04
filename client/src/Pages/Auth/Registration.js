import React, {useState} from 'react';
import Layout from '../../Components/layout/Layout';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../Styles/AuthStyle.css";

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [answer, setAnswer] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
        const response = await axios.post('/api/v1/auth/register', {
          name,
          email,
          password,
          phone,
          answer,
          address,
        });
        if(response.data && response.data.success)
        {
          toast.success(response.data.message);
          navigate('/login');
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
    <Layout title={"register - imperial Fahions"}>
        <div className='form-container'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Name' required value={name} onChange={e => setName(e.target.value)} />
             </div>
            <div className="mb-3">
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Email' required value={email} onChange={e => setEmail(e.target.value)} />              
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)}  />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Phone Number' required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Favourite Nummber' required value={answer} onChange={e => setAnswer(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Address' required value={address} onChange={e => setAddress(e.target.value)}  />
            </div>
            <div className="mb-3 form-check">
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        </div>
    </Layout>
  )
}

export default Registration