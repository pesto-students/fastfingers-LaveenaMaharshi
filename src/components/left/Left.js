import React, { useContext } from 'react';
import IconButton from '../iconButton/IconButton';
import ScoreBoard from '../scoreboard/ScoreBoard';
import './Left.css'
import playerIcon from '../../assets/Icon material-person.svg';
import levelIcon from '../../assets/Icon awesome-gamepad.svg';
import crossIcon from '../../assets/Icon metro-cross.svg';
import { ResizeContext } from '../../contexts/resizeContext';


const Left = (props) => {

  const {isWideScreen} = useContext(ResizeContext)

  function stopGameClicked(){
    props.end && props.end();
  }


  function quitGameClicked(){
    props.end && props.quit();
  }


  function calculateLevel(){

    let difficultyFactor = props.difficultyFactor;

    if(!difficultyFactor){
      difficultyFactor = props.startGameDifficultyFactor
    }

     //! refactor: use levels object instead
    if (props.difficultyFactor < 1.5){
      return 'EASY'
    }

    if (props.difficultyFactor >= 1.5 && props.difficultyFactor < 2 ) {
      return 'MEDIUM'
    }

    if (props.difficultyFactor >= 2) {
      return 'HARD'
    }
  }

  return (
    <div className={`App-left__panel ${isWideScreen ? 'wide-screen' : ''}`}>
      <div className="game-details">
        <IconButton 
          disabled={true}
          fontSize={isWideScreen ? '44px' : '22px'}
          iconHeight={isWideScreen ? '40px' : '20px'}
          text={props.playerName}
          icon={playerIcon}/>

        <IconButton 
          disabled={true}
          fontSize={isWideScreen ? '44px' : '22px'}
          iconHeight={isWideScreen ? '40px' : '10px'}
          text={calculateLevel()}
          icon={levelIcon} />
      </div>
      <div className="score-card-container">
        {props.screen === 'game' && isWideScreen && <ScoreBoard scores={props.previousGames} bestGame={props.bestGame} />}
      </div>
      <div className="game-end">
        {props.screen === 'game' && 
        <IconButton
         onClick={stopGameClicked}
        text={'STOP'}
        fontSize={isWideScreen ? '47px' : '24px'}
        icon={crossIcon}
          iconHeight={isWideScreen ? '70px' : '35px'}/>}
        
        {props.screen === 'end' &&
        <IconButton 
          onClick={quitGameClicked}
          fontSize={isWideScreen ? '57px' : '24px'}
          text={'QUIT'} />}
      </div>
    </div>
  );
};

export default Left;