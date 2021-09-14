let instaScript = require("./instaSignUp");

var XLSX = require('xlsx')
var workbook = XLSX.readFile('C:/pepcoding_2021/pepoding_12_21/module_03_promise/activity/instaSignUp/instaData/dataInsta.xlsx');
var workbook2 = XLSX.readFile('userIdRecord.xlsx');
var sheet_name_list = workbook.SheetNames;
var sheet_name_list_2 = workbook2.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
var xlTargetAll = XLSX.utils.sheet_to_json(workbook2.Sheets[sheet_name_list_2[0]]);
// console.log(xlData);

function exp(userName,password,target){
    instaScript.isf(userName,password,target);
    console.log(`name ${userName} password ${password} and target ${target}`);
}
let arr = [];
for(let j = 12; j < 15;j++ ){   //xlTargetAll.length
  arr.push(xlTargetAll[j].targetName);
}                              
var i = 4;                   //  set your counter to 1
function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    userName = xlData[i].userName;
    password = xlData[i].password;
    target = xlTargetAll;
    // console.log("All the targets",arr);
    exp(userName,password,arr)  //  your code here
    i++;                    //  increment the counter
    if (i < 5) {           //xlData.length  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 160000 + (xlTargetAll.length * 40000 * i ) / i )
}
myLoop(); 
