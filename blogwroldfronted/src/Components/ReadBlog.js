import React, { useContext, useEffect, useState } from 'react'
import likeImg from './Images/like.png'
import commentImg from './Images/comment.png'
import view from './Images/view.png'
import { useLocation, useNavigate } from 'react-router-dom';
import blogContext from '../Context/Blogs/blogContext';
import deleteImg from "./Images/delete.png"

export default function ReadBlog(props) {
  const { logged } = props;
  const host = "http://localhost:8900";
  const context = useContext(blogContext);
  const navigate = useNavigate();
  const { userInfo, getUser,
    setTitleStyle, setSubTitleStyle, setDescriptionStyle, setBlogData, setUpdateBtn
  } = context;
  const location = useLocation();
  const { data } = location.state;
  const { title, subTitle, description, image, file, likes, author, writeDate, _id, blogInfoId, user, type } = data;

  const [titleInfo, setTitleInfo] = useState({ fontStyle: "", color: "", fontSize: "", fontFamily: "", })
  const [subTitleInfo, setSubTitleInfo] = useState({ fontStyle: "", color: "", fontSize: "", fontFamily: "", })
  const [descriptionInfo, setDescriptionInfo] = useState({ fontStyle: "", color: "", fontSize: "", fontFamily: "", });

  const [like, setLike] = useState(likes);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [lenCmt, setLenCmt] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${host}/api/blogInfo/infoFetch/${blogInfoId}`, { method: "POST" });
        const data = await response.json();
        if (data.success) {
          const { desStyle, desColor, desSize, desFontFamily, titleStyle, titleColor, titleSize, titleFontFamily, subTitleStyle, subTitleColor, subTitleSize, subTitleFontFamily } = data.blogInfo;
          setTitleInfo({ fontSize: titleSize, fontFamily: titleFontFamily, fontStyle: titleStyle, color: titleColor });
          setSubTitleInfo({ fontSize: subTitleSize, fontFamily: subTitleFontFamily, fontStyle: subTitleStyle, color: subTitleColor });
          setDescriptionInfo({ fontSize: desSize, fontFamily: desFontFamily, fontStyle: desStyle, color: desColor });
        }
        fetchallCmt();
        getUser();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);


  // ----------Animation 
  const moveCom = () => {
    document.getElementById("comment").classList.add("commentMove")
    setTimeout(() => {
      document.getElementById("comment").classList.remove("commentMove")
    }, 500)
  }

  const viewShrink = () => {
    document.getElementById("commentViews").classList.add('shrink');
    setTimeout(() => {
      document.getElementById("commentViews").classList.remove('shrink');
    }, 500);
  }

  const toggleComment = (id) => {
    if (!logged) { id = "readComment"; }
    let toggleId = document.getElementById(id);
    toggleId.classList.contains("show") ? toggleId.classList.remove("show") : toggleId.classList.add("show");
    if (toggleId.classList.contains("show")) {
      toggleId.style.display = "block";
    } else {
      toggleId.style.display = "none";
    }
    if (id === "readComment") {
      const closeAll = document.getElementById("addComment");
      closeAll.style.display = "none";
      if (closeAll.classList.contains("show")) { closeAll.classList.remove("show") }
    }
  }
  // --------

  // It is like incrementing --> Blog data update by how many users are likes of particular blog
  const incrementLike = async () => {
    if (sessionStorage.getItem("authtoken")) {
      const response = await fetch(`${host}/api/blog/blogLike/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("authtoken")
        }
      });
      const data = await response.json();
      if (data.success) {
        setLike(data.updateBlog.likes);
      }
    } else {
      alert("Please you login or signup")
    }
  }

  // This is add comment of particular user in particular blog with authentication of user
  const handleComment = async () => {
    try {
      if (comment) {
        document.getElementById("commentInput").placeholder = "Enter your comment"
        document.getElementById("comment-bg").classList.remove("bg-danger");
        const response = await fetch(`${host}/api/comments/addcomment/${_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("authtoken")
          },
          body: JSON.stringify({ content: comment })
        });
        const result = await response.json();
        if (result.success) {
          setComment("");
          fetchallCmt();
          setLenCmt(0);
        }
      } else {
        document.getElementById("commentInput").placeholder = "Please enter some text here...."
        document.getElementById("comment-bg").classList.add("bg-danger");
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Specific Comment remove by authentication user
  const removeComment = async (id) => {
    try {
      const response = await fetch(`${host}/api/comments/deletecomment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("authtoken")
        }
      });
      const result = await response.json();
      if (result.success) {
        fetchallCmt();
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error(error);
    }
  }

  // This is fetch all comments of particular blog without authentication
  const fetchallCmt = async () => {
    try {
      const responseCmt = await fetch(`${host}/api/comments/fetchall/${_id}`, { method: "POST" });
      const result = await responseCmt.json();
      if (result.success) {
        setAllComment(result.comments);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateBlog = () => {
    setBlogData({ title, description, subtitle: subTitle, type });
    setTitleStyle(titleInfo);
    setSubTitleStyle(subTitleInfo);
    setDescriptionStyle(descriptionInfo);
    setUpdateBtn({ sts: true, id: _id, bgid: blogInfoId });
    navigate("/createblog");
  }

  const deleteBlog = async () => {
    try {
      const response = await fetch(`${host}/api/blog/deleteblog/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("authtoken")
        }
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        navigate("/blogs");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeComment = (e) => {
    setComment(e.target.value);
    setLenCmt(String(e.target.value).length);
  }

  // Like img animation
  const shrink = () => {
    document.getElementById(`imgLike`).classList.add("shrink");
    setTimeout(() => {
      document.getElementById(`imgLike`).classList.remove("shrink");
    }, 500);
  };
  return (
    <>
      <div className="df flex-column bg-dark text-dark mainContainer">
        <div className="container df flex-column rounded my-3 p-3 blogPage">
          <div className="container df flex-wrap-reverse rounded p-1 align-items-end">
            <div className="container-sm rounded image-part-blog">
              <img src={`http://localhost:8900/${image}`} alt="" className="rounded img-thumbnail img-show-blog" />
            </div>
            <div className="container-sm df flex-column align-items-start px-2 rounded title-blog-part">
              <div className="title-text" id="title" style={titleInfo}>
                {title}
              </div>
              {subTitle && <div className="subTitle-text" id="subtitle" style={subTitleInfo}>
                {subTitle}
              </div>}
            </div>
          </div>
          <div className="container p-3 my-3 rounded">
            <div className="desc-text" id="desc" style={descriptionInfo}>
              {description}
            </div>
          </div>
          {file && <div className="container rounded file-part">
            <Link exact to={`http://localhost:8900/${file}`} className="m-2">Blog File(click me...)</Link>
          </div>}
          <div className="container text-end author-part mx-3">
            <p className="m-0 author-name" id="auhtor-name">{author}</p>
            <p className="m-0 author-name" id="auhtor-name">{String(writeDate).split("T")[0]}</p>
          </div>
          <div className="container df p-3 my-3 rounded justify-content-between footer-blog">
            <div className="df like-comment-part">
              {/* Like Part */}
              <div className="d-flex flex-row mx-2 likes-part">
                <img src={likeImg} id="imgLike" alt="" onClick={() => { incrementLike(); shrink() }} />
                <p className="numLikes" id="numLikes1">{like.length - 1}</p>
              </div>

              {/* All bleow part is comment */}
              <div className="d-flex flex-row comments-part">
                <img src={commentImg} alt="" id="comment" onClick={() => { moveCom(); toggleComment("addComment"); }} />
                <div className="numLikes numComments" id="numComments">{allComment.length}</div>
              </div>

              {/* Add new comment by user  */}
              <div className="modal fade" id="addComment" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content bg-secondary bg-opacity-1 rounded" id='comment-bg'>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Comment</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"
                        aria-label="Close" onClick={() => { toggleComment("addComment") }}></button>
                    </div>
                    <div className="modal-body">
                      <div className="input-group">
                        <input className="form-control" type="text" placeholder="Enter your comment"
                          aria-label="default input example" maxLength={200} name='comment' id='commentInput' value={comment} onChange={onChangeComment} />
                        <span className="input-group-text" id="basic-addon2">{lenCmt}/200</span>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <img src={view} alt="" onClick={() => { viewShrink(); toggleComment("readComment"); fetchallCmt(); }} title="See all comments"
                        className="commentView" id="commentViews" />
                      <button type="submit" className="btn btn-primary" onClick={handleComment}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>


              {/* Fetch all comment and display */}
              <div className="modal fade" id="readComment" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content bg-secondary bg-opacity-1 rounded">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">All Comments</h1>
                      <button type="button" className="btn-close"
                        aria-label="Close" onClick={() => { toggleComment("readComment") }}></button>
                    </div>
                    <div className="modal-body">
                      <div className="card-body">
                        {allComment.length !== 0 ? allComment.map((cmt) => {
                          return <li className="list-group-item d-flex justify-content-between align-items-start my-2" key={cmt._id}>
                            <div className="ms-2 me-auto ">
                              <div className="fw-bold">{cmt.username}</div>
                              <div className="text-info">{cmt.content}</div>
                            </div>
                            {(userInfo._id === cmt.user) && <img src={deleteImg} alt="" className='mx-2 cut' onClick={() => removeComment(cmt._id)} />}
                            <span className="badge text-bg-primary rounded-pill">{String(cmt.time).split("T")[0]}</span>
                          </li>
                        }) :
                          <blockquote className="blockquote mb-0">
                            <footer className="blockquote-footer text-info">No any Comments</footer>
                          </blockquote>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="df">
              {(userInfo._id === user) && <button type="button" onClick={updateBlog} className='btn btn-primary mx-2'>Update</button>}
              {(userInfo._id === user) && <button type="button" onClick={deleteBlog} className='btn btn-danger'>Delete</button>}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
