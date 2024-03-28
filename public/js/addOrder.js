
function changeCustomer(){
    const ID_cus = $("#customer_choose").val()
    $.ajax({
        url : `http://localhost:3000/admin/getCustomer?id_cus=${ID_cus}`,
        type : "GET",
        dataType : "json",
        success : function(data){
            if(data.error === false){
                console.log(data.cusData[0].shipping_name)
                $('#shipping_name_inp').val(data.cusData[0].shipping_name)
                $('#shipping_phone_inp').val(data.cusData[0].shipping_mobile)
                $('#address_inp').val(data.cusData[0].housenumber_street) 
            }else{
                alert("Lỗi!")
            }
        },
        error : function(error, status){
            console.log(error)
        }
    })
}

function saveOrder(){
    const id_cus = $("#customer_choose").val()
    const id_status =  $("#status_choose").val()
    const name_re = $("#shipping_name_inp").val()
    const phone_re = $("#shipping_phone_inp").val()
    const address = $("#address_inp").val()
    const ship_date = $("#ship_date").val()
    const id_staff =  $("#staff_ship").val()
    const paymed =  $("#payment_med_choose").val()
    const city = $("#city").val()
    const ward = $("#ward").val()
    $.ajax({
        url : `http://localhost:3000/admin/CreateOrder`,
        type : "POST",
        data : {
            id_cus : id_cus,
            id_status : id_status,
            name_re : name_re,
            phone_re : phone_re,
            address : address,
            ship_date : ship_date,
            id_staff : id_staff,
            paymed : paymed,
            province : city,
            ward : ward
        },
        success : function(data){
                if(data.status === "wrongDate"){
                    alert("Sai định dạng ngày!")
                }else if(data.status === true){
                    alert("Thêm đơn hàng thành công!")
                    window.location.href = "http://localhost:3000/admin/home"
                }else{
                    alert("Lỗi! không thể thêm đơn")
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