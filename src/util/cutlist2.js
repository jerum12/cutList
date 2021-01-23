//var piecesNeeded = processInputs();
var piecesNeeded = new Array();
var cutWidth = 0;
//var stockLengths = [6000,9000,12000];
var stockLengths = [20,5,15];
//var stockLengths = [12000,15000,13500];
//var stockLengths = [135000,120000,90000];
//var stockLengths = [13500,12000,9000];
//var stockLengths = [13500,12000,15000];

var abc = [...piecesNeeded];
var abc2 = [...piecesNeeded];
var abc3 = [...piecesNeeded];
var abc4 = [...piecesNeeded];
var abc5 = [...piecesNeeded];
var abc6 = [...piecesNeeded];
var abc7 = [...piecesNeeded];
//CalculateLH(abc,stockLengths, cutWidth);
//console.log("--------------------------------------------------")
// CalculateHL(abc2,stockLengths, cutWidth);
// console.log("--------------------------------------------------")
// Calculate3(abc3,stockLengths, cutWidth);
// console.log("--------------------------------------------------")
// Calculate4(abc4,stockLengths, cutWidth);
// console.log("--------------------------------------------------")
// Calculate5(abc5,stockLengths, cutWidth);
// console.log("--------------------------------------------------")
// CalculatePriority(abc6,stockLengths, cutWidth,2);
// console.log("--------------------------------------------------")
// CalculatePriority(abc7,stockLengths, cutWidth,1);


export function processInputs2(dataFromCSL,dataFromTbl) {


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


  for(var i=0; i<newData.length;i++){
      let tbl = newData[i].groups;
      cuts = newData[i].cutWidth;

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

  //var piecesNeeded = Array();

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
  stockLengths = standardLengths;
  cutWidth = cuts;
  return piecesNeeded;

  //procesAllData(keyValue,cutWidth,standardLengths, piecesNeeded)
}

function processInputs(){
    // var inputs = [20,15,5];
    // var quantity = [1,1,1];
    var inputs = [13,10,9,8,3,2,1];
    var quantity = [1,1,1,1,1,1,1];
    //var inputs = [312,357,437,446,679,706,710,742,787,892,937,1098,1352,1397,1812,1857,2027,2087,2317,3422,3428,3732,4444,4647,4952,5561,6580,6830]
    //var quantity = [8,8,24,4,16,48,80,8,8,32,16,16,16,16,8,8,4,8,8,8,16,8,48,8,16,24,16,8];
    //var quantity = [4,4,12,2,8,24,40,4,4,16,8,8,8,8,4,4,2,4,4,4,8,4,24,4,8,12,8,4];
    //var inputs = [19115,2000,67600,16495,23079,6258,3584,11296,21893,17814,5800,3600,39275,7556,25158,1763]
    //var quantity = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3];
    //var inputs = [13750,13250,10534,3606,2876,1200]
    //var quantity = [4,4,4,4,4,4];
    //var inputs = [20,15,5];
    //var quantity = [1,1,1];
    //var inputs = [275,330,255,714,280,254,500,500,500,500,215,692,275,330,295,230,275,590,300,561,240,345,240,345,240,345,705,300,315,490,424,424,643,570,225,275,330,170,200,275,330,420,355]
    //var quantity = [20,45,90,25,25,24,2,2,2,2,2,2,2,2,2,2,2,2,10,8,9,4,1,1,1,3,1,1,1,12,1,1,1,21,54,1,1,1,1,1,25,23,12];
    //var inputs = [1600,1500,200,730,505,680,220,1420,1600,410,6500,3500,1850,4500,1700,3650,1700,1000,3000,4500,1000,200,2000,2600,1350,2900,2500,1500]
    //var quantity = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    

    var piecesNeeded = Array();

     // Build an array of each necessary board length
    // Sort the array from smallest to largest
    for(var i = 0; i < inputs.length; i++)
    {
      var pId = i + 1;
      var pQty = quantity[i];
      var pLen = inputs [i];
      var startIdx = 0;

        for(startIdx = 0; startIdx < piecesNeeded.length && piecesNeeded[startIdx][0] <= pLen; startIdx++);

        for(var j = 0; j < pQty; j++)
        {
          piecesNeeded.splice(startIdx, 0, Array(pLen, pId));
        }
      
    }
    console.log("piecesNeeded",piecesNeeded)
    return piecesNeeded;
}

export function CalculateLH(pc1)
 {

    var origCutWidth = cutWidth;

    stockLengths.sort(function(a, b) {
        return a - b;
    });

    console.log("cutWidth",cutWidth)
    console.log("stockLengths",stockLengths)

    // Ensure that the longest board is shorter than the longest available stock
    // if(piecesNeeded[piecesNeeded.length - 1][0] > stockLengths[stockLengths.length - 1])
    //  {
     //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
     // } else {

        var boards = Array();
        // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
                // Main loop
        while(pc1.length > 0)
        {
          cutWidth = origCutWidth;
          // Create a new board of the largest stock size
          var thisBoard = Array(
            stockLengths[stockLengths.length - 1],
            0,
            Array()
            );
            var hasCutWidth = false;
            
            var sum = findSum(pc1);
            var bcs = 0;
              
            if(cutWidth > 0)
                bcs = cutWidth * (pc1.length-1);
  
            
            var closest = findClosest(stockLengths,sum + bcs);
         
            if(sum + bcs <= closest){
            
              thisBoard[0] = closest;
              thisBoard[1] = sum + bcs;
              thisBoard[2] = pc1;
              boards[boards.length] = thisBoard;
              break;
            }

          // Iterate through the needed components list
          for(var j = pc1.length - 1; j >= 0; j--)
          {

            // if 1 input only
            if(pc1.length == 1)
                cutWidth = 0;
            
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

            //   if(stockLengths.includes(ouput))
            //     break;
            }
          }

        //   var thisBoardLength = thisBoard[2].length;
           if(hasCutWidth === true)
             thisBoard[1] = thisBoard[1]-origCutWidth;
          

          // Attempt to reduce the length of the board to the shortest stock length that will accommodate
          // find the best stocks in output of board
          for(j = stockLengths.length - 1; j >= 0; j--)
          {
            console.log('stockLengths---------------------',stockLengths[j])
            console.log('thisBoard1---------------------',thisBoard[1])
            if(stockLengths[j] >= thisBoard[1])
              thisBoard[0] = stockLengths[j];
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


// function CalculateHL(piecesNeeded, stockLengths, cutWidth)
//  {
//     piecesNeeded.sort(function(a, b) {
//         return b[0] - a[0];
//     });
//     //console.log(piecesNeeded)

//     var origCutWidth = cutWidth;

//     stockLengths.sort(function(a, b) {
//         return a - b;
//     });

//     // Ensure that the longest board is shorter than the longest available stock
//     // if(piecesNeeded[piecesNeeded.length - 1][0] > stockLengths[stockLengths.length - 1])
//     //  {
//      //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
//      // } else {

//         var boards = Array();
//         // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
//                 // Main loop
//         while(piecesNeeded.length > 0)
//         {
//           cutWidth = origCutWidth;
//           // Create a new board of the largest stock size
//           var thisBoard = Array(
//             stockLengths[stockLengths.length - 1],
//             0,
//             Array()
//             );

//             var hasCutWidth = false;

//             var sum =  findSum(piecesNeeded);  

//             var bcs = 0;
              
//             if(cutWidth > 0)
//                 bcs = cutWidth * (piecesNeeded.length-1);
  
//             var closest = findClosest(stockLengths,sum + bcs);

//             if(sum + bcs <= closest){
//               console.log('here')
//               thisBoard[0] = closest;
//               thisBoard[1] = sum + bcs;
//               thisBoard[2] = piecesNeeded;
//               boards[boards.length] = thisBoard;
//               break;
//             }

//           // Iterate through the needed components list
//           for(j = piecesNeeded.length - 1; j >= 0; j--)
//           {

//             // if 1 input only
//             if(piecesNeeded.length == 1)
//                 cutWidth = 0;
            
//               //20 - 0 - 13 >= 0
//               //20 - 13 - 10 >= 0
//               //20 - 13 - 9 >= 0
//             // Add component if it will fit, subtracting it from the list
//             if(thisBoard[0] - thisBoard[1] - piecesNeeded[j][0] >= 0)
//             {
//               var ouput = thisBoard[0] - thisBoard[1] - piecesNeeded[j][0] ;
//               hasCutWidth = false;
//               thisBoard[1] += piecesNeeded[j][0];
//               thisBoard[2].splice(-1, 0, piecesNeeded[j]);
//               piecesNeeded.splice(j, 1);

           
//             //   if(stockLengths.includes(ouput)){
//             //     if(thisBoard[2].length === 1)
//             //         cutWidth = 0;                   
//             //   }

//              if(thisBoard[1] + cutWidth <= thisBoard[0]){
//                 thisBoard[1] += cutWidth;
//                 hasCutWidth = true;
//               }else{
//                 //thisBoard[1] = thisBoard[0];
//                 break;
//               }
              
//               //console.log(cutWidth)
//               // Adjust for cutting losses
//             //   if(thisBoard[1] + cutWidth >= thisBoard[0])
//             //     thisBoard[1] = thisBoard[0];
//             //   else{
//             //     thisBoard[1] += cutWidth;
//             //   }

//             //   if(stockLengths.includes(ouput))
//             //     break;
//             }
//           }

//           if(hasCutWidth === true)
//             thisBoard[1] = thisBoard[1]-origCutWidth;

//           // Attempt to reduce the length of the board to the shortest stock length that will accommodate
//           // find the best stocks in output of board
//           for(j = stockLengths.length - 1; j >= 0; j--)
//           {
//             if(stockLengths[j] >= thisBoard[1])
//               thisBoard[0] = stockLengths[j];
//           }

//           if(thisBoard[2].length == 0)
//           {
//             console.log("error here----");
//             break;
//           }
//           boards[boards.length] = thisBoard;
//         }
//         // Done when there are no needed components left
//         var a=0;
//         boards.forEach(stock => {a++; console.log("CalculateHL"+a,stock) });
//       //}
//       return boards;
// }


// function Calculate3(piecesNeeded, stockLengths, cutWidth)
//  {
//     piecesNeeded.sort(function(a, b) {
//         return a[0] - b[0];
//     });
//     //console.log(piecesNeeded)

//     var origCutWidth = cutWidth;

//     stockLengths.sort(function(a, b) {
//         return a - b;
//     });

//     // Ensure that the longest board is shorter than the longest available stock
//     // if(piecesNeeded[piecesNeeded.length - 1][0] > stockLengths[stockLengths.length - 1])
//     //  {
//      //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
//      // } else {

//         var boards = Array();
//         // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
//                 // Main loop

//        while(piecesNeeded.length > 0)
//         {
//           cutWidth = origCutWidth;
//           // Create a new board of the largest stock size
//           var closest = findClosest(stockLengths,piecesNeeded[0][0]);

//           var thisBoard = Array(
//             closest,
//             0,
//             Array()
//             );

//           var hasCutWidth = false;
//           var sum = findSum(piecesNeeded);
//           var bcs = 0;
            
//           if(cutWidth > 0)
//               bcs = cutWidth * (piecesNeeded.length-1);

//           var closest = findClosest(stockLengths,sum + bcs);

//           if(sum + bcs <= closest){
//             console.log('here')
//             thisBoard[0] = closest;
//             thisBoard[1] = sum + bcs;
//             thisBoard[2] = piecesNeeded;
//             boards[boards.length] = thisBoard;
//             break;
//           }

//           // Iterate through the needed components list
//           for(j=0 ; piecesNeeded.length > j ; j++)
//           {

//             // if 1 input only
//             if(piecesNeeded.length == 1)
//                 cutWidth = 0;
            
//               //20 - 0 - 13 >= 0
//               //20 - 13 - 10 >= 0
//               //20 - 13 - 9 >= 0
//             // Add component if it will fit, subtracting it from the list
//             if( thisBoard[1] + piecesNeeded[j][0] <= thisBoard[0] )
//             {
//               var ouput =  thisBoard[1] + piecesNeeded[j][0]  + cutWidth ;
//               hasCutWidth = false;
//               thisBoard[1] += piecesNeeded[j][0];
//               thisBoard[2].splice(-1, 0, piecesNeeded[j]);
//               piecesNeeded.splice(j, 1);

           
//             //   if(stockLengths.includes(ouput)){
//             //     if(thisBoard[2].length === 1)
//             //         cutWidth = 0;                   
//             //   }
              
//               //console.log(cutWidth)
//               // Adjust for cutting losses
//             //   if(thisBoard[1] + cutWidth >= thisBoard[0])
//             //     thisBoard[1] = thisBoard[0];
//             //   else{
//             //     thisBoard[1] += cutWidth;
//             //   }

//             //   if(stockLengths.includes(ouput))
//             //     break;

//                 if(thisBoard[1] + cutWidth <= thisBoard[0]){
//                     thisBoard[1] += cutWidth;
//                     hasCutWidth = true;
//                 }else{
//                     //thisBoard[1] = thisBoard[0];
//                     break;
//                 }
//             }
//           }

//           if(hasCutWidth === true)
//             thisBoard[1] = thisBoard[1]-origCutWidth;

//           // Attempt to reduce the length of the board to the shortest stock length that will accommodate
//           // find the best stocks in output of board
//           for(j = stockLengths.length - 1; j >= 0; j--)
//           {
//             if(stockLengths[j] >= thisBoard[1])
//               thisBoard[0] = stockLengths[j];
//           }

//           if(thisBoard[2].length == 0)
//           {
//             console.log("error here----");
//             break;
//           }
//           boards[boards.length] = thisBoard;
//         }
//         // Done when there are no needed components left
//         var a=0;
//         boards.forEach(stock => {a++; console.log("Calculate3"+a,stock) });
//       //}
//       return boards;
// }


// function Calculate4(piecesNeeded, stockLengths, cutWidth)
//  {
//     piecesNeeded.sort(function(a, b) {
//         return b[0] - a[0];
//     });
//     //console.log(piecesNeeded)

//     var origCutWidth = cutWidth;

//     stockLengths.sort(function(a, b) {
//         return a - b;
//     });

//     // Ensure that the longest board is shorter than the longest available stock
//     // if(piecesNeeded[piecesNeeded.length - 1][0] > stockLengths[stockLengths.length - 1])
//     //  {
//      //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
//      // } else {

//         var boards = Array();
//         // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
//                 // Main loop

//        while(piecesNeeded.length > 0)
//         {
//           cutWidth = origCutWidth;
//           // Create a new board of the largest stock size
//           var closest = findClosest(stockLengths,piecesNeeded[0][0]);

//           var thisBoard = Array(
//             closest,
//             0,
//             Array()
//             );

//           var hasCutWidth = false;
//           var sum = findSum(piecesNeeded);
//           var bcs = 0;
            
//           if(cutWidth > 0)
//               bcs = cutWidth * (piecesNeeded.length-1);

//           var closest = findClosest(stockLengths,sum + bcs);

//           if(sum + bcs <= closest){
//             console.log('here')
//             thisBoard[0] = closest;
//             thisBoard[1] = sum + bcs;
//             thisBoard[2] = piecesNeeded;
//             boards[boards.length] = thisBoard;
//             break;
//           }

//           // Iterate through the needed components list
//           for(j=0 ; piecesNeeded.length > j ; j++)
//           {

//             // if 1 input only
//             if(piecesNeeded.length == 1)
//                 cutWidth = 0;
            
//               //20 - 0 - 13 >= 0
//               //20 - 13 - 10 >= 0
//               //20 - 13 - 9 >= 0
//             // Add component if it will fit, subtracting it from the list
//             if( thisBoard[1] + piecesNeeded[j][0] <= thisBoard[0] )
//             {
//               var ouput =  thisBoard[1] + piecesNeeded[j][0]  + cutWidth ;
//               hasCutWidth = false;
//               thisBoard[1] += piecesNeeded[j][0];
//               thisBoard[2].splice(-1, 0, piecesNeeded[j]);
//               piecesNeeded.splice(j, 1);

           
//             //   if(stockLengths.includes(ouput)){
//             //     if(thisBoard[2].length === 1)
//             //         cutWidth = 0;                   
//             //   }
              
//             //   //console.log(cutWidth)
//             //   // Adjust for cutting losses
//             //   if(thisBoard[1] + cutWidth >= thisBoard[0])
//             //     thisBoard[1] = thisBoard[0];
//             //   else{
//             //     thisBoard[1] += cutWidth;
//             //   }

//             //   if(stockLengths.includes(ouput))
//             //     break;

//                 if(thisBoard[1] + cutWidth <= thisBoard[0]){
//                     thisBoard[1] += cutWidth;
//                     hasCutWidth = true;
//                 }else{
//                     //thisBoard[1] = thisBoard[0];
//                     break;
//                 }
//             }
//           }

//           if(hasCutWidth === true)
//              thisBoard[1] = thisBoard[1]-origCutWidth;

//           // Attempt to reduce the length of the board to the shortest stock length that will accommodate
//           // find the best stocks in output of board
//           for(j = stockLengths.length - 1; j >= 0; j--)
//           {
//             if(stockLengths[j] >= thisBoard[1])
//               thisBoard[0] = stockLengths[j];
//           }

//           if(thisBoard[2].length == 0)
//           {
//             console.log("error here----");
//             break;
//           }
//           boards[boards.length] = thisBoard;
//         }
//         // Done when there are no needed components left
//         var a=0;
//         boards.forEach(stock => {a++; console.log("Calculate4"+a,stock) });
//       //}
//       return boards;
// }



// function Calculate5(piecesNeeded, stockLengths, cutWidth)
//  {
//     piecesNeeded.sort(function(a, b) {
//         return b[0] - a[0];
//     });
//     //console.log(piecesNeeded)

//     var origCutWidth = cutWidth;

//     stockLengths.sort(function(a, b) {
//         return a - b;
//     });

//     // Ensure that the longest board is shorter than the longest available stock
//     // if(piecesNeeded[piecesNeeded.length - 1][0] > stockLengths[stockLengths.length - 1])
//     //  {
//      //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
//      // } else {

//         var boards = Array();
//         // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
//                 // Main loop

//        while(piecesNeeded.length > 0)
//         {
//           cutWidth = origCutWidth;
//           // Create a new board of the largest stock size
//           var closest = findClosest(stockLengths,piecesNeeded[0][0]);
//           var firstInput = piecesNeeded[0][0];
//           var firstInputAll = piecesNeeded[0];
//           var thisBoard = Array(
//             stockLengths[stockLengths.length - 1],
//             firstInput,
//             Array()
//             );

//           var hasCutWidth = false;
//           var sum = findSum(piecesNeeded);
//           var bcs = 0;
            
//           if(cutWidth > 0)
//               bcs = cutWidth * (piecesNeeded.length-1);

//           var closest = findClosest(stockLengths,sum + bcs);

//           if(sum + bcs <= closest){
//             console.log('here')
//             thisBoard[0] = closest;
//             thisBoard[1] = sum + bcs;
//             thisBoard[2] = piecesNeeded;
//             boards[boards.length] = thisBoard;
//             break;
//           }
//           //console.log("thisBoard",thisBoard)
//           // Iterate through the needed components list
//           for(j = piecesNeeded.length - 1; j > 0; j--)
//           {

            
//             // if 1 input only
//             if(piecesNeeded.length == 1)
//                 cutWidth = 0;

//                 // console.log("thisBoard[1]",thisBoard[1])
//                 // console.log(" thisBoard[0]", thisBoard[0])
//                 // console.log("piecesNeeded[j][0] ",piecesNeeded[j][0] )
//                 // console.log("-------------------------------------------------" )
//               //20 - 0 - 13 >= 0
//               //20 - 13 - 10 >= 0
//               //20 - 13 - 9 >= 0
//             // Add component if it will fit, subtracting it from the list
//             if( thisBoard[1] + piecesNeeded[j][0] <= thisBoard[0] )
//             {
//               var ouput =  thisBoard[1] + piecesNeeded[j][0]  + cutWidth ;
//               hasCutWidth = false;

//               thisBoard[1] += piecesNeeded[j][0];
             

//                 if(thisBoard[1] + cutWidth <= thisBoard[0]){
//                     thisBoard[1] += cutWidth;
//                     thisBoard[2].splice(-1, 0, firstInputAll);
//                     thisBoard[2].splice(-1, 0, piecesNeeded[j]);
//                     piecesNeeded.splice(j, 1);
//                     hasCutWidth = true;
//                 }else{
//                     thisBoard[2].splice(-1, 0, firstInputAll);
//                     break;
//                 }
              

           
//             //   if(stockLengths.includes(ouput)){
//             //     if(thisBoard[2].length === 1)
//             //         cutWidth = 0;                   
//             //   }
              
//             //   //console.log(cutWidth)
//             //   // Adjust for cutting losses
//             //   if(thisBoard[1] + cutWidth >= thisBoard[0])
//             //     thisBoard[1] = thisBoard[0];
//             //   else{
//             //     thisBoard[1] += cutWidth;
//             //   }

//             //   if(stockLengths.includes(ouput))
//             //     break;
                   
//             }else{
//                 thisBoard[2].splice(-1, 0, firstInputAll);
//                 break;
//             }
//           }
        
//           piecesNeeded.splice(0, 1);

//           if(hasCutWidth === true)
//             thisBoard[1] = thisBoard[1]-origCutWidth;
//           // Attempt to reduce the length of the board to the shortest stock length that will accommodate
//           // find the best stocks in output of board
//           for(j = stockLengths.length - 1; j >= 0; j--)
//           {
//             if(stockLengths[j] >= thisBoard[1])
//               thisBoard[0] = stockLengths[j];
//           }

//           if(thisBoard[2].length == 0)
//           {
//             console.log("error here----");
//             break;
//           }
//           boards[boards.length] = thisBoard;
//         }
//         // Done when there are no needed components left
//         var a=0;
//         boards.forEach(stock => {a++; console.log("Calculate5"+a,stock) });
//       //}
//       return boards;
// }

// function CalculatePriority(piecesNeeded, stockLengths, cutWidth,priolength)
//  {
    
//     var origCutWidth = cutWidth;

//     stockLengths.sort(function(a, b) {
//         return a - b;
//     });

//     // Ensure that the longest board is shorter than the longest available stock
//     // if(piecesNeeded[piecesNeeded.length - 1][0] > stockLengths[stockLengths.length - 1])
//     //  {
//      //   outHTML += '<br /><br /><b>Cannot continue: the longest component required is longer than the longest stock available.</b><br />';
//      // } else {

//         var boards = Array();
//         // board[?] = Array(boardLength, usedLength, Array(componentIDs ...))
        
//         var idx = 0; 
//                 // Main loop
//         while(piecesNeeded.length > 0)
//         {
//             idx++;
//           cutWidth = origCutWidth;
//           // Create a new board of the largest stock size
//           var thisBoard = Array();
//           var closest = findClosest(stockLengths,piecesNeeded[0][0]);
          
//           if(idx <= priolength){
//             thisBoard = Array(
//                 closest,
//                 0,
//                 Array()
//                 );
//           }else{
//             thisBoard = Array(
//                 stockLengths[stockLengths.length -1],
//                 0,
//                 Array()
//                 );
//           }
         
//             var hasCutWidth = false;
            
//             var sum = findSum(piecesNeeded);
//             var bcs = 0;
              
//             if(cutWidth > 0)
//                 bcs = cutWidth * (piecesNeeded.length-1);
  
            
//             var closest = findClosest(stockLengths,sum + bcs);
         
//             if(sum + bcs <= closest){
//               console.log('here')
//               thisBoard[0] = closest;
//               thisBoard[1] = sum + bcs;
//               thisBoard[2] = piecesNeeded;
//               boards[boards.length] = thisBoard;
//               break;
//             }

//           // Iterate through the needed components list
//           for(j = piecesNeeded.length - 1; j >= 0; j--)
//           {

//             // if 1 input only
//             if(piecesNeeded.length == 1)
//                 cutWidth = 0;
            
//               //20 - 0 - 13 >= 0
//               //20 - 13 - 10 >= 0
//               //20 - 13 - 9 >= 0
//               //console.log("thisBoard",thisBoard);
//               //console.log("piecesNeeded[j][0] ",piecesNeeded[j][0] );
//             // Add component if it will fit, subtracting it from the list
//             if(thisBoard[0] - thisBoard[1] - piecesNeeded[j][0] >= 0)
//             {
//               hasCutWidth = false;
//               var ouput = thisBoard[0] - thisBoard[1] - piecesNeeded[j][0] ;
//              // console.log("ouput",ouput);

//               thisBoard[1] += piecesNeeded[j][0];
//               thisBoard[2].splice(-1, 0, piecesNeeded[j]);
//               piecesNeeded.splice(j, 1);

           
             
//             //   if(stockLengths.includes(ouput)){
//             //     console.log("includes ----------------");
//             //     console.log("thisBoard[2].length ----------------",thisBoard[2]);
//             //     if(thisBoard[2].length === 1)
//             //         cutWidth = 0;        
                    
//             //     //break;
//             //   }
//              // console.log("cutWidth",cutWidth);
//               //console.log("thisBoard",thisBoard);
//              // console.log("--------------------------");
//               //console.log(cutWidth)

//               if(thisBoard[1] + cutWidth <= thisBoard[0]){
//                 thisBoard[1] += cutWidth;
//                 hasCutWidth = true;
//               }else{
//                 //thisBoard[1] = thisBoard[0];
//                 break;
//               }

//               // Adjust for cutting losses
//             //   if(thisBoard[1] + cutWidth >= thisBoard[0])
//             //     thisBoard[1] = thisBoard[0];
//             //   else{
//             //     thisBoard[1] += cutWidth;
//             //   }

//             //   if(stockLengths.includes(ouput))
//             //     break;
//             }
//           }

//         //   var thisBoardLength = thisBoard[2].length;
//            if(hasCutWidth === true)
//              thisBoard[1] = thisBoard[1]-origCutWidth;
          

//           // Attempt to reduce the length of the board to the shortest stock length that will accommodate
//           // find the best stocks in output of board
//           for(j = stockLengths.length - 1; j >= 0; j--)
//           {
//             if(stockLengths[j] >= thisBoard[1])
//               thisBoard[0] = stockLengths[j];
//           }

//           if(thisBoard[2].length == 0)
//           {
//             console.log("error here----");
//             break;
//           }
//           boards[boards.length] = thisBoard;
          
//         }
//         // Done when there are no needed components left
//         var a=0;
//         boards.forEach(stock => {a++; console.log("CalculatePrio"+priolength+"-"+a,stock) });
//       //}
    
//         return boards;
// }


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
