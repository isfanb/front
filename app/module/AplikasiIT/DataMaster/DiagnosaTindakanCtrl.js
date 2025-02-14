define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DiagnosaTindakanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DiagnosaTindakan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DiagnosaTindakan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnDiagnosaTindakan = [
{
"field": "No",
"title": "No"
},
{
"field": "kdDiagnosaTindakan",
"title": "kd Diagnosa Tindakan"
},
{
"field": "namaDiagnosaTindakan",
"title": "nama Diagnosa Tindakan"
},
{
"field": "diagnosaTindakan",
"title": "diagnosa Tindakan"
},
{
"field": "diagnosaTindakanId",
"title": "diagnosa Tindakan Id"
},
{
"field": "kategoryDiagnosa",
"title": "kategory Diagnosa"
},
{
"field": "kategoryDiagnosaId",
"title": "kategory Diagnosa Id"
},
{
"field": "qDiagnosaTindakan",
"title": "q Diagnosa Tindakan"
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
 columns: $scope.columnDiagnosaTindakan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kdDiagnosaTindakan = current.kdDiagnosaTindakan;
$scope.item.namaDiagnosaTindakan = current.namaDiagnosaTindakan;
$scope.item.diagnosaTindakan = current.diagnosaTindakan;
$scope.item.diagnosaTindakanId = current.diagnosaTindakanId;
$scope.item.kategoryDiagnosa = current.kategoryDiagnosa;
$scope.item.kategoryDiagnosaId = current.kategoryDiagnosaId;
$scope.item.qDiagnosaTindakan = current.qDiagnosaTindakan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaTindakan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaTindakan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DiagnosaTindakan",
	"listField": {
"kdDiagnosaTindakan": $scope.item.kdDiagnosaTindakan,
"namaDiagnosaTindakan": $scope.item.namaDiagnosaTindakan,
"diagnosaTindakan": $scope.item.diagnosaTindakan,
"diagnosaTindakanId": $scope.item.diagnosaTindakanId,
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,
"kategoryDiagnosaId": $scope.item.kategoryDiagnosaId,
"qDiagnosaTindakan": $scope.item.qDiagnosaTindakan,
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
 "class": "DiagnosaTindakan",
	"listField": {
"kdDiagnosaTindakan": $scope.item.kdDiagnosaTindakan,
"namaDiagnosaTindakan": $scope.item.namaDiagnosaTindakan,
"diagnosaTindakan": $scope.item.diagnosaTindakan,
"diagnosaTindakanId": $scope.item.diagnosaTindakanId,
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,
"kategoryDiagnosaId": $scope.item.kategoryDiagnosaId,
"qDiagnosaTindakan": $scope.item.qDiagnosaTindakan,
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
$scope.listdiagnosatindakan= dat.data;
});
IPSRSService.getFieldListData("KategoryDiagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listkategorydiagnosa= dat.data;
});

}
]);
});