import { motion } from "framer-motion"

export default function Loader() {
    return (
        <div >
            <motion.img
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                style={{ width: '117px' }}
                src="./loading image.svg"
            />
        </div>
    )
}
