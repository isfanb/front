define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('K3KelompokLpjGedungCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=K3KelompokLpjGedung", true).then(function(dat){
$scope.listDataMaster = dat.data.data.K3KelompokLpjGedung;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnK3KelompokLpjGedung = [
{
"field": "No",
"title": "No"
},
{
"field": "k3FacillityCheck",
"title": "k3Facillity Check"
},
{
"field": "k3FacillityCheckId",
"title": "k3Facillity Check Id"
},
{
"field": "namaKelompok",
"title": "nama Kelompok"
},
{
"field": "k3ItemPeriksaGedung",
"title": "k3Item Periksa Gedung"
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
 columns: $scope.columnK3KelompokLpjGedung,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.k3FacillityCheck = current.k3FacillityCheck;
$scope.item.k3FacillityCheckId = current.k3FacillityCheckId;
$scope.item.namaKelompok = current.namaKelompok;
$scope.item.k3ItemPeriksaGedung = current.k3ItemPeriksaGedung;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=K3KelompokLpjGedung&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=K3KelompokLpjGedung&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "K3KelompokLpjGedung",
	"listField": {
"k3FacillityCheck": $scope.item.k3FacillityCheck,
"k3FacillityCheckId": $scope.item.k3FacillityCheckId,
"namaKelompok": $scope.item.namaKelompok,
"k3ItemPeriksaGedung": $scope.item.k3ItemPeriksaGedung,
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
 "class": "K3KelompokLpjGedung",
	"listField": {
"k3FacillityCheck": $scope.item.k3FacillityCheck,
"k3FacillityCheckId": $scope.item.k3FacillityCheckId,
"namaKelompok": $scope.item.namaKelompok,
"k3ItemPeriksaGedung": $scope.item.k3ItemPeriksaGedung,
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
IPSRSService.getFieldListData("K3FacillityCheck&select=id,namaExternal", true).then(function(dat){
$scope.listk3facillitycheck= dat.data;
});
IPSRSService.getFieldListData("Set&select=id,namaExternal", true).then(function(dat){
$scope.listk3itemperiksagedung= dat.data;
});
}
]);
});