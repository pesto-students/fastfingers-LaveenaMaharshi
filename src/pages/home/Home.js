import React, { useContext, useState } from 'react'
import IconButton from '../../components/iconButton/IconButton'
import LineText from '../../components/lineText/LineText'
import './Home.css'
import logo from './../../assets/Icon awesome-keyboard.svg'
import Input from '../../components/input/Input'
import Dropdown from '../../components/dropdown/Dropdown'
import playIcon from '../../assets/Icon awesome-play.svg'
import { ResizeContext } from '../../contexts/resizeContext'

function Home(props) {

  const [state, setState] = useState({ name: '', difficultyLevel: {} })
  const {isWideScreen} = useContext(ResizeContext);

  function startGame() {
    props.startGame && props.startGame(state.name, state.difficultyLevel);
  }

  function onDifficultyLevelChange(difficultyLevel){
    setState({
      ...state,
      difficultyLevel: {...difficultyLevel}
    })
  }

  function onInputKeyUp(name){
    setState({
      ...state,
      name: name.toUpperCase()
    })
  }


  return (
    <div className={`App-Home ${isWideScreen ? 'wide-screen': ''}`}>
      <img className="App-logo" src={logo} alt={props.app.name}/>
      <span className="App-name">{props.app.name}</span>
      <LineText className="App-tag" text={props.app.tag} />
      <Input onKeyUp={onInputKeyUp} placeholder={'Type Your Name'} tabIndex={0}/>
      <Dropdown default={{ text: 'DIFFICULTY LEVEL' }}
        options={props.difficultyLevels} 
        onChange={onDifficultyLevelChange}
        tabIndex={0}
        />

      <IconButton 
        onClick={startGame}
        icon={playIcon}
        fontSize={isWideScreen ? '48px' : '24px'}
        iconHeight={isWideScreen ? '71px' : '35px'}
        text={'Start Game'} 
        tabIndex={0}
        disabled={!state.name || !state.difficultyLevel.difficultyFactor}
        />
    </div>
  )
}


export default Home;