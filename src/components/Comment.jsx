import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react';

export function Comment({content, onDeleteComment}){

    const [likeCount, setLikeCount] = useState(0);

    function actionDeleteComment(){
        onDeleteComment(content);
    }

    function actionLikeComment () {
        setLikeCount((state) => {
            return state + 1
        }
        );
    }
    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/141262429?v=4"  />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Joao Tonini</strong>
                            <time title = "11 de junho às 20:27"dateTime="2024-06-11 20:27:30">Cerca de 1h atras</time>
                        </div>

                        <button onClick={actionDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                <footer>
                   <button onClick={actionLikeComment}>
                    <ThumbsUp/>
                    Apaludir <span>{likeCount}</span>
                   </button>
                </footer>
            </div>
        </div>
    )
}