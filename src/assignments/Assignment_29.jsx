import { canvas } from 'framer-motion/client'
import './Assignment_29.css'
import { useRef, useState } from 'react'


export default function Assignment_28() {
    const canvasRef = useRef(null);
    const pixcanvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const pixelSizeRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [pixelated, setPixelated] =useState(false);


    // file change and canvas drawing logic
    const fileChange = async (e) => {
        const file = e.target.files[0];

        if (!file || !file.type.startsWith("image/")) {
            setError('Invalid file format');
            return;
        }

        setSelectedFile(file);
        setError('');

        const canvas = canvasRef.current;
        const pixelCanvas = pixcanvasRef.current;

        const ctx = canvas.getContext('2d');
        const pixelCtx = pixelCanvas.getContext('2d');
        const img = new Image();

        img.addEventListener('load', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // scaling logic
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            pixelCtx.drawImage(img, x, y, img.width * scale, img.height * scale);

            URL.revokeObjectURL(img.src);
        });

        img.src = URL.createObjectURL(file);
    }

    const handleUpload = () => {
        fileInputRef.current.click();
    }

    // Pixelating logic
    const handlePixelate = () => {
        if (!selectedFile) return;

        const pixelCanvas = pixcanvasRef.current;
        const pixelCtx = pixelCanvas.getContext('2d', { willReadFrequently: true });
        const pixelImage = new Image();

        pixelImage.addEventListener('load', () => {

            pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);

            const scale = Math.min(pixelCanvas.width / pixelImage.width, pixelCanvas.height / pixelImage.height);
            const x = (pixelCanvas.width - pixelImage.width * scale) / 2;
            const y = (pixelCanvas.height - pixelImage.height * scale) / 2;

            pixelCtx.drawImage(pixelImage, x, y, pixelImage.width * scale, pixelImage.height * scale);

            const { width, height } = pixelCanvas;
            const imageData = pixelCtx.getImageData(0, 0, width, height, { willReadFrequently: true });
            const data = imageData.data;

            const pixelSize = parseInt(pixelSizeRef.current.value) || 10;

            for (let i = 0; i < height; i += pixelSize) {
                for (let j = 0; j < width; j += pixelSize) {
                    const k = (i * width + j) * 4;

                    const r = data[k];
                    const g = data[k + 1];
                    const b = data[k + 2];

                    pixelCtx.fillStyle = `rgb(${r}, ${g}, ${b})`
                    pixelCtx.fillRect(j, i, pixelSize, pixelSize);
                };
            };

            setPixelated(true);
        });

        pixelImage.src = URL.createObjectURL(selectedFile);
    }


    const handleDownload = () => {
        const pixelCanvas = pixcanvasRef.current;

        const url = document.createElement('a');
        url.download = 'pixelated-image.jpg';
        url.href = pixelCanvas.toDataURL('image/jpg');
        url.click();

    }

    return (
        <div>
            <div className="container">

                <div className="canvases">

                    <div className='canvas'>

                        <canvas
                            className='source'
                            ref={canvasRef}
                            width={252}
                            height={380}></canvas>


                        <input type="file"
                            accept='image/'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={fileChange} />

                        <button
                            className='button'
                            onClick={handleUpload}>
                            Upload
                        </button>

                    </div>

                    <div className='canvas'>

                        <canvas
                            className='source'
                            ref={pixcanvasRef}
                            width={252}
                            height={380}></canvas>

                        <button
                            className='button'
                            onClick={handleDownload}
                            disabled={!pixelated}
                        >
                            Download
                        </button>

                    </div>

                </div>

                {error &&
                    <div
                        style={{
                            color: 'red'
                        }}>{error}
                    </div>
                }

                <div className='options'>

                    <input
                        type="range"
                        className='size'
                        ref={pixelSizeRef}
                        min={10}
                    />

                    <button
                        className='button'
                        onClick={handlePixelate}
                    >
                        Apply Filter
                    </button>
                </div>

            </div>
        </div>
    )
}