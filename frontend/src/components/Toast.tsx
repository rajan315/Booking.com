import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Adjust timeout duration as needed

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const toastStyles =
        type === "SUCCESS"
            ? "bg-green-500"
            : "bg-red-500";

    const textStyles = "text-white";

    const containerStyles =
        "fixed top-4 right-4 z-50 p-4 rounded-md max-w-xs md:max-w-md";

    return (
        <div className={`${containerStyles} ${toastStyles} ${textStyles}`}>
            <div className="flex justify-center items-center">
                <span className="text-sm md:text-lg font-semibold">
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Toast;
