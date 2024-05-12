import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

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