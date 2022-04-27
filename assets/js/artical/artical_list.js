$(function(){

    var form = layui.form
    var laypage= layui.laypage
    var q={
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:'',

    }

    template.defaults.imports.dataForm=function(date){
        const dt=new Date(date)
        var y=padZore(dt.getFullYear())
        var m=padZore(dt.getMonth()+1)
        var d=padZore(dt.getDate())

        var hh=padZore(dt.getHours())
        var mm=padZore(dt.getMinutes())
        var ss=padZore(dt.getSeconds())

        return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
    }

    function padZore(n){
        return n>9?n:'0'+n
    }

    function getTable(){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3007/my/article/list',
            data: q,
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }


               var htmlstr = template('tpl-table',res)
               $('tbody').html(htmlstr)

               renderPage(res.total)


            }
        })
    }

    function getCate(){
         $.ajax({
             method:'GET',
             url:'http://www.liulongbin.top:3007/my/article/cates',
             headers:{
                 Authorization:localStorage.getItem('token'),
             },
             success:function(res){
                 if(res.status !== 0){
                     return layui.layer.msg(res.message)
                 }
               var htmlstr=  template('tpl-cate',res)

             
               $('[name="cate_id"]').html(htmlstr)
               form.render()
             }
         })
    }

    $('#form-search').on('submit',function(e){
      e.preventDefault()

      var cate_id= $('[name="cate_id"]').val()
      var state =$('[name="state"]').val()

      q.cate_id=cate_id
      q.state-state

      getTable()
      
    })

    function renderPage(total){
        
        laypage.render({
            elem:'pageBox',
            count:total,
            limit:q.pagesize,
            curr:q.pagenum,
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            //点击页码时，会触发jump(),就会进入死循环
            //只要调用，render(),就会进入死循环
            jump:function(obj,first){

           q.pagenum=obj.curr

           q.pagesize=obj.limit



           if(!first){
           getTable()
           }

           



            }
            

        })

    }

    $('tbody').on('click','.btn_del',function(){
        var len=$('.btn_del').length
        

        var id =$(this).attr('data-id')

        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'http://www.liulongbin.top:3007/my/article/delete/'+id,
                headers:{
                    Authorization:localStorage.getItem('token'),
                },
                success:function(res){
                    if(res.status !== 0){
                        return layui.layer.msg(res.message)
                    }

                    layui.layer.msg('删除成功')

                    if(len === 1){
                        q.pagenum=q.pagenum===1?q.pagenum:q.pagenum-1
                    }
                    getTable()

                  
                }
            })
            
            layer.close(index);
          });
    })



    getTable()
    getCate()
})