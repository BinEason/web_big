$(function(){
    // 转注册页面
    $('#link_reg a').on('click',function(){
        $('#link_reg').hide(500)
        $('#link_login').show(500)


    })
 
  // 转登录页面
    $('#link_login a').on('click',function(){
        $('#link_login').hide(500)
        $('#link_reg').show(500)


    })
  //账号框密码文字显示问题
    $('.zh2').on('focus',function(){
        $(this).attr('placeholder','')
    })

    $('.zh2').on('blur',function(){
        $(this).attr('placeholder','请输入账号')
    })

    $('.mm2').on('focus',function(){
        $(this).attr('placeholder','')
    })

    $('.mm2').on('blur',function(){
        $(this).attr('placeholder','请输入密码')
    })

    //自定义正则
    var form =layui.form

    form.verify({
        user:[/^[\S][a-zA-Z0-9-_]{2,7}$/,
        '账号只能由3到8位字母或数字或下划线组成'],


        pwd:[/^[\S]{5,11}$/,
        '请输入6到12位密码且不能有空格'],

        repwd:function(value){

           var val= $('#reg_form [name=password]').val()
           if(val !== value){
               return '两次密码不一致'
           }

        }

    })




    // 注册
    var layer = layui.layer


    $('#reg_form').on('submit',function(e){
        e.preventDefault()

        $.post('http://www.liulongbin.top:3007/api/reguser',{
            username:$('#reg_form [name=username]').val(),
            password:$('#reg_form [name=password]').val(),
        },function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }

            layer.msg('注册成功，请登录！')

            //自动触发跳转
            $('#reg_a').click()

            
        })

    })


    //登录

    $('#login_form').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            url:'http://www.liulongbin.top:3007/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')

                localStorage.setItem('token',res.token)

                setTimeout(function(){
                    location.href='/index.html'
                },1000)

            }
             

        })
    })





})