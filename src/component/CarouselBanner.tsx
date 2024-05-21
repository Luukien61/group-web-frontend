import React from 'react';
import {Carousel, CarouselContent, CarouselItem,} from "@/shadcn/ui/carousel.tsx"
import Autoplay from "embla-carousel-autoplay"
import {Card, CardContent} from "@/shadcn/ui/card.tsx";
import {Link} from "react-router-dom";

export type Banner ={
    id?: number|string,
    imageUrl: string,
    targetUrl: string,
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
            className="w-full  flex-1 bg-transparent"
            // onMouseEnter={plugin.current.stop}
            // onMouseLeave={plugin.current.reset}
        >
            <CarouselContent >
                {imgSource.map((item, index) => (
                    <CarouselItem key={index} >
                        <div className="w-full">
                            <Card>
                                <CardContent className="!p-0  rounded-2xl h-[300px] items-center justify-center">
                                    <Link to={item.targetUrl} className={`w-full`}>
                                        <img
                                            className={`h-full w-full object-fill rounded`}
                                            src={item.imageUrl} alt={item.title}/>
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