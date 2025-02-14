define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KasusPenyakitCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KasusPenyakit", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KasusPenyakit;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnKasusPenyakit = [
{
"field": "No",
"title": "No"
},
{
"field": "kasusPenyakit",
"title": "kasus Penyakit"
},
{
"field": "kdKasusPenyakit",
"title": "kd Kasus Penyakit"
},
{
"field": "pelayananProfile",
"title": "pelayanan Profile"
},
{
"field": "pelayananProfileId",
"title": "pelayanan Profile Id"
},
{
"field": "qKasusPenyakit",
"title": "q Kasus Penyakit"
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
 columns: $scope.columnKasusPenyakit,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kasusPenyakit = current.kasusPenyakit;
$scope.item.kdKasusPenyakit = current.kdKasusPenyakit;
$scope.item.pelayananProfile = current.pelayananProfile;

$scope.item.qKasusPenyakit = current.qKasusPenyakit;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KasusPenyakit&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KasusPenyakit&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "KasusPenyakit",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,
"kdKasusPenyakit": $scope.item.kdKasusPenyakit,
"pelayananProfile": $scope.item.pelayananProfile,

"qKasusPenyakit": $scope.item.qKasusPenyakit,
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
 "class": "KasusPenyakit",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,
"kdKasusPenyakit": $scope.item.kdKasusPenyakit,
"pelayananProfile": $scope.item.pelayananProfile,

"qKasusPenyakit": $scope.item.qKasusPenyakit,
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
IPSRSService.getFieldListData("PelayananProfile&select=id,namaExternal", true).then(function(dat){
$scope.listpelayananprofile= dat.data;
});
}
		]);
});