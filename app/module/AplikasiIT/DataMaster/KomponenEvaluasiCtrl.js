define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KomponenEvaluasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenEvaluasi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KomponenEvaluasi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnKomponenEvaluasi = [
{
"field": "No",
"title": "No"
},
{
"field": "departemen",
"title": "departemen"
},
{
"field": "departemenId",
"title": "departemen Id"
},
{
"field": "kdKomponenEvaluasi",
"title": "kd Komponen Evaluasi"
},
{
"field": "komponenEvaluasiHead",
"title": "komponen Evaluasi Head"
},
{
"field": "komponenEvaluasiHeadId",
"title": "komponen Evaluasi Head Id"
},
{
"field": "satuanHasil",
"title": "satuan Hasil"
},
{
"field": "satuanHasilId",
"title": "satuan Hasil Id"
},
{
"field": "komponenEvaluasi",
"title": "komponen Evaluasi"
},
{
"field": "nilaiNormal",
"title": "nilai Normal"
},
{
"field": "noUrut",
"title": "no Urut"
},
{
"field": "qKomponenEvaluasi",
"title": "q Komponen Evaluasi"
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
 columns: $scope.columnKomponenEvaluasi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kdKomponenEvaluasi = current.kdKomponenEvaluasi;
$scope.item.komponenEvaluasiHead = current.komponenEvaluasiHead;
$scope.item.komponenEvaluasiHeadId = current.komponenEvaluasiHeadId;
$scope.item.satuanHasil = current.satuanHasil;
$scope.item.satuanHasilId = current.satuanHasilId;
$scope.item.komponenEvaluasi = current.komponenEvaluasi;
$scope.item.nilaiNormal = current.nilaiNormal;
$scope.item.noUrut = current.noUrut;
$scope.item.qKomponenEvaluasi = current.qKomponenEvaluasi;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenEvaluasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenEvaluasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "KomponenEvaluasi",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdKomponenEvaluasi": $scope.item.kdKomponenEvaluasi,
"komponenEvaluasiHead": $scope.item.komponenEvaluasiHead,
"komponenEvaluasiHeadId": $scope.item.komponenEvaluasiHeadId,
"satuanHasil": $scope.item.satuanHasil,
"satuanHasilId": $scope.item.satuanHasilId,
"komponenEvaluasi": $scope.item.komponenEvaluasi,
"nilaiNormal": $scope.item.nilaiNormal,
"noUrut": $scope.item.noUrut,
"qKomponenEvaluasi": $scope.item.qKomponenEvaluasi,
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
 "class": "KomponenEvaluasi",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdKomponenEvaluasi": $scope.item.kdKomponenEvaluasi,
"komponenEvaluasiHead": $scope.item.komponenEvaluasiHead,
"komponenEvaluasiHeadId": $scope.item.komponenEvaluasiHeadId,
"satuanHasil": $scope.item.satuanHasil,
"satuanHasilId": $scope.item.satuanHasilId,
"komponenEvaluasi": $scope.item.komponenEvaluasi,
"nilaiNormal": $scope.item.nilaiNormal,
"noUrut": $scope.item.noUrut,
"qKomponenEvaluasi": $scope.item.qKomponenEvaluasi,
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
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("KomponenEvaluasi&select=id,namaExternal", true).then(function(dat){
$scope.listkomponenevaluasihead= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
$scope.listsatuanhasil= dat.data;
});
}
]);
});