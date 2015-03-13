import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var person = this.controllerFor('application').get('attrs.person'),
        person_id = person.id,
        model;

    if (!Ember.isEmpty(person.full_name)) {
      // we have full passed in details for the person, no need for lookup
      model = [person];
    } else {
      model = this.apijax.GET('/identifier.json', { 'person_id': person_id });
    }

    return model;
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    var person = this.controllerFor('application').get('attrs.person');
    person = model.objectAt(0);
    this.controllerFor('application').set('attrs.person', person);
  }
});
