# #!/usr/bin/env python
# from flask import Flask, render_template, session, request
# from flask_socketio import SocketIO, emit
#
# app = Flask(__name__, template_folder='./template')
# app.config['SECRET_KEY'] = 'secret!'
# app.debug = True
# app.env = 'development'
#
# socketio = SocketIO(app)
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @socketio.on('connect')
# def client_msg():
#     emit('server_response',{'data': 'connected!'})
#
#
# @socketio.on('client_event')
# def client_msg(msg):
#     emit('server_response', {'data': msg['data']})
#
#
# @socketio.on('connect_event')
# def connected_msg(msg):
#     emit('server_response', {'data': msg['data']})
#
#
# if __name__ == '__main__':
#     socketio.run(app, host='127.0.0.1',port=5101)


from flask import Flask, render_template
from flask_socketio import SocketIO
# import config


app = Flask(__name__,template_folder='./template')
# app.config.from_object(config)
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('my event')
def handle_my_custom_namespace_event(data):
    socketio.emit("res", data)


if __name__ == "__main__":
    socketio.run(app)