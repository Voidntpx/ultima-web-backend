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
            console.log(cosdata.data)
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
                        cosdata.data.map(item => (
                            <tr key={item.Id}>
                                <td>{item.Id}</td>
                                <td>{item.cos_brand}</td>
                                <td>{item.cos_name}</td>
                                <td>{item.cos_desc}</td>
                                <td>{item.cos_cate}</td>

                            </tr>
                        ))
                    }
                </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default CosmeticDetail;