import Render from '../Core/Render.js';
import CONSTANTS from '../CONSTANTS.js';
import Http from '../Core/Http.js';
import Notification from './Notification.js';
import { header } from '../templates.js';
import { excerpt } from '../helpers.js';

class Post {
    constructor(post, user = null, comments = null) {
        this.userId = post.userId,
        this.id = post.id,
        this.title = post.title,
        this.body = post.body,
        this.user = user;
        this.comments = comments;
    }

    listTemplate() {
        return `
            <article class="post">
                <span class="post-id">#${this.id}</span>
                <h2 class="post-title">
                    <a href="/post/${this.id}">${this.title}</a>
                </h2>
                <p class="post-body">${excerpt(this.body)}</p>
            </article>
        `;
    }

    singleTemplate() {
        return `
            ${header}
            <article class="post with-comments">
                <span class="post-id">#${this.id}</span>
                <h2 class="post-title">${this.title}</h2>
                <p class="post-body">${this.body}</p>
                ${this.user ? `<footer><em>Postado por ${this.user.name}</em></footer>` : ''}
                <form method="POST" data-model="comment" action="${CONSTANTS.endopints.comments}">
                    <h3>Inserir novo comentário</h3>
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input type="text" name="name" />
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" />
                    </div>
                    <div class="form-group">
                        <label for="body">Mensagem</label>
                        <textarea name="body" rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn">Enviar</button>
                    </div>
                </form>

                <h3>Comentários</h3>
                <div class="post-comments-container">
                    ${Render.Comments(this.comments)}
                </div>
            </article>
        `;
    }

    static insertPost(submittedForm, formData) {

        const submitBtn = submittedForm.querySelector('[type="submit"]');

        submitBtn.setAttribute('disabled', 'disabled')
        submitBtn.innerText = 'Enviando...';

        Http.POST(CONSTANTS.endopints.posts, formData)
            .then(postData => {

                new Notification('Post criado com sucesso.').show();

                submitBtn.removeAttribute('disabled')
                submitBtn.innerText = 'Enviar';
                submittedForm.reset();
            })
            .catch(error => {
                new Notification('Ocorreu um erro ao inserir o post.', 'error').show();
            });
    }
}

export default Post;