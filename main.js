var orders = [];
var completedOrders = [];
var modal = document.querySelector("#newOrderModal");
var allOrders = document.querySelector("#orders");

function openNewOrder(){
    if(document.querySelector("#newOrder").classList.contains("close")){
        closeNewOrder();
    }else{
        modal.style.display = "flex";
        document.querySelector("#newOrder").classList.add("close");
    }
}

function closeNewOrder(){
    modal.style.display = "none";
    document.querySelector("#newOrder").classList.remove("close");
}

function newOrder(myOrder, myOrderLong){
    var newOrder = {order: myOrder, orderLong : myOrderLong, timeIn: new Date()}
    orders.push(newOrder);
    updateScreen();
    closeNewOrder();
}

function orderDone(){
    var completedOrder = orders.shift();
    completedOrder.timeOut = new Date();
    completedOrder.duration =  completedOrder.timeOut - completedOrder.timeIn;
    completedOrders.push(completedOrder);
    updateScreen();
}

function updateScreen(){
    if(orders.length >= 1){
        // CURRENT ORDER
        document.querySelector("#currentOrderName").innerHTML = orders[0].orderLong;
        document.querySelector("#completeOrder").style.opacity = 1;

        // All Other Orders
        allOrders.innerHTML = "";
        for(var i = 0; i < orders.length; i++){
            var newOrder = document.createElement("div");
            newOrder.classList.add("order");
            if(i == 0){
                newOrder.classList.add("current");
            }
            newOrder.innerHTML = orders[i].order;
            // console.log();
            allOrders.appendChild(newOrder);
        }

    }
    else{
        allOrders.innerHTML = "";
        document.querySelector("#currentOrderName").innerHTML = "RELAX!";
        document.querySelector("#currentOrderDuration").innerHTML = "";
        document.querySelector("#completeOrder").style.opacity = .25;
    }

    if(completedOrders.length >= 1){
        document.querySelector("#completedOrders").innerHTML = completedOrders.length;

        var sum = 0;
        for(var j = 0; j < completedOrders.length; j++){
            sum += (completedOrders[j].duration/1000);
        }
        var average = Math.round(sum/completedOrders.length);
        var minutes = Math.floor(average/60);
        var seconds = Math.round(average%60);
        document.querySelector("#averageDuration").innerHTML = minutes + ":" + seconds;
        
    }
}

function updateDuration(){
    if(orders.length >= 1){
        var minutes = Math.floor((new Date() - orders[0].timeIn)/1000/60);
        var seconds = Math.round((new Date() - orders[0].timeIn)/1000%60);
        document.querySelector("#currentOrderDuration").innerHTML = minutes + ":" + seconds + " ago";
    }
}

window.setInterval(updateDuration,1000);