import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const CosmeticDetail = () => {
    const { cosid } = useParams();

    const [cosdata, cosdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/cosmetic/" + cosid).then((res) => {
            console.log(cosid)
            return res.json();
        }).then((resp) => {
            cosdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

            <div className="container">

                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>Cosmetic Detail</h2>
                    </div>
                    <div className="card-body"></div>

                    {cosdata.data &&
                        <div>
                            <h2>Thename is : <b>{cosdata.data.cos_name}</b>  ({cosdata.data.id})</h2>
                            <Link className="btn btn-danger" to="/">Back to Listing</Link>
                        </div>
                    }
                </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default CosmeticDetail;