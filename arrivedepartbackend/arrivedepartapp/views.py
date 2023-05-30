from django.shortcuts import render
from django.http import HttpResponse
import psycopg2
import json
import json
from django.http import JsonResponse
from arrivedepartbackend.settings import *
from rest_framework.decorators import api_view
from django.db import Error
import datetime
# Create your views here.

@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def getUsers(request):
    action = 'getUsers'
    jsond = json.loads(request.body)
    action = jsond.get('action', 'nokey')
    userid = jsond.get('userid', 'nokey')
    con = connect()
    cursor = con.cursor()
    cursor.execute(f"SELECT * FROM t_user WHERE t_user.userid = {userid};")
    columns = cursor.description
    respRow = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    resp = sendResponse('200', "success", respRow, action)

    return HttpResponse(resp)


@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def registerUsers(request):
    action = 'registeruser'
    con = connect()
    cursor = con.cursor()
    print(request.method)
    
    if request.method == 'POST':
        jsond = json.loads(request.body)
        action = jsond.get('action', 'nokey')
        firstname = jsond.get('firstname', 'nokey')
        lastname = jsond.get('lastname', 'nokey')
        username = jsond.get('username', 'nokey')
        password = jsond.get('password', 'nokey')
        stcode = jsond.get('stcode', 'nokey')

        try:
            cursor.execute("""
                INSERT INTO t_user (userid, firstname, lastname, username, password, stcode)
                VALUES (DEFAULT, %s, %s, %s, %s, %s);
            """, [firstname, lastname, username, password, stcode])
            resp = {
                'status': '200',
                'message': 'success',
                'error': '',
                'action': action
            }
            con.commit()
            return JsonResponse(resp)
        except Exception as e:
            resp = {
                'status': '500',
                'message': 'error',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': '400',
            'message': 'error',
            'error': 'Invalid request method. Only POST requests are allowed.',
            'action': action
        }
        return JsonResponse(resp)
    

@ api_view(['POST', 'GET', "PUT", "PATCH", "DELETE"])
def login(request):
    action = 'login'
    con = connect()
    cursor = con.cursor()
    print(request.method)

    if request.method == 'POST':
        jsond = json.loads(request.body)
        action = jsond.get('action', 'nokey')
        username = jsond.get('username', 'nokey')
        password = jsond.get('password', 'nokey')
        try:
            cursor.execute("SELECT * FROM t_user WHERE username = %s AND password = %s;", (username, password))
            columns = cursor.description
            respRow = [{columns[index][0]: column for index, column in enumerate(value)} for value in cursor.fetchall()]
            if len(respRow) == 1:
                resp = sendResponse('200', "success", respRow, action)
                return HttpResponse(resp)
            else:
                resp = {
                    'status': '401',
                    'message': 'error',
                    'error': 'Invalid username or password',
                    'action': action
                }
                return JsonResponse(resp)

            
        except Error as e:
            resp = {
                'status': '500',
                'message': 'error',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': '400',
            'message': 'error',
            'error': 'Invalid request method. Only POST requests are allowed.',
            'action': action
        }
        return JsonResponse(resp)

@ api_view(['POST', 'GET', "PUT", "PATCH", "DELETE"])    
def sambuulogin(request):
    action = 'sambuulogin'
    con = connect()
    cursor = con.cursor()
    
    if request.method == 'POST':
        jsond = json.loads(request.body)
        action = jsond.get('action', 'nokey')
        username = jsond.get('username', 'nokey')
        password = jsond.get('password', 'nokey')
        try:
            cursor.execute("SELECT * FROM t_user WHERE username = %s AND password = %s;", (username, password))
            columns = cursor.description
            respRow = [{columns[index][0]: column for index, column in enumerate(value)} for value in cursor.fetchall()]
            if len(respRow) == 1:
                resp = sendResponse('200', "success", respRow, action)
                return HttpResponse(resp)
            else:
                resp = {
                    'status': '401',
                    'message': 'error',
                    'error': 'Invalid username or password',
                    'action': action
                }
                return JsonResponse(resp)
            
        except Error as e:
            resp = {
                'status': '500',
                'message': 'error',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': '400',
            'message': 'error',
            'error': 'Invalid request method. Only POST requests are allowed.',
            'action': action
        }
        return JsonResponse(resp)


@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def arrdep(request):
    action = 'arrdep'
    con = connect()
    cursor = con.cursor()
    
    if request.method == 'POST':
        jsond = json.loads(request.body)
        action = jsond.get('action', 'nokey')
        userid = jsond.get('userid', 'nokey')
        codearr = jsond.get('codearr', 'nokey')

        try:
            cursor.execute("""
                INSERT INTO t_arr (arrid, userid, regdate, codearr)
                VALUES (DEFAULT, %s, NOW(), %s);
            """, [userid, codearr])
            resp = {
                'status': '200',
                'message': 'success',
                'error': '',
                'action': action
            }
            con.commit()
            resp = sendResponse('200', "success", "амжилттай бүртгэлээ", action)
            return HttpResponse(resp)
        except Exception as e:
            resp = {
                'status': '500',
                'message': 'error',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': '400',
            'message': 'error',
            'error': 'Invalid request method. Only POST requests are allowed.',
            'action': action
        }
        return JsonResponse(resp)
