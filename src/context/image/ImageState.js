import React, { useReducer } from 'react';
import imageReducer from './imageReducer';
import ImageContext from './imageContext';
import {
  RELOAD,
  LOAD_ALBUM,
  SET_LOADING,
  CLEAR_PAGE,
  LOAD_COMMENTS,
  SET_INDEX
} from './types';

const config = require('../../config/default.json');

const ImageState = props => {
  const initialState = {
    data: null,
    loading: true,
    current: [],
    index: null,
    comments: []
  };
  const [state, dispatch] = useReducer(imageReducer, initialState);

  //reload
  const reload = (page1 = 'hot', page2 = 'viral') => {
    
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Client-ID ${config.userName}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(
      `https://api.imgur.com/3/gallery/${page1}/${page2}/day/1?showViral=false&mature=true&album_previews=false`,
      requestOptions
    )
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => res.data)
      .then(res => res.filter((item, i) => item.images && i <= 100))
      .then(res =>
        dispatch({
          type: RELOAD,
          payload: res
        })
      )
      .catch(error => console.log('error', error));
  };
  //start loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };
  //clear page.
  const clearPage = () => {
    dispatch({
      type: CLEAR_PAGE
    });
  };

  //set index for going to next album
  const setIndex = index => {
    dispatch({
      type: SET_INDEX,
      payload: index
    });
  };

  //load album
  const loadAlbum = (id, index) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Client-ID ${config.userName}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`https://api.imgur.com/3/album/${id}`, requestOptions)
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res =>
        dispatch({
          type: LOAD_ALBUM,
          payload: res.data
        })
      )
      .catch(error => console.log('error', error));
  };

  //load comments
  const loadComments = id => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Client-ID 5bf5749f2993b59');

    var formdata = new FormData();
    formdata.append(
      'access_token',
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwMmZkODgwOTNmNTQ2Mjg1MDY2YTNmNGQxNGNiMzBhZTZhY2MyM2YifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhdWQiOiI4NDEzNTkzNTM5ODgtcml0aWhjNDRhdjVwZGwydTBlZWticWI3NzlvaGg2Ym4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY3OTQ2NzEyMzA5MjA4NTQ0MTUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODQxMzU5MzUzOTg4LThiMzVsNWFwZTFuYzdyYzR0cm9pYWpqbHRwbWI5cXFkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJkcGFzdHVzZWtAZ21haWwuY29tIiwiaWF0IjoxNDU1MTQwMDQyLCJleHAiOjE0NTUxNDM2NDIsIm5hbWUiOiJEYW4gUGFzdHVzZWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0yMXV3LVVaMmttMC9BQUFBQUFBQUFBSS9BQUFBQUFBQUZsdy9QcjVLdDdVckxaay9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiRGFuIiwiZmFtaWx5X25hbWUiOiJQYXN0dXNlayIsImxvY2FsZSI6ImVuIn0.DcCxKOoMHVUBIppiJDBqLMPUoJk_FMv9RAQNl8mh7HNia3iq5jQCNIea0h3B6-akf7vxfp__b4f3N59qnOcmd4zdAYCT7zO5YubHhyeoOXENwueoTbKzexoNmZMPDZUrKqj-4sAqscHuiJmT2Nwwkdu2g8cFxI0-TpQVHAspJJJ5r_oMP45kdeRpwYV2R7Azct-vYs6QxQaQMn6_azm9Va7HckEop4my8wMoCfAbF1gDiB-JNW63QSzBFBK7SMNXOcrkssoGP3zXdfqjIdU1MK3Wx6i8zqEiV1IrI8XglvWnhIO7z0R_8AAG37DruKNg3HtGRgNtt0grE48ELnQ-zA'
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api.imgur.com/3/gallery/${id}/comments/top`, requestOptions)
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res =>
        dispatch({
          type: LOAD_COMMENTS,
          payload: res.data
        })
      )
      .catch(error => console.log('error', error));
  };

  return (
    <ImageContext.Provider
      value={{
        data: state.data,
        loading: state.loading,
        index: state.index,
        current: state.current,
        comments: state.comments,
        reload,
        setIndex,
        loadAlbum,
        setLoading,
        clearPage,
        loadComments
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageState;
