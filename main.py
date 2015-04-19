import os
import hashlib
from google.appengine.ext import webapp, db 
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
from gaesessions import get_current_session
from django.utils import simplejson

class Member(db.Model):
    ID = db.TextProperty(required=True) 
    job = db.IntegerProperty(required=True)
    lv = db.IntegerProperty(required=True)
    date = db.DateTimeProperty(auto_now_add=True)
    
class MemberOP(object):
    @staticmethod
    def CreateMember(M_ID, M_job, M_lv):
        flag = False
        ms = Member.all()
        for mtmp in ms:
            if mtmp.ID == M_ID:
                flag = True
                m = mtmp
        if not flag:
            m = Member(ID = M_ID, job = int(M_job), lv = int(M_lv))
        else:
            m.ID = M_ID
            m.job = int(M_job)
            m.lv = int(M_lv)
        m.put()
    
    @staticmethod
    def UpdateMember(M_ID, M_job, M_lv, key):
        _key = db.Key.from_path('Member', int(key))
        m = db.get(_key)
        m.ID = M_ID
        m.job = int(M_job)
        m.lv = int(M_lv)
        m.put()
    
    @staticmethod
    def DeleteMember(key):
        _key = db.Key.from_path('Member', int(key))
        m = db.get(_key)
        m.delete()
    
    @staticmethod
    def MemberList(admin = True, cls = -1):
        ms = Member.all()
        query = []
        for m in ms:
            l = {'key': int(m.key().id()), 'id': m.ID, 'job': int(m.job), 'lv': int(m.lv), 'date': m.date.strftime("%Y-%m-%d %H:%M:%S")}
            if cls != "" and int(l['job']) == int(cls):
                query.append(l)
            elif cls != "" and int(l['job']) != int(cls):
                pass
            else:
                query.append(l)
        result = sorted(query, key=lambda k:k['lv'], reverse = True)
        
        if not admin:
            sum1 = 0
            for l in result:
                sum1 += l['lv']
                if int(l['lv']) >= 80:
                    l['lv'] = 1
                else:
                    l['lv'] = 0
            query = [result]
            if len(result) > 0:
                dic = {'aver': float(sum1) / float(len(result))}
                query.append(dic)
            return simplejson.dumps(query)
        return simplejson.dumps(result)
    
    @staticmethod
    def MemberByID(key):
        _key = db.Key.from_path('Member', int(key))
        m = db.get(_key)
        result = {'key': int(m.key().id()), 'id': m.ID, 'job': int(m.job), 'lv': int(m.lv)}
        return simplejson.dumps(result)
       
class Authentication(webapp.RequestHandler):
    def render_template(self, mfile, tplval = None):
        path = os.path.join(os.path.dirname(__file__), 'tpl', mfile)
        self.response.out.write(template.render(path, tplval))
        
    def get(self):
        session = get_current_session()
        islogin = session.get('islogin', False)
        isadmin = session.get('isadmin', False)
        
        if islogin:
            tplval = {}
            if isadmin:
                tplval['isadmin'] = True
            else:
                tplval['isadmin'] = False
                
            self.render_template("index.html", tplval)
        else:
            self.render_template("login.html")
            
class Login(webapp.RequestHandler):
    ADMIN_ACT = "jim001323"
    ADMIN_PWD = "good555"
    MEMBER_ACT = "FRC520"
    MEMBER_PWD = "25584571"
    
    def encode(self, mstr):
        md5 = hashlib.md5()
        md5.update(mstr)
        return md5.hexdigest()
        
    def get(self):
        session = get_current_session()
        islogin = session.get('islogin', False)
        if islogin:
            self.redirect('/')
        
    def post(self):
        account = self.encode(self.request.get('a'))
        password = self.encode(self.request.get('p'))
        
        session = get_current_session()
        if account == self.encode(self.ADMIN_ACT) and password == self.encode(self.ADMIN_PWD):
            session['islogin'] = True
            session['isadmin'] = True
            self.response.out.write('200')
        elif account == self.encode(self.MEMBER_ACT) and password == self.encode(self.MEMBER_PWD):
            session['islogin'] = True
            session['isadmin'] = False
            self.response.out.write('200')
        else:
            session['islogin'] = False
            self.response.out.write('401')
            
class Logout(webapp.RequestHandler):
    def post(self):
        session = get_current_session()
        if session.is_active():
            session.terminate()
    def get(self):
        self.post()
        self.redirect('/')
            
class Data(webapp.RequestHandler):
    def render_template(self, mfile, tplval = None):
        path = os.path.join(os.path.dirname(__file__), 'tpl', mfile)
        self.response.out.write(template.render(path, tplval))
            
    def post(self):
        session = get_current_session()
        islogin = session.get('islogin', False)
        isadmin = session.get('isadmin', False)
        
        action = self.request.get('a')
        if islogin and isadmin:
            if action == 'ADD':
                M_ID = self.request.get('id')
                M_job = self.request.get('job')
                M_lv = self.request.get('lv')
                MemberOP.CreateMember(M_ID, M_job, M_lv)
            elif action == 'UPDATE':
                M_ID = self.request.get('id')
                M_job = self.request.get('job')
                M_lv = self.request.get('lv')
                key = self.request.get('key')
                MemberOP.UpdateMember(M_ID, M_job, M_lv, key)
            elif action == 'DEL':
                MemberOP.DeleteMember(self.request.get('key'))
            elif action == 'LIST':
                self.response.out.write(MemberOP.MemberList(True, self.request.get('cls')))
            elif action == 'LID':
                self.response.out.write(MemberOP.MemberByID(self.request.get('key')))
        elif islogin:
            if action == 'LIST':
                self.response.out.write(MemberOP.MemberList(False, self.request.get('cls')))
            
            
application = webapp.WSGIApplication([('/login', Login),
                                      ('/logout', Logout),
                                      ('/data', Data),
                                      ('/.*', Authentication)],
                                     debug=True)
def main():
    run_wsgi_app(application)
 
if __name__ == "__main__":
    main()