import Ember from 'ember';
import { sanitize } from 'ember-sanitize/utils/sanitize';
import Question from '../../models/question';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.controllerFor('application').set('duringQuestionSteps', true);
    this.render({ into: 'application', outlet: 'question-steps' });
  },
  model: function() {
    var title = this.controllerFor('application').get('attrs.question.summary'),
        body = this.controllerFor('application').get('attrs.question.body');

    return Question.create({ title: this.format(title),
                             body: this.format(body),
                             originating_url: document.URL,
                             user: { email: null }
                           });
  },
  setAddressFromIp: function() {
    var geoAddress,
        freeGeoIp = ajax('http://freegeoip.net/json/'),
        _this = this;

    freeGeoIp.then(function(geoData) {
      geoAddress = geoData.city;
      if (geoData.city !== geoData.region_name) {
        geoAddress = geoAddress + ', ' + geoData.region_name;
      }

      if (geoData.country_code !== 'US') {
        geoAddress = geoAddress + ', ' + geoData.country_name;
      } else {
        geoAddress = geoData.zip_code;
      }
      _this.controllerFor('application').set('address', geoAddress);
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    this.setAddressFromIp();
  },
  format: function(string) {
    if (!Ember.isEmpty(string)) {
      string = sanitize(string).replace(/\s+/g,' ').trim();
    }

    return string;
  },
  locationHostname: function() {
    // necessary for testing of guessPartner
    return window.location.hostname;
  },
  locationProtocol: function() {
    // necessary for testing of guessPartner
    return window.location.protocol;
  },
  guessPartner: function(input) {
    var guessedPartner;

    if (!Ember.isEmpty(input)) {
      guessedPartner = input;
    } else {
      guessedPartner = {};
    }

    if (Ember.isEmpty(guessedPartner.name)) {
      var shortHostname = this.locationHostname().replace('www.', '');
      guessedPartner.name = Ember.String.capitalize(shortHostname);
    }

    if (Ember.isEmpty(guessedPartner.url)) {
      var shortUrl = this.locationProtocol() + '//' + this.locationHostname();
      guessedPartner.url = shortUrl;
    }

    return guessedPartner;
  },
  actions: {
    save: function() {
      if (this.controllerFor('questions.new').get('isValid')) {
        this.set('errorMessage', null);

        var question = this.controllerFor('questions.new').get('model');

        var person = this.controllerFor('application').get('attrs.person');
        question.person_id = person.id;

        var address = this.controllerFor('application').get('address');

        var partner = this.guessPartner(this.controllerFor('application')
                                         .get('attrs.partner'));
        partner.submitted_address = address;

        var payLoad = {
          question: question,
          partner: partner
        };

        var url;
        if (person.state !== 'unaffiliated') {
          url = person.state;
        }
        url = url + '/questions.json';

        this.apijax.POST(url, payLoad);

        this.transitionTo('thanks');
      } else {
        this.controllerFor('questions.new').set('errorMessage',
                 'Question summary and your email must be filled out. Email must be valid.');
      }

      return false;
    }
  }
});
