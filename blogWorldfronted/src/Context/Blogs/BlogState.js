import BlogContext from "./blogContext";
import { useState } from "react";

const BlogState = (props) => {
    const host = "http://localhost:8900";

    const [allblogs, setAllBlog] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [updateBtn, setUpdateBtn] = useState({ sts: false, id: "",bgid:"" });

    // This is all blog design information hook
    const [titleStyle, setTitleStyle] = useState({ fontSize: "30px", fontStyle: "normal", fontFamily: "sans-serif", color: "black" });
    const [subTitleStyle, setSubTitleStyle] = useState({ fontSize: "26px", fontStyle: "normal", fontFamily: "sans-serif", color: "black" });
    const [descriptionStyle, setDescriptionStyle] = useState({ fontSize: "22px", fontStyle: "normal", fontFamily: "sans-serif", color: "black" });

    // Blog data store
    const [blogData, setBlogData] = useState({ title: "", subtitle: "", description: "", type: "" });
    const { title, subtitle, description, type } = blogData;

    const getAllBlogs = async () => {
        try {
            const response = await fetch(`${host}/api/blog/fetchall`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            setAllBlog(data.allBlogs);
        } catch (error) {
            console.error(error);
        }
    }

    const getBlog = async () => {
        try {
            const response = await fetch(`${host}/api/blog/fetchblogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("authtoken")
                }
            });
            const data = await response.json();
            if (data.success) {
                setAllBlog(data.blogs);
            } else {
                setAllBlog("");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getUser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("authtoken")
                }
            })
            const data = await response.json();
            if (data.success) {
                setUserInfo(data.user);
            } else {
                setUserInfo({ _id: "" })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateBlog = async (img, file) => {
        try {
            const response = await fetch(`${host}/api/blog/updateblog/${updateBtn.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("authtoken")
                },
                body: JSON.stringify({ title, subTitle: subtitle, type, description, imgs: img.preview, file: file.preview || "" })
            });
            const data = await response.json();
            if(data.success){
                const infoResponse = await fetch(`${host}/api/blogInfo/updateBlogInfo/${updateBtn.bgid}`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "auth-token":sessionStorage.getItem("authtoken")
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
                        DSize: descriptionStyle.fontSize
                    })
                });
                const info = await infoResponse.json();
                console.log(info.success)
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <BlogContext.Provider value={{
            allblogs, userInfo, titleStyle, subTitleStyle, descriptionStyle, blogData, updateBtn,
            setTitleStyle, setSubTitleStyle, setDescriptionStyle, getAllBlogs, getUser, getBlog, setBlogData, setUpdateBtn, updateBlog
        }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;