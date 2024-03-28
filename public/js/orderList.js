$(document).ready(function(){
    getAll()
})

function getFormatDateTime(datetime){
    let toArr = datetime.split("")
    toArr.splice(-5,5)
    let joinArr = toArr.join("")
    let res = joinArr.replace("T", " ")
    return res
}

function getFormatDate(date){
    let toArr = date.split("")
    toArr.splice(-14,14)
    let res = toArr.join("")
    return res
}

function getRowOrder(orders){
    let html = ""
    for(let order of orders){
        switch (order.order_status_id) {
            case 1:
                switch (order.payment_method) {
                    case 0:
                        const credate10 = getFormatDateTime(order.created_date)
                        const shipdate10 =  getFormatDate(order.delivered_date)
                        const shipfee = order.shipping_fee
                        const total = order.total
                        const totalwFee = order.toltalwfee
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td id='order_status_${order.id}'>Đã đặt hàng</td><td>${credate10}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>COD</td><td>${total.toLocaleString('vi-VN')} đ</td><td>${shipfee.toLocaleString('vi-VN')} đ</td><td>${totalwFee.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate10}</td><td >${order.staffname}</td><td > <input type="button" id="acpt_orderID_${order.id}" onclick="Accept(${order.id});" value="Xác nhận" class="btn btn-primary btn-sm"> </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form> </td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;

                    case 1:
                        const shipfee1 = order.shipping_fee
                        const total1 = order.total
                        const totalwFee1 = order.toltalwfee
                        const credate11 = getFormatDateTime(order.created_date)
                        const shipdate11 = getFormatDate(order.delivered_date)
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td id='order_status_${order.id}'>Đã đặt hàng</td><td>${credate11}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>Bank</td><td>${total1.toLocaleString('vi-VN')} đ</td><td>${shipfee1.toLocaleString('vi-VN')} đ</td><td>${totalwFee1.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate11}</td><td >${order.staffname}</td><td > <input type="button" id="acpt_orderID_${order.id}"onclick="Accept(${order.id});" value="Xác nhận" class="btn btn-primary btn-sm"></td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;
                
                    default:
                        break;
                }
                
            break;

            case 2:
                switch (order.payment_method) {
                    case 0:
                        const shipfee = order.shipping_fee
                        const total = order.total
                        const totalwFee = order.toltalwfee
                        const credate10 = getFormatDateTime(order.created_date)
                        const shipdate10 =  getFormatDate(order.delivered_date)
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đã xác nhận</td><td>${credate10}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>COD</td><td>${total.toLocaleString('vi-VN')} đ</td><td>${shipfee.toLocaleString('vi-VN')} đ</td><td>${totalwFee.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate10}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;

                    case 1:
                        const shipfee1 = order.shipping_fee
                        const total1 = order.total
                        const totalwFee1 = order.toltalwfee
                        const credate11 = getFormatDateTime(order.created_date)
                        const shipdate11 = getFormatDate(order.delivered_date)
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đã xác nhận</td><td>${credate11}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>Bank</td><td>${total1.toLocaleString('vi-VN')} đ</td><td>${shipfee1.toLocaleString('vi-VN')} đ</td><td>${totalwFee1.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate11}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;
                
                    default:
                        break;
                }
            break;

            case 3:
                switch (order.payment_method) {
                    case 0:
                        const shipfee = order.shipping_fee
                        const total = order.total
                        const totalwFee = order.toltalwfee
                        const credate10 = getFormatDateTime(order.created_date)
                        const shipdate10 =  getFormatDate(order.delivered_date)
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Hoàn tất đóng gói</td><td>${credate10}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>COD</td><td>${total.toLocaleString('vi-VN')} đ</td><td>${shipfee.toLocaleString('vi-VN')} đ</td><td>${totalwFee.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate10}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;

                    case 1:
                        const shipfee1 = order.shipping_fee
                        const total1 = order.total
                        const totalwFee1 = order.toltalwfee
                        const credate11 = getFormatDateTime(order.created_date)
                        const shipdate11 = getFormatDate(order.delivered_date)
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Hoàn tất đóng gói</td><td>${credate11}</td><td>${order.shipping_name}</td><td>${order.shipping_name}</td><td>Bank</td><td>${total1.toLocaleString('vi-VN')} đ</td><td>${shipfee1.toLocaleString('vi-VN')} đ</td><td>${totalwFee1.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate11}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;
                
                    default:
                        break;
                }
            break;

            case 4:
                switch (order.payment_method) {
                    case 0:
                        const shipfee = order.shipping_fee
                        const total = order.total
                        const totalwFee = order.toltalwfee
                        const credate10 = getFormatDateTime(order.created_date)
                        const shipdate10 =  getFormatDate(order.delivered_date)
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đang giao hàng</td><td>${credate10}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>COD</td><td>${total.toLocaleString('vi-VN')} đ</td><td>${shipfee.toLocaleString('vi-VN')} đ</td><td>${totalwFee.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate10}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;

                    case 1:
                        const shipfee1 = order.shipping_fee
                        const total1 = order.total
                        const totalwFee1 = order.toltalwfee
                        const credate11 = getFormatDateTime(order.created_date)
                        const shipdate11 = getFormatDate(order.delivered_date)
                        html = html + `<tr id="order_id_row_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đang giao hàng</td><td>${credate11}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>Bank</td><td>${total1.toLocaleString('vi-VN')} đ</td><td>${shipfee1.toLocaleString('vi-VN')} đ</td><td>${totalwFee1.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate11}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;
                
                    default:
                        break;
                }
            break;

            case 5:
                switch (order.payment_method) {
                    case 0:
                        const shipfee = order.shipping_fee
                        const total = order.total
                        const totalwFee = order.toltalwfee
                        const credate10 = getFormatDateTime(order.created_date)
                        const shipdate10 =  getFormatDate(order.delivered_date)
                        html = html + `<tr id="row_ID_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đã giao thành công</td><td>${credate10}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>COD</td><td>${total.toLocaleString('vi-VN')} đ</td><td>${shipfee.toLocaleString('vi-VN')} đ</td><td>${totalwFee.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate10}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;

                    case 1:
                        const shipfee1 = order.shipping_fee
                        const total1 = order.total
                        const totalwFee1 = order.toltalwfee
                        const credate11 = getFormatDateTime(order.created_date)
                        const shipdate11 = getFormatDate(order.delivered_date)
                        html = html + `<tr id="row_ID_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đã giao thành công</td><td>${credate11}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>Bank</td><td>${total1.toLocaleString('vi-VN')} đ</td><td>${shipfee1.toLocaleString('vi-VN')} đ</td><td>${totalwFee1.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate11}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;
                
                    default:
                        break;
                }
            break;
            
            case 6:
                switch (order.payment_method) {
                    case 0:
                        const shipfee = order.shipping_fee
                        const total = order.total
                        const totalwFee = order.toltalwfee
                        const credate10 = getFormatDateTime(order.created_date)
                        const shipdate10 =  getFormatDate(order.delivered_date)
                        html = html + `<tr id="row_ID_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đơn hàng đã bị hủy</td><td>${credate10}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>COD</td><td>${total.toLocaleString('vi-VN')} đ</td><td>${shipfee.toLocaleString('vi-VN')} đ</td><td>${totalwFee.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate10}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;

                    case 1:
                        const shipfee1 = order.shipping_fee
                        const total1 = order.total
                        const totalwFee1 = order.toltalwfee
                        const credate11 = getFormatDateTime(order.created_date)
                        const shipdate11 = getFormatDate(order.delivered_date)
                        html = html + `<tr id="row_ID_${order.id}"><td><input type="checkbox" name="check_order_del" value="${order.id}"></td><td>#${order.id}</td><td>${order.name}</td><td>${order.mobile}</td><td>${order.email}</td><td  id='order_status_${order.id}'>Đơn hàng đã bị hủy</td><td>${credate11}</td><td>${order.shipping_name}</td><td>${order.shipping_mobile}</td><td>Bank</td><td>${total1.toLocaleString('vi-VN')} đ</td><td>${shipfee1.toLocaleString('vi-VN')} đ</td><td>${totalwFee1.toLocaleString('vi-VN')} đ</td><td>${order.housenumber_street}</td><td>${shipdate11}</td><td >${order.staffname}</td><td > </td><td ><form action="http://localhost:3000/admin/home/dashboard/getOrder" method="GET"> <input type="hidden" value="${order.id}" name="order_edit" /><input type="submit" value="Sửa" class="btn btn-warning btn-sm"> </form></td><td > <input type="button" onclick="del_order(${order.id});" value="Xóa" class="btn btn-danger btn-sm"></td></tr>`
                        break;
                
                    default:
                        
                        break;
                }
            break;
        
            default:

                break;
        }
        
    }
    return html
}

function getAll(){
    $.ajax({
        url: 'http://localhost:3000/admin/home/dashboard/getAll',
        type: "get",
        dataType: "json",
        success: function(data){
            $('#tab_body').html(getRowOrder(data.order))
        },
        error: function(xhr, status, error){
            console.log(error)
        }
    })
}

function del_choose_order(){
    var orderList = []
    const orders = document.getElementsByName("check_order_del");
    var check = false
    for(order of orders){
        if(order.checked){
            orderList.push(order.value)
            check = true
        }
    }
    if(check){
        const ArrtoStr = orderList.join(", ")
        $.ajax({
            url: "http://localhost:3000/admin/delete_choose_order",
            type: "DELETE",
            dataType: "json",
            data : {
                orderList : ArrtoStr
            },
            success: function(data){
                    alert("Xóa đơn hàng thành công!")
                    if(data.status){
                        console.log(data)
                        for(order of orderList){
                            $(`#tab_body #order_id_row_${order}`).remove();
                        }
                    }else{
                        alert("Lỗi! không thể xóa đơn hàng")
                    }

            },
            error: function(xhr, status, error){
                console.log(error)
            }
        })
    }else{
        alert("Hãy chọn ít nhất 1 đơn hàng để xóa!")
    }

}

function del_order(id){
    var url = `http://localhost:3000/admin/home/dashboard/delete_order/${id}`
    $.ajax({
        url: url,
        type: "DELETE",
        dataType: "json",
        success: function(data){
            if(data.error === 'false'){
                alert("Xóa đơn hàng thành công!")
                console.log(data)
                $(`#tab_body #order_id_row_${id}`).remove();
            }else{
                alert("Lỗi, không thể xóa!")
            }
        },
        error: function(xhr, status, error){
            console.log(error)
        }
    })
}

function Accept(id){
    $.ajax({
        url: `http://localhost:3000/admin/home/dashboard/acptOrder?ID_order=${id}`,
        type : "PUT",
        dataType: "json",
        success : function(data){
            if(data.status){
                alert("Xác nhận thành công!")
                $(`#order_status_${id}`).text("Đã xác nhận")
                $(`#acpt_orderID_${id}`).css('display','none')
            }else{
                alert("Không thể xác nhận!")
            }
        },
        error: function(error, status){
            console.log(error)
            alert("Lỗi")
        }
    })
}