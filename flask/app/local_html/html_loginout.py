from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_user, current_user, login_required, logout_user

class HTML_LOGINOUT(Blueprint):
    def __init__(self, name,DB):
        super().__init__(name, __name__)
        self.mydb = DB

        @self.route('/login', methods=['GET'])
        def login():
            # 登入驗証(待寫...)
            return render_template('login.html')

        # 2023.12.19 修改。轉向Login
        @self.route('/')
        def home():
           return redirect(url_for('Loginout.login'))