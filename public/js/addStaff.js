function saveNew(){
    $.ajax({
        url : "http://localhost:3000/admin/Staff/addStaff/addNew",
        type : "POST",
        data : {
            staffname : $("#fullname").val(),
            username : $("#username").val(),
            password : $("#password").val(),
            phone : $("#mobile").val(),
            email : $("#email").val(),
            role : $("#roleSelect").val()
        },
        success : function(data){
            if(data.status){
                alert("Thêm nhân viên thành công!")
                window.location.href = "/admin/Staff"
            }else{
                alert("Lỗi! Không thể thêm mới nhân viên")
            }
        },
        error: function(error){
            console.log(error)
            alert("Lỗi!")
        }
    })
}