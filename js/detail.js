window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview-img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    //鼠标经过和离开就显示和隐藏遮挡层和大盒子
    preview_img.addEventListener('mouseenter', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    preview_img.addEventListener('mouseleave', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        //鼠标在盒子中的移动
    preview_img.addEventListener('mousemove', function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetHeight / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大盒子跟着小盒子移动
        var bigImg = big.querySelector('img');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})