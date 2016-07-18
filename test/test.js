// Import Chai
import chai from 'chai';

// Import Any Files to Test
import { Contact } from './../src/js/models/contact';
import { List } from './../src/js/models/list';
import { Controller } from './../src/js/controllers/controller';
// Set Chai Constants
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;

describe('Class Tests', function () {
	describe('Contact Class', function() {
			let contact;
			beforeEach(()=>{
				contact = new Contact();
			});
	    it('should be an instance of Contact', ()=> {
	      expect(contact).to.be.an.instanceof(Contact);
	    });
	    it('should have an ID', ()=>{
	    	expect(contact.id).to.be.a('string');
	    });
	    it('should have a firstName', ()=>{
	    	expect(contact.firstName).to.be.a('string');
	    });
	    it('should have a lastName', ()=>{
	    	expect(contact.lastName).to.be.a('string');
	    });
	    it('should have a phoneNumber', ()=>{
	    	expect(contact.phoneNumber).to.be.a('string');
	    });
	    it('should have a city', ()=>{
	    	expect(contact.city).to.be.a('string');
	    });
	    it('should have a state', ()=>{
	    	expect(contact.state).to.be.a('string');
	    });
	    it('should have a photo', ()=>{
	    	expect(contact.photo).to.be.a('string');
	    	// Note: To be retrieved through AJAX call
	    });
	});

	describe('List Class', function(){
		it('should have an array of contacts', function(){
			let list = new List();
			expect(list.contacts).to.be.an('array');
		});
	});

	describe ('Controller Class', function(){
		let controller;
		beforeEach(()=>{
			controller = new Controller();
		});
		it('should, when the user clicks "submit": create a contact; assign an ID to the Contact; collect the firstName, lastName, phoneNumber, city, and state from the form and assign then to the new contact', ()=>{
			expect(controller.createContact).to.be.a('function');
		});
		it('should pull a photo from Randomuser.me and add it to the Contact', ()=>{
			expect(controller.addPhoto).to.be.a('function');
		});
		it('should push the new contact into the list', ()=>{
			expect(controller.pushContact).to.be.a('function');
		});
		it('should deleta a contact when the user clicks "delete Contact"', ()=>{
			expect(controller.deleteContact).to.be.a('function');
		});
	});
});
// Closes the Class Tests describe function. This should be the last piece of code, other than export.