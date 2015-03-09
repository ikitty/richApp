#!/usr/bin/python
#coding:utf-8
import json

from mod_sqlite import DB

testcase = 1

if testcase == 1:
    iter_item = DB.get_all()
    for item in iter_item:
        print dict(item)

#delete
if testcase == 2:
    DB.delete(1)
    DB.delete(2)
