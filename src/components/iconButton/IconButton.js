
import React from 'react';
import './IconButton.css'

const IconButton = (props) => {

  function clickHandler() {
    !props.disabled && props.onClick && props.onClick();
  }

  function keyDowned(keyboardEvent){
    if(keyboardEvent.keyCode === 13){
      clickHandler();
    }
  }


  return (
    <div
      onClick={clickHandler}
      onKeyDown={keyDowned}
      disabled={props.disabled}
      className="App-Icon-Button"
      title={props.text}
      tabIndex={props.tabIndex ? props.tabIndex : 0}
    >

      {
        props.icon && <img
          src={props.icon}
          alt={props.text}
          height={props.iconHeight}
        />
      }

      {props.text && <span
        style={{
          fontSize: props.fontSize,
          fontFamily: props.fontFamily
        }}>
        {props.text}
      </span>}
    </div>
  );
};

export default IconButton;