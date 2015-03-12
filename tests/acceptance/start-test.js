import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'person-widget/tests/helpers/start-app';

var application;

module('Acceptance: Start', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting / should have person info & way to get started',
     function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.equal(find('.person-name').text(), 'Bernard Sanders');
    assert.equal(find('.start').text(), 'Get started');
  });
});
