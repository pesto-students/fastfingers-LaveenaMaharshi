import React, { useContext } from 'react';
import homeIcon from '../../assets/Icon awesome-home.svg'
import { ResizeContext } from '../../contexts/resizeContext';
import IconButton from '../iconButton/IconButton';
import './Right.css'

const Right = (props) => {

const {isWideScreen} = useContext(ResizeContext);


  function homeIconClicked(){
    if(window.confirm('Home Sick So Soon?')){
      props.goHome && props.goHome();
    }
  }

  return (
    <div className={`App-right__panel ${isWideScreen ? 'wide-screen' : ''}`}> 
      <span>FAST FINGERS</span>
      <IconButton icon={homeIcon} iconHeight={isWideScreen ? '66px': '30px'} onClick={homeIconClicked} />
    </div>
  );
};

export default Right;