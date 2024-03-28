$(document).ready(function(){
    getImages()
})

function getRowIamge(datas){
    var html = ""
    console.log(datas)
    for(data of datas){
        
        html = html + `<tr id="row_${data.id}"><td><input type="checkbox" name="check_img" value="${data.id}"></td><td><img src="/images/${data.name}"></td><td><input type="button" onclick="Delete(${data.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`

    }

    return html
}

function getImages(){
    $.ajax({
        url : "http://localhost:3000/admin/Images/getImages",
        type: "get",
        dataType: "json",
        success : function(data){
            if(data.imageStatus){
                console.log(data)
                $('#image_tab').html(getRowIamge(data.images))
            }else{
                alert("Lỗi! Không thể lấy hình ảnh")
            }
        },
        error : function(error){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function Delete(idImg){
    $.ajax({
        url : `http://localhost:3000/admin/Images/delImage?imgID=${idImg}`,
        type : "DELETE",
        success : function(data){
            if(data.deleteImgStat){
                alert("Xóa ảnh thành công!")
                $(`#image_tab #row_${idImg}`).remove()
            }else{
                alert("Lỗi! Không thể xóa ảnh")
            }
        }, 
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function DeleteMorethanOne(){
    const check_img = document.getElementsByName('check_img')
    var imgid_list = []
    var hasval = false
    for(check of check_img){
        if(check.checked){
            imgid_list.push(check.value)
            hasval = true
        }
    }

    if(hasval){
        const arrtoStr = imgid_list.join(", ")
        $.ajax({
            url : `http://localhost:3000/admin/Images/delmoreImg`,
            type : "DELETE",
            data : {
                img_list : arrtoStr
            },
            success : function(data){
                if(data.deleteImgStat){
                    alert("Xóa ảnh thành công!")
                    for(id of imgid_list){
                        $(`#image_tab #row_${id}`).remove()
                    }
                }else{
                    alert("Lỗi! Không thể xóa ảnh")
                }
            }, 
            error : function(err){
                console.log(err)
                alert("Lỗi!")
            }
        })
    }else{
        alert("Hãy chọn ít nhất 1 hình ảnh để xóa")
    }
}