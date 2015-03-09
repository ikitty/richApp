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

        this.C = C ;
        C.fetch({
            success: function (c) {
                console.log('fetch ok');
                if (C.isEmpty()) {
                    console.log('C is empty then create test data');
                    _this.createTestData();
                }
            },
            error: function () {
                console.log('fetch err, then create test data');
                _this.createTestData();
            }
        });
        this.createTestData();

        router.on('route:home', function () {
            router.navigate('items', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showItems', function () {
            //todo : how to handle async
            setTimeout(function () {
                
            var itemsView = new _this.Views.Items({
                collection: C
            });

            $('#coreCont').html(itemsView.render().$el);
            }, 500);
        });

        router.on('route:newItem', function () {
            var itemForm = new _this.Views.ItemForm({
                model: new _this.Models.Item()
            });

            itemForm.on('form:submitted', function (attrs) {
                //attrs.id = items.isEmpty() ? 1 : (_.max(items.pluck('id')) + 1);
                //items.add(attrs);

                attrs.id = _.max(C.pluck('id')) + 1 ;
                C.create(attrs);
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
                    item.save(attrs);
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
                type: '基金'
                ,time: '2015-03-05'
                ,amount: 20000
                ,gain: 2600
            }
            ,{
                type: '股票'
                ,time: '2015-03-03'
                ,amount: 50000
                ,gain: 6300
            }
        ], function (model) {
            this.C.create(model, {
                success: function () {
                    console.log('created ok');
                    console.log(arguments);
                },
                error: function () {
                    console.log('create data error');
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
