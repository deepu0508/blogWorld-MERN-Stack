import React, { useContext, useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import blogContext from '../Context/Blogs/blogContext';

export default function BlogsPage(props) {
    const {logged} = props
    const context = useContext(blogContext);
    const { getAllBlogs, allblogs, getBlog,userInfo } = context;
    const [filterblog, setFilter] = useState("all");
    let a = 0;
    useEffect(() => {
        getAllBlogs();
        setFilter("all");
    }, []);


    const handleFilter = () => {
        filterblog === "all" ? getAllBlogs() : getBlog();
    }
    const onchange = (e) => {
        setFilter(e.target.value);
    }
    return (
        <>
            <div className="df flex-column mainContainer">
                <div className="container df flex-column my-3 rounded p-3 blogContainer">
                    <div className="container df flex-column rounded p-1 header-part">
                        <h1 className="display-3">wlecome to our blog world</h1>
                        <p className="h6">This place all blogs are availables for gernel purpose.</p>
                    </div>
                    {logged && <div className="input-group m-3">
                        <select className="form-select filter" id="inputGroupSelect04" name='filterblog' onChange={onchange} aria-label="Example select with button addon" value={filterblog}>
                            <option selected value={"all"}>All Blogs</option>
                            <option value={"myblog"}>My Blogs</option>
                        </select>
                        <button className="btn btn-outline-info" type="button" onClick={handleFilter}>Apply</button>
                    </div>}
                    <div className="container df flex-wrap justify-content-evenly rounded p-2 blogs">
                        {allblogs && allblogs.map((i) => {
                            return <BlogItem key={`${i._id}`} blog={i} count={a++} />
                        })}
                        {allblogs.length === 0 &&
                            <div className="">
                                <div className="card-header">
                                    Sorry
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>You have not create any Blog</p>
                                        <footer className="blockquote-footer">{userInfo.name}</footer>
                                    </blockquote>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
