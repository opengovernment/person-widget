import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'application',
  person: Ember.computed.alias('controllers.application.attrs.person')
});
