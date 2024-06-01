import TempCartModel from "../model/TempCartModel.js";
import OrderModel from "../model/OrderModel.js";
import {customerAr} from "../db/db.js";
import {itemAr} from "../db/db.js";
import {orders} from "../db/db.js";
import {tempOrderCartAr} from "../db/db.js";


/*Listener fir the Customer Combo*/
console.log("Awa")

$('#customerIdOrd').on('change',function (){
    /*get Customer*/
    let customer = searchCustomer($('#customerIdOrd').val());

    $('#customerNameOrd').val(customer.customerName);
    $('#salaryOrd').val(customer.customerSalary);
    $('#addressOrd').val(customer.customerAddress);


});

function searchCustomer(cusID) {
    console.log(customerAr)
    for (let customer of customerAr) {
        if (customer.customerId === cusID) {
            return customer;
        }
    }
    return null;
}

/*Listener fir the Item Combo*/
$('#itemIdOrd').on('change',function (){
    console.log($('#itemIdOrd').val());

    let item = searchItem($('#itemIdOrd').val());

    $('#item').val(item.itemName);
    $('#priceOrd').val(item.itemPrice);
    $('#qtyOnHandOrd').val(item.qtyOnHand);

});

function searchItem(itemId) {
    for (let item of itemAr) {
        if (item.itemCode === itemId) {
            return item;
        }
    }
    return null;
}


$('#btnAddToCart').click(function (){

    let itemCode=$('#itemIdOrd').val();
    let itmName = $('#item').val();
    let itmPrice = $('#priceOrd').val();
    let itemOrderQty = $('#orderQty').val();

    let total =itmPrice*itemOrderQty;


    let rowExists = searchRowExists(itemCode);
    if(rowExists!=null){
        let newQty=((parseInt(rowExists.orItemQty))+(parseInt(itemOrderQty)));

        // rowExists.orItemQTY.val(newQty);
        rowExists.orItemQty=newQty;
        rowExists.orItemTotal=parseFloat(itmPrice)*newQty;
        addCartData();

    }else{
        let tempCardObj = new TempCartModel(itemCode,itmName,itmPrice,itemOrderQty,total);
        tempOrderCartAr.push(tempCardObj);

        addCartData();
    }

    minQty(itemCode,itemOrderQty);

})

/*Add Table*/
function addCartData() {
    $("#tblCart> tr").detach();

    for (var tc of tempOrderCartAr){
        var row="<tr><td>"+tc.orItemCode+"</td><td>"+tc.orItemName+"</td><td>"+tc.orItemPrice+"</td><td>"+tc.orItemQty+"</td><td>"+tc.orItemTotal+"</td></tr>";
        $('#tblCart').append(row);
    }
    trCusSelector();
    getTotal();
}

function trCusSelector() {
    $("#tblCustomer>tr").click(function (){
        let id=$(this).children(':eq(0)').text();
        let name=$(this).children(':eq(1)').text();
        let address=$(this).children(':eq(2)').text();
        let salary=$(this).children(':eq(3)').text();

        console.log(id+"  "+name+"  "+address+" "+salary);

        $('#cId').val(id);
        $('#cName').val(name);
        $('#cAddress').val(address);
        $('#cSalary').val(salary);
    });
}

function getTotal() {
    let tempTot=0;
    for (let tempOrderCartArElement of tempOrderCartAr) {
        tempTot=tempTot+tempOrderCartArElement.orItemTotal;
    }
    $('#total').val(tempTot);

}

/*discount*/
let disTOGave=0;
$('#discount').on('keyup',function (){
    let dis=$('#discount').val();
    let tot=$('#total').val();
    var totMin=0;
    let subTot=0;

    console.log(dis+"=="+tot);
    totMin=parseFloat(tot)*(dis/100);
    console.log("dis Dis: "+totMin)

    subTot=tot-totMin;
    disTOGave=totMin;

    $('#subTotal').val(subTot);
})

