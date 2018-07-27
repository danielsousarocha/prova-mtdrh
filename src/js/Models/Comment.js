import CONSTANTS from '../CONSTANTS.js';
import Http from '../Core/Http.js';
import Notification from './Notification.js';
import { commentTag } from '../templates.js';

class Comment {
    constructor(comment) {
        this.postId = comment.postId,
        this.id = comment.id,
        this.name = comment.name,
        this.email = comment.email,
        this.body = comment.body
    }

    listTemplate() {
        return `
        <article class="comment">
            <span class="comment-id">#${this.id}</span>
            <h2 class="comment-title">${this.name}</h2>
            <small class="comment-email">${this.email}</small>
            <p class="comment-body">${this.body}</p>
        </article>
        `;
    }

    static insertComment(submittedForm, formData) {

        const submitBtn = submittedForm.querySelector('[type="submit"]');
        const postCommentsContainer = document.body.querySelector('.post-comments-container');

        submitBtn.setAttribute('disabled', 'disabled')
        submitBtn.innerText = 'Enviando...';

        Http.POST(CONSTANTS.endopints.comments, formData)
            .then(commentData => {

                new Notification('Comentário criado com sucesso.').show();

                postCommentsContainer.innerHTML = commentTag(commentData) + postCommentsContainer.innerHTML;
                submitBtn.removeAttribute('disabled')
                submitBtn.innerText = 'Enviar';
                submittedForm.reset();
            })
            .catch(error => {
                new Notification('Ocorreu um erro ao inserir o comentário.', 'error').show();
            });
    }
}

export default Comment;