////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KeteranganDietCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KeteranganDiet", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KeteranganDiet;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnKeteranganDiet = [
{
"field": "No",
"title": "No"
},
{
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "kdKeteranganDiet",
"title": "kd Keterangan Diet"
},
{
"field": "keteranganDiet",
"title": "keterangan Diet"
},
{
"field": "noUrut",
"title": "no Urut"
},
{
"field": "qKeteranganDiet",
"title": "q Keterangan Diet"
},
{
"field": "id",
"title": "id"
},
{
"field": "reportDisplay",
"title": "report Display"
},
{
"field": "kodeExternal",
"title": "kode External"
},
{
"field": "namaExternal",
"title": "nama External"
},
{
"field": "statusEnabled",
"title": "status Enabled"
},

{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnKeteranganDiet,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kelompokProduk = current.kelompokProduk;
$scope.item.kelompokProdukId = current.kelompokProdukId;
$scope.item.kdKeteranganDiet = current.kdKeteranganDiet;
$scope.item.keteranganDiet = current.keteranganDiet;
$scope.item.noUrut = current.noUrut;
$scope.item.qKeteranganDiet = current.qKeteranganDiet;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KeteranganDiet&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KeteranganDiet&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "KeteranganDiet",
	"listField": {
"kelompokProduk": $scope.item.kelompokProduk,

"kdKeteranganDiet": $scope.item.kdKeteranganDiet,
"keteranganDiet": $scope.item.keteranganDiet,
"noUrut": $scope.item.noUrut,
"qKeteranganDiet": $scope.item.qKeteranganDiet,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
init();
$scope.item = {};
 });
  }

 $scope.edit = function()
  {	
   var data = {
 "class": "KeteranganDiet",
	"listField": {
"kelompokProduk": $scope.item.kelompokProduk,

"kdKeteranganDiet": $scope.item.kdKeteranganDiet,
"keteranganDiet": $scope.item.keteranganDiet,
"noUrut": $scope.item.noUrut,
"qKeteranganDiet": $scope.item.qKeteranganDiet,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
init();
});
}
$scope.batal = function () {
$scope.showEdit = false;
$scope.item = {};
}
IPSRSService.getFieldListData("KelompokProduk&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokproduk= dat.data;
});
}
]);
});
/////end
