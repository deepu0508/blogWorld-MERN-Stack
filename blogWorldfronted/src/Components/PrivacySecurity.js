import React from 'react'
import pp from './Images/security.png'

export default function PrivacySecurity() {
    return (
        <>
            <div className="my-3 mainContainer">
                <div className="container df text-light">
                    <div className="container df flex-column my-3 py-3 rounded about-content">
                        <h1 className="about-head">Privacy & Policy</h1>
                        <div className="container my-3 p-3">
                            <div className="container-sm df flex-wrap p-0 about-part1">
                                <div className="pp-img">
                                    <img src={pp} alt="" className="rounded" />
                                </div>
                                <div className="rounded p-2 m-3 part1-content">
                                    <li>Login with security</li>
                                    <li>Sign Up with Authentication (Verify Email Id's and only some mainly email id's are allowed)</li>
                                    <li>One User blogs no changes comes by another </li>
                                    <li>One User Comments on other user blogs have no changes comes by other user</li>
                                    <li>Every User Blogs have no confilct</li>
                                    <li>User provide own blogs changes (Create,Updates,Delete)</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
