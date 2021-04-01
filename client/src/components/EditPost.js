import React, {useEffect} from 'react';
import PostEntry from './PostEntry'

function EditPost(props) {
  let values = {
    title: null,
    imageLink: null,
    link: null,
    subject: null,
  }

  useEffect(() => {
    // TODO: get values of post from server side
    // values.title = ...
  }, []);

  const handleSubmit = (title, image, link, subject) => {
    // TODO: handle new post on server side
    return props.history.push('/');
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center my-5'>
        <PostEntry submitAction={handleSubmit} title={values.title} imageLink={values.imageLink} link={values.link}
                   subject={values.subject} edit={true}>
          Edit Post
        </PostEntry>
      </div>
    </>
  );
}

export default EditPost;