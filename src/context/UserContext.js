import { createContext, useState, useEffect } from 'react'

export const defaultContext = {
    user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        state: null,
        lastAccess: null,
        role: null,
        //optional values
        phone: null,
        mobile: null,
        address: null,
        city: null,
        country: null,
        zip: null,
        code: null,
        birthday: null,
        passport: null,
        photo: null,
        ci: null,
        rate: null,
    },
    setUser: () => { }
}

export const UserContext = createContext(defaultContext)

export const UserContextProvider = ({ value, children }) => {

    const [user, setUser] = useState((value) ? value : defaultContext.user)

    useEffect(() => {
        //ocurre cada vez que se modifica el usuario
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}