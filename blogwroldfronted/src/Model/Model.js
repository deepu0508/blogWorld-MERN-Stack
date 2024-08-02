import React from 'react'

export default function Model(props) {
    const {type,typeMess,mess,btn,ref} = props;
    return (
        <>
            <button type="button" ref={ref} data-bs-toggle="modal" data-bs-target="#typeInput"></button>
            <div className="modal fade" id="typeInput" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content bg-secondary bg-opacity-50 rounded`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{typeMess}</h1>
                        </div>
                        <div className="modal-body">
                            {mess}
                        </div>
                        <div className="modal-footer">
                            {btn && <button type="button" className={`btn btn-${type}`} data-bs-dismiss="modal">OK</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
