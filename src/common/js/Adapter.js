
//自适应
var clientWidth = document.documentElement.clientWidth;
fontSize = clientWidth / 7.5 + 'px';
var h = document.getElementsByTagName("html");
h[0].style.fontSize=fontSize ;

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      //console.log(clientWidth);
      docEl.style.fontSize = clientWidth / 7.5 + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var LocalGetter = function(key){
	return localStorage.getItem(key);
};
var LocalSetter = function(key,val){
	return localStorage.setItem(key,val);
};
var SessionGetter = function(key){
	return sessionStorage.getItem(key);
};
var SessionSetter = function(key,val){
	return sessionStorage.setItem(key,val);
};
//登录页面路径
var login = '/custom/bgy/wemp/user/login/login.html';
var celnet = {
    page:[]
};
var debug = '';
var debugget = '';

