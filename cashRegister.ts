const cashValue: { name: string, value: number }[] = [
    { name: "ONE HUNDRED", value: 100 },
    { name: "TWENTY", value: 20 },
    { name: "TEN", value: 10 } ,
    { name: "FIVE", value: 5 },
    { name: "ONE", value: 1 },
    { name: "QUARTER", value: 0.25 },
    { name: "DIME", value: 0.1 },
    { name: "NICKEL", value: 0.05 },
    { name: "PENNY", value: 0.01 }
]

interface regStatusChange {
    status: string;
    change: Array<[string, number]>;
}

function checkCashRegister ( price: number, cash: number, cid: Array<[string, number]> ) {
    const change: number = cash - price;
    console.log('Change = ' + change);
    
    let regReturn: regStatusChange = {
        status: '',
        change: []
    };

    const register = cid.reduce ( ( acc, curVal ) => {
        acc.total += curVal[1];
        acc[curVal[0]] = curVal[1];
        return acc;
    }, { total: 0 } );

    console.log(register);

    if ( register.total == change) {
        regReturn.status = "CLOSED";
        regReturn.change = cid;
        return regReturn;
    }

    if ( register.total < change ) {
        regReturn.status = "INSUFFICIENT_FUNDS";
        regReturn.change = [];
        return regReturn;
    }

    const changeArr = cashValue.reduce ( ( acc, curVal ) => { 
        let valueAmt = 0;
        console.log(curVal);
        // console.log("curVal.name: " + curVal.name);
        // console.log("register current value: " + register[curVal.name]);

        while ( valueAmt < change && register[curVal.name] > 0 ) {
            // console.log(" --- NEW WHILE LOOP --- ");
            valueAmt += curVal.value;
            // console.log("valueAmt = " + valueAmt);
            register[curVal.name] -= curVal.value;
            // console.log("register value = " + register[curVal.name]);      
        }

        if ( valueAmt == change) {
            regReturn.change.push([curVal.name, valueAmt]);
        }
        //console.log(acc);
        return acc;
    }, [] );

    console.log(regReturn);

    return change;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);