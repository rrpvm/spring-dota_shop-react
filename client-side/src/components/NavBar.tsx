import { Link } from 'react-router-dom';
import '../styles/navbar.css';
export const NavigationBar = (): JSX.Element => (
  <div className="navbar">
    <div className='navbar-wrapper container'>
      <div className='navbar-logo-container'>
        <Link to={'/'}><h2 className='navbar-logo-text'>Dota 2 Market</h2></Link>
      </div>
      <div className='navbar-action-container'>
        <div className='navbar-action-container-wrapper'>
            <div className='navbar-action-item'><Link to={'/'}><span className='navbar-action-item-link'>buy</span></Link></div>
            <div className='navbar-action-item'><Link to={'/'}><span className='navbar-action-item-link'>profile</span></Link></div>
            <div className='navbar-action-item'><Link to={'/'}><span className='navbar-action-item-link'>cart{}</span></Link></div>
            <div className='navbar-action-item'><Link to={'/'}><span className='navbar-action-item-link'>about</span></Link></div>
        </div>
      </div>
    </div>
  </div>
);