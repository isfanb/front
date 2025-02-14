define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('AsuransiPasienBerlakuCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsuransiPasienBerlaku", true).then(function(dat){
$scope.listDataMaster = dat.data.data.AsuransiPasienBerlaku;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnAsuransiPasienBerlaku = [
{
"field": "No",
"title": "No"
},
{
"field": "isCollectivePlafon",
"title": "is Collective Plafon"
},
{
"field": "hubunganPeserta",
"title": "hubungan Peserta"
},
{
"field": "hubunganPesertaId",
"title": "hubungan Peserta Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
},
{
"field": "noAsuransi",
"title": "no Asuransi"
},
{
"field": "tglAkhirBerlaku",
"title": "tgl Akhir Berlaku"
},
{
"field": "tglMulaiBerlaku",
"title": "tgl Mulai Berlaku"
},
{
"field": "totalCurrentTerpakai",
"title": "total Current Terpakai"
},
{
"field": "totalPlafonTanggungan",
"title": "total Plafon Tanggungan"
},
{
"field": "totalSaldoTanggungan",
"title": "total Saldo Tanggungan"
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
 columns: $scope.columnAsuransiPasienBerlaku,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.isCollectivePlafon = current.isCollectivePlafon;
$scope.item.hubunganPeserta = current.hubunganPeserta;
$scope.item.hubunganPesertaId = current.hubunganPesertaId;
$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
$scope.item.noAsuransi = current.noAsuransi;
$scope.item.tglAkhirBerlaku = current.tglAkhirBerlaku;
$scope.item.tglMulaiBerlaku = current.tglMulaiBerlaku;
$scope.item.totalCurrentTerpakai = current.totalCurrentTerpakai;
$scope.item.totalPlafonTanggungan = current.totalPlafonTanggungan;
$scope.item.totalSaldoTanggungan = current.totalSaldoTanggungan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsuransiPasienBerlaku&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsuransiPasienBerlaku&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "AsuransiPasienBerlaku",
	"listField": {
"isCollectivePlafon": $scope.item.isCollectivePlafon,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"noAsuransi": $scope.item.noAsuransi,
"tglAkhirBerlaku": $scope.item.tglAkhirBerlaku,
"tglMulaiBerlaku": $scope.item.tglMulaiBerlaku,
"totalCurrentTerpakai": $scope.item.totalCurrentTerpakai,
"totalPlafonTanggungan": $scope.item.totalPlafonTanggungan,
"totalSaldoTanggungan": $scope.item.totalSaldoTanggungan,
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
 "class": "AsuransiPasienBerlaku",
	"listField": {
"isCollectivePlafon": $scope.item.isCollectivePlafon,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"noAsuransi": $scope.item.noAsuransi,
"tglAkhirBerlaku": $scope.item.tglAkhirBerlaku,
"tglMulaiBerlaku": $scope.item.tglMulaiBerlaku,
"totalCurrentTerpakai": $scope.item.totalCurrentTerpakai,
"totalPlafonTanggungan": $scope.item.totalPlafonTanggungan,
"totalSaldoTanggungan": $scope.item.totalSaldoTanggungan,
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
IPSRSService.getFieldListData("HubunganPesertaAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listhubunganpeserta= dat.data;
});
}
]);
});
