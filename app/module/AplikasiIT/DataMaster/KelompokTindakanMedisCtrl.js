define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokTindakanMedisCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokTindakanMedis", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KelompokTindakanMedis;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnKelompokTindakanMedis = [
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
"field": "kdKelompokTM",
"title": "kd Kelompok TM"
},
{
"field": "kelompokTM",
"title": "kelompok TM"
},
{
"field": "qKelompokTM",
"title": "q Kelompok TM"
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
 columns: $scope.columnKelompokTindakanMedis,
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
$scope.item.kdKelompokTM = current.kdKelompokTM;
$scope.item.kelompokTM = current.kelompokTM;
$scope.item.qKelompokTM = current.qKelompokTM;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokTindakanMedis&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokTindakanMedis&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "KelompokTindakanMedis",
	"listField": {
"departemen": $scope.item.departemen,

"kdKelompokTM": $scope.item.kdKelompokTM,
"kelompokTM": $scope.item.kelompokTM,
"qKelompokTM": $scope.item.qKelompokTM,
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
 "class": "KelompokTindakanMedis",
	"listField": {
"departemen": $scope.item.departemen,

"kdKelompokTM": $scope.item.kdKelompokTM,
"kelompokTM": $scope.item.kelompokTM,
"qKelompokTM": $scope.item.qKelompokTM,
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
}
]);
});