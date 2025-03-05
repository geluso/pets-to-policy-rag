import { Toaster } from "react-hot-toast";

export default function Toast() {
    return (
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
    )
}