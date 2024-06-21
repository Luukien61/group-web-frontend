import {ChangeEvent} from "react";

// eslint-disable-next-line no-unused-vars
const ReadImageUtil = (e: ChangeEvent<HTMLInputElement>, handleImageLoaded : (url: string | undefined)=>void) => {
    const files = e.target.files;
    if (files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleImageLoaded(reader.result as string);
            };
            reader.readAsDataURL(file);
        });
    }
    return
};

export default ReadImageUtil;