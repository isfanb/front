define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KondisiPasienCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KondisiPasien", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KondisiPasien;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnKondisiPasien = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisKondisiPasien",
"title": "jenis Kondisi Pasien"
},
{
"field": "jenisKondisiPasienId",
"title": "jenis Kondisi Pasien Id"
},
{
"field": "kdKondisiPasien",
"title": "kd Kondisi Pasien"
},
{
"field": "kondisiPasien",
"title": "kondisi Pasien"
},
{
"field": "qKondisiPasien",
"title": "q Kondisi Pasien"
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
 columns: $scope.columnKondisiPasien,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisKondisiPasien = current.jenisKondisiPasien;
$scope.item.jenisKondisiPasienId = current.jenisKondisiPasienId;
$scope.item.kdKondisiPasien = current.kdKondisiPasien;
$scope.item.kondisiPasien = current.kondisiPasien;
$scope.item.qKondisiPasien = current.qKondisiPasien;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KondisiPasien&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KondisiPasien&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "KondisiPasien",
	"listField": {
"jenisKondisiPasien": $scope.item.jenisKondisiPasien,

"kdKondisiPasien": $scope.item.kdKondisiPasien,
"kondisiPasien": $scope.item.kondisiPasien,
"qKondisiPasien": $scope.item.qKondisiPasien,
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
 "class": "KondisiPasien",
	"listField": {
"jenisKondisiPasien": $scope.item.jenisKondisiPasien,

"kdKondisiPasien": $scope.item.kdKondisiPasien,
"kondisiPasien": $scope.item.kondisiPasien,
"qKondisiPasien": $scope.item.qKondisiPasien,
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
IPSRSService.getFieldListData("JenisKondisiPasien&select=id,namaExternal", true).then(function(dat){
$scope.listjeniskondisipasien= dat.data;
});
}
]);
});