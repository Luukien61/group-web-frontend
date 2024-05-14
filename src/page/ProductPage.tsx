import React, {useEffect, useState} from 'react';
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
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/shadcn/ui/table"
import {useCurrentDeviceMem} from "@/zustand/AppState.ts";


type memoryProps = {
    ram: number,
    rom: number
}

type ColorProps = {
    color: string,
    link: string
}

type Price = {
    ram: number,
    rom: number,
    current_price: number,
    previous_price: number
}

type FeatureProps = {
    screen: string,
    rear_camera: number[],
    front_camera: number[],
    memory: memoryProps[],
    chip: string,
    battery: number,
    OS: string,
    made_time: Date,

}
type ProductProps = {
    name: string,
    price: Price[],
    imgs: string[],
    color: ColorProps[],
    features: FeatureProps,
    description: {
        title: string,
        content: string,
    }
}


const samsung_S23: ProductProps = {
    name: "Samsung S23",
    price: [
        {
            ram: 8,
            rom: 256,
            current_price: 11990000,
            previous_price: 23990000,
        },
        {
            ram: 12,
            rom: 512,
            current_price: 20990000,
            previous_price: 27990000,
        }
    ],
    color: [
        {
            color: "Purple",
            link: "https://i.pinimg.com/564x/0a/50/6a/0a506a1be9c2c4f8509fae1e78d83cc2.jpg"
        },
        {
            color: "Blue",
            link: "https://i.pinimg.com/564x/0a/50/6a/0a506a1be9c2c4f8509fae1e78d83cc2.jpg"
        },
        {
            color: "Cream",
            link: "https://i.pinimg.com/564x/0a/50/6a/0a506a1be9c2c4f8509fae1e78d83cc2.jpg"
        }
    ],
    imgs: [
        "https://i.pinimg.com/564x/6f/03/08/6f0308c41401fe0633af1e2d898182a3.jpg",
        "https://i.pinimg.com/736x/db/09/2a/db092a3fe925b8938b9118e5e419d857.jpg",
        "https://i.pinimg.com/564x/48/36/d2/4836d2a498754ec71a1e5b2251308770.jpg",
        // "https://i.pinimg.com/564x/91/b3/0c/91b30c0074e925257f89bd470be83dfe.jpg",
        // "https://i.pinimg.com/736x/04/f0/04/04f004667971a54a829c54455265dfd6.jpg"
    ],
    features: {
        screen: "6.4 inch, FHD+, Dynamic AMOLED 2X, 1080 x 2340 Pixels",
        rear_camera: [50, 12, 8],
        front_camera: [12],
        memory: [
            {
                ram: 8,
                rom: 256
            },
            {
                ram: 12,
                rom: 512
            }
        ],
        OS: "Android 14",
        battery: 5160,
        made_time: new Date(2021, 8),
        chip: "Exynos 2200"
    },
    description: {
        title: "Khám phá những công nghệ tiên tiến nhất trên thiết bị Galaxy S23 Plus, bạn sẽ có trải nghiệm toàn năng từ thiết kế bền vững, camera Mắt thần bóng đêm cao cấp, bộ vi xử lý Snapdragon 8 Gen 2 for Galaxy mạnh mẽ đến viên pin bền bỉ và màn hình lớn sắc nét. Một sự kết hợp hoàn hảo, hội tụ mọi điểm ấn tượng trên thế hệ di động thông minh 2023.",
        content: "Tuyệt tác sắc màu thiên nhiên\n" +
            "Sự kết hợp giữa sắc màu thiên nhiên và công nghệ chế tác vượt trội, viền siêu mỏng, khung kim loại bo cong sang trọng, Samsung Galaxy S23 Plus đạt chuẩn điện thoại cao cấp với nét đẹp tinh tế và cuốn hút trong từng chi tiết. Các màu sắc này còn thể hiện đúng tinh thần xanh của điện thoại Galaxy S 2023 series bao gồm: Kem Cotton, Xanh Botanic, Tím Lilac và Đen Phantom, mang tới sức sống tràn đầy cảm hứng nhưng vẫn đảm bảo tính hiện đại, sang trọng cho tổng thể.\n " +
            "Thiết kế vì hành tinh xanh\n" +
            "Xây dựng hành tinh xanh từ những thay đổi nhỏ, Samsung góp phần bảo vệ môi trường khi sử dụng linh kiện từ vật liệu tái chế cho Galaxy S23 Plus. Ngay khi mở hộp, bạn sẽ thấy sự đổi thay bởi bao bì cùng màng bảo vệ từ giấy tái chế, màu nhuộm nguồn gốc tự nhiên và  lớp phim phủ PET tái chế. Đối với lớp kính bảo vệ, Samsung sử dụng Gorilla Glass Victus 2, vừa đảm bảo sự bền bỉ, vừa bảo vệ môi trường với 22% chất liệu thủy tinh tái chế. Tất cả hòa hợp, gói gọn trong siêu phẩm cao cấp, bền vững và đáng tin cậy, khẳng định tuyên ngôn sống xanh và thân thiện với hành tinh."
    }
}
type checkboxProps = {
    target: {
        id: string,
        value: string
    }
}
const ProductPage = () => {
    const {ram, rom, setRam, setRom} = useCurrentDeviceMem()
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    let price = samsung_S23.price.find(value => value.rom === rom && value.ram === ram)

    const handleSelectedIndex = (index: number, newRam: number, newRom: number) => {
        setSelectedIndex(index)
        setRam(newRam)
        setRom(newRom)
    }

    useEffect(() => {
        price = samsung_S23.price.find(value => value.rom === rom && value.ram === ram)
    }, [ram, rom]);
    return (
        <div className={`grid w-full grid-cols-12 mt-4 mb-4`}>
            {/*main content*/}
            <div className={`col-span-10 w-full rounded bg-default_background p-5 h-fit mb-4`}>
                <div className={`w-full border-b`}>
                    <h1 className={`text-black pb-2 font-semibold`}>
                        {samsung_S23.name}
                    </h1>
                </div>
                <div className={`w-full flex flex-col`}>
                    <div className={`w-full flex`}>
                        <div className={`block w-1/2`}>
                            <CarouselDApiDemo links={samsung_S23.imgs}/>
                        </div>
                        {/*right side*/}
                        <div className={`w-1/2 flex`}>
                            <div className={`flex flex-col py-3 pl-8 w-full`}>
                                <div className={`flex gap-x-2 items-end justify-start`}>
                                    <h1 className={`text-default_red text-[32px] leading-[40px] font-[500]`}>
                                        {price?.current_price.toLocaleString('vi-VN') + 'đ'}
                                    </h1>
                                    <h1 className={`text-default_gray text-[20px] font-[400] leading-7 line-through`}>
                                        {price?.previous_price.toLocaleString('vi-VN') + 'đ'}
                                    </h1>
                                </div>
                                {/*price options*/}
                                <div className={`w-full flex flex-wrap`}>
                                    <RadioGroup className={`flex w-full py-3 text-[14px]`}>
                                        {
                                            samsung_S23.price.map((price, index) => (
                                                <div
                                                    onClick={() => handleSelectedIndex(index, price.ram, price.rom)}
                                                    className={`flex flex-col  flex-1 gap-y-1 bg-secondary_gray rounded p-1 cursor-pointer group`}>
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
                                                        {price?.current_price.toLocaleString('vi-VN') + 'đ'}
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
                                        samsung_S23.color.map((color, index) => (
                                            <div className={`flex flex-col`}>
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
                                        <TableDemo feature={samsung_S23.features}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className={`w-full border`}/>
                    {/*device description*/}
                    <div className={`pt-4 flex flex-col`}>
                        <h1 className={`self-center font-bold py-3`}>Detailed Review of the {samsung_S23.name}</h1>
                        <h2 className={`font-medium pb-4 text-justify`}>{samsung_S23.description.title}</h2>
                        <p className={`text-justify`}>{samsung_S23.description.content}</p>
                    </div>
                </div>
            </div>
            {/*side ads*/}
            <SideBarADs/>
        </div>
    );
};

export default ProductPage;

const SideBarADs = () => {
    return (
        <div className={`col-span-2 w-full block static overflow-y-visible mb-4`}>
            <div className={`mx-4 rounded overflow-y-auto bg-white p-2 w-full flex flex-col text-[16px] gap-y-2 sticky top-[140px]`}>
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
    feature: FeatureProps
}
const TableDemo: React.FC<TableProps> = ({feature}) => {

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
                    <TableCell>{feature.rear_camera.map(value => (
                        `${value}MP`
                    )).join('+')}</TableCell>
                </TableRow>
                <TableRow>
                    {/*front camera*/}
                    <TableCell className="font-medium border-r">Front camera</TableCell>
                    <TableCell>{feature.front_camera.map(value => (
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
                    <TableCell>{feature.OS}</TableCell>
                </TableRow>
                <TableRow>
                    {/*Time*/}
                    <TableCell className="font-medium border-r">Time</TableCell>
                    <TableCell>{feature.made_time.getFullYear()}/{feature.made_time.getMonth()}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const TrendingCard=()=>{
    return(
        <div className={`flex flex-col gap-y-1 round bg-default_background w-full p-2 hover:scale-105 transform duration-300`}>
            <img className={`aspect-[9/10]`}
                 src={"https://i.pinimg.com/564x/b4/88/ed/b488ed2aebddbaa17cc2192153b9ebb9.jpg"} alt={"image"} />
            <p>Xiaomi 14</p>
            <p className={`text-default_red font-medium`}>14.000.000d</p>
        </div>
    )
}



