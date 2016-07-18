import $ from 'jquery';
import { Contact } from './../models/contact';
import { List } from './../models/list';
class Controller{
	constructor(form, list){
		this.form = form
		this.list = list;
	}

	createContact(){
    	this.form.on('submit', (event) => {
	      event.preventDefault();
	      let contact = new Contact();  
	      contact.firstName = this.form.find('.firstName').val();
	      contact.lastName = this.form.find('.lastName').val();
	      contact.phoneNumber = this.form.find('.phoneNumber').val();
	      contact.city = this.form.find('.city').val();
	      contact.state = this.form.find('.state').val();
	      this.getPhoto(contact);
	      this.pushContact(contact);
	    });
	}

	addPhoto(contact){
		$.ajax({
			url: 'https://randomuser.me/api/',
	  		dataType: 'json',
	  		success: function(data){
				contact.photo = data.results[0].picture.thumbnail;
	  		}
		});
	}

	pushContact(contact){
		  this.list.push(contact);
	      this.list.forEach(function(object, index){
		  	object.id = index;
	      });
	}
}

export { Controller };	