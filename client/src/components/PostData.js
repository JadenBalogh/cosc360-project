import React, {useState, useEffect} from 'react';
import axios from "axios";
import {authenticationService} from "../_services";
import {authHeader, history, toBase64} from "../_helpers";

function PostData(props) {
  const postId = props.match.params.id || null;
  const user = authenticationService.currentUserValue;

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [link, setLink] = useState('');
  const [body, setBody] = useState('');

  const postURL = `${process.env.REACT_APP_HOST || ''}/feed/get-post`;
  const editURL = `${process.env.REACT_APP_HOST || ''}/feed/edit-post`;
  const publishURL = `${process.env.REACT_APP_HOST || ''}/feed/publish-post`;

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]);

  useEffect(() => {
    if (props.edit) {
      axios
        .get(postURL, {
          params: {
            id: postId
          }
        })
        .then((res) => {
          setTitle(res.data.title || '');
          setImage(res.data.image || null);
          setLink(res.data.link || '');
          setBody(res.data.body || '');
        })
        .catch((err) => {
          // TODO: display error through banner and redirect
          console.log(err);
        });
    }
  }, [postId, postURL, props.edit]);

  const updatePreview = (input) => {
    const files = input.target.files;
    if (files.length === 0)
      return false;
    else {
      for (const image of files) {
        toBase64(image, setImage);
        setImageSrc(URL.createObjectURL(image))
        setImageTitle(image.name);
      }
      return true;
    }
  }

  const resetPreview = () => {
    setImage(undefined);
    setImageSrc('');
    setImageTitle('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.edit) {
      axios
        .put(editURL, {
          title: title,
          image: image,
          link: link,
          body: body,
          id: postId
        }, {
          headers: authHeader(),
        })
        .then((res) => {
          return props.history.push(`/view/${postId}`);
        })
        .catch((err) => {
          // TODO: display error through banner
          console.log(err);
        });
    } else {
      axios
        .post(publishURL, {
          title: title,
          image: image,
          link: link,
          body: body
        }, {
          headers: authHeader(),
        })
        .then((res) => {
          return props.history.push(`/view/${res.data.id}`);
        })
        .catch((err) => {
          // TODO: display error through banner
          console.log('post');
          console.log(err);
        });
    }
  }

  return (
    <div className='container max-w-3xl md:bg-white md:border border-gray-300 md:rounded-2xl p-6'>
      <h1 className='text-2xl font-medium w-full text-center text-black'>
        {props.children}
      </h1>
      <form
        className='flex flex-col'
        onSubmit={handleSubmit}
      >
        <label htmlFor='title' className='text-xs font-medium mt-5'>Title</label>
        <input
          type='title'
          id='title'
          name='title'
          placeholder='Title'
          value={title}
          onChange={event => setTitle(event.target.value)}
          className='shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-3'
          required={true}
        />
        <label htmlFor='link' className='text-xs font-medium mt-5'>Link/Image</label>
        <div className='flex flex-row flex-nowrap'>
          <input
            type='url'
            id='link'
            name='link'
            placeholder='Link'
            value={imageTitle || link}
            onChange={event => setLink(event.target.value)}
            className='shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-3'
            disabled={imageSrc || props.edit}
          />
          <label
            className={`flex flex-row flex-nowrap justify-center items-center border border-gray-300 rounded ${props.edit ? 'bg-gray-400 text-gray-700' : 'bg-gray-200 cursor-pointer hover:bg-gray-300 text-black'} py-2 px-3 mt-3 ml-3 focus:outline-none`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='h-5'>
              <path fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"/>
            </svg>
            <span className='text-base font-medium'>Upload</span>
            <input
              type='file'
              id='img'
              name='img'
              accept='image/*'
              onChange={updatePreview}
              className='opacity-0 w-0'
              disabled={props.edit}
            />
          </label>
        </div>
        {imageSrc && <div className='relative mt-5'>
          {props.edit ||
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               className='h-6 absolute top-2 right-2 text-white rounded-full bg-gray-700 p-1 hover:bg-gray-800 cursor-pointer shadow-2xl'
               onClick={resetPreview}
          >
            <path fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"/>
          </svg>
          }
          <img src={imageSrc} alt='Uploaded preview' className='w-full h-48 object-cover rounded shadow-md'/>
        </div>}
        <label htmlFor='subject' className='text-xs font-medium mt-5'>Subject</label>
        <textarea
          id='subject'
          name='subject'
          placeholder='Subject'
          value={body}
          onChange={event => setBody(event.target.value)}
          className='shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring mt-3 h-48'
          required={true}
        />
        <input
          type='submit'
          value='Publish Post'
          className='bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none text-white shadow-md text-lg hover:bg-gray-700 p-2 mt-10 rounded'
        />
      </form>
    </div>
  );
}

export default PostData;