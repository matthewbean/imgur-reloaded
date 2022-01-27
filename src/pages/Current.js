import React, { useContext } from "react";
import ImageContext from "../context/image/imageContext";
import Comments from "../modules/Comments";
import loader from "../assets/icons/loader.svg";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./Current.module.css";
const Current = () => {
  const imageContext = useContext(ImageContext);
  const {
    data,
    current,
    loading,
    index,
    loadAlbum,
    loadComments,
    setLoading,
    setIndex,
  } = imageContext;

  const next = () => {
    setLoading();
    setIndex(index + 1);
    loadAlbum(data[index + 1].id);
    loadComments(data[index + 1].id);
  };
  const previous = () => {
    setLoading();
    setIndex(index + 1);
    loadAlbum(data[index - 1].id);
    loadComments(data[index - 1].id);
  };

  if (loading === true) {
    return <div className='loading'>
      <img src={loader} alt="Loading" />
    </div>;
  }

  return (
    <div className={styles.albumPage}>
      <div className={styles.controls}>
        <button onClick={previous}>
          <FaChevronLeft />
        </button>
        <button onClick={next}>
          <FaChevronRight />
        </button>
      </div>
      <div className={styles.album}>
        <div className={styles.albumTitle}>{current.title}</div>
        {current.images.map((item) =>
          item.type === "video/mp4" ? (
            <div key={item.id}>
              <video
                src={item.link}
                key={item.id}
                className={styles.albumImage}
                controls
                muted
                loop
              />
              <p className={styles.albumDescription}>{item.description}</p>
            </div>
          ) : (
            <div key={item.id}>
              <img
                className={styles.albumImage}
                alt="missing item"
                src={item.link}
              />
              <p className={styles.albumDescription}>{item.description}</p>
            </div>
          )
        )}
        <Comments />
      </div>
    </div>
  );
};

export default Current;
