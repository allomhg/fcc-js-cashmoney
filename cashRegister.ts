function checkCashRegister(price, cash, cid) {
    const change = cash - price;
    let myObject = {
        status: "",
        change: []
    }

    console.log(change);
    console.log(cid[0][1]);
    //console.log(cid.flat()) ;
    
    if (true) {

    }

    return change;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);