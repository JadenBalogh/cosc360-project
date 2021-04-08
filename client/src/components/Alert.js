import { useState, useEffect } from 'react';

// Variants: info, error, success
function Alert({ children, visible = false, variant = 'info', callback = () => {} }) {
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [borderColor, setBorderColor] = useState('border-blue-300');
  const [textColor, setTextColor] = useState('text-blue-900');
  const [displayIcon, setDisplayIcon] = useState(<LightBulbIcon />);
  const [navIcon, setNavIcon] = useState(<ArrowRightIcon />);

  useEffect(() => {
    switch (variant) {
      default:
      case 'info':
        setBackgroundColor('bg-white');
        setBorderColor('border-blue-300');
        setTextColor('text-blue-900');
        setDisplayIcon(<LightBulbIcon />);
        setNavIcon(<ArrowRightIcon />);
        break;
      case 'error':
        setBackgroundColor('bg-red-100');
        setBorderColor('border-red-300');
        setTextColor('text-red-900');
        setDisplayIcon(<ExclamationIcon />);
        setNavIcon(<XIcon />);
        break;
      case 'success':
        setBackgroundColor('bg-green-100');
        setBorderColor('border-green-300');
        setTextColor('text-green-900');
        setDisplayIcon(<SparklesIcon />);
        setNavIcon(<CheckIcon />);
        break;
    }
  }, [variant]);

  return (
    <div className={`${!visible && 'hidden'} rounded-md border ${backgroundColor} ${borderColor} p-4 shadow-lg`}>
      <div className='flex items-center w-full space-x-4 cursor-pointer' onClick={callback}>
        {displayIcon}
        <p className={`flex-auto ${textColor} font-medium`}>{children}</p>
        {navIcon}
      </div>
    </div>
  );
}

function LightBulbIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`flex-initial text-blue-900 h-5 w-5`}
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path d='M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z' />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`flex-initial text-blue-900 h-5 w-5`}
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function ExclamationIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`flex-initial text-red-900 h-5 w-5`}
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`flex-initial text-red-900 h-5 w-5`}
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`flex-initial text-green-900 h-5 w-5`}
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z'
        clipRule='evenodd'
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`flex-initial text-green-900 h-5 w-5`}
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
        clipRule='evenodd'
      />
    </svg>
  );
}

export default Alert;
