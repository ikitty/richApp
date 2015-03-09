AlexMoney.Views.Items = Backbone.View.extend({
    template: _.template($('#tplAllMoney').html()),

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
