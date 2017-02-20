import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('test_pub', function(code) {
  console.log('test_pub', code);
  const self = this;

  const lWs = [];
  _.times(10000000, (idx) => {
    lWs.push(idx);
  });

  self.added("testColl", code, { learnedWords: lWs });
  self.ready();
});
