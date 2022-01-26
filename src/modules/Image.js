import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import ImageContext from '../context/image/imageContext';
import { FaEye } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import styles from './Image.module.css'


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
      <div className={styles.box}>
        <div className={styles.title}>
          <div className={styles.text}>{item.title}</div>
        </div>
        <Link to='/post' onClick={openAlbum} className={styles.container}>
          <video
            src={item.images[0].link}
            className={styles.picture}
            controls
            muted
            loop
          />
        </Link>
        <div className={styles.stats}>
          <div className={styles.statIcon}>
            <FaComments />
            {item.comment_count}
          </div>
          <div className={styles.statIcon}>
            <FaEye />
            {item.views}
          </div>
          <div className={styles.statIcon}>
            <FaArrowUp />
            {item.score}
          </div>
        </div>
      
      </div>
    );
  }
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <div className={styles.text}>{item.title}</div>
      </div>
      <Link to='/post' onClick={openAlbum} className={styles.container}>
        <img src={item.images[0].link} alt='missing item' className={styles.picture} />
      </Link>
      <div className={styles.stats}>
        <div className={styles.statIcon}>
            <FaComments />
            {item.comment_count}
        </div>
        <div className={styles.statIcon}>
          <FaEye />
          {item.views}
        </div>
        <div className={styles.statIcon}>
          <FaArrowUp />
          {item.score}
        </div>
      </div>
    </div>
  );
};

export default Image;
