import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogContext from "../Context/Blogs/blogContext";
import colorList from "../txt/colorList"; // This is Color List
import fontList from "../txt/fontList"; // This is Font Family List
import itemsValue from "../txt/itemValue"; // Type of Blogs

export default function CreateBlog(props) {
  const context = useContext(blogContext);
  const {
    titleStyle,
    setTitleStyle,
    subTitleStyle,
    blogData,
    updateBtn,
    setSubTitleStyle,
    descriptionStyle,
    setDescriptionStyle,
    setBlogData,
    updateBlog,
    jwt_token_setup,
  } = context;
  const host = "http://localhost:8900";

  const ref = useRef();
  const resetRef = useRef();
  const [message, setMess] = useState({
    typeMess: "Warning",
    type: "warning",
    mess: "Please don't refresh at time of create blog and don't move other page",
  });

  // Image or file from user take
  const [frontImg, setFrontImg] = useState({ preview: "", data: "" });
  const [file, setFile] = useState({ preview: "", data: "" });

  // Physical Data
  const { title, subtitle, description, type } = blogData;

  const navigate = useNavigate();

  let fontSize = [];
  for (let i = 20; i <= 50; i = i + 2) {
    fontSize.push(i);
  }
  const toggleTitle = (id) => {
    let toggleId = document.getElementById(id);
    toggleId.classList.contains("show")
      ? toggleId.classList.remove("show")
      : toggleId.classList.add("show");
  };

  const { setLogged } = props;

  useEffect(() => {
    try {
      if (
        sessionStorage.getItem("auth-token") &&
        sessionStorage.getItem("bw_auth_token")
      ) {
          (async () => {
            const response = await fetch(`${host}/api/auth/getuser`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token"),
                "bw_auth_token": sessionStorage.getItem("bw_auth_token"),
              },
            });

            const data = await response.json();
            if (data.success) {
              navigate("/createblog");
              setLogged(true);
              ref.current.click();
            } else {
              navigate("/login");
            }
          })();
      } else {
        navigate("/login");
        // jwt_token_setup();
      }
    } catch (error) {
      navigate("/login");
    }
  }, []);

  const onchangeTitle = (e) => {
    setTitleStyle({ ...titleStyle, [e.target.name]: e.target.value });
  };
  const onchangeSubTitle = (e) => {
    setSubTitleStyle({ ...subTitleStyle, [e.target.name]: e.target.value });
  };
  const onchangeDescription = (e) => {
    setDescriptionStyle({
      ...descriptionStyle,
      [e.target.name]: e.target.value,
    });
  };
  const onBlogData = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const formHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check title, description and image are fill or not
      if (title && description && frontImg.preview && type) {
        setMess({
          typeMess: "Warning",
          type: "success",
          mess: "Waiting......",
        });
        // Create New a Blog
        const response = await fetch(`${host}/api/blog/addblog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("auth-token"),
            bw_auth_token: sessionStorage.getItem("bw_auth_token"),
          },
          body: JSON.stringify({
            title,
            subTitle: subtitle,
            type,
            description,
            imgs: frontImg.preview,
            file: file.preview || "",
          }),
        });
        const data = await response.json(); //If Successfully created then continue

        if (data.success) {
          const blogId = data.saveBlog._id; //find blog id

          // This Blog Information also loaded in database
          const blogInfoResponse = await fetch(
            `${host}/api/blogInfo/addBlogInfo/${blogId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token"),
                bw_auth_token: sessionStorage.getItem("bw_auth_token"),
              },
              body: JSON.stringify({
                TColor: titleStyle.color,
                TStyle: titleStyle.style,
                TFFamily: titleStyle.fontFamily,
                TSize: titleStyle.fontSize,
                sTColor: subTitleStyle.color,
                sTStyle: subTitleStyle.style,
                sTFFamily: subTitleStyle.fontFamily,
                sTSize: subTitleStyle.fontSize,
                DColor: descriptionStyle.color,
                DStyle: descriptionStyle.style,
                DFFamily: descriptionStyle.fontFamily,
                DSize: descriptionStyle.fontSize,
              }),
            }
          );
          const infoData = await blogInfoResponse.json(); //After Successfully then

          if (infoData.success) {
            const blogInfoId = infoData.saveBlogInfo._id;

            // update again blog data to blog information id
            const response = await fetch(
              `${host}/api/blog/updateblog/${blogId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": sessionStorage.getItem("auth-token"),
                  bw_auth_token: sessionStorage.getItem("bw_auth_token"),
                },
                body: JSON.stringify({ blogInfoId }),
              }
            );
            const comPro = await response.json();
            if (comPro.success) {
              setMess({
                typeMess: "Success",
                type: "success",
                mess: "Successfully Created your Blog",
              });
              cleanInput();
              // console.log(ref);
              setTimeout(async () => {
                await ref.current.click();
                navigate("/blogs");
                window.location.reload();
                // console.log(ref);
              }, 1000);
            }
          } else {
            setMess({
              typeMess: "Warning",
              mess: infoData.error,
              type: "warning",
              btn: true,
            });
            ref.current.click();
          }
        } else {
          setMess({
            typeMess: "Warning",
            mess: data.error,
            type: "warning",
            btn: true,
          });
          ref.current.click();
        }
      } else {
        setMess({
          typeMess: "Warning",
          mess: "Please create blog completely",
          type: "warning",
          btn: true,
        });
        ref.current.click();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formHandleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (title && description && frontImg && type) {
        setMess({
          typeMess: "Success",
          type: "success",
          mess: "Successfully Update your Blog",
        });
        updateBlog(frontImg, file);
        cleanInput();
        setTimeout(() => {
          ref.current.click();
        }, 1000);
        window.location.reload();
        navigate("/blogs");
      } else {
        setMess({
          typeMess: "Warning",
          mess: "Please create blog or updated completely",
          type: "warning",
          btn: true,
        });
        ref.current.click();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const cleanInput = () => {
    setBlogData({ title: "", subtitle: "", description: "", type: "" });
    setFrontImg({ data: "", preview: "" });
    setFile({ data: "", preview: "" });
    setTitleStyle({ fontSize: "", fontFamily: "", fontStyle: "", color: "" });
    setSubTitleStyle({
      fontSize: "",
      fontFamily: "",
      fontStyle: "",
      color: "",
    });
    setDescriptionStyle({
      fontSize: "",
      fontFamily: "",
      fontStyle: "",
      color: "",
    });
    resetRef.current.click();
  };

  const onHandleImg = (e) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontImg({
          data: e.target.files[0],
          preview: reader.result,
        });
      };
      // console.log(frontImg);
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const onhandleFile = (e) => {
    try {
      if (!e.target.files[0]) {
        setFile({
          data: "",
          preview: "",
        });
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFile({
          data: e.target.files[0],
          preview: reader.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="df flex-column bg-dark text-light mainContainer">
        <div className="container df flex-column rounded my-3 p-3 create-blogPage">
          {/* Warning Message show up */}
          <button
            type="button"
            ref={ref}
            data-bs-toggle="modal"
            data-bs-target="#meassage"
          ></button>
          <div
            className="modal fade"
            id="meassage"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div
                className={`modal-content bg-secondary bg-opacity-1 rounded`}
              >
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {message.typeMess}
                  </h1>
                </div>
                <div className="modal-body">{message.mess}</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className={`btn btn-${message.type}`}
                    data-bs-dismiss="modal"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container blog-create-head">
            <h1>Create your Blog</h1>
          </div>
          <div className="container df flex-column my-2 p-2 blog-create-body">
            <form className="container df flex-column my-2 p-2 blog-create-body">
              <div className="mb-3 input-cls">
                {/* <!-- Title Part --> */}
                <div className="container p-0 df flex-wrap justify-content-between my-2 title-header-part">
                  <label htmlFor="title" className="form-label">
                    Enter Title
                  </label>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => toggleTitle("titleTaskbar")}
                  >
                    <span className="navbar-toggler-icon">↓ </span>
                  </button>
                  <div className="container df flex-wrap justify-content-around title-css">
                    <div
                      className="df flex-wrap rounded collapse py-1 taskbar-title"
                      id="titleTaskbar"
                    >
                      <div className="taskbar-font taskbar-heading">
                        Title Font Design
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="title-size"
                          aria-label="Floating label select example"
                          name="fontSize"
                          onChange={onchangeTitle}
                          value={titleStyle.fontSize}
                        >
                          <option selected value="30px">
                            30px
                          </option>
                          {fontSize.map((i) => {
                            return <option value={`${i}px`}>{i}px</option>;
                          })}
                        </select>
                        <label htmlFor="title-size">Title Font Size</label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="title-style"
                          aria-label="Floating label select example"
                          name="fontStyle"
                          onChange={onchangeTitle}
                          value={titleStyle.fontStyle}
                        >
                          <option selected value="normal">
                            normal
                          </option>
                          <option value="italic" className="italic">
                            italic
                          </option>
                        </select>
                        <label htmlFor="title-style">Title Font Style</label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="title-family"
                          aria-label="Floating label select example"
                          name="fontFamily"
                          onChange={onchangeTitle}
                          value={titleStyle.fontFamily}
                        >
                          {fontList.map((i) => {
                            return (
                              <option value={i} style={{ fontFamily: i }}>
                                {i}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="title-color">Title Font Family</label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="title-color"
                          aria-label="Floating label select example"
                          name="color"
                          onChange={onchangeTitle}
                          value={titleStyle.color}
                        >
                          {colorList.map((i) => {
                            return (
                              <option value={i} style={{ background: i }}>
                                {i}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="title-color">Title Font Color</label>
                      </div>
                      {/* <button type="button" className="btn mx-2 btn-warning" id="title-style" onClick={titleApply}>Apply</button> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Input Section --> */}
                <textarea
                  className="form-control"
                  style={titleStyle}
                  name="title"
                  value={blogData.title}
                  onChange={onBlogData}
                  id="title"
                  minLength={10}
                  required
                  rows="5"
                ></textarea>
              </div>
              <div className="mb-3 input-cls">
                {/* <!-- Sub Title Part --> */}
                <div className="container p-0 df flex-wrap justify-content-between my-2 subtitle-header-part">
                  <label htmlFor="subtitle" className="form-label">
                    Enter Sub-Title (Optional)
                  </label>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => toggleTitle("subtitleTaskbar")}
                  >
                    <span className="navbar-toggler-icon">↓ </span>
                  </button>
                  <div className="container df flex-wrap justify-content-around subtitle-css">
                    <div
                      className="df flex-wrap rounded collapse py-1 taskbar-subtitle"
                      id="subtitleTaskbar"
                    >
                      <div className="taskbar-font taskbar-heading">
                        Sub Title Font Design
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="subtitle-size"
                          aria-label="Floating label select example"
                          name="fontSize"
                          onChange={onchangeSubTitle}
                          value={subTitleStyle.fontSize}
                        >
                          <option value={`30px`}>30px</option>
                          {fontSize.map((i) => {
                            return <option value={`${i}px`}>{i}px</option>;
                          })}
                        </select>
                        <label htmlFor="subtitle-size">
                          Sub Title Font Size
                        </label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="subtitle-style"
                          aria-label="Floating label select example"
                          name="fontStyle"
                          onChange={onchangeSubTitle}
                          value={subTitleStyle.fontStyle}
                        >
                          <option selected value="normal">
                            normal
                          </option>

                          <option value="italic" className="italic">
                            italic
                          </option>
                        </select>
                        <label htmlFor="subtitle-style">
                          Sub Title Font Style
                        </label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="subtitle-family"
                          aria-label="Floating label select example"
                          name="fontFamily"
                          onChange={onchangeSubTitle}
                          value={subTitleStyle.fontFamily}
                        >
                          {fontList.map((i) => {
                            return (
                              <option value={i} style={{ fontFamily: i }}>
                                {i}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="subtitle-color">
                          Sub Title Font Family
                        </label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="subtitle-color"
                          aria-label="Floating label select example"
                          name="color"
                          onChange={onchangeSubTitle}
                          value={subTitleStyle.color}
                        >
                          {colorList.map((i) => {
                            return (
                              <option value={i} style={{ background: i }}>
                                {i}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="subtitle-color">
                          Sub Title Font Color
                        </label>
                      </div>
                      {/* <button type="button" className="btn mx-2 btn-success" id="subtitle-style" onClick={subTitleApply}>Apply</button> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Input Section --> */}
                <textarea
                  className="form-control"
                  minLength={20}
                  name="subtitle"
                  value={blogData.subtitle}
                  onChange={onBlogData}
                  style={subTitleStyle}
                  id="subtitle"
                  rows="8"
                ></textarea>
              </div>
              <div className="mb-3 input-cls">
                {/* <!-- Image Part --> */}
                <label htmlFor="imageFile" className="form-label">
                  Front Page Image
                </label>
                {/* <!-- input Section --> */}
                <input
                  className="form-control"
                  required
                  title="Please attached front image of your blog"
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  name="imgs"
                  onChange={onHandleImg}
                />
              </div>
              <div className="mb-3 input-cls">
                {/* <!-- Description Part --> */}
                <div className="container p-0 df flex-wrap justify-content-between my-2 description-header-part">
                  <label htmlFor="description" className="form-label">
                    Enter Description
                  </label>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => toggleTitle("descriptionTaskbar")}
                  >
                    <span className="navbar-toggler-icon">↓</span>
                  </button>
                  <div className="container df flex-wrap justify-content-around description-css">
                    <div
                      className="df flex-wrap rounded collapse py-1 taskbar-description"
                      id="descriptionTaskbar"
                    >
                      <div className="taskbar-font taskbar-heading">
                        Description Font Design
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="description-size"
                          aria-label="Floating label select example"
                          name="fontSize"
                          onChange={onchangeDescription}
                          value={descriptionStyle.fontSize}
                        >
                          <option value={`30px`}>30px</option>
                          {fontSize.map((i) => {
                            return <option value={`${i}px`}>{i}px</option>;
                          })}
                        </select>
                        <label htmlFor="subtitle-size">
                          Description Font Size
                        </label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="description-style"
                          aria-label="Floating label select example"
                          name="fontStyle"
                          onChange={onchangeDescription}
                          value={descriptionStyle.fontStyle}
                        >
                          <option selected value="normal">
                            normal
                          </option>

                          <option value="italic" className="italic">
                            italic
                          </option>
                        </select>
                        <label htmlFor="subtitle-style">
                          Description Font Style
                        </label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="description-family"
                          aria-label="Floating label select example"
                          name="fontFamily"
                          onChange={onchangeDescription}
                          value={descriptionStyle.fontFamily}
                        >
                          {fontList.map((i) => {
                            return (
                              <option value={i} style={{ fontFamily: i }}>
                                {i}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="subtitle-color">
                          Description Font Family
                        </label>
                      </div>
                      <div className="form-floating mx-2">
                        <select
                          className="form-select"
                          id="description-color"
                          aria-label="Floating label select example"
                          name="color"
                          onChange={onchangeDescription}
                          value={descriptionStyle.color}
                        >
                          {colorList.map((i) => {
                            return (
                              <option value={i} style={{ background: i }}>
                                {i}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="subtitle-color">
                          Description Font Color
                        </label>
                      </div>
                      {/* <button type="button" className="btn mx-2 btn-warning" id="description-style" onClick={descriptionApply}>Apply</button> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Input Section --> */}
                <textarea
                  className="form-control"
                  minLength={50}
                  name="description"
                  value={blogData.description}
                  onChange={onBlogData}
                  style={descriptionStyle}
                  required
                  id="description"
                  rows="20"
                ></textarea>
              </div>
              <div className="mb-3 input-cls">
                {/* <!-- File Part --> */}
                <label htmlFor="formFile" className="form-label">
                  Add some pdf file (Optional)
                </label>
                {/* <!-- Input Section --> */}
                <input
                  className="form-control"
                  name="pdfs"
                  title="Do you want attached any file"
                  onChange={onhandleFile}
                  type="file"
                  id="formFile"
                  accept=".pdf"
                />
              </div>
              <div className="mb-3 input-cls">
                {/* <label htmlFor="formFile" className="form-label">Add some pdf file (Optional)</label> */}
                <div className="mx-2">
                  <label htmlFor="type-blog">Select Type of Your Blog</label>
                  <select
                    className="form-select"
                    id="type-blog"
                    aria-label="Floating label select example"
                    required
                    name="type"
                    onChange={onBlogData}
                    value={blogData.type}
                  >
                    {itemsValue.map((i) => {
                      return <option value={i}>{i}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="mb-3 df justify-content-end input-cls">
                <button type="reset" ref={resetRef}></button>
                {updateBtn.sts && (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={formHandleUpdate}
                  >
                    Update
                  </button>
                )}
                {!updateBtn.sts && (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={formHandleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
