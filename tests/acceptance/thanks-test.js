import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Thanks', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('when process is finished, user is thanked', function(assert) {
  visit('/');

  click('.start');

  fillIn('input.email-input', 'test_user@example.com');

  click('input[type="submit"]');

  andThen(function() {
    var copy = "Thank you! We'll deliver this question publicly and ask\n  Bernard Sanders to respond. We'll be in touch by email.";
    assert.equal(find('.copy').text(), copy);
  });
});
