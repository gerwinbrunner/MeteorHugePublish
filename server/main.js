import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import { Random } from 'meteor/random';

Meteor.startup(() => {
  // code to run on server at startup
});

const ran = Random.id();
const lWs = [];
_.times(10001001, (idx) => {
  // if (idx % 100000 === 0) {
  //   console.log('-', idx);
  // }
  lWs.push(ran+idx);
});


Meteor.methods({
  testMethod: function(code) {
    console.log("testMethod - " + code);
    return {code: { learnedWords: lWs }};
  }
});

Meteor.publish('test_pub', function(code) {
  console.log('test_pub', code);
  const self = this;
  self.added("testColl", code, { learnedWords: lWs });
  self.ready();
});
