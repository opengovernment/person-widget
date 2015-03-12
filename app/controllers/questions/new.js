import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  selectedPerson: Ember.computed.alias('controllers.application.attrs.person'),
  errorMessage: null,
  titleIsValid: function() {
    var title = this.get('model.title');

    return (!Ember.isEmpty(title) && title.length > 2);
  }.property('model.title'),
  emailIsValid: function() {
    var email = this.get('model.user.email'),
        re = new RegExp(/\S+@\S+\.\S+/);

    return (!Ember.isEmpty(email) && re.test(email));
  }.property('model.user.email'),
  isValid: function() {
    return (this.get('titleIsValid') && this.get('emailIsValid'));
  }.property('titleIsValid', 'emailIsValid')
});
