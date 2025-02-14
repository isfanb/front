define(['initialize'], function(initialize) {
'use strict';
initialize.controller('KamusIndikatorCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KamusIndikator", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KamusIndikator;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnKamusIndikator = [
{
"field": "No",
"title": "No"
},
{
"field": "indikator",
"title": "indikator"
},
{
"field": "indikatorId",
"title": "indikator Id"
},
{
"field": "bobotIndikator",
"title": "bobot Indikator"
},
{
"field": "bobotIndikatorId",
"title": "bobot Indikator Id"
},
{
"field": "pic",
"title": "pic"
},
{
"field": "picId",
"title": "pic Id"
},
{
"field": "sumberData",
"title": "sumber Data"
},
{
"field": "periodePelaporan",
"title": "periode Pelaporan"
},
{
"field": "periodePelaporanId",
"title": "periode Pelaporan Id"
},
{
"field": "awalPeriode",
"title": "awal Periode"
},
{
"field": "akhirPeriode",
"title": "akhir Periode"
},
{
"field": "satuanIndikator",
"title": "satuan Indikator"
},
{
"field": "satuanIndikatorId",
"title": "satuan Indikator Id"
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
 columns: $scope.columnKamusIndikator,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.indikator = current.indikator;
$scope.item.indikatorId = current.indikatorId;
$scope.item.bobotIndikator = current.bobotIndikator;
$scope.item.bobotIndikatorId = current.bobotIndikatorId;
$scope.item.pic = current.pic;
$scope.item.picId = current.picId;
$scope.item.sumberData = current.sumberData;
$scope.item.periodePelaporan = current.periodePelaporan;
$scope.item.periodePelaporanId = current.periodePelaporanId;
$scope.item.awalPeriode = current.awalPeriode;
$scope.item.akhirPeriode = current.akhirPeriode;
$scope.item.satuanIndikator = current.satuanIndikator;
$scope.item.satuanIndikatorId = current.satuanIndikatorId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KamusIndikator&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KamusIndikator&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "KamusIndikator",
	"listField": {
"indikator": $scope.item.indikator,
"indikatorId": $scope.item.indikatorId,
"bobotIndikator": $scope.item.bobotIndikator,
"bobotIndikatorId": $scope.item.bobotIndikatorId,
"pic": $scope.item.pic,
"picId": $scope.item.picId,
"sumberData": $scope.item.sumberData,
"periodePelaporan": $scope.item.periodePelaporan,
"periodePelaporanId": $scope.item.periodePelaporanId,
"awalPeriode": $scope.item.awalPeriode,
"akhirPeriode": $scope.item.akhirPeriode,
"satuanIndikator": $scope.item.satuanIndikator,
"satuanIndikatorId": $scope.item.satuanIndikatorId,
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
 "class": "KamusIndikator",
	"listField": {
"indikator": $scope.item.indikator,
"indikatorId": $scope.item.indikatorId,
"bobotIndikator": $scope.item.bobotIndikator,
"bobotIndikatorId": $scope.item.bobotIndikatorId,
"pic": $scope.item.pic,
"picId": $scope.item.picId,
"sumberData": $scope.item.sumberData,
"periodePelaporan": $scope.item.periodePelaporan,
"periodePelaporanId": $scope.item.periodePelaporanId,
"awalPeriode": $scope.item.awalPeriode,
"akhirPeriode": $scope.item.akhirPeriode,
"satuanIndikator": $scope.item.satuanIndikator,
"satuanIndikatorId": $scope.item.satuanIndikatorId,
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
IPSRSService.getFieldListData("IndikatorRensar&select=id,namaExternal", true).then(function(dat){
$scope.listindikator= dat.data;
});
IPSRSService.getFieldListData("BobotIndikator&select=id,namaExternal", true).then(function(dat){
$scope.listbobotindikator= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listpic= dat.data;
});
IPSRSService.getFieldListData("PeriodePelaporan&select=id,namaExternal", true).then(function(dat){
$scope.listperiodepelaporan= dat.data;
});
IPSRSService.getFieldListData("SatuanIndikator&select=id,namaExternal", true).then(function(dat){
$scope.listsatuanindikator= dat.data;
});
}
]);
});