import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel.tsx"
import Autoplay from "embla-carousel-autoplay"
import {Card, CardContent} from "@/shadcn/ui/card.tsx";
import {Link} from "react-router-dom";
export type Banner ={
    img: string,
    url: string,
    title?: string,
}

type CarouselProps = {
    imgSource: Banner[],
}

const CarouselBanner : React.FC<CarouselProps> = ({imgSource}) => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full  flex-1 "
            // onMouseEnter={plugin.current.stop}
            // onMouseLeave={plugin.current.reset}
        >
            <CarouselContent >
                {imgSource.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1 ">
                            <Card>
                                <CardContent className="flex bg-red_default rounded-[10px] h-[300px] items-center justify-center p-6">
                                    <Link to={item.url} className={`w-full`}>
                                        <img
                                            className={`h-[250px] w-full object-top rounded`}
                                            src={item.img} alt={item.title}/>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

        </Carousel>
    )
};

export default CarouselBanner;