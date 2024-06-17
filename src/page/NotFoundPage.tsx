import React from 'react';

const NotFoundPage = () => {
    return (
        <div className={`w-screen fixed z-50 h-[100vh] inset-0 bg-white flex items-start    justify-center`}>
            <div>
                <div className={`flex items-start h-fit justify-center mt-10`}>
                    <p className={`font-semibold`}>Opp!!! There is nothing here :(((</p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;