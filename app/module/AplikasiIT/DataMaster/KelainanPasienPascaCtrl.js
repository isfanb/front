////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelainanPasienPascaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KelainanPasienPasca", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KelainanPasienPasca;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKelainanPasienPasca = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdKelainanPasca",
				"title": "kd Kelainan Pasca"
			},
			{
				"field": "kelainanPasca",
				"title": "kelainan Pasca"
			},
			{
				"field": "qKelainanPasca",
				"title": "q Kelainan Pasca"
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
				columns: $scope.columnKelainanPasienPasca,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.kdKelainanPasca = current.kdKelainanPasca;
	$scope.item.kelainanPasca = current.kelainanPasca;
	$scope.item.qKelainanPasca = current.qKelainanPasca;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KelainanPasienPasca&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KelainanPasienPasca&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KelainanPasienPasca",
		"listField": {
			"kdKelainanPasca": $scope.item.kdKelainanPasca,
			"kelainanPasca": $scope.item.kelainanPasca,
			"qKelainanPasca": $scope.item.qKelainanPasca, 
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
		"class": "KelainanPasienPasca",
		"listField": {
			"kdKelainanPasca": $scope.item.kdKelainanPasca,
			"kelainanPasca": $scope.item.kelainanPasca,
			"qKelainanPasca": $scope.item.qKelainanPasca,
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