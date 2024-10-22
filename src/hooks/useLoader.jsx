import { useState } from "react";
import Loader from "../components/loader.component";
const useLoader = (defaultState = false) => {
    const [isLoading, setIsLoading] = useState(defaultState);
    const showLoader = () => {
        setIsLoading(true);
    };
    const hideLoader = () => {
        setIsLoading(false);
    };
    const LoaderComponent = () => (isLoading ? <Loader /> : <></>);
    return { showLoader, hideLoader, LoaderComponent, isLoading };
};
export default useLoader;