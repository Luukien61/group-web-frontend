import React, {useEffect} from 'react';
import toast, {Toaster} from "react-hot-toast";

const notify = () => toast.error('An error has occurred.', {duration: 1500});
const Test = () => {
    useEffect(() => {
        document.title = "Test"
    }, []);

    return (
        <div className={`w-1/3 p-4`}>
            <div>
                <button onClick={notify}>Make me a toast</button>
                <Toaster />
            </div>
        </div>
    );
};

export default Test;