import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message({type, msg}){

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        if (!msg){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)
        
        return () => clearTimeout(timer)

    }, [msg])

    return(
        <> {/*Usa um fragment para não ocupar espaço na pagina enquanto a mensagem não existe*/}
            {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
    
        </>
    )
}

export default Message