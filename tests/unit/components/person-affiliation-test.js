import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('person-affiliation', {
});

test('it takes person object & returns things like title, jurisdiction, etc.',
     function(assert) {

  assert.expect(1);

  var component = this.subject(),
      person = { 'full_name': 'Bernard Sanders',
                 'political_position_title': 'Senator',
                 'most_recent_district': '',
                 'party': 'Independent',
                 'state': 'vt' };

  var expectedDetails = 'Senator, Vt, Independent\n';

  Ember.run(function() {
    component.set('person', person);
  });

  assert.equal(this.$().text(), expectedDetails);
});
