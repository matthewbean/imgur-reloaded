import React, { useContext } from 'react';
import ImageContext from '../context/image/imageContext';
import Comments from '../modules/Comments';

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
    setIndex
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
    return <div className='loading'>LOADING</div>;
  }

  return (
    <div className='album-page'>
      <div className='album'>
        <div className='controls'>
          <button onClick={previous}>Previous</button>
          <button onClick={next}>Next</button>
        </div>
        <div className='album-title'>{current.title}</div>
        {current.images.map(item =>
          item.type === 'video/mp4' ? (
            <div key={item.id}>
              <video
                src={item.link}
                key={item.id}
                className='album-image'
                controls
                muted
                loop
              />
              <p className='album-description'>{item.description}</p>
            </div>
          ) : (
            <div key={item.id}>
              <img className='album-image' alt='missing item' src={item.link} />
              <p className='album-description'>{item.description}</p>
            </div>
          )
        )}
      </div>
      <Comments />
    </div>
  );
};

export default Current;
