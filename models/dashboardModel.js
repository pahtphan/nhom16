function getTotalOrder(datas){
    var count = 0;
    for(let data of datas){
        if(data.order_status_id !== 6){
            count+=1
        }
    }
    return count
}

function getTotalCancelOrder(datas){
    var count = 0;
    for(let data of datas){
        if(data.order_status_id === 6){
            count+=1
        }
    }
    return count
}

function getTotal(datas){
    var total = 0;
    for(let data of datas){
        if(data.order_status_id !== 6){
            total+=data.toltalwfee
        }
    }
    total = total.toLocaleString('vi-VN');
    return total
}



module.exports = [getTotalOrder, getTotalCancelOrder,getTotal]