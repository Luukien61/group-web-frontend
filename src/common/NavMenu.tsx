import React, {useEffect, useState} from 'react';
import {price} from "../description/MenuLink.tsx";
import {RiArrowDropDownLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import {useCategory, useCategoryItem, useFilter} from "@/zustand/AppState.ts";
import {getCategories} from "@/axios/Request.ts";

export type Producer = {
    id: number,
    name: string
}
export type Category = {
    "id": number,
    "name": string,
    "producers": Producer[]
}
type ProducerFilterProps = {
    producer: string,
    category: string
}

type PriceFilterProps = {
    category: string,
    priceRange: number[]
}

const NavMenu = () => {
    const [category, setCategory] = useState<Category[]>([])
    const {setCategories} = useCategory()
    const {setCategoriesItem} = useCategoryItem()
    const {setProducerFilter, setPriceFilter} = useFilter()
    // useNavigate();
    useEffect(() => {
        const fetchCategory = async () => {
            const category: Category[] = await getCategories();
            setCategory(category)
            setCategoriesItem(category)
            const categoryLower: string[] = []
            category.map(item => {
                categoryLower.push(item.name.toLowerCase())
            })
            setCategories(categoryLower)
        }
        fetchCategory()
    }, []);
    const handleProducerFilter = ({producer}: ProducerFilterProps) => {
        producer = producer.toLowerCase();
        const listProducer = [producer]
        setProducerFilter(listProducer)
    }

    const handlePriceFilter = (price: PriceFilterProps) => {
        setPriceFilter(price.priceRange)
    }
    return (
        <ul className="bg-secondary flex gap-x-5 px-7 h-10 items-center justify-start drop-shadow">
            {
                category.map((category, index) => (
                    <div key={index}
                         className=" flex flex-col gap-y-1 group cursor-pointer ">
                        <a href={`/${category.name.toLowerCase()}/filter`}>
                            <h1 className="flex gap-1 items-center text-[16px] font-semibold text-white group-hover:text-default_green">
                                {category.name}
                                <RiArrowDropDownLine size={24}
                                                     className="group-hover:rotate-180 transform duration-300"/>
                            </h1>
                        </a>
                        <div className="hidden group-hover:block absolute top-6 hover:block">
                            <div className="py-3">
                                <div className="w-6 h-6 left-3 absolute mt-1 bg-default_background rotate-45"></div>
                                <div
                                    className="bg-default_background p-5 grid grid-cols-3 gap-10 px-4 mt-2 cursor-default">
                                    <div className="flex flex-col gap-3">
                                        <h1 className="font-semibold items-start ">
                                            Producer
                                        </h1>
                                        {
                                            category.producers
                                                .sort((a, b) => a.name.localeCompare(b.name))
                                                .map((producer, sublinkIndex) => (
                                                    <a onClick={() => handleProducerFilter({
                                                        producer: producer.name,
                                                        category: category.name
                                                    })}
                                                       key={sublinkIndex}
                                                       href={`/${category.name.toLowerCase()}/filter?producer=${producer.name.toLowerCase()}`}
                                                       className="cursor-pointer hover:text-default_green">
                                                        {producer.name}
                                                    </a>
                                                    // <div
                                                    //     onClick={()=>handleProducerFilter({producer: producer.name, category: category.name})}
                                                    //     className="cursor-pointer hover:text-default_green bg-inherit outline-none ring-0"
                                                    //     key={sublinkIndex}>
                                                    //     <p>{producer.name}</p>
                                                    // </div>
                                                ))
                                        }
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h1 className="font-semibold items-start ">
                                            {price.Head}
                                        </h1>
                                        {
                                            price.sublink.map((price, sublinkIndex) => (
                                                <a key={sublinkIndex}
                                                   onClick={() => handlePriceFilter({
                                                       category: category.name,
                                                       priceRange: price.key
                                                   })}
                                                   href={`/${category.name.toLowerCase()}/filter?&min-price=${price.key[0]}${price.key[1] != undefined ? `&max-price=${price.key[1]}` : ''}`}
                                                   className="cursor-pointer hover:text-default_green">
                                                    {price.name}
                                                </a>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </ul>
    );
};

export default NavMenu;