

//轮播图
bannerEvt ();
//导航栏
navEvt();



/******************************************************************************/
function navEvt() {
// 获取导航栏元素
var nav = document.getElementById('nav');
// 蓝色的线
var navline = document.getElementById('navline');

//获取a标签注册事件
for (var i = 0; i < 6; i++) {
  var link = nav.children[i];
  link.onmouseover = linkMouseover;
  link.onmouseout = linkMouseout;
}
function linkMouseover() {
  //2 当触发a标签的mouseover，让蓝色的线执行动画，并且自适应li的宽度
  //获取当前触发事件a标签位置
  var offsetLeft = this.offsetLeft;
  //获取当前蓝色线的宽度
  var offsetWidth = this.offsetWidth;
  animate(navline, offsetLeft , offsetWidth , 6);
  //让所有的二级菜单显示
  for (var i =0; i < this.children.length; i++) {
    this.children[i].style.display = 'block';
  }
}
//隐藏所有的二级菜单
function linkMouseout() {
  for (var i =0; i < this.children.length; i++) {
    this.children[i].style.display = '';
  }
}
};


/***************************************************************************************/
function bannerEvt () {

//获取元素
var banner = document.getElementById('banner');
var ul = document.getElementById('publish-copy');
var dot = document.getElementById('b_dot');

var count = 0;
var percent = 0;//淡入循环变量
var timerId1 = null; //鼠标经过banner事件定时器
var timerId = null; //鼠标经过圆点事件定时器 
var index = 0;

//淡入函数
function fadeIn(){
  var FI = setInterval(function () {
  percent += 0.010000; //精确浮点数精度
  if(percent >= 1) {
    clearInterval(FI);
  } else {
      ul.children[count].style.opacity = percent;
    }
  },10);
  percent = 0;
};

stopTime();
//鼠标经过停止轮播
function stopTime() {
  banner.onmouseover = function () {
  // 清除定时器
  if (timerId1) {
    clearInterval(timerId1);
    timerId1 = null;
  }
    clearInterval(timerId);
  }
};

leaveTime();
function leaveTime() {
  banner.onmouseout = function () {
  // 重新开启定时器
     timerId = setInterval(function () {
      show();
      }, 2000);
  }
};

//图像变换函数
function pic(){
  for(var i = 0; i < ul.children.length; i++) {
    ul.children[i].style.opacity = 0;
  }
  //底部按钮高亮显示与取消
  for(var j = 0; j < dot.children.length; j++) {
    dot.children[j].className = '';
  }
  dot.children[count].className = 'on';
};
//轮播循环
showtime();
function showtime() {
    timerId1 = setInterval(show,2000);
}
//轮播循环函数
function show(){
    count ++;
    if (count > ul.children.length - 1) {
    count = 0;
  }
    fadeIn();               
    pic();
};

//底部圆点
for(var i = 0; i < dot.children.length; i++) { 
    dot.children[i].index = i;  
    dot.children[i].onmouseover = function() {
        clearInterval(timerId1);
        count = this.index;//确保count值不会出错
        fadeIn();
        pic();
    }
    dot.children[i].onmouseout = function(){
      showtime()
    }
};

};
