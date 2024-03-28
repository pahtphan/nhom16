$(document).ready(function(){
    getCate()
})

function getCateRows(datas){
    var html = ""
    for(data of datas){
        if(data.name !== "null"){
            html = html + `<tr id="CateRow_id_${data.id}"><td><input type="checkbox" name="checkCate" value="${data.id}"></td><td >${data.name}</td><td ><form method="GET" action="http://localhost:3000/admin/Categorise/GetCate"> <input type="hidden" value="${data.id}" name="id_cate" /> <input type="submit" value="Sửa" class="btn btn-warning btn-sm">  </form> </td><td ><input type="button" onclick="Delete(${data.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
        }
    }
    return html
}

function getCate(){
    $.ajax({
        url : "http://localhost:3000/admin/Categories/getAllCate",
        type : "GET",
        dataType: "json",
        success: function(data){
            if(data.status){
                $("#tab_cate").html(getCateRows(data.cateData))
            }else{
                alert("Lỗi! Không thể hiển thị danh sách danh mục")
            }
        },
        error : function(error){
            console.log(error)
        }
    })
}


function Delete(id){
    $.ajax({
        url : `http://localhost:3000/admin/Categories/delCate?id_cate=${id}`,
        type : "DELETE",
        dataType: "json",
        success: function(data){
            if(data.status){
                $(`#tab_cate #CateRow_id_${id}`).remove()
            }else{
                alert("Lỗi! Không thể xóa danh mục")
            }
        },
        error : function(error){
            console.log(error)
        }
    })
}

function DeleteMore(){
    const checkCate = document.getElementsByName("checkCate")
    var checkArr = []
    for(box of checkCate ){
        if(box.checked){
            checkArr.push(box.value)
        }
    }
    if(checkArr.length > 0){
        const arr_toStr = checkArr.join(", ")
        $.ajax({
            url : `http://localhost:3000/admin/Categories/delCateChoose`,
            type : "DELETE",
            dataType: "json",
            data : {
                cateList : arr_toStr
            },
            success: function(data){
                if(data.status){
                    for(cate of checkArr){
                        $(`#tab_cate #CateRow_id_${cate}`).remove()
                    }
                }else{
                    alert("Lỗi! Không thể xóa danh mục")
                }
            },
            error : function(error){
                console.log(error)
            }
        })
    }else{
        alert("Hãy chọn ít nhất 1 danh mục để xóa")
    }
    
}