import Post from '../Models/Post.js';
import Comment from '../Models/Comment.js';
import CONSTANTS from '../CONSTANTS.js';
import Http from '../Core/Http.js';
import { root, sortInDescendingOrder } from '../helpers.js';
import { header, createPostForm } from '../templates.js';

class Render {
    static Posts(posts) {
        sortInDescendingOrder(posts);
        let postsHTML = posts.reduce((previousMarkup, currentPost) => {
                            let newPost = new Post(currentPost);
                            let currentMarkup = new Post(newPost).listTemplate();
                            return previousMarkup + currentMarkup;
                        }, '');
        root.innerHTML = `${header}<div class="container posts-container">${postsHTML}</div>`;
    }

    static Post(post, user = null, comments = null) {
        root.innerHTML = `<div class="container">${new Post(post, user, comments).singleTemplate()}</div>`;
    }

    static createPost() {
        async function getUsersAndRenderForm() {
            const users = await Http.GET(CONSTANTS.endopints.users);
            root.innerHTML = `${header}<div class="container">${createPostForm(users)}</div>`;
        }

        getUsersAndRenderForm();
    }

    static Comments(comments) {
        sortInDescendingOrder(comments);
        let commentsHTML = comments.reduce((previousMarkup, currentComment) => {
                                let newComment = new Comment(currentComment);
                                let currentMarkup = new Comment(newComment).listTemplate();
                                return previousMarkup + currentMarkup;
                            }, '');
        return commentsHTML;
    }

    static NotFound() {
        root.innerHTML = `${header}<div class="container text-center">Página não encontrada.</div>`;
    }
}

export default Render;