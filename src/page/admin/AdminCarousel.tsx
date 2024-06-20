import React, {ChangeEvent, useEffect, useState} from 'react';
import {Banner} from "@/component/CarouselBanner.tsx";
import {DefaultButton, FileUpload} from "@/component/admin/ProductInfo.tsx";
import {IoCloseCircleOutline} from "react-icons/io5";
const AdminCarousel = () => {
    const maxItem: number = 5;
    const [loadedItems, setLoadedItems] = useState<number>(0);
    const [itemIndex, setItemIndex] = useState<number>(0);
    const [bannerItems, setBannerItems] = useState<Banner[]>([]);
    const handlePreviousClick = () => {
        const newItemIndex: number = itemIndex - 1;
        if(newItemIndex>=0) {
            setItemIndex( newItemIndex);
        }
    }
    const handleNextClick = () => {
        const newItemIndex: number = itemIndex + 1;
        if(newItemIndex<maxItem && newItemIndex <bannerItems.length) {
            setItemIndex( newItemIndex);
        }
    }

    const handleClearItem=(index: number | undefined)=>{
        if(index){
            console.log("clear item",index)
            setBannerItems(prevState => prevState.filter((item) => item.id!==index));
        }

    }

    const handleImageLoaded = (url: string | undefined) => {
        if (!url || url === '') return
        const newBannerItem: Banner = {
            id: loadedItems,
            imageUrl: url,
            title: "item"
        }
        setLoadedItems(prevState => prevState+1);
        setBannerItems(prevState => [...prevState, newBannerItem]);
    }
    useEffect(()=>{
        setItemIndex(bannerItems.length-1)
    },[bannerItems])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    };


    return (
        <div className={`w-full flex flex-col h-[calc(100vh-1rem)] p-6`}>
            <div className="relative w-full">
                <div className="relative overflow-hidden rounded-lg h-64">
                    <div className={`w-full flex`}>
                        {
                            bannerItems.length == 0 ?
                            <div
                                title={"Add new"}
                                className={`absolute w-full h-full transition-transform duration-700 ease-in-out cursor-pointer`}>
                                <img src={'https://flowbite.com/docs/images/carousel/carousel-1.svg'}
                                     className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                     alt="..."/>
                            </div>
                       :
                            bannerItems.map((item, index) => (
                                <>
                                    <div key={index}
                                         className={`absolute w-full h-full transition-transform duration-700 ease-in-out
                                 ${index === itemIndex
                                             ? 'translate-x-0'
                                             : index < itemIndex
                                                 ? '-translate-x-full'
                                                 : 'translate-x-full'
                                         }`}>
                                        <img src={item.imageUrl}
                                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                             alt={item.title}/>
                                    </div>
                                    <div
                                        onClick={()=>handleClearItem(item.id)}
                                        className={`absolute top-2 bg-white right-1 z-40 cursor-pointer`}>
                                        <IoCloseCircleOutline size={30}/>
                                    </div>
                                </>

                            ))
                        }
                    </div>

                </div>

                <button
                    onClick={handlePreviousClick}
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    onClick={handleNextClick}
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                     <span
                         className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                         <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                   d="m1 9 4-4-4-4"/>
                         </svg>
                         <span className="sr-only">Next</span>
                     </span>
                </button>
            </div>
            <div className={`w-1/3 flex flex-col mt-10 `}>
                <div className={`w-fit p-2 my-4 rounded `}>
                    <FileUpload
                        style={'w-20'}
                        text={true}
                        input={
                            <input
                                id="dropzone-file"
                                type="file"
                                accept={'image/*'}
                                multiple={true}
                                onChange={handleImageChange}
                                className="hidden"/>}/>
                </div>
                <p className={`italic text-gray-400`}>or</p>
                <div className={`flex w-full justify-between items-center`}>
                    <p className={`font-semibold`}>Image url: </p>
                    <input className={`rounded outline-none px-3 py-2`}/>
                </div>
                <DefaultButton style={`bg-inner_blue mt-4`} label={"Add"} onclick={() => {
                }}/>
            </div>
        </div>
    );
};

export default AdminCarousel;