type item = {
    name: string,
    link: string
}
type footerProps = {
    title: string,
    child: item[]
}
type appDes = {
    appName: string,
    description: string,

}

export const AppInfo: appDes = {
    appName: "KNV",
    description: "We take pride in offering you top-notch technology products such as mobile phones, computers, and cameras.",

}

export type filterProp = {
    name: string,
    items: string[] | number[]
}
const filter1: filterProp[] = [
    {
        name: "Producer",
        items: ["Iphone", "Samsung", "Xiaomi", "Oppo", "Google", "Realme", "Redmi", "Nokia", "Honor", "Vivo"]
    },
    {
        name: "Price",
        items: [2, 4, 6, 10]
    },
    {
        name: "Trending",
        items: ["Iphone 15", "Samsung galaxy s24", "Xiaomi mi14"]
    }
]
const filterLaptop: filterProp[] = [
    {
        name: "Producer",
        items: ["Asus", "Acer", "Apple", "Lenovo", "Hp", "Dell", "MSI"]
    },
    {
        name: "Price",
        items: [8, 12, 15, 20]
    },
    {
        name: "Trending",
        items: ["Vivobook1", "Mac Air Pro", "Dell xabc"]
    }
]

export type productionProps ={
    type: string,
    filter: filterProp[]
}
export const productionType :productionProps[] = [
    {
        type: "smartphone",
        filter: filter1
    },
    {
        type: "laptop",
        filter: filterLaptop
    }
]

export const footerContent: footerProps[] = [
    {
        title: "Contact us",
        child: [
            {
                name: "Phone",
                link: "/"
            },
            {
                name: "Email",
                link: "/"
            }
        ]
    },
    {
        title: "Follow us",
        child: [
            {
                name: "Facebook",
                link: "https://www.facebook.com"
            },
            {
                name: "Youtube",
                link: "https://www.youtube.com"
            },
            {
                name: "Tiktok",
                link: "https://www.tiktok.com"
            }
        ]
    },
    {
        title: "About us",
        child: [
            {
                name: "Store network",
                link: "/"
            },
            {
                name: "Return policy",
                link: "/"
            },
            {
                name: "Warranty policy",
                link: "/"
            },
            {
                name: "Installment policy",
                link: "/"
            }
        ]
    }
]