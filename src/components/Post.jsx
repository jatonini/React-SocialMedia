import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { Avatar } from "./Avatar";
import { Comment } from './Comment';
import styles from './Post.module.css';
import { useState } from 'react';


export function Post({ author, publishedAt, content }) {
    //const para criacao do array de comentarios
    const [comments, setComments] = useState([
      'Post muito bacana!'
    ])
    //criando o estado do novo comentario
    const [newCommentText, setNewCommentText] = useState('')
    //formatando a data ao qual foi postado o comentario
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr,
    });
    //formatando o texto que fala a quanto tempoo o comentario foi postado
    const publishedRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBr,
        addSuffix: true,
    });
    // funcao de usuario para criar um novo comentario
    function actionCreateNewComment() {
        event.preventDefault()
        setComments([...comments,newCommentText])
        setNewCommentText('');
    };
    // funcao de usuario para adicionar o novo comentario
    function actionNewCommentChange() {
        event.target.setCustomValidity("")
        setNewCommentText(event.target.value);
    };

    function actionNewCommentInvalid() {
        event.target.setCustomValidity("Esse campo é obrigatorio")
    }
    //funcao para deletar um comentario (é enviada para o COMMENT.jsx)
    function deleteComment(commentToDelete){
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        setComments(commentsWithoutDeletedOne)
    }
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={actionCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                name='comment'
                placeholder="Deixe um comentário"
                value={newCommentText}
                onChange={actionNewCommentChange}
                onInvalid={actionNewCommentInvalid}
                required
                />

                <footer>
                    <button type='submit' disabled={newCommentText.length === 0}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article>
    )
}