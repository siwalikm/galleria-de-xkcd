import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    let _this = this;
    document.onscroll = function () {
      if (document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight) {
        // console.log('scrolled to end');
        _this.sendAction();
      }
    }
  }
});
