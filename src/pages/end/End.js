import React, { useContext } from 'react'
import IconButton from '../../components/iconButton/IconButton'
import './End.css'
import reloadIcon from '../../assets/Icon open-reload.svg'
import { ResizeContext } from '../../contexts/resizeContext'

function End(props) {


  const {isWideScreen} = useContext(ResizeContext)

  function playAgainClicked(){
    props.goAgain && props.goAgain();
  }

  return (
    <div className={`App-EndGame ${isWideScreen ? 'wide-screen' : ''}`}>
      <span className="end__game-name">SCORE : {props.game.gameName}</span>
      <span className="end__game-time">{props.game.gameTime}</span>
      {props.bestGame === props.game.gameName && <span className="end__game-high">New High Score</span>}
      <IconButton 
        onClick={playAgainClicked}
        fontSize={isWideScreen ? '54px' : '25px'}
        text={'PLAY AGAIN'}
        icon={reloadIcon}
        iconHeight={isWideScreen ? '54px' : '25px'}/>
    </div>
  )
}

export default End;
