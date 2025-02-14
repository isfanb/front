define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisObjekModulAplikasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisObjekModulAplikasi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisObjekModulAplikasi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisObjekModulAplikasi = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisObjekModul",
"title": "jenis Objek Modul"
},
{
"field": "historyLoginI",
"title": "history Login I"
},
{
"field": "historyLoginIId",
"title": "history Login IId"
},
{
"field": "historyLoginS",
"title": "history Login S"
},
{
"field": "historyLoginSId",
"title": "history Login SId"
},
{
"field": "historyLoginU",
"title": "history Login U"
},
{
"field": "historyLoginUId",
"title": "history Login UId"
},
{
"field": "kdJenisObjekModul",
"title": "kd Jenis Objek Modul"
},
{
"field": "keterangan",
"title": "keterangan"
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
 columns: $scope.columnJenisObjekModulAplikasi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisObjekModul = current.jenisObjekModul;
$scope.item.historyLoginI = current.historyLoginI;
$scope.item.historyLoginIId = current.historyLoginIId;
$scope.item.historyLoginS = current.historyLoginS;
$scope.item.historyLoginSId = current.historyLoginSId;
$scope.item.historyLoginU = current.historyLoginU;
$scope.item.historyLoginUId = current.historyLoginUId;
$scope.item.kdJenisObjekModul = current.kdJenisObjekModul;
$scope.item.keterangan = current.keterangan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisObjekModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisObjekModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisObjekModulAplikasi",
	"listField": {
"jenisObjekModul": $scope.item.jenisObjekModul,
"historyLoginI": $scope.item.historyLoginI,

"historyLoginS": $scope.item.historyLoginS,

"historyLoginU": $scope.item.historyLoginU,

"kdJenisObjekModul": $scope.item.kdJenisObjekModul,
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

 $scope.edit = function()
  {	
   var data = {
 "class": "JenisObjekModulAplikasi",
	"listField": {
"jenisObjekModul": $scope.item.jenisObjekModul,
"historyLoginI": $scope.item.historyLoginI,

"historyLoginS": $scope.item.historyLoginS,

"historyLoginU": $scope.item.historyLoginU,

"kdJenisObjekModul": $scope.item.kdJenisObjekModul,
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
IPSRSService.getFieldListData("HistoryLoginModulAplikasi&select=id,namaExternal", true).then(function(dat){
$scope.listhistorylogini= dat.data;
});
IPSRSService.getFieldListData("HistoryLoginModulAplikasi&select=id,namaExternal", true).then(function(dat){
$scope.listhistorylogins= dat.data;
});
IPSRSService.getFieldListData("HistoryLoginModulAplikasi&select=id,namaExternal", true).then(function(dat){
$scope.listhistoryloginu= dat.data;
});
}
]);
});