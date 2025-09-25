import { useEffect, useRef, useState } from "react";
import './Assignment_28.css';


export default function Assignment_28() {
    const [sections, setSections] = useState([]);
    const videoRef = useRef(null);


    useEffect(() => {
        setSections(
            [
                'Section 1',
                'Section 2',
                'Section 3',
                'Section 4',
                'Section 5',
                'Section 6',
                'Section 7',
                'Section 8',
                'Section 9',
                'Section 10'
            ]
        )
    }, [])

    useEffect(() => {
        const video = videoRef.current;
        let ticking = false;


        window.onscroll = () => {
            if (!video || !video.duration) return;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const scrollHeight = document.body.scrollHeight - window.innerHeight;
                    const scrollFraction = scrollTop / scrollHeight;

                    video.currentTime = scrollFraction * video.duration;
                    ticking = false;
                });
                ticking = true;
            }
        };
    }, [])

    return (
        <div>
            <div>

                {sections.map((section, sectionIndex) => (
                    <div
                        className="text"
                        key={sectionIndex}
                    >
                        {section}
                    </div>
                ))}
            </div>
            
            <div
                className="background"
            >
                <div
                    className="video">
                    <video
                        ref={videoRef}
                        src="/scroll video.mp4"
                        muted
                        preload="auto"
                        playsInline
                    >
                    </video>
                </div>
            </div>


        </div>
    )
}