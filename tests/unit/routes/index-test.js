import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:index', {
  needs: ['controller:application']
});

// test('model returns array of people', function(assert) {
//   var route = this.subject(),
//       applicationController = route.controllerFor('application');

//   applicationController.set('attrs.person.id', 'S000033');

//   route.get('model').then(
//     function(result) {
//       assert.equal(result, {});
//     }
//   );
// });
