import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var person_id = this.controllerFor('application').get('attrs.person.id');
    return this.apijax.GET('/identifier.json', { 'person_id': person_id });
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    var person = this.controllerFor('application').get('attrs.person');
    person = model.objectAt(0);
    this.controllerFor('application').set('attrs.person', person);
  }
});
