import React, { useEffect, useRef, useState } from "react";
import likeImg from "./Images/like.png";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery"

export default function BlogItem(props) {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const container = useRef();
  // const { contextSafe } = useGSAP({ scope: container });

  const { blog, count } = props;
  const { title, description, likes, image, _id } = blog;
  const host = 'http://localhost:8900'

  const [like, setLike] = useState(likes);
  const [blogCurrent, setBlogCurrent] = useState(blog);

  // useEffect(() => {
  //   const itemTop = document.querySelector(`#card${count}`).getBoundingClientRect().top;
  //   const screenButtom = $(window).height();
  //   if ((screenButtom - screenButtom / 3) > itemTop) {
  //     itemPopOut();
  //   }
  // })

  // useGSAP(() => {
  //   gsap.to(".card", {
  //     y: -200,
  //     scale: 0.2,
  //     opacity: 0,
  //   })
  // }, { scope: container })

  // $(window).on("scroll", () => {
  //   const itemTop = document.querySelector(`#card${count}`).getBoundingClientRect().top;
  //   const screenButtom = $(window).height();
  //   if ((screenButtom - screenButtom / 3) > itemTop) {
  //     itemPopOut();
  //   }
  // })

  // const itemPopOut = contextSafe(() => {
  //   gsap.to(`#card${count}`, {
  //     y: 0,
  //     scale: 1,
  //     opacity: 1,
  //     duration: 1,
  //   });
  // })

  const shrink = () => {
    document.getElementById(`imgLike${count}`).classList.add("shrink");
    setTimeout(() => {
      document.getElementById(`imgLike${count}`).classList.remove("shrink");
    }, 500);
  };

  const incrementLike = async () => {
    if (sessionStorage.getItem("auth-token") && sessionStorage.getItem("bw_auth_token")) {
      const response = await fetch(`${host}/api/blog/blogLike/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token"),
          "bw_auth_token": sessionStorage.getItem("bw_auth_token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        setLike(data.updateBlog.likes);
      }
    } else {
      alert("Please you login or signup");
    }
  };

  return (
    <>
      <div className="blogBox" ref={container}>
        <div className="card card1" id={`card${count}`} style={{ width: "20rem" }}>
          <div className="front-blog-img">
            <img
              src={`http://localhost:8900/${image}`}
              className="img-thumbnail card-img-top"
              alt="..."
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{String(title).slice(0, 20)}....</h5>
            <p className="card-text">{String(description).slice(0, 100)}....</p>
          </div>
          <div className="card-body df justify-content-between flex-row my-card-body">
            <Link
              state={{ data: blogCurrent }}
              to={"/showblog"}
              className="btn btn-primary"
            >
              Read me...
            </Link>
            <div className="d-flex flex-row likes-part">
              <img
                src={likeImg}
                onClick={() => {
                  shrink();
                  incrementLike();
                }}
                id={`imgLike${count}`}
                alt=""
              />
              <p className="numLikes" id="numLikes">
                {like.length - 1}
              </p>
            </div>
            {/* <div className="d-flex flex-row comments-part">
                            <img src={comment} alt="" id="comment" onClick={() => { moveCom(); toggleComment("addComment") }} />
                            <div className="numLikes numComments" id="numComments">0</div>
                        </div>
                        <div className="modal fade" id="addComment" data-bs-backdrop="static" data-bs-keyboard="false"
                            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Comment</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close" onClick={() => { toggleComment("addComment") }}></button>
                                    </div>
                                    <div className="modal-body">
                                        <input className="form-control" type="text" placeholder="Enter your comment"
                                            aria-label="default input example" />
                                    </div>
                                    <div className="modal-footer">
                                        <img src={commentView} alt="" onClick={() => { viewShrink(); toggleComment("readComment") }} title="See all comments"
                                            className="commentView" id="commentViews" />
                                        <button type="button" className="btn btn-secondary" onClick={() => { toggleComment("addComment") }}>Close</button>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="readComment" data-bs-backdrop="static" data-bs-keyboard="false"
                            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">All Comments</h1>
                                        <button type="button" className="btn-close"
                                            aria-label="Close" onClick={() => { toggleComment("readComment") }}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <p>A well-known quote, contained in a blockquote element.</p>
                                                <footer className="blockquote-footer">Someone famous in <cite
                                                    title="Source Title">Source Title</cite></footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => { toggleComment("readComment") }}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
