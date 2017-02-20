import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

const learnedWords = new Mongo.Collection('testColl');


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  const handle = Meteor.subscribe('test_pub', 'XX');
  this.autorun(function(){
    if ( handle.ready() ) {
    const lw = learnedWords.findOne();
    console.log( 'lw:', lw);
    console.log( 'lw:', lw.learnedWords.length );      
    }
  })
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
