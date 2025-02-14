////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('PenyebabDiagnosaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PenyebabDiagnosa", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PenyebabDiagnosa;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnPenyebabDiagnosa = [
{
"field": "No",
"title": "No"
},
{
"field": "diagnosa",
"title": "diagnosa"
},
{
"field": "diagnosaId",
"title": "diagnosa Id"
},
{
"field": "kelompokPDiagnosa",
"title": "kelompok PDiagnosa"
},
{
"field": "kelompokPDiagnosaId",
"title": "kelompok PDiagnosa Id"
},
{
"field": "kdPenyebabDiagnosa",
"title": "kd Penyebab Diagnosa"
},
{
"field": "penyebabDiagnosa",
"title": "penyebab Diagnosa"
},
{
"field": "qPenyebabDiagnosa",
"title": "q Penyebab Diagnosa"
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
 columns: $scope.columnPenyebabDiagnosa,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.diagnosa = current.diagnosa;

$scope.item.kelompokPDiagnosa = current.kelompokPDiagnosa;

$scope.item.kdPenyebabDiagnosa = current.kdPenyebabDiagnosa;
$scope.item.penyebabDiagnosa = current.penyebabDiagnosa;
$scope.item.qPenyebabDiagnosa = current.qPenyebabDiagnosa;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PenyebabDiagnosa&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PenyebabDiagnosa&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "PenyebabDiagnosa",
	"listField": {
"diagnosa": $scope.item.diagnosa,

"kelompokPDiagnosa": $scope.item.kelompokPDiagnosa,

"kdPenyebabDiagnosa": $scope.item.kdPenyebabDiagnosa,
"penyebabDiagnosa": $scope.item.penyebabDiagnosa,
"qPenyebabDiagnosa": $scope.item.qPenyebabDiagnosa,
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
 "class": "PenyebabDiagnosa",
	"listField": {
"diagnosa": $scope.item.diagnosa,

"kelompokPDiagnosa": $scope.item.kelompokPDiagnosa,

"kdPenyebabDiagnosa": $scope.item.kdPenyebabDiagnosa,
"penyebabDiagnosa": $scope.item.penyebabDiagnosa,
"qPenyebabDiagnosa": $scope.item.qPenyebabDiagnosa,
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
IPSRSService.getFieldListData("Diagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listdiagnosa= dat.data;
});
IPSRSService.getFieldListData("KelompokPenyebabDiagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokPDiagnosa= dat.data;
});
}
]);
});