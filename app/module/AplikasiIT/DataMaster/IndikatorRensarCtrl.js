define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('IndikatorRensarCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=IndikatorRensar", true).then(function(dat){
$scope.listDataMaster = dat.data.data.IndikatorRensar;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnIndikatorRensar = [
{
"field": "No",
"title": "No"
},
{
"field": "sasaranStrategis",
"title": "sasaran Strategis"
},
{
"field": "sasaranStrategisId",
"title": "sasaran Strategis Id"
},
{
"field": "indikator",
"title": "indikator"
},
{
"field": "definisiOperasional",
"title": "definisi Operasional"
},
{
"field": "formula",
"title": "formula"
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
 columns: $scope.columnIndikatorRensar,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.sasaranStrategis = current.sasaranStrategis;
$scope.item.sasaranStrategisId = current.sasaranStrategisId;
$scope.item.indikator = current.indikator;
$scope.item.definisiOperasional = current.definisiOperasional;
$scope.item.formula = current.formula;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
for (var x=0;x<  $scope.listsasaranstrategis.length ;x++){
					if ($scope.listsasaranstrategis[x].id === current.sasaranStrategisId){
						$scope.item.sasaranStrategis = $scope.listsasaranstrategis[x];
						return;
					}
				}
	 
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=IndikatorRensar&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=IndikatorRensar&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "IndikatorRensar",
	"listField": {
"sasaranStrategis": $scope.item.sasaranStrategis,
"sasaranStrategisId": $scope.item.sasaranStrategisId,
"indikator": $scope.item.indikator,
"definisiOperasional": $scope.item.definisiOperasional,
"formula": $scope.item.formula,
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
 "class": "IndikatorRensar",
	"listField": {
"sasaranStrategis": $scope.item.sasaranStrategis,
"sasaranStrategisId": $scope.item.sasaranStrategisId,
"indikator": $scope.item.indikator,
"definisiOperasional": $scope.item.definisiOperasional,
"formula": $scope.item.formula,
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
IPSRSService.getFieldListData("SasaranStrategis&select=id,sasaranStrategis", true).then(function(dat){
$scope.listsasaranstrategis= dat.data;
});
}
]);
});