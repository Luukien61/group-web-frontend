export type MenuLink = {
    name: string;
    link: string;
    key: number[]
}
export const phonePrice: MenuLink[] = [
    {name: "Below 2tr", link: "/", key: [0, 2]},
    {name: "From 2tr to 4tr", link: "/", key: [2, 4]},
    {name: "From 4tr to 10tr", link: "/", key: [4, 10]},
    {name: "From 10tr to 15tr", link: "/", key: [10, 15]},
    {name: "Above 15tr", link: "/", key: [15]},
]

export const laptopPrice: MenuLink[] = [
    {name: "Below 6tr", link: "/", key: [0, 6]},
    {name: "From 6tr to 10tr", link: "/", key: [6, 10]},
    {name: "From 10tr to 15tr", link: "/", key: [10, 15]},
    {name: "From 15tr to 20tr", link: "/", key: [15, 20]},
    {name: "Above 20tr", link: "/", key: [20]},
]


export const price = {
    Head: "Price",
    sublink: [
        {name: "Below 2tr", link: "/", key: [0, 2]},
        {name: "From 2tr to 4tr", link: "/", key: [2, 4]},
        {name: "From 4tr to 10tr", link: "/", key: [4, 10]},
        {name: "From 10tr to 15tr", link: "/", key: [10, 15]},
        {name: "Above 15tr", link: "/", key: [15]},
    ]
}
