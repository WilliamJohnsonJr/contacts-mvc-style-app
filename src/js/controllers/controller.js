import $ from 'jquery';
import _ from 'underscore';
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
	      this.addPhoto(contact);
	      this.pushContact(contact);
	      $(".listUl").html(``);
	      this.injectList(this.list);
	    });
	}

	deleteContact(){
		$(".deleteContact").on('click', function(event){
			event.preventDefault();
			this.list.forEach(function(contactObj, index){
				if (event.target.id === contactObj.id){
					this.list.splice(index, 1);
					$(event.target).remove();
				};
			});
			this.injectList(this.list);
		});
	};

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
		  _.sortBy(this.list, 'lastName');
	      this.list.forEach(function(object, index){
		  	object.id = index;
	      });
	}

	injectList(list){
		$(".listUl").html(``);
		list.forEach(function(contact){
			$(".listUl").append(`<li class="photo">
					<img src=${contact.photo}>
				</li>
				<li class="contactName">
					${contact.firstName} ${contact.lastName}
				</li>
				<li class="phoneNumber">
					${contact.phoneNumber}
				</li>
				<li class="location">
					${contact.city}, ${contact.state}
				</li>
				<li class="deleteLi">
					<button class="${contact.id}">Delete Contact
					</button>
				</li>
			</li>`)
		});
	}

	init(){
		this.createContact();
		this.deleteContact();
	}
}

export { Controller };	