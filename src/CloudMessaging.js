import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import $ from 'jquery'
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/messaging';

library.add(fab, fas, far)





const CloudMessaging = () => {



    // const [open, setOpen] = React.useState(false);
    const [cosdata, cosdatachange] = useState(null);
    const navigate = useNavigate();
    const check = (<FontAwesomeIcon className="icon check" icon="fa-regular fa-circle-check" />);
    const uncheck = (<FontAwesomeIcon className="icon uncheck" icon="fa-regular fa-circle-xmark" />);
    const total_cos = cosdata ? cosdata.data.data.length : 0;


    const [title, titlechange] = useState("");
    const [validation, valchange] = useState(false);

    const [body, bodychange] = useState("");
    const [validation2, valchange2] = useState(false);


    const handlesubmit = async (e) => {
        e.preventDefault();
        alert(title + ' : ' + body);
        const message_data = {
            "title": title,
            "body": body
        }

        fetch("https://apiservice-d5qtigtmea-as.a.run.app/notification/sendall", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc"
            },
            body: JSON.stringify(message_data)
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            alert(resp)
            // cosdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })



    }

    // useEffect(() => {
    //     fetch("https://apiservice-d5qtigtmea-as.a.run.app/user/ultima", {
    //         headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
    //     }).then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         console.log(resp)
    //         cosdatachange(resp);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })

    // }, [])
    return (
        <div className="create-cosmetic">
            <p className="title">Push Notification</p>
            <form className="container" onSubmit={handlesubmit}>
                <div className="card create-cosmetic-card" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        {/* <h2>Cosmetic Create</h2> */}
                    </div>
                    <div className="card-body">
                        <div className="row">


                            <div className="col-lg-12">
                                <div className="form-group">
                                    <br></br>
                                    <label>Title</label>
                                    <input type="text" required value={title} onMouseDown={e => valchange(true)} onChange={e => titlechange(e.target.value)} className="form-control"></input>
                                    {title.length == 0 && validation && <span className="text-danger">Enter the Title</span>}

                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <br></br>
                                    <label>Body</label>
                                    <textarea rows="5" type="text" required value={body} onMouseDown={e => valchange2(true)} onChange={e => bodychange(e.target.value)} className="form-control"></textarea>
                                    {body.length == 0 && validation2 && <span className="text-danger">Enter the bodyription</span>}
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <br></br>
                                    <button className="btn btn-success" type="submit">Send</button>
                                    {/* <Link to="/" className="btn btn-danger">Back</Link> */}
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CloudMessaging;