function saveEdit(){
 $.ajax({
    url : "http://localhost:3000/admin/Staff/EditStaff/SaveEdit",
    type : "put",
    data : {
        staffname : $("#fullname").val(),
        username : $("#username").val(),
        phone : $("#mobile").val(),
        email : $("#email").val(),
        id_staff : $("#id_staff").val(),
        role : $("#roleSelect").val()
    },
    success : function(data){
        if(data.status){
            alert("Sửa thông tin nhân viên thành công!")
            window.location.href = "/admin/Staff"
        }else{
            alert("Lỗi! Không thể chỉnh sửa thông tin nhân viên")
        }
    },
    error : function(err){
        console.log(err)
        alert("Lỗi!")
    }
 })
}