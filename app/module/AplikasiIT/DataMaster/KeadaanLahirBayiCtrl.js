////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeadaanLahirBayiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KeadaanLahirBayi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KeadaanLahirBayi;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKeadaanLahirBayi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdKeadaanLahirBayi",
				"title": "kd Keadaan Lahir Bayi"
			},
			{
				"field": "kuantitasLahirBayi",
				"title": "kuantitas Lahir Bayi"
			},
			{
				"field": "kuantitasLahirBayiId",
				"title": "kuantitas Lahir Bayi Id"
			},
			{
				"field": "keadaanLahirBayi",
				"title": "keadaan Lahir Bayi"
			},
			{
				"field": "qKeadaanLahirBayi",
				"title": "q Keadaan Lahir Bayi"
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
				columns: $scope.columnKeadaanLahirBayi,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.kdKeadaanLahirBayi = current.kdKeadaanLahirBayi;
	$scope.item.kuantitasLahirBayi = current.kuantitasLahirBayi;
	$scope.item.kuantitasLahirBayiId = current.kuantitasLahirBayiId;
	$scope.item.keadaanLahirBayi = current.keadaanLahirBayi;
	$scope.item.qKeadaanLahirBayi = current.qKeadaanLahirBayi;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KeadaanLahirBayi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KeadaanLahirBayi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KeadaanLahirBayi",
		"listField": {
			"kdKeadaanLahirBayi": $scope.item.kdKeadaanLahirBayi,
			"kuantitasLahirBayi": $scope.item.kuantitasLahirBayi,
			"kuantitasLahirBayiId": $scope.item.kuantitasLahirBayiId,
			"keadaanLahirBayi": $scope.item.keadaanLahirBayi,
			"qKeadaanLahirBayi": $scope.item.qKeadaanLahirBayi,
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
		"class": "KeadaanLahirBayi",
		"listField": {
			"kdKeadaanLahirBayi": $scope.item.kdKeadaanLahirBayi,
			"kuantitasLahirBayi": $scope.item.kuantitasLahirBayi,
			"kuantitasLahirBayiId": $scope.item.kuantitasLahirBayiId,
			"keadaanLahirBayi": $scope.item.keadaanLahirBayi,
			"qKeadaanLahirBayi": $scope.item.qKeadaanLahirBayi,
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
IPSRSService.getFieldListData("KuantitasLahirBayi&select=id,namaExternal", true).then(function(dat){
	$scope.listkuantitasLahirBayi= dat.data;
});
}
]);
});