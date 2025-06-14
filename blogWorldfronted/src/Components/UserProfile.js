import React, { useEffect, useRef, useState } from 'react'

export default function UserProfile(props) {
    const [userdata, setUserData] = useState({ name: "blogWorld User", username: "bwrold4567", email: "bw@gmail.com", time: "2024-0-21" })
    const ref = useRef();
    const updateRef = useRef();
    const deleteRef = useRef();
    const host = "http://localhost:8900";
    const [Passwd, setPasswd] = useState("");
    const [updateData, setUpdateData] = useState({ name: "", newPasswd: "" });
    const { showAlert } = props;
    const [accFin, setAccFin] = useState(false);
    const [temp, setTemp] = useState({ passwd: "", err: "" });

    useEffect(() => {
        try {
            (async () => {
                const response = await fetch(`${host}/api/auth/getuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'auth-token': sessionStorage.getItem("auth-token"),
                        'bw_auth_token': sessionStorage.getItem("bw_auth_token"),
                    }
                });
                const data = await response.json();
                // console.log(data)
                setUserData({ name: data.user.name, username: data.user.username, email: data.user.email, time: data.user.time });
                setUpdateData({ name: data.user.name });
            })();
        } catch (error) {
            console.error(error)
        }
    }, []);

    const passwordVerify = async () => {
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'bw_auth_token': sessionStorage.getItem("bw_auth_token"),
                },
                body: JSON.stringify({ username: userdata.username, password: Passwd })
            });
            const data = await response.json();
            // console.log(data)
            if (data.success) {
                document.getElementById("error").style.display = "none";
                setTemp({ passwd: Passwd });
                setPasswd("");
                accFin ? deleteRef.current.click() :
                    updateRef.current.click();

            } else {
                setPasswd("");
                document.getElementById("error").style.display = "inline-block";
            }
        } catch (error) {
            console.error(error);
        }
    }


    const updateProfile = async () => {
        try {
            if ((updateData.name === userdata.name || updateData.name === undefined || updateData.name === "") && updateData.newPasswd === undefined) {
                setUpdateData({ name: userdata.name, newPasswd: "" });
                showAlert("warning", "No any changes coming!");
                updateRef.current.click();
                return;
            }
            const response = await fetch(`${host}/api/auth/updateprofile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("auth-token"),
                    'bw_auth_token': sessionStorage.getItem("bw_auth_token"),
                },
                body: JSON.stringify({ name: updateData.name || userdata.name, password: updateData.newPasswd || temp.passwd })
            });
            const data = await response.json();
            if (data.success) {
                showAlert("success", "Successfully Updated Your Changes");
                setUpdateData({ name: "", newPasswd: "" });
                updateRef.current.click()
            } else {
                setUpdateData({ name: "", newPasswd: "" });
                console.log(data.error)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const clearPanel = (id) => {
        if (id) {
            setPasswd("");
            document.getElementById("error").style.display = "none";
        } else {
            setUpdateData({ name: userdata.name, newPasswd: "" });
            document.getElementById("error").style.display = "none";
        }
    }

    const passwdOnChange = (e) => { setPasswd(e.target.value); }
    const onchange = (e) => { setUpdateData({ ...updateData, [e.target.name]: e.target.value }) }
    return (
        <>
            <div className="df mainContainer">
                <div className="container df my-5">
                    <div className="container card mb-3 profile">
                        <div className="card-body">
                            <h1 className="df card-title">Profile</h1>
                            <p className="card-text"><span className='h5'>Name : </span>{userdata.name}</p>
                            <p className="card-text"><span className='h5'>Username : </span>{userdata.username}</p>
                            <p className="card-text"><span className='h5'>Email : </span>{userdata.email}</p>
                            <p className="card-text"><span className='h5'>Registered Time : </span>{userdata.time}</p>
                            <p className="card-text" title='Password is secure by Encrypted form'><span className='h5'>Password : </span>  ************</p>
                        </div>
                        <div className="card-body">
                            <div className="df justify-content-between">
                                <button type="button" className='btn btn-primary' onClick={() => { setAccFin(false); ref.current.click(); }}>Update Profile</button>
                                <button type="button" className='btn btn-danger' onClick={() => { setAccFin(true); ref.current.click(); }}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ----------Password Verification-------------- */}
                {/* <!-- Button trigger modal --> */}
                <button type="button" ref={ref} data-bs-toggle="modal" data-bs-target="#passwdVerify">
                </button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="passwdVerify" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-secondary bg-opacity-50 rounded">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
                                <button type="button" className="btn-close" onClick={() => clearPanel(1)} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="mb-3">
                                        <label htmlFor="inputPassword5" className="form-label">Re-Enter Password <span style={{ display: "none" }} className="text-danger" id='error'>(Invalid Password)</span></label>
                                        <input type="password" required value={Passwd} onChange={passwdOnChange} id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning" onClick={() => clearPanel(1)} data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={passwordVerify}>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update data */}
                <button type="button" ref={updateRef} data-bs-toggle="modal" data-bs-target="#updateing">
                </button>
                <div className="modal fade" id="updateing" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-secondary bg-opacity-50 rounded">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Profile <span style={{ display: "none" }} className="text-danger" id='error1'>({temp.err})</span></h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => clearPanel(0)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing1">Name</span>
                                    <input type="text" className="form-control" name='name' value={updateData.name} onChange={onchange} aria-label="Sizing example input" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing2">Password</span>
                                    <input type="password" className="form-control" id='newPasswd' name='newPasswd' value={updateData.newPasswd} onChange={onchange} aria-label="Sizing example input" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning" onClick={() => clearPanel(0)} data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={updateProfile}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Delete Account */}
                <button type="button" ref={deleteRef} data-bs-toggle="modal" data-bs-target="#deleteAccount">
                </button>

                <div className="modal fade" id="deleteAccount" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-secondary bg-opacity-50 rounded">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Account</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <li>Are you sure for your account delete?</li>
                                <li>Your all blogs and records are deleted!</li>
                                <li>Account is not recovery again and also data is not recovery!</li>
                                <li>If any problem face you, so please contact soon by CONTACT page!</li>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
