import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import $ from 'jquery'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

library.add(fab, fas, far)




const FragranceCreate = (props) => {

    const firebaseConfig = {
        apiKey: "AIzaSyAoiSAbsT3BlyqiebCozc6J3BgtV6re2gU",
        authDomain: "ultima-b32f3.firebaseapp.com",
        projectId: "ultima-b32f3",
        storageBucket: "ultima-b32f3.appspot.com",
        messagingSenderId: "889329332221",
        appId: "1:889329332221:web:4ac563814d6a18aba7f394",
        measurementId: "G-Y7B7DV2CLL",
        storageBucket: 'gs://ultima-b32f3.appspot.com'
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // const { value } = props.location.state;
    const storage = getStorage(app);

    const [brand, brandchange] = useState("");
    const [name, namechange] = useState("");
    const [desc, descchange] = useState("");
    // const [cate, catechange] = useState("");
    const [cate, setCate] = React.useState('');

    const handleChange = (event) => {
        setCate(event.target.value);
    };

    // const [tryon_name, tryon_namechange] = useState("");
    // const [tryon_color, tryon_colorchange] = useState("");
    const [p_img, p_imgchange] = useState("");
    const [ing_id, ing_idchange] = useState("");
    // const [cos_color_img, cos_color_imgchange] = useState("");

    // const [tryon, tryonchange] = useState(true);
    const [tryon, setIsChecked] = useState(false)
    const [validation, valchange] = useState(false);
    const [validation2, valchange2] = useState(false);
    const [validation3, valchange3] = useState(false);
    const [validation4, valchange4] = useState(false);
    const [validation5, valchange5] = useState(false);
    const [validation6, valchange6] = useState(false);
    const [validation7, valchange7] = useState(false);

    const navigate = useNavigate();

    // const checkHandler = () => {
    //     setIsChecked(!tryon)
    // }



    // const list_tryon_name = tryon_name.split(',');
    // const list_tryon_color = tryon_color.split(',');

    async function sendImg(listColorImg) {
        let urlColorImg = [];
        for (let i = 0; i < listColorImg.length; i++) {
            let storageRef = ref(storage, uuidv4());
            await uploadBytes(storageRef, listColorImg[i][0]).then((snapshot) => {
                // console.log(snapshot);
                urlColorImg.push("https://firebasestorage.googleapis.com/v0/b/ultima-b32f3.appspot.com/o/" + snapshot.metadata.fullPath + "?alt=media");
            });
        }
        return urlColorImg;
    }

    const handlesubmit = async (e) => {

        let mylist = [];
        e.preventDefault();


        const listColorImg = cos_color_img_list.filter(item => !(typeof item === 'object' && item.service === ''));
        // // const listColorImg = previewImages.filter(item => !(item == undefined));
        // console.log(listColorImg);

        let urlColorImg = await sendImg(listColorImg);
        console.log(urlColorImg);

        const list_ing_id = ing_id.split(',');
        // const list_obj_ing_id = [];

        // console.log(list_ing_id[0])

        for (let i = 0; i < list_ing_id.length; i++) {
            const check_data = {
                "name": list_ing_id[i]
            }
            // console.log(check_data)
            await fetch("https://apiservice-d5qtigtmea-as.a.run.app/ingredient/find", {
                method: "POST",
                headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
                body: JSON.stringify(check_data)
            }).then((res) => {

                // console.log(res.json());
                return res.json();

                // navigate('/')
            }).then((resp) => {
                // cosdatachange(resp)
                if (resp['ing_id'] != undefined) {
                    console.log(resp['ing_id'])
                    // list_obj_ing_id.push(resp['ing_id'])
                    // addItemToList(resp['ing_id']);
                    mylist.push(resp['ing_id'])

                    // addItemToList(resp['ing_id']);
                    // num = num+1;

                    // list_obj_ing_id.append(resp['ing_id']);
                }

            }).catch((err) => {
                console.log(err.message)
            })
        }

        const cosdata = {
            "p_brand": brand,
            "p_name": name,
            "p_desc": desc,
            "p_cate": cate,
            "p_img": p_img,
            // "l_link":,
            // "cos_istryon": tryon,
            // "cos_color_img": urlColorImg,
            // "cos_tryon_name": list_tryon_name,
            // "cos_tryon_color": list_tryon_color,
            "ing_id": mylist
            
        };
        console.log(cosdata);


        // fetch("https://apiservice-d5qtigtmea-as.a.run.app/fragrance/create", {
        //     method: "POST",
        //     headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoiRnJhbmsifQ.b2tDz1PyZBMF7IuelehsHvhmD8d2uZt2lrndTB7XMWc" },
        //     body: JSON.stringify(cosdata)
        // }).then((res) => {
        //     alert('Saved successfully.')
        //     navigate('/')
        // }).catch((err) => {
        //     console.log(err.message)
        // })




    }

    const [cos_img_list, setCos_img_list] = useState([{ service: "" }]);

    const handleCos_imgChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...cos_img_list];
        // console.log(name)
        list[index] = value;
        setCos_img_list(list);
    };

    const handleCos_imgRemove = (index) => {
        const list = [...cos_img_list];
        list.splice(index, 1);
        console.log('when delete :' + list);
        setCos_img_list(list);
    };

    const handleCos_imgAdd = () => {
        setCos_img_list([...cos_img_list, { service: "" }]);
    };


    const [cos_color_img_list, setCos_color_img_list] = useState([{ service: "" }]);
    const fileInputRef = useRef(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [color_img_disabled, setColorDisabled] = useState(true);
    // console.log(cos_color_img_list);
    // console.log(previewImages);

    useEffect(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [cos_color_img_list], [previewImages]);

    const handleCos_color_imgChange = (e, index) => {
        // const { name, value } = e.target;
        // const list = [...cos_color_img_list];
        // // console.log(name)
        // list[index] = value;
        // // setCos_color_img_list(list);
        // updateList(list);

        const files = Array.from(e.target.files);
        const updatedList = [...cos_color_img_list];
        updatedList[index] = files;
        setCos_color_img_list(updatedList);
        previewFiles(files, index);
    };

    const handleCos_color_imgRemove = (index) => {
        const list = [...cos_color_img_list];
        list.splice(index, 1);
        console.log('delete');
        setCos_color_img_list(list);

        
        const updatedPreviewList = [...previewImages];
        updatedPreviewList.splice(index, 1);
        setPreviewImages(updatedPreviewList);
    };

    const updateList = (list) => {
        // const updatelist = list.slice(0, -1).filter(item => !(typeof item === 'object' && item.service === ''));
        const updatelist = list.filter(item => !(typeof item === 'object' && item.service === ''));
        console.log(updatelist);
        // setCos_color_img_list([...updatelist, list[list.length - 1]]);
        setCos_color_img_list(updatelist);
    }

    const handleCos_color_imgAdd = () => {
        setColorDisabled(false);
        setCos_color_img_list([...cos_color_img_list, { service: "" }]);
    };

    const previewFiles = (files, index) => {
        const updatedPreviewList = [...previewImages];
        const readerPromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readerPromises)
            .then((results) => {
                updatedPreviewList[index] = results;
                setPreviewImages(updatedPreviewList);
            })
            .catch((error) => {
                console.log('Error occurred while reading files:', error);
            });
    };

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    return (
        <div className="create-cosmetic">
            <p className="title">Add Fragrance</p>
            <form className="container" onSubmit={handlesubmit}>
                <div className="card create-cosmetic-card" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        {/* <h2>Cosmetic Create</h2> */}
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="d-flex gap-4">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <input type="text" required value={brand} onMouseDown={e => valchange(true)} onChange={e => brandchange(e.target.value)} className="form-control"></input>
                                        {brand.length == 0 && validation && <span className="text-danger">Enter the Brand</span>}
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" required value={name} onMouseDown={e => valchange2(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        {name.length == 0 && validation2 && <span className="text-danger">Enter the Name</span>}
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-12">
                                <div className="form-group">
                                    <br></br>
                                    <label>Description</label>
                                    <textarea rows="5" type="text" required value={desc} onMouseDown={e => valchange3(true)} onChange={e => descchange(e.target.value)} className="form-control"></textarea>
                                    {desc.length == 0 && validation3 && <span className="text-danger">Enter the Description</span>}
                                </div>
                            </div>


                            <div className="col-lg-12">
                                
                                <div className="form-group">
                                    <br></br>
                                    {/* <label>Category</label> */}
                                    <FormControl sx={{ m: 0, minWidth: 462 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={cate}
                                            label="Category"
                                            onChange={handleChange}
                                        >
                                            {/* <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem> */}
                                            <MenuItem value={"Fragrance"}>Fragrance</MenuItem>
                                            {/* <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem> */}
                                        </Select>
                                        {/* <FormHelperText>With label + helper text</FormHelperText> */}
                                    </FormControl>
                                        
                                    
                                    {/* <input type="text" required value={cate} onMouseDown={e => valchange4(true)} onChange={e => catechange(e.target.value)} className="form-control"></input>
                                    {cate.length == 0 && validation4 && <span className="text-danger">Enter the Category</span>} */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <br></br>
                                            <label>Fragrance Image</label>
                                            <input type="text" required value={p_img} onMouseDown={e => valchange6(true)} onChange={e => p_imgchange(e.target.value)} className="form-control"></input>
                                            {p_img.length == 0 && validation6 && <span className="text-danger">eg. Lazada, Konvy</span>}
                                        </div>
                                    </div>
                                   
                                    <br></br>
                                    <label>Link to store</label>
                                    
                                </div>
                            </div>
                            

                            {cos_img_list.map((singleService, index) => (
                                <div key={index} className="services">
                                    <div className="first-division">
                                        <input
                                            name="service"
                                            type="text"
                                            id="service"
                                            value={singleService.service}
                                            onChange={(e) => handleCos_imgChange(e, index)}
                                            required
                                        />
                                        {cos_img_list.length - 1 == index && cos_img_list.length < 100 && (
                                            <button
                                                type="button"
                                                onClick={handleCos_imgAdd}
                                                className="add-btn"
                                            >
                                                <span>+ more image</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="second-division">
                                        {cos_img_list.length !== 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleCos_imgRemove(index)}
                                                className="remove-btn"
                                            >
                                                <span>Remove</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                            ))}


                           
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <br></br>
                                    <label>Ingredient Name</label>
                                    <input type="text" required value={ing_id} onMouseDown={e => valchange7(true)} onChange={e => ing_idchange(e.target.value)} className="form-control"></input>
                                    {ing_id.length == 0 && validation7 && <span className="text-danger">eg. Propanediol,Cyclohexasiloxane</span>}
                                </div>
                            </div>

                           
                           


                            

                            <div className="col-lg-12">
                                <br></br>
                                <div className="form-group">

                                    <button className="btn btn-success" type="submit">Save</button>
                                    <Link to="/" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FragranceCreate;






// 	Cos_brand       string`json:"cos_brand,omitempty"`
// 	Cos_name        string`json:"cos_name,omitempty"`
// 	Cos_desc        string`json:"cos_desc,omitempty"`
// 	Cos_cate        string`json:"cos_cate,omitempty"`
// Cos_img[]interface{ } `json:"cos_img,omitempty"`
// 	Cos_istryon     bool`json:"cos_is-try-on,omitempty"`
// Cos_color_img[]interface{ } `json:"cos_color-img,omitempty"`
// Cos_tryon_name[]interface{ } `json:"cos_try-on-name,omitempty"`
// Cos_tryon_color[]interface{ } `json:"cos_try-on-color,omitempty"`
// Ing_id[]primitive.ObjectID`json:"cos_ing_id,omitempty"`