import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'
import styles from "./Create.module.scss"
import { appContext } from '../../Context/TodoContext'

export default function Create() {
  const input = useRef()

  const { update, todoId, todo, setUpdate } = appContext()

  const addData = () => {
    let request = { name: input.current.value }
    if (!update) {
      const warning = window.confirm("Yeni məlumat əlavə edilsin?")
      if (warning) {
        fetch("http://localhost:4400/person",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
          }
        )
        window.location.reload()
      }
      else { return }
    }

    else {
      const warning = window.confirm("Dəyişiklik qeydə alınsın?")
      if (warning) {
        fetch(`http://localhost:4400/person/${todoId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
          }
        )
        window.location.reload()

      }

      else { return }
    }

    setUpdate(false)

  }

  useEffect(() => {
    input.current.focus()
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addData()
    }
  }

  useEffect(() => {
    input.current.value = todo
  }, [todo])

  return (
    <div className={styles.wrapper}>
      <input type="text" ref={input} name='todo' onKeyDown={handleKeyDown} placeholder='Nəsə yazın' />
      <button className={styles.btn} onClick={addData}>Yadda saxla</button>
    </div>
  )
}
