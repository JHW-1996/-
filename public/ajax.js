function ajax(option){
	var xhr= new XMLHttpRequest();
var arr=[]
for(var i in option.data){
	arr.push(i+'='+option.data[i])
}
var str='';
str=arr.join('&')
if(option.type=='get'){
	xhr.open('get',option.url+'?'+str,true);
	xhr.send()
}else 
if(option.type=='post'){
	xhr.open('post',option.url,true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(str)
}
	xhr.onreadystatechange =function(){
		if(xhr.readyState == 4){
			if(xhr.status>=200 && xhr.status <300 || xhr.status == 304){
				option.success(xhr.responseText)
			}else{
				console.log('服务器错误')
			}
		}
	}
}