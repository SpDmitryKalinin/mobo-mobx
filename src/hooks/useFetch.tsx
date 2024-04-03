import {useState} from 'react';

import appStoreClass from "../store/AppStore"


type FetchingFunctionType = () => Promise<void>; // Тип функции fetching
type ErrorType = string; // Тип для ошибки
export const useFetching = (callback: () => void):[FetchingFunctionType, ErrorType] => {
    const [error, setError] = useState<string>('');
    
    const fetching = async () => {
        try {
            appStoreClass.showPreloader();
            await callback();
        }
        catch(error:any) {
            setError(error.message)
        }
        finally {
            appStoreClass.hidePreloader();
        }
    }
    return [fetching, error]
}