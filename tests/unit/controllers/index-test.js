import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:index', {
  needs: ['controller:application']
});

test('it has same person as application controller', function(assert) {
  var controller = this.subject(),
      applicationController = controller.get('controllers.application'),
      person = { 'full_name': 'Bernard Sanders' };

  applicationController.set('attrs', { person: person });

  assert.equal(controller.get('person'),
               applicationController.get('attrs.person'));
});
