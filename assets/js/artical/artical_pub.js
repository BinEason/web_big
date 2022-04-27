$(function(){

    var form =layui.form


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


     // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  
  // 3. 初始化裁剪区域
  $image.cropper(options)

   getCate()

   initEditor()

   $('#btnChoose').on('click',function(){
    $('#coverfile').click()


   })

   $('#coverfile').on('change',function(e){
    var files= e.target.files
    if(files.length ===0){
        return
    }

    var newImgURL = URL.createObjectURL(files[0])

    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
})


   var art_state='已发布'

   $('#btnSave').on('click',function(){
    art_state='草稿'
   })


   $('#form-pub').on('submit',function(e){
       e.preventDefault()

       var fa=new FormData($(this)[0])
       fa.append('state',art_state)

       $image
           .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
               width: 400,
               height: 280
           })
           .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
               fa.append('cover_img',blob)


               publishArtical(fa)

           })


   })


   //发表文章
   function publishArtical(data){
       $.ajax({
           method:'POST',
           url:'http://www.liulongbin.top:3007/my/article/add',
           headers:{
               Authorization:localStorage.getItem('token')
           },
           data:data,
           contentType:false,
           processData:false,
           success:function(res){
               if(res.status !== 0){
                return layui.layer.msg(res.message)
               }
               layui.layer.msg('发布成功')
               location.href='/artical/artical_list.html'
           }
           

       })

   }





   




})