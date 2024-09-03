import './Navbar.css';

import navlogo from '../../assets/nav-logo.svg'
import navprofile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return(
    <div className="navbar">
            <img src={navlogo} className="nav-logo" alt="nav-logo" />
            <img src={navprofile} className="nav-profile" alt="nav-logo" />
    </div>
  );
};

export default Navbar;
