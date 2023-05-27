import React, { useEffect, useState } from "react";
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

const LoadDetail = ({ id }) => {
    const [cosdata_detail, setcosdataDetail] = useState({});
    const [ing, setIng] = useState([]);
    // navigate("/cosmetic/detail/" + id);
    useEffect(() => {
        fetch("https://apiservice-d5qtigtmea-as.a.run.app/cosmetic/" + id).then((res) => {
            // console.log(cosid)
            return res.json();
        }).then((resp) => {
            setcosdataDetail(resp);
            // console.log(resp);
            // console.log(cosdata_detail);
        }).catch((err) => {
            console.log(err.message);
        })

        fetch("https://apiservice-d5qtigtmea-as.a.run.app/cosmetic/ingredient/" + id).then((res) => {
            // console.log(cosid)
            return res.json();
        }).then((resp) => {
            setIng(resp);
            console.log(resp);
            console.log(ing);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [id]);

    if (!cosdata_detail || !ing) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <tr>
            <td colSpan={6}>
                <div className="w-100 cos-detail">
                    {cosdata_detail.data &&
                        cosdata_detail.data.map(item => (
                            <div key={item.Id}>
                                <label>Description</label>
                                <textarea rows="5" type="text" className="w-100" value={item.cos_desc} disabled></textarea>
                                {item.cos_color_img && (
                                    <div className="pt-3">
                                        <label>Color</label>
                                        <div className="d-flex gap-3 pt-2">
                                            {item.cos_color_img && item.cos_color_img.map((color_img, index) => (
                                                <div className="img-color" key={index} style={{ backgroundImage: `url(${color_img})` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* {item.cos_img && (
                                    <div className="pt-3">
                                        <label>Image</label>
                                        <div className="d-flex gap-3 pt-2">
                                            {item.cos_img && item.cos_img.map((cos_img, index) => (
                                                <div className="img-cos" key={index} style={{ backgroundImage: `url(${cos_img})` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                )} */}
                                {item.cos_tryon_name && (
                                    <div className="d-flex gap-3 pt-4">
                                        <div>
                                            <label>Try-on Name</label>
                                            <input type="text" value={item.cos_tryon_name} disabled></input>
                                        </div>
                                        <div>
                                            <label>Try-on Color</label>
                                            <input type="text" value={item.cos_tryon_color} disabled></input>
                                        </div>

                                    </div>
                                )}
                                {ing.data && (
                                    <>
                                        <label className="pt-4 pb-1">Ingredients</label>
                                        <div className="ing-tag gap-2">
                                            {ing.data.map((ings, index) => (
                                                <React.Fragment key={index}>
                                                    {ings.map((ing, index) => (
                                                        <div className="ing-tag_wrapper">
                                                            <p key={index}>{ing.name}</p>
                                                        </div>
                                                    ))}
                                                </React.Fragment>

                                            ))}
                                        </div>

                                    </>
                                )}
                                {item.l_link && item.l_link.map((e, index) => (
                                    <div key={index}>
                                        <label className="pt-4">Link to store</label>
                                        <input type="text" value={e} disabled></input>
                                    </div>
                                ))}




                            </div>
                        ))
                    }
                </div>
            </td>
        </tr>
    );
};

const CosmeticListing = () => {
    const [cosdata, cosdatachange] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    const check = (<FontAwesomeIcon className="icon check" icon="fa-regular fa-circle-check" />);
    const uncheck = (<FontAwesomeIcon className="icon uncheck" icon="fa-regular fa-circle-xmark" />);
    const total_cos = cosdata ? cosdata.data.length : 0;
    let delay = 0.5;
    let delay__ = '';

    const handleLoadDetail = (id) => {
        setSelectedId(id);
    };

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
            // console.log(resp)
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
                                                <tr className="animate__animated animate__fadeInUp animate__delay-1s" style={{ '--animate-delay': '0.5s' }}>
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
                                                        delay += .08, delay__ = delay + 's',
                                                        <>
                                                            <tr key={item.Id} className="animate__animated animate__fadeInUp animate__delay-1s " style={{ '--animate-delay': delay__ }}>
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
                                                                    <div className="text-center d-flex align-items-center justify-content-center gap-4">
                                                                        {/* <FontAwesomeIcon className="icon trash" onClick={() => { LoadEdit(item.id) }} icon="fa-regular fa-pen-to-square" />   */}
                                                                        <FontAwesomeIcon className="icon trash" onClick={() => { Removefunction(item.Id) }} icon="fa-regular fa-trash-can" />
                                                                        <FontAwesomeIcon onClick={() => handleLoadDetail(item.Id)} icon="fa-solid fa-chevron-down" />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {selectedId === item.Id && <LoadDetail id={selectedId} />}


                                                        </>
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