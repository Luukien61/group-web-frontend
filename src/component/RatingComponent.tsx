import React, {useEffect, useState} from 'react';
import {Product, Rating} from "@/component/CategoryCard.tsx";
import {ratingProduct} from "@/axios/Request.ts";

type RatingStarts = {
    value: number,
    description: string;
    proportion: number;
}
const ratingStart: RatingStarts[] = [
    {
        value: 1,
        description: "Bad",
        proportion: 0
    },
    {
        value: 2,
        description: "Quite bad",
        proportion: 0
    },
    {
        value: 3,
        description: "Average",
        proportion: 0
    },
    {
        value: 4,
        description: "Good",
        proportion: 0
    },
    {
        value: 5,
        description: "Excellent",
        proportion: 0
    }
]
type RatingProps = {
    productRating: Rating,
    productId: string
}

const RatingComponent: React.FC<RatingProps> = ({productRating, productId}) => {
    const [ratingPick, setRatingPick] = useState<number>(-1)
    const [email, setEmail] = useState<string>('')
    const [rating, setRating] = useState<number>(productRating.average)
    const [totalRating, setTotalRating] = useState<number>(0)
    const [ratingInstance, setRatingInstance] = useState<RatingStarts[]>(ratingStart)
    const [newProductRating, setNewProductRating] = useState<Rating>(productRating)

    useEffect(() => {
        const total = newProductRating.oneStart + newProductRating.twoStarts + newProductRating.threeStarts + newProductRating.fourStarts + newProductRating.fiveStarts;
        setTotalRating(total)
        setRating(newProductRating.average)
        ratingStart[0].proportion = Math.floor((newProductRating.oneStart / total) * 100)
        ratingStart[1].proportion = Math.floor((newProductRating.twoStarts / total) * 100)
        ratingStart[2].proportion = Math.floor((newProductRating.threeStarts / total) * 100)
        ratingStart[3].proportion = Math.floor((newProductRating.fourStarts / total) * 100)
        ratingStart[4].proportion = Math.floor((newProductRating.fiveStarts / total) * 100)
        setRatingInstance(ratingStart)

    }, [newProductRating])
    const handleRating = (value: number) => {
        setRatingPick(value)
    }
    const handleSendRating = async () => {
        const newProduct: Product = await ratingProduct(productId, ratingPick)
        if (newProduct.rating) {
            setNewProductRating(newProduct.rating)
            setEmail('')
        }
    }

    return (
        <div className={`flex w-full`}>
            <div className={`w-1/2 flex flex-col max-w-[400px] `}>
                <div className={`flex gap-x-4 items-center`}>
                    <p className={`text-yellow_start text-[28px] font-semibold`}>{rating}</p>
                    <div className={`flex gap-x-2`}>
                        {
                            [...Array(5)].map((_, i) =>
                                <i key={i}
                                   className={`scale-125 image-rating ${rating - i - 1 >= 0 ? 'iconcmt-allstar' : (rating - i > 0 && rating - 1 - i < 1) ? 'iconcmt-allhalfstar' : 'iconcmt-allunstar'}`}></i>
                            )
                        }
                    </div>
                    <p className={`text-blue-500 text-[16px]`}>{totalRating} ratings</p>
                </div>
                <div className={`flex flex-col`}>
                    {ratingInstance.map((item, index) => (
                        <div key={index}
                             className={`flex items-center gap-x-2`}>
                            <p>{index + 1}</p>
                            <i className={`scale-125 image-rating iconcmt-blackstar `}></i>
                            <div className={`w-full max-w-[256px] rounded h-1 bg-gray-300`}>
                                <div
                                    style={{width: `${item.proportion}%`}}
                                    className={`h-full bg-yellow_start rounded`}></div>
                            </div>
                        </div>))}
                </div>

            </div>
            <div className={`bg-white w-1/2 flex py-3 px-3`}>
                <div className={`flex flex-col px-4 h-full justify-evenly`}>
                    <div className={`flex w-full justify-center`}>
                        <p>Rate product</p>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <img
                            className={`h-[100px]`}
                            src={'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png'}
                            alt={'product images'}/>
                    </div>
                </div>
                <div className={`flex flex-col w-full`}>
                    <div className={`flex h-1/2 justify-center py-3`}>
                        <div className={`flex gap-x-7`}>
                            {
                                ratingStart.map((item, index) =>
                                    <div
                                        key={index}
                                        onClick={() => handleRating(item.value)}
                                        className={`flex flex-col items-center gap-y-1 cursor-pointer`}>
                                        <i className={`scale-150 image-rating ${item.value <= ratingPick ? 'iconcmt-allstar' : 'iconcmt-allunstar'}`}></i>
                                        <p className={`text-[14px]`}>{item.description}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={`flex h-1/2 justify-evenly items-center`}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={'Email'}
                            type={'text'}
                            className={`rounded px-3 py-1 outline-none border-gray-400 placeholder:italic border`}
                        />
                        <button
                            disabled={email == ''}
                            onClick={handleSendRating}
                            className={`bg-blue-500 rounded text-white py-1 border-blue-600 px-2 ${email != '' ? 'hover:bg-white hover:text-blue-600 border' : 'bg-gray-300'}`}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingComponent;