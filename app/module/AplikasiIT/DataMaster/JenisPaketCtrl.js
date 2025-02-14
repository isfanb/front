////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisPaketCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPaket", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPaket;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisPaket = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisPaket",
"title": "jenis Paket"
},
{
"field": "kdJenisPaket",
"title": "kd Jenis Paket"
},
{
"field": "jenisPaketHead",
"title": "jenis Paket Head"
},
{
"field": "jenisPaketHeadId",
"title": "jenis Paket Head Id"
},
{
"field": "qJenisPaket",
"title": "q Jenis Paket"
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
 columns: $scope.columnJenisPaket,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisPaket = current.jenisPaket;
$scope.item.kdJenisPaket = current.kdJenisPaket;
$scope.item.jenisPaketHead = current.jenisPaketHead;
$scope.item.jenisPaketHeadId = current.jenisPaketHeadId;
$scope.item.qJenisPaket = current.qJenisPaket;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPaket&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPaket&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisPaket",
	"listField": {
"jenisPaket": $scope.item.jenisPaket,
"kdJenisPaket": $scope.item.kdJenisPaket,
"jenisPaketHead": $scope.item.jenisPaketHead,

"qJenisPaket": $scope.item.qJenisPaket,
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
 "class": "JenisPaket",
	"listField": {
"jenisPaket": $scope.item.jenisPaket,
"kdJenisPaket": $scope.item.kdJenisPaket,
"jenisPaketHead": $scope.item.jenisPaketHead,

"qJenisPaket": $scope.item.qJenisPaket,
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
IPSRSService.getFieldListData("JenisPaket&select=id,namaExternal", true).then(function(dat){
$scope.listjenispakethead= dat.data;
});
}
]);
});
