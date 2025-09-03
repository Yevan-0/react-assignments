import { useState } from "react"
import Loader from "../loader/Loader";

export default function Assignment_22() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [source, setSource] = useState(null);
    const [brightness, setBrigtness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [blur, setBlur] = useState(0);
    const [grayscale, setGrayscale] = useState(0);
    const [hueRotate, setHueRotate] = useState(0);
    const [invert, setInvert] = useState(0);
    const [opacity, setOpacity] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [sepia, setSepia] = useState(0);

    const changeFile = (e) => {
        const file = e.target.files?.[0];

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            console.log(selectedFile)
        } else {
            alert('select valid image')
        }
    }

    const handleUpload = () => {
        if (!selectedFile) {
            return setError('No image was selected')

        } else {
            setSource(URL.createObjectURL(selectedFile))
            setError('')
        }
    }

    const changeBrightness = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setBrigtness(e.target.value);
            setError('');
        }
    }

    const changeBlur = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setBlur(e.target.value);
            setError('');
        }

    }

    const changeContrast = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setContrast(e.target.value);
            setError('');
        }
    }

    const changeGrayscale = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setGrayscale(e.target.value);
            setError('');
        }
    }

    const changeHueRotate = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        }
        else {
            setHueRotate(e.target.value);
            setError('');
        }
    }
    const changeInvert = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setInvert(e.target.value);
            setError('');
        }
    }
    const changeOpacity = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setOpacity(e.target.value);
            setError('');
        }
    }

    const changeSaturation = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setSaturation(e.target.value);
            setError('');
        }
    }


    const changeSepia = (e) => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setSepia(e.target.value);
            setError('');
        }
    }

    const handleRevert = () => {
        if (!selectedFile) {
            return setError('No image was selected')
        } else {
            setBlur(0);
            setBrigtness(100);
            setContrast(100);
            setGrayscale(0);
            setHueRotate(0);
            setInvert(0);
            setOpacity(100);
            setSaturation(100);
            setSepia(0);
            setError('');
        }
    }
    return (
        <div>

            <input type="file"
                onChange={changeFile}
                accept="image/"
            />

            <button
                onClick={handleUpload}
                style={{
                    marginLeft: '30px',
                    color: 'cyan'
                }}
            >
                Upload
            </button>

            <button
                onClick={handleRevert}
                style={{
                    marginLeft: '30px',
                    color: 'yellow'

                }}
            >
                Revert
            </button>

            <br />

            <p>{error}</p>

            <br />

            <img
                style={{
                    width: '1000px',
                    height: '500px',
                    objectFit: 'contain',
                    filter: `brightness(${brightness}%) 
                    blur(${blur}px)
                    contrast(${contrast}%)
                    grayscale(${grayscale}%) 
                    hue-rotate(${hueRotate}deg)
                    invert(${invert}%)
                    opacity(${opacity}%)
                    saturate(${saturation}%)
                    sepia(${sepia}%)`
                }}

                src={source}
            />


            <br />

            <div
                style={{ display: 'flex' }}
            >
                <span>
                    Brightness: {brightness}%
                    <input type="range"
                        min="0"
                        max="100"
                        value={brightness}
                        onChange={changeBrightness}
                        style={{ margin: '10px' }}
                    />
                </span>

                <span>
                    Blur: {blur}%
                    <input type="range"
                        min="0"
                        max="100"
                        value={blur}
                        onChange={changeBlur}
                        style={{ margin: '10px' }}
                    />
                </span>

                <span>
                    Contrast: {contrast}%
                    <input type="range"
                        min="0"
                        max="200"
                        value={contrast}
                        onChange={changeContrast}
                        style={{ margin: '10px' }}
                    />
                </span>

                <span>
                    Grayscale: {grayscale}%
                    <input type="range"
                        min="0"
                        max="100"
                        value={grayscale}
                        onChange={changeGrayscale}
                        style={{ margin: '10px' }}
                    />
                </span>
            </div>
            <br />
            <div
                style={{ display: 'flex' }}
            >
                <span>
                    Hue-Rotate: {hueRotate}deg
                    <input type="range"
                        min="0"
                        max="360"
                        value={hueRotate}
                        onChange={changeHueRotate}
                        style={{ margin: '10px' }}
                    />
                </span>

                <span>
                    Invert: {invert}%
                    <input type="range"
                        min="0"
                        max="100"
                        value={invert}
                        onChange={changeInvert}
                        style={{ margin: '10px' }}
                    />
                </span>

                <span>
                    Opacity: {opacity}%
                    <input type="range"
                        min="0"
                        max="100"
                        value={opacity}
                        onChange={changeOpacity}
                        style={{ margin: '10px' }}
                    />
                </span>

                <span>
                    Saturation: {saturation}%
                    <input type="range"
                        min="0"
                        max="200"
                        value={saturation}
                        onChange={changeSaturation}
                        style={{ margin: '10px' }}
                    />
                </span>

                <span>
                    Sepia: {sepia}%
                    <input type="range"
                        min="0"
                        max="100"
                        value={sepia}
                        onChange={changeSepia}
                        style={{ margin: '10px' }}
                    />
                </span>

            </div>

        </div>
    )
}