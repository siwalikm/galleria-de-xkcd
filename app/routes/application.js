import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  isActive: false,

  ajax: Ember.inject.service(),
  model() {
    const startingId = 1;
    pushToStore(startingId, this);
    return this.store.peekAll('comic');
  },
  actions: {
    loadMore() {
      let lastFetchedId = this.store.peekAll('comic')
      .map(el => parseInt(el.id))
      .sort((a, b) => a - b).pop();
      pushToStore(lastFetchedId+1, this);
    }
  }
});

function pushToStore(fromId, _this) {
  for (let i = fromId; i < fromId+10; i++) {
    _this.get('ajax').request(`https://xkcd.now.sh/${i}`).then((item) => {
      _this.get('store').pushPayload({
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
}