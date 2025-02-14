define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('HargaNettoProdukCitoDCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=HargaNettoProdukCitoD", true).then(function(dat){
$scope.listDataMaster = dat.data.data.HargaNettoProdukCitoD;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnHargaNettoProdukCitoD = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "namaAkun",
				"title": "nama Akun"
			},
			{
				"field": "kodeAkun",
				"title": "kode Akun"
			},
			{
				"field": "ketAkun",
				"title": "ket Akun"
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
 columns: $scope.columnHargaNettoProdukCitoD,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.factorRate = current.factorRate;
$scope.item.hargaSatuan = current.hargaSatuan;
$scope.item.detailJenisProduk = current.detailJenisProduk;
$scope.item.detailJenisProdukId = current.detailJenisProdukId;
$scope.item.komponenHarga = current.komponenHarga;
$scope.item.komponenHargaId = current.komponenHargaId;
$scope.item.mataUang = current.mataUang;
$scope.item.mataUangId = current.mataUangId;
$scope.item.persenDiscount = current.persenDiscount;
$scope.item.persenHargaCito = current.persenHargaCito;
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
 IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukCitoD&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukCitoD&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "HargaNettoProdukCitoD",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaSatuan": $scope.item.hargaSatuan,
"detailJenisProduk": $scope.item.detailJenisProduk,
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"komponenHarga": $scope.item.komponenHarga,
"komponenHargaId": $scope.item.komponenHargaId,
"mataUang": $scope.item.mataUang,
"mataUangId": $scope.item.mataUangId,
"persenDiscount": $scope.item.persenDiscount,
"persenHargaCito": $scope.item.persenHargaCito,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
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
 "class": "HargaNettoProdukCitoD",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaSatuan": $scope.item.hargaSatuan,
"detailJenisProduk": $scope.item.detailJenisProduk,
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"komponenHarga": $scope.item.komponenHarga,
"komponenHargaId": $scope.item.komponenHargaId,
"mataUang": $scope.item.mataUang,
"mataUangId": $scope.item.mataUangId,
"persenDiscount": $scope.item.persenDiscount,
"persenHargaCito": $scope.item.persenHargaCito,
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
IPSRSService.getFieldListData("DetailJenisProduk&select=id,namaExternal", true).then(function(dat){
$scope.listdetailjenisproduk= dat.data;
});
IPSRSService.getFieldListData("KomponenHarga&select=id,namaExternal", true).then(function(dat){
$scope.listkomponenharga= dat.data;
});
IPSRSService.getFieldListData("MataUang&select=id,namaExternal", true).then(function(dat){
$scope.listmatauang= dat.data;
});
}
		]);
});
