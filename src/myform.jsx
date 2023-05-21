import React, { useState } from 'react';
import axios from 'axios';
import './MyForm.css'; // Import the CSS file for styling

const MyForm = () => {
    const [cosBrand, setCosBrand] = useState('');
    const [cosName, setCosName] = useState('');
    const [cosDesc, setCosDesc] = useState('');
    const [cosCate, setCosCate] = useState('');
    const [cosIsTryon, setCosIsTryon] = useState(false);
    const [cosImage, setCosImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value, type, checked, files } = event.target;

        if (type === 'checkbox') {
            setCosIsTryon(checked);
        } else if (type === 'file') {
            const imageFile = files[0];
            setCosImage(imageFile);
            setPreviewImage(URL.createObjectURL(imageFile));
        } else {
            switch (name) {
                case 'cosBrand':
                    setCosBrand(value);
                    break;
                case 'cosName':
                    setCosName(value);
                    break;
                case 'cosDesc':
                    setCosDesc(value);
                    break;
                case 'cosCate':
                    setCosCate(value);
                    break;
                default:
                    break;
            }
        }
    };

    const saveData = () => {
        const formData = new FormData();
        formData.append('cosBrand', cosBrand);
        formData.append('cosName', cosName);
        formData.append('cosDesc', cosDesc);
        formData.append('cosCate', cosCate);
        formData.append('cosIsTryon', cosIsTryon);
        formData.append('cosImage', cosImage);

        axios.post('your-api-endpoint', formData)
            .then(response => {
                console.log(response.data); // Handle successful response
            })
            .catch(error => {
                console.error(error); // Handle error
            });
    };

    return (
        <div className="my-form-container">
            <h2>My Form</h2>
            <div className="form-row">
                <label>
                    Cos Brand:
                    <input type="text" name="cosBrand" value={cosBrand} onChange={handleInputChange} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Cos Name:
                    <input type="text" name="cosName" value={cosName} onChange={handleInputChange} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Cos Description:
                    <textarea name="cosDesc" value={cosDesc} onChange={handleInputChange} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Cos Category:
                    <input type="text" name="cosCate" value={cosCate} onChange={handleInputChange} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Is Try-on:
                    <input type="checkbox" name="cosIsTryon" checked={cosIsTryon} onChange={handleInputChange} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Upload Image:
                    <input type="file" name="cosImage" onChange={handleInputChange} />
                </label>
            </div>
        </div>
        )
    }

export default MyForm;