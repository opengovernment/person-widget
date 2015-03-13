import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:questions/new', {
  needs: ['controller:application',
          'controller:questions.new']
});

test('renderTemplate sets application.duringQuestionSteps to true',
     function(assert) {
  var route = this.subject(),
      applicationController = route.controllerFor('application'),
      didRender;

  // http://discuss.emberjs.com/t/test-isolation-aka-how-wrong-am-i-doing-it/7162/2
  route.render = function mockRender(route) {
    didRender = true;
  };

  route.renderTemplate();

  assert.equal(applicationController.get('duringQuestionSteps'), true);
  assert.ok(didRender, 'expected to render');
});

test('format sanitizes and strips extra spaces', function(assert) {
  var route = this.subject(),
      unformatted = 'Full     of    extra    spaces!',
      expected = 'Full of extra spaces!';

  assert.equal(route.format(unformatted), expected);
});

test('guessPartner returns partner from window.location if no partner given',
     function(assert) {

  var route = this.subject(),
      expected = { name: 'Example.com',
                   url: 'http://www.example.com' };

  route.locationHostname = function mockHostname() {
    return 'www.example.com';
  };

  route.locationProtocol = function mockProtocol() {
    return 'http:';
  };

  assert.equal(route.guessPartner(null).name, expected.name);
});

// test('returns address derived from users ip address',
//      function(assert) {

//   var route = this.subject(),
//       applicationController = route.controllerFor('application');

//   var result = route.send('setAddressFromIp');

//   Ember.run(function() {
//     assert.equal(applicationController.get('address'),
//                  'Auckland, Auckland, New Zealand');
//   });
// });

test('save submits question and takes user to thanks route',
     function(assert) {

  var route = this.subject(),
      applicationController = route.controllerFor('application'),
      newController = route.controllerFor('questions.new'),
      model,
      didPost,
      didTransition;

  setUpApplicationController(applicationController);

  setUpPerson(applicationController);

  newController.set('email', 'test_user@example.com');

  model = { title: applicationController.get('attrs.question.summary'),
            body: applicationController.get('attrs.question.body') };

  newController.set('model', model);

  var payLoad = preparePayload(applicationController,
                               newController,
                               model);

  // mock apijax as apijax won't work in context of test
  route.apijax = {
    POST: function(path, params) {
      didPost = true;
      assert.equal(JSON.stringify(params), JSON.stringify(payLoad),
                 'expected data to be properly formed');

    }
  };

  // http://discuss.emberjs.com/t/test-isolation-aka-how-wrong-am-i-doing-it/7162/2
  route.transitionTo = function mockTransitionTo(route) {
    didTransition = true;
    assert.equal(route, 'thanks',
                 'expected transitionTo thanks');
  };

  route.send('save');

  assert.ok(didPost, 'expected to post data');
  assert.ok(didTransition, 'expected to transition');
});

function setUpApplicationController(controller) {
  controller.set('address', '05602');
  controller.set('attrs', {
    question: {
      summary: 'summary',
      body: 'body'
    },
    partner: {
      name: 'partner',
      url: 'http://example.com',
      logo: 'http://example.com/logo.png'
    }
  });
}

function setUpPerson(controller) {
  controller.set('attrs.person', {
    id: '1',
    full_name: 'Bernard Sanders'
  });
}

function preparePayload(applicationController,
                        newController,
                        model) {
  var fullQuestion = model,
      fullPartner = applicationController.get('attrs.partner');

  fullQuestion.user = {
    email: newController.get('email')
  };

  fullQuestion.person_id = applicationController.get('attrs.person.id');

  fullPartner.submitted_address = applicationController.get('address');

  return { question: fullQuestion, partner: fullPartner };
}
