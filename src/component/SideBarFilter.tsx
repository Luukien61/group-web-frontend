import React, {useMemo, useRef, useState} from 'react';
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {useLocationStore} from "@/zustand/AppState.ts";
import {laptopPrice, laptopProducer, links, phonePrice, PhoneProducer} from "@/description/MenuLink.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";


const SideBarFilter = () => {
    const {pathname} = useLocationStore()
    const [checkAllProducer, setCheckAllProducer] = useState<boolean>(true)
    const checkAllProducers = useRef<boolean>(true)
    const [checkAllPrice, setCheckAllPrice] = useState<boolean>(true)
    const [checkAllProduct, setCheckAllProduct] = useState<boolean>(true)
    const [producerSort, setProducerSort] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<string[]>([]);
    const [trendingSort, setTrendingSort] = useState<string[]>([])

    let priceItems
    let producerItems
    switch (pathname) {
        case "phone" : {
            producerItems=PhoneProducer
            priceItems = phonePrice
            break
        }
        case "laptop" : {
            producerItems=laptopProducer
            priceItems = laptopPrice
            break
        }
    }
    const handleItemCheck = (checkedState: CheckedState, filter: string, value: string) => {
        if (checkedState) {
            switch (filter) {
                case 'producer': {
                    if (value == "all") {
                        setProducerSort([])
                        setCheckAllProducer(true)
                    } else {
                        setProducerSort([...producerSort, value.toLowerCase()])
                        setCheckAllProducer(false)
                    }
                    break
                }
                case 'price' : {
                    if (value == "all") {
                        setPriceSort([])
                        setCheckAllPrice(true)
                    } else {
                        setPriceSort([...priceSort, value.toLowerCase()])
                        setCheckAllPrice(false)
                    }
                    break
                }
                case 'trending' : {
                    if (value == "all") {
                        setTrendingSort([])
                        setCheckAllProduct(true)
                    } else {
                        setTrendingSort([...trendingSort, value.toLowerCase()])
                        setCheckAllProduct(false)
                    }
                    break
                }
            }

        } else {
            switch (filter) {
                case 'Producer': {
                    const newFilter = producerSort.filter(value1 => value1 !== value.toLowerCase())
                    setProducerSort(newFilter)
                    if (newFilter.length === 0) {
                        setCheckAllProducer(true)
                    }
                    break
                }
                case 'Price' : {
                    const newFilter = priceSort.filter(value1 => value1 !== value.toLowerCase())
                    setPriceSort(newFilter)
                    if (newFilter.length === 0) {
                        setCheckAllPrice(true)
                    }
                    break
                }
                case 'Trending' : {
                    const newFilter = trendingSort.filter(value1 => value1 !== value.toLowerCase())
                    setTrendingSort(newFilter)
                    if (newFilter.length === 0) {
                        setCheckAllProduct(true)
                    }
                    break
                }
            }
        }
    }
    return (
        <aside className={`lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:block col-span-2`}>
            <div
                className=" flex-col items-start sticky bg-default_background overflow-y-auto z-20 scrolling-touch h-[calc(100vh-3rem)] block top-12 mr-0">
                {/*Producer*/}
                <div
                    className="flex flex-col py-2 px-2 items-start space-x-2"
                >
                    <h1 className={`font-semibold py-2`}>
                        Producer
                    </h1>
                    <div className={`flex w-full items-start flex-wrap `}>
                        <div key={0}
                             className={`flex w-1/2 py-2  `}
                        >
                            <Checkbox
                                onCheckedChange={(checked) => handleItemCheck(checked, "producer", 'all')}
                                id="terms2"
                                className={`data-[state=checked]:bg-red_default  data-[state=checked]:text-white data-[state=checked]:border-none`}
                                checked={checkAllProducer}/>
                            <label
                                htmlFor="terms2"
                                className="px-2 font-[14px] text-[14px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                All
                            </label>
                        </div>
                        {
                            producerItems?.map((value, index1) => (
                                <div key={index1 + 1}
                                     className={`flex w-1/2 py-2  `}
                                >
                                    <Checkbox
                                        id="terms2"
                                        onCheckedChange={(checked) => handleItemCheck(checked, "producer", value.name)}
                                        className={' data-[state=checked]:bg-red_default data-[state=checked]:text-white data-[state=checked]:border-none'}/>
                                    <label
                                        htmlFor="terms2"
                                        className="px-2 font-[14px] text-[14px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {value.name}
                                    </label>
                                </div>
                            ))
                        }
                    </div>

                </div>
                {/*Price*/}
                <div
                    className="flex flex-col py-2 px-2 items-start space-x-2"
                >
                    <h1 className={`font-semibold py-2`}>
                        Price
                    </h1>
                    <div className={`flex w-full items-start flex-wrap `}>
                        <div key={0}
                             className={`flex w-full py-2  `}
                        >
                            <Checkbox
                                onCheckedChange={(checked) => handleItemCheck(checked, "price", 'all')}
                                id="terms2"
                                className={'data-[state=checked]:bg-red_default  data-[state=checked]:text-white data-[state=checked]:border-none'}
                                checked={checkAllPrice}/>
                            <label
                                htmlFor="terms2"
                                className="px-2 font-[14px] text-[14px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                All
                            </label>
                        </div>
                        {
                            priceItems?.map((value, index1) => (
                                <div key={index1 + 1}
                                     className={`flex w-full py-2  `}
                                >
                                    <Checkbox
                                        id="terms2"
                                        onCheckedChange={(checked) => handleItemCheck(checked, "price", value.name)}
                                        className={' data-[state=checked]:bg-red_default data-[state=checked]:text-white data-[state=checked]:border-none'}/>
                                    <label
                                        htmlFor="terms2"
                                        className="px-2 font-[14px] text-[14px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {value.name}
                                    </label>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </aside>
    );
};

export default SideBarFilter;