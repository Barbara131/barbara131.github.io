import React from 'react'
import './ball.css'
import { useState } from 'react'

const Ball = () => {
    const [currentPosition, setCurrentPosition] = useState(-20);
    const [currentStyle, setStyle] = useState({ transform: 'translateX(20px)' });
    // const calTrans = () => {
    //     let position = 0;
    // }
    const onClick = (al) => {
        // debugger
        if (al === 'prev') {
            // let str = `translateX(${currentPosition}px)`;
            setCurrentPosition(currentPosition - 40)
        }
        // debugger
        if (al === 'nxt') {
            setCurrentPosition(currentPosition + 40)
        }

        let str = `translateX(${currentPosition}px)`;
        setStyle({ transform: str })
    }

    return (
        <div>
            <div className="color">
                <button className="btn prev" onClick={() => onClick('prev')}>previous</button>
                <div className="balls" style={currentStyle}>

                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <button className="btn nxt" onClick={() => onClick('nxt')
                }>next</button>
            </div>
        </div>
    )
}

export default Ball
