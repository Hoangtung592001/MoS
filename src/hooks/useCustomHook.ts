import { useEffect } from 'react';

const useCustomHook = (callback: any) => {
    useEffect(() => {}, [callback]);
};

export default useCustomHook;
