//引入远程数据
//关于城市的信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
	}
})

//关于天气的信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}
})

//页面加载的函数
window.onload=function(){
	//加载数据
	update();

	//页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	pos.onclick=function(){
		cityBox.style.display="block";
	}

	var Box=$(".city .citys .con .box");
	console.log(Box);
	for(let i in Box){
		Box[i].onclick=function(){
			var chengshi=this.innerHTML;
			console.log(chengshi);
			AJAX(chengshi);
			//update();
		}
	}

    
    //搜索部分
	var searchBox=document.getElementsByClassName("searchBox")[0];
	var button=document.getElementsByClassName("button")[0];
	var text;
	console.log(button);
	searchBox.onfocus=function(){   //获取焦点
		button.innerHTML="确认";
		text=searchBox.value;
	}

	button.onclick=function(){
		var neirong=button.innerHTML;
	    if(neirong=="取消"){
		    var city3=document.getElementsByClassName("city")[0];
		    city3.style.display="none";
	    }else{
		    for(let i in city){
			    for(let j in city[i]){
				    if(text==j){
				        AJAX(text);
				        return;
				    }else{
				        alert("没有这个城市的天气");
				    }
			    }
		    }
	    }
	}
}



//获取点击城市的天气信息函数
function AJAX(str){
	$.ajax({
		url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
		dataType:"jsonp",
		method:"get",
		success:function(obj){
			tianqi=obj.data;
			update();
			var city2=$(".city")[0];
		    //console.log(city2);
		    city2.style.display="none";
	    }
    })
}


//获取数据的函数
function update(){
	//当前城市
	var pos=document.getElementsByClassName("pos")[0];
	// console.log(pos);
	pos.innerHTML=tianqi.city;

	//当前空气质量
	var quality_level=document.getElementsByTagName("h5")[0];
	// console.log(pos);
	quality_level.innerHTML=tianqi.weather.quality_level;

	//当前的温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";

	//当前的天气
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;

	//当前的风向
	var wind_direction=document.getElementsByClassName("wind_dir")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;

	//当前的风的等级
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";

	//今天的最高温度
	var dat_high_temperature=document.getElementsByClassName("higher")[0];
	dat_high_temperature.innerHTML=tianqi.weather.dat_high_temperature+"°";

	//今天的最低温度
	var dat_low_temperature=document.getElementsByClassName("lower")[0];
	dat_low_temperature.innerHTML=tianqi.weather.dat_low_temperature+"°";

	//今天的天气情况
	var day_condition=document.getElementsByClassName("con")[0];
	day_condition.innerHTML=tianqi.weather.day_condition;

	//明天的天气情况
	var tomorrow_condition=document.getElementsByClassName("Con")[0];
	tomorrow_condition.innerHTML=tianqi.weather.tomorrow_condition;

	//今天的天气情况图标
	var today_icon=document.getElementsByClassName("conPic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

	//明天的天气情况图标
	var tomorrow_icon=document.getElementsByClassName("ConPic")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

	//明天的最高温度
	var tomorrow_high_temperature=document.getElementsByClassName("higher1")[0];
	tomorrow_high_temperature.innerHTML=tianqi.weather.tomorrow_high_temperature+"°";

	//明天的最低温度
	var tomorrow_low_temperature=document.getElementsByClassName("lower1")[0];
	tomorrow_low_temperature.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";

	//获取每小时的天气情况,让程序动态的创建
    //每小时的天气预报
    var hourlyArr=tianqi.weather.hourly_forecast;
    var wrap=document.getElementsByClassName("wrap")[0];
	console.log(hourlyArr);
	for(let i in hourlyArr){
		var box1=document.createElement("div");
	    box1.className="box";

		var time=document.createElement("div");
		//添加类名
        time.className="time";
        //添加到父级元素身上
	    box1.appendChild(time);
	    //添加内容
	    time.innerHTML=hourlyArr[i].hour+":00";

	    //创建图标块
	    var icon=document.createElement("div");
	    icon.className="icon";
	    box1.appendChild(icon);
	    //修改样式
	    icon.style=`background-image:url("img/${tianqi.weather.weather_icon_id}.png")`;

	    var timeTem=document.createElement("div");
	    timeTem.className="timeTem";
	    box1.appendChild(timeTem);
	    timeTem.innerHTML=hourlyArr[i].temperature+"°";

	    wrap.appendChild(box1);
	}

	//未来15天的天气情况
	var dayArr=tianqi.weather.forecast_list;
	console.log(dayArr);

	var wrap1=document.getElementsByClassName("wrap1")[0];
	for(let i in dayArr){
		var box2=document.createElement("div");
		box2.className="box2";

		var date=document.createElement("div");
		date.className="date";
		box2.appendChild(date);
		date.innerHTML=dayArr[i].date;

		var condition=document.createElement("div");
		condition.className="condition";
		box2.appendChild(condition);
		condition.innerHTML=dayArr[i].condition;

		var forecast_icon=document.createElement("div");
		forecast_icon.className="forecast_icon";
		box2.appendChild(forecast_icon);
		forecast_icon.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

		var higher=document.createElement("div");
		higher.className="higher";
		box2.appendChild(higher);
		higher.innerHTML=dayArr[i].high_temperature+"°";

		var lower=document.createElement("div");
		lower.className="lower";
		box2.appendChild(lower);
		lower.innerHTML=dayArr[i].low_temperature+"°";

		var wind=document.createElement("div");
		wind.className="wind";
		box2.appendChild(wind);
		wind.innerHTML=dayArr[i].wind_direction;

		var level=document.createElement("div");
		level.className="level";
		box2.appendChild(level);
		level.innerHTML=dayArr[i].wind_level+"级";

		wrap1.appendChild(box2);
	}

	//关于城市的信息
	//var wrap2=docu.getElementsByClassName("wrap2")[0];
	var city1=document.getElementsByClassName("city")[0];
	for(let i in city){
		console.log(city[i]);
		var citys=document.createElement("div");
		citys.className="citys";

		var title=document.createElement("div");
		title.className="title";
		title.innerHTML=i;
		citys.appendChild(title);

		var con=document.createElement("div");
		con.className="con";

		for(let j in city[i]){
			var box=document.createElement("div");
			box.className="box";
			box.innerHTML=j;
			con.appendChild(box);
		}
		citys.appendChild(con);
		city1.appendChild(citys);
	}
}
