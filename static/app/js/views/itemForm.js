AlexMoney.Views.ItemForm = Backbone.View.extend({
    template: _.template($('#tplNewItem').html()),

    events: {
        'submit .contract-form': 'onFormSubmit'
    },

    render: function () {
        var html = this.template(_.extend(this.model.toJSON(), {
            isNew: this.model.isNew()
        }));
        this.$el.append(html);
        return this;
    },

    onFormSubmit: function (e) {
        e.preventDefault();
        this.trigger('form:submitted', {
            time: this.$('.inputTime').val()
            ,type: this.$('.inputType').val()
            ,amount: this.$('.inputAmount').val()
            ,gain: this.$('.inputGain').val()
        });
    }
});
