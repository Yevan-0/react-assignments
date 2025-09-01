import { useEffect, useRef, useState } from "react"

export default function Assignment_20() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [outputRgb, setOutputRgb] = useState('');
    const [outputHex, setOutputHex] = useState('')
    const canvasRef = useRef(null);

    const fileChange = (e) => {
        const file = e.target.files?.[0];

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file)
        } else {
            alert('select valid image');
        }
    }

    const handleUpload = () => {
        if (!selectedFile) return setError('No image selected');
        console.log('Uploaded')

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.addEventListener('load', () => {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale)

            URL.revokeObjectURL(selectedFile);
        });

        img.src = URL.createObjectURL(selectedFile);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const picker = (event) => {
            const bounding = canvas.getBoundingClientRect();
            const x = event.clientX - bounding.left;
            const y = event.clientY - bounding.top;
            const ctx = canvas.getContext('2d');
            const pixel = ctx.getImageData(x, y, 1, 1);
            const data = pixel.data;

            const rgbColor = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
            setOutputRgb(rgbColor);

            const rgb = [data[0], data[1], data[2]];
            const hexColror = `#${rgb.map((value) => value.toString(16).padStart(2, "0")).join("")}`
            setOutputHex(hexColror)
        }
        canvas.addEventListener('click', picker);

        return () => {
            canvas.removeEventListener('click', picker);
        };
    }, []);


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>

            <input type="file"
                onChange={fileChange}
                accept="image/" />
            <p>{error}</p>
            <br />
            <button
                onClick={handleUpload}
            >
                Upload
            </button>

            <br />
            <div>
                <canvas
                    width={1000}
                    height={500}
                    ref={canvasRef}
                ></canvas>
            </div>
            <br />
            <div
                style={{ display: 'flex', gap: '10px' }}>
                <div
                    style={{
                        width: '300px', height: '300px',
                        backgroundColor: outputRgb
                    }}
                >
                    RGB:{outputRgb}
                </div>
                <div
                    style={{
                        width: '300px', height: '300px',
                        backgroundColor: outputHex
                    }}
                >
                    Hex: {outputHex}
                </div>
            </div>
        </div>
    )
}