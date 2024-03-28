$(document).ready(function(){
    fetchComment()
})

function getCommentRows(datas){
    var html = ""
    for(data of datas){
        html = html + `<tr><td><img src="/images/${data.featured_image}" /></td><td>${data.email}</td><td>${data.fullname}</td><td>${data.star}</td><td>${data.created_date}</td><td>${data.description}</td></tr>`
    }
    return html
}

function fetchComment(){
    $.ajax({
        url : "http://localhost:3000/admin/Comments/getAllComments",
        type : "GET",
        success : function(data){
            $("#comment_tab").html(getCommentRows(data.dataCom))
        },
        error : function(err){
            console.log(err)
            alert("Lỗi!")
        }
    })
}