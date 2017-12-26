function ajax(opt){
    if('XMLHttpRequest' in window){
        var xhr = new XMLHttpRequest();
    }else{
        var xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
    }
    if(opt.type == 'get'){
        xhr.open('get',opt.url+'?'+jsonToString(opt.data),true);
        xhr.send();
    }
    else if(opt.type=='post'){
        xhr.open('post',opt.url,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(jsonToString(opt.data));
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                opt.success(xhr.responseText);
            }
            else{
                opt.error();
            }
        }
    };
    function jsonToString(json){
        var arr = [];
        for(var i in json){
            arr.push(i+'='+json[i])
        };
        return arr.join('&');
    }
}