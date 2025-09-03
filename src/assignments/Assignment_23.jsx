import { useEffect, useRef, useState } from "react"
import Loader from "../loader/Loader";


export default function Assignment_23() {

    const canvasRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [cropDiv, setCropDiv] = useState(null);
    const [cropping, setCropping] = useState(false);
    const [cropDisable, setCropDisable] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState('');
    const startX = useRef(0);
    const startY = useRef(0);
    const endX = useRef(0);
    const endY = useRef(0);


    // File change logic wiht the button to upload image without the input tag
    const fileChange = async (e) => {
        const file = e.target.files[0];

        if (!file || !file.type.startsWith("image/")) {
            setError('Invalid file use  only images');
            return;
        }

        setSelectedFile(file);
        setError('')

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.addEventListener('load', () => {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
            setImageLoaded(true);
            setCropDisable(false);
            URL.revokeObjectURL(selectedFile);
        });

        img.src = URL.createObjectURL(file);
    }

    // disables the crop and downloaf button if no image seleceted
    useEffect(() => {
        if (!selectedFile || !imageLoaded) {
            setCropDisable(true);
        }
    }, [selectedFile, imageLoaded]);

    // button for uploading the image 
    const handleUpload = () => {
        fileInputRef.current.click();
        setCropDisable(true);
    }

    // logic to identify and set mousetracking
    useEffect(() => {
        let isDragging = false;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = (event) => {
            if (!cropping) return;
            const bounding = canvas.getBoundingClientRect();
            startX.current = event.clientX - bounding.left;
            startY.current = event.clientY - bounding.top;
            isDragging = true;
            console.log('sX coordinate:', startX, 'sY coordinate:', startY)
        };

        const handleMouseMove = (event) => {
            if (!cropping) return;
            if (!isDragging) return
            const bounding = canvas.getBoundingClientRect();
            endX.current = event.clientX - bounding.left;
            endY.current = event.clientY - bounding.top;

            // draws the crop rectangle 
            setCropDiv({
                x: startX.current,
                y: startY.current,
                width: endX.current - startX.current,
                height: endY.current - startY.current
            })

            console.log('eX coordinate:', endX, 'eY coordinate:', endY);

        };

        const handleMouseUp = () => {
            if (!cropping) return;
            isDragging = false;
            const croppedCanvas = document.createElement('canvas');

            croppedCanvas.width = endX.current - startX.current;
            croppedCanvas.height = endY.current - startY.current;

            const croppedCtx = croppedCanvas.getContext('2d');

            croppedCtx.drawImage(
                canvas, startX.current,
                startY.current,
                croppedCanvas.width,
                croppedCanvas.height, 0,
                0, croppedCanvas.width,
                croppedCanvas.height
            );

            console.log(`cropped canvas width :`, croppedCanvas.width, `cropped canvas height:`, croppedCanvas.height);
            setCropping(false);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        }
    }, [cropping])

    // logic to activate crop feature when crop button is clicked and to confirm crop and click again to download image
    const handleCrop = () => {
        if (!cropping) {
            setCropping(true);
        } else {
            const canvas = canvasRef.current;
            const croppedCanvas = document.createElement('canvas');

            croppedCanvas.width = endX.current - startX.current;
            croppedCanvas.height = endY.current - startY.current;

            const croppedCtx = croppedCanvas.getContext('2d');

            const width = croppedCanvas.width;
            const height = croppedCanvas.height;

            if (width <= 0 || height <= 0) {
                setError('Invalid crop area. Try dragging again.');
                return;
            }

            setError('');

            croppedCtx.drawImage(
                canvas, startX.current,
                startY.current,
                croppedCanvas.width,
                croppedCanvas.height, 0,
                0, croppedCanvas.width,
                croppedCanvas.height
            );

            // logic for downlad image
            const url = document.createElement('a');
            url.download = 'cropped-image.jpg';
            url.href = croppedCanvas.toDataURL('image/jpg');
            url.click();

            setCropping(false);
        }

    }

    return (

        <div>

            <div
                className='container'
                style={{
                    backgroundColor: '#333333',
                    borderRadius: '25px',
                    padding: '10px',
                    filter: 'drop-shadow(0px 10px 15px rgba(20, 19, 19, 1))'
                }}>

                <div className='description'
                    style={{
                        marginTop: '10px',
                        fontSize: '18px',
                        marginBottom:'10px'
                    }}>Drag and draw on the image to set a cropping area</div>

                {error &&
                    <div
                        style={{
                            color: 'red',
                            fontWeight: 'bold'
                        }}>{error}
                    </div>
                }

                <div
                    style={{
                        width: '600px',
                        height: '600px'
                    }}
                >
                    <canvas
                        width={600}
                        height={600}
                        ref={canvasRef}
                    />

                    {cropDiv && (
                        <div
                            style={{
                                position: 'absolute',
                                top: cropDiv.y,
                                left: cropDiv.x,
                                width: cropDiv.width,
                                height: cropDiv.height,
                                border: '5px dashed red',
                                pointerEvents: 'none'
                            }}
                        />
                    )}
                </div>

                <div className="options"
                    style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                    }}
                >
                    <input
                        type="file"
                        accept="image/"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={fileChange} />


                    <button
                        style={{ backgroundColor: '#243df8ff' }}
                        onClick={handleUpload}
                    >
                        Upload an Image
                    </button>

                    <button
                        style={{
                            backgroundColor: '#243df8ff'
                        }}
                        disabled={cropDisable}
                        onClick={handleCrop}
                    >
                        Crop and Download
                    </button>
                </div>
            </div>

        </div>
    )
}