import CONSTANTS from '../CONSTANTS.js';
import Render from './Render.js';
import Http from '../Core/Http.js';
import { capitalize } from '../helpers.js';

class Router {

    static checkCurrentPage() {
        let currentPage = window.location.pathname.split('/');

        switch (currentPage[1]) {
            case '':
            case '/':
            case 'index.html':
            case '/index.html':

                Http.GET(CONSTANTS.endopints.posts)

                    // slice necessário porque a API, em algumas raras ocasiões, retornava mais do que 100 posts
                    // e esses posts extras eram incompletos
                    .then(data => Render.Posts(data.slice(0,100)))
                    .catch(error => console.warn(error))
            break;

            case 'post':

                async function getPostData(postUrl) {
                    const post = await Http.GET(postUrl);
                    const user = await Http.GET(`${CONSTANTS.endopints.users}/${post.userId}`);
                    const comments = await Http.GET(`${CONSTANTS.endopints.comments}?postId=${post.id}`);

                    Render.Post(post, user, comments);
                }

                const postUrl = `${CONSTANTS.endopints.posts}/${currentPage[2]}`;
                getPostData(postUrl);
            break;

            case 'create':
                const model = capitalize(currentPage[2]);

                Render[`create${model}`]();
            break;

            default:
                Render.NotFound();
            break;
        }
    }
}

export default Router;