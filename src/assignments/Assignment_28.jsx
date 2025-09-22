import { useEffect, useRef, useState } from "react";
import './Assignment_28.css';
import { div, video } from "framer-motion/client";


export default function Assignment_28() {
    // const [sections, setSections] = useState([]);
    // const videoRef = useRef(null);
    // const [loaded, setLoaded] = useState(false);
    // const scrollref = useRef(0);


    // useEffect(() => {
    //     setSections([
    //         'Section 1',
    //         'Section 2',
    //         'Section 3',
    //         'Section 4',
    //         'Section 5',
    //         'Section 6',
    //         'Section 7',
    //         'Section 8',
    //         'Section 9',
    //         'Section 10'
    //     ])
    // }, [])

    // useEffect(() => {
    //     const video = videoRef.current
    //     setLoaded(false);
    //     const playBack = 50;

    //     const handlePlay = () => {
    //         if (video) {
    //             const frameNumber = window.pageYOffset / playBack;
    //             video.currentTime = frameNumber;
    //         }
    //         window.requestAnimationFrame(handlePlay);
    //     }
    //     window.requestAnimationFrame(handlePlay);
    // }, [])

    // useEffect(() => {
    //     const video = videoRef.current;

    //     video.addEventListener('loadmetadata', () => {
    //         const { duration } = video;
    //         const playBack = 50;
    //         const scrollSection = scrollref.current;
    //         if (videoRef?.current) {
    //             scrollSection.style.height = Math.floor(duration) * playBack + 'px'
    //         }
    //     })
    // }, [])
    // return (
    //     <div>
    //         <div
    //             className="background"
    //         >
    //             <video
    //                 ref={videoRef}
    //                 src="/scroll video.mp4"
    //             >
    //             </video>
    //         </div>

    //         <div
    //             className="content"
    //             ref={scrollref}
    //         >

    //             {sections.map((section, sectionIndex) => (
    //                 <div
    //                     className="text"
    //                     key={sectionIndex}
    //                 >
    //                     {section}
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )

    return(
        <div>
            coming soon
        </div>
    )
}