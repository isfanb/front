define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('DesaKelurahanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DesaKelurahan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DesaKelurahan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnDesaKelurahan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdDesaKelurahan",
				"title": "kd Desa Kelurahan"
			},
			{
				"field": "kecamatan",
				"title": "kecamatan"
			},
			{
				"field": "kecamatanId",
				"title": "kecamatan Id"
			},
			{
				"field": "kotaKabupaten",
				"title": "kota Kabupaten"
			},
			{
				"field": "kotaKabupatenId",
				"title": "kota Kabupaten Id"
			},
			{
				"field": "propinsi",
				"title": "propinsi"
			},
			{
				"field": "propinsiId",
				"title": "propinsi Id"
			},
			{
				"field": "kodePos",
				"title": "kode Pos"
			},
			{
				"field": "namaDesaKelurahan",
				"title": "nama Desa Kelurahan"
			},
			{
				"field": "qDesaKelurahan",
				"title": "q Desa Kelurahan"
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
 columns: $scope.columnDesaKelurahan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kdDesaKelurahan = current.kdDesaKelurahan;
$scope.item.kecamatan = current.kecamatan;
$scope.item.kecamatanId = current.kecamatanId;
$scope.item.kotaKabupaten = current.kotaKabupaten;
$scope.item.kotaKabupatenId = current.kotaKabupatenId;
$scope.item.propinsi = current.propinsi;
$scope.item.propinsiId = current.propinsiId;
$scope.item.kodePos = current.kodePos;
$scope.item.namaDesaKelurahan = current.namaDesaKelurahan;
$scope.item.qDesaKelurahan = current.qDesaKelurahan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DesaKelurahan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DesaKelurahan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DesaKelurahan",
	"listField": {
"kdDesaKelurahan": $scope.item.kdDesaKelurahan,
"kecamatan": $scope.item.kecamatan,

"kotaKabupaten": $scope.item.kotaKabupaten,

"propinsi": $scope.item.propinsi,

"kodePos": $scope.item.kodePos,
"namaDesaKelurahan": $scope.item.namaDesaKelurahan,
"qDesaKelurahan": $scope.item.qDesaKelurahan,
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
 "class": "DesaKelurahan",
	"listField": {
"kdDesaKelurahan": $scope.item.kdDesaKelurahan,
"kecamatan": $scope.item.kecamatan,

"kotaKabupaten": $scope.item.kotaKabupaten,

"propinsi": $scope.item.propinsi,

"kodePos": $scope.item.kodePos,
"namaDesaKelurahan": $scope.item.namaDesaKelurahan,
"qDesaKelurahan": $scope.item.qDesaKelurahan,
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
IPSRSService.getFieldListData("Kecamatan&select=id,namaExternal", true).then(function(dat){
$scope.listkecamatan= dat.data;
});
IPSRSService.getFieldListData("KotaKabupaten&select=id,namaExternal", true).then(function(dat){
$scope.listkotakabupaten= dat.data;
});
IPSRSService.getFieldListData("Propinsi&select=id,namaExternal", true).then(function(dat){
$scope.listpropinsi= dat.data;
});
}
		]);
});
