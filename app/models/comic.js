import DS from 'ember-data';

export default DS.Model.extend({
    img: DS.attr('string'),
    title: DS.attr('string'),
    alt: DS.attr('string'),
});