# dsadasddasdasdsa

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)


@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def arrlist(request):
    action = 'arrlist'
    jsond = json.loads(request.body)
    action = jsond.get('action', 'nokey')
    userid = jsond.get('userid', 'nokey')
    con = connect()
    cursor = con.cursor()
    cursor.execute(f"""SELECT 
                    COALESCE(a1.regdate, a2.regdate) regdate
                    --, a1.irsentsag
                    --, a2.yavsantsag
                    , EXTRACT(HOUR FROM a1.irsentsag) || ':' || EXTRACT(MINUTE FROM a1.irsentsag) AS irsentsag
                    , EXTRACT(HOUR FROM a2.yavsantsag) || ':' || EXTRACT(MINUTE FROM a2.yavsantsag) AS yavsantsag
                    FROM (
                    Select date(regdate) regdate , min(regdate) irsentsag ,min(codearr) from t_arr 
                    where userid = {userid} and codearr = 1
                    group by date(regdate)
                    order by date(regdate)
                    ) a1 full join (
                    Select date(regdate) as regdate, max(regdate) yavsantsag ,max(codearr) from t_arr 
                    where userid = {userid} and codearr = 2
                    group by date(regdate)
                    order by date(regdate)
                    ) a2 on a1.regdate = a2.regdate""")
    columns = cursor.description
    respRow = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
    resp = {'resultcode': '200', 'resultmessage': 'success', 'data': respRow, 'size': len(respRow), 'action': action}
    # times = resp['data'][0]['irsentsag']
    # print(times.strftime("%m/%d/%Y, %H:%M:%S"))
    json_resp = json.dumps(resp, cls=CustomJSONEncoder)
    return HttpResponse(json_resp, content_type='application/json')

 
@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def addreport(request):
    action = 'addreport'
    con = connect()
    cursor = con.cursor()
    
    if request.method == 'POST':
        jsond = json.loads(request.body)
        action = jsond.get('action', 'nokey')
        userid = jsond.get('userid', 'nokey')
        date = jsond.get('date', 'nokey')
        report = jsond.get('report', 'nokey')

        try:
            cursor.execute(f"""SELECT * FROM public.t_report WHERE repdate ={date} AND userid = {userid}""")
            columns = cursor.description
            respRow = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
            if len(respRow) == 0:
                cursor.execute("""
                    INSERT INTO t_report (repid, report, repdate, userid)
                    VALUES (DEFAULT, %s, NOW(), %s);
                """, [report, userid])
                con.commit()
                resp = sendResponse('200', "success", "", action)
                return HttpResponse(resp)
            else:
                cursor.execute("""
                    UPDATE public.t_report
	                SET report=%s, repdate=NOW()
	                WHERE repdate = %s AND userid = %s;
                """, [report, date, userid])
                con.commit()
                resp = sendResponse('200', "success", "", action)
                return HttpResponse(resp)
        except Exception as e:
            resp = {
                'status': '500',
                'message': 'error',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': '400',
            'message': 'error',
            'error': 'Invalid request method. Only POST requests are allowed.',
            'action': action
        }
        return JsonResponse(resp)
    

@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def reportlist(request):
    action = 'reportlist'
    jsond = json.loads(request.body)
    action = jsond.get('action', 'nokey')
    userid = jsond.get('userid', 'nokey')
    date = jsond.get('date', 'nokey')
    con = connect()
    cursor = con.cursor()
    cursor.execute(f"""SELECT * FROM public.t_report WHERE repdate ={date}  AND userid = {userid}""")
    columns = cursor.description
    respRow = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
    resp = {'resultcode': '200', 'resultmessage': 'success', 'data': respRow, 'size': len(respRow), 'action': action}
    # times = resp['data'][0]['irsentsag']
    # print(times.strftime("%m/%d/%Y, %H:%M:%S"))
    json_resp = json.dumps(resp, cls=CustomJSONEncoder)
    return HttpResponse(json_resp, content_type='application/json')


@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def passwordchange(request):
    action = 'passwordchange'
    try:
        con = connect()
        cursor = con.cursor()
        cursor.execute(f"""UPDATE t_user SET password = substring(gen_random_uuid()::text, 1, 3)""")
        con.commit()
        resp = sendResponse('200', "success", "", action)
        return HttpResponse(resp, content_type='application/json')
    except Exception as e:
            resp = {
                'status': '500',
                'message': 'error',
                'error': str(e),
                'action': action
            }
            return HttpResponse(resp)


