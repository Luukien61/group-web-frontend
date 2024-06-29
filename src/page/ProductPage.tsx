import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Card, CardContent} from "@/shadcn/ui/card"
import {Label} from "@/shadcn/ui/label"
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group"
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel"
import {Table, TableBody, TableCell, TableRow,} from "@/shadcn/ui/table"
import {useLocation} from "react-router-dom";
import {
    EmailType,
    fetchProductsCategory,
    getProductById,
    OrderDetail,
    placeOrder,
    sendVerificationMail
} from "@/axios/Request.ts";
import {Feature, Product, Rating} from "@/component/CategoryCard.tsx";
import {DefaultInput} from "@/component/Input.tsx";
import {ProductPageable} from "@/page/admin/CategoryAdminPage.tsx";
import RatingComponent, {RatingCount} from "@/component/RatingComponent.tsx";
import toast, {Toaster} from "react-hot-toast";
import {zalo} from "@/url/Urls.ts";

type OrderProp = {
    title: string,
    value: string,
    type: "text" | "number" | "email",
    // eslint-disable-next-line no-unused-vars
    action: (event: React.ChangeEvent<HTMLInputElement>) => void

}

// eslint-disable-next-line react-refresh/only-export-components
export const sendEmailCode = async (email: string, code: number, type: EmailType) => {
    const res = await sendVerificationMail(email, code, type)
    if (!res || res.status !== 200) {
        throw Error("An error occurred while sending")
    }
}
// eslint-disable-next-line react-refresh/only-export-components
export const createVerificationCode = (): number => {
    return Math.floor(Math.random() * 900000 + 100000)
}

const defaultRating: Rating = {
    oneStart: 0,
    twoStarts: 0,
    threeStarts: 0,
    fourStarts: 0,
    fiveStarts: 0,
    average: 0
}
export const MY_ORDER: string = "my_order"
const ProductPage = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [isDoneClicked, setIsDoneClicked] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(60)
    const [expired, setExpired] = useState<boolean>(false)
    const [fullName, setFullName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [userCode, setUserCode] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)
    const [verificationCode, setVerificationCode] = useState<string>('')
    const deviceId = useLocation().pathname.slice(1).split("/")[1]
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [product, setProduct] = useState<Product>()
    const [isDone, setIsDone] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [outstandingProducts, setOutstandingProducts] = useState<Product[]>([])
    const [isOpenImageView, setIsOpenImageView] = useState<boolean>(false)
    const [imageViewIndex, setImageViewIndex] = useState<number>(0)
    const [productImagesLength, setProductImageLength] = useState<number>(product?.imgs.length || 0)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const category = useLocation().pathname.split('/')[1]

    useEffect(() => {
        getOutstandingProducts(4)
    }, [])
    const getOutstandingProducts = async (quantity: number) => {
        const response: ProductPageable = await fetchProductsCategory({
            category: category,
            size: quantity,
            sort: "rating"
        })
        const content = response.content
        setOutstandingProducts(content)
    }
    const handleOpenImageView = (index: number) => {
        setIsOpenImageView(true)
        setImageViewIndex(index)
    }
    const handleSelectedIndex = (index: number) => {
        setSelectedIndex(index)
    }
    const handleColorPick = useCallback((index: number) => {
        const pickIndex = (productImagesLength + index)
        handleOpenImageView(pickIndex)
    }, [productImagesLength])
    useEffect(() => {
        if (product) {
            document.title = product.name
            setProductImageLength(product.imgs.length)
        }
    }, [product]);
    const orderInfor: OrderProp[] = [
        {
            title: "Full name",
            type: "text",
            action: (event) => setFullName(event.target.value),
            value: fullName
        },
        {
            title: "Phone",
            type: "text",
            action: (event) => setPhone(event.target.value),
            value: phone
        },
        {
            title: "Email",
            type: "email",
            action: (event) => setEmail(event.target.value),
            value: email
        },
        {
            title: "Address",
            type: "text",
            action: (event) => setAddress(event.target.value),
            value: address
        }
    ]

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProductById(deviceId)
            setProduct(product)
        }
        if (isRendered) {
            fetchProduct()
        }
    }, [deviceId, isRendered]);

    const handleOpenModal = useCallback(() => {
        setOpenModal((pre) => !pre)
    }, [])
    const handleCloseModel = useCallback(() => {
        setOpenModal(false);
    }, [])
    const handleModalClicks = useCallback((event: React.MouseEvent) => {
        event.stopPropagation()
    }, [])
    useEffect(() => {
        setIsRendered(true);
        return () => {
            setIsRendered(false);
        };
    }, []);


    // eslint-disable-next-line no-undef
    const intervalTimer = useRef<NodeJS.Timeout | null>(null);
    const handlePurchaseDoneClick = () => {
        setIsDoneClicked(true)
        if (fullName !== "" && phone !== "" && address !== "" && email !== "") {
            const code = createVerificationCode()

            sendEmailCode(email, code, {event: "order"})
                .then(() => {
                    setIsSent(true)
                    const codeText = code.toString().trim()
                    setVerificationCode(codeText)
                    intervalTimer.current = setInterval(() => {
                        setTimer(prev => prev - 1)
                    }, 1000)
                }).catch(() => {
                setErrorMessage("An error has occurred when sending email")
            });
        }
    }
    useEffect(() => {
        if(errorMessage){
            toast.error(errorMessage)
            setErrorMessage('')
        }
    }, [errorMessage]);
    const handleVerifyCode = () => {
        if (userCode.length === 6 && !expired) {
            if (userCode === verificationCode && !expired) {
                setTimeout(() => setIsDone(true), 1000)
                order()
            } else {
                toast.error("Either verification code or expired")
            }
        } else {
            toast.error("Either verification code or expired")
        }
    };


    const order = async () => {
        if (product) {
            const orderId = makeId(10)
            const orderDetail: OrderDetail = {
                orderId: orderId,
                productId: product.id,
                email: email,
                phone: phone,
                done: false,
                time: new Date()
            }
            const message: string = await placeOrder(orderDetail)
            setMessage(message)
            addMyOrder(product.id)
        }
    }
    const addMyOrder = (product: string) => {
        const myOrderRaw : string | null = localStorage.getItem(MY_ORDER)
        const myOrder : string[]=[]
        if(myOrderRaw!=null){
            myOrder.push(JSON.parse(myOrderRaw))
        }
        myOrder.push(product)
        localStorage.setItem(MY_ORDER, JSON.stringify(myOrder))
    }

    const makeId = (length: number): string => {
        let result: string = ''
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const characterLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characterLength));
        }
        return result;
    }

    useEffect(() => {
        if (timer === 0 && intervalTimer.current) {
            setExpired(true)
            clearInterval(intervalTimer.current)
            intervalTimer.current = null
        }
    }, [timer]);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            setAddress("")
            setPhone("")
            setFullName("")
            setEmail("")
            setIsDone(false)
            setIsDoneClicked(false)
            setVerificationCode("")
            setUserCode("")
            setIsSent(false)
            setTimer(60)
            setExpired(false)
            if (intervalTimer.current) {
                clearInterval(intervalTimer.current)
                intervalTimer.current = null
            }
        }
    }, [openModal]);

    return (
        product && (
            <div>
                <Toaster toastOptions={{duration: 2000}}/>
                <div className={`relative `}>
                    <div className={`relative overflow-y-visible grid grid-cols-12 w-full mt-4 mb-4`}>
                        {/*main content*/}
                        <div className={`h-auto bg-white col-span-10 border rounded p-5 mb-4`}>
                            <div className={`w-full border-b`}>
                                <h1 className={`text-black pb-2 font-semibold`}>
                                    {product.name}
                                </h1>
                            </div>
                            <div className={`w-full flex flex-col`}>
                                <div className={`w-full flex`}>
                                    <div className={`block w-1/2`}>
                                        <CarouselApiDemo
                                            action={handleOpenImageView}
                                            links={product.imgs}/>
                                    </div>
                                    {/*right side*/}
                                    <div className={`w-1/2 flex`}>
                                        <div className={`flex flex-col py-3 pl-8 w-full`}>
                                            <div className={`flex gap-x-2 items-end justify-start`}>
                                                <h1 className={`text-default_red text-[32px] leading-[40px] font-[500]`}>
                                                    {product.price[0].currentPrice > 0 ? product.price[0].currentPrice.toLocaleString('vi-VN') + 'đ' : 'Contact'}
                                                </h1>
                                                {
                                                    product.price[0].currentPrice>0 &&
                                                    <h1 className={`text-default_gray text-[20px] font-[400] leading-7 line-through`}>
                                                        {product.price[0].previousPrice.toLocaleString('vi-VN') + 'đ'}
                                                    </h1>
                                                }
                                            </div>
                                            {/*price options*/}
                                            <div className={`w-full flex flex-wrap`}>
                                                <RadioGroup className={`flex w-full py-3 text-[14px]`}>
                                                    {
                                                        product.price.map((price, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => handleSelectedIndex(index)}
                                                                className={`flex flex-col flex-1 gap-y-1 bg-secondary_gray rounded p-1 cursor-pointer group`}>
                                                                <div className={`flex justify-center gap-x-1 w-auto`}>
                                                                    <RadioGroupItem
                                                                        className={`text-default_red border-default_red`}
                                                                        value={`ram=${price.ram}&rom=${price.rom}`}
                                                                        id={index.toString()}
                                                                        checked={selectedIndex === index}
                                                                    />
                                                                    <Label className={`text-[14px]`}
                                                                           htmlFor={index.toString()}>{price.rom > 1000 ? `${Math.floor(price.rom / 1000)}TB` : `${price.rom}GB`}</Label>
                                                                </div>
                                                                <h1 className={`self-center`}>
                                                                    {product.price[0].currentPrice > 0 ? product.price[0].currentPrice.toLocaleString('vi-VN') + 'đ' : 'Contact'}
                                                                </h1>
                                                            </div>
                                                        ))
                                                    }
                                                </RadioGroup>
                                            </div>
                                            {/*color*/}
                                            <div
                                                className={`flex flex-wrap gap-x-2 pt-3 `}>
                                                {
                                                    product.color.map((color, index) => (
                                                        <div
                                                            onClick={() => handleColorPick(index)}
                                                            key={index}
                                                            className={`flex cursor-pointer  flex-col max-w-[60px]`}>
                                                            <img className={`aspect-square w-[50px] rounded border`}
                                                                 src={color.link}
                                                                 alt={index.toString()}/>
                                                            <h3 className={`text-[12px] self-center leading-6 h-[3rem] max-w-full`}>
                                                                {color.color}
                                                            </h3>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className={`rounded bg-white drop-shadow p-3 my-3`}>
                                                <h1 className={`text-black font-[500] border-b`}>
                                                    Device info
                                                </h1>
                                                <div className={`flex pt-3 `}>
                                                    <TableDemo feature={product.features}/>
                                                </div>
                                            </div>
                                            {/*Purchase button*/}
                                            <div
                                                onClick={handleOpenModal}
                                                className={`w-full h-[64px] bg-default_blue rounded flex justify-center items-center hover:bg-white border border-blue-600 cursor-pointer group`}>
                                                <p className={`text-white font-medium group-hover:text-blue-600 duration-300`}>Order</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className={`w-full border`}/>
                                <div className={`py-6 flex flex-col gap-y-3 px-7`}>
                                    <p className={`font-semibold text-[28px]`}>{product.name} rating</p>
                                    <RatingComponent imgUrl={product.imgs[0]}
                                                     productRating={product.rating ?? defaultRating}
                                                     productId={product.id}/>
                                </div>
                                {/*device description*/}
                                <div className={`pt-4 flex flex-col`}>
                                    <h1 className={`self-center font-bold text-[1.25rem] py-3`}>
                                        Detailed Review of the {product.name}</h1>
                                    <h2 className={`font-medium pb-4 text-justify`}>{product.description.title}</h2>
                                    {
                                        product.description.contentChild.map((value, index) => (
                                                <div key={index} className={`flex flex-col gap-y-4 mt-4`}>
                                                    <p className={`font-medium`}>{value.title}</p>
                                                    <div className={`flex flex-col gap-y-4`}>
                                                        <p>{value.content}</p>
                                                        <img src={value.image} alt={value.image}/>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {/*side ads*/}
                        <SideBarADs products={outstandingProducts}/>
                    </div>
                    {/*fixed button*/}
                    <div
                        className={`fixed right-5 bottom-5 flex flex-col items-center gap-y-6`}>
                        <a href={`${zalo}`}>
                            <img
                                className={`hover:scale-110 duration-300`}
                                src={`https://page.widget.zalo.me/static/images/2.0/Logo.svg`} alt={`Zalo`}/>
                        </a>
                        <button
                            className={`hover:scale-110 text-white font-medium cursor-pointer duration-300 rounded bg-default_red w-fit h-fit p-2 `}
                            type={'button'}
                            onClick={handleOpenModal}>Order
                        </button>
                    </div>
                    {/*model*/}
                    {
                        isOpenImageView &&
                        <ImageView startIndex={imageViewIndex} action={() => setIsOpenImageView(false)}
                                   images={[...product.imgs, ...product.color.map(value => value.link)]}/>
                    }

                </div>
                <div onClick={handleCloseModel}
                     id="default-modal"
                     className={`backdrop-blur-sm bg-black bg-opacity-60 flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full max-h-full ${openModal ? "block" : "hidden"}`}>

                    <div onClick={event => handleModalClicks(event)}
                         className="relative p-4 w-full max-w-[40%] max-h-full">
                        {/* modal */}
                        <div
                            className="relative bg-white rounded-lg flex items-center justify-center min-h-60 shadow dark:bg-gray-700">
                            {
                                product.available == 0
                                    ? <div className={`w-full h-full flex items-center justify-center`}>
                                        <p className={`font-semibold`}>Sorry this product is sold out</p>
                                    </div>
                                    : <div className={`w-full`}>
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Order Information
                                            </h3>
                                            <button
                                                onClick={handleOpenModal}
                                                type="button"
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                                <svg className="w-3 h-3" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     fill="none"
                                                     viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span className="sr-only">Close</span>
                                            </button>
                                        </div>
                                        {/*main content*/}
                                        <div className="p-4 md:p-5 space-y-4 flex flex-col">
                                            {!isDone && !isSent && orderInfor.map((value, index) => (
                                                <div key={index}
                                                     className={`flex flex-col px-2`}>
                                                    <div className={`w-full flex items-center space-x-4 justify-between`}>
                                                        <div className={`w-1/4`}>
                                                            <div className={`bg-default_background w-fit p-1`}>
                                                                <p>{value.title}</p>
                                                            </div>
                                                        </div>
                                                        <DefaultInput
                                                            className={`border rounded ${isDoneClicked && !value.value ? '!border-default_red' : ''}`}
                                                            required={true}
                                                            type={value.type}
                                                            value={value.value}
                                                            onChange={value.action}
                                                        />
                                                    </div>
                                                    {
                                                        isDoneClicked && !value.value &&
                                                        <p className={`w-fit self-end text-[10px] text-default_red font-normal`}>
                                                            This field is required
                                                        </p>
                                                    }
                                                </div>

                                            ))}
                                            {!isDone && isSent &&
                                                <div className={`flex flex-col items-center justify-center *:w-full`}>
                                                    <p className={`font-semibold`}>
                                                        Check your email then enter the verification code</p>
                                                    <input
                                                        onChange={(event) => setUserCode(event.target.value)}
                                                        placeholder={"Code"}
                                                        required={true}
                                                        value={userCode}
                                                        spellCheck={`false`}
                                                        type="text"
                                                        maxLength={6}
                                                        className={`border border-black rounded py-1 px-2 appearance-none`}
                                                    />
                                                    <p className={`mt-1 text-default_red `}>Valid timer: {timer}</p>
                                                </div>
                                            }
                                            {isDone &&
                                                <div className={`flex flex-col items-center justify-center`}>
                                                    <p>{message ?? "error"}</p>
                                                </div>
                                            }
                                        </div>
                                        {/*bottom*/}
                                        <div
                                            className="flex items-center p-5 border-t border-gray-200 rounded-b justify-end">
                                            {
                                                !isDone && !isSent &&
                                                <button
                                                    onClick={handlePurchaseDoneClick}
                                                    type="button"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Order
                                                </button>
                                            }
                                            {
                                                !isDone && isSent &&
                                                <button
                                                    onClick={handleVerifyCode}
                                                    type="button"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                                    Verify
                                                </button>
                                            }
                                            <button
                                                onClick={handleOpenModal}
                                                type="button"
                                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                                                {isDone ? "Close" : "Cancel"}
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    )
        ;
};

export default ProductPage;
type SidebarADsProps = {
    products: Product[]
}
const SideBarADs = ({products}: SidebarADsProps) => {
    return (
        <div className={`col-span-2 px-2 h-auto pb-5 w-full block static`}>
            <div
                className={`rounded overflow-y-auto bg-white p-2 w-full flex flex-col text-[16px] gap-y-2 sticky top-0`}>
                {
                    products.map((value, index) => (
                        <TrendingCard product={value} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

type CarouselProps = {
    links: string[],
    // eslint-disable-next-line no-unused-vars
    action: (index: number) => void
}

const CarouselApiDemo: React.FC<CarouselProps> = ({links, action}) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className={`sticky top-20 flex flex-col  items-center h-fit pt-5`}>
            <Carousel setApi={setApi} className="relative max-w-xs ">
                <CarouselPrevious className={`-left-10`}/>
                <CarouselContent>
                    {links.map((link, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent
                                    onClick={() => action(index)}
                                    className="flex !min-h-[450px] cursor-pointer  items-center justify-center ">
                                    <img src={link} alt={"image"}/>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className={`-right-10`}/>
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                {current} of {count}
            </div>
        </div>
    )
}

type TableProps = {
    feature: Feature
}
const TableDemo: React.FC<TableProps> = ({feature}) => {
    const date = feature.madeTime
    feature.madeTime = new Date(date)
    return (
        <Table>
            <TableBody>
                {
                    feature.screen &&
                    <TableRow>
                        {/*screen*/}
                        <TableCell className="font-medium border-r">Screen</TableCell>
                        <TableCell>{feature.screen}</TableCell>
                    </TableRow>
                }
                {
                    feature.rearCamera.length>0 &&
                    <TableRow>
                        {/*rear camera*/}
                        <TableCell className="font-medium border-r">Rear camera</TableCell>
                        <TableCell>{feature.rearCamera.map(value => (
                            `${value}MP`
                        )).join('+')}</TableCell>
                    </TableRow>
                }

                {
                    feature.frontCamera.length>0 &&
                    <TableRow>
                        {/*front camera*/}
                        <TableCell className="font-medium border-r">Front camera</TableCell>
                        <TableCell>{feature.frontCamera.map(value => (
                            `${value}MP`
                        )).join('+')}</TableCell>
                    </TableRow>
                }
                <TableRow>
                    {/*ram*/}
                    <TableCell className="font-medium border-r">Ram</TableCell>
                    <TableCell>{feature.memory[0].ram}GB</TableCell>
                </TableRow>
                <TableRow>
                    {/*rom*/}
                    <TableCell className="font-medium border-r">Rom</TableCell>
                    <TableCell>{feature.memory[0].rom}GB</TableCell>
                </TableRow>
                <TableRow>
                    {/*chip*/}
                    <TableCell className="font-medium border-r">Chip</TableCell>
                    <TableCell>{feature.chip}</TableCell>
                </TableRow>
                <TableRow>
                    {/*battery*/}
                    <TableCell className="font-medium border-r">Battery</TableCell>
                    <TableCell>{feature.battery} mAh</TableCell>
                </TableRow>
                {
                    feature.os &&
                    <TableRow>
                        {/*OS*/}
                        <TableCell className="font-medium border-r">OS</TableCell>
                        <TableCell>{feature.os}</TableCell>
                    </TableRow>
                }
                <TableRow>
                    {/*Time*/}
                    <TableCell className="font-medium border-r">Time</TableCell>
                    <TableCell>T{feature.madeTime.getMonth() + 1}/{feature.madeTime.getFullYear()}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
type TrendingProps = {
    product: Product
}
const TrendingCard = ({product}: TrendingProps) => {
    return (
        <div
            className={`flex flex-col rounded-xl gap-y-2 round bg-outer_blue w-full p-2 hover:scale-105 transform duration-300`}>
            <a href={`/${product.category.name.toLowerCase()}/${product.id}`}>
                <img className={`aspect-[9/10] w-3/4 `}
                     src={product.imgs[0]} alt={"image"}/>
                <p>{product.name}</p>
                <p className={`text-default_red font-medium`}> {product.price[0].currentPrice > 0 ? product.price[0].currentPrice.toLocaleString('vi-VN') + "đ" : "Liên hệ"}</p>
                <RatingCount rating={product.rating?.average ?? 0} numSize={`text-[18px]`} startSize={`scale-90`}/>
            </a>
        </div>
    )
}
type ProductImage = {
    images: string[],
    action: () => void,
    startIndex: number
}
const ImageView: React.FC<ProductImage> = ({images, action, startIndex}) => {
    const [itemIndex, setItemIndex] = useState<number>(startIndex);
    const length = images.length
    const handlePreviousClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        const newItemIndex: number = itemIndex - 1;
        if (newItemIndex >= 0) {
            setItemIndex(newItemIndex);
        }
    }
    const handleNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        const newItemIndex: number = itemIndex + 1;
        if (newItemIndex < images.length) {
            setItemIndex(newItemIndex);
        }
    }
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }
    return (
        <div
            onClick={action}
            className={`w-screen flex items-center justify-center fixed inset-0  h-screen bg-black backdrop-blur-2xl bg-opacity-60`}>
            <div
                className={`relative top-8 overflow-hidden flex justify-center items-end w-[900px] h-[450px] rounded-xl bg-white p-4`}>
                {
                    images.map((image, index) => (
                        <div
                            onClick={e => handleModalClick(e)}
                            className={`w-[900px] top-4 absolute h-auto flex justify-center items-center`} key={index}>
                            <div
                                className={`w-full flex justify-center transition-transform duration-700 ease-in-out
                                            ${index === itemIndex
                                    ? 'translate-x-0'
                                    : index < itemIndex
                                        ? '-translate-x-full'
                                        : 'translate-x-full'
                                }`}>
                                <img src={image}
                                     className="w-fit block h-[360px] rounded object-fill "
                                     alt={"Product Image"}/>
                            </div>
                        </div>
                    ))
                }
                <p>{itemIndex+1}/{length}</p>
                <button
                    onClick={e => handlePreviousClick(e)}
                    type="button"
                    className="absolute top-1/2 start-0 z-10 flex items-center justify-center h-fit px-4 cursor-pointer group focus:outline-none">
                    <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-600  group-hover:bg-gray-500 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    onClick={e => handleNextClick(e)}
                    type="button"
                    className="absolute top-1/2 end-0 h-fit z-10 flex items-center justify-center  px-4 cursor-pointer group focus:outline-none">
                     <span
                         className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-600  group-hover:bg-gray-500 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                         <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                   d="m1 9 4-4-4-4"/>
                         </svg>
                         <span className="sr-only">Next</span>
                     </span>
                </button>
            </div>

        </div>
    )
}





