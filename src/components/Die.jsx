import { useState } from 'react'
import './Die.css'

export default function Die(props) {
    const dotsElement = getDots()

    function getDots() {
        switch(props.value) {
            case 1: return <span className="one dot"></span>
            case 2: return (
                    <div className="two">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
            )
            case 3: return (
                <div className="three">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            )
            case 4: return (
                <div className="four">
                    <div className="kolona">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="kolona">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            )
            case 5: return (
                <div className="five">
                    <div className="kolona">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="kolona">
                        <span className="dot"></span>
                    </div>
                    <div className="kolona">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            )
            case 6: return (
                <div className="six">
                    <div className="kolona">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="kolona">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            )
        }
    }

    return (
        <div
            onClick={props.holdDice}
            className={props.isHeld ? "die-face die-face-isHeld": "die-face"}
        >
            {dotsElement}
        </div>
    )
}