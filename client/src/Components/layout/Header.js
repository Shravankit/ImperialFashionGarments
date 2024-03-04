import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

const Header = () => {

  // const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    })
    toast.success('logged out Succesfully');
    setTimeout(() => {
      localStorage.removeItem('auth');
    }, 500);
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <NavLink className="navbar-brand" to='/'><img src={'/images/logo.png'} alt='logo' style={{height: '30px', width: '50px'}}/>  Imperial Fashions </NavLink>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to='/'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to='/category'>Catagory</NavLink>
        </li>
        {
          !auth.user ? (
            <>
            <li className="nav-item">
              <NavLink className="nav-link" to='/register'>Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/login'>Login</NavLink>
            </li>
            </>
          ) : (
            <>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {auth.user.name}
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">Dashboard</NavLink></li>
                <li><NavLink to='/login' className="dropdown-item" onClick={handleLogout}>Logout</NavLink></li>
              </ul>
            </li>
            </>
          )
        }
        <li className="nav-item">
          <NavLink className="nav-link" to='/cart'>Cart (0)</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header