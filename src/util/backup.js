import {processInputs2,CalculateLH} from './cutlist2'

var piecesNeeded = new Array();
var stockLengths = [20,5,15];
var cutWidth = 0;
export function processInputs(dataFromCSL,dataFromTbl) { 

    let newData = [];
    let keyValue = '';

    if(dataFromCSL !== undefined){
        for (var ai=0; ai<dataFromCSL.inputs.length; ai++) {
            keyValue = dataFromCSL.inputs[ai].key;
            let objData = dataFromTbl.filter(function(arr){return arr.key == keyValue})[0];
            let d = {...dataFromCSL.inputs[ai], ...objData}
            newData.push(d);
        }
    }

    let inputs = [];
    let quantity = [];
    let cuts = 0;
    let standardLengths = [];


    for(var cd=0; cd<newData.length;cd++){
        let tbl = newData[cd].groups;
        cuts = parseInt(newData[cd].cutWidth);

        if(newData[cd].sl1 !== "")
            standardLengths.push(parseInt(newData[cd].sl1));
        if(newData[cd].sl2 !== "")
            standardLengths.push(parseInt(newData[cd].sl2));
        if(newData[cd].sl3 !== "")
            standardLengths.push(parseInt(newData[cd].sl3));


        for(var jjjjj=0; jjjjj<tbl.length;jjjjj++){
            inputs.push(tbl[jjjjj].LENGTH);
            quantity.push(tbl[jjjjj].QUANTITY);
        }
    }

    piecesNeeded = processInputs2(dataFromCSL,dataFromTbl)
    var abc = [...piecesNeeded];
    CalculateLH132(abc,standardLengths,cuts)
 }


 function procesAllData(keyValue, cutWidth, standardLengths, piecesNeeded){

 
    console.log("piecesNeeded",piecesNeeded)
    
    let pc1 = [...piecesNeeded];
    let cuts = cutWidth;
    let calc1 = CalculateLH(pc1, standardLengths, cuts)

    console.log("calc1",calc1);
 }

 function findSum(arrayParam){
    var sum = 0;
    for(var i=0; arrayParam.length > i ; i++){
        sum += arrayParam[i][0];
    }

    return sum;
}
function findClosest(arrayValue,target){
    arrayValue.sort(function(a, b) {
        return a - b;
    });
      
    return arrayValue.find(function(element) { return element >= target })
}

 function CalculateLH132(pc1, standardLengths, cuts)
 {
    
    var origCutWidth = cuts;

    standardLengths.sort(function(a, b) {
        return a - b;
    });

    console.log("cuts",cuts)


    // Ensure that the longest board is shorter than the longest available stock
    // if(piecesNeeded[piecesNeeded.length - 1][0] > standardLengths[standardLengths.length - 1])
    //  {
     //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
     // } else {

        let boards = new Array();
        // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
                // Main loop
        while(pc1.length > 0)
        {
          cuts = origCutWidth;
          // Create a new board of the largest stock size
          let thisBoard = new Array();

          thisBoard[0] = standardLengths[standardLengths.length - 1];
          thisBoard[1] = 0;
          thisBoard[2] = Array();
      

            var hasCutWidth = false;
            
            var sum = findSum(pc1);
            var bcs = 0;
              
            if(cuts > 0)
                bcs = cuts * (pc1.length-1);
  
            
           
            var closest = findClosest(standardLengths,sum + bcs);
      
            if(sum + bcs <= closest){
              thisBoard[0] = closest;
              thisBoard[1] = sum + bcs;
              thisBoard[2] = pc1;
              boards[boards.length] = thisBoard;
              break;
            }

          

          // Iterate through the needed components list
          for(let j = pc1.length - 1; j >= 0; j--)
          {

            // if 1 input only
            if(pc1.length == 1)
                cuts = 0;
            
              //20 - 0 - 13 >= 0
              //20 - 13 - 10 >= 0
              //20 - 13 - 9 >= 0
              console.log("thisBoard----------",thisBoard);
              //console.log("piecesNeeded[j][0] ",piecesNeeded[j][0] );
            // Add component if it will fit, subtracting it from the list
            if(thisBoard[0] - thisBoard[1] - pc1[j][0] >= 0)
            {
              hasCutWidth = false;
              var ouput = thisBoard[0] - thisBoard[1] - pc1[j][0] ;
             // console.log("ouput",ouput);

              thisBoard[1] += pc1[j][0];
              thisBoard[2].splice(-1, 0, pc1[j]);
              pc1.splice(j, 1);

           
             
            //   if(stockLengths.includes(ouput)){
            //     console.log("includes ----------------");
            //     console.log("thisBoard[2].length ----------------",thisBoard[2]);
            //     if(thisBoard[2].length === 1)
            //         cutWidth = 0;        
                    
            //     //break;
            //   }
             // console.log("cutWidth",cutWidth);
              //console.log("thisBoard",thisBoard);
             // console.log("--------------------------");
              //console.log(cutWidth)

              if(thisBoard[1] + cuts <= thisBoard[0]){
                thisBoard[1] += cuts;
                hasCutWidth = true;
              }else{
                //thisBoard[1] = thisBoard[0];
                break;
              }

              // Adjust for cutting losses
            //   if(thisBoard[1] + cutWidth >= thisBoard[0])
            //     thisBoard[1] = thisBoard[0];
            //   else{
            //     thisBoard[1] += cutWidth;
            //   }

            //   if(stockLengths.includes(ouput))
            //     break;
            }
          }

     


        //   var thisBoardLength = thisBoard[2].length;
           if(hasCutWidth === true)
             thisBoard[1] = thisBoard[1]-origCutWidth;
          

          // Attempt to reduce the length of the board to the shortest stock length that will accommodate
          // find the best stocks in output of board
          for(var jjj = standardLengths.length - 1; jjj >= 0; jjj--)
          {
            
            console.log('standardLengths---------------------',standardLengths[jjj])
            console.log('thisBoard1---------------------',thisBoard[1])

            if(standardLengths[jjj] >= thisBoard[1])
                thisBoard[0] = standardLengths[jjj];
            
          }

          if(thisBoard[2].length == 0)
          {
            console.log("error here----");
            break;
          }
          boards[boards.length] = thisBoard;

     
        }
        // Done when there are no needed components left
        var a=0;
        boards.forEach(stock => {a++; console.log("CalculateLH"+a,stock) });

      return boards;

}