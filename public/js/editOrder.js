function appearAddProduct(){
    $("#addProduct").css('opacity', '1')
    $("#addProduct").css('display', 'block')
}

function disappearAddPro(){
    $("#addProduct").css('display', 'none')
}

function addtoOrder(id_pro, id_order){
    $.ajax({
        url:"http://localhost:3000/admin/home/dashboard/addProduct_Order",
        type: "post",
        data:{
            id_pro : id_pro,
            id_order : id_order
        },
        success : function(data){
            if(data.add_status === "true"){
                if(data.isEx === "false"){
                    console.log(data)
                    $('#tab_order_item').append(`<tr id="pro_row_id${id_pro}"><td><input name="check_add_product" value="${id_pro}" type="checkbox"></td><td >#${id_pro}</td><td>${data.product[0].name}</td><td><img src="/images/${data.product[0].featured_image}"></td><td style="text-wrap: nowrap;"><span>${data.product[0].unit_price.toLocaleString('vi-VN')}</span> đ</td><td><span id="pro_qty_id${id_pro}">${data.product[0].qty}</span></td><td><span id="pro_totalprice_id${id_pro}">${data.product[0].total_price.toLocaleString('vi-VN')}</span> đ</td></tr>`)
                }else if(data.isEx === "true"){
                    $(`#pro_qty_id${id_pro}`).text(data.product[0].qty)
                    $(`#pro_totalprice_id${id_pro}`).text(data.product[0].total_price.toLocaleString('vi-VN'))
                }
                $('#total_no_fee').text(data.total.toLocaleString('vi-VN') + " đ")
                $('#total_with_fee').text(data.totalWfee.toLocaleString('vi-VN') + " đ")
            }else if(data.add_status === "false"){
                alert("Không thể thêm sản phẩm")
            }
        },
        error : function(error, status){
            alert("Lỗi! không thể thực hiện")
        }
    })
}

function removeFromOrder(id){
    const idOrder = id
    var checkboxes = document.getElementsByName("check_add_product")
    var id_list = []
    var check = false
    for(checkbox of checkboxes){
        if(checkbox.checked){
            id_list.push(checkbox.value)
            check = true
        }
    }
    if(check){
        const joinArr = id_list.join(", ")
        console.log(joinArr )
        $.ajax({
            url:"http://localhost:3000/admin/home/dashboard/deleteProduct_Order",
            type: "DELETE",
            data:{
                id_list : joinArr,
                id_order : idOrder
            },
            success : function(data){
                if(data.del_status === "true"){
                    for(id of id_list){
                        $(`#tab_order_item #pro_row_id${id}`).remove();
                    }
                    $('#total_no_fee').text(data.total.toLocaleString('vi-VN') + " đ")
                    $('#total_with_fee').text(data.totalWfee.toLocaleString('vi-VN') + " đ")
                }else if(data.del_status === "false"){
                    alert("Không thể xóa sản phẩm")
                }
            },
            error : function(error, status){

            }
        })
    }else{
        alert("Hãy chọn sản phẩm bằng cách tick vào!")
    }
}

function saveEdit(id_cus,id){
    const orderID = id
    const status = $("#status_choose").val()
    const receive_name = $("#receive_name").val()
    const phone_recei = $("#recei_phonenum").val()
    const payment_med = $("#payment_med").val()
    const ship_fee = $("#ship_fee").val()
    const address = $("#address").val()
    const ship_date = $("#ship_date").val()
    const staff_id = $("#staff_choose").val()
    const city = $("#city").val()
    const ward = $("#ward").val()
    $.ajax({
        url:"http://localhost:3000/admin/home/dashboard/UpdateOrder",
        type: "PUT",
        data:{
            id_cus : id_cus,
            id_order : orderID,
            status : status,
            re_name : receive_name,
            re_phone : phone_recei,
            payMed : payment_med,
            shipFee : ship_fee,
            address : address,
            shipDate : ship_date,
            staffID : staff_id,
            province_id : city,
            ward : ward
        },
        success : function(data){
            if(data.status){
                alert("Cập nhật thành công!")
                window.location.href = "http://localhost:3000/admin/Order"
            }else{
                alert("Lỗi! không thể cập nhật")
            }
       
        },
        error : function(error, status){
            console.log(error)
        }
    })
}

function getDistrict(){
    const city = $("#city").val()
    if(city === ""){
        $("#district").html("")
        $("#ward").html("")
    }else{
        $("#district").html("")
        $("#ward").html("")
        $.ajax({
            url:`http://localhost:3000/admin/home/dashboard/getDistrict?idprovince=${city}`,
            type: "GET",
            dataType : "json",
            success : function(data){
                if(data.error === false){
                   var html = "<option value='' selected>Quận / huyện</option>"
                   for(var i = 0 ; i < data.district.length ; i++){
                    html = html + "<option value='"+ data.district[i].id+"'>"+ data.district[i].name+"</option>"
                   }
                   $("#district").html(html)
                }else{
                    alert("Lỗi! không thể lấy dữ liệu")
                }
            },
            error : function(error, status){
                console.log(error)
            }
        })
    }
}

function getWard(){
    const dis = $("#district").val()
    if(dis === ""){
        $("#ward").html("")
    }else{
        $("#ward").html("")
        $.ajax({
            url:`http://localhost:3000/admin/home/dashboard/getWard?districtID=${dis}`,
            type: "GET",
            dataType : "json",
            success : function(data){
                if(data.error === false){
                   var html = " <option value='' selected>Phường / xã</option>"
                   for(var i = 0 ; i < data.ward.length ; i++){
                    html = html + "<option value='"+ data.ward[i].id+"'>"+ data.ward[i].name+"</option>"
                   }
                   $("#ward").html(html)
                }else{
                    alert("Lỗi! không thể lấy dữ liệu")
                }
            },
            error : function(error, status){
                console.log(error)
            }
        })
    }
}