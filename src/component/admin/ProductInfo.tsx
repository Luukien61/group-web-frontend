import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {CiImageOn} from "react-icons/ci";
import {useCategory} from "@/zustand/AppState.ts";
import {GrCaretNext, GrCaretPrevious} from "react-icons/gr";
import {parse, startOfMonth} from 'date-fns';
import {
    deleteProduct,
    getCategories,
    getProducersByCategory,
    postNewCategory,
    postNewProducer,
    postProduct,
    updateProduct
} from "@/axios/Request.ts";
import {IoCloseCircleOutline} from "react-icons/io5";
import {Category, Color, ContentChild, Description, Price, Producer, Product} from "@/component/CategoryCard.tsx";
import mammoth from 'mammoth';
import imageUpload from "@/cloudinary/ImageUpload.ts";
import {useNavigate} from "react-router-dom";
import {IoIosAddCircleOutline} from "react-icons/io";
import {DefaultInput} from "@/component/Input.tsx";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser.ts";
import toast, {Toaster} from "react-hot-toast";

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
type LoadState = {
    loading: boolean,
    loaded: boolean,
}
const initialState: LoadState = {
    loading: false,
    loaded: false,
}
type ProductInfoProps = {
    product: Product | null;
}

const ProductInfo: React.FC<ProductInfoProps> = ({product}) => {
    const {categories, setCategories} = useCategory()
    const loggedInUser = useCurrentUser()
    const [isManager, setIsManager] = useState<boolean>(true)
    const navigate = useNavigate()
    const [productImageUrl, setProductImageUrl] = useState<string>();
    const [content, setContent] = useState<string>('')
    const fetchedProducers = useRef(new Map())
    const [imagesLoadState, setImagesLoadState] = useState<LoadState>(initialState)
    const [colorImagesLoadState, setColorImagesLoadState] = useState<LoadState>(initialState)
    const [contentImageState, setContentImageState] = useState<LoadState>(initialState)
    const [producers, setProducers] = useState<Producer[]>([])
    const [rawColors, setRawColors] = useState<Color[]>([])
    const [productName, setProductName] = useState<string>('')
    const [producer, setProducer] = useState<string>('')
    const [colorName, setColorName] = useState<string>('')
    const [colorImg, setColorImg] = useState<string>('')
    const [categoryPick, setCategoryPick] = useState<string>('')
    const [previews, setPreviews] = useState<string[]>([]);
    const [imageLoaded, setImageLoaded] = useState<number>(0);
    const [urlSourceClicked, setUrlSourceClicked] = useState<number>();
    const [rom, setRom] = useState<number>(-1)
    const [OS, setOS] = useState<string>('')
    const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)
    const [processor, setProcessor] = useState<string>('');
    const [rawRam, setRawRam] = useState<string>('');
    const [screen, setScreen] = useState<string>('');
    const [rawBattery, setRawBattery] = useState<string>('');
    const [frontCamera, setFrontCamera] = useState<string>('');
    const [rearCamera, setRearCamera] = useState<string>('');
    const [rawMadeTime, setRawMadeTime] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [rawCurrentPrice, setRawCurrentPrice] = useState<string>('')
    const [rawPrePrice, setRawPrePrice] = useState<string>('')
    const [rawTotalQuantity, setRawTotalQuantity] = useState<string>('')
    const [rawAvaiQuantity, setRawAvaiQuantity] = useState<string>('')
    const maxImages: number = 8
    const [contentChildrenIndex, setContentChildrenIndex] = useState<number>(0)
    const [warningDelete, setWarningDelete] = useState<boolean>(false)
    const [confirmText, setConfirmText] = useState<string>('')
    const [addCategory, setAddCategory] = useState<boolean>(false)
    const innerDiv = useRef<HTMLDivElement>(null);
    const [contentChildren, setContentChildren] = useState<ContentChild[]>([])
    const [heading, setHeading] = useState<string>('')
    const [contentImage, setContentImage] = useState<string>('')
    const description: Description = {
        title: '',
        contentChild: [],
    }

    const defaultDetail: SelectInput[] = [
        {
            id: "rom",
            label: "ROM - Storage",
            options: [],
            value: rom,
            addNew: false,
            onChange: (e) => setRom(parseInt(e.target.value))
        },
        {
            id: "OS",
            label: "OS",
            value: OS,
            options: [],
            addNew: false,
            onChange: (e) => setOS(e.target.value)
        }
    ]
    const phoneDetailSelect: SelectInput[] = [
        {
            id: "rom",
            label: "ROM - Storage",
            addNew: true,
            value: rom,
            options: [64, 128, 256, 512, 1024],
            selectedOption: "Choose a ROM",
            onChange: (e) => setRom(parseInt(e.target.value)),
        },
        {
            id: "OS",
            label: "OS",
            addNew: true,
            value: OS,
            options: ["Android", "IOS"],
            selectedOption: "Choose an OS",
            onChange: (e) => setOS(e.target.value)
        }
    ]
    const lapDetailSelect: SelectInput[] = [
        {
            id: "rom",
            label: "ROM - Storage",
            options: [256, 512, 1024],
            value: rom,
            addNew: true,
            selectedOption: "Choose a ROM",
            onChange: (e) => setRom(parseInt(e.target.value)),
        },
        {
            id: "OS",
            label: "OS",
            addNew: true,
            value: OS,
            options: ["Windows", "MacOS", "Ubuntu"],
            selectedOption: "Choose an OS",
            onChange: (e) => setOS(e.target.value)
        }
    ]
    useEffect(() => {

        if (product) {
            const categoryName = product.category.name.toLowerCase()
            const feature = product.features
            const madeTime = feature.madeTime
            feature.madeTime = new Date(madeTime)
            setProductName(product.name)
            setProcessor(feature.chip)
            setRawRam(feature.memory[0].ram.toString())
            setScreen(feature.screen)
            setFrontCamera(feature.frontCamera.join(","))
            setRearCamera(feature.rearCamera.join(","))
            setRawBattery(feature.battery.toString())
            setRawMadeTime(`${feature.madeTime.getMonth() + 1}/${feature.madeTime.getFullYear()}`)
            setTitle(product.description.title)
            setContentChildren(product.description.contentChild)
            setRawCurrentPrice(product.price[0].currentPrice.toString())
            setRawPrePrice(product.price[0].previousPrice.toString())
            setRawTotalQuantity(product.totalQuantity?.toString())
            setRawAvaiQuantity(product.available?.toString())
            setPreviews(product.imgs)
            setRawColors(product.color)
            setProducer(product.producer.name)
            setRom(feature.memory[0].rom)
            setOS(feature.os)
            handleCategoryClick(categoryName)
        }
    }, []);
    useEffect(() => {
        if (loggedInUser.staffID > 0) {
            setIsManager(loggedInUser.role === "ADMIN")
        }
    }, [loggedInUser]);
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
        } else {
            setPreviews([]);
        }
    };
    const handleImageLoaded = (url: string | undefined) => {
        if (!url || url === '') return
        setPreviews(prevState => [...prevState, url]);
        setUrlSourceClicked(-1)
        setImageLoaded(prevState => prevState + 1)
        setProductImageUrl('')
    }
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
        handleImageUpload(e, setColorImg)
    }
    const handleAddContentChild = () => {
        try {
            const contentChild: ContentChild = {
                id: contentChildrenIndex,
                title: heading,
                content: content,
                image: contentImage
            }
            console.log("children: ", contentChild)
            setContentChildren(prevState => [...prevState, contentChild])
            setHeading('')
            setContent('')
            setContentImage('')
            setContentChildrenIndex(prevState => prevState + 1)
        } catch (e) {
            console.log(e)
        }
    }

    // eslint-disable-next-line no-unused-vars
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, action: (value: string) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                action(reader.result as string);
            }
            reader.readAsDataURL(file)
            e.target.files = null
        } else {
            action('')
        }
    }
    const handleContentImage = (e: ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(e, setContentImage)
    }
    const handleContentDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const result = await readDocx(file)
                setContent(result)
            } catch (error) {
                console.error('Error reading docx file:', error);
            }
        }
    };
    const handleAddProduct = async () => {
        const id = productName.toLocaleLowerCase().trim().replace(/\s+/g, '-')
        const newProduct = await assembleProduct(id, 0, false)

        if (newProduct) {
            await postProduct(newProduct);
            setRawColors([])
            setPreviews([])
            navigate(`/admin/${categoryPick.toLowerCase()}`)
        }
    }
    const handleUpdateProduct = async () => {
        if (product) {
            const productId: string = product.id
            const newProduct = await assembleProduct(productId, product.ordering, true)
            if (newProduct) {
                await updateProduct(newProduct, productId);
                navigate(`/admin/${categoryPick.toLowerCase()}`)
            }
        }
    }
    const handleDeleteProductRequest = () => {
        setWarningDelete(true)
    }
    const handleDeleteProduct = async () => {
        if (confirmText === product?.name) {
            try {
                await deleteProduct(product.id)
                navigate(`/admin/${categoryPick.toLowerCase()}`)
            } catch (e) {
                toast.error("An error occurred while deleting product")
            }
        } else toast.error("Incorrect product name")
    }
    const assembleProduct = async (productId: string, ordering: number, contentId: boolean) => {
        checkFillInput()
        const ram = parseInt(rawRam)
        const frontCams = convertTextToArrayInt(frontCamera)
        const rearCams = convertTextToArrayInt(rearCamera)
        const battery = parseInt(rawBattery)
        const [month, year] = rawMadeTime.split('/');
        const madeTime = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
        //const madeTime =  startOfMonth(parse(rawMadeTime, 'MM/yyyy', new Date()));
        description.title = title
        const currentPrice = parseInt(rawCurrentPrice)
        const prePrice = parseInt(rawPrePrice)
        const totalQuantity = parseInt(rawTotalQuantity)
        const avaiQuantity = parseInt(rawAvaiQuantity)
        const colors = (await uploadColorImages())?.filter((color): color is Color => color !== undefined);
        const imgs = (await uploadProductImgs())?.filter((img): img is string => img !== undefined);
        const contentChildren = (await uploadContentImages())
        if (!contentId) {
            contentChildren.forEach(value => value.id = undefined)
        }
        if (colors && imgs && imgs.length > 0 && producer && categoryPick && productName) {

            const memory: Price = {
                id: product?.features.memory[0].id,
                ram: ram,
                rom: rom,
                currentPrice: currentPrice,
                previousPrice: prePrice
            }
            const newProduct: Product = {
                id: productId,
                name: productName,
                price: [memory],
                features: {
                    id: product?.features.id,
                    screen: screen,
                    frontCamera: frontCams || [],
                    rearCamera: rearCams || [],
                    memory: [memory],
                    os: OS,
                    battery: battery,
                    madeTime: madeTime,
                    chip: processor
                },
                description: {
                    id: product?.description.id,
                    title: title,
                    contentChild: contentChildren
                },
                color: colors,
                imgs: imgs,
                category: {
                    name: categoryPick
                },
                producer: {
                    name: producer
                },
                totalQuantity: totalQuantity,
                available: avaiQuantity,
                ordering: ordering,
                rating: product?.rating
            }
            return newProduct
        } else {
            if (!producer) toast.error("Please choose a producer.")
            if (!categoryPick) toast.error("Please choose a category")
            if(!productName) toast.error("Please enter a product name")
        }
    }
    const uploadColorImages = async () => {
        if (rawColors.length == 0) {
            toast.error("Please select a color")
            return
        }
        setColorImagesLoadState({loading: true, loaded: false})
        const promise = rawColors.map(async (value) => {
            const url = await imageUpload({image: value.link})
            if (url && value.color) {
                const color: Color = {
                    id: value.id || undefined,
                    color: value.color,
                    link: url
                }
                return color
            }
        })
        const results = await Promise.all(promise)
        setColorImagesLoadState({loading: false, loaded: true})
        return results
    }
    const uploadContentImages = async () => {
        setContentImageState({loading: true, loaded: false})
        const promise = contentChildren.map(async (value) => {
            const contentImage = value.image
            if (contentImage != undefined && contentImage != '') {
                const url = await imageUpload({image: contentImage})
                if (url) {
                    const contentChild: ContentChild = {...value, image: url}
                    return contentChild
                } else return {...value, imageUrl: ''} as ContentChild
            } else return value
        })
        const results = await Promise.all(promise)
        setContentImageState({loading: false, loaded: true})
        return results
    }
    const uploadProductImgs = async () => {
        if (previews.length == 0) {
            toast.error("Please upload an image")
            return
        }
        setImagesLoadState({loading: true, loaded: false})
        const promise = previews.map(async (value) => {
            const url = await imageUpload({image: value})
            if (url) {
                return url
            }
        })
        const result = await Promise.all(promise)
        setImagesLoadState({loading: false, loaded: true})
        return result
    }
    const checkFillInput = () => {
        const inputs = document.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value && inputs[i].required) {
                scrollToView(inputs[i].id)
                break
            }
        }
    }
    const scrollToView = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            const parent = element.parentElement;
            element.scrollIntoView({behavior: "smooth", block: "center"})
            const className = parent?.className
            const newClassName = `${className} custom-shadow-red`
            if (parent) {
                parent.className = newClassName;
                setTimeout(() => {
                    if (parent) {
                        parent.className = className || '';
                    }
                }, 2000);
            }

        }
    }
    const convertTextToArrayInt = (input: string) => {
        const results = input.trim().split(",").filter(Boolean)
        return results.map(value => parseInt(value))
    }
    const handleSelectProducer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProducer(e.target.value)
    }
    const handleColorAdd = async () => {
        if (!colorName || !colorImg) {
            toast.error("Please fill the required fields")
            return
        }
        if (colorImg && colorName) {
            const color: Color = {
                color: colorName,
                link: colorImg
            }
            setRawColors(prevState => [...prevState, color])
            setColorName('')
            setColorImg('')
        }
    }
    const handleRemoveColor = (colorName: string) => {
        setRawColors(prevState => prevState.filter(value => value.color !== colorName))
    }
    const handleRemoveContentChild = (id: number) => {
        setContentChildren(prevState => prevState.filter(value => value.id !== id))
    }
    useEffect(() => {
        function handleClickOutsite(event: MouseEvent) {
            if (innerDiv.current && !innerDiv.current.contains(event.target as Node)) {
                setUrlSourceClicked(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutsite);
    }, []);
    useEffect(() => {
        if (openAddCategory || warningDelete) {
            document.body.classList.add('overflow-hidden')
        } else document.body.classList.remove("overflow-hidden")
        loadCategory()
    }, [openAddCategory, warningDelete]);
    const loadCategory = async () => {
        const category: Category[] = await getCategories();
        const categoryLower = category.map(item => item.name.toLowerCase());
        setCategories(categoryLower)
    }
    const handleAddCategoryOrProducerClick = (category: boolean) => {
        setOpenAddCategory(true)
        setAddCategory(category)
    }
    useEffect(() => {
        const getProducers = async () => {
            if (categoryPick) {
                const response: Producer[] = await getProducersByCategory(categoryPick)
                if (Array.isArray(response)) {
                    setProducers(response.sort((a, b) => a.name.localeCompare(b.name)));
                } else {
                    console.error('Response is not an array');
                }
                fetchedProducers.current.set(categoryPick, response)
            }
        }
        getProducers()
    }, [openAddCategory]);
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
        chooseDetailSelect()
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
    }
    const productDetailText: Input[] = [
        {
            require: true,
            label: "Processor",
            type: "text",
            value: processor,
            onChange: (e) => setProcessor(e.target.value),
        },
        {
            require: true,
            label: "RAM",
            type: "text | number",
            placeholder: "Ex: 6",
            value: rawRam,
            onChange: (e) => setRawRam(e.target.value),
        },
        {
            require: true,
            label: "Screen",
            type: "text",
            value: screen,
            onChange: (e) => setScreen(e.target.value)
        },
        {
            require: true,
            label: "Front camera",
            type: "text",
            placeholder: "Ex: 32,64",
            value: frontCamera,
            onChange: (e) => setFrontCamera(e.target.value),
        },
        {
            require: true,
            label: "Rear camera",
            value: rearCamera,
            placeholder: "Ex: 50,100",
            onChange: (e) => setRearCamera(e.target.value)

        },
        {
            require: true,
            label: "Battery",
            value: rawBattery,
            placeholder: "Ex: 5160",
            onChange: (e) => setRawBattery(e.target.value)
        },
        {
            require: true,
            label: "Made time",
            placeholder: "Ex: 11/2021",
            value: rawMadeTime,
            onChange: (e) => setRawMadeTime(e.target.value)
        },
        {
            require: false,
            label: "OS",
            placeholder: "Ex: Android, IOS, Windows",
            value: OS,
            onChange: (e) => setOS(e.target.value)
        }
    ]
    const productDetailSelect = useRef(defaultDetail)
    const scrollCategory = useRef<HTMLDivElement>(null)
    const scroll = (direction: string) => {
        const container = scrollCategory.current;
        const scrollAmount = direction === 'left' ? -100 : 100;
        if (container) {
            container.scrollBy({left: scrollAmount, behavior: 'smooth'});
        }
    };

    return (
        <div className={`flex relative justify-center items-center`}>
            <div className={`w-1200 h-auto relative flex rounded bg-inherit p-6 overflow-y-visible `}>
                <div className={`w-2/3 p-3 flex flex-col gap-y-5 *:w-full *:bg-white *:rounded *:shadow-2xl`}>
                    {/*Category*/}
                    <div className={`flex flex-col`}>
                        <div className={`flex flex-col p-5 gap-y-3`}>
                            <div className={`flex w-full`}>
                                <p className={`font-semibold flex-1`}>Category</p>
                                <div
                                    onClick={() => handleAddCategoryOrProducerClick(true)}
                                    className={`flex items-center gap-x-2 cursor-pointer hover:scale-[1.03] transform duration-300`}>
                                    <IoIosAddCircleOutline color={`#3B7DDD`} size={28}/>
                                    <p className={`text-[16px] text-inner_blue font-medium`}>Add category </p>
                                </div>
                            </div>
                            <hr className={`h-1 border-b-default_gray w-full`}/>
                            <div className={`flex `}>
                                <div className={`flex-1 overflow-hidden relative`}>
                                    <div className={``}>
                                        <div
                                            className={`absolute flex items-center inset-0 left-1 w-fit ${openAddCategory ? '-z-0' : 'z-10'}`}>
                                            <div
                                                onClick={() => scroll('left')}
                                                className={`rounded-[100%] flex items-center justify-center bg-white p-1 cursor-pointer hover:bg-outer_green duration-300`}>
                                                <GrCaretPrevious/>
                                            </div>
                                        </div>
                                        <div
                                            className={`absolute flex items-center inset-0 left-[95%] w-fit ${openAddCategory ? '-z-0' : 'z-10'}`}>
                                            <div
                                                onClick={() => scroll('right')}
                                                className={`rounded-[100%] flex items-center justify-center bg-white p-1 cursor-pointer hover:bg-outer_green duration-300`}>
                                                <GrCaretNext/>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        ref={scrollCategory}
                                        className={`flex items-center overflow-x-auto`}>
                                        <div className={'flex transform translate-x-0 translate-y-0 gap-x-4'}>
                                            {
                                                categories.map((value, index) => (
                                                    <div
                                                        title={value}
                                                        onClick={() => handleCategoryClick(value)}
                                                        key={index}
                                                        className={`cursor-pointer w-[100px] flex items-center justify-center h-[124px] rounded bg-gray-100 px-1 
                                                    ${categoryPick === value && 'border-[3px] border-inner_blue bg-gradient-to-r from-outer_blue'}`}>
                                                        <div className={`w-full flex justify-center`}>
                                                            <p className={`w-fit self-center truncate`}>{value.toLocaleUpperCase()}</p>
                                                        </div>
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
                                    require: true,
                                    value: productName,
                                    onChange: (e) => setProductName(e.target.value),
                                    label: "Product name",
                                    placeholder: "Enter product name"
                                }}/>
                                {/*producer*/}
                                <div>
                                    <Selector selector={{
                                        id: "producer",
                                        value: producer,
                                        addNew: categoryPick !== '',
                                        onChange: handleSelectProducer,
                                        label: "Producer",
                                        action: () => handleAddCategoryOrProducerClick(false),
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
                            <Selector selector={{
                                id: "ROM",
                                value: rom,
                                addNew: false,
                                onChange: (e) => setRom(parseInt(e.target.value)),
                                label: "ROM",
                                selectedOption: "Choose a ROM",
                                options: [32, 64, 128, 256, 512, 1024]
                            }}/>

                        </div>
                    </div>
                    {/*Description*/}
                    <div className={`flex flex-col`}>
                        <Title title={"Description"}/>
                        <div className={`flex w-full`}>
                            <div className={`flex w-2/3 flex-col px-4`}>
                                <div className={`w-full py-3 flex flex-col gap-y-2`}>
                                    <Input input={{
                                        require: true,
                                        label: "Title",
                                        placeholder: "Enter title",
                                        value: title,
                                        onChange: (e) => setTitle(e.target.value),
                                    }}/>
                                </div>
                                <div className={`flex flex-col gap-y-2 pb-4`}>
                                    <label className={`text-sm font-medium text-gray-900`}>Content </label>
                                    <Input input={{
                                        require: true,
                                        label: "Heading",
                                        placeholder: "Heading...",
                                        value: heading,
                                        onChange: (e) => setHeading(e.target.value),
                                    }}/>
                                    <Input input={{
                                        require: true,
                                        label: "Content",
                                        placeholder: "Content...",
                                        value: content,
                                        onChange: (e) => setContent(e.target.value),
                                    }}/>
                                    <div className={`flex gap-x-3`}>

                                        <FileUpload
                                            text={false}
                                            style={`w-1/2`}
                                            input={
                                                <input
                                                    onChange={handleContentImage}
                                                    className={`hidden`}
                                                    type="file"
                                                    accept="image/*"/>
                                            }
                                        />
                                        <input
                                            value={contentImage}
                                            onChange={e => setContentImage(e.target.value)}
                                            className={`outline-none border w-1/2 rounded h-full border-gray-600 placeholder:italic px-2 truncate`}
                                            placeholder={'Or url'}
                                        />
                                    </div>
                                    <div>

                                    </div>
                                    <DefaultButton
                                        onclick={handleAddContentChild}
                                        label={"Add"}
                                        style={'rounded bg-inner_blue p-2 w-full'}/>
                                </div>
                            </div>
                            <div className={`h-[90%] overflow-y-auto border-l-2 w-1/3`}>
                                <div className={`w-full  flex-col flex gap-y-2 pt-2 max-h-[450px]`}>
                                    {
                                        contentChildren.map((_value, index) => (
                                            <div key={index} className={`px-2 relative max-w-[80%]`}>
                                                <div
                                                    className={`bg-gray-300 flex items-center justify-center rounded py-1 group`}>
                                                    <p className={`cursor-default`}>Para {index+1}</p>
                                                    <IoCloseCircleOutline
                                                        onClick={() => handleRemoveContentChild(_value.id || -1)}
                                                        className={`cursor-pointer absolute -top-2 -right-2 `}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Color*/}
                    <div className={`flex flex-col`}>
                        <Title title={"Color"}/>
                        <div className={`flex px-4 gap-x-3  py-3`}>
                            {/*color add*/}
                            <div className={`flex border-r w-2/3 border-gray-600`}>
                                <div className={`flex flex-col gap-y-4 w-4/5`}>
                                    <Input input={{
                                        require: false,
                                        label: "Name",
                                        placeholder: "Enter color",
                                        value: colorName,
                                        onChange: (e) => setColorName(e.target.value)
                                    }}/>
                                    <div className={`flex gap-x-3 items-center `}>
                                        <label className={`text-sm font-medium text-gray-900`}>Image </label>
                                        <FileUpload
                                            text={false}
                                            style={`w-1/3`}
                                            input={
                                                <input
                                                    onChange={handleColorImageSource}
                                                    className={`hidden`}
                                                    type="file"
                                                    accept="image/*"/>
                                            }
                                        />
                                        <input
                                            value={colorImg}
                                            onChange={e => setColorImg(e.target.value)}
                                            className={`outline-none border w-1/2 rounded h-full border-gray-600 placeholder:italic px-2 truncate`}
                                            placeholder={'Or url'}
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
                                    rawColors.map((value, index) => (
                                        <div key={index} className={`px-2 relative`}>
                                            <div
                                                className={`bg-gray-300  flex items-center justify-center rounded py-1 group`}>
                                                <p className={`cursor-default`}>{value.color}</p>
                                                <IoCloseCircleOutline
                                                    onClick={() => handleRemoveColor(value.color)}
                                                    className={`cursor-pointer absolute -top-2 -right-2 `}/>
                                                <div className={`absolute hidden -top-1/2 group-hover:block  `}>
                                                    <img className={`border rounded`} src={value.link}
                                                         alt={value.color}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
                {/**/}
                <div className={`w-1/3 p-3 sticky h-[calc(100vh-1rem)] top-0 overflow-y-auto flex-col flex gap-y-4`}>
                    {/*images*/}
                    <div className={`bg-white w-full rounded shadow-2xl flex flex-col `}>
                        <Title title={"Product images"}/>
                        <div ref={innerDiv} className={`w-full p-2`}>
                            {/*images*/}
                            <div
                                className={`w-full flex flex-wrap items-center *:p-1 *:w-1/3 *:rounded *:aspect-square `}>
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
                                        <div key={index} className={`p-1 relative`}>
                                            <div
                                                className={`flex bg-gray-100 items-center justify-center w-full aspect-square rounded`}>
                                                {
                                                    previews[index] ?
                                                        <div className={`relative h-full`}>
                                                            <img key={index} src={previews[index]}
                                                                 alt={`Preview ${index}`}
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
                                                    onChange={(e) => setProductImageUrl(e.target.value)}
                                                    value={productImageUrl}
                                                    onKeyDown={() => handleImageLoaded(productImageUrl)}
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
                            <Input input={{
                                require: true,
                                label: "Current price",
                                placeholder: "Ex: 12000000",
                                value: rawCurrentPrice,
                                onChange: (e) => setRawCurrentPrice(e.target.value)
                            }}/>
                            <Input input={{
                                require: true,
                                label: "Previous price",
                                placeholder: "Ex: 15000000",
                                value: rawPrePrice,
                                onChange: (e) => setRawPrePrice(e.target.value)
                            }}/>
                        </div>
                    </div>
                    {/*quantity*/}
                    <div className={`bg-white pb-6 w-full rounded shadow-2xl flex flex-col`}>
                        <Title title={"Quantity"}/>
                        <div className={`flex flex-col gap-y-2 mt-4 px-4`}>
                            <Input input={{
                                require: true,
                                label: "Total quantity",
                                value: rawTotalQuantity,
                                onChange: (e) => setRawTotalQuantity(e.target.value)
                            }}/>
                            <Input input={{
                                require: true,
                                label: "Available quantity",
                                value: rawAvaiQuantity,
                                onChange: (e) => setRawAvaiQuantity(e.target.value)
                            }}/>
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
                                        <div
                                            className={` z-0 aspect-[3/4] bg-gray-100 flex items-center justify-center`}>
                                            <CiImageOn/>
                                        </div>
                                }
                            </div>
                            {/*preview*/}
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
                                        <p className={`text-inner_red truncate`}>{
                                            rawCurrentPrice ?
                                                parseInt(rawCurrentPrice).toLocaleString('vi-VN') : 0}VND
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`w-full flex items-center justify-center px-2 pt-2 pb-1`}>
                            {
                                isManager ?
                                    <>
                                        {
                                            product ?
                                                <div className={`w-full flex items-center justify-center gap-x-4`}>
                                                    <DefaultButton
                                                        label={"Delete"}
                                                        style={`bg-default_red hover:bg-red-600 w-full`}
                                                        onclick={handleDeleteProductRequest}/>
                                                    <DefaultButton
                                                        label={"Update"}
                                                        style={`bg-inner_green hover:bg-default_green w-full`}
                                                        onclick={handleUpdateProduct}/>
                                                </div> :
                                                <DefaultButton
                                                    label={"Add product"}
                                                    style={`bg-default_blue hover:bg-blue_other w-full`}
                                                    onclick={handleAddProduct}/>
                                        }
                                    </>
                                    : <div className={`w-full flex items-center justify-center p-4`}>

                                    </div>
                            }
                        </div>
                        {
                            imagesLoadState.loading || colorImagesLoadState.loading || contentImageState.loading && (
                                <Loading/>
                            )
                        }
                        {
                            openAddCategory &&
                            <AddCategory
                                isAdmin={isManager}
                                setAction={setOpenAddCategory}
                                category={addCategory ? undefined : categoryPick}/>
                        }
                        {
                            warningDelete &&
                            <div
                                className={`w-screen h-screen flex fixed backdrop-blur-sm bg-black bg-opacity-60 inset-0 z-[100] items-center justify-center `}>
                                <div
                                    className={`w-[500px] h-fit max-h-[550px] z-50  bg-white drop-shadow rounded-xl flex flex-col items-center p-10`}>
                                    <p className={`font-bold`}>Are you sure to delete this product?</p>
                                    <p className={`text-red-600`}>This action can not be undo!!!</p>
                                    <div className={`w-full flex items-center justify-center flex-col mt-4`}>
                                        <label className={`text-[16px] select-none flex flex-col items-center gap-y-2`}>
                                            To confirm, type "{product?.name}" in the box below
                                            <DefaultInput onChange={(e) => setConfirmText(e.target.value)}
                                                          value={confirmText} type={'text'}
                                                          className={`w-full border rounded`}/>
                                        </label>
                                    </div>
                                    <div className={`flex gap-x-3 items-center mt-3 justify-center w-full`}>
                                        <DefaultButton
                                            label={"Cancel"}
                                            style={`bg-gray-400 w-fit hover:bg-gray-500 px-3`}
                                            onclick={() => setWarningDelete(false)}/>
                                        <DefaultButton
                                            label={"Delete"}
                                            style={`bg-default_red w-fit hover:bg-red-600 px-3`}
                                            onclick={handleDeleteProduct}/>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
            <Toaster toastOptions={
                {
                    duration: 1500
                }
            }/>
        </div>
    );
};
type Button = {
    onclick: () => void,
    label: string,
    style?: string,
    loading?: React.ReactNode
}

export const DefaultButton: React.FC<Button> = ({label, style, onclick, loading}) => {
    return (
        <button
            onClick={onclick}
            className={`py-1 px-1 flex items-center gap-x-2 justify-center rounded text-white font-medium ${style}`}>
            {loading ?? loading}
            {label}
        </button>
    )
}
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
    require: boolean
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
                className={`w-full border border-gray-300 text-gray-900 text-sm rounded-lg flex items-center p-2.5 `}>
                <input
                    required={input.require}
                    id={input.label}
                    onChange={input.onChange}
                    value={input.value || ''}
                    placeholder={input.placeholder ?? input.label}
                    className={`outline-none w-full placeholder:italic appearance-none border-0`}
                    spellCheck={false}
                    type="text"/>
            </div>
        </div>

    )
}
type SelectInput = {
    id: string,
    value?: string | number,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    label?: string,
    selectedOption?: string,
    options: string[] | number[],
    addNew: boolean,
    action?: () => void
}
type SelectProp = {
    selector: SelectInput
}
const Selector: React.FC<SelectProp> = ({selector}) => {
    const [innerSelector, setInnerSelector] = useState<SelectInput>(selector)
    useEffect(() => {
        setInnerSelector(selector)
    }, [selector]);
    return (
        <form className="max-w-sm mx-auto">
            <div className={`w-full flex items-center justify-center`}>
                <label
                    className="flex-1 block mb-2 text-sm font-medium text-gray-900">
                    {innerSelector.label ?? "Select an option"}
                </label>
                {
                    selector.addNew &&
                    <IoIosAddCircleOutline
                        onClick={innerSelector.action}
                        className={`cursor-pointer hover:scale-[1.03] duration-300 transform`}
                        color={`#3B7DDD`} size={24}/>
                }
            </div>
            <select id={innerSelector.id}
                    value={innerSelector.value}
                    onChange={innerSelector.onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg block w-full p-[13px]">
                <option value={''} className={`text-gray-400`} selected>{innerSelector.selectedOption}</option>
                {
                    innerSelector.options.map((value, index) => (
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
export const FileUpload: React.FC<FileUploadProps> = ({input, text, style}) => {
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
const Loading = () => {
    return (
        <div
            className={`w-screen h-screen flex fixed backdrop-blur-sm bg-black bg-opacity-10 inset-0 z-50 items-center justify-center  `}>
            <div className={``}>
                <div>
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

            </div>
        </div>
    )
}

type AddCategoryProps = {
    setAction: React.Dispatch<React.SetStateAction<boolean>>,
    category?: string,
    isAdmin: boolean
}
export const AddCategory: React.FC<AddCategoryProps> = ({setAction, category, isAdmin}) => {
    const [categoryName, setCategoryName] = useState<string>(category || '')
    const [producer, setProducer] = useState<string>('')
    const [producers, setProducers] = useState<Producer[]>([])
    const [, setSuccess] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const disable = !!category
    const handleAddProducer = () => {
        if (producer === '') {
            toast.error("Please enter a producer name")
            return
        }
        setProducers(prevState => [...prevState, {name: producer}])
        setProducer('')
    }
    const handleRemoveClick = (value: string) => {
        setProducers(prevState => prevState.filter(value1 => value1.name !== value))
    }
    const handleAddCategory = async () => {
        setIsLoading(true)
        const category: Category = {
            name: categoryName,
            producers: producers
        }
        try {
            await postNewCategory(category)
            setSuccess(true)
            setAction(false)
            setIsLoading(false)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const customError: Error = error.response.data
                toast.error(customError.message)
            }
            setSuccess(false)
            setIsLoading(false)
        }
    }
    const handleAddProducers = async () => {
        try {
            if (category) {
                await postNewProducer(producers, category)
                setSuccess(true)
                setAction(false)
                setIsLoading(false)
            }
        } catch (error) {
            setSuccess(false)
            setIsLoading(false)
        }
    }
    const handleAddClick = () => {
        if (category) {
            handleAddProducers()
        } else handleAddCategory()
    }
    return (
        <div
            className={`w-screen h-screen flex  fixed backdrop-blur-sm bg-black bg-opacity-60 inset-0 z-50 items-center justify-center `}>
            <div className={`w-[500px] h-fit max-h-[550px] bg-white drop-shadow rounded-xl flex flex-col p-10`}>
                <div className={`flex flex-col gap-y-10`}>
                    <label className={`flex flex-col gap-y-2`}>
                        <p>Category name</p>
                        <DefaultInput
                            className={'border rounded'}
                            disabled={disable}
                            value={categoryName}
                            placeholder={"Category name"}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </label>
                    <div className={`flex gap-x-4`}>
                        <label className={`flex flex-col gap-y-2 flex-1`}>
                            <p>Producer</p>
                            <DefaultInput
                                className={'border rounded'}
                                value={producer}
                                placeholder={"Category name"}
                                onChange={(e) => setProducer(e.target.value)}
                            />
                        </label>
                        <div className={`flex items-end`}>
                            {
                                isAdmin &&
                                <button
                                    onClick={handleAddProducer}
                                    className={`rounded bg-default_blue px-2 py-2 text-white hover:bg-blue-800`}>
                                    Add
                                </button>
                            }
                        </div>
                    </div>
                    <div className={`overflow-y-visible flex ${producers.length > 0 && 'bg-outer_blue'}`}>
                        <div
                            className={`flex flex-wrap h-[60px]  overflow-x-hidden max-h-[80px] gap-x-4 gap-y-3 min-h-10 overflow-y-auto `}>
                            {
                                producers.map((value, index) => (
                                    <div key={index}
                                         className={`rounded flex relative items-center w-fit px-2 py-1 mx-2 mt-2 bg-gray-400 text-white`}>
                                        <p>
                                            {value.name}
                                        </p>
                                        <div className={`absolute -top-2 -right-2`}>
                                            <IoCloseCircleOutline
                                                className={`cursor-pointer`}
                                                onClick={() => handleRemoveClick(value.name)}
                                                color={'black'}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={`flex gap-x-4 justify-end items-center`}>
                        <button
                            onClick={() => setAction(false)}
                            className={`font-medium rounded bg-default_red px-2 py-1 text-white hover:bg-red-600 flex items-center gap-x-1`}>
                            Cancel
                        </button>
                        {
                            isAdmin &&
                            <button
                                onClick={handleAddClick}
                                className={`font-medium rounded bg-default_blue px-2 py-1 text-white hover:bg-blue-800 flex items-center gap-x-1`}>
                                {
                                    isLoading &&
                                    <svg aria-hidden="true"
                                         className="w-4 h-4 text-gray-200 animate-spin fill-white "
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"/>
                                    </svg>
                                }
                                Add category
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductInfo;