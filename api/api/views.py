import datetime

from django.shortcuts import render_to_response


now = datetime.datetime.now()


def landing(request):
    return render_to_response('base.html', {
        'page': 'views/home.html',
        'title': 'Aloha',
        'description': 'Description',
        'current_year': now.year,
        'header_class': 'light'
    })


def drivers(request):
    return render_to_response('base.html', {
        'page': 'views/drivers.html',
        'title': 'Aloha',
        'description': 'Description',
        'current_year': now.year,
        'header': 'dark'
    })


def carga(request):
    return render_to_response('base.html', {
        'page': 'views/carga.html',
        'title': 'Aloha',
        'description': 'Description',
        'current_year': now.year,
        'header_class': 'dark'
    })


def aloha(request):
    return render_to_response('index.html')
