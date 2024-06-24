import React, {useEffect, useRef, useState} from 'react';
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {useFilter} from "@/zustand/AppState.ts";
import {MenuLink, phonePrice} from "@/description/MenuLink.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Label} from "@/shadcn/ui/label.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {getProducersByCategory} from "@/axios/Request.ts";
import {Producer} from "@/component/CategoryCard.tsx";


const SideBarFilter = () => {
        const path = useLocation().pathname.slice(1).split("/")[0]
        const search = useLocation().search
        const navigate = useNavigate()
        const [producerChecked, setProducerChecked] = useState<string[]>([])
        const [checkAllProducer, setCheckAllProducer] = useState<boolean>(true)
        const [producerSort, setProducerSort] = useState<string[]>([]);
        const [producersName, setProducersName] = useState<string[]>([]);
        const [priceSort, setPriceSort] = useState<number[]>([]);
        const {producerFilter, setProducerFilter, setPriceFilter} = useFilter()
        useEffect(() => {
            switch (path) {
                case "phone" : {
                    priceItemsRef.current = phonePrice;
                    break;
                }
                case "laptop" : {
                    priceItemsRef.current = phonePrice;
                    break;
                }
                default: {
                    priceItemsRef.current = phonePrice;
                }
            }
            getProducers(path)
        }, [path]);
        const getProducers = async (category: string) => {
            const producers: Producer[] = await getProducersByCategory(category)
            const producerNames = producers.map((value) => value.name)
            producerNames.sort((a, b) => a.localeCompare(b))
            setProducersName(producerNames)
        }
        const priceItemsRef = useRef<MenuLink[]>([]);
        const handleItemCheck = (checkedState: CheckedState, value: string) => {
            if (checkedState) {
                if (value == "all") {
                    setProducerSort([])
                    setProducerFilter([])
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
                setPriceSort(price)
            }
        }

        const arraysEqual=(a: number[], b: number[]): boolean =>{
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        }

        useEffect(() => {
            const newProductFilter = [...producerSort, ...producerFilter]
            setProducerFilter(newProductFilter)
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
                const minPrice = `min-price=${priceSort[0]}`
                param.push(minPrice)
                if (priceSort.length > 1) {
                    const maxPrice = `max-price=${priceSort[1]}`
                    param.push(maxPrice)
                }
            }
            return `?${param.join("&")}`
        }
        useEffect(() => {
            const params = search.slice(1).split("&")
            const producersParam = params.filter((value) => value.includes("producer"))
            const priceParams = params.filter((value) => value.includes("price"))
            if (producersParam.length > 0) {
                const producerList = producersParam[0]
                const equalIndex = producerList.indexOf("=")
                const producers = producerList.slice(equalIndex + 1).split(",")
                setProducerChecked(producers)
                setProducerFilter(producers)
                setProducerSort(producers)
                setCheckAllProducer(false)
            }
            if (priceParams.length > 0) {
                //[min-price=2000000', 'max-price=4000000]
                const priceFilter = priceParams.map((value) => parseInt(value.split("=")[1]))
                setPriceFilter(priceFilter)
                setPriceSort(priceFilter)
            }
        }, [search]);
        return (
            <aside className={` overflow-y-visible pt-0 block col-span-2`}>
                <div
                    className="flex-col items-start sticky bg-default_background overflow-y-auto z-20 scrolling-touch  block top-24 mr-0">
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
                                producersName?.map((value, index1) => (
                                    <div key={index1 + 1}
                                         className={`flex w-1/2 py-2  `}
                                    >
                                        <Checkbox
                                            checked={!checkAllProducer && producerChecked.includes(value.toLowerCase())}
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
                            <RadioGroup
                                onValueChange={value => handlePriceFilter(value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        checked={priceSort.length === 0}
                                        className={`text-default_red rounded-sm`}
                                        value="all"/>
                                    <Label className={`px-2 text-[14px] font-normal`}>All</Label>
                                </div>
                                {
                                    priceItemsRef.current.map((value, index1) => (
                                        <div key={index1} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                checked={arraysEqual(priceSort, value.key)}
                                                className={`text-default_red rounded-sm`}
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