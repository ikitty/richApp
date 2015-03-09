AlexMoney.Collections.Items = Backbone.Collection.extend({
    model: AlexMoney.Models.Item
    //,localStorage: new Backbone.LocalStorage('Money')
    ,url: '/rich/'
    ,calculateTotal: function () {
        var total = {
                'totalAmount':0
                ,'totalGain':0
            };

        _.each(this.models, function (model) {
            total.totalAmount += Number(model.get('amount'));
            var tempGain = Number(model.get('gain'));
            total.totalGain += isNaN(tempGain) ? 0 : tempGain;
        })
        return total ;
    }
});
