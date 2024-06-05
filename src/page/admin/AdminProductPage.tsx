import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {CiImageOn} from "react-icons/ci";
import {useCategory} from "@/zustand/AppState.ts";

const AdminProductPage = () => {
    const {categories} = useCategory()
    const [categoryPick, setCategoryPick] = useState<string>(categories[0])
    const [previews, setPreviews] = useState<string[]>([]);
    const [imageLoaded, setImageLoaded] = useState<number>(0);
    const [urlSourceClicked, setUrlSourceClicked] = useState<number>();
    const maxImages: number = 5
    const innerDiv = useRef<HTMLDivElement>(null);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews(prevState => [...prevState, reader.result as string]);
                    setUrlSourceClicked(-1)
                };
                reader.readAsDataURL(file);
            });
            setImageLoaded(files.length)
        } else {
            setPreviews([]);
        }
    };
    const handleImageSource = (index: number) => {
        setUrlSourceClicked(index)
    }
    useEffect(() => {
        function handleClickOutsite(event: MouseEvent) {
            if (innerDiv.current && !innerDiv.current.contains(event.target as Node)) {
                setUrlSourceClicked(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutsite);
    }, []);
    const handleCategoryClick = (category: string) => {
        setCategoryPick(category)
    }
    return (
        <div className={`w-[1250px] flex rounded bg-inherit p-6`}>
            <div className={`w-1/3 p-3 flex-col flex gap-y-4`}>
                {/*images*/}
                <div className={`bg-white w-full rounded shadow-2xl flex flex-col `}>
                    <Title title={"Product images"}/>
                    <div ref={innerDiv} className={`w-full p-2`}>
                        {/*images*/}
                        <div className={`w-full flex flex-wrap items-center *:p-1 *:w-1/3 *:rounded *:aspect-square `}>
                            <div className="flex items-center justify-start ">
                                <label htmlFor="dropzone-file"
                                       className="flex flex-col items-center justify-center w-full aspect-square hover:bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                                    <div className="flex flex-col items-center justify-center py-2">
                                        <svg className="w-4 h-4 mb-4 text-gray-500 dark:text-gray-400"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className=" text-gray-500 text-[10px] font-semibold">
                                            Click to upload</p>
                                        <p className={`text-gray-500 text-[10px]`}>or drag drop</p>
                                    </div>
                                    <input
                                        disabled={imageLoaded >= 5}
                                        id="dropzone-file"
                                        type="file"
                                        accept={'image/*'}
                                        multiple={true}
                                        onChange={handleImageChange}
                                        className="hidden"/>
                                </label>
                            </div>
                            {
                                Array.from({length: maxImages}).map((value, index) => (
                                    <div className={`p-1 relative`}>
                                        <div
                                            className={`flex bg-gray-100 items-center justify-center w-full aspect-square rounded`}>
                                            {
                                                previews[index] ?
                                                    <img key={index} src={previews[index]} alt={`Preview ${index}`}
                                                         className="h-full w-auto object-contain "/>
                                                    :
                                                    <div onClick={() => handleImageSource(index)}
                                                         className={`w-full z-0 h-full flex items-center justify-center`}>
                                                        <CiImageOn/>
                                                    </div>
                                            }
                                        </div>
                                        <div
                                            className={`rounded border-black border bg-white z-20 absolute w-[200px]  
                                            py-1 px-2 ${urlSourceClicked === index ? 'block' : 'hidden'}`}>
                                            <input
                                                type={'text'}
                                                spellCheck={false}
                                                placeholder={"URL"}
                                                className={`w-full p-2 placeholder:italic right-0 outline-none `}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={`mt-2 w-full flex gap-x-1 *:w-1/3`}>
                        <div></div>
                    </div>
                </div>
                {/*quantity*/}
                <div className={`bg-white pb-6 w-full rounded shadow-2xl flex flex-col`}>
                    <Title title={"Quantity"}/>
                    <div className={`flex flex-col gap-y-2 mt-4`}>
                        <Input input={{label: "Total quantity"}}/>
                        <Input input={{label: "Available quantity"}}/>
                    </div>
                </div>
            </div>
            <div className={`w-2/3 p-3 flex flex-col gap-y-5 *:w-full *:bg-white *:rounded *:shadow-2xl`}>
                <div className={`flex flex-col `}>
                    <div className={`flex flex-col p-5 gap-y-3`}>
                        <div className={``}>
                            <p className={`font-semibold`}>Category</p>
                        </div>
                        <hr className={`h-1 border-b-default_gray w-full`}/>
                        <div className={`flex`}>
                            <div className={`flex-1 overflow-hidden`}>
                                <div className={`flex items-center overflow-x-auto`}>
                                    <div className={'flex transform translate-x-0 translate-y-0 gap-x-4'}>
                                        {
                                            categories.map((value, index) => (
                                                <div
                                                    onClick={() => handleCategoryClick(value)}
                                                    key={index}
                                                    className={`cursor-pointer w-[100px] flex items-center justify-center h-[124px] rounded bg-gray-100 p-3 
                                                    ${categoryPick === value && 'border-[3px] border-inner_blue bg-gradient-to-r from-outer_blue'}`}>
                                                    <p>{value.toLocaleUpperCase()}</p>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col`}>
                    <Title title={"Product Detail"}/>
                    <div className={`w-full flex flex-col gap-y-2`}>
                        <div className={`flex w-full gap-x-2`}>
                            <Input input={{label: "Product name"}}/>
                            <Input input={{label: "Producer"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
type TitleProps={
    title: string
}
const Title : React.FC<TitleProps> = ({title}) => {
    return (
        <>
            <div className={`p-4`}>
                <p className={`font-semibold`}>{title}</p>
            </div>
            <hr className={`h-1 border-b-default_gray w-full`}/>
        </>
    )
}
type Input={
    label: string
}
type InputProps={
    input: Input
}
const Input : React.FC<InputProps> =({input})=>{
    return(
        <>
            <div className={`flex px-4 flex-col w-full`}>
                <label className={`font-medium`}>{input.label}</label>
                <div className={`w-full border border-default_gray rounded px-2 py-1`}>
                    <input
                        className={`outline-none w-full`}
                        spellCheck={false}
                        type="text"/>
                </div>
            </div>
        </>
    )
}
export default AdminProductPage;