import {orders} from "../db/db.js";

$('#btnSearchOrder').click(function () {

    for (var search of orders) {

        let searchOrder = $('#searchOrder').val();
        let chooseOrderType = $('#chooseOrderType').val();
        if (chooseOrderType === "ID") {
            console.log("ID : "+searchOrder +"==="+ search.orderId)

            if (searchOrder === search.orderId) {
                $('#orderIdDash').val(search.orderId);
                $('#OrderDateDash').val(search.orderDate);
                $('#customerNameDash').val(search.orderCustomer);
                $('#discountDash').val(search.discount);
                $('#subTotDash').val(search.subTotal);

            }
        } else if (chooseOrderType === "1") {
            console.log("1 : "+searchOrder +"==="+ search.customerName)
            if (searchOrder === search.orderCustomer) {
                $('#orderIdDash').val(search.orderId);
                $('#OrderDateDash').val(search.orderDate);
                $('#customerNameDash').val(search.orderCustomer);
                $('#discountDash').val(search.discount);
                $('#subTotDash').val(search.subTotal);
            }
        } else if (chooseOrderType === "2") {
            console.log("2 : "+searchOrder +"==="+ search.orderDate)

            if (searchOrder === search.orDate) {
                $('#orderIdDash').val(search.orderId);
                $('#OrderDateDash').val(search.orderDate);
                $('#customerNameDash').val(search.orderCustomer);
                $('#discountDash').val(search.discount);
                $('#subTotDash').val(search.subTotal);
            }
        }

    }
});

$('#btnClearOrd').click(function (){
    $('#orderIdDash').val("");
    $('#OrderDateDash').val("");
    $('#customerNameDash').val("");
    $('#discountDash').val("");
    $('#subTotDash').val("");
    $('#searchOrder').val("");
});

$('#btnDeleteOrd').click(function (){
    let deleteOrderId = $('#orderIdDash').val();

    if (deleteOrder(deleteOrderId)){
        alert("Order Successfully Deleted....");
        setOrderTextfieldValues("", "", "", "","");
    }else{
        alert("No such Order to delete. please check the id");
    }
});


/*FUNCTIONS*/

function searchOrder(orderId){
    for(var i of orders){
        if (i.orderId === orderId){
            return i;
        }
    }
    return null;
}

function deleteOrder(orderId){
    let ordObj = searchOrder(orderId);

    if (ordObj != null){
        let indexNumber = orders.indexOf(ordObj);
        orders.splice(indexNumber,1);
        loadAllOrder();
        return true;
    }else {
        return false;
    }
}

function loadAllOrder(){
    $("#tblOrder> tr").detach();
    for (var i of orders){
        $('#tblOrder').append('<tr><td>'+i.orderId+'</td>'+'<td>'+i.orderDate+'</td>'+'<td>'+i.orderCustomer+'</td>'+'<td>'+i.discount+'</td>'+'<td>'+i.subTotal+'</td></tr>');
    }
}

function setOrderTextfieldValues(orderId,date,name,dis,cost){

    $('#orderIdDash').val(orderId);
    $('#OrderDateDash').val(date);
    $('#customerNameDash').val(name);
    $('#discountDash').val(dis);
    $('#subTotDash').val(cost);
}