import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  ajax: Ember.inject.service(),
  model() {
    for (let i=1; i <= 10; i++) {
      this.get('ajax').request(`https://xkcd.now.sh/${i}`).then((item)=> {        
        this.get('store').pushPayload({
          'data': [{
            id: item.num,
            type: 'comic',
            attributes: {
              title: item.title,
              img: item.img,
              alt: item.alt,
            }
          }]
        });
      });
    }
    return this.store.peekAll('comic');
  }
});
