import React, {useEffect, useState} from 'react';
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {useCategoryItem, useFilter, useLocationStore} from "@/zustand/AppState.ts";
import {laptopPrice, MenuLink, phonePrice} from "@/description/MenuLink.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {RadioGroup, RadioGroupItem} from "@/shadcn/ui/radio-group.tsx";
import {Label} from "@/shadcn/ui/label.tsx";


const SideBarFilter = () => {
        const {categoriesItem} = useCategoryItem()
        const {pathname} = useLocationStore()
        const [checkAllProducer, setCheckAllProducer] = useState<boolean>(true)
        const [checkAllPrice, setCheckAllPrice] = useState<boolean>(true)
        const [producerSort, setProducerSort] = useState<string[]>([]);
        const [producers, setProducers] = useState<string[]>([]);
        const [priceSort, setPriceSort] = useState<number[]>([]);
        const {setProductFilter, setPriceFilter} = useFilter()
        useEffect(() => {
            const getAllProducer = () => {
                const category = categoriesItem.find(value =>
                    value.name.toLowerCase() === pathname.toLowerCase())
                const producer = category?.producers.map(value => value.name)
                // @ts-ignore
                setProducers(producer)
            }
            getAllProducer()
        }, [pathname]);
        let priceItems : MenuLink[]
        switch (pathname) {
            case "phone" : {
                priceItems = phonePrice
                break
            }
            case "laptop" : {
                priceItems = laptopPrice
                break
            }
        }
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
        const handlePriceFilter = ( index: string) => {
            if(index==="all"){
                setPriceSort([])
                setCheckAllPrice(true)
            }else {
                const price= priceItems[parseInt(index)].key
                setPriceSort(price)
                setCheckAllPrice(false)
            }
        }
        useEffect(() => {
            setProductFilter(producerSort)
            setPriceFilter(priceSort)
        }, [producerSort, priceSort]);
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
                                    priceItems?.map((value, index1) => (
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className={`text-default_red rounded-sm`} value={index1.toString()} />
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