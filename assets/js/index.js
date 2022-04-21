$(function(){
 
    var layer =layui.layer
    

    getUsermsg()

    $('#btnLogout').on('click',function(){
        layer.confirm('确定要退出吗？', {icon: 3, title:'提示'}, 
        function(index){
            //do something
            localStorage.removeItem('token')

            location.href='/login.html'

            layer.close(index);
          });
    })
})

function getUsermsg(){
    $.ajax({
        url:'http://www.liulongbin.top:3007/my/userinfo',
        method:'GET',
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            // console.log(res);
            randerAvatar(res.data)

        },
        complete:function(res){
            if(res.responseJSON.status === 1 ||res.responseJSON.message === '身份认证失败!'){
                localStorage.removeItem('token')

                location.href='/login.html'
            }
        }
    })
}

 function randerAvatar(user){
     var name=user.nickname || user.username
     


     $('#welcome').html('欢迎您&nbsp;&nbsp;'+name)

     if(user.user_pic !== null){
         $('.layui-nav-img').attr('src',user.user_pic).show()
         $('.text-avatar').hide()
     }else{
        $('.layui-nav-img').hide()
        var first =name[0].toUpperCase()
        $('.text-avatar').attr('style','display: inline-block;').html(first).show()
        
     }
    }