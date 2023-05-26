from multiprocessing import connection
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

import json
from django.http import JsonResponse

# def registerUsers(request):
#     action = 'registeruser'
#     print(request.method)
    
#     if request.method == 'POST':
#         jsond = json.loads(request.body)
#         action = jsond.get('action', 'nokey')
#         firstname = jsond.get('firstname', 'nokey')
#         lastname = jsond.get('lastname', 'nokey')
#         username = jsond.get('username', 'nokey')
#         password = jsond.get('password', 'nokey')
#         stcode = jsond.get('stcode', 'nokey')

#         try:
#             with connection.cursor() as cursor:
#                 cursor.execute("""
#                     INSERT INTO t_user (firstname, lastname, username, password, stcode)
#                     VALUES (%s, %s, %s, %s, %s);
#                 """, [firstname, lastname, username, password, stcode])
#             resp = {
#                 'status': '200',
#                 'message': 'success',
#                 'error': '',
#                 'action': action
#             }
#             return JsonResponse(resp)
#         except Exception as e:
#             resp = {
#                 'status': '500',
#                 'message': 'error',
#                 'error': str(e),
#                 'action': action
#             }
#             return JsonResponse(resp)
#     else:
#         resp = {
#             'status': '400',
#             'message': 'error',
#             'error': 'Invalid request method. Only POST requests are allowed.',
#             'action': action
#         }
#         return JsonResponse(resp)



# def login(request):
#     jsond = json.loads(request.body)
#     username = jsond.get('phone')
#     password = jsond.get('password')
#     con = connect()
#     cursor = con.cursor()
#     cursor.execute(f"SELECT * FROM t_user WHERE u_phone = '{username}' AND u_password = '{password}';")
#     columns = cursor.description
#     respRow = [{columns[index][0]:column for index,
#                 column in enumerate(value)} for value in cursor.fetchall()]
#     if len(respRow)  == 1 :
#         return HttpResponse('okey')
#     else:
#         return HttpResponse('no')