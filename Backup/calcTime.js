var start = 0;
var end = 0;

start = new Date().getTime();
// 要測試的 function 開始 =======
for(i = 0; i < 1000000; i++) {
  console.log('hi, baby : ', i);
}
// 要測試的 function 結束 =======
end = new Date().getTime();

console.log('\n\n' + 'start = ', start);
console.log('end   = ', end);
// 計算花多久時間
console.error((end - start) / 1000 + " sec \n\n");
