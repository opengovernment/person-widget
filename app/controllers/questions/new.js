import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  selectedPerson: Ember.computed.alias('controllers.application.attrs.person'),
  errorMessage: null,
  titleIsValid: Ember.computed('model.title', function() {
    var title = this.get('model.title');

    return (!Ember.isEmpty(title) && title.length > 2);
  }),
  emailIsValid: Ember.computed('model.user.email', function() {
    var email = this.get('model.user.email'),
        re = new RegExp(/\S+@\S+\.\S+/);

    return (!Ember.isEmpty(email) && re.test(email));
  }),
  isValid: Ember.computed('titleIsValid', 'emailIsValid', function() {
    return (this.get('titleIsValid') && this.get('emailIsValid'));
  })
});
