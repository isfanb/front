define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapJenisPetugasPToJenisPegawaiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapJenisPetugasPToJenisPegawai", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapJenisPetugasPToJenisPegawai;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnMapJenisPetugasPToJenisPegawai = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisPegawai",
"title": "jenis Pegawai"
},
{
"field": "jenisPegawaiId",
"title": "jenis Pegawai Id"
},
{
"field": "jenisPetugasPe",
"title": "jenis Petugas Pe"
},
{
"field": "jenisPetugasPeId",
"title": "jenis Petugas Pe Id"
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
 columns: $scope.columnMapJenisPetugasPToJenisPegawai,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisPegawai = current.jenisPegawai;
$scope.item.jenisPegawaiId = current.jenisPegawaiId;
$scope.item.jenisPetugasPe = current.jenisPetugasPe;
$scope.item.jenisPetugasPeId = current.jenisPetugasPeId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapJenisPetugasPToJenisPegawai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapJenisPetugasPToJenisPegawai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "MapJenisPetugasPToJenisPegawai",
	"listField": {
"jenisPegawai": $scope.item.jenisPegawai,
"jenisPegawaiId": $scope.item.jenisPegawaiId,
"jenisPetugasPe": $scope.item.jenisPetugasPe,
"jenisPetugasPeId": $scope.item.jenisPetugasPeId,
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
 "class": "MapJenisPetugasPToJenisPegawai",
	"listField": {
"jenisPegawai": $scope.item.jenisPegawai,
"jenisPegawaiId": $scope.item.jenisPegawaiId,
"jenisPetugasPe": $scope.item.jenisPetugasPe,
"jenisPetugasPeId": $scope.item.jenisPetugasPeId,
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
IPSRSService.getFieldListData("JenisPegawai&select=id,jenisPegawai", true).then(function(dat){
$scope.listjenispegawai= dat.data;
});
IPSRSService.getFieldListData("JenisPetugasPelaksana&select=id,jenisPetugasPe", true).then(function(dat){
$scope.listjenispetugaspe= dat.data;
});
}
]);
});
