function Alert() {
  return (
    <div className='rounded-md border border-blue-300 p-4 shadow-lg'>
      <div className='flex items-center w-full space-x-4 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='flex-initial text-blue-900 h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z' />
        </svg>
        <p className='flex-auto text-blue-900 font-medium'>New posts have arrived! Click here to refresh.</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='flex-initial text-blue-900 h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </div>
  );
}

export default Alert;
