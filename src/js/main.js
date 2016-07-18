import $ from 'jquery';

import { Contact } from './models/contact';
import { List } from './models/list';
import { Controller } from './controllers/controller';

const form = $('.newContactForm');
const list = new List();
let controller = new Controller(form, list);


controller.getPhoto();