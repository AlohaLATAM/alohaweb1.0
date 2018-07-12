import datetime

from django.shortcuts import render_to_response


now = datetime.datetime.now()


def landing(request):
    return render_to_response('base.html', {
        'page': 'views/home.html',
        'title': 'Aloha',
        'description': 'Description',
        'current_year': now.year,
    })


def index(request):
    return render_to_response('index.html')
