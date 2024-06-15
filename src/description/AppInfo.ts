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

export type productionProps ={
    type: string,
    filter: filterProp[]
}

export const footerContent: footerProps[] = [
    {
        title: "Contact us",
        child: [
            {
                name: "0386888888",
                link: "/"
            },
            {
                name: "knv@gmail.com",
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