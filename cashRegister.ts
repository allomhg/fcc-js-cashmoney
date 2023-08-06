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

interface regOutput {
    status: string;
    change: Array<[string, number]>;
}

function checkCashRegister ( price: number, cash: number, cid: Array<[string, number]> ): regOutput {
    let change = cash - price;
    console.log('Change required ' + change);

    let regReturn: regOutput = {
        status: '',
        change: []
    };

    const register = cid.reduce (( accum, curr ) => {
     accum.total += curr[1];
     accum[curr[0]] = curr[1];
        return accum;
    }, { total: 0 } );

    register.total = Number(register.total.toFixed(2));
    // console.log(register);

    if ( register.total < change ) {
        regReturn.status = 'INSUFFICIENT_FUNDS';
        console.log(regReturn);
        return regReturn;
    } else if ( register.total === change ) {
        regReturn.status = 'CLOSED';
        regReturn.change = cid;
        console.log(regReturn);
        return regReturn;
    }

    const changeArray = cashValue.reduce ( ( accum: Array<[string, number]>, curr ) => {
        let valueAmt = 0;

        while ( change >= curr.value && register[curr.name] > 0 ) {
            change -= curr.value; 
            register[curr.name] -= curr.value;
            valueAmt += curr.value;
            change = Number(change.toFixed(2));
        }
        console.log(change);
        
        if ( valueAmt > 0 ) {
         accum.push( [curr.name, valueAmt] );
        }
        return accum;
    }, []);
    console.log(changeArray);
    if ( changeArray.length < 1 || change > 0 ) {
        regReturn.status = 'INSUFFICIENT_FUNDS'; 
        console.log(regReturn);
        return regReturn;
    }
    regReturn.status = 'OPEN';
    regReturn.change = changeArray;
    console.log(regReturn);
    return regReturn;
}

// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
