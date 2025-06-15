import React from 'react'

export default function Service() {
  const collapsed = (btnid, id) => {
    let btn = document.getElementById(btnid);
    let content = document.getElementById(id);
    if (btn.classList.contains("collapsed")) {
      btn.classList.remove("collapsed");
        content.classList.add("show");
    }else{
      btn.classList.add("collapsed");
        content.classList.remove("show");
    }
  }
  return (
    <>
      <div className="my-3 mainContainer">
        <div className="container df text-light">
          <div className="df flex-column my-3 py-3 rounded about-content">
            <h1 className="contact-head">Our Services</h1>
            <div className="container my-3 p-2 rounded ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat harum esse omnis velit vitae nulla
              nemo eaque illum numquam. Iure neque nulla excepturi odit alias quas quasi blanditiis quis.
              Temporibus, necessitatibus quia quas fugit magnam ratione repellendus facere quo asperiores aliquid
              ipsam incidunt neque labore modi sapiente pariatur saepe animi.
            </div>
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item text-light">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-primary text-light" type="button" id='accordion-btn1' onClick={()=>collapsed("accordion-btn1","about-content1")}>
                    Blog Content Creating
                  </button>
                </h2>
                <div id="about-content1" className="accordion-collapse collapse show">
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> 
                    It is shown by default, until
                    the collapse plugin adds the appropriate classes that we use to style each element.
                    These classes control the overall appearance, as well as the showing and hiding via CSS
                    transitions. You can modify any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML can go within the
                    <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item text-light">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-warning text-light collapsed" type="button" id='accordion-btn2' onClick={()=>collapsed("accordion-btn2","about-content2")}>
                    Show your Blog
                  </button>
                </h2>
                <div id="about-content2" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default,
                    until the collapse plugin adds the appropriate classes that we use to style each
                    element. These classes control the overall appearance, as well as the showing and hiding
                    via CSS transitions. You can modify any of this with custom CSS or overriding our
                    default variables. It's also worth noting that just about any HTML can go within the
                    <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item text-light">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-danger text-light collapsed" type="button" onClick={()=>collapsed("accordion-btn3","about-content3")} id='accordion-btn3'>
                    Read Others Blog
                  </button>
                </h2>
                <div id="about-content3" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until
                    the collapse plugin adds the appropriate classes that we use to style each element.
                    These classes control the overall appearance, as well as the showing and hiding via CSS
                    transitions. You can modify any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML can go within the
                    <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item text-light">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-success text-light collapsed" type="button" onClick={()=>collapsed("accordion-btn4","about-content4")} id='accordion-btn4'>
                    Accordion Item #4
                  </button>
                </h2>
                <div id="about-content4" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until
                    the collapse plugin adds the appropriate classes that we use to style each element.
                    These classes control the overall appearance, as well as the showing and hiding via CSS
                    transitions. You can modify any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML can go within the
                    <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
