function getDistrict(){
    const provinID = $("#provinceChoose").val()
    $.ajax({
        url : `http://localhost:3000/admin/getDistrict?idprovince=${provinID}`,
        type : "GET",
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể lấy thông tin")
            }else{
                $("#districtchoose").html("<option selected value=''>Quận / huyện</option>")
                $("#wardChoose").html("<option selected value=''>Phường / xã</option>")
                for(dis of data.district){
                    $("#districtchoose").append(`<option value='${dis.id}'>${dis.name}</option>`)
                }
            }
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function getWard(){
    const distID = $("#districtchoose").val()
    $.ajax({
        url : `http://localhost:3000/admin/getWard?districtID=${distID}`,
        type : "GET",
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể lấy thông tin")
            }else{
                $("#wardChoose").html("<option selected value=''>Phường / xã</option>")
                for(dis of data.ward){
                    $("#wardChoose").append(`<option value='${dis.id}'>${dis.name}</option>`)
                }
            }
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}

function saveNew(){
    const name = $("#fullname").val()
    const email = $("#email").val()
    const pass = $("#password").val()
    const mobile = $("#mobile").val()
    const loginfrom = $("#logFrom").val()
    const wardID = $("#wardChoose").val()
    const address = $("#address").val()
    const shipName = $("#shipping_name").val()
    const shipPhone = $("#shipping_mobile").val()
    var isAcVal = 0
    const isAc = document.getElementsByName("ISactive")
    for(check of isAc){
        if(check.checked){
            isAcVal = 1
            break
        }
    }
    $.ajax({
        url : `http://localhost:3000/admin/Customer/addCus/addNewCus`,
        type : "post",
        dataType : "json",
        data: {
            name : name,
            email : email,
            pass : pass,
            mobile : mobile,
            loginfrom : loginfrom,
            wardID : wardID,
            address : address,
            shipName : shipName,
            shipPhone : shipPhone,
            isActive : isAcVal
        },
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể thêm dữ liệu khách hàng")
            }else{
                alert("Thêm khách hàng thành công!")
                window.location.href = "/admin/Customer"
            }
        },
        error : function(error){
            console.log(error)
            alert("Lỗi!")
        }
    })
}