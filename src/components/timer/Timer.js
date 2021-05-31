import React, { useContext, useEffect, useRef, useState } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import './Timer.css'

let endTimer = false;

const Timer = (props) => {

  const pathRef = useRef();
  const [state, setState] = useState({
    totalTimeInMS: 0,
    startTime: new Date().getTime(),
    circlePath: '',
  })


  const {isWideScreen} = useContext(ResizeContext);

  const TIMER_DIMENSION = isWideScreen ? '257.1' : '180';
  const TIMER_STROKE_WIDTH = isWideScreen? '15' : '10';

  const [pathLength, setPathLength] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);


  useEffect(() => {
    setState({
      ...state,
      circlePath: generateTimerCirclePath(TIMER_DIMENSION, TIMER_STROKE_WIDTH)
    })

    getPathLength();
    endTimer = false;

    runTimer(parseInt(props.timeInSec * 1000), parseInt(props.timeInSec * 1000))

    return()=>{
      endTimer = true;
    }
  // eslint-disable-next-line
  }, [])


  function formatTimeInSec(timeInMS){
    if(timeInMS === null){
      return ''
    }

    return `${parseInt(timeInMS/1000)}:${((timeInMS%1000) + '0').substring(0,2)}`
  }


  function runTimer(timeInMS, totalTimeInMS) {
    if (timeInMS <= 0) {
      onComplete();
      return
    }


    requestAnimationFrame(() => {
      if (endTimer) {
        return;
      }
      const now = new Date().getTime();
      let totalTimeLeft = totalTimeInMS - (now - state.startTime);
      if(totalTimeLeft<0){
        totalTimeLeft = 0;
      }
      
      setTimeLeft(totalTimeLeft)
      runTimer(totalTimeLeft, props.timeInSec * 1000);
    });
  }

  function getPathLength() {
    setTimeout(() => {
      setPathLength(pathRef.current.getTotalLength())
    });
  }


  function onComplete() {
    props.onComplete && props.onComplete();
  }


  function generateTimerCirclePath(timerDimension, strokeWidth) {

    const center = (timerDimension / 2).toFixed(2);
    const radius = ((timerDimension - strokeWidth) / 2).toFixed(2);

    return `M ${center}, ${center} m -${radius}, 0 a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 -${radius * 2},0`
  }


  return (
    <div className="App-Timer">
      <div className="timer_count" style={{
        width: TIMER_DIMENSION+'px',
        height: TIMER_DIMENSION+'px'
      }}>
        <span className="timer_count-text">{formatTimeInSec(timeLeft)}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={TIMER_DIMENSION}
        height={TIMER_DIMENSION}
        fill="transparent"
        viewBox={`0 0 ${TIMER_DIMENSION} ${TIMER_DIMENSION}`}>
        <g>
          <path stroke="#ffffff" strokeWidth={TIMER_STROKE_WIDTH}
            fill="transparent"
            d={state.circlePath}
            opacity="0.3" />
        </g>
        <g>
          <path
            className="timer_circle"
            ref={pathRef}
            stroke="#ff5155"
            strokeWidth={TIMER_STROKE_WIDTH}
            fill="transparent"
            d={state.circlePath}
            opacity="1"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: -pathLength,
              transformOrigin: 'center',
              animation: `time-circle ${props.timeInSec}s linear forwards`
            }}
            transform="rotate(90)"
          />
        </g>
      </svg>
    </div>
  );
};

export default Timer;