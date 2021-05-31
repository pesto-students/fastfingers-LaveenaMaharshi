import React, { useContext, useRef } from 'react'
import { ResizeContext } from '../../contexts/resizeContext';
import './Input.css'

function Input(props) {
  const inputRef = useRef();

  const {isWideScreen} = useContext(ResizeContext)


  function onKeyUpHandler() {
    const currentValue = inputRef.current.value
    props.onKeyUp && props.onKeyUp(currentValue);
  }

  return (
    <input
      className={`App-Input ${isWideScreen ? 'wide-screen' : ''} `}
      ref={inputRef}
      tabIndex={props.tabIndex}
      placeholder={props.placeholder}
      onKeyUp={onKeyUpHandler}
      type="text"
      style={props.style}
      autoFocus
       />
  )
}


export default Input;
