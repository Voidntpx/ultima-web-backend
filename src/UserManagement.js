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

library.add(fab, fas, far)

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const UserListing = () => {
    // const [open, setOpen] = React.useState(false);
    const [cosdata, cosdatachange] = useState(null);
    const navigate = useNavigate();
    const check = (<FontAwesomeIcon className="icon check" icon="fa-regular fa-circle-check" />);
    const uncheck = (<FontAwesomeIcon className="icon uncheck" icon="fa-regular fa-circle-xmark" />);
    const total_cos = cosdata ? cosdata.data.data.length : 0;
    // const LoadDetail = (id) => {
    //     navigate("/cosmetic/detail/" + id);
    // }
    // const LoadEdit = (id) => {
    //     navigate("/cosmetic/edit/" + id);
    // }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            console.log(id)
            fetch("http://localhost:8000/user/" + id, {
                method: "DELETE",
                headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const Editfunction = (id) => {
        navigate('/user/management/edit')
            // alert('Edit successfully.'+id)
            // console.log(id)
        //     fetch("http://localhost:8000/user/" + id, {
        //         method: "DELETE",
        //         headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
        //     }).then((res) => {
        //         alert('Removed successfully.')
        //         window.location.reload();
        //     }).catch((err) => {
        //         console.log(err.message)
        //     })
        // }
    
}

    const changeAdmin = (id) => {
        // console.log(id)
        fetch("http://localhost:8000/user/" + id, {
            method: "GET",
            headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
        }).then((res) => {
            // alert('Change successfully.')
            return res.json();
        }).then((resp) => {
            // console.log(resp['data']['data']['admin'])
            if (resp['data']['data']['admin'] == 'NA') {
                const admin_data = {
                    "admin": "SA"
                }
                fetch("http://localhost:8000/user/" + id, {
                    method: "PUT",
                    headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
                    body: JSON.stringify(admin_data)
                }).then((res) => {
                    alert('Change successfully.')
                    return res.json();

                }).catch((err) => {
                    console.log(err.message)
                })
            } else {
                const admin_data = {
                    "admin": "NA"
                }
                fetch("http://localhost:8000/user/" + id, {
                    method: "PUT",
                    headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
                    body: JSON.stringify(admin_data)
                }).then((res) => {
                    alert('Change successfully.')
                    return res.json();

                }).catch((err) => {
                    console.log(err.message)
                })
            }
        }).catch((err) => {
            console.log(err.message)
        })
        // const admin_data = {
        //     "admin": "SA"
        // }
        // fetch("http://localhost:8000/user/" + id, {
        //         method: "PUT",
        //         headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
        //         body: JSON.stringify(admin_data)
        //     }).then((res) => {
        //         alert('Change successfully.')
        //         return res.json
        //         window.location.reload();
        //     }).catch((err) => {
        //         console.log(err.message)
        //     })
        // console.log('Un admin')
    }

    $(function () {
        $('.cate[value="Eyeshadows"]').addClass('eyeshadow');
        $('.cate[value="Blush on"]').addClass('blush');
        $('.cate[value="Lipstick"]').addClass('lip');
    });




    useEffect(() => {
        fetch("http://localhost:8000/user/ultima", {
            headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            cosdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })

    }, [])
    return (
        <div className="container cosmetic-content">
            <div className="car">
                <div className="total-box ms-3 mt-3">
                    <div className="title">
                        <div>
                            <FontAwesomeIcon className="pb-1" icon="fa-solid fa-newspaper" /><br></br>
                            <label>Total User in</label><br></br>
                            <label>Ultima : Admin</label>
                        </div>
                    </div>
                    <p className="pe-4">{total_cos}</p>
                </div>
                <div className="card-title ps-4 pt-4 ms-3 mt-3 d-flex align-items-center">
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" />
                    <h2 className=" title ps-2">User Management</h2>
                </div>
                <div>
                    {(() => {
                        if (cosdata) {
                            return (
                                <div className="card-body">
                                    {/* <div className="p-4 m-3 divbtn">
                                        <Link to="cosmetic/create" className="btn btn-success">Add New (+)</Link>
                                    </div> */}
                                    <div className="p-4 m-3">
                                        <table className="table table-cosmetic">
                                            <thead>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>First Name</td>
                                                    <td>Last Name</td>
                                                    <td>Admin</td>
                                                    {/* <td className="text-center">Try-on</td> */}
                                                    {/* <td className="text-center">Admin</td> */}
                                                    <td className="text-center">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cosdata.data.data &&
                                                    cosdata.data.data.map(item => (

                                                        <tr key={item.id}>
                                                            {/* <td>{item.Id}</td> */}
                                                            {/* <td><img src={item.cos_img[0]} /></td> */}
                                                            <td>{item.email}</td>
                                                            {/* <td>{item.firstname}</td> */}
                                                            <td className="name">{item.firstname}</td>
                                                            <td className="name">{item.lastname}</td>
                                                            {item.admin == "root" ? <></>
                                                                :

                                                                <div>
                                                                    {item.admin == "SA" ?
                                                                        <td className="name"><FormControlLabel
                                                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                                                            onClick={() => changeAdmin(item.id)}
                                                                        // onChange={changeAdmin(item.id)}
                                                                        />
                                                                        </td>
                                                                        :
                                                                        <td className="name"><FormControlLabel
                                                                            control={<IOSSwitch sx={{ m: 1 }} />}
                                                                            onClick={() => changeAdmin(item.id)}
                                                                        // onClick={changeAdmin(item.id)}
                                                                        // onChange={changeAdmin(item.id)}
                                                                        />
                                                                        </td>
                                                                    }
                                                                </div>
                                                            }
                                                            {/* <td>{item.cos_desc}</td> */}

                                                            {/* <td className="text-center">{item.cos_istryon == true ? check : uncheck}</td> */}

                                                            {/* <div className="cate" value={item.cos_cate}>{item.cos_cate}</div> */}


                                                            <td>
                                                                {/* <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a> */}
                                                                {/* <a onClick={() => { Removefunction(item.Id) }} className="btn btn-danger">Remove</a>
                                                            <a onClick={() => { LoadDetail(item.Id) }} className="btn btn-primary">Details</a>  */}
                                                                <div className="text-center">
                                                                    {/* <FontAwesomeIcon className="icon trash" onClick={() => { LoadEdit(item.id) }} icon="fa-regular fa-pen-to-square" />   */}
                                                                    {item.admin == "root" ? <></>
                                                                        :
                                                                        <>
                                                                            <FontAwesomeIcon className="icon trash" onClick={() => { Editfunction(item.id) }} icon="fa-solid fa-user-pen" />
                                                                            <>&ensp;</>
                                                                            <FontAwesomeIcon className="icon trash" onClick={() => { Removefunction(item.id) }} icon="fa-regular fa-trash-can" />
                                                                        </>
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            )
                        } else {
                            return (

                                <div className="loader">Loading...</div>

                            )
                        }
                    })()}
                </div>


            </div>
        </div>
    )
}

export default UserListing;