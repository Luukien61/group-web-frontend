import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {CiImageOn} from "react-icons/ci";
import {useCategory} from "@/zustand/AppState.ts";
import {getProducersByCategory} from "@/axios/Request.ts";
import {Producer} from "@/common/NavMenu.tsx";
import {IoCloseCircleOutline} from "react-icons/io5";
import {Color, Description} from "@/component/CategoryCard.tsx";
import imageUpload from "@/cloudinary/ImageUpload.ts";
import mammoth from 'mammoth';

const readDocx = async (file: File): Promise<string> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const {value} = await mammoth.extractRawText({arrayBuffer});
        return value;
    } catch (error) {
        console.error('Error reading docx file:', error);
        throw error;
    }
};
const AdminProductPage = () => {
    const {categories} = useCategory()
    const fetchedProducers = useRef(new Map())
    const [producers, setProducers] = useState<Producer[]>([])
    const [colors, setColors] = useState<Color[]>([])
    const [productName, setProductName] = useState<string>('')
    const [producer, setProducer] = useState<string>('')
    const [colorName, setColorName] = useState<string>()
    const [colorImg, setColorImg] = useState<string | null>(null)
    const [categoryPick, setCategoryPick] = useState<string>('')
    const [previews, setPreviews] = useState<string[]>([]);
    const [imageLoaded, setImageLoaded] = useState<number>(0);
    const [urlSourceClicked, setUrlSourceClicked] = useState<number>();
    const maxImages: number = 5
    const innerDiv = useRef<HTMLDivElement>(null);
    const description: Description = {
        title: '',
        content: ''
    }
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
            setImageLoaded(prevState => prevState + files.length)
        } else {
            setPreviews([]);
        }
    };
    useEffect(() => {
        setImageLoaded(previews.length)
    }, [previews]);
    const handleRemoveProductImage = (imageIndex: number) => {
        setPreviews(prevState => prevState.filter((value, index) => index !== imageIndex && index !== imageIndex))
    }
    const handleImageSource = (index: number) => {
        setUrlSourceClicked(index)
    }
    const handleColorImageSource = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setColorImg(reader.result as string);
            }
            reader.readAsDataURL(file)
            e.target.files = null
        } else {
            setColorImg(null)
        }

    }
    const handleContentDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                description.content = await readDocx(file)
                e.target.files = null
                console.log("Is content saved ?", description.content)
            } catch (error) {
                console.error('Error reading docx file:', error);
            }
        }
    };
    const handleAddProduct = async (e: ChangeEvent<HTMLInputElement>) => {
        const url = await imageUpload({image: colorImg})
        console.log("Image url:", url)
        if (url && colorName) {
            const color: Color = {
                color: colorName,
                link: url
            }
            setColors(prevState => [...prevState, color])
            console.log("Colors: ", colors)
        }
    }
    const handleSelecProducer =(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setProducer(e.target.value)
    }
    const handleColorAdd = async () => {
        if (!colorName || !colorImg) {
            alert("Please fill required fields")
            return
        }
        if (colorImg && colorName) {
            const color: Color = {
                color: colorName,
                link: colorImg
            }
            setColors(prevState => [...prevState, color])
            setColorName('')
        }
    }
    const handleRemoveColor = (colorName: string) => {
        setColors(prevState => prevState.filter(value => value.color !== colorName))
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
        const chooseDetailSelect = () => {
            switch (category) {
                case "phone": {
                    productDetailSelect.current = phoneDetailSelect
                    return
                }
                case "laptop" : {
                    productDetailSelect.current = lapDetailSelect
                    return;
                }
            }
        }
        const getProducers = async () => {
            const response: Producer[] = await getProducersByCategory(category)
            setProducers(response.sort((a, b) => a.name.localeCompare(b.name)))
            fetchedProducers.current.set(category, response)
        }

        if (!fetchedProducers.current.has(category)) {
            getProducers()
        } else {
            const producers = fetchedProducers.current.get(category);
            if (producers) {
                setProducers(producers);
            } else {
                setProducers([])
            }
        }
        chooseDetailSelect()

    }
    const productDetailText: Input[] = [
        {
            label: "Processor",
            type: "text"
        },
        {
            label: "RAM",
            type: "text | number"
        },
        {
            label: "Screen",
            type: "text"
        },
        {
            label: "Front camera",
            type: "text"
        },
        {
            label: "Rear camera",
        },
        {
            label: "Battery"
        },
        {
            label: "Made time",
            placeholder: "Ex: 11/2021"
        }
    ]
    const phoneDetailSelect: SelectInput[] = [
        {
            label: "ROM - Storage",
            options: [64, 128, 256, 512, 1024],
            selectedOption: "Choose a ROM"
        },
        {
            label: "OS",
            options: ["Android", "IOS"],
            selectedOption: "Choose an OS"
        }
    ]
    const defaultDetail: SelectInput[] = [
        {
            label: "ROM - Storage",
            options: []
        },
        {
            label: "OS",
            options: []
        }
    ]
    const lapDetailSelect: SelectInput[] = [
        {
            label: "ROM - Storage",
            options: [256, 512, 1024],
            selectedOption: "Choose a ROM"
        },
        {
            label: "OS",
            options: ["Windows", "MacOS", "Ubuntu"],
            selectedOption: "Choose an OS"
        }
    ]
    const productDetailSelect = useRef(defaultDetail)
    return (
        <div className={`w-[1250px] flex rounded bg-inherit p-6`}>
            <div className={`w-2/3 p-3 flex flex-col gap-y-5 *:w-full *:bg-white *:rounded *:shadow-2xl`}>
                {/*Category*/}
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
                {/*Producer detail*/}
                <div className={`flex flex-col`}>
                    <Title title={"Product Detail"}/>
                    <div className={`w-full py-3 flex flex-col gap-y-2`}>
                        <div className={`flex w-full gap-x-4 *:flex-1 px-4`}>
                            <Input input={{
                                value: productName,
                                onChange : (e)=>setProductName(e.target.value),
                                label: "Product name",
                                placeholder: "Enter product name"
                            }}/>
                            {/*producer*/}
                            <div>
                                <Selector selector={{
                                    value: producer,
                                    onChange: handleSelecProducer,
                                    label: "Producer",
                                    selectedOption: "Choose a producer",
                                    options: producers.map(value => value.name)
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className={`w-full p-3 flex flex-wrap *:w-1/3 *:px-3 *:py-3`}>
                        {
                            productDetailText.map((value, index) => (
                                <Input key={index} input={value}/>
                            ))
                        }
                        {
                            productDetailSelect.current.map((value, index) => (
                                <Selector key={index} selector={value}/>
                            ))
                        }
                    </div>
                </div>
                {/*Description*/}
                <div className={`flex flex-col`}>
                    <Title title={"Description"}/>
                    <div className={`flex flex-col px-4`}>
                        <div className={`w-full py-3 flex flex-col gap-y-2`}>
                            <Input input={{label: "Title", placeholder: "Enter title"}}/>
                        </div>
                        <div className={`flex gap-x-3 items-center pb-4`}>
                            <label className={`text-sm font-medium text-gray-900`}>Content </label>
                            <FileUpload
                                text={false}
                                style={`w-1/6 aspect-[3/1]`}
                                input={
                                    <input
                                        onChange={handleContentDocUpload}
                                        className={`hidden`}
                                        type="file"
                                        accept="application/msword, .docx, .doc"/>
                                }
                            />

                        </div>
                    </div>
                </div>
                {/*Color*/}
                <div className={`flex flex-col`}>
                    <Title title={"Color"}/>
                    <div className={`flex px-4 gap-x-3  py-3`}>
                        {/*color add*/}
                        <div className={`flex border-r w-2/3 border-gray-600`}>
                            <div className={`flex flex-col gap-y-4 w-2/3`}>
                                <Input input={{
                                    label: "Name",
                                    placeholder: "Enter color",
                                    value: colorName,
                                    onChange: (e) => setColorName(e.target.value)
                                }}/>
                                <div className={`flex gap-x-3 items-center `}>
                                    <label className={`text-sm font-medium text-gray-900`}>Image </label>
                                    <FileUpload
                                        text={false}
                                        style={`w-full aspect-[5/1]`}
                                        input={
                                            <input
                                                onChange={handleColorImageSource}
                                                className={`hidden`}
                                                type="file"
                                                accept="image/*"/>
                                        }
                                    />
                                </div>
                            </div>
                            <div className={`w-1/3 p-2 pb-0 flex items-end justify-center`}>
                                <div
                                    className={`rounded bg-default_blue cursor-pointer hover:bg-blue_other w-1/2 px-2 py-1`}>
                                    <button onClick={handleColorAdd} className={`w-full text-white font-medium`}>Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*color list*/}
                        <div className={`w-1/3 flex flex-wrap gap-y-1 *:w-1/2`}>
                            {
                                colors.map((value, index) => (
                                    <div key={index} className={`px-2 `}>
                                        <div
                                            className={`bg-gray-300 relative flex items-center justify-center rounded py-1`}>
                                            <p className={`cursor-default`}>{value.color}</p>
                                            <IoCloseCircleOutline
                                                onClick={() => handleRemoveColor(value.color)}
                                                className={`cursor-pointer absolute -top-2 -right-2 `}/>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
            {/**/}
            <div className={`w-1/3 p-3 flex-col flex gap-y-4`}>
                {/*images*/}
                <div className={`bg-white w-full rounded shadow-2xl flex flex-col `}>
                    <Title title={"Product images"}/>
                    <div ref={innerDiv} className={`w-full p-2`}>
                        {/*images*/}
                        <div className={`w-full flex flex-wrap items-center *:p-1 *:w-1/3 *:rounded *:aspect-square `}>
                            <FileUpload
                                text={true}
                                style={'w-1/3'}
                                input={
                                    <input
                                        disabled={imageLoaded >= 5}
                                        id="dropzone-file"
                                        type="file"
                                        accept={'image/*'}
                                        multiple={true}
                                        onChange={handleImageChange}
                                        className="hidden"/>}/>
                            {
                                Array.from({length: maxImages}).map((value, index) => (
                                    <div className={`p-1 relative`}>
                                        <div
                                            className={`flex bg-gray-100 items-center justify-center w-full aspect-square rounded`}>
                                            {
                                                previews[index] ?
                                                    <div className={`relative h-full`}>
                                                        <img key={index} src={previews[index]} alt={`Preview ${index}`}
                                                             className="h-full w-auto object-contain "/>
                                                        <IoCloseCircleOutline
                                                            onClick={() => handleRemoveProductImage(index)}
                                                            className={`cursor-pointer absolute -top-2 -right-2`}
                                                        />
                                                    </div>
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
                {/*Price*/}
                <div className={`bg-white pb-6 w-full rounded shadow-2xl flex flex-col`}>
                    <Title title={"Price"}/>
                    <div className={`flex flex-col gap-y-2 mt-4 px-4`}>
                        <Input input={{label: "Current price"}}/>
                        <Input input={{label: "Previous price"}}/>
                    </div>
                </div>
                {/*quantity*/}
                <div className={`bg-white pb-6 w-full rounded shadow-2xl flex flex-col`}>
                    <Title title={"Quantity"}/>
                    <div className={`flex flex-col gap-y-2 mt-4 px-4`}>
                        <Input input={{label: "Total quantity"}}/>
                        <Input input={{label: "Available quantity"}}/>
                    </div>
                </div>
                {/*preview*/}
                <div className={`bg-white pb-2 w-full rounded shadow-2xl flex flex-col`}>
                    <Title title={"Preview"}/>
                    <div className={`flex w-full`}>
                        <div className={`w-1/2 p-2 *:w-full bg-white`}>
                            {
                                previews[0] ?
                                    <img
                                        src={previews[0]}
                                        className={` h-full aspect-[3/4] object-contain`}
                                        alt={'Product preview'}/>
                                    :
                                    <div className={` z-0 aspect-[3/4] bg-gray-100 flex items-center justify-center`}>
                                        <CiImageOn/>
                                    </div>
                            }
                        </div>
                        <div className={`flex w-1/2 flex-col gap-y-2 p-2 h-full`}>
                            <div className={`flex flex-col gap-y-4 font-medium py-4 justify-center`}>
                                <div
                                    className={`w-full flex items-center justify-start px-2 py-2  rounded bg-outer_blue`}>
                                    <p className={`text-inner_blue truncate`}>{productName || 'Product name'}</p>
                                </div>
                                <div
                                    className={`w-full flex items-center justify-start px-2 py-2 rounded bg-outer_green`}>
                                    <p className={`text-inner_green truncate`}>{producer || 'Producer'}</p>
                                </div>
                                <div
                                    className={`w-full flex items-center justify-start px-2 py-2 rounded bg-outer_red`}>
                                    <p className={`text-inner_red truncate`}>{12000000 .toLocaleString('vi-VN')}VND</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={`w-full flex items-center justify-center px-2 pt-2 pb-0`}>
                        <button
                            className={`py-1 px-1 w-full rounded bg-default_blue text-white font-medium hover:bg-blue_other`}>Add
                            product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
type TitleProps = {
    title: string
}
const Title: React.FC<TitleProps> = ({title}) => {
    return (
        <>
            <div className={`p-4`}>
                <p className={`font-semibold`}>{title}</p>
            </div>
            <hr className={`h-1 border-b-default_gray w-full`}/>
        </>
    )
}
type Input = {
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    placeholder?: string,
    type?: string
}
type InputProps = {
    input: Input
}
const Input: React.FC<InputProps> = ({input}) => {
    return (

        <div className={`flex flex-col w-full`}>
            <label className={`text-sm font-medium text-gray-900 mb-2`}>{input.label}</label>
            <div
                className={`w-full border border-gray-300 text-gray-900 text-sm rounded-lg flex items-center p-2.5`}>
                <input
                    onChange={input.onChange}
                    value={input.value}
                    placeholder={input.placeholder ?? input.label}
                    className={`outline-none w-full placeholder:italic`}
                    spellCheck={false}
                    type="text"/>
            </div>
        </div>

    )
}
type SelectInput = {
    value?: string | number,
    onChange : (e: React.ChangeEvent<HTMLSelectElement>)=>void,
    label?: string,
    selectedOption?: string,
    options: string[] | number[]
}
type SelectProp = {
    selector: SelectInput
}
const Selector: React.FC<SelectProp> = ({selector}) => {
    return (
        <form className="max-w-sm mx-auto">
            <label htmlFor="countries"
                   className="block mb-2 text-sm font-medium text-gray-900">{selector.label ?? "Select an option"}</label>
            <select id="countries"
                    value={selector.value}
                    onChange={selector.onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg block w-full p-[13px]">
                <option value={''} className={`text-gray-400`} selected>{selector.selectedOption}</option>
                {
                    selector.options.map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                    ))
                }
            </select>
        </form>
    )
}
type FileUploadProps = {
    input: React.ReactNode,
    text?: boolean,
    style?: string
}
const FileUpload: React.FC<FileUploadProps> = ({input, text, style}) => {
    return (
        <div className={`flex items-center justify-center ${style}`}>
            <label
                className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                <div className="flex flex-col items-center justify-center py-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
                         aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    {
                        text &&
                        <>
                            <p className=" text-gray-500 text-[10px] font-semibold">
                                Click to upload</p>
                            <p className={`text-gray-500 text-[10px]`}>or drag drop</p>
                        </>
                    }
                </div>
                {input}
            </label>
        </div>
    )
}
export default AdminProductPage;