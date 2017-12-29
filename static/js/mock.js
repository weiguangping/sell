import Mock from 'mockjs';
let banner = {
    'items|30': [{
        'id|+1': 0,
        'name': '@name',
        'age|1-100': 100,
        'color': '@color',
        'url': '@image'
    }]
}
let cats = {
    'items|30': [{
        'id|+1': 0,
        'name': '@name',
        'age|1-100': 100,
        'color': '@color',
        'url': '@image'
    }]
}
let tabs = {
    'items|4': [{
        'id|+1': 0,
        'name': '@name',
        'age|1-100': 100,
        'color': '@color',
        'url': '@image'
    }]
}
let pro = {
    'title': '@name',
    'items|50': [{
        'id|+1': 0,
        'name': '@name',
        'age|1-100': 100,
        'color': '@color',
        'url': '@image'
    }]
}
let msg2 = {
    'items|12': [{
        'id|+1': 0,
        'name': '@name',
        'age|1-100': 100,
        'color': '@color',
        'url': '@image'
    }]
}
let det = {
    'name': '@name',
    'det': '@name',
    'minprice|0-100': 0,
    'maxprice|0-100': 0,
    'img|3': ['@image'],
    'details|4': ['@image'],
    'sku|2': [{
        'id|+1': 0,
        'name': '@name',
        'value|4': [{
            'id|+1': 0,
            'name': '@name'
        }]
    }],
    'items|4': [{
        'id|+1': 0,
        'name': '@name',
        'age|1-100': 100,
        'color': '@color',
        'url': '@image'
    }]
}
let orderlist = {
    'page|0-3': 1,
    'items|20': [{
        'id|+1': 0,
        'name': '@name',
        'skuName': '@name',
        'img': ['@image'],
        'price|0-99': 0,
        'num|0-99': 0
    }]
}
Mock.mock("pro", pro)
Mock.mock("banner", banner)
Mock.mock("cats", cats)
Mock.mock("tabs", tabs)
Mock.mock("msg2", msg2)
Mock.mock("det", det)
Mock.mock("orderlist", orderlist)