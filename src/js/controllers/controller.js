import $ from 'jquery';
import _ from 'underscore';
import { Contact } from './../models/contact';
import { List } from './../models/list';
class Controller{
	constructor(form, list){
		this.form = form
		this.list = list.contacts;
		this.xID = 0;
	}

	createContact(){
    	this.form.on('submit', (event) => {
	      event.preventDefault();
	      if (
	      	  String(this.form.find('.firstName').val()).length > 0 &&
		      String(this.form.find('.lastName').val()).length > 0 &&
		      String(this.form.find('.phoneNumber').val()).length > 0 &&
		      String(this.form.find('.city').val()).length > 0 &&
		      String(this.form.find('.state').val()).length > 0
	      	) {
		      let contact = new Contact();
		      contact.id = this.xID;
		      this.xID +=1;  
		      this.addPhoto(contact);
	  	  } else {
	  	  	alert('Please fill in all fields');
	  	  };
	    });
	}

	deleteContact(){
		$(".deleteButton").on('click', (event)=>{
			event.preventDefault();
			event.target.classList.forEach((classVal)=>{
				this.list.forEach((contactObj, index)=>{
					if (classVal === "delete-"+contactObj.id){
						$(`contact-${contactObj.id}`).remove();
						this.list.splice(index, 1);
					};
				});
			});
			this.injectList(this.list);	
			this.deleteContact();
		});
	};

	addPhoto(contact){
		$.ajax({
			url: 'https://randomuser.me/api/',
	  		dataType: 'json',
	  		success: (data) =>{
				contact.photo = data.results[0].picture.thumbnail;
			    contact.firstName = this.form.find('.firstName').val();
		      contact.lastName = this.form.find('.lastName').val();
		      contact.phoneNumber = this.form.find('.phoneNumber').val();
		      contact.city = this.form.find('.city').val();
		      contact.state = this.form.find('.state').val();
		      this.pushContact(contact);
		      this.injectList(this.list);
		      this.form.find('.firstName').val('');
		      this.form.find('.lastName').val('');
		      this.form.find('.phoneNumber').val('');
		      this.form.find('.city').val('');
		      this.form.find('.state').val('');
		      this.deleteContact();
	  		}
		});
	}

	pushContact(contact){
		  this.list.push(contact);
		  this.list = _.sortBy(this.list, 'lastName');
	}

	injectList(list){
		$(".listUl").html(``);
		list.forEach(function(contact){
			$(".listUl").append(`<li>
				<ul class="contactUL contact-${contact.id}">
					<li class="photo">
						<img src="${contact.photo}">
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
						<button class="deleteButton delete-${contact.id}">Delete Contact
						</button>
					</li>
				<ul>
			</li>`)
		});
	}

	init(){
		this.createContact();
	}
}

export { Controller };	