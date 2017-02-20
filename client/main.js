import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

const learnedWords = new Mongo.Collection('testColl');


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button.methodTest'(event, instance) {
    Meteor.call('testMethod', 'YY', function (error, result) {
        console.log('test_method',error, result);
    });
  },
  'click button.subTest'(event, instance) {
    const handle = Meteor.subscribe('test_pub', 'XX');
    Template.instance().autorun(function(){
      if ( handle.ready() ) {
        const lw = learnedWords.findOne();
        console.log( 'lw:', lw);
        console.log( 'lw:', lw.learnedWords.length );
      }
    });
  },  
});
