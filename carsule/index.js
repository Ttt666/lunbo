window.onload = function () {
            var container = document.getElementById('container');
            var list = document.getElementById('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var animated=false;//用来优化
            var timer=null;//定时


            
            //增加‘on’这个class，实现原点的点亮的功能
            function showButtons(){
            	for (var i = 0;i<buttons.length;i++) {
                    buttons[i].className='';    
                }//去除所有buttons上的类
                buttons[index-1].className='on';
            }




            //点击原点，切换图片功能
            for(var i=0;i<buttons.length;i++){
                buttons[i].onclick=function(){
                    var myIndex=parseInt(this.getAttribute('index'));//getAttribute获取自定义属性
                    var offset=-600*(myIndex-index);//此时的index减去之前的index
                    index=myIndex;
                    animate(offset);
                    showButtons();   
                }
            }


            //移动图片功能
           	function animate(offset){
                animated=true;//确定在移动图片
                var time=300;       //总的时间，可修改
                var interval=10;        //间隔时间，可修改
                var speed=offset/(time/interval);//计算出移动的距离
                var newLeft=parseInt(list.style.left)+offset;
                var go=function(){
                    if((speed<0 && newLeft<parseInt(list.style.left)) || (speed>0 && newLeft>parseInt(list.style.left))){
                    list.style.left=parseInt(list.style.left)+speed+'px';
                    setTimeout(go,interval);//一次定时器，但使用了递归
                    }//多次移动，设置时间来使其看起来连贯，慢慢在移动
                    else{
                        list.style.left=newLeft+'px';//上面慢慢移动时，可能出现小数，所以直接使其移动到正确位置
                        if(newLeft>-600){
                            list.style.left=-3000+'px';
                         }//可修改
                        else if(newLeft<-3000){
                            list.style.left=-600+'px';
                         }//可修改
                         animated=false;//结束完上面的移动后，将animate设置为false
                    }
                }
                go();	
            } 



            //右键头功能
            next.onclick=function(){
                if (animated) {
                    return;
                }//当animated为true时，表示在执行animate函数，避免频繁点击导致出错
                if(index==5){
                    index=1;
                }//可修改
                else{
                    index+=1;
                }//可修改
            	animate(-600);
            	showButtons();
            }


            //左箭头功能
            prev.onclick=function(){
                if (animated) {
                    return;
                }
                if(index==1){
                    index=5;
                }
                else{
                    index-=1;
                }
            	animate(600);
            	showButtons();
            }



            //动画自动播放功能
            function play(){
                timer=setInterval(function(){
                    next.onclick();
                },3000)
            }
            //动画停止功能
            function stop(){
                clearInterval(timer);
            }


            container.onmouseover=stop;
            container.onmouseout=play;
            play();
        }