from django.http import HttpResponse


def index(request):
    line1 = '<h1 style="text-align: center">球球生存大作战</h1>'
    line4 = '<a href="/play/">进入游戏界面</a>'
    line3 = '<hr>'
    line2 = '<img src = "https://jiapengcheng.obs.cn-north-4.myhuaweicloud.com/img/jpcly.jpg"i width = 1670>'
    return HttpResponse(line1 + line4 + line3 + line2)

def play(request):
    line1 = '<h1 style="text-align: center">游戏界面</h1>'
    line2 = '<a href = "/">返回主界面</a>'
    line3 = '<img src = "https://jiapengcheng.obs.cn-north-4.myhuaweicloud.com/img/cf.jpg"i width=1680>'
    return HttpResponse(line1 + line2 + line3)
