import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import $ from 'jquery'

export default function Contact() {
    gsap.registerPlugin(useGSAP);
    const contactContainer = useRef();

    useGSAP(() => {
        let tl = gsap.timeline();
        tl.from(".cnt", {
            y:-100,
            opacity: 0,
            duration: 1,
            ease:"elastic.out",
            stagger:{from:"random", amount:0.2}
        })
        tl.from(".inp", {
            y: -100,
            opacity: 0,
            scale: 1,
            duration: 0.8,
            stagger: { from: "random", amount: 0.2 },
            ease:"bounce.out"
        })
        tl.from(".inp-btn",{
            x:-150,
            opacity:0,
            scale:1,
            duration:0.8,
            ease:"bounce.out"
        })
    }, { scope: contactContainer });
    return (
        <>
            <div className="my-3 mainContainer" ref={contactContainer}>
                <div className="container df text-light">
                    <div className="df flex-column my-3 py-3 rounded contact-page">
                        <h1 className="contact-head">{String("Contact").split('').map((i) => { return <span className="cnt">{i}</span> })}</h1>
                        <form action="" className='contact-form'>
                            <div className="mb-3 inp">
                                <label htmlFor="contact-name" className="form-label">Enter Name</label>
                                <input type="email" className="form-control" id="contact-name" placeholder="Enter name" />
                            </div>
                            <div className="mb-3 inp">
                                <label htmlFor="contact-email" className="form-label">Enter Email address</label>
                                <input type="email" className="form-control" id="contact-email" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3 inp">
                                <label htmlFor="contact-txt" className="form-label">Enter Text</label>
                                <textarea className="form-control" id="contact-txt" rows="3" placeholder='Enter some here...'></textarea>
                            </div>
                            <div className="mb-3 df justify-content-end inp-btn">
                                <button className="btn btn-info contact-btn" type="submit" id="contact">Send →</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
