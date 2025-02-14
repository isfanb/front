define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('TitlePasienCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=TitlePasien", true).then(function(dat){
$scope.listDataMaster = dat.data.data.TitlePasien;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnTitlePasien = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisKelamin",
"title": "jenis Kelamin"
},
{
"field": "jenisKelaminId",
"title": "jenis Kelamin Id"
},
{
"field": "statusPerkawinan",
"title": "status Perkawinan"
},
{
"field": "statusPerkawinanId",
"title": "status Perkawinan Id"
},
{
"field": "maxAge",
"title": "max Age"
},
{
"field": "minAge",
"title": "min Age"
},
{
"field": "namaTitle",
"title": "nama Title"
},
{
"field": "qTitle",
"title": "q Title"
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
 columns: $scope.columnTitlePasien,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisKelamin = current.jenisKelamin;
$scope.item.jenisKelaminId = current.jenisKelaminId;
$scope.item.statusPerkawinan = current.statusPerkawinan;
$scope.item.statusPerkawinanId = current.statusPerkawinanId;
$scope.item.maxAge = current.maxAge;
$scope.item.minAge = current.minAge;
$scope.item.namaTitle = current.namaTitle;
$scope.item.qTitle = current.qTitle;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=TitlePasien&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=TitlePasien&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "TitlePasien",
	"listField": {
"jenisKelamin": $scope.item.jenisKelamin,
"jenisKelaminId": $scope.item.jenisKelaminId,
"statusPerkawinan": $scope.item.statusPerkawinan,
"statusPerkawinanId": $scope.item.statusPerkawinanId,
"maxAge": $scope.item.maxAge,
"minAge": $scope.item.minAge,
"namaTitle": $scope.item.namaTitle,
"qTitle": $scope.item.qTitle,
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
 "class": "TitlePasien",
	"listField": {
"jenisKelamin": $scope.item.jenisKelamin,
"jenisKelaminId": $scope.item.jenisKelaminId,
"statusPerkawinan": $scope.item.statusPerkawinan,
"statusPerkawinanId": $scope.item.statusPerkawinanId,
"maxAge": $scope.item.maxAge,
"minAge": $scope.item.minAge,
"namaTitle": $scope.item.namaTitle,
"qTitle": $scope.item.qTitle,
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
IPSRSService.getFieldListData("JenisKelamin&select=id,namaExternal", true).then(function(dat){
$scope.listjeniskelamin= dat.data;
});
IPSRSService.getFieldListData("StatusPerkawinan&select=id,namaExternal", true).then(function(dat){
$scope.liststatusperkawinan= dat.data;
});
}
		]);
});
