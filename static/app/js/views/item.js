AlexMoney.Views.Item = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tplSingleMoney').html()),

    events: {
        'click .deleteItem': 'onClickDelete'
    },

    initialize: function() {
        //为什么这里监听remove事件也可以呢，model没有该事件啊
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    },

    onClickDelete: function(e) {
        e.preventDefault();
        //this.model.collection.remove(this.model);
        //和save一样，传入waittrue配置
        this.model.destroy({
            wait:true
            ,success:function () {
                console.log('del ok') ;
            }
            ,error: function () {
                console.log('del err') ;
            }

        });
    }
});
