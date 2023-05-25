import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import $ from 'jquery'
import 'animate.css';

library.add(fab, fas, far)

const CosmeticListing = () => {
    const [cosdata, cosdatachange] = useState(null);
    const navigate = useNavigate();
    const check = (<FontAwesomeIcon className="icon check" icon="fa-regular fa-circle-check" />);
    const uncheck = (<FontAwesomeIcon className="icon uncheck" icon="fa-regular fa-circle-xmark" />);
    const total_cos = cosdata ? cosdata.data.length : 0;
    let delay = 0.5;
    let delay__ ='';
   
    const LoadDetail = (id) => {
        navigate("/cosmetic/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/cosmetic/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://apiservice-d5qtigtmea-as.a.run.app/cosmetic/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    $(function () {
        $('.cate[value="Eyeshadows"]').addClass('eyeshadow');
        $('.cate[value="Blush on"]').addClass('blush');
        $('.cate[value="Lipstick"]').addClass('lip');
    });




    useEffect(() => {
        fetch("https://apiservice-d5qtigtmea-as.a.run.app/cosmetic/checkall").then((res) => {
            return res.json();
        }).then((resp) => {
            cosdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })

    }, [])
    return (
        <div className="container cosmetic-content h-100">
            <div className="ca h-100">
                <div className="ms-4 ps-4">
                    <div className="total-box mt-3 animate__animated animate__fadeInUp">
                        <div className="title">
                            <div>
                                <FontAwesomeIcon className="pb-1" icon="fa-solid fa-newspaper" /><br></br>
                                <label>Total Product in</label><br></br>
                                <label>Category : Cosmetics</label>
                            </div>
                        </div>
                        <p className="pe-4">{total_cos}</p>
                    </div>
                </div>

                <div className="card-title ps-4 py-4 ms-4 my-2 d-flex align-items-center animate__animated animate__delay-1s animate__fadeInUp">
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" />
                    <h2 className=" title ps-2">Cosmetic List</h2>
                </div>
                <div className="scorll">
                    {(() => {
                        if (cosdata) {
                            return (
                                <div className="card-body">
                                    {/* <div className="p-4 m-3 divbtn">
                                        <Link to="cosmetic/create" className="btn btn-success">Add New (+)</Link>
                                    </div> */}
                                    <div className="px-4 mx-3">
                                        <table className="table table-cosmetic">
                                            <thead>
                                                <tr className="animate__animated animate__fadeInUp animate__delay-1s" style={{'--animate-delay' : '0.5s'}}>
                                                    <td>Photo</td>
                                                    <td>Brand</td>
                                                    <td>Name</td>

                                                    <td className="text-center">Try-on</td>
                                                    <td className="text-center">Category</td>
                                                    <td className="text-center">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cosdata.data &&
                                                    cosdata.data.map(item => (
                                                        delay+=.08,delay__=delay+'s',
                                                        <tr key={item.Id} className="animate__animated animate__fadeInUp animate__delay-1s " style={{'--animate-delay' : delay__}}>
                                                            {/* <td>{item.Id}</td> */}
                                                            <td><img src={item.cos_img[0]} /></td>
                                                            <td>{item.cos_brand}</td>
                                                            <td className="name">{item.cos_name}</td>
                                                            {/* <td>{item.cos_desc}</td> */}

                                                            <td className="text-center">{item.cos_istryon == true ? check : uncheck}</td>
                                                            <td className="text-center">
                                                                <div className="cate" value={item.cos_cate}>{item.cos_cate}</div>
                                                            </td>
                                                            <td>
                                                                {/* <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a> */}
                                                                {/* <a onClick={() => { Removefunction(item.Id) }} className="btn btn-danger">Remove</a>
                                                            <a onClick={() => { LoadDetail(item.Id) }} className="btn btn-primary">Details</a>  */}
                                                                <div className="text-center">
                                                                    {/* <FontAwesomeIcon className="icon trash" onClick={() => { LoadEdit(item.id) }} icon="fa-regular fa-pen-to-square" />   */}
                                                                    <FontAwesomeIcon className="icon trash" onClick={() => { Removefunction(item.Id) }} icon="fa-regular fa-trash-can" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <div className="box"></div>
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

export default CosmeticListing;