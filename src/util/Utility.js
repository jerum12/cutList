

export function processInputs(dataFromCSL,dataFromTbl) {


    let newData = [];
    let keyValue = '';

    if(dataFromCSL !== undefined){
        for (var i=0;i<dataFromCSL.inputs.length;i++) {
            keyValue = dataFromCSL.inputs[i].key;
            let objData = dataFromTbl.filter(function(arr){return arr.key == keyValue})[0];
            let d = {...dataFromCSL.inputs[i], ...objData}
            newData.push(d);
        }
    }

    let inputs = [];
    let quantity = [];
    let cutWidth = 0;
    let standardLengths = [];


    for(var i=0; i<newData.length;i++){
        let tbl = newData[i].groups;
        cutWidth = parseInt(newData[i].cutWidth);

        if(newData[i].sl1 !== "")
            standardLengths.push(parseInt(newData[i].sl1));
        if(newData[i].sl2 !== "")
            standardLengths.push(parseInt(newData[i].sl2));
        if(newData[i].sl3 !== "")
            standardLengths.push(parseInt(newData[i].sl3));


        for(var j=0; j<tbl.length;j++){
            inputs.push(tbl[j].LENGTH);
            quantity.push(tbl[j].QUANTITY);
        }
    }

    //var inputs = [312,357,437,446,679,706,710,742,787,892,937,1098,1352,1397,1812,1857,2027,2087,2317,3422,3428,3732,4444,4647,4952,5561,6580,6830]
    //var quantity = [8,8,24,4,16,48,80,8,8,32,16,16,16,16,8,8,4,8,8,8,16,8,48,8,16,24,16,8];

    var piecesNeeded = Array();

    console.log("inputs",inputs)
    console.log("quantity",quantity)
    // Build an array of each necessary board length
    // Sort the array from smallest to largest
    for(var ii = 0;ii < inputs.length; ii++)
    {
      var pId = ii + 1;
      var pQty = quantity[ii];
      var pLen = inputs [ii];
      var startIdx = 0;

        for(startIdx = 0; startIdx < piecesNeeded.length && piecesNeeded[startIdx][0] <= pLen; startIdx++);

        for(var jj = 0; jj < pQty; jj++)
        {
          piecesNeeded.splice(startIdx, 0, Array(pLen, pId));
        }
      
    }
    //console.log(piecesNeeded)
    //return piecesNeeded;
    console.log("cutWidth",cutWidth)
    console.log("standardLengths",standardLengths)
    console.log("piecesNeeded",piecesNeeded)
    procesAllData(keyValue,cutWidth,standardLengths, piecesNeeded)
 }


 function procesAllData(keyValue, cutWidth, standardLengths, piecesNeeded){

    let calc1 = CalculateLH(piecesNeeded, standardLengths, cutWidth)

    console.log("calc1",calc1);
 }

 function findSum(array){
    var sum = 0;
    for(var i=0; array.length > i ; i++){
        sum += array[i][0];
    }

    return sum;
}
function findClosest(array,target){
    array.sort(function(a, b) {
        return a - b;
    });
      
    return array.find(function(element) { return element >= target })
}

 function CalculateLH(piecesNeeded, standardLengths, cutWidth)
 {
    
    var origCutWidth = cutWidth;

    standardLengths.sort(function(a, b) {
        return a - b;
    });

    // Ensure that the longest board is shorter than the longest available stock
    // if(piecesNeeded[piecesNeeded.length - 1][0] > standardLengths[standardLengths.length - 1])
    //  {
     //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
     // } else {

        var boards = Array();
        // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
                // Main loop
        while(piecesNeeded.length > 0)
        {
          cutWidth = origCutWidth;
          // Create a new board of the largest stock size
          var thisBoard = Array(
            standardLengths[standardLengths.length - 1],
            0,
            Array()
            );
            var hasCutWidth = false;
            
            var sum = findSum(piecesNeeded);
            var bcs = 0;
              
            if(cutWidth > 0)
                bcs = cutWidth * (piecesNeeded.length-1);
  
            
            var closest = findClosest(standardLengths,sum + bcs);
         
            if(sum + bcs <= closest){
              console.log('here')
              thisBoard[0] = closest;
              thisBoard[1] = sum + bcs;
              thisBoard[2] = piecesNeeded;
              boards[boards.length] = thisBoard;
              break;
            }

          // Iterate through the needed components list
          for(var j = piecesNeeded.length - 1; j >= 0; j--)
          {

            // if 1 input only
            if(piecesNeeded.length == 1)
                cutWidth = 0;
            
              //20 - 0 - 13 >= 0
              //20 - 13 - 10 >= 0
              //20 - 13 - 9 >= 0
              //console.log("thisBoard",thisBoard);
              //console.log("piecesNeeded[j][0] ",piecesNeeded[j][0] );
            // Add component if it will fit, subtracting it from the list
            if(thisBoard[0] - thisBoard[1] - piecesNeeded[j][0] >= 0)
            {
              hasCutWidth = false;
              var ouput = thisBoard[0] - thisBoard[1] - piecesNeeded[j][0] ;
             // console.log("ouput",ouput);

              thisBoard[1] += piecesNeeded[j][0];
              thisBoard[2].splice(-1, 0, piecesNeeded[j]);
              piecesNeeded.splice(j, 1);

           
             
            //   if(standardLengths.includes(ouput)){
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

              if(thisBoard[1] + cutWidth <= thisBoard[0]){
                thisBoard[1] += cutWidth;
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

            //   if(standardLengths.includes(ouput))
            //     break;
            }
          }

        //   var thisBoardLength = thisBoard[2].length;
           if(hasCutWidth === true)
             thisBoard[1] = thisBoard[1]-origCutWidth;
          

          // Attempt to reduce the length of the board to the shortest stock length that will accommodate
          // find the best stocks in output of board
          for(j = standardLengths.length - 1; j >= 0; j--)
          {
            if(standardLengths[j] >= thisBoard[1])
              thisBoard[0] = standardLengths[j];
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
      //}
      return boards;

}