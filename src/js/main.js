import $ from 'jquery';

import { Contact } from './models/contact';
import { List } from './models/list';
import { Controller } from './controllers/controller';

let controller = new Controller(list);
let list = new List();

controller.getPhoto();