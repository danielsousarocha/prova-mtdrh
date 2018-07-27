import CONSTANTS from './CONSTANTS.js';

export const header = `
    <nav class="header">
        <div class="container">
            <ul>
                <li><a href="/">Lista de Posts</a></li>
                <li><a href="/create/post">Criar um post</a></li>
            </ul>
        </div>
    </nav>
`;

export function commentTag(comment) {
    return `
        <article class="comment">
            <span class="comment-id">#${comment.id}</span>
            <h2 class="comment-title">${comment.name}</h2>
            <small class="comment-email">${comment.email}</small>
            <p class="comment-body">${comment.body}</p>
        </article>
    `;
}

export function createPostForm(users) {
    return `
        <form method="POST" class="create-form" data-model="post" action="${CONSTANTS.endopints.comments}">
            <h3>Inserir novo post</h3>
            <div class="form-group">
                <label for="title">Título</label>
                <input type="text" name="title" />
            </div>
            <div class="form-group">
                <label for="body">Texto</label>
                <textarea name="body" rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="userId">Usuário</label>
                ${renderUsersList(users)}
            </div>
            <div class="form-group">
                <button type="submit" class="btn">Enviar</button>
            </div>
        </form>
    `;
}

function renderUsersList(users) {
    return `
    <select name="userId">
        <option value="" selected></option>
        ${users.map(user => `<option value="${user.id}">${user.name}</option>`).join('')}
    </select>`;
}