/*Cash*/
$('#cash').on('keyup',function (){
    let cash=$('#cash').val();
    let subT=$('#subTotal').val();

    $('#balance').val((parseFloat(cash))-parseFloat(subT));
})

/*Remove Duplicate Row*/
function searchRowExists(itemCode) {
    for (let tempOr of tempOrderCartAr) {
        console.log(tempOr.orItemCOde+"-----"+itemCode);
        if(tempOr.orItemCode===itemCode){
            return tempOr
        }
    }
    return null;
}

/*Min QTY*/
function minQty(itemCode,orderQty) {
    for (let itemArElement of itemAr) {
        if(itemArElement.itemCode===itemCode){
            itemArElement.qtyOnHand=parseInt(itemArElement.qtyOnHand)-parseInt(orderQty);
        }
    }
    addTable();
    clearData();
}

function addTable() {
    $("#tblItem> tr").detach();

    for (var itm of itemAr){
        var row="<tr><td>"+itm.itemCode+"</td><td>"+itm.itemName+"</td><td>"+itm.qtyOnHand+"</td><td>"+itm.itemPrice+"</td></tr>";
        $('#tblItem').append(row);
    }
    trSelector();
}

function trSelector() {
    $("#tblItem>tr").click(function (){
        let code=$(this).children(':eq(0)').text();
        let name=$(this).children(':eq(1)').text();
        let qOH=$(this).children(':eq(2)').text();
        let price=$(this).children(':eq(3)').text();

        $('#itId').val(code);
        $('#itName').val(name);
        $('#qtyOnHand').val(qOH);
        $('#itPrice').val(price);
    });
}


function clearData() {
    $('#qtyOnHandOrd').val("");
    $('#item').val("");
    $('#priceOrd').val("");
    $('#orderQty').val("");
}

/*Purchase Order*/
$('#purchaseOrder').click(function (){
    let orderId = $('#orderId').val();
    let orderDate = $('#OrderDate').val();
    let customerName = $('#customerNameOrd').val();
    let discount = disTOGave;
    let subTotal = $('#subTotal').val();

    /*orderModal(orderId,orderDate,customerName,discount,subTotal);*/

    let orderObj = new OrderModel(orderId,orderDate,customerName,discount,subTotal);
    orders.push(orderObj);

    loadAllOrder();
    blindOrderRowClickEvent();
    clearOrderTexts();

    for (var tempOrder of tempOrderCartAr){
        tempOrderCartAr.pop();
    }
    tempOrderCartAr.pop();
    addCartData();
});

/*FUNCTIONS*/
function blindOrderRowClickEvent(){

    $('#tblOrder>tr').click(function (){
        let ordId = $(this).children(':eq(0)').text();
        $('#orderIdDash').val(ordId);
        let ordDate = $(this).children(':eq(1)').text();
        $('#OrderDateDash').val(ordDate);
        let ordName = $(this).children(':eq(2)').text();
        $('#customerNameDash').val(ordName);
        let ordDis = $(this).children(':eq(3)').text();
        $('#discountDash').val(ordDis);
        let ordCost = $(this).children(':eq(4)').text();
        $('#subTotDash').val(ordCost);
    });
}

function clearOrderTexts(){
    $('#orderId').val("");
    $('#OrderDate').val("");
    $('#customerNameOrd').val("");
    $('#salaryOrd').val("");
    $('#addressOrd').val("");

    $('#item').val("");
    $('#priceOrd').val("");
    $('#qtyOnHandOrd').val(0);
    $('#orderQty').val("");

    $('#cash').val("");
    $('#discount').val(0);
    $('#balance').val("");
    $('#subTotal').val(0);
}

function loadAllOrder(){
    $("#tblOrder> tr").detach();
    for (var i of orders){
        $('#tblOrder').append('<tr><td>'+i.orderId+'</td>'+'<td>'+i.orderDate+'</td>'+'<td>'+i.orCustomerName+'</td>'+'<td>'+i.discount+'</td>'+'<td>'+i.subTotal+'</td></tr>');
    }
}