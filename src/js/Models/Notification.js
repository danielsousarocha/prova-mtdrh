import { root } from '../helpers.js';

class Notification {
    constructor(message, type = 'success') {
        this.message = message;
        this.type = type;
    }

    show() {
        const notification = this.template();

        this.removeExistingNotification();
        root.insertBefore(notification, root.firstChild);
        this.waitAndRemove();
    }

    template() {
        const el = document.createElement('div');
        el.classList.add('notification', this.type);
        el.innerText = this.message;

        return el;
    }

    waitAndRemove() {
        setTimeout(this.removeExistingNotification, 3000);
    }

    removeExistingNotification() {
        const notification = document.querySelector('.notification');

        if (notification) {
            notification.parentNode.removeChild(notification);
        }
    }
}

export default Notification;