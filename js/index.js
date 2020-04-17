window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;
    //鼠标经过和离开就显示和隐藏按钮以及清除和调用定时器
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        time = null;
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                arrow_r.click();
            }, 3000)
        })
        //创建添加和图片数一样的小圆点的数量并且点击小圆点相应的图片也发生变化
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i)
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ' ';
            }
            this.className = 'current';
            var index = this.getAttribute('index')
            num = index;
            circle = index;
            animate(ul, -index * focusWidth)
        })
    }
    ol.children[0].className = 'current';
    //为右侧按钮添加点击事件让图片向左一张一张的移动并且小圆点一起移动
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                circle++;
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circleChange()
            }
        })
        //为左侧按钮添加点击事件图片向右移动，小圆点也随之移动
    arrow_l.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (num == 0) {
                    ul.style.left = -num * focusWidth + 'px';
                    num = ul.children.length - 1;
                }
                num--;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                circle--;
                if (circle < 0) {
                    circle = ol.children.length - 1;
                }
                circleChange()
            }
        })
        //小圆点切换函数
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //自动播放的定时器
    var timer = setInterval(function() {
        arrow_r.click();
    }, 3000)
})