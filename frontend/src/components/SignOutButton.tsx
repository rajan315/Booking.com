import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "You are Signed Out", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        <button
            onClick={handleClick}
            className="text-blue-600 px-3 py-2 md:px-4 md:py-2 font-bold bg-white hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
