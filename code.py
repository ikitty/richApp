#!/usr/bin/python
#coding:utf-8

import json
import web
from mod_sqlite import DB
from web.contrib.template import render_mako
#todo need import sqlite again?
import sqlite3

render = render_mako(
        directories=['templates'],
        input_encoding='utf-8',
        output_encoding='utf-8',
        )

urls = (
    '/', 'Index',
    #'/rich/', 'Rich',
    '/rich/(\d+)?', 'Rich',
)

class Index:
    def GET(self):
        #index 表示模板名
        return render.index(name=['a', 'b'])


class Rich:
    #如果urls中有匹配字符，这里必须写形参。否则会报错
    def GET(self, id):
        ret = []
        d = DB.get_all()
        for item in d:
            ret.append(dict(item))

        return json.dumps(ret)

    def POST(self, id):
        data = web.data()
        d = json.loads(data)
        DB.create(**d)
        return 'success'

    def DELETE(self, id):
        DB.delete(id)

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
