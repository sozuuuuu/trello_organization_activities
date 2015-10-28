import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({
  tagName: 'script',
  attributeBindings: ['src'],
  src: `https://trello.com/1/client.js?key=${ENV['trelloApplicationKey']}`
});
