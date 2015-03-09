AlexMoney.Models.Item = Backbone.Model.extend({
    defaults: {
        type: '基金'
        ,time: null
        ,amount: 0
        ,gain: 0
    }
    //如果这里不设置urlRoot，c中设置url即可， 也可以自动追加id
    //,urlRoot: '/rich/'
});
