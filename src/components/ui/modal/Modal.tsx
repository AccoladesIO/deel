// components/Modal.js
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Context } from '../../../../context/context';

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { y: '-100vh', opacity: 0 },
    visible: { y: '0', opacity: 1, transition: { delay: 0.5 } },
};

const Modal = ({ children }: { children: React.ReactNode }) => {
    const { showModal, setShowModal } = useContext(Context)
    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10"
            variants={backdropVariants}
            initial="hidden"
            animate={showModal ? 'visible' : 'hidden'}
            onClick={() => setShowModal(false)}
        >
            <motion.div
                className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[500px] md:w-[700px]"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                {/* <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button> */}
            </motion.div>
        </motion.div>
    );
};

export default Modal;
