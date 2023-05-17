"use client";
import React from "react";

const Modal = ({
    children,
    open,
    onClose = () => {},
    className = "",
    title,
}) => {
    if (!open) return <></>;
    return (
        <div className="fixed w-screen h-screen top-0 left-0 flex-center">
            <div
                onClick={onClose}
                className="z-40 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full h-full bg-black bg-opacity-25"
            ></div>
            <div className={`z-40 p-4 ${className}`}>
                <div className=" relative flex  items-center py-2 mb-4">
                    <h3 className={`flex-1 text-center text-2xl font-semibold`}>
                        {title}
                    </h3>
                    <div
                        onClick={onClose}
                        className="rounded-[inherit] absolute top-0 right-0 flex-center p-3 hover:bg-gray-100 text-gray-400 cursor-pointer hover:text-gray-400 h-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
