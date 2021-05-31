import React, { useContext } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import './LineText.css'
const LineText = (props) => {


  const {isWideScreen} = useContext(ResizeContext);

  return (
    <div className={`App-line-text ${props.className} ${isWideScreen ?'wide-screen' :  ''}`}>
      <span className="line"></span>
      <span className="text">{props.text}</span>
      <span className="line"></span>
    </div>
  );
};

export default LineText;