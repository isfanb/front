define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('HargaNettoDiscPasienPulangCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=HargaNettoDiscPasienPulang", true).then(function(dat){
$scope.listDataMaster = dat.data.data.HargaNettoDiscPasienPulang;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnHargaNettoDiscPasienPulang = [
{
"field": "No",
"title": "No"
},
{
"field": "hargaDiscount",
"title": "harga Discount"
},
{
"field": "komponenHarga",
"title": "komponen Harga"
},
{
"field": "komponenHargaId",
"title": "komponen Harga Id"
},
{
"field": "produk",
"title": "produk"
},
{
"field": "produkId",
"title": "produk Id"
},
{
"field": "range",
"title": "range"
},
{
"field": "rangeId",
"title": "range Id"
},
{
"field": "persenDiscount",
"title": "persen Discount"
},
{
"field": "tglBerlakuAkhir",
"title": "tgl Berlaku Akhir"
},
{
"field": "tglBerlakuAwal",
"title": "tgl Berlaku Awal"
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
 columns: $scope.columnHargaNettoDiscPasienPulang,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.hargaDiscount = current.hargaDiscount;
$scope.item.komponenHarga = current.komponenHarga;
$scope.item.komponenHargaId = current.komponenHargaId;
$scope.item.produk = current.produk;
$scope.item.produkId = current.produkId;
$scope.item.range = current.range;
$scope.item.rangeId = current.rangeId;
$scope.item.persenDiscount = current.persenDiscount;
$scope.item.tglBerlakuAkhir = current.tglBerlakuAkhir;
$scope.item.tglBerlakuAwal = current.tglBerlakuAwal;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HargaNettoDiscPasienPulang&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HargaNettoDiscPasienPulang&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "HargaNettoDiscPasienPulang",
	"listField": {
"hargaDiscount": $scope.item.hargaDiscount,
"komponenHarga": $scope.item.komponenHarga,

"produk": $scope.item.produk,

"range": $scope.item.range,

"persenDiscount": $scope.item.persenDiscount,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
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
 "class": "HargaNettoDiscPasienPulang",
	"listField": {
"hargaDiscount": $scope.item.hargaDiscount,
"komponenHarga": $scope.item.komponenHarga,

"produk": $scope.item.produk,

"range": $scope.item.range,

"persenDiscount": $scope.item.persenDiscount,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
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
IPSRSService.getFieldListData("KomponenHarga&select=id,komponenHarga", true).then(function(dat){
$scope.listkomponenharga= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listproduk= dat.data;
});
IPSRSService.getFieldListData("Range&select=id,namaExternal", true).then(function(dat){
$scope.listrange= dat.data;
});
}
]);
});
