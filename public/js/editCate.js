function UpdateCate(){
    const nameCate = $("#name_cate").val()
    const idCate = $("#id_cate").val()
    $.ajax({
        url: "http://localhost:3000/admin/Categorise/UpdateCate",
        type : "PUT",
        data : {
            nameCate : nameCate,
            id_cate : idCate
        },
        success : function(data){
            if(data.status){
                alert("Chỉnh sửa danh mục thành công!")
                window.location.href = "/admin/Categories"
            }else{
                alert("Lỗi! Không thể sửa danh mục")
            }
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}