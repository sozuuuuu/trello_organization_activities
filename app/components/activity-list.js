import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  activities: null,
  today: new Date(Date.now()),
});
