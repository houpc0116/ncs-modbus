# from flask_app import FlaskApp
from flask import Flask, url_for
from local_html import html_loginout, html_dashboard

from mongodb_task import MongoDB_Task

import os,json
class MainApp:
    def __init__(self):

        self.send_all = [False] * 4
        self.all_json = {}

        self.mongo_app = MongoDB_Task()

        self.flask_app = Flask(__name__)

        self._html_loginout = html_loginout.HTML_LOGINOUT("Loginout", self.mongo_app)  # (New)
        self._html_dashboard = html_dashboard.HTML_DASHBOARD("Dashboard", self.mongo_app)  # (New)

        self.flask_app.register_blueprint(self._html_loginout) # (New)
        self.flask_app.register_blueprint(self._html_dashboard)# (New)

        #ipv4 = self._html_network.get_ipv4_method()
        #print(f"ipv4={ipv4}")
        #os.system("chvt 1")
        #os.system(f"clear > /dev/tty1")
        #os.system(f"echo \" \" > /dev/tty1")
        #os.system(f"echo \"eth 1: \n\tIP = {ipv4[0]['addr']} \n\tMASK = {ipv4[0]['mask']} \n\tGATEWAY = {ipv4[0]['gateway']}\n\"> /dev/tty1")
        #os.system(f"echo \"eth 2: \n\tIP = {ipv4[1]['addr']} \n\tMASK = {ipv4[1]['mask']} \n\tGATEWAY = {ipv4[1]['gateway']}\"> /dev/tty1")
        #os.system(f"echo \" \" > /dev/tty1")
        # print(f"ipv4={ipv4}")
    def get_app(self):
        return self.flask_app

    def run(self, host='0.0.0.0', debug=True, use_reloader=False):
        self.flask_app.run(debug=debug, host=host)

#if __name__ == '__main__':
main_app = MainApp()
app = main_app.get_app()
#main_app.run()
#main_app.run(debug=True,host='0.0.0.0', port=5001)