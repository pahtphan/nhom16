$("#addProduct_form").submit(function(e){
    e.preventDefault()

    var isFeate = 0
    var checkisFeat = false
    const isFeatCheck = document.getElementsByName("isFeatCheck")
    for(check of isFeatCheck){
        if(check.checked){
            checkisFeat = true
            break
        }
    }
    if(document.getElementById("category_product").value === ""){
        alert("Vui lòng chọn danh mục sản phẩm!")
    }else{
        if(checkisFeat){
            isFeate = 1
        }

        var form = new FormData()
        form.append('img_product' , document.getElementById("img_product").files[0])
        form.append('name_pro', document.getElementById('name_product').value)
        form.append('price_pro', document.getElementById('wholesale_price').value)
        form.append('qty_pro', document.getElementById('inventory_number').value)
        form.append('cate_choose', document.getElementById('category_product').value)
        form.append('isfeat', isFeate)
        form.append('descript_pro', CKEDITOR.instances.CK1.getData())

        $.ajax({
            url : "http://localhost:3000/admin/Product/addProduct/addnew",
            type : "POST",
            data: form,
            processData: false,
            contentType: false,
            success : function(data){
                if(data.addProductStatus){
                    alert("Thêm sản phẩm thành công!")
                    window.location.href = "/admin/Product"
                }else{
                    alert("Lỗi! Không thể thêm sản phẩm")
                }
            },
            error : function(err){
                console.log(err)
                alert("Lỗi!")
            }
        })
    }
})

function showImagepre(event){
    var output = document.getElementById('img_pre');
    if(event.target.files[0]){
        output.src = URL.createObjectURL(event.target.files[0]);
        output.style.display = "block"
    }else{
        output.src = null
        output.style.display = "none"
    }
}
