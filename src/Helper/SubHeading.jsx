'use client'
import { useState } from 'react';
import style from "@/CSS/Newsletter.module.css";
import Display from "./Mailer"; // Import the Display component

function SubHeading() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={style.heading}>
                <p>Subscribers</p>
                <span><button onClick={openModal} className={style.button}>Send Message</button></span>
            </div>
            {showModal && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <div className={style.modalhead}>
                        <p>Send Message</p>
                        <span className={style.close} onClick={closeModal}>&times;</span>
                        </div>
                        <Display closeModal={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
}

export default SubHeading;
