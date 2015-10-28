import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super(...arguments);
    Trello.get('/members/' + this.get('member.id') + '/actions').then(
      (activities) => {
        this.set('activities', activities)
      }
    );
  },
  activitiesOfToday: Ember.computed('activities', function() {
    if (!this.get('activities')) { return []; }
    return this.get('activities').filter((activity) => {
      const dateOfActivity = new Date(Date.parse(activity.date));
      const today = this.get('today');
      return dateOfActivity.toDateString() === today.toDateString();
    });
  }),
  activitiesOfTodayCount: Ember.computed('activitiesOfToday', function() {
    return this.get('activitiesOfToday').length;
  })
});
