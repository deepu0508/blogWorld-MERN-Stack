import React from 'react'
import logo from './Images/logo1.png'
import bw from './Images/bw.png'

export default function About() {
  return (
    <>
      <div className="my-3 mainContainer">
        <div className="container df text-light">
            <div className="container df flex-column my-3 py-3 rounded about-content">
                <h1 className="about-head">About</h1>
                <div className="container my-3 p-2 rounded ">
                    <div className="container-sm df flex-wrap-reverse p-0 about-part1">
                        <div className="rounded p-2 m-3 part1-content">Lorem, ipsum dolor sit amet consectetur adipisicing
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
                            <img src={logo} alt="" className="rounded"/>
                        </div>
                    </div>
                    <div className="container-sm df flex-wrap p-0 about-part1">
                        <div className="part1-img">
                            <img src={bw} alt="" className="rounded"/>
                        </div>
                        <div className="rounded p-2 m-3 part1-content">Lorem, ipsum dolor sit amet consectetur adipisicing
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
