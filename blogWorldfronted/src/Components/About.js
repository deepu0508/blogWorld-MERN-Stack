import React, { useEffect } from 'react'
import logo from './Images/logo1.png'
import bw from './Images/bw.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import $ from "jquery"

export default function About() {
    gsap.registerPlugin(useGSAP);
    useGSAP(() => {
        $("#part1").slideUp(10)
        $("#part2").slideUp(10)
        let tl = gsap.timeline({onStart:()=>{$("#part1").slideDown(1000);$("#part2").slideDown(1000);}});
        tl.from(".abt", {
            x: -100,
            duration: 0.5,
            opacity: 0,
            stagger: 0.1
        })
    })

    return (
        <>
            <div className="my-3 mainContainer">
                <div className="container df text-light">
                    <div className="container df flex-column my-3 py-3 rounded about-content">
                        <h1 className="about-head">{String("About").split('').map((i) => { return <span className="abt">{i}</span> })}</h1>
                        <div className="container my-3 p-2 rounded ">
                            <div className="container-sm df flex-wrap-reverse p-0 about-part1">
                                <div className="rounded p-2 m-3 part1-content" id='part1'>Lorem, ipsum dolor sit amet consectetur adipisicing
                                    elit. Aliquid
                                    dolorem, dolores delectus minus cum eius expedita repellendus incidunt. Labore consequuntur
                                    molestiae sint quae dolore ad, ipsam mollitia eaque ratione officiis iusto. Assumenda nihil
                                    esse vero tempora dignissimos nemo dolorem aspernatur, perspiciatis animi modi doloremque
                                    non facere cupiditate cum consectetur necessitatibus harum suscipit inventore aliquid iure?
                                    Tenetur non inventore enim autem. Facere, mollitia ab cumque qui quasi dolores, vitae sit
                                    ipsum perferendis ad minus quas eius dicta nemo odit! Nam cupiditate officiis tempora
                                    architecto repellendus molestiae nobis eius amet veritatis velit temporibus beatae provident
                                    non quisquam, repudiandae dignissimos. Itaque, quod sunt?</div>
                                <div className="part1-img">
                                    <img src={logo} alt="" className="rounded" />
                                </div>
                            </div>
                            <div className="container-sm df flex-wrap p-0 about-part1">
                                <div className="part1-img">
                                    <img src={bw} alt="" className="rounded" />
                                </div>
                                <div className="rounded p-2 m-3 part1-content" id='part2'>Lorem, ipsum dolor sit amet consectetur adipisicing
                                    elit. Aliquid
                                    dolorem, dolores delectus minus cum eius expedita repellendus incidunt. Labore consequuntur
                                    molestiae sint quae dolore ad, ipsam mollitia eaque ratione officiis iusto. Assumenda nihil
                                    esse vero tempora dignissimos nemo dolorem aspernatur, perspiciatis animi modi doloremque
                                    non facere cupiditate cum consectetur necessitatibus harum suscipit inventore aliquid iure?
                                    Tenetur non inventore enim autem. Facere, mollitia ab cumque qui quasi dolores, vitae sit
                                    ipsum perferendis ad minus quas eius dicta nemo odit! Nam cupiditate officiis tempora
                                    architecto repellendus molestiae nobis eius amet veritatis velit temporibus beatae provident
                                    non quisquam, repudiandae dignissimos. Itaque, quod sunt?</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
