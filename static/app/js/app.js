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
            success: function (c) {
                console.log('fetch OK');
                if (C.isEmpty()) {
                    console.log('fetch data is empty , Create test data');
                    createTestDataInner();
                }
            },
            error: function () {
                console.log('fetch err, Create test data');
            }
        });

        router.on('route:home', function () {
            router.navigate('items', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showItems', function () {
            //todo : how to handle async
            setTimeout(function () {
                
            console.log('show data') ;
            _.each(C.models, function (item) {
                console.log(item.attributes) ;
            })
            var itemsView = new _this.Views.Items({
                collection: C
            });
            $('#coreCont').html(itemsView.render().$el);

            }, 1000);
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
                    success: function () {
                        console.log('new item c ok') ;
                    },
                    error:function () {
                        console.log('new item c err') ;
                    }
                });
                router.navigate('items', true);
            });

            $('#coreCont').html(itemForm.render().$el);
        });

        router.on('route:editItem', function (id) {
            var item = C.get(id),
                itemForm;

            if (item) {
                itemForm = new _this.Views.ItemForm({
                    model: item
                });

                itemForm.on('form:submitted', function (attrs) {
                    //item.set(attrs);
                    //如果没有wait，会直接修改本地模型
                    //加了waitture，一定要等到服务端返回的数据模型，才会更新本地数据
                    item.save(attrs, {
                        wait: true
                    });
                    router.navigate('items', true);
                });

                $('#coreCont').html(itemForm.render().$el);
            } else {
                router.navigate('items', true);
            }
        });

        router.on('route:other', function (url) {
            router.navigate('items');
        });

        Backbone.history.start();
    }

    ,createTestData: function () {
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
            this.C.create(model, {
                success: function () {
                    console.log('create ok') ;
                },
                error: function () {
                    console.log('create err') ;
                }
            } );
        }, this);
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
