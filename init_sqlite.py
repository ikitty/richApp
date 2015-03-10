#!/usr/bin/python
#coding:utf-8

import sqlite3

dbname = 'app.db'
tname = 'rich'

con = sqlite3.connect(dbname)
cur = con.cursor()

try:
    cur.execute('CREATE TABLE IF NOT EXISTS ' + tname +'(id integer PRIMARY KEY AUTOINCREMENT, time text, type text, amount number default 0, gain number) ;')
    con.commit()
except Exception as e:
    print e

con.commit()

cur.close()
con.close()
