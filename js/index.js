// 轮播图部分
// 页面加载完再执行js
window.addEventListener('load', function() {
    // 1.获取元素
    var focus = this.document.querySelector('.focus')
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focusWidth = focus.offsetWidth;
    // 2.当鼠标移入banner时，左右两个箭头显示，鼠标离开时，左右两个箭头隐藏
    focus.addEventListener('mouseenter', function() {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
            prev.style.display = 'none';
            next.style.display = 'none';
            timer = setInterval(function() {
                next.click();
            }, 2000)
        })
        // 3.动态获取小圆点,有几张图就自动生成几个小圆点
    var banner = this.document.querySelector('.banner');
    var ul = focus.querySelector('ul');
    var ol = banner.querySelector('.circle')
        // 获取有多少张图片
    for (var i = 0; i < ul.children.length; i++) {
        // console.log(ul.children.length); 
        // 创建元素li
        var li = document.createElement('li');
        li.setAttribute('index', i);
        // 把创建的li添加到ol中
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5.点击小圆圈，图片移动（ul移动）
            // ul移动的距离是下圆圈的索引号乘以图片的宽度
            var index = this.getAttribute('index');
            // 当点击小圆点时，把小圆点的索引号给num
            num = index;
            // 当点击小圆点时，把小圆点的索引号给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个li添加current类
    ol.children[0].className = 'current';
    // 6.克隆第一张图片,添加到ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.append(first);
    // 7.点击右侧箭头，图片滚动一张
    var num = 0;
    // circle控制小圆点的播放
    var circle = 0;
    // 声明一个节流阀，用于用户点击左右箭头过快时，轮播完一张图片后再轮播下一张
    var flag = true;
    next.addEventListener('click', function() {
            if (flag) {
                flag = false;
                // 如果走到了最后复制的一张图片，我们的ul要复原 left改为0
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 8.设置小圆点跟随图片变化
                circle++;
                if (circle == ol.children.length) {
                    circle = 0;
                }
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                ol.children[circle].className = 'current';
            }
        })
        // 9.左侧箭头
    prev.addEventListener('click', function() {
            if (flag) {
                flag = false;
                // 
                if (num == 0) {
                    num = ul.children.length - 1;
                    ul.style.left = -num * focusWidth + 'px';

                }
                num--;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 8.设置小圆点跟随图片变化
                circle--;
                if (circle < 0) {
                    circle = ol.children.length - 1;
                }
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                ol.children[circle].className = 'current';
            }
        })
        // 自动播放轮播图
    var timer = setInterval(function() {
        next.click();
    }, 2000)
})