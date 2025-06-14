import React, { useRef } from "react";
import blog from "./Images/blog1.jpg";
import dMaterial from "./Images/pink.png";
import insta from "./Images/instagram.png";
import fb from "./Images/facebook.png";
import linkedin from "./Images/linkedin.png";
import tele from "./Images/telegram.png";
import whatsapp from "./Images/whatsapp.png";
import logo from "./Images/logo1.png";
import flower from "./Images/flower.png";
import star from "./Images/rainbow-star.png";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import $ from "jquery";

export default function Home() {
  // Gsap plugin in useGSAP
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger, Draggable);

  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  

  useGSAP(
    () => {
      let tl = gsap.timeline({ onComplete: wordAnimation });
      tl.from(".mainHead h2", {
        y: 150,
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });
      tl.from(".char", {
        y: 200,
        scale: 0,
        duration: 1,
        opacity: 0,
        rotateZ: 720,
        stagger: { from: "center", amount: -0.3 },
      });
      tl.from(
        ".imgcls",
        {
          y: 200,
          scale: 0,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.7"
      );
      tl.from(".title", {
        x: -300,
        opacity: 0,
        scale: 0,
        duration: 0.5,
      });
      tl.from(".para", {
        y: 50,
        duration: 0.5,
        opacity: 0,
      });
      tl.from(".read-me", {
        x: 50,
        opacity: 0,
        duration: 0.5,
      });

      // Home page 2
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-page1",
          start: "top 80%",
          end: "top 2%",
          scrub: 5,
        },
        onStart: () => {
          Draggable.create(".imgbox2", {
            type: "rotation",
            inertia: true,
          });
          Draggable.create(".imgbox", {
            bounds: ".home-page1",
            inertia: true,
          });
        },
      });
      tl2.from(".top-head1", {
        scale: 50,
        duration: 0.5,
        opacity: 0,
      });
      tl2.from(".top-head2", {
        y: 100,
        opacity: 0,
        scale: 0,
        duration: 2,
        stagger: 0.5,
      });
      tl2.from(".blog-btn", {
        y: 100,
        opacity: 0,
        scale: 0,
        duration: 1,
      });
      tl2.from(".imgs1", {
        y: gsap.utils.random(-200, 200, 100),
        x: gsap.utils.random(-200, 200, 100),
        scale: 0,
        opacity: 0,
        rotate: 1020,
        duration: 2,
      });

      $(".top32 .subText").slideUp();
      let tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-page3",
          start: "top 50%",
          end: "top 30%",
          // scrub: 4
        },
        onStart: () => {
          $(".top32 .subText").slideToggle(2000);
        },
      });
      tl3.from(".top32 .text", {
        y: 100,
        scale: 0,
        duration: 0.8,
      });
    },
    { scope: container }
  );

  const wordAnimation = contextSafe(() => {
    let tl3 = gsap.timeline({
      duration: 4,
      repeat: -1,
      repeatDelay: 4,
      yoyo: true,
      repeatRefresh: true,
    });
    tl3.to(".cwrd", {
      y: 50,
      opacity: 0,
      scale: 0,
      duration: 0.3,
    });
    tl3.fromTo(
      ".create i",
      {
        y: 50,
        opacity: 0,
        position: "absolute",
        duration: 0.3,
      },
      {
        opacity: 1,
        y: 0,
        position: "relative",
        duration: 0.3,
      }
    );
  });

  return (
    <>
      <div
        className="mainContainer text-light my-2"
        id="mainContainer"
        ref={container}
      >
        <div className="container df home bg-opacity-10 p-3 rounded my-4">
          <div className="container df top flex-column justify-content-start">
            <div className="container df mainHead">
              <h2>Welcome to Our </h2>
              <h1 className="heading" id="heading">
                {String("blogworld")
                  .split("")
                  .map((i) => {
                    return <span className="char">{i}</span>;
                  })}
              </h1>
            </div>
            <div className="container df subHeader mt-2 flex-wrap-reverse">
              <div className=" df justify-content-start flex-column align-items-start leftside">
                <p className="d-flex flex-column gap-2 title">
                  <strong>
                    Only put off until tomorrow what you are willing to die having left undone.
                  </strong>
                  <strong> -"Pablo Picasso"</strong>
                </p>
                <p className="para">
                  A blog post is an article, news piece, or guide that's published in the blog section of a website. A blog post typically covers a specific topic or query, is educational in nature, ranges from 600 to 2,000+ words, and contains other media types such as images
                  <div className="d-none">, videos, infographics, and interactive charts</div>. 
                  To craft a blog content strategy, you should define your goals, perform some target market research, come up with topic ideas and keywords to target, create a content calendar, and build amazing content. 
                </p>
                {/* <div className="container df myBtn justify-content-end read-me">
                                    <button type="button" className="btn btn-primary btnMe">Read me.. </button>
                                </div> */}
              </div>
              <div className=" df rightside justify-content-start">
                <img src={blog} alt="blog" className="imgcls" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="container df home home-page1 p-3 rounded my-4"
          id="home-page1"
        >
          <div className="container df page1-top flex-column justify-content-start">
            <div className="container df flex-column top1">
              <div className="container df flex-column top1">
                <p className="top-head1">
                  <span className="create">
                    <span className="cwrd">C</span>{" "}
                    <i className="ri-quill-pen-fill"></i>
                  </span>
                  reate{" "}
                  <span className="create">
                    <span className="cwrd">o</span>
                    <i className="ri-sun-fill"></i>
                  </span>
                  wn grateful{" "}
                  <span className="create">
                    <span className="cwrd">b</span>
                    <i className="ri-remix-run-fill"></i>
                  </span>
                  logs and show everyone through this site.
                </p>
                <p className="top-head2" id="top-head2">
                  You tried different type and category of blogs.
                </p>
              </div>
              <p className="top-head2 top-head3">
                In this site all types of blogs cataegories are available (Food,
                Entertainment, Travell, Nature,Cooking, Technology, Movie,
                Songs, etc.) and all your all blogs are published you through
                same site and you seen also other persons blogs. This site all
                blogs are used to many place, many purpose and you download
                also. And You comment any blogs and comment also your blogs
                through other and likes counted also.
              </p>
            </div>
            <div className="container df flex-wrap top2">
              <div className="imgbox1">
                <div className="df flex-column imgbox1 imgbox flex-wrap">
                  {/* Pending */}
                  {/* <i className="ri-sparkling-fill"></i>
                                <i className="ri-dna-fill"></i> */}
                  <img src={star} className="imgs0" id="imgs1" alt="" />
                  {/* <svg viewBox="0 0 100 100" className='heart'>
                                    <path fill="transparent" stroke='red' d="M50,25 C35,0,-14,25,20,60 L50,90 L80,60 C114,20,65,0,50,25"></path>
                                    </svg> */}
                </div>
              </div>
              {/* <button type="button" className="btn btn-primary btnMe blogBtn">Create your Blog</button> */}
              <div className="df flex-column blog-btn">
                <Link to={"/login"} className="btn btn-primary btnMe blogBtn">
                  {" "}
                  Create your Blog
                </Link>
              </div>
              <div className="imgbox1">
                <div className="df flex-column imgbox1 imgbox2">
                  {/* Pending */}
                  <img src={flower} className="imgs0 imgs1" id="imgs2" alt="" />
                  {/* <i className="ri-flower-fill"></i>
                                <i className="ri-restaurant-fill"></i> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container df home home-page2 rounded my-4 flex-wrap home-page3">
          <div className="container df page2-top  justify-content-start flex-wrap">
            <div className="container df flex-column  w-50 align-items-start top31">
              <img src={dMaterial} className="imgp w-100 my-3" alt="" />
            </div>
            <div className="container df flex-column  w-50 align-items-start top32">
              <h3 className="text">
                Choose your best option of perfect design
              </h3>
              <p className="subText">
                Create your own stylish blog and use those options which are fit
                your blogs.Choose from a selection of easy-to-use to new simple
                and stylish blog. Under every some time comes new latest update
                for design and also available templates.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="container df footer my-3">
          <div className="container df home rounded footer-part flex-wrap">
            <div className="w-25 img-part">
              <img src={logo} alt="logo" />
            </div>
            <div className="container w-75 df flex-column right-footer">
              <div className="df w-75 align-items-start flex-column data">
                <div className="w-100 follow website">Support </div>
                <p className="email">
                  <span className="mail">Email Id : </span>
                  bratadipta0508power@gmail.com
                </p>
              </div>
              <div className="df w-75 align-items-start flex-column bw">
                <div className="w-100 follow website">blogWrold Website</div>
                <div className="df website-theme">
                  <Link to={"/about"}>About Us</Link>
                  <Link to={"/services"}>Our Services</Link>
                  <Link to={"/updates"}>Latest Updates</Link>
                  <Link to={"/pp"}>Privacy & Policy</Link>
                </div>
              </div>
              <div className="df flex-column w-75 align-items-start fll">
                <div className="w-100 follow">Follow Us</div>
                <div className="df w-50 icons">
                  <img src={fb} alt="facebook" />
                  <img src={insta} alt="instagram" />
                  <img src={linkedin} alt="linkdin" />
                  <img src={tele} alt="telegram" />
                  <img src={whatsapp} alt="whatsapp" />
                </div>
              </div>
              <h4 className="copyright">
                COPYRIGHT blogWorld &copy;BRATADIPTA MONDAL 2024
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
