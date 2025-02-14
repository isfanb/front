define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('PelayananProfileCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PelayananProfile", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PelayananProfile;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnPelayananProfile = [
{
"field": "No",
"title": "No"
},
{
"field": "hariBukaDlmMinggu",
"title": "hari Buka Dlm Minggu"
},
{
"field": "jamBukaDlmHari",
"title": "jam Buka Dlm Hari"
},
{
"field": "jenisPelayananProfile",
"title": "jenis Pelayanan Profile"
},
{
"field": "jenisPelayananProfileId",
"title": "jenis Pelayanan Profile Id"
},
{
"field": "kdPelayananProfile",
"title": "kd Pelayanan Profile"
},
{
"field": "pelayananProfile",
"title": "pelayanan Profile"
},
{
"field": "qPelayananProfile",
"title": "q Pelayanan Profile"
},
{
"field": "qtyBukaDlmMinggu",
"title": "qty Buka Dlm Minggu"
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
 columns: $scope.columnPelayananProfile,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.hariBukaDlmMinggu = current.hariBukaDlmMinggu;
$scope.item.jamBukaDlmHari = current.jamBukaDlmHari;
$scope.item.jenisPelayananProfile = current.jenisPelayananProfile;

$scope.item.kdPelayananProfile = current.kdPelayananProfile;
$scope.item.pelayananProfile = current.pelayananProfile;
$scope.item.qPelayananProfile = current.qPelayananProfile;
$scope.item.qtyBukaDlmMinggu = current.qtyBukaDlmMinggu;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PelayananProfile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PelayananProfile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "PelayananProfile",
	"listField": {
"hariBukaDlmMinggu": $scope.item.hariBukaDlmMinggu,
"jamBukaDlmHari": $scope.item.jamBukaDlmHari,
"jenisPelayananProfile": $scope.item.jenisPelayananProfile,

"kdPelayananProfile": $scope.item.kdPelayananProfile,
"pelayananProfile": $scope.item.pelayananProfile,
"qPelayananProfile": $scope.item.qPelayananProfile,
"qtyBukaDlmMinggu": $scope.item.qtyBukaDlmMinggu,
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
 "class": "PelayananProfile",
	"listField": {
"hariBukaDlmMinggu": $scope.item.hariBukaDlmMinggu,
"jamBukaDlmHari": $scope.item.jamBukaDlmHari,
"jenisPelayananProfile": $scope.item.jenisPelayananProfile,

"kdPelayananProfile": $scope.item.kdPelayananProfile,
"pelayananProfile": $scope.item.pelayananProfile,
"qPelayananProfile": $scope.item.qPelayananProfile,
"qtyBukaDlmMinggu": $scope.item.qtyBukaDlmMinggu,
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
IPSRSService.getFieldListData("JenisPelayananProfile&select=id,namaExternal", true).then(function(dat){
$scope.listjenispelayananprofile= dat.data;
});

}
		]);
});