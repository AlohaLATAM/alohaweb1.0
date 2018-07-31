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


def carga(request):
    return render_to_response('base.html', {
        'page': 'views/carga.html',
        'title': 'Aloha',
        'description': 'Description',
        'current_year': now.year,
    })


def aloha(request):
    return render_to_response('index.html')
