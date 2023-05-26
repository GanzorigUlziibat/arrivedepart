from django.shortcuts import render
from django.http import HttpResponse
import psycopg2
import json
from arrivedepartbackend.settings import *
# Create your views here.

def getUsers(request):
    action = 'getUsers'
    con = connect()
    cursor = con.cursor()
    cursor.execute("SELECT * FROM t_user;")
    columns = cursor.description
    respRow = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    resp = sendResponse('200', "success", respRow, action)

    return HttpResponse(resp)