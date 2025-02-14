define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('IpsrsTeknisiKontakServiceCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=IpsrsTeknisiKontakService", true).then(function(dat){
$scope.listDataMaster = dat.data.data.IpsrsTeknisiKontakService;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnIpsrsTeknisiKontakService = [
{
"field": "No",
"title": "No"
},
{
"field": "ipsrsKontakService",
"title": "ipsrs Kontak Service"
},
{
"field": "ipsrsKontakServiceId",
"title": "ipsrs Kontak Service Id"
},
{
"field": "teknisi",
"title": "teknisi"
},
{
"field": "teknisiId",
"title": "teknisi Id"
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
 columns: $scope.columnIpsrsTeknisiKontakService,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.ipsrsKontakService = current.ipsrsKontakService;
$scope.item.ipsrsKontakServiceId = current.ipsrsKontakServiceId;
$scope.item.teknisi = current.teknisi;
$scope.item.teknisiId = current.teknisiId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=IpsrsTeknisiKontakService&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=IpsrsTeknisiKontakService&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "IpsrsTeknisiKontakService",
	"listField": {
"ipsrsKontakService": $scope.item.ipsrsKontakService,
"ipsrsKontakServiceId": $scope.item.ipsrsKontakServiceId,
"teknisi": $scope.item.teknisi,
"teknisiId": $scope.item.teknisiId,
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
 "class": "IpsrsTeknisiKontakService",
	"listField": {
"ipsrsKontakService": $scope.item.ipsrsKontakService,
"ipsrsKontakServiceId": $scope.item.ipsrsKontakServiceId,
"teknisi": $scope.item.teknisi,
"teknisiId": $scope.item.teknisiId,
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
IPSRSService.getFieldListData("IpsrsKontakService&select=id,namaExternal", true).then(function(dat){
$scope.listipsrskontakservice= dat.data;
});
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listteknisi= dat.data;
});
}
]);
});