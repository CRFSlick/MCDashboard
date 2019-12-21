from flask import render_template
from flask import jsonify
from flask import request
from flask import Flask
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/console')
def api_cmd():
    cmd = request.args.get('cmd')
    print(f'CMD: {cmd}')

    if cmd != '':
        response = {'cod': '200'}
    else:
        response = {
            'cod': '400',
            'error': {
                'type': 'Data Error',
                'msg': 'The server has received bad data'
            }
        }

    print(response)
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)