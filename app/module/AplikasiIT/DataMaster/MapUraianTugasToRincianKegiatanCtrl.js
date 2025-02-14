define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapUraianTugasToRincianKegiatanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapUraianTugasToRincianKegiatan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapUraianTugasToRincianKegiatan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnMapUraianTugasToRincianKegiatan = [
{
"field": "No",
"title": "No"
},
{
"field": "qRincianKegiatan",
"title": "q Rincian Kegiatan"
},
{
"field": "kdRincianKegiatan",
"title": "kd Rincian Kegiatan"
},
{
"field": "noUrut",
"title": "no Urut"
},
{
"field": "bobot",
"title": "bobot"
},
{
"field": "target",
"title": "target"
},
{
"field": "rincianKegiatan",
"title": "rincian Kegiatan"
},
{
"field": "mapJabatanToUraianTugas",
"title": "map Jabatan To Uraian Tugas"
},
{
"field": "mapJabatanToUraianTugasId",
"title": "map Jabatan To Uraian Tugas Id"
},
{
"field": "pelaksanaanTugas",
"title": "pelaksanaan Tugas"
},
{
"field": "pelaksanaanTugasId",
"title": "pelaksanaan Tugas Id"
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
}
,
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnMapUraianTugasToRincianKegiatan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.qRincianKegiatan = current.qRincianKegiatan;
$scope.item.kdRincianKegiatan = current.kdRincianKegiatan;
$scope.item.noUrut = current.noUrut;
$scope.item.bobot = current.bobot;
$scope.item.target = current.target;
$scope.item.rincianKegiatan = current.rincianKegiatan;
$scope.item.mapJabatanToUraianTugas = current.mapJabatanToUraianTugas;
$scope.item.mapJabatanToUraianTugasId = current.mapJabatanToUraianTugasId;
$scope.item.pelaksanaanTugas = current.pelaksanaanTugas;
$scope.item.pelaksanaanTugasId = current.pelaksanaanTugasId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapUraianTugasToRincianKegiatan&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapUraianTugasToRincianKegiatan&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MapUraianTugasToRincianKegiatan",
	"listField": {
"qRincianKegiatan": $scope.item.qRincianKegiatan,
"kdRincianKegiatan": $scope.item.kdRincianKegiatan,
"noUrut": $scope.item.noUrut,
"bobot": $scope.item.bobot,
"target": $scope.item.target,
"rincianKegiatan": $scope.item.rincianKegiatan,
"mapJabatanToUraianTugas": $scope.item.mapJabatanToUraianTugas,
"mapJabatanToUraianTugasId": $scope.item.mapJabatanToUraianTugasId,
"pelaksanaanTugas": $scope.item.pelaksanaanTugas,
"pelaksanaanTugasId": $scope.item.pelaksanaanTugasId,
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
 "class": "MapUraianTugasToRincianKegiatan",
	"listField": {
"qRincianKegiatan": $scope.item.qRincianKegiatan,
"kdRincianKegiatan": $scope.item.kdRincianKegiatan,
"noUrut": $scope.item.noUrut,
"bobot": $scope.item.bobot,
"target": $scope.item.target,
"rincianKegiatan": $scope.item.rincianKegiatan,
"mapJabatanToUraianTugas": $scope.item.mapJabatanToUraianTugas,
"mapJabatanToUraianTugasId": $scope.item.mapJabatanToUraianTugasId,
"pelaksanaanTugas": $scope.item.pelaksanaanTugas,
"pelaksanaanTugasId": $scope.item.pelaksanaanTugasId,
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
IPSRSService.getFieldListData("MapJabatanToUraianTugas&select=id,namaExternal", true).then(function(dat){
$scope.listmapjabatantouraiantugas= dat.data;
});
IPSRSService.getFieldListData("PelaksanaanTugas&select=id,namaExternal", true).then(function(dat){
$scope.listpelaksanaantugas= dat.data;
});

}
		]);
});