$(function(){

    var form=layui.form
    var layer=layui.layer

    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '字符长度必须小于6个'
            }
        }

    })

    getUserInfo()

    
    $('#btn_reset').on('click',function(e){
        e.preventDefault()
        getUserInfo()

    })
    

    $('#btn_form').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/userinfo',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            data:$(this).serialize(),
            success:function(res){
               if(res.status !==0){
                   return layer.msg(res.message)
               }
               layer.msg('更新成功')
               console.log(res);
   
               window.parent.getUsermsg()
               
            }
   
        })


    })

    

    







})
 //获得服务器的内容
 function getUserInfo(){
     $.ajax({
         method:'GET',
         url:'http://www.liulongbin.top:3007/my/userinfo',
         headers:{
            Authorization:localStorage.getItem('token')||''
        },
         success:function(res){
             if(res.status !==0){
                 return layer.msg(res.message)
             }
             console.log(res);

             var form=layui.form


             form.val('formUserInfo',res.data)



  

         }
     })
 }



