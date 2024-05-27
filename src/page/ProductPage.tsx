import React, {useCallback, useEffect, useState} from 'react';
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
import {useCurrentDeviceMem} from "@/zustand/AppState.ts";
import {useLocation} from "react-router-dom";
import {getProductById} from "@/axios/Request.ts";
import {Feature, Product} from "@/component/CategoryCard.tsx";
import Input, {DefaultInput} from "@/component/Input.tsx";

type Price = {
    ram: number,
    rom: number,
    current_price: number,
    previous_price: number
}
type OrderProp = {
    title: string,
    value: string,
    type: "text" | "number",
    action: (event: React.ChangeEvent<HTMLInputElement>) => void

}

const ProductPage = () => {
    const {ram, rom, setRam, setRom} = useCurrentDeviceMem()
    const [isDoneClicked, setIsDoneClicked] = useState<boolean>(false)
    const [fullName, setFullName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const deviceId = useLocation().pathname.slice(1).split("/")[1]
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [product, setProduct] = useState<Product>()
    const [isDone, setIsDone] = useState<boolean>(false)
    const handleSelectedIndex = (index: number, newRam: number, newRom: number) => {
        setSelectedIndex(index)
        setRam(newRam)
        setRom(newRom)
    }
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
        fetchProduct()
    }, [deviceId]);

    const handleOpenModal = useCallback(() => {
        setOpenModal((pre) => !pre)
    }, [])
    const handleCloseModel = useCallback(() => {
        setOpenModal(false);
    }, [])
    const handleModalClicks = useCallback((event: React.MouseEvent) => {
        event.stopPropagation()
    }, [])

    const handlePurchaseDoneClick = () => {
        setIsDoneClicked(true)
        if (fullName !== "" && phone !== "" && address !== "") {
            setIsDone(true)
        }
    }

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            setAddress("")
            setPhone("")
            setFullName("")
            setIsDone(false)
            setIsDoneClicked(false)
        }
    }, [openModal]);

    return (
        product && (
            <>
                <div
                    className={`w-full relative`}>
                    <div className={`relative grid w-full grid-cols-12 mt-4 mb-4`}>
                        {/*main content*/}
                        <div className={`col-span-10 w-full rounded bg-default_background p-5 h-fit mb-4`}>
                            <div className={`w-full border-b`}>
                                <h1 className={`text-black pb-2 font-semibold`}>
                                    {product.name}
                                </h1>
                            </div>
                            <div className={`w-full flex flex-col`}>
                                <div className={`w-full flex`}>
                                    <div className={`block w-1/2`}>
                                        <CarouselDApiDemo links={product.imgs}/>
                                    </div>
                                    {/*right side*/}
                                    <div className={`w-1/2 flex`}>
                                        <div className={`flex flex-col py-3 pl-8 w-full`}>
                                            <div className={`flex gap-x-2 items-end justify-start`}>
                                                <h1 className={`text-default_red text-[32px] leading-[40px] font-[500]`}>
                                                    {product.price[0].currentPrice.toLocaleString('vi-VN') + 'đ'}
                                                </h1>
                                                <h1 className={`text-default_gray text-[20px] font-[400] leading-7 line-through`}>
                                                    {product.price[0].previousPrice.toLocaleString('vi-VN') + 'đ'}
                                                </h1>
                                            </div>
                                            {/*price options*/}
                                            <div className={`w-full flex flex-wrap`}>
                                                <RadioGroup className={`flex w-full py-3 text-[14px]`}>
                                                    {
                                                        product.price.map((price, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => handleSelectedIndex(index, price.ram, price.rom)}
                                                                className={`flex flex-col flex-1 gap-y-1 bg-secondary_gray rounded p-1 cursor-pointer group`}>
                                                                <div className={`flex justify-center gap-x-1 w-auto`}>
                                                                    <RadioGroupItem
                                                                        className={`text-default_red border-default_red`}
                                                                        value={`ram=${price.ram}&rom=${price.rom}`}
                                                                        id={index.toString()}
                                                                        checked={selectedIndex === index}
                                                                    />
                                                                    <Label className={`text-[14px]`}
                                                                           htmlFor={index.toString()}>{price.rom}GB</Label>
                                                                </div>
                                                                <h1 className={`self-center`}>
                                                                    {product.price[0].currentPrice.toLocaleString('vi-VN') + 'đ'}
                                                                </h1>
                                                            </div>
                                                        ))
                                                    }
                                                </RadioGroup>
                                            </div>
                                            {/*color*/}
                                            <div
                                                className={`flex flex-wrap gap-x-1 pt-3 `}>
                                                {
                                                    product.color.map((color, index) => (
                                                        <div key={index} className={`flex flex-col`}>
                                                            <img className={`aspect-square w-[50px]`} src={color.link}
                                                                 alt={index.toString()}/>
                                                            <h3 className={`text-[15px] self-center`}>
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
                                                className={`w-full h-[64px] bg-default_blue rounded flex justify-center items-center hover:bg-blue_other cursor-pointer`}>
                                                <p className={`text-white font-medium`}>Purchase</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className={`w-full border`}/>
                                {/*device description*/}
                                <div className={`pt-4 flex flex-col`}>
                                    <h1 className={`self-center font-bold py-3`}>Detailed Review of
                                        the {product.name}</h1>
                                    <h2 className={`font-medium pb-4 text-justify`}>{product.description.title}</h2>
                                    <p className={`text-justify`}>{product.description.content}</p>
                                </div>
                            </div>
                        </div>
                        {/*side ads*/}
                        <SideBarADs/>
                    </div>
                    {/*fixed button*/}
                    <div
                        onClick={handleOpenModal}
                        className={`fixed cursor-pointer hover:scale-110 duration-300 rounded bg-default_red w-fit h-fit p-2 right-5 bottom-5`}>
                        <p className={`text-white  font-medium`}>Purchase</p>
                    </div>
                    {/*model*/}
                </div>
                <div onClick={handleCloseModel}
                     id="default-modal"
                     className={`backdrop-blur-sm bg-black bg-opacity-60 flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full max-h-full ${openModal ? "block" : "hidden"}`}>
                    <div onClick={event => handleModalClicks(event)}
                         className="relative p-4 w-full max-w-[40%] max-h-full">
                        {/* modal */}
                        <div
                            className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div
                                className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Order Information
                                </h3>
                                <button
                                    onClick={handleOpenModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
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
                                {
                                    !isDone ?
                                        orderInfor.map((value, index) => (
                                            <div key={index}
                                                 className={`flex flex-col px-2`}>
                                                <div className={`w-full flex items-center space-x-4 justify-between`}>
                                                    <div className={`w-1/4`}>
                                                        <div className={`bg-default_background w-fit p-1`}>
                                                            <p>{value.title}</p>
                                                        </div>
                                                    </div>
                                                    <DefaultInput
                                                        className={`${isDoneClicked && !value.value ? 'border rounded !border-default_red' : ''}`}
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

                                        ))
                                        : <div className={`flex flex-col items-center justify-center`}>
                                            <p>Order successfully!</p>
                                            <p>Your order is being processed.</p>
                                        </div>
                                }
                            </div>
                            {/*bottom*/}
                            <div
                                className="flex items-center p-5 border-t border-gray-200 rounded-b justify-end">
                                {
                                    !isDone &&
                                    <button
                                        onClick={handlePurchaseDoneClick}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Done
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
                    </div>
                </div>
            </>
        )
    )
        ;
};

export default ProductPage;

const SideBarADs = () => {
    return (
        <div className={`col-span-2 w-full block static overflow-y-visible mb-4`}>
            <div
                className={`mx-4 rounded overflow-y-auto bg-white p-2 w-full flex flex-col text-[16px] gap-y-2 sticky top-[140px]`}>
                <TrendingCard/>
                <TrendingCard/>
                <TrendingCard/>
                <TrendingCard/>
                <TrendingCard/>
            </div>
        </div>
    )
}

type CarouselProps = {
    links: string[]
}

const CarouselDApiDemo: React.FC<CarouselProps> = ({links}) => {
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
        <div className={`sticky top-20 flex flex-col items-center h-fit pt-5`}>
            <Carousel setApi={setApi} className=" max-w-xs">
                <CarouselPrevious/>
                <CarouselContent>
                    {links.map((link, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="flex items-center justify-center ">
                                    <img src={link} alt={"image"}/>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext/>
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
    console.log("Feature=", feature)
    const {ram, rom} = useCurrentDeviceMem()
    return (
        <Table>
            <TableBody>
                <TableRow>
                    {/*screen*/}
                    <TableCell className="font-medium border-r">Screen</TableCell>
                    <TableCell>{feature.screen}</TableCell>
                </TableRow>
                <TableRow>
                    {/*rear camera*/}
                    <TableCell className="font-medium border-r">Rear camera</TableCell>
                    <TableCell>{feature.rearCamera.map(value => (
                        `${value}MP`
                    )).join('+')}</TableCell>
                </TableRow>
                <TableRow>
                    {/*front camera*/}
                    <TableCell className="font-medium border-r">Front camera</TableCell>
                    <TableCell>{feature.frontCamera.map(value => (
                        `${value}MP`
                    )).join('+')}</TableCell>
                </TableRow>
                <TableRow>
                    {/*ram*/}
                    <TableCell className="font-medium border-r">Ram</TableCell>
                    <TableCell>{ram}GB</TableCell>
                </TableRow>
                <TableRow>
                    {/*rom*/}
                    <TableCell className="font-medium border-r">Rom</TableCell>
                    <TableCell>{rom}GB</TableCell>
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
                <TableRow>
                    {/*OS*/}
                    <TableCell className="font-medium border-r">OS</TableCell>
                    <TableCell>{feature.os}</TableCell>
                </TableRow>
                <TableRow>
                    {/*Time*/}
                    <TableCell className="font-medium border-r">Time</TableCell>
                    <TableCell>T{feature.madeTime.getMonth()}/{feature.madeTime.getFullYear()}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const TrendingCard = () => {
    return (
        <div
            className={`flex flex-col gap-y-1 round bg-default_background w-full p-2 hover:scale-105 transform duration-300`}>
            <img className={`aspect-[9/10]`}
                 src={"https://i.pinimg.com/564x/b4/88/ed/b488ed2aebddbaa17cc2192153b9ebb9.jpg"} alt={"image"}/>
            <p>Xiaomi 14</p>
            <p className={`text-default_red font-medium`}>14.000.000d</p>
        </div>
    )
}

const ModelPurchase = () => {
    return (
        <div id="default-modal" aria-hidden="true"
             className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                        </h3>
                        <button type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for
                            its citizens, companies around the world are updating their terms of service agreements to
                            comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
                            25 and is meant to ensure a common set of data rights in the European Union. It requires
                            organizations to notify users as soon as possible of high-risk data breaches that could
                            personally affect them.
                        </p>
                    </div>

                    <div
                        className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="default-modal" type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
                            accept
                        </button>
                        <button data-modal-hide="default-modal" type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



