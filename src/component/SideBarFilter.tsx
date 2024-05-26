import React, {useEffect, useRef, useState} from 'react';
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {useCategoryItem, useFilter, useLocationStore} from "@/zustand/AppState.ts";
import {laptopPrice, MenuLink, phonePrice} from "@/description/MenuLink.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Label} from "@/shadcn/ui/label.tsx";
import {useLocation, useNavigate} from "react-router-dom";


const SideBarFilter = () => {
        const {categoriesItem} = useCategoryItem()
        const {pathname} = useLocationStore()
        const search = useLocation().search
        const navigate = useNavigate()
        const [producerChecked, setProducerChecked] = useState<string[]>([])
        const [checkAllProducer, setCheckAllProducer] = useState<boolean>(true)
        const [producerSort, setProducerSort] = useState<string[]>([]);
        const [producers, setProducers] = useState<string[]>([]);
        const [priceSort, setPriceSort] = useState<number[]>([]);
        const {setProductFilter, setPriceFilter} = useFilter()
        useEffect(() => {
            const getAllProducer = () => {
                const category = categoriesItem.find(value =>
                    value.name.toLowerCase() === pathname.toLowerCase())
                const producer = category?.producers.map(value => value.name)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setProducers(producer)
            }
            getAllProducer()
        }, [pathname]);
        const priceItemsRef = useRef<MenuLink[]>([]);
        useEffect(() => {
            switch (pathname) {
                case "phone" : {
                    priceItemsRef.current = phonePrice;
                    break;
                }
                case "laptop" : {
                    priceItemsRef.current = laptopPrice;
                    break;
                }
            }
        }, [pathname]);
        const handleItemCheck = (checkedState: CheckedState, value: string) => {
            if (checkedState) {
                if (value == "all") {
                    setProducerSort([])
                    setCheckAllProducer(true)
                } else {
                    setProducerSort([...producerSort, value.toLowerCase()])
                    setCheckAllProducer(false)
                }
            } else {
                const newFilter = producerSort.filter(value1 => value1 !== value.toLowerCase())
                setProducerSort(newFilter)
                if (newFilter.length === 0) {
                    setCheckAllProducer(true)
                }
            }
        }
        const handlePriceFilter = (index: string) => {
            if (index === "all") {
                setPriceSort([])
            } else {
                const price = priceItemsRef.current[parseInt(index)].key
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setPriceSort(price)
            }
        }
        useEffect(() => {
            setProductFilter(producerSort)
            setPriceFilter(priceSort)
            const params = handleParams()
            navigate(`${params}`)
        }, [producerSort, priceSort]);
        const handleParams = () => {
            const param: string[] = []
            if (producerSort.length > 0) {
                const producerParam = `producer=${producerSort.join(',')}`
                param.push(producerParam)
            }
            if (priceSort.length > 0) {
                const minPrice = `minPrice=${priceSort[0]}`
                param.push(minPrice)
                if (priceSort.length > 1) {
                    const maxPrice = `maxPrice=${priceSort[1]}`
                    param.push(maxPrice)
                }
            }
            return `?${param.join("&")}`
        }
        useEffect(() => {
            const params = search.slice(1).split("&")
            const producers = params.filter((value) => value.includes("producer"))
            if (producers.length > 0) {

            }
            console.log(params)
        }, [search]);
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
                                    onCheckedChange={(checked) => handleItemCheck(checked, 'all')}
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
                                producers?.map((value, index1) => (
                                    <div key={index1 + 1}
                                         className={`flex w-1/2 py-2  `}
                                    >
                                        <Checkbox
                                            onCheckedChange={(checked) => handleItemCheck(checked, value)}
                                            className={' data-[state=checked]:bg-red_default data-[state=checked]:text-white data-[state=checked]:border-none'}/>
                                        <label
                                            className="px-2 font-[14px] text-[14px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {value}
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
                            <RadioGroup onValueChange={value => handlePriceFilter(value)} defaultValue="all">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem className={`text-default_red rounded-sm`} value="all"/>
                                    <Label className={`px-2 text-[14px] font-normal`}>All</Label>
                                </div>
                                {

                                    priceItemsRef.current.map((value, index1) => (
                                        <div key={index1} className="flex items-center space-x-2">
                                            <RadioGroupItem className={`text-default_red rounded-sm`}
                                                            value={index1.toString()}/>
                                            <Label className={`px-2 font-normal text-[16px]`}>{value.name}</Label>
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
;

export default SideBarFilter;