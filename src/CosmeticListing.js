import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const CosmeticListing = () => {
    const [cosdata, cosdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/cosmetic/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/cosmetic/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/cosmetic/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        fetch("http://localhost:8000/cosmetic/checkall").then((res) => {

            return res.json();
        }).then((resp) => {
            cosdatachange(resp)
            // console.log(resp)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="car">
                <div className="card-title">
                    <h2>Cosmetic Listing</h2>
                </div>
                <div>
                    {(() => {
                        if (cosdata) {
                            return (
                                <div className="card-body">
                                    <div className="divbtn">
                                        <Link to="cosmetic/create" className="btn btn-success">Add New (+)</Link>
                                    </div>
                                    <table className="table table-bordered">
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <td>Id</td>
                                                <td>Brand</td>
                                                <td>Name</td>
                                                <td>Description</td>
                                                <td>Category</td>
                                                <td>Action</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cosdata.data &&
                                                cosdata.data.map(item => (
                                                    <tr key={item.Id}>
                                                        <td>{item.Id}</td>
                                                        <td>{item.cos_brand}</td>
                                                        <td>{item.cos_name}</td>
                                                        <td>{item.cos_desc}</td>
                                                        <td>{item.cos_cate}</td>
                                                        <td>
                                                            {/* <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a> */}
                                                            <a onClick={() => { Removefunction(item.Id) }} className="btn btn-danger">Remove</a>
                                                            <a onClick={() => { LoadDetail(item.Id) }} className="btn btn-primary">Details</a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        } else {
                            return (
                                <div>no data</div>
                            )
                        }
                    })()}
                </div>


            </div>
        </div>
    )
}

export default CosmeticListing;