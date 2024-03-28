$(document).ready(function(){
    getAllProduct()
})

function getProductRow(datas){
    var html =""
    for(data of datas){
        if(data.name === 'null' && data.barcode === '0' ){

        }else{
            switch(data.featured){
                case 0:
                    html = html + `<tr id="product_row_id_${data.id}"><td><input type="checkbox" name="product_check" value="${data.id}"></td><td>#${data.id}</td><td>${data.name}</td><td><img src="/images/${data.featured_image}"></td><td>${data.price.toLocaleString('vi-VN')} ₫</td><td>${data.discount_percentage}%</td><td>${(data.price-((data.price*data.discount_percentage)/100)).toLocaleString('vi-VN')} ₫</td><td>${data.inventory_qty}</td><td>${data.star}</td><td></td><td>${data.cate_name}</td><td>${getFormatDateTime(data.created_date)}</td><td><a href="">Đánh giá</a></td><td><a href="../../pages/image/list.html">Hình ảnh</a></td><td><form method="GET" action="http://localhost:3000/admin/Product/getProduct" > <input type="hidden" value="${data.id}" name="id_product"/> <input type="submit" value="Sửa" class="btn btn-warning btn-sm"></form><td><input type="button" onclick="Delete(${data.id});" value="Xóa" class="btn btn-danger btn-sm"></td>  </tr>`
                break
    
                case 1:
                    html = html + `<tr id="product_row_id_${data.id}"><td><input type="checkbox" name="product_check" value="${data.id}"></td><td>#${data.id}</td><td>${data.name}</td><td><img src="/images/${data.featured_image}"></td><td>${data.price.toLocaleString('vi-VN')} ₫</td><td>${data.discount_percentage}%</td><td>${(data.price-((data.price*data.discount_percentage)/100)).toLocaleString('vi-VN')} ₫</td><td>${data.inventory_qty}</td><td>${data.star}</td><td>Có</td><td>${data.cate_name}</td><td>${getFormatDateTime(data.created_date)}</td><td><a href="">Đánh giá</a></td><td><a href="../../pages/image/list.html">Hình ảnh</a></td><td><form method="GET" action="http://localhost:3000/admin/Product/getProduct" > <input type="hidden" value="${data.id}" name="id_product"/> <input type="submit" value="Sửa" class="btn btn-warning btn-sm"></form><td><input type="button" onclick="Delete(${data.id});" value="Xóa" class="btn btn-danger btn-sm"></td>  </tr>`
                break
            }
        }
    }
    return html
}

function getFormatDateTime(datetime){
    let toArr = datetime.split("")
    toArr.splice(-5,5)
    let joinArr = toArr.join("")
    let res = joinArr.replace("T", " ")
    return res
}

function getAllProduct(){
    $.ajax({
        url : "http://localhost:3000/admin/Product/getAllProduct",
        type : "GET",
        dataType : "json",
        success : function(data){
            $("#tab_product").html(getProductRow(data))
        },
        error: function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function Edit(id){
    $.ajax({
        url: `http://localhost:3000/admin/Product/getProduct?id_product=${id}`,
        type : "GET",
        dataType : "json",
        success : function(data){
            
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function DeleteMoreproduct(){
    var productList = []
    var check = false
    var product_tick = document.getElementsByName("product_check")
    for(product of product_tick){
        if(product.checked){
            productList.push(product.value)
            check = true
        }
    }
    if(check){
        const ArrtoStr = productList.join(", ")
        $.ajax({
            url : "http://localhost:3000/admin/Product/deleteMoreThanOnePro",
            type : "DELETE",
            dataType : "json",
            data : {
                productList : ArrtoStr
            },
            success : function(data){
                if(data.deleteStatus){
                    alert("Xóa sản phẩm thành công!")
                    for(product of productList){
                        $(`#tab_product #product_row_id_${product}`).remove()
                    }
                }else{
                    alert("Lỗi! Không thể xóa sản phẩm")
                }
            },
            error : function(err){

            }
        })
    }else{
        alert("Hãy chọn ít nhất 1 sản phẩm để xóa!")
    }
}

function Delete(id){
    $.ajax({
        url : `http://localhost:3000/admin/Product/deleteProduct?idProduct=${id}`,
        type : "DELETE",
        dataType : "json",
        success : function(data){
            if(data.deleteStatus){
                alert("Xóa sản phẩm thành công!")
                $(`#tab_product #product_row_id_${id}`).remove()
            }else{
                alert("Lỗi! Không thể xóa sản phẩm")
            }
        },
        error: function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}