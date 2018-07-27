import Router from './Core/Router.js';
import Events from './Core/Events.js';

Router.checkCurrentPage();
new Events().listenMainEvents();