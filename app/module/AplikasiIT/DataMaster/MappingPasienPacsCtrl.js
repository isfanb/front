define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MappingPasienPacsCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MappingPasienPacs", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MappingPasienPacs;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnMappingPasienPacs = [
{
"field": "No",
"title": "No"
},
{
"field": "pasienDaftar",
"title": "pasien Daftar"
},
{
"field": "pasienId",
"title": "pasien Id"
},
{
"field": "studyInstanceUid",
"title": "study Instance Uid"
},
{
"field": "noMr",
"title": "no Mr"
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
 columns: $scope.columnMappingPasienPacs,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.pasienDaftar = current.pasienDaftar;
$scope.item.pasienId = current.pasienId;
$scope.item.studyInstanceUid = current.studyInstanceUid;
$scope.item.noMr = current.noMr;
$scope.item.noRec = current.noRec;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MappingPasienPacs&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MappingPasienPacs&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MappingPasienPacs",
	"listField": {
"pasienDaftar": $scope.item.pasienDaftar,
"pasienId": $scope.item.pasienId,
"studyInstanceUid": $scope.item.studyInstanceUid,
"noMr": $scope.item.noMr,
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
 "class": "MappingPasienPacs",
	"listField": {
"pasienDaftar": $scope.item.pasienDaftar,
"pasienId": $scope.item.pasienId,
"studyInstanceUid": $scope.item.studyInstanceUid,
"noMr": $scope.item.noMr,
"noRec": $scope.item.noRec,
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
IPSRSService.getFieldListData("AntrianPasienDiPeriksa&select=id,namaExternal", true).then(function(dat){
$scope.listpasiendaftar= dat.data;
});
}
		]);
});