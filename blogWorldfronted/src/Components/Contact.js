import React from 'react'

export default function Contact() {
  return (
    <>
      <div className="my-3 mainContainer">
        <div className="container df text-light">
            <div className="df flex-column my-3 py-3 rounded contact-page">
                <h1 className="contact-head">Contact</h1>
                <form action=""className='contact-form'>
                    <div className="mb-3">
                        <label htmlFor="contact-name" className="form-label">Enter Name</label>
                        <input type="email" className="form-control" id="contact-name" placeholder="Enter name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact-email" className="form-label">Enter Email address</label>
                        <input type="email" className="form-control" id="contact-email" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact-txt" className="form-label">Enter Text</label>
                        <textarea className="form-control" id="contact-txt" rows="3" placeholder='Enter some here...'></textarea>
                    </div>
                    <div className="mb-3 df justify-content-end">
                        <button className="btn btn-info contact-btn" type="submit" id="contact">Send →</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}
