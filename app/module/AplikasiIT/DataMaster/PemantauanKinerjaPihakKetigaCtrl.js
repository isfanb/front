define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('PemantauanKinerjaPihakKetigaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PemantauanKinerjaPihakKetiga", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PemantauanKinerjaPihakKetiga;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnPemantauanKinerjaPihakKetiga = [
{
"field": "No",
"title": "No"
},
{
"field": "tanggal",
"title": "tanggal"
},
{
"field": "jenisPekerjaan",
"title": "jenis Pekerjaan"
},
{
"field": "namaPerusahaan",
"title": "nama Perusahaan"
},
{
"field": "analisaTindakLanjut",
"title": "analisa Tindak Lanjut"
},
{
"field": "fileName",
"title": "file Name"
},
{
"field": "file",
"title": "file"
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
 columns: $scope.columnPemantauanKinerjaPihakKetiga,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.tanggal = current.tanggal;
$scope.item.jenisPekerjaan = current.jenisPekerjaan;
$scope.item.namaPerusahaan = current.namaPerusahaan;
$scope.item.analisaTindakLanjut = current.analisaTindakLanjut;
$scope.item.fileName = current.fileName;
$scope.item.file = current.file;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PemantauanKinerjaPihakKetiga&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PemantauanKinerjaPihakKetiga&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "PemantauanKinerjaPihakKetiga",
	"listField": {
"tanggal": $scope.item.tanggal,
"jenisPekerjaan": $scope.item.jenisPekerjaan,
"namaPerusahaan": $scope.item.namaPerusahaan,
"analisaTindakLanjut": $scope.item.analisaTindakLanjut,
"fileName": $scope.item.fileName,
"file": $scope.item.file,
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
 "class": "PemantauanKinerjaPihakKetiga",
	"listField": {
"tanggal": $scope.item.tanggal,
"jenisPekerjaan": $scope.item.jenisPekerjaan,
"namaPerusahaan": $scope.item.namaPerusahaan,
"analisaTindakLanjut": $scope.item.analisaTindakLanjut,
"fileName": $scope.item.fileName,
"file": $scope.item.file,
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
IPSRSService.getFieldListData("byte[]&select=id,namaExternal", true).then(function(dat){
$scope.listfile= dat.data;
});
}
		]);
});
