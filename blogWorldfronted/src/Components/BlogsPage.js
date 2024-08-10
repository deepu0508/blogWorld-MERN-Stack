import React, { useContext, useEffect, useRef, useState } from 'react'
import BlogItem from './BlogItem'
import blogContext from '../Context/Blogs/blogContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import $ from 'jquery'

export default function BlogsPage(props) {
    // Gsap plugin in usegsap
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const container = useRef();
    const { contextSafe } = useGSAP({ scope: container });

    const { logged } = props
    const context = useContext(blogContext);
    const { getAllBlogs, allblogs, getBlog, userInfo } = context;
    const [filterblog, setFilter] = useState("all");
    let a = 0;

    useEffect(() => {
        getAllBlogs();
        setFilter("all");
        const screenSize = window.screen.availHeight;
        document.querySelectorAll(".blog-item").forEach((e) => {
            const itemTop = e.getBoundingClientRect().top;
            if (screenSize > itemTop) {
                itemPopOut(e);
            }
        })
    },[]);


    $(window).on("scroll", () => {
        document.querySelectorAll(".blog-item").forEach((e) => {
            const itemTop = e.getBoundingClientRect().top;
            const screenSize = $(window).height();
            if (screenSize > itemTop) {
                itemPopOut(e);
            }
        })
    })

    const itemPopOut = (e) => {
        setTimeout(() => {
            $(`#${e.id}`).addClass("back-animate");
        }, (Number.parseInt(e.id.split("s")[1]) % 3) * 300);
    }

    const handleFilter = () => {
        filterblog === "all" ? getAllBlogs() : getBlog();
    }
    const onchange = (e) => {
        setFilter(e.target.value);
    }
    return (
        <>
            <div className="section2">
                <div className="df flex-column mainContainer" ref={container}>
                    <div className="container df flex-column my-3 rounded p-3 blogContainer">
                        <div className="container df flex-column rounded p-1 header-part">
                            <h1 className="display-3">wlecome to our blog world</h1>
                            <p className="h6">This place all blogs are availables for gernel purpose.</p>
                        </div>
                        {logged && <div className="input-group m-3">
                            <select className="form-select filter" id="inputGroupSelect04" name='filterblog' onChange={onchange} aria-label="Example select with button addon" value={filterblog}>
                                <option selected value={"all"} key={"all"}>All Blogs</option>
                                <option value={"myblog"} key={"my"}>My Blogs</option>
                            </select>
                            <button className="btn btn-outline-info" type="button" onClick={handleFilter}>Apply</button>
                        </div>}
                        <div className="container df flex-wrap justify-content-evenly rounded p-2 blogs">
                            {allblogs && allblogs.map((i) => {
                                return <>
                                    <div className="blog-item animation" id={`cards${a}`} key={a+100}><BlogItem key={`${i._id+a}`} blog={i} count={a++} /></div>
                                    <div className="blog-item animation" id={`cards${a}`} key={a+100}><BlogItem key={`${i._id+a}`} blog={i} count={a++} /></div>
                                    <div className="blog-item animation" id={`cards${a}`} key={a+100}><BlogItem key={`${i._id+a}`} blog={i} count={a++} /></div>
                                </>
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
            </div>
        </>
    )
}
