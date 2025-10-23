import { useEffect, useRef, useState } from 'react'
import './Assignment_32.css'
import { progress } from 'framer-motion';

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function Assignment_32() {
    const videoRef = useRef();
    const seekerRef = useRef();
    const [active, setActive] = useState(false);
    const [loop, setLoop] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePlay = () => {
        setActive(prev => !prev)
        const video = videoRef.current;

        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }

    const handleLoop = () => {
        const video = videoRef.current;
        const newLoopState = !loop;
        video.loop = newLoopState;
        setLoop(newLoopState);

    }

    useEffect(() => {
        const video = videoRef.current;
        const seeker = seekerRef.current;

        if (!video || !seeker) return;

        video.onloadedmetadata = () => {
            seeker.setAttribute("max", video.duration);
        };

        video.ontimeupdate = () => {
            const seekerValue = seeker.querySelector(".seeker-value");
            if (!seeker.getAttribute("max"))
                seeker.setAttribute("max", video.duration);

            const progress = (video.currentTime / video.duration) * 100;
            seekerValue.style.width = `${progress}%`

            setCurrentTime(video.currentTime);
        };

        video.onended = () => {
            setActive(false);
        }

        seeker.onclick = (e) => {
            if (!Number.isFinite(video.duration)) return;
            const seekerValue = seeker.querySelector(".seeker-value");

            const rect = seekerValue.getBoundingClientRect();
            const position = (e.pageX - rect.left) / seeker.offsetWidth;
            video.currentTime = position * video.duration;
            seekerValue.style.width = `${position * 100}%`;

        }
    }, [])




    return (
        <div>
            <div
                className="player"
            >
                <video
                    src="./custom-video-player.mp4"
                    ref={videoRef}
                ></video>

                <div
                    className="controls"
                >
                    <div
                        className="button"
                        onClick={handlePlay} data-active={active ? "false" : "true"}
                    />

                    <div className="rows">
                        <div className="seeker" ref={seekerRef} >
                            <div className="seeker-value" />
                        </div>
                        <div className="row">
                            <div className="time" >{formatTime(currentTime)}</div>
                            <div
                                onClick={handleLoop}
                                className='loop'
                                data-active={loop ? "false" : "true"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}