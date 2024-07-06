import { createContext, useContext, useState, useEffect } from "react";

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [data, setData] = useState(null)
    const [todo, setTodo] = useState("")
    const [update, setUpdate] = useState(false)
    const [todoId, setTodoId] = useState()
    const [upData, setUpData] = useState(null)
    const sharedState = { data, setData, update, setUpdate, todoId, setTodoId, upData, setUpData, todo, setTodo}

    useEffect(() => {
        const getPerson = async () => {
            const res = await fetch("http://localhost:4400/person")
            try {
                if (!res.ok) {
                    throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
                }
                const db = await res.json()
                setData(db)
            } catch (error) {
                console.error("Xəta baş verdi", error)
                throw error
            }
        }
        getPerson()
    }, [])

    return (
        <TodoContext.Provider value={sharedState}>
            {children}
        </TodoContext.Provider>
    )
}

export function appContext() {
    return useContext(TodoContext)
}