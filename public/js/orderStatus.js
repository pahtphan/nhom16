$(document).ready(function(){
    fetchStatusData()
})

function getStatusRows(datas){
    var html = ""
    for(data of datas){
        html = html + `<tr><td>${data.id}</td><td>${data.description}</td></tr>`
    }
    return html
}

function fetchStatusData(){
    $.ajax({
        url : "http://localhost:3000/admin/StatusOrder/getStatus",
        type : "GET",
        success : function(data){
            if(data.error){
                alert("Lỗi! Không thể lấy thông tin trạng thái đơn hàng")
            }else{
                $("#status_tab").html(getStatusRows(data.status))
            }
        },
        error : function(error){
            console.log(error)
            alert("Lỗi!")
        }
    })
}