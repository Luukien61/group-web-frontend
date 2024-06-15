import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {Category} from "@/common/NavMenu.tsx";
import {Product} from "@/component/CategoryCard.tsx";
import {UserResponse} from "@/page/LoginPage.tsx";

interface BearState {
    bears: number
    increase: (by: number) => void
}


const useBearStore = create<BearState>()(
    devtools(
        persist(
            (set) => ({
                bears: 0,
                increase: (by) => set((state) => ({bears: state.bears + by})),
            }),
            {
                name: 'bear-storage',
            },
        ),
    ),
)

interface CurrentLocation {
    pathname: string,
    setPathname: (newPathname: string) => void
}

export const useLocationStore = create<CurrentLocation>()(
    devtools(
        (set) => ({
            pathname: "",
            setPathname: newPathname => set({pathname: newPathname})
        })
    ),
)

interface CurrentDeviceMem {
    ram: number,
    rom: number,
    setRam: (differRam: number) => void,
    setRom: (differRom: number) => void,
}

export const useCurrentDeviceMem = create<CurrentDeviceMem>()(
    devtools(
        (set) => ({
            ram: 8,
            rom: 256,
            setRom: (differRom: number) => set({rom: differRom}),
            setRam: (differRam: number) => set({ram: differRam}),
        })
    )
)
type CategoryInstance = {
    categories: string[],
    setCategories: (newCategory: string[]) => void,
}
export const useCategory = create<CategoryInstance>()(
    devtools(
        (set) => ({
            categories: [''],
            setCategories: (newCategory: string[]) => set({categories: newCategory}),
        })
    )
)
type CategoryItemType = {
    categoriesItem: Category[],
    setCategoriesItem: (newCategories: Category[]) => void
}
export const useCategoryItem = create<CategoryItemType>()(
    devtools(
        (set) => ({
            categoriesItem: [],
            setCategoriesItem: (newCategories: Category[]) => set({categoriesItem: newCategories}),
        })
    )
)

type Filter = {
    producerFilter: string[],
    priceFilter: number[],
    setPriceFilter: (newPriceFilter: number[]) => void,
    setProductFilter: (newProductFilter: string[]) => void,
}
export const useFilter = create<Filter>()(
    devtools(
        (set) => ({
            producerFilter: [],
            priceFilter: [],
            setProductFilter: newProductFilter => set({producerFilter: newProductFilter}),
            setPriceFilter: newPriceFilter => set({priceFilter: newPriceFilter}),
        })
    )
)
type ProductPost = {
    product: Product | string,
    setProduct: (newProduct: Product | string) => void,
}
export const useProduct = create<ProductPost>()(
    devtools(
        (set) => ({
            product: "",
            setProduct: newProduct => set({product: newProduct}),
        })
    )
)

type LoginState = {
    isLogin: boolean,
    setIsLogin: (newState: boolean) => void
}

export const useLoginState = create<LoginState>()(
    devtools(
        (set) => ({
            isLogin: false,
            setIsLogin: newState => set({isLogin: newState}),
        })
    )
)

type UserIdLoginState = {
    userId: number | null,
    setUserId: (newUserId: number) => void,
}
export const useUserIdLogin = create<UserIdLoginState>()(
    devtools(
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
)

type UserLoggedIn = {
    user: UserResponse,
    setUser: (newUser: UserResponse) => void
}

export const useUserLogin = create<UserLoggedIn>()(
    devtools(
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
)