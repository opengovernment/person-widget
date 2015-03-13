import Ember from 'ember';

export default Ember.Component.extend({
  person: null,
  isUnaffiliated: function() {
    var person = this.get('person'),
        unaffiliated = false;

    if (!Ember.isEmpty(person.state) && person.state === 'unaffiliated') {
        unaffiliated = true;
    }

    return unaffiliated;
  }.property('person')
});
