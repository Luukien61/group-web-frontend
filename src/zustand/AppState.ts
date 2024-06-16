import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {Category} from "@/common/NavMenu.tsx";
import {Product} from "@/component/CategoryCard.tsx";
import {UserResponse} from "@/page/LoginPage.tsx";

interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore = create<BearState>()(
    (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({bears: state.bears + by})),
    })
)

interface CurrentLocation {
    pathname: string,
    // eslint-disable-next-line no-unused-vars
    setPathname: (newPathname: string) => void
}

export const useLocationStore = create<CurrentLocation>()(
    (set) => ({
        pathname: "",
        setPathname: newPathname => set({pathname: newPathname})
    })
)

interface CurrentDeviceMem {
    ram: number,
    rom: number,
    // eslint-disable-next-line no-unused-vars
    setRam: (differRam: number) => void,
    // eslint-disable-next-line no-unused-vars
    setRom: (differRom: number) => void,
}

export const useCurrentDeviceMem = create<CurrentDeviceMem>()(
    (set) => ({
        ram: 8,
        rom: 256,
        setRom: (differRom: number) => set({rom: differRom}),
        setRam: (differRam: number) => set({ram: differRam}),
    })
)
type CategoryInstance = {
    categories: string[],
    // eslint-disable-next-line no-unused-vars
    setCategories: (newCategory: string[]) => void,
}
export const useCategory = create<CategoryInstance>()(
    (set) => ({
        categories: [''],
        setCategories: (newCategory: string[]) => set({categories: newCategory}),
    })
)
type CategoryItemType = {
    categoriesItem: Category[],
    // eslint-disable-next-line no-unused-vars
    setCategoriesItem: (newCategories: Category[]) => void
}
export const useCategoryItem = create<CategoryItemType>()(
    (set) => ({
        categoriesItem: [],
        setCategoriesItem: (newCategories: Category[]) => set({categoriesItem: newCategories}),
    })
)

type Filter = {
    producerFilter: string[],
    priceFilter: number[],
    // eslint-disable-next-line no-unused-vars
    setPriceFilter: (newPriceFilter: number[]) => void,
    // eslint-disable-next-line no-unused-vars
    setProducerFilter: (newProductFilter: string[]) => void,
}
export const useFilter = create<Filter>()(
    (set) => ({
        producerFilter: [],
        priceFilter: [],
        setProducerFilter: newProductFilter => set({producerFilter: newProductFilter}),
        setPriceFilter: newPriceFilter => set({priceFilter: newPriceFilter}),
    })
)
type ProductPost = {
    product: Product | string,
    // eslint-disable-next-line no-unused-vars
    setProduct: (newProduct: Product | string) => void,
}
export const useProduct = create<ProductPost>()(
    (set) => ({
        product: "",
        setProduct: newProduct => set({product: newProduct}),
    })
)

type LoginState = {
    isLogin: boolean,
    // eslint-disable-next-line no-unused-vars
    setIsLogin: (newState: boolean) => void
}

export const useLoginState = create<LoginState>()(
    (set) => ({
        isLogin: false,
        setIsLogin: newState => set({isLogin: newState}),
    })
)

type UserIdLoginState = {
    userId: number | null,
    // eslint-disable-next-line no-unused-vars
    setUserId: (newUserId: number) => void,
}
export const useUserIdLogin = create<UserIdLoginState>()(
    persist(
        (set) => ({
            userId: null,
            setUserId: newUserId => set({userId: newUserId}),
        }),
        {
            name: "userId",
        }
    ),
)

type UserLoggedIn = {
    user: UserResponse,
    // eslint-disable-next-line no-unused-vars
    setUser: (newUser: UserResponse) => void
}

export const useUserLogin = create<UserLoggedIn>()(
    (set) => ({
        user: {
            staffID: -11,
            email: "",
            fullName: "User",
            phone: "",
            role: "User"
        },
        setUser: newUser => set({user: newUser}),
    })
)

type OrderPending = {
    orderPending: number,
    // eslint-disable-next-line no-unused-vars
    setOrderPending: (newQuantity: number) => void,
}

export const useOrderPending = create<OrderPending>()(
    (set) => (
        {
            orderPending: 0,
            setOrderPending: newQuantity => set({orderPending: newQuantity}),
        }
    )
)