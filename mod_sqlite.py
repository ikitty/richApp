#!/usr/bin/python
#coding:utf-8
import web

#config
dbname = 'app.db'
tname = 'rich'


db = web.database(dbn='sqlite', db=dbname)

class DB(object):
    @staticmethod
    def create(**kwargs):
        #kwargs['seqname'] = 'id'
        return db.insert(tname, **kwargs)

    @staticmethod
    def get_by_id(id):
        itertodo = db.select(tname, where="id=$id", vars=locals())
        return next(iter(itertodo), None)

    @staticmethod
    def get_all():
        return db.select(tname)

    @staticmethod
    def update(**kwargs):
        db.update(tname, where="id=$id", vars={"id": kwargs.pop('id')}, **kwargs)

    @staticmethod
    def delete(id):
        db.delete(tname, where="id=$id", vars=locals())

    @staticmethod
    def clear():
        db.delete(tname, where="1=1", vars=locals())
