function getData(){
	$.ajax({
        type: "get",
        url: "https://screeps.com/api/game/room-terrain",
        dataType: 'json', //【jsonp进行跨域请求 只支持get】
        data:{
            "shard":"shard2",
            "room":"W4N49"
        },
        success: function(data) { //【成功回调】
            console.log(data);
        },
        error: function(xhr, type) { //【失败回调】
			console.log(xhr,type)
        }
        });
}
