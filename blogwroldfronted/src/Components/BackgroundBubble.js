import React from 'react'

export default function BackgroundBubble() {
    return (
        <>
            <div className="d-flex justify-content-center bg-dark text-light align-items-center main">
                <div className="df submain align-items-end">
                    <div className="box box1" style={{ '--i': 1 }}></div>
                </div>
                <div className="df submain align-items-end justify-content-start">
                    <div className="box box2" style={{ '--i': 6 }}></div>
                </div>
                <div className="df submain align-items-center justify-content-start">
                    <div className="box box3" style={{ '--i': 4 }}></div>
                </div>
                <div className="df submain align-items-center justify-content-center">
                    <div className="box box4" style={{ '--i': 2 }}></div>
                </div>
                <div className="df submain align-items-center justify-content-end">
                    <div className="box box5" style={{ '--i': 5 }}></div>
                </div>
                <div className="df submain align-items-start">
                    <div className="box box6" style={{ '--i': 3 }}></div>
                </div>
            </div>
        </>
    )
}
