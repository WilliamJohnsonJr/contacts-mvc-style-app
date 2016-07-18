import $ from 'jquery';
import { Contact } from './../models/contact';
class Controller{
	constructor(list){
		this.list = list;
	}
	addContact(){
		this.getPhoto();
	}
	getPhoto(){
		$.ajax({
			url: 'https://randomuser.me/api/',
	  		dataType: 'json',
	  		success: function(data){
		  		let contact = new Contact();
				contact.photo = data.results[0].picture.thumbnail;
		  		console.log(contact);
	  		}
		});
	}
}

export { Controller };	