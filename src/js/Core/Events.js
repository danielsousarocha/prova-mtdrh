import Router from './Router.js';
import Post from '../Models/Post.js';
import Comment from '../Models/Comment.js';
import Notification from '../Models/Notification.js';
import { formIsvalid, getAllInputValues } from '../helpers.js';

class Events {

    listenMainEvents() {
        this.windowPopstate();
        this.linkNavigation();
        this.formSubmission();
    }

    windowPopstate() {
        window.addEventListener('popstate', function(e) {
            Router.checkCurrentPage();
        });
    }

    linkNavigation() {
        document.body.addEventListener('click', function(e) {
            const clickedElement = e.target;

            if (clickedElement.nodeName.toLowerCase() === 'a') {
                e.preventDefault();
                const url = clickedElement.getAttribute('href');
                history.pushState(null, null, url);
                Router.checkCurrentPage();
                e.stopPropagation();
            }
        });
    }

    formSubmission() {
        document.body.addEventListener('submit', function(e) {
            e.preventDefault();

            const submittedForm = e.target;
            const model = submittedForm.dataset.model;

            if (formIsvalid(submittedForm)) {
                const formData = getAllInputValues(submittedForm);

                switch (model) {
                    case 'post':
                        Post.insertPost(submittedForm, formData);
                    break;

                    case 'comment':
                        Comment.insertComment(submittedForm, formData);
                    break;
                }
            } else {
                new Notification('Todos os campos são obrigatórios', 'error').show();
            }
        });
    }
}

export default Events;