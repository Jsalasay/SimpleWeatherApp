from os import abort
from urllib import response
from urllib.request import urlopen
from urllib.parse import urlencode
from xmlrpc.client import ResponseError
from flask import Flask, render_template, request, about, ResponseError


import json;

app = Flask(__name__)

#decorato that routes the http get requesto to local url
@app.route('/forecast', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if city is None:
        abort(400, 'Missing argument city')

    data = {}
    data['q'] = request.args.get('city')
    data['appid'] = 'e493d7860e9f31ea12032a54ec9425f4'
    data['units'] = 'imperial'

    url_values = urlencode(data)
    url = 'http://api.openweathermap.org/data/2.5/forecast'
    full_url = url + '?' + url_values
    data = urlopen(full_url)

    resp = response(data)
    resp.status_code = 200
    return render_template('index.html', title='Weather App', data=json.loads(data.read().decode('utf8')))