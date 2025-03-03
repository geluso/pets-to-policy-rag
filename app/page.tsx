import { Suspense } from 'react'
import { Toaster } from "react-hot-toast"
import Search from './components/Search/Search'

export default async function SearchPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Search />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName="z-[100000]"
                containerStyle={{}}
                toastOptions={{
                    className: "",
                    duration: 5000,
                    style: {
                        borderRadius: 0,
                        background: "white",
                        color: "black",
                    },
                }}
            />
        </Suspense>
    )
}
