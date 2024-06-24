import styles from './Avatar.module.css'

// colocando um valor default na variavel hasBorder como true
export function Avatar({hasBorder = true, src}) {

    return (
        // tem borda? se sim styles.avatarWithBorder / se nao styles.avatar
        <img className={hasBorder ? styles.avatarWithBorder : styles.avatar } 
        src={src}/>
    )
}