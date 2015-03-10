#!/usr/bin/python
#coding:utf-8
import json

import sys
from mod_sqlite import DB


arg = sys.argv

if len(arg) == 1:
    iter_item = DB.get_all()
    for item in iter_item:
        print dict(item)
else:
    if arg[1] == '1':
        DB.clear()
        print 'cleared data'
    elif arg[1] == '2':
        print 2
