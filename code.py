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
    def POST(self, id):
        data = web.data()
        d = json.loads(data)
        row_id = DB.create(**d)

        d = DB.get_by_id(row_id)
        return json.dumps(d)

    #如果urls中有匹配字符，这里必须写形参。否则会报错
    def GET(self, id):
        ret = []
        d = DB.get_all()
        for item in d:
            ret.append(dict(item))

        return json.dumps(ret)

    def PUT(self, id):
        data = web.data()
        d = json.loads(data)
        DB.update(**d)

        #使用jsonLoads之后才能正常访问,要使用d['name']的形式访问d.name是无法访问
        ret = DB.get_by_id(d['id'])
        return json.dumps(d)

    def DELETE(self, id):
        DB.delete(id)
        ret = {
            "status":"ok"
        }
        #根据测试，这里随便返回一个json都可以
        return json.dumps(ret)

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
