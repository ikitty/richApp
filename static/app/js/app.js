/**
 * app.js
 *
 * @description core js of app
 **/

//set template syntax
_.templateSettings = {  
    evaluate : /\{%([\s\S]+?)\%\}/g,  
    interpolate : /\{%=([\s\S]+?)\%\}/g,  
    escape : /\{%-([\s\S]+?)%\}/g  
} ;

window.AlexMoney = {
    Models: {},
    Collections: {},
    Views: {},

    start: function (data) {
        //var items = new AlexMoney.Collections.Items(data.defaults),
        //var items = new this.Collections.Items(data.defaults),

        var _this = this 
            ,router = new this.Router()
            ,C = new AlexMoney.Collections.Items()
            ; 
        var createTestDataInner =  function () {
            _.each([{
                    "type": 'JiJin'
                    ,"time": '2015-03-05'
                    ,"amount": 10000
                    ,"gain": 1600
                }
                ,{
                    "type": 'JiJin'
                    ,"time": '2015-03-05'
                    ,"amount": 10000
                    ,"gain": 1700
                }
            ], function (model) {
                C.create(model, {
                    success: function () {
                        console.log('create ok') ;
                    },
                    error: function () {
                        console.log('create err') ;
                    }
                } );
            }, this);
        };

        this.C = C ;
        C.fetch({
            //reset all models ，and will trigger reset evt
            //reset:true,
            success: function (c) {
                console.log('fetch all data OK');
                if (C.isEmpty()) {
                    console.log('fetch data is empty , Create test data');
                    createTestDataInner();
                }
            },
            error: function () {
                console.log('fetch err');
            }
        });

        router.on('route:home', function () {
            router.navigate('items', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showItems', function () {
            var itemsView = new _this.Views.Items({
                collection: C
            });
            $('#coreCont').html(itemsView.render().$el);
        });

        router.on('route:newItem', function () {
            var itemForm = new _this.Views.ItemForm({
                model: new _this.Models.Item()
            });

            itemForm.on('form:submitted', function (attrs) {
                //attrs.id = items.isEmpty() ? 1 : (_.max(items.pluck('id')) + 1);
                //items.add(attrs);

                //create does not need id
                //attrs.id = _.max(C.pluck('id')) + 1 ;
                C.create(attrs ,{
                    wait:true,
                    success: function () {
                        console.log('new item c ok') ;
                        router.navigate('items', true);
                    },
                    error:function () {
                        console.log('new item c err') ;
                    }
                });
            });

            $('#coreCont').html(itemForm.render().$el);
        });

        router.on('route:editItem', function (id) {
            var item = C.get(id),
                itemForm;

            //todo   页面刷新导致无法获取item
            if (item) {
                //get data from serve
                item.fetch({
                    //reset: true,
                    success: function (model, res) {
                        console.log('fetch model ok');
                        itemForm = new _this.Views.ItemForm({
                            model: item
                        });
                        itemForm.on('form:submitted', function (attrs) {
                            //如果没有wait，会直接修改本地模型
                            //加了waitture，一定要等到服务端返回的数据模型，才会更新本地数据
                            item.save(attrs, {
                                wait: true
                                ,success: function () {
                                    console.log('edit OK');
                                    router.navigate('items', true);
                                }
                            });
                        });
                        $('#coreCont').html(itemForm.render().$el);
                    },
                    error: function () {
                        console.log('fetch model err');
                    }
                });
            } else {
                router.navigate('items', true);
            }
        });

        router.on('route:other', function (url) {
            console.log('not found, jump to home');
            router.navigate('items');
        });

        Backbone.history.start();
    }
};

//=====from router.js
AlexMoney.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'items': 'showItems',
        'items/new': 'newItem',
        'items/edit/:id': 'editItem'
        ,'*other': 'other'
    }
});
