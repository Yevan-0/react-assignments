
import { useEffect, useState, useRef } from 'react'
import './Assignment_25.css'
import { audio } from 'framer-motion/client';


export default function Assignment_25() {
    const [analyser, setAnalyser] = useState(null);
    const audioRef = useRef(null)


    const play = () => {
        const ctx = new AudioContext();
        const audio = audioRef.current;
        const src = ctx.createMediaElementSource(audio);
        const analyserNode = ctx.createAnalyser();
        analyserNode.fftSize = 64; 

        src.connect(analyserNode);
        analyserNode.connect(ctx.destination);
        setAnalyser(analyserNode);

        if (ctx.state === "suspended") {
            ctx.resume;
        }
        audio.play()
    }

    useEffect(() => {
        if (!analyser) return;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const bars = document.querySelectorAll('.bar');
        const animate = () => {
            analyser.getByteFrequencyData(dataArray);
            bars.forEach((bar, i) => {
                const value = dataArray[i];
                const maxHeight = 150;
                const minHeight = 0;
                const normalized = Math.max((value / 255) * maxHeight, minHeight);
                bar.style.height = `${normalized}px`;
            });
            requestAnimationFrame(animate)
            console.log(dataArray);
        };
        animate();
    }, [analyser]);


    return (
        <div>
            <div className="player">
                <div className="animation">
                    {[...Array(32)].map((_, i) => (
                        <div key={i} className='bar'></div>
                    ))}
                </div>
                <div className="controls">
                    <audio
                        ref={audioRef}
                        className="source"
                        src="/catchy-jazzy-15-sec-stinger-343720.mp3" controls
                        onPlay={play}
                    ></audio>
                </div>
            </div>
        </div>
    )
}