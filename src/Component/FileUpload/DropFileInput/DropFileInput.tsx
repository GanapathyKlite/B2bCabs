import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';

import { ImageConfig } from "./ImageConfig";
import uploadImg from '../../../Assets/cloud-upload-regular-240.png';

interface DropFileInputProps {
    onFileChange: (files: File[]) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = (props) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        wrapperRef.current?.classList.add('dragover');
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        wrapperRef.current?.classList.remove('dragover');
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        wrapperRef.current?.classList.remove('dragover');

        const newFile = e.dataTransfer.files[0];
        if (newFile) {
            const updatedList = [newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) {
            const updatedList = [newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const fileRemove = () => {
        setFileList([]);
        props.onFileChange([]);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    {fileList.length === 0 ? (
                        <>
                            <img src={uploadImg} alt="Upload" />
                            <p>Drag & Drop your files here</p>
                        </>
                    ) : (
                        <img src={URL.createObjectURL(fileList[0])} alt="Uploaded" className="uploaded-image-preview" />
                    )}
                </div>
                <input type="file" onChange={onFileDrop} />
            </div>
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func.isRequired,
};

export default DropFileInput;




{/* {fileList.length > 0 && (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Ready to upload</p>
                    {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                            <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="File Icon" />
                            <div className="drop-file-preview__item__info">
                                <p>{item.name}</p>
                                <p>{item.size}B</p>
                            </div>
                            <span className="drop-file-preview__item__del" onClick={fileRemove}>x</span>
                        </div>
                    ))}
                </div>
            )} */}