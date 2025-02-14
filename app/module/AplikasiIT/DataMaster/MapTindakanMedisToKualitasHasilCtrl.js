////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapTindakanMedisToKualitasHasilCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MapTindakanMedisToKualitasHasil", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MapTindakanMedisToKualitasHasil;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnMapTindakanMedisToKualitasHasil = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kualitasHasil",
				"title": "kualitas Hasil"
			},
			{
				"field": "kualitasHasilId",
				"title": "kualitas Hasil Id"
			},
			{
				"field": "tindakanMedis",
				"title": "tindakan Medis"
			},
			{
				"field": "tindakanMedisId",
				"title": "tindakan Medis Id"
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
				columns: $scope.columnMapTindakanMedisToKualitasHasil,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.kualitasHasil = current.kualitasHasil;
	$scope.item.kualitasHasilId = current.kualitasHasilId;
	$scope.item.tindakanMedis = current.tindakanMedis;
	$scope.item.tindakanMedisId = current.tindakanMedisId;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MapTindakanMedisToKualitasHasil&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MapTindakanMedisToKualitasHasil&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "MapTindakanMedisToKualitasHasil",
		"listField": {
			"kualitasHasil": $scope.item.kualitasHasil,
			"kualitasHasilId": $scope.item.kualitasHasilId,
			"tindakanMedis": $scope.item.tindakanMedis,
			"tindakanMedisId": $scope.item.tindakanMedisId,
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
		"class": "MapTindakanMedisToKualitasHasil",
		"listField": {
			"kualitasHasil": $scope.item.kualitasHasil,
			"kualitasHasilId": $scope.item.kualitasHasilId,
			"tindakanMedis": $scope.item.tindakanMedis,
			"tindakanMedisId": $scope.item.tindakanMedisId,
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
IPSRSService.getFieldListData("KualitasHasil&select=id,kualitasHasil", true).then(function(dat){
	$scope.listkualitasHasil= dat.data;
});
IPSRSService.getFieldListData("TindakanMedis&select=id,namaExternal", true).then(function(dat){
	$scope.listtindakanMedis= dat.data;
});
}
]);
});