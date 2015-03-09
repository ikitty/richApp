AlexMoney.Views.Item = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tplSingleMoney').html()),

    events: {
        'click .deleteItem': 'onClickDelete'
    },

    initialize: function() {
        this.listenTo(this.model, 'remove', this.remove);
    },

    render: function() {
        console.log('ret: ', this.model.toJSON() );
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    },

    onClickDelete: function(e) {
        e.preventDefault();
        //this.model.collection.remove(this.model);
        this.model.destroy();
    }
});
