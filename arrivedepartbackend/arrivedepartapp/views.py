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
def getUser(request):
    action = 'getUser'
    jsond = json.loads(request.body)
    action = jsond.get('action', 'nokey')
    userid = jsond.get('userid', 'nokey')
    con = connect()
    cursor = con.cursor()
    cursor.execute(f"SELECT userid, firstname, lastname, username, stcode FROM t_user WHERE t_user.userid = {userid};")
    columns = cursor.description
    respRow = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    resp = sendResponse(200, "Амжилттай", respRow, action)

    return HttpResponse(resp)


@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def passwCheck(request):
    action = "passwCheck"
    con = connect()
    cursor = con.cursor()
    
    if request.method == 'POST':
        jsond = json.loads(request.body)
        action = jsond.get("action", "nokey")
        stcode = jsond.get("stcode", "nokey")
        
        try:
            cursor.execute("SELECT userid,password FROM t_user WHERE stcode = %s", [stcode])
            columns = cursor.description
            respRow = [{columns[index][0]: column for index, column in enumerate(value)} for value in cursor.fetchall()]
            
            if respRow:
                resp = sendResponse(200, "Амжилттай", respRow[0], action)
                return HttpResponse(resp)
            if not respRow:
                cursor.execute("SELECT userid,password FROM t_user")
                columns = cursor.description
                respRow = [{columns[index][0]: column for index, column in enumerate(value)} for value in cursor.fetchall()]
                resp = sendResponse(200, "Хэрэглэгч олдсонгүй", respRow, action)
                return HttpResponse(resp)
            else:
                resp = sendResponse(200, "Зөв утга хийнэ үү", respRow, action)
                return HttpResponse(resp)
        except Exception as e:
            resp = {
                'status': 500,
                'message': 'Амжилтгүй',
                'error': str(e),
                'action': action
            }
            return HttpResponse(resp)

    else:
        resp = {
            'status': 400,
            'message': 'change your method to POST',
            'action': action
        }
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
                'status': 200,
                'message': 'Амжилттай',
                'error': '',
                'action': action
            }
            con.commit()
            return JsonResponse(resp)
        except Exception as e:
            resp = {
                'status': 500,
                'message': 'Амжилтгүй',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': 400,
            'message': 'Амжилтгүй',
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
            cursor.execute(
                "SELECT  userid, firstname, lastname, username, stcode FROM t_user WHERE username = lower(%s) AND password = %s;", (username, password))
            columns = cursor.description
            respRow = [{columns[index][0]: column for index, column in enumerate(
                value)} for value in cursor.fetchall()]
            if len(respRow) == 1:
                resp = sendResponse(200, "Амжилттай", respRow, action)
                return HttpResponse(resp)
            else:
                l = [{"username": username}]
                resp = sendResponse(400, "Амжилтгүй", l, action)
                return HttpResponse(resp)

        except Error as e:
            resp = sendResponse(500, "Амжилтгүй", str(e), action)
                
            return HttpResponse(resp)
    else:
        resp = sendResponse(
            400, "Амжилтгүй", 'Invalid request method. Only POST requests are allowed.', action)
        return HttpResponse(resp)


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
            cursor.execute(
                "SELECT * FROM t_user WHERE username = %s AND password = %s;", (username, password))
            columns = cursor.description
            respRow = [{columns[index][0]: column for index, column in enumerate(
                value)} for value in cursor.fetchall()]
            if len(respRow) == 1:
                resp = sendResponse(200, "Амжилттай", respRow, action)
                return HttpResponse(resp)
            else:
                resp = {
                    'status': '401',
                    'message': 'Амжилтгүй',
                    'error': 'Invalid username or password',
                    'action': action
                }
                return JsonResponse(resp)

        except Error as e:
            resp = {
                'status': 500,
                'message': 'Амжилтгүй',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': 400,
            'message': 'Амжилтгүй',
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
                'status': 200,
                'message': 'Амжилттай',
                'error': '',
                'action': action
            }
            con.commit()
            resp = sendResponse(
                200, "success", "Амжилттай бүртгэлээ", action)
            return HttpResponse(resp)
        except Exception as e:
            resp = {
                'status': 500,
                'message': 'Амжилтгүй',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = {
            'status': 400,
            'message': 'Амжилтгүй',
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
                    , MIN(userid) AS userid
                    --, a1.irsentsag
                    --, a2.yavsantsag
                    , TO_CHAR(a1.irsentsag, 'HH24:MI') AS irsentsag
                    , TO_CHAR(a2.yavsantsag, 'HH24:MI') AS yavsantsag
                    --, EXTRACT(HOUR FROM a1.irsentsag) || ':' || EXTRACT(MINUTE FROM a1.irsentsag) AS irsentsag
                    --, EXTRACT(HOUR FROM a2.yavsantsag) || ':' || EXTRACT(MINUTE FROM a2.yavsantsag) AS yavsantsag
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
    respRow = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    resp = {'resultCode': 200, 'resultMessage': 'success',
            'data': respRow, 'size': len(respRow), 'action': action}
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
        regdate = jsond.get('regdate', 'nokey')
        report = jsond.get('report', 'nokey')

        try:
            cursor.execute(
                f"""SELECT * FROM public.t_report WHERE userid = {userid} AND regdate ='{regdate}' """)
            columns = cursor.description
            respRow = [{columns[index][0]:column for index, column in enumerate(
                value)} for value in cursor.fetchall()]
            if len(respRow) == 0:
                cursor.execute("""
                    INSERT INTO t_report (repid, report, regdate, userid)
                    VALUES (DEFAULT, %s, %s, %s);
                """, [report,regdate, userid])
                con.commit()
                resp = sendResponse(200, "Амжилттай", "", action)
                return HttpResponse(resp)
            else:
                cursor.execute("""
                    UPDATE public.t_report
	                SET report=%s, regdate=NOW()
	                WHERE userid = %s AND regdate = %s ;
                """, [report, userid, regdate])
                con.commit()
                resp = sendResponse(200, "Амжилттай", "", action)
                return HttpResponse(resp)
        except Exception as e:
            resp = {
                'status': 500,
                'message': 'Амжилтгүй',
                'error': str(e),
                'action': action
            }
            return JsonResponse(resp)
    else:
        resp = sendResponse(
            400, "Амжилтгүй", 'Invalid request method. Only POST requests are allowed.', action)
        return JsonResponse(resp)


@ api_view(['POST', "GET", "PUT", "PATCH", "DELETE"])
def reportlist(request):
    action = 'reportlist'
    jsond = json.loads(request.body)
    action = jsond.get('action', 'nokey')
    userid = jsond.get('userid', 'nokey')
    date = jsond.get('regdate', 'nokey')
    con = connect()
    cursor = con.cursor()
    tsql = f"""SELECT * FROM public.t_report WHERE userid = {userid} AND (date '{date}' + time '00:00:00.0000')  <= regdate AND  regdate <= (date '{date}' + time '23:59:59.99999') """
    cursor.execute(tsql)
    columns = cursor.description
    respRow = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    # resp = sendResponse(200, 'Success', respRow, action )
    
    resp = {'resultCode': 200, 'resultMessage':'Success', 'data':respRow, 'action':action}
    
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
        cursor.execute(
            f"""UPDATE t_user SET password = substring(gen_random_uuid()::text, 1, 3)""")
        con.commit()
        resp = sendResponse(200, "Амжилттай", "", action)
        return HttpResponse(resp, content_type='application/json')
    except Exception as e:
        resp = {
            'status': 500,
            'message': 'Амжилтгүй',
            'error': str(e),
            'action': action
        }
        return HttpResponse(resp)
