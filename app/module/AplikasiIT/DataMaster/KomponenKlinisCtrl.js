////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenKlinisCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenKlinis", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenKlinis;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKomponenKlinis = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisKajian",
				"title": "jenis Kajian"
			},
			{
				"field": "jenisKajianId",
				"title": "jenis Kajian Id"
			},
			{
				"field": "kdKomponenKlinis",
				"title": "kd Komponen Klinis"
			},
			{
				"field": "satuanHasil",
				"title": "satuan Hasil"
			},
			{
				"field": "satuanHasilId",
				"title": "satuan Hasil Id"
			},
			{
				"field": "komponenKlinis",
				"title": "komponen Klinis"
			},
			{
				"field": "nilaiNormal",
				"title": "nilai Normal"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qKomponenKlinis",
				"title": "q Komponen Klinis"
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
				columns: $scope.columnKomponenKlinis,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.jenisKajian = current.jenisKajian;
	$scope.item.jenisKajianId = current.jenisKajianId;
	$scope.item.kdKomponenKlinis = current.kdKomponenKlinis;
	$scope.item.satuanHasil = current.satuanHasil;
	$scope.item.satuanHasilId = current.satuanHasilId;
	$scope.item.komponenKlinis = current.komponenKlinis;
	$scope.item.nilaiNormal = current.nilaiNormal;
	$scope.item.noUrut = current.noUrut;
	$scope.item.qKomponenKlinis = current.qKomponenKlinis;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenKlinis&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenKlinis&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KomponenKlinis",
		"listField": {
			"jenisKajian": $scope.item.jenisKajian,
			"jenisKajianId": $scope.item.jenisKajianId,
			"kdKomponenKlinis": $scope.item.kdKomponenKlinis,
			"satuanHasil": $scope.item.satuanHasil,
			"satuanHasilId": $scope.item.satuanHasilId,
			"komponenKlinis": $scope.item.komponenKlinis,
			"nilaiNormal": $scope.item.nilaiNormal,
			"noUrut": $scope.item.noUrut,
			"qKomponenKlinis": $scope.item.qKomponenKlinis,
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
		"class": "KomponenKlinis",
		"listField": {
			"jenisKajian": $scope.item.jenisKajian,
			"jenisKajianId": $scope.item.jenisKajianId,
			"kdKomponenKlinis": $scope.item.kdKomponenKlinis,
			"satuanHasil": $scope.item.satuanHasil,
			"satuanHasilId": $scope.item.satuanHasilId,
			"komponenKlinis": $scope.item.komponenKlinis,
			"nilaiNormal": $scope.item.nilaiNormal,
			"noUrut": $scope.item.noUrut,
			"qKomponenKlinis": $scope.item.qKomponenKlinis,
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
IPSRSService.getFieldListData("AsKepJenisKajian&select=id,namaExternal", true).then(function(dat){
	$scope.listjeniskajian= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
	$scope.listsatuanhasil= dat.data;
});
}
]);
});