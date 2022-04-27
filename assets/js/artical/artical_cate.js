$(function(){

    var form=layui.form
    var index=null


    getActicalList()

    $('#addList').on('click',function(){
        index = layer.open({
            type:1,
            title: '添加文章类别',
            area:['500px','250px']
            ,content: $('#addActicalCate').html()
            
            
          });     


    })


    $('body').on('submit','#form-add',function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/article/addcates',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                getActicalList()

                layui.layer.msg("新增成功！")

                layui.layer.close(index)


            }
        })
    })


    var editIndex=null

    $('tbody').on('click','#btn_edit',function(){
       editIndex  = layer.open({
            type:1,
            title: '添加文章类别',
            area:['500px','250px']
            ,content:$('#editActical').html(),
          });   
          
          var id=$(this).attr('data-id')
          console.log(id);

          $.ajax({
            method:"GET",
            url:'http://www.liulongbin.top:3007/my/article/cates/'+ id,
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                if(res.status !==0){
                    return layui.layer.msg(res.message)
                }

                form.val('form-edit',res.data)
                  

            }


          })

          
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/article/updatecate',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layui.layer.msg(res.message)
                }

                layui.layer.msg('更新成功')

                

                layui.layer.close(editIndex)

                getActicalList()

            }
        })

    })

    $('tbody').on('click','#btn_del',function(){

        var id=$(this).attr('data-id')

            
        layer.confirm('是否删除？', {icon: 3, title:'提示'}, function(index){

            

            $.ajax({
                method:'GET',
                url:'http://www.liulongbin.top:3007/my/article/deletecate/'+id,
                headers:{
                    Authorization:localStorage.getItem('token'),
                },
 
                success:function(res){
                    if(res.status !==0){
                        return layui.layer.msg(res.message)
                    }


                    getActicalList()

                    layer.close(index);

                }
            })
            
            
            
            
            
            
          });




         

    })











})

 function getActicalList(){
     $.ajax({
         method:'GET',
         url:'http://www.liulongbin.top:3007/my/article/cates',
         headers:{
             Authorization:localStorage.getItem('token')
         },
         success:function(res){
             if(res.status !== 0){
                 return layui.layer.msg(res.message)
             }
            var htmlstr= template('getActical',res)

             $('.layui-table tbody').html(htmlstr)
         }

     })
 }