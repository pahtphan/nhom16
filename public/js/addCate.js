function CreateNewCate(){
    const dataname = $('#name_cate').val()
    console.log(dataname)
    $.ajax({
        url: "http://localhost:3000/admin/Categorise/addCate/CreateNewCate",
        type : "POST",
        data :{
            name : dataname
        },
        success: function(data){
            if(data.status){
                alert("Thêm danh mục thành công!")
                window.location.href = "/admin/Categories"
            }else{
                alert("Lỗi! Không thể thêm danh mục")
            }
        },
        error : function(err){
            console.log(err)
        }
    })
}