import React from 'react'

export default function Alert(props) {
    const { alert } = props;
    return (
        <><div className="container position-absolute">
            {alert && <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
            </div>}
        </div>
        </>
    )
}
