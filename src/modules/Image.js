import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import ImageContext from '../context/image/imageContext';
import views from '../assets/icons/eye.svg';
import upvote from '../assets/icons/up-arrow.svg';

const Image = ({ item, index }) => {
  const imageContext = useContext(ImageContext);
  const { loadAlbum, setLoading, loadComments, setIndex } = imageContext;
  const openAlbum = () => {
    setLoading();
    setIndex(index);
    loadComments(item.id);
    loadAlbum(item.id);
  };
  if (item.images[0].type === 'video/mp4') {
    return (
      <div className='box'>
        <div className='title'>
          <div className='text'>{item.title}</div>
        </div>
        <Link to='/post' onClick={openAlbum} className='container'>
          <video
            src={item.images[0].link}
            className='picture'
            controls
            muted
            loop
          />
        </Link>
        <div className='upvote'>
          <div className='icon baseline'>
            <img className='eye' alt='views:' src={views} />
          </div>
          {item.views}
        </div>
        <div className='downvote'>
          <div className='icon baseline'>
            <img className='eye' alt='upvotes:' src={upvote} />
          </div>
          {item.score}
        </div>
      </div>
    );
  }
  return (
    <div className='box'>
      <div className='title'>
        <div className='text'>{item.title}</div>
      </div>
      <Link to='/post' onClick={openAlbum} className='container'>
        <img src={item.images[0].link} alt='missing item' className='picture' />
      </Link>
      <div className='upvote'>
        <div className='icon baseline'>
          <img className='eye' alt='views:' src={views} />
        </div>
        {item.views}
      </div>
      <div className='downvote'>
        <div className='icon baseline'>
          <img className='eye' alt='upvotes:' src={upvote} />
        </div>
        {item.score}
      </div>
    </div>
  );
};

export default Image;
