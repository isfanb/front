define(['initialize'], function(initialize) {
'use strict';
initialize.controller('MapProdukMenuToBahanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapProdukMenuToBahan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapProdukMenuToBahan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnMapProdukMenuToBahan = [
{
"field": "No",
"title": "No"
},
{
"field": "menuProduk",
"title": "menu Produk"
},
{
"field": "menuProdukId",
"title": "menu Produk Id"
},
{
"field": "bahanProduk",
"title": "bahan Produk"
},
{
"field": "bahanProdukId",
"title": "bahan Produk Id"
},
{
"field": "standarPorsi",
"title": "standar Porsi"
},
{
"field": "satuanStandar",
"title": "satuan Standar"
},
{
"field": "satuanStandarId",
"title": "satuan Standar Id"
},
{
"field": "keterangan",
"title": "keterangan"
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
}
,
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnMapProdukMenuToBahan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.menuProduk = current.menuProduk;
$scope.item.menuProdukId = current.menuProdukId;
$scope.item.bahanProduk = current.bahanProduk;
$scope.item.bahanProdukId = current.bahanProdukId;
$scope.item.standarPorsi = current.standarPorsi;
$scope.item.satuanStandar = current.satuanStandar;
$scope.item.satuanStandarId = current.satuanStandarId;
$scope.item.keterangan = current.keterangan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapProdukMenuToBahan&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapProdukMenuToBahan&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MapProdukMenuToBahan",
	"listField": {
"menuProduk": $scope.item.menuProduk,
"menuProdukId": $scope.item.menuProdukId,
"bahanProduk": $scope.item.bahanProduk,
"bahanProdukId": $scope.item.bahanProdukId,
"standarPorsi": $scope.item.standarPorsi,
"satuanStandar": $scope.item.satuanStandar,
"satuanStandarId": $scope.item.satuanStandarId,
"keterangan": $scope.item.keterangan,
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
////edit
 $scope.edit = function()
  {	
   var data = {
 "class": "MapProdukMenuToBahan",
	"listField": {
"menuProduk": $scope.item.menuProduk,
"menuProdukId": $scope.item.menuProdukId,
"bahanProduk": $scope.item.bahanProduk,
"bahanProdukId": $scope.item.bahanProdukId,
"standarPorsi": $scope.item.standarPorsi,
"satuanStandar": $scope.item.satuanStandar,
"satuanStandarId": $scope.item.satuanStandarId,
"keterangan": $scope.item.keterangan,
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
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listmenuproduk= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listbahanproduk= dat.data;
});
IPSRSService.getFieldListData("SatuanStandar&select=id,namaExternal", true).then(function(dat){
$scope.listsatuanstandar= dat.data;
});
}
]);
});
