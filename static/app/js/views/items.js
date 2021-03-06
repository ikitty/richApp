AlexMoney.Views.Items = Backbone.View.extend({
    template: _.template($('#tplAllMoney').html()),

    initialize: function () {
        //fetch 会触发add事件
        this.listenTo(this.collection, 'add', this.render);
        //this.listenTo(this.collection, 'reset', this.render);
    },
    renderOne: function(model) {
        var itemView = new AlexMoney.Views.Item({model: model});
        //hard code?
        this.$('#moneyCont').append(itemView.render().$el);
    },

    render: function() {
        var totalJson = this.collection.calculateTotal();
        var html = this.template(totalJson);
        this.$el.html(html);

        this.collection.each(this.renderOne, this);
        return this;
    }
    ,renderTotal: function () {

    }
});
