import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const DataContext = createContext()

export const ConText = (props) => {
    const [cart, setCart] = useState([])
    const [isAuth, setIsAuth] = useState(true)

    const checkAuth = () => {
        if(localStorage.getItem("COLLEGE_PROJ_USER")) setIsAuth(true)
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <>
            <DataContext.Provider value={{ cart, setCart, isAuth }}>
                {props.children}
            </DataContext.Provider>
        </>
    )
}