$(document).ready(function(){
    fetchCusData()
})

function getCusRows(datas){
    var html = ""
    for(data of datas){
        switch (data.is_active) {
            case 0:
                html = html + `<tr id="cus_row_id${data.id}"><td><input type="checkbox" name="checkCus" value="${data.id}"></td><td >${data.name}</td><td >${data.email}</td><td >${data.mobile}</td><td>${data.login_by}</td><td>${data.housenumber_street}</td><td>${data.shipping_name}</td><td>${data.shipping_mobile}</td><td>Chưa kích hoạt</td><td ><form method="get" action="http://localhost:3000/admin/Customer/GetCus"><input type="hidden" name="cus_id" value="${data.id}" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"></form> </td><td ><input type="button" onclick="Delete(${data.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                break;

            case 1:
                html = html + `<tr id="cus_row_id${data.id}"><td><input type="checkbox" name="checkCus" value="${data.id}"></td><td >${data.name}</td><td >${data.email}</td><td >${data.mobile}</td><td>${data.login_by}</td><td>${data.housenumber_street}</td><td>${data.shipping_name}</td><td>${data.shipping_mobile}</td><td>Đã kích hoạt</td><td ><form method="get" action="http://localhost:3000/admin/Customer/GetCus"><input type="hidden" name="cus_id" value="${data.id}" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"></form> </td><td ><input type="button" onclick="Delete(${data.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                break;
        
            default:
                break;
        }
        
    }
    return html
}

function Delete(id){
    $.ajax({
        url : `http://localhost:3000/admin/Customer/DeleteCus?idCus=${id}`,
        type : "DELETE",
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể xóa khách hàng")
            }else{
                alert("Xóa khách hàng thành công!")
                $(`#cus_tab #cus_row_id${id}`).remove()
            }
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function DeleteChooseCus(){
    const cuscheck = document.getElementsByName("checkCus")
    var checkArr = []
    for(cus of cuscheck){
        if(cus.checked){
            checkArr.push(cus.value)
        }
    }
    if(checkArr.length){
        const cusStr = checkArr.join(", ")
        $.ajax({
            url : `http://localhost:3000/admin/Customer/DeleteChooseCus`,
            type : "DELETE",
            data : {
                cusList : cusStr
            },
            success : function(data){
                if(data.error){
                    alert("Lỗi! Không thể xóa khách hàng")
                }else{
                    alert("Xóa khách hàng thành công!")
                    for(cus of checkArr){
                        $(`#cus_tab #cus_row_id${cus}`).remove()
                    }
                    
                }
            },
            error : function(err){
                console.log(err)
                alert("Lỗi!")
            }
        })
    }else{
        alert("Hãy chọn ít nhất 1 khách hàng để xóa!")
    }
}

function fetchCusData(){
    $.ajax({
        url : "http://localhost:3000/admin/Customer/GetAllCustomers",
        type : "GET",
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể lấy thông tin khách hàng")
            }else{
                $("#cus_tab").html(getCusRows(data.cus))
            }
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}