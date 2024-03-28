$(document).ready(function(){
    fetchStafData()
})

function getStaffRows(datas){
    var html = ""

    for(data of datas){
        html = html + `<tr id="staff_row_id${data.id}"><td></td><td >${data.name}</td><td >${data.username}</td><td >${data.email}</td><td >${data.mobile}</td><td>${data.role}</td><td ><form method="get" action="http://localhost:3000/admin/Staff/EditStaff"> <input type="hidden" name="staffid" value="${data.id}"/> <input type="submit" value="Sửa" class="btn btn-warning btn-sm">  </form></td><td ><input type="button" onclick="Delete(${data.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
    }
    return html
}

function fetchStafData(){
    $.ajax({
        url : "http://localhost:3000/admin/Staff/GetAllStaff",
        type : "GET",
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể lấy dữ liệu")
            }else{
                $("#staff_tab").html(getStaffRows(data.staff))
            }
        },
        error : function(error){
            console.log(error)
            alert("Lỗi!")
        }
    })
}

function Delete(id){
    $.ajax({
        url : `http://localhost:3000/admin/Staff/DeleteStaff?staffid=${id}`,
        type : "DELETE",
        dataType : "json",
        success : function(data){
            if(data.error === 1){
                alert("Lỗi! Không thể xóa ")
            }else if(data.error === 2){
                $("#staff_change_tab").html("")
                for(datastaff of data.staffdata){
                    $("#staff_change_tab").append(`<tr><td>#${datastaff.id}</td><td>${datastaff.name}</td><td><button class="btn btn-danger btn-sm" onclick="transfer(${datastaff.id}, '${data.dataOrder}')">Thay thế</button></td></tr>`)
                }
                changeStaff()
            }else if(data.error === 3){
                $(`#staff_tab #staff_row_id${id}`).remove()
            }
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function changeStaff(){
    $("#addProduct").css('opacity', '1')
    $("#addProduct").css('display', 'block')
}

function disappearChangeStaff(){
    $("#addProduct").css('display', 'none')
}

function transfer(id_staf ,orderstr){
    $.ajax({
        url : "http://localhost:3000/admin/Staff/TransferStaff",
        type : "put",
        data : {
            idStaf : id_staf,
            orderStr : orderstr,
        },
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể thay người đảm nhiệm")
            }else{
                alert("Thay thế thành công!")   
            }
            disappearChangeStaff()
        },
        error: function(error){
            console.log(error)
            alert("Lỗi!")
        }
    })
}