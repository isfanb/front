////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemeriksaPasienCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=PemeriksaPasien", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.PemeriksaPasien;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnPemeriksaPasien = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdPemeriksaPasien",
				"title": "kd Pemeriksa Pasien"
			},
			{
				"field": "pemeriksaPasien",
				"title": "pemeriksa Pasien"
			},
			{
				"field": "qPemeriksaPasien",
				"title": "q Pemeriksa Pasien"
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
				columns: $scope.columnPemeriksaPasien,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.kdPemeriksaPasien = current.kdPemeriksaPasien;
	$scope.item.pemeriksaPasien = current.pemeriksaPasien;
	$scope.item.qPemeriksaPasien = current.qPemeriksaPasien;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=PemeriksaPasien&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=PemeriksaPasien&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "PemeriksaPasien",
		"listField": {
			"kdPemeriksaPasien": $scope.item.kdPemeriksaPasien,
			"pemeriksaPasien": $scope.item.pemeriksaPasien,
			"qPemeriksaPasien": $scope.item.qPemeriksaPasien,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal
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
		"class": "PemeriksaPasien",
		"listField": {
			"kdPemeriksaPasien": $scope.item.kdPemeriksaPasien,
			"pemeriksaPasien": $scope.item.pemeriksaPasien,
			"qPemeriksaPasien": $scope.item.qPemeriksaPasien,
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
}
]);
});