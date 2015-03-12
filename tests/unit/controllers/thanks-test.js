import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:thanks', {
  needs: ['controller:application']
});

test('it has same selectedPerson as application controller', function(assert) {
  var controller = this.subject(),
      applicationController = controller.get('controllers.application'),
      person = { 'full_name': 'Bernard Sanders' };

  applicationController.set('selectedPerson', person);

  assert.equal(controller.get('selectedPerson'),
               applicationController.get('attrs.person'));
});
