import '../../style/components/navbar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRole } from '../../network/RequestUtility';
import { publicApiRequests } from '../../network/request/PublicApiRequests';
import { useDispatch } from 'react-redux';
export const NavigationBar: React.FC = () => {
  const [isAuthenticated, setAuthenticate] = useState<string>('');
  const dispatch = useDispatch();
  useEffect(() => {
    onDidMount();
  }, []);
  const onDidMount = async () => {
    const result = await getRole();
    try {
      const role: string = result.data.role[0].authority;
      setAuthenticate(role);
      console.log(role);
    }
    catch (e: any) {
      // console.log(e); always(: < 500 status code) e -> undefined
    }
  }
  const onLogOut = () => {
    setAuthenticate('');
    dispatch({ type: "SET_TOKEN", data: '' });
    publicApiRequests.logOut();
  }
  return (
    <div className="navbar">
      <div className='navbar-wrapper container'>
        <div className='navbar-logo-container'>
          <Link to={'/'}><h2 className='navbar-logo-text'>Dota 2 Market</h2></Link>
        </div>
        <div className='navbar-action-container'>
          <div className='navbar-action-container-wrapper'>
            {
              isAuthenticated.length === 0 && <div className='navbar-action-item' ><Link to={'/authorization?sign_up'}><span className='navbar-action-item-link'>sign up</span></Link></div>
            }
            {
              isAuthenticated.length === 0 && < div className='navbar-action-item' ><Link to={'/authorization'}><span className='navbar-action-item-link'>log in</span></Link></div>
            }
            {
              isAuthenticated.length > 0 && <div className='navbar-action-item' onClick={onLogOut}><Link to={'#nothing'}><span className='navbar-action-item-link'>log out</span></Link></div>
            }
            <div className='navbar-action-item'><Link to={'/'}><span className='navbar-action-item-link'>cart{ }</span></Link></div>
            <div className='navbar-action-item'><Link to={'/'}><span className='navbar-action-item-link'>about</span></Link></div>
          </div>
        </div>
      </div>
    </div >
  );
};