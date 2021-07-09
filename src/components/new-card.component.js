import React, {Component, useCallback, useState} from 'react';
import {Button, FormCheck} from "react-bootstrap";
import OnboardingService from "../services/onboarding.service";
import UserCompositionService from "../services/user-composition.service";
import AuthService from "../services/auth.service";
import {useDropzone} from "react-dropzone";
import axios from "axios";

function ImageDrop() {
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                )
            )
        }
    })

    const images = files.map((file) => (
        <div key={file.name}>
            <div>
                <img id="image" src={file.preview} style={{width: "200px", height: "200px"}} alt="preview"/>
            </div>
        </div>
    ))

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()}/>
                <div>Drag image</div>
            </div>
            <div>{images}</div>
        </div>
    )
}



export class NewCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: "",
            setImage: "",
            url: "",
            setUrl: "",
            fandoms: []
        };
    }


    handlePic = (e) => {
        const pic = e.target.files[0];
        console.log(e.target.files[0])
        this.setState({image: pic})
    }

    componentDidMount() {
        const fandoms = OnboardingService.getAllFandoms().then(res => {
            this.setState({fandoms: res.data})
        })
    }




    render() {
        return (
            <div className="input">
                <h4>Картинка</h4>
                <input type="file" onChange={this.handlePic}/>
                <br/>
                <br/>
                <h4>Введите название произведения</h4>
                <input id="composition_name" type="text" style={{padding: 6}} size="50"/>
                <br/>
                <br/>
                <h4>Введите описание произведения</h4>
                <input id="composition_description" type="text" style={{padding: 30}} size="70"/>
                <br/>
                <br/>
                <select size="1" id="select">
                {this.state.fandoms.map((fandom, index )=> (
                    <option key={index} value={fandom.name}>{fandom.name}</option>
                ))}
                </select>
                 <br/>
                <br/>
                <Button onClick={() => {
                    const formdata = new FormData();

                    formdata.append("file", this.state.image);
                    formdata.append("cloud_name", "dnwbktk0z");
                    formdata.append("upload_preset", "fp9a0chb");

                    axios.post("https://api.cloudinary.com/v1_1/dnwbktk0z/upload", formdata).then(r => {
                        localStorage.setItem('image', r.data.url)
                        console.log(r.data.url)
                    });

                    console.log(localStorage.getItem('image'))

                    let res = {
                        name: document.getElementById("composition_name").value,
                        description: document.getElementById("composition_description").value,
                        image: localStorage.getItem('image'),
                        fandom: document.getElementById("select").value
                    }

                    UserCompositionService.createComposition(AuthService.getCurrentUsername(), JSON.parse(JSON.stringify(res))).then(r => {
                        localStorage.setItem('composition', document.getElementById("composition_name").value)
                        // window.location.assign('https://fanficsappreact.herokuapp.com/createChapter')

                    })
                }
                }>Добавить произведение</Button>

            </div>
        );
    }
}

export default NewCard;