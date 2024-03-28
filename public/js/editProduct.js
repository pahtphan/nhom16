$("#editProduct_form").submit(function(e){
    e.preventDefault()

    var hasImg = false
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
        if(document.getElementById("img_product").files[0]){
            hasImg = true
        }
        form.append('id_pro', document.getElementById("id_pro").value)
        form.append('hasImg' , hasImg)
        form.append('img_product' , document.getElementById("img_product").files[0])
        form.append('name_pro', document.getElementById('name_product').value)
        form.append('price_pro', document.getElementById('retail_price').value)
        form.append('qty_pro', document.getElementById('inventory_number').value)
        form.append('cate_choose', document.getElementById('category_product').value)
        form.append('isfeat', isFeate)
        form.append('descript_pro', CKEDITOR.instances.CK1.getData())
        $.ajax({
            url : `http://localhost:3000/admin/Product/editProduct`,
            type : "PUT",
            data: form,
            processData: false,
            contentType: false,
            success : function(data){
                if(data.editPro_status){
                    alert("Sửa sản phẩm thành công!")
                    window.location.href = "/admin/Product"
                }else{
                    alert("Lỗi! Không thể sửa sản phẩm")
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
    var currentImg = document.getElementById('img_product_preview')
    var output = document.getElementById('img_pre');
    if(event.target.files[0]){
        currentImg.style.display = "none"
        output.src = URL.createObjectURL(event.target.files[0]);
        output.style.display = "block"
    }else{
        currentImg.style.display = "block"
        output.src = null
        output.style.display = "none"
    }
}