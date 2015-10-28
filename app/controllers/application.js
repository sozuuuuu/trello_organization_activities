import Ember from 'ember';

export default Ember.Controller.extend({
  apiKey: null,
  organizationName: '',
  members: Ember.observer('organization', function() {
    Trello.get('/organization/' + this.get('organization.id') + '/members').then(
      (members) => {
        this.set('members', members);
      }
    );
  }),

  init: function() {
    this._super(...arguments);
    if (Trello.authorized()) {
      this.set('token', Trello.token());
    }
  },

  actions: {
    authorize: function() {
      if (Trello.authorized()) return;
      Trello.authorize();
      if (Trello.authorized()) {
        this.send('authSuccess');
      } else {
        this.send('authFailed');
      }
    },

    authFailed: function() {
      console.error('trello auth failed');
    },

    authSuccess: function() {
      this.set('token', Trello.token());
      console.info('trello auth success');
    },

    lookupOrganization: function() {
      const organizationName = this.get('organizationName');
      Trello.get('/organizations/' + organizationName).then(
        (organization) => {
          this.set('organization', organization);
        },
        () => {
          console.error('no organization found');
        }
      );
    }
  }
});
