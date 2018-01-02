var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('express-static');
var fs = require('fs');
var server = express();
server.listen(8005)
server.use(bodyParser.urlencoded({}));
server.use(cookieParser('askmdhsakjdh213482y'));
//自动登录
server.use('/cookielogin',function(req,res){
	// console.log(req.signedCookies)
	var json1 = req.signedCookies;
	// console.log( json1 != undefined)
	if(json1.user == undefined ){
		res.send('账号密码过期，请重新登录')
		return;
	}
		 var user = json1.user.split('-')[0];
	  	 var pass = json1.user.split('-')[1];
   //xiebin    123456
   //json2.xiebin == 123456
	  	 fs.readFile('./public/data.txt','utf8',function(err,data){
	  	 	if(err) throw err;
	  	 	 var json2 = JSON.parse(data);
	  	 	if(json2[user] == pass){
	  	 		res.send('登陆成功')
	  	 	}else{
	  	 		res.send('登录失败')
	  	 	}
	  	 })  	
})
//login
server.use('/login',function(req,res){
	req.secret = 'askmdhsakjdh213482y';
	fs.readFile('./public/data.txt','utf8',function(err,data){
		var json = JSON.parse(data);
		req.body.cook = JSON.parse(req.body.cook)
		// console.log( typeof req.body.cook)
		if(json[req.body.user] == req.body.pass){
			if(req.body.cook){
				res.cookie('user',req.body.user+'-'+req.body.pass,{signed:true,maxAge:60*1000*5});
			}
			res.send('登陆成功')
		}else{
			res.send('账号密码错误')
		}
	})
})
//注册
server.use('/resign',function(req,res){
	
	fs.readFile('./public/data.txt','utf8',function(err,data){
		if(err)throw err;
		var json = JSON.parse(data); // object
		if(json[req.body.user]){
			res.send('您的账号已被注册')
		}else{
			json[req.body.user] = req.body.pass;
			//{user:123456}
			fs.writeFile('./public/data.txt',JSON.stringify(json),function(err){
				if(err) throw err;
				 res.send('注册成功')
			})
		}
	})
})
server.use(static('./public'))