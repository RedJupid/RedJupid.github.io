;(function(global){

	var MySlider = function(slideId){

		this.slideId = slideId;
		this.slide = document.getElementById(slideId);//获取第一层
		this.box = this.slide.getElementsByTagName('div')[0];//获取第二层
		this.img = this.box.getElementsByTagName('img');//获取所有图片
		this.slideWidth = this.slide.offsetWidth;//获取slide的宽度
		this.slideHeight = this.slide.offsetHeight;//获取slide的高度


		this.prev = null;//获取上一张图片的按钮
		this.down = null;//获取下一张图片的按钮
		this.navPoint = this.box.getElementsByTagName('li');//导航点

		this.timer = null;//定时器

		this.imgIndex = 0;//获取图片位置
		this.speed = this.slideWidth/10;//动画速度

		this.initCss();//初始化元素CSS
		this.init();//初始化元素
		
		this.slide.onmouseenter = this.onmouseenter.bind(this);//为按钮绑定事件
		this.slide.onmouseleave = this.onmouseleave.bind(this);//为按钮绑定事件
		this.down.onclick = this.nextImg.bind(this);//为下一张图片按钮绑定事件
		this.prev.onclick = this.prevImg.bind(this);//为上一张图片按钮绑定事件
		this.autoStart = setInterval(this.nextImg.bind(this),3000);	//定时器

		for(var i=0;i<this.img.length;i++){
			this.navPoint[i].onclick = this.navPointClick.bind(this);
		}
	}

	MySlider.prototype.initCss = function(){

		var mstyle = document.createElement('style');
		mstyle.innerHTML+='#'+this.slideId+'>div>img{position:absolute}';
		mstyle.innerHTML+='#'+this.slideId+'>div{overflow:hidden;position:absolute;width:'+this.slideWidth+'px;height:'+this.slideHeight+'px;}';
		mstyle.innerHTML+='#'+this.slideId+'>div>.prev{font-family:Simsun;font-size:40px;position:absolute;display:none;background:rgba(222,222,222,0.4);cursor:pointer;top:'+(this.slideHeight/2 - 23)+'px}';
		mstyle.innerHTML+='#'+this.slideId+'>div>.down{font-family:Simsun;font-size:40px;position:absolute;display:none;background:rgba(222,222,222,0.4);cursor:pointer;top:'+(this.slideHeight/2 - 23)+'px;right:0px;}';
		mstyle.innerHTML+='#'+this.slideId+'>div>ul{padding:0 4px;list-style:none;position:absolute;font-size:0px;background:rgba(222,222,222,0.4);bottom:10px;right:10px;text-align:center;-moz-border-radius:10px;border-radius:10px;}';
		mstyle.innerHTML+='#'+this.slideId+'>div>ul>li{display:inline-block;margin:6px 4px;background:#fff;width:8px;height:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;}';
		document.head.appendChild(mstyle);
	}

	MySlider.prototype.init = function(){
		this.img[0].style.left = 0+'px';
		for(var i = 1;i<this.img.length;i++){
			this.img[i].style.left = -520+'px';
		}
		//初始化按钮prev
		this.prev = document.createElement('div');
		this.prev.setAttribute('class','prev');
		this.prev.innerHTML = '&lt';
		this.box.appendChild(this.prev);
		//初始化按钮next
		this.down = document.createElement('div');
		this.down.setAttribute('class','down');
		this.down.innerHTML = '&gt';
		this.box.appendChild(this.down);

		var nav = document.createElement('ul');
		
		this.box.appendChild(nav);
		for(var i=0;i<this.img.length;i++){
			var li = document.createElement('li');
			li.index = i;
			nav.appendChild(li);
		}
		this.navPoint[this.imgIndex].style.background = '#333';
	}
	MySlider.prototype.onmouseenter = function(){
		this.prev.style.display = 'block';
		this.down.style.display = 'block';
	}

	MySlider.prototype.onmouseleave = function(){
		this.prev.style.display = 'none';
		this.down.style.display = 'none';
	}
	MySlider.prototype.nextImg = function(){

		clearInterval(this.timer);
		clearInterval(this.autoStart);
		var that = this;
		this.timer = setInterval(function(){
			var nextIndex = that.imgIndex == (that.img.length-1)?0:that.imgIndex+1;
			that.navPoint[that.imgIndex].style.background = '#fff';
			that.navPoint[nextIndex].style.background = '#333';
			if(parseInt(that.img[nextIndex].style.left)>=that.slideWidth){
				that.img[nextIndex].style.left = -that.slideWidth+'px';
			}
			var leftPrev = parseInt(that.img[that.imgIndex].style.left);
			var leftNext = parseInt(that.img[nextIndex].style.left);
			if(leftPrev<that.slideWidth){
				that.img[that.imgIndex].style.left = leftPrev+that.speed+'px';
				that.img[nextIndex].style.left = leftNext + that.speed+'px';
			}else{
				that.imgIndex = that.imgIndex+1==that.img.length?0:that.imgIndex+1;
				clearInterval(that.timer);
				that.autoStart = setInterval(that.nextImg.bind(that),3000);
			}
		},16.7);

	}
	MySlider.prototype.prevImg = function(){

		clearInterval(this.timer);
		clearInterval(this.autoStart);
		var that = this;
		this.timer = setInterval(function(){
			var nextIndex = that.imgIndex==0?that.img.length-1:that.imgIndex-1;
			that.navPoint[that.imgIndex].style.background = '#fff';
			that.navPoint[nextIndex].style.background = '#333';
			if(parseInt(that.img[nextIndex].style.left)<0){
				that.img[nextIndex].style.left = that.slideWidth+'px';
			}
			var leftPrev = parseInt(that.img[that.imgIndex].style.left);
			var leftNext = parseInt(that.img[nextIndex].style.left);
			if(leftPrev>-that.slideWidth){
				that.img[that.imgIndex].style.left = leftPrev - that.speed +'px';
				that.img[nextIndex].style.left = leftNext - that.speed + 'px';
			}else{
				that.imgIndex = that.imgIndex-1<0?that.img.length-1:that.imgIndex-1;
				clearInterval(that.timer);
				that.autoStart = setInterval(that.nextImg.bind(that),3000);
			}
		},16.7);
	}

	MySlider.prototype.navPointClick = function(e){

		clearInterval(this.timer);
		clearInterval(this.autoStart);
		var that = this;
		var liIndex = e.target.index;
		this.timer = setInterval(function(){
			if(liIndex<that.imgIndex){
				var nextIndex = liIndex;
				that.navPoint[that.imgIndex].style.background = '#fff';
				that.navPoint[nextIndex].style.background = '#333';
				if(parseInt(that.img[nextIndex].style.left)>=that.slideWidth){
					that.img[nextIndex].style.left = -that.slideWidth+'px';
				}
				var leftPrev = parseInt(that.img[that.imgIndex].style.left);
				var leftNext = parseInt(that.img[nextIndex].style.left);
				if(leftPrev<that.slideWidth){
					that.img[that.imgIndex].style.left = leftPrev+that.speed+'px';
					that.img[nextIndex].style.left = leftNext + that.speed+'px';
				}else{
					that.imgIndex = liIndex;
					clearInterval(that.timer);
					that.autoStart = setInterval(that.nextImg.bind(that),3000);
				}
			}else if(liIndex>that.imgIndex){
				var nextIndex = liIndex;
				that.navPoint[that.imgIndex].style.background = '#fff';
				that.navPoint[nextIndex].style.background = '#333';
				if(parseInt(that.img[nextIndex].style.left)<0){
					that.img[nextIndex].style.left = that.slideWidth+'px';
				}
				var leftPrev = parseInt(that.img[that.imgIndex].style.left);
				var leftNext = parseInt(that.img[nextIndex].style.left);
				if(leftPrev>-that.slideWidth){
					that.img[that.imgIndex].style.left = leftPrev - that.speed +'px';
					that.img[nextIndex].style.left = leftNext - that.speed + 'px';
				}else{
					that.imgIndex = liIndex;
					clearInterval(that.timer);
					that.autoStart = setInterval(that.nextImg.bind(that),3000);
				}
			}else{
				clearInterval(that.timer);
				that.autoStart = setInterval(that.nextImg.bind(that),3000);
			}
		},16.7);

	}

	global.MySlider = MySlider;

})(this);