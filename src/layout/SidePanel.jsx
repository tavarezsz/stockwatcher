import React, { useEffect, useState } from 'react'
import styles from './SidePanel.module.css'

export default function SidePanel({ show, onClose, children }) {
  const [shouldRender, setShouldRender] = useState(false)
  const [enter, setEnter] = useState(false)

  useEffect(() => {
    if (show) {
      setShouldRender(true)
      // Aguarda o próximo ciclo de renderização
      requestAnimationFrame(() => {
        setEnter(true)
      })
    } else {
      setEnter(false)
      setTimeout(() => setShouldRender(false), 300) // Espera a animação de saída
    }
  }, [show])

  if (!shouldRender) return null

  return (
    <>
      <div className={`${styles.sidePanel} ${enter ? styles.enter : ''}`}>
        <button onClick={onClose} className={styles.closeBtn}>X</button>
        {children}
      </div>
      <div className={styles.backdrop} onClick={onClose}></div>
    </>
  )
}
