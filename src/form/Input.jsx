import styles from './Input.module.css'

function Input({type, text, name, placeholder, value,handleChange,readOnly}){

    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            {readOnly ? <input readOnly type={type} name={name} id={name}placeholder={placeholder} value={value} onChange={handleChange}/>
            : <input type={type} name={name} id={name}placeholder={placeholder} value={value} onChange={handleChange}/>

            }
        </div>
    )
}
export default Input