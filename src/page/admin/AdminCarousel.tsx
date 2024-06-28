import React, {ChangeEvent, useEffect, useState} from 'react';
import {Banner} from "@/component/CarouselBanner.tsx";
import {DefaultButton, FileUpload} from "@/component/admin/ProductInfo.tsx";
import {IoCloseCircleOutline} from "react-icons/io5";
import ReadImageUtil from "@/hooks/ReadImageUtil.ts";
import {fetchCarouselImages, postCarouselImages} from "@/axios/Request.ts";
import imageUpload from "@/cloudinary/ImageUpload.ts";
import {useNavigate} from "react-router-dom";

const AdminCarousel = () => {
    const navigate= useNavigate()
    const [loadedItems, setLoadedItems] = useState<number>(0);
    const [itemIndex, setItemIndex] = useState<number>(0);
    const [bannerItems, setBannerItems] = useState<Banner[]>([]);
    const [externalUrl, setExternalUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const handlePreviousClick = () => {
        const newItemIndex: number = itemIndex - 1;
        if (newItemIndex >= 0) {
            setItemIndex(newItemIndex);
        }
    }
    useEffect(() => {
        fetchImages()
        document.title="Admin Carousel"
    }, [])
    const fetchImages = async () => {
        const response: Banner[] = await fetchCarouselImages()
        setBannerItems(response);
    }
    const handleNextClick = () => {
        const newItemIndex: number = itemIndex + 1;
        if ( newItemIndex < bannerItems.length) {
            setItemIndex(newItemIndex);
        }
    }

    const handleClearItem = (index: number | undefined) => {
        if (index != undefined) {
            setBannerItems(prevState => prevState.filter((_item, itemIndex) => itemIndex !== index));
            handleItemIndexChange(index)
            setLoadedItems(prevState => prevState - 1)
        }
    }

    const handleItemIndexChange = (index: number) => {
        if (index == bannerItems.length - 1) {
            setItemIndex(index - 1)
        } else {
            setItemIndex(index)
        }
    }

    const handleExternalUrlChange = () => {
        handleImageLoaded(externalUrl)
        setExternalUrl('')
    }

    const handleImageLoaded = (url: string | undefined) => {
        if (!url || url === '') return
        const newBannerItem: Banner = {
            id: loadedItems,
            imageUrl: url,
            title: "item"
        }
        setLoadedItems(prevState => prevState + 1);
        setBannerItems(prevState => [...prevState, newBannerItem]);
        setItemIndex(bannerItems.length);
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        ReadImageUtil(e, handleImageLoaded)
    };

    const handleDoneClick = async () => {
        setLoading(true)
        const imagePromises = bannerItems.map(async (value) => {
            const imageUrl = await imageUpload({image: value.imageUrl})
            return {...value, imageUrl: imageUrl ?? ''}
        })
        const urls: Banner[] = await Promise.all(imagePromises)
        await postCarouselImages(urls)
        setLoading(false)
        navigate("/admin")
    }


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
                                    <div key={index}
                                         className={`absolute w-full h-full transition-transform duration-700 ease-in-out
                                            ${index === itemIndex
                                             ? 'translate-x-0'
                                             : index < itemIndex
                                                 ? '-translate-x-full'
                                                 : 'translate-x-full'
                                         }`}>
                                        <img src={item.imageUrl}
                                             className="absolute block w-full h-64 object-fill "
                                             alt={item.title}/>
                                        <div
                                            onClick={() => handleClearItem(index)}
                                            className={`rounded-[100%] absolute top-2 bg-white right-1 z-50 cursor-pointer`}>
                                            <IoCloseCircleOutline size={30}/>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>

                </div>

                <button
                    onClick={handlePreviousClick}
                    type="button"
                    className="absolute top-28 start-0 z-30 flex items-center justify-center h-fit px-4 cursor-pointer group focus:outline-none">
                    <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
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
                    className="absolute top-28 end-0 h-fit z-10 flex items-center justify-center  px-4 cursor-pointer group focus:outline-none">
                     <span
                         className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                         <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                   d="m1 9 4-4-4-4"/>
                         </svg>
                         <span className="sr-only">Next</span>
                     </span>
                </button>
            </div>
            <div className={`w-1/3 flex flex-col mt-10 gap-y-1 `}>
                <div className={`w-full p-2 my-4 rounded `}>
                    <FileUpload
                        style={'w-full  '}
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
                    <input
                        placeholder={"Image link..."}
                        onKeyDown={handleExternalUrlChange}
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className={`rounded w-full outline-none px-3 py-2 focus:blue-growing-border placeholder:italic`}/>
                </div>
                <DefaultButton
                    loading={loading && <svg aria-hidden="true"
                                             className="h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>}
                    style={`hover:font-semibold bg-inner_blue mt-4 hover:bg-blue_other`}
                    label={"Done"}
                    onclick={handleDoneClick}/>
            </div>
        </div>
    );
};

export default AdminCarousel;