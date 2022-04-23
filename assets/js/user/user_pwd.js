$(function(){

    var form =layui.form
    var layer=layui.layer

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samePwd:function(value){
              if(value === $('[name=oldPwd]').val()){
                  return "新密码和旧密码不能相同"
              }

          },
          rePwd:function(value){
              if(value !== $('[name=newPwd]').val()){
                  return "两次新密码不一致"
              }
          }

    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/updatepwd',
            headers:{
                Authorization:localStorage.getItem('token')||''
            },
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }

                $('.layui-form')[0].reset()

                layer.msg('请重新登录')

              setTimeout(function(){
                  localStorage.removeItem('token')

                  window.parent.location.href='/index.html'
              },500)


                
            }

        })

    })




})

