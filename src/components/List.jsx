import React from 'react'
import { appContext } from '../Context/TodoContext'
import styles from "./List.module.scss"
import { MdOutlineEditNote } from "react-icons/md";
import { MdPlaylistRemove } from "react-icons/md";
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export default function List() {

    const { data, update, setUpdate, setTodoId, todoId, upData, setUpData, setTodo } = appContext()
    const refItem = useRef()
    const [todoItem, setTodoItem] = useState()
    const [deleteItem, setDeleteItem] = useState(false)
    const handleClick = (index) => {
        setTodoItem(index)
    }
    const editTodo = (id) => {
        setTodoId(id)
        setUpdate(true)
    }

    useEffect(() => {
        if (update) {
            const updateData = async () => {
                const res = await fetch(`http://localhost:4400/person/${todoId}`)
                try {
                    if (!res.ok) {
                        throw new Error(`Məlumat əldə edilə bilmədi. Status: ${res.status}`)
                    }
                    const d = await res.json()
                    setUpData(d)
                }
                catch (error) {
                    console.error("Xəta baş verdi", error);
                    throw error
                }
            }

            updateData()
        }
    }, [upData, update])

    const deleteData = (id) => {
        setDeleteItem(true)
        setUpdate(false)
        setTimeout(() => {
            const warning = window.confirm("Məlumat bazadan silinəcək. Əminsiniz?")
            if (warning) {
                fetch(`http://localhost:4400/person/${id}`, {
                    method: "DELETE"
                })
                window.location.reload()
            }
            else {
                setDeleteItem(false)
                setTodo("")
            }
        }, 100)
    }

    return (
        <div className={styles.items}>
            {
                data && data.map((item, index) => {
                    return (
                        <div className={`${styles.item} ${todoItem === index && update ? styles.activeEdit : "" || todoItem === index && deleteItem ? styles.activeRemove : ""}`} ref={refItem} key={item.id}>
                            <div className={styles.itemContent}>{`${index + 1}. ${item.name}`}</div>
                            <div className={styles.redact}>
                                <MdOutlineEditNote onClick={() => { editTodo(item.id), setTodo(item.name), handleClick(index) }} size={28} />
                                <MdPlaylistRemove onClick={() => { deleteData(item.id), handleClick(index) }} size={28} />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}