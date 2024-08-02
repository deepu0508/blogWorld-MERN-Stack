import React, { useRef } from 'react'
import "../Style/Cursor.css"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
export default function Cursor() {
    const container = useRef();
    gsap.registerPlugin(useGSAP)
    useGSAP(() => {
        let main = document.querySelector("#main");
        main.addEventListener("mousemove", (e) => {
            gsap.to(".cursor", {
                x:e.x,
                y:e.y,
                duration:0.5,
                ease:"back.out"
            })
        })
    }, { scope: ".cursor" })
    return (
        <>
            <div className="cursor" ref={container}></div>
        </>
    )
}
