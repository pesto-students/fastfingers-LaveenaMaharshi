import React, { useEffect, useState } from 'react';
import debounceFunc from '../utils/debounce';

export const ResizeContext = React.createContext({ width: -1, isWideScreen: false });

const ResizeContextProvider = (props) => {

  const [state, setState] = useState({
    width: -1,
    isWideScreen: false
  })

  useEffect(() => {

    setState({
      width: window.innerWidth,
      isWideScreen: window.innerWidth > 750
    })

    const debouncedHandler = debounceFunc(handlerResize);
    window.addEventListener('resize', debouncedHandler);

    return () => {
      window.removeEventListener('resize', debouncedHandler);
    }
  }, [])


  function handlerResize(resizeEvent) {
    setState({
      width: window.innerWidth,
      isWideScreen: window.innerWidth > 750
    })
  }




  return (
    <ResizeContext.Provider value={{ width: state.width, isWideScreen: state.isWideScreen }}>
      {props.children}
    </ResizeContext.Provider>
  );
};

export default ResizeContextProvider;