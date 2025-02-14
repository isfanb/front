define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('DetailDraftPeraturanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DetailDraftPeraturan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DetailDraftPeraturan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();
$scope.columnDetailDraftPeraturan = [
{
"field": "No",
"title": "No"
},
{
"field": "draftPeraturan",
"title": "draft Peraturan"
},
{
"field": "draftPeraturanId",
"title": "draft Peraturan Id"
},
{
"field": "tujuanDraft",
"title": "tujuan Draft"
},
{
"field": "tujuanId",
"title": "tujuan Id"
},
{
"field": "koreksi",
"title": "koreksi"
},
{
"field": "statusDraft",
"title": "status Draft"
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
 columns: $scope.columnDetailDraftPeraturan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.draftPeraturan = current.draftPeraturan;

$scope.item.tujuanDraft = current.tujuanDraft;

$scope.item.koreksi = current.koreksi;
$scope.item.statusDraft = current.statusDraft;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailDraftPeraturan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailDraftPeraturan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DetailDraftPeraturan",
	"listField": {
"draftPeraturan": $scope.item.draftPeraturan,

"tujuanDraft": $scope.item.tujuanDraft,

"koreksi": $scope.item.koreksi,
"statusDraft": $scope.item.statusDraft,
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
 "class": "DetailDraftPeraturan",
	"listField": {
"draftPeraturan": $scope.item.draftPeraturan,

"tujuanDraft": $scope.item.tujuanDraft,

"koreksi": $scope.item.koreksi,
"statusDraft": $scope.item.statusDraft,
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
IPSRSService.getFieldListData("DraftPeraturan&select=id,namaExternal", true).then(function(dat){
$scope.listdraftperaturan= dat.data;
});
IPSRSService.getFieldListData("Jabatan&select=id,namaExternal", true).then(function(dat){
$scope.listtujuandraft= dat.data;
});
}
		]);
});