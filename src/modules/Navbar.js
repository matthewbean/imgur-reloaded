import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ImageContext from '../context/image/imageContext';
import arrow from '../assets/icons/arrow.svg'
const Navbar = () => {
  const imageContext = useContext(ImageContext);
  const { reload, setLoading, clearPage } = imageContext;
  const [state, setState] = useState({
    page1: 'hot',
    page2: 'Popular'
  });

  const onChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const load = () => {
    setLoading();
    clearPage();
    reload(state.page1, state.page2);
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <Link to='/' className='link'>
          IMGUR
        </Link>
      </div>
      <div className='page-selector'>
        <div className='select'>
          <select
            id='page1'
            className='dropdown'
            value={state.page1}
            onChange={onChange}
          >
            <option value='hot'>Most Viral</option>
            <option value='user'>User Submitted</option>
            <option value='top'>Highest Scoring</option>
          </select>
        </div>
        <div className='select'>
          <select
            id='page2'
            className='dropdown'
            value={state.page2}
            onChange={onChange}
          >
            <option value='viral'>Popular</option>
            <option value='time'>Newest</option>
            <option value='top'>Best</option>
            {state.page1 === 'user' && <option value='rising'>Rising</option>}
          </select>
        </div>

        <Link to='/' onClick={load} className='button'>
          <img src={arrow} alt='GO' className='arrow' />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
