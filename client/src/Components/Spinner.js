import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path = 'login'}) => {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => {
                if (prevValue === 0) {
                    clearInterval(interval); // Clear the interval when count reaches 0
                    navigate(`/${path}`, 
                    {state: location.pathname,}
                    );
                    return prevValue;
                }
                return prevValue - 1;
            });
        }, 1000);

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [navigate, location, path, count]);
  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:'100vh'}}>
        <h1 className='text-center'>redirecting to you in {count} seconds</h1>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

    </>
  )
}

export default Spinner