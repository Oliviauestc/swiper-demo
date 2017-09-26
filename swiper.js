(function(){
	function Swiper(selector){
        this.timer='';    //定时器
        this.elem = typeof selector == 'Object' ? selector : document.getElementById(selector);//轮播的container
        this.offset=parseInt(this.getStyle('width'));  //轮播区域的宽度
        this.lists = this.elem.getElementsByClassName('list')[0];   //轮播的图片列表
        this.listLength=this.lists.children.length;   //轮播的图片数量
        this.listsLeft=0;                             //轮播图片的当前偏移量
        this.buttons = this.elem.getElementsByClassName('buttons')[0];//轮播图片的对应按钮
        this.index=1;                                 //当前播放图片的索引
        this.prev = this.elem.getElementsByClassName('prev')[0];  //轮播上一张图
        this.next = this.elem.getElementsByClassName('next')[0];  //轮播下一张图
        this.init(); //轮播对象的初始化，主要是给按钮添加侦听
    }
    Swiper.prototype={
        constructor:Swiper,
        //获取元素某个样式
        getStyle:function(property){
        	return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.elem,false)[property] : this.elem.currentStyle[property];
        },
        init:function(){
          	var self=this;
          	self.timer=setInterval(function(){  //初始时自动轮播
            	self.next.click();
          	},3000);
          	this.lists.style.width=this.offset*this.listLength+'px';  //将轮播图片平铺，列表区域宽度设为单个图片宽度*图片数量
          	this.elem.addEventListener('mouseover',stop,false); //鼠标进入轮播区域暂停播放
          	this.elem.addEventListener('mouseout',go,false);  //鼠标离开轮播区域开始播放
          	this.prev.addEventListener('click',animation,false); //点击前一个
          	this.next.addEventListener('click',animation,false);  //点击后一个
          	this.buttons.addEventListener('click',selectButton,false);  //点击底部的按钮选择播放哪张图
          	function go(){
            	self.timer=setInterval(function(){
              		self.next.click();  //自动点击下一张
            	},5000);
          	}
          	function stop(){
            	clearInterval(self.timer);
          	}
          	function animation(event){
            	if(event.target.className.slice(0,4)=="next"){   //如果点击的是下一张
              		if(self.listsLeft<=-self.offset*(self.listLength-1)){ //当前已经是最后一张
                		self.index=1;
                		self.listsLeft = 0;
              		}
              		else{
                		self.index+=1;
                		self.listsLeft=self.listsLeft-self.offset;
              		}
            	}
            	else if(event.target.className.slice(0,4)=="prev"){  //如果点击的是前一张
              		if(self.listsLeft>=0){                 //当前已经是第一张
                		self.index=self.listLength;
                		self.listsLeft = -self.offset*(self.listLength-1);
              		}
              		else{
                		self.index-=1;
                		self.listsLeft=self.listsLeft+self.offset;
              		}
            	}
            	self.lists.style.left=self.listsLeft+'px';
            	buttonsShow();
          	}
          	function buttonsShow(){     //改变button的‘on’类
            	for(var i=0;i<self.listLength;i++){
              		if(self.buttons.children[i].className=='on'){
                		self.buttons.children[i].className='';
              		}
            	}
            	self.buttons.children[self.index-1].className='on';
          	}
          	function selectButton(event){    //按钮选择轮播某张图
            	self.index=parseInt(event.target.getAttribute('index'));  //获取按钮的index属性
            	self.listsLeft=-self.offset*(self.index-1);
            	self.lists.style.left=self.listsLeft+'px';
            	buttonsShow();   //改变button的‘on’类
          	}
        }
    }
    window.Swiper=Swiper;
})()
