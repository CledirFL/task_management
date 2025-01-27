"use client"
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-gray-600 p-6 rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;