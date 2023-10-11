// 1.deposit some money
// / 2.colect a bet money
// 3.colect a bet moeny
//  4.spin the slot machine
// 5.if user wins give moeny
// /6. else reduce money
// 7. play again 


const prompt = require("prompt-sync")();

const Rows = 3;
const Cols= 3;

const SymboleCount = {
    A:2,
    B:4,
    C:6,
    D:8
}
const SymboleValue = {
    A:5,
    B:4,
    C:3,
    D:2
}


const deposit = () => {
    while (true) {
        const depositAmt = prompt("Enter amount to deposit: ");

    if (depositAmt === null) {
        console.log("Deposit canceled by user.");
        return; 
    }
    const numberDeposit = parseFloat(depositAmt);

    if (isNaN(numberDeposit) || numberDeposit <= 0) {
        console.log("Enter a valid amount to proceed... Please try again.");
    } else {
        // console.log(numberDeposit);
        return numberDeposit;
    }
        
    }
};
const getNumberOfLines = ()=>{
   while (true) {
    const numberOfLines = prompt("enter number of lines to bet (1-3): ")
    const numberBet = parseFloat(numberOfLines);

    if(isNaN(numberBet) || numberBet <=0 || numberBet > 3){
        console.log("please enter valid bet values to play");

    }
    else{
        return numberBet
    }
    
   }
}

const getbet =(balance, lines)=>{
    while(true){
        const bet = prompt("enter bet amt per line : ")
        const numberBet = parseFloat(bet);
        if(isNaN(numberBet) || numberBet < 0 || numberBet > (balance/lines)){
            console.log("invalid input,enter valid bet amt to proceed..")
        }
        else{
            return numberBet;
        }
       
        console.log("blance is remaining  "+ balance)

    }
 
}
const spin=()=>{
    const symbols = [];
    for(const [symbol,count ] of Object.entries(SymboleCount)){
              for(let i =0;i<count; i++){
                symbols.push(symbol);
              }
    }
    // console.log(symbols)
    const reel =[];
    const reelsSymbol = [...symbols]
    for(let i=0;i<Cols; i++){
        reel.push([]); //inserting howmuch cols we have in this array

        for(j=0;j<Rows;j++){
            const randomIndex = Math.floor(Math.random()*reelsSymbol.length);
            const selectedSymbol = reelsSymbol[randomIndex];
            reel[i].push(selectedSymbol);
            reelsSymbol.splice(randomIndex,1); //revomed that random index

        }
    }
    return reel;
}

const transPose = (reels)=>{
    const rows = [];
    for(let i =0 ; i<Rows ; i++){
        rows.push([]);
        for(let j=0;j<Cols ;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows
}

const printRows =(rows)=>{
    for(const row of rows){
        let strRow ="";
        for(const [i, symbol] of row.entries()){
            strRow += ` ${symbol} ` 
            if(i != row.length-1 ){
                strRow +="|";
            }
        }console.log(strRow)
    }
}

const getWinning =(rows,bet,line)=>{
  
    let winning = 0;

    for(let row=0;row<line ; row++){
      const symbols = rows[row];
      let allSame =  true;
      
      for(const symbol of symbols){
        if(symbol != symbols[0]){
            allSame = false;
            break;
        }
      }
      if(allSame){
        winning += bet*SymboleValue[symbols[0]];
      }
      
    }
    // 
    
return winning;

}

const Game =()=>{
    let balance = deposit();
    while(true){
const numberOfLines = getNumberOfLines();
const bet = getbet(balance, numberOfLines);
let deductedAmt =bet*numberOfLines;
balance -= deductedAmt;
console.log("after bet You have :"+ balance +'$');
   if(balance ==0){
    console.log("your money is fully drained if u want to  continue make sure to deposit")
    deposit();
   }
   else{
    const reels =spin();
    console.log(reels)
    const rows = transPose(reels);
    console.log(rows);
    printRows(rows)
    const winning = getWinning(rows, bet,numberOfLines)
    console.log( `ur won $ ${winning}`)
    if(winning !=0){
    const TotWinAmt = winning +deductedAmt;
    balance+=TotWinAmt
} 

    console.log("your current blance is "+ balance+'$')
   }
   if(balance <=0){
        console.log("your run out the Game")
        break;
    }
    const playAgain = prompt("do u want to continue to play again (Y/N) ?")
    if(playAgain != "Y"){
        break;
    }
    }
    
}
Game();