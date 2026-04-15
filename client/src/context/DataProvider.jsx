import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children}) => {
const [account, setAccount] = useState({name: "", username: ""});

    return (
        <DataContext.Provider value={{
            account: account,
            setAccount: setAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider;