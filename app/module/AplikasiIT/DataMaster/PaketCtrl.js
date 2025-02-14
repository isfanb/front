define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PaketCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function ($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Paket", true).then(function (dat) {
					$scope.listDataMaster = dat.data.data.Paket;
					$scope.nextId = dat.data.data.Paket.length + 1;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true
					});
				});

				IPSRSService.getFieldListData("JenisPaket&select=id,namaExternal", true).then(function (dat) {
					$scope.listjenispaket = dat.data;
				});
			}

			init();

			$scope.columnPaket = [{
				// 	"field": "No",
				// 	"title": "No"
				// }, {
				// 	"field": "jenisPaket",
				// 	"title": "jenis Paket"
				// }, {
				"field": "id",
				"title": "id"
			}, {
				// 	"field": "jenisPaketId",
				// 	"title": "jenis Paket Id"
				// }, {
				// 	"field": "jenisTransaksi",
				// 	"title": "jenis Transaksi"
				// }, {
				// 	"field": "jenisTransaksiId",
				// 	"title": "jenis Transaksi Id"
				// }, {
				// 	"field": "kdPaket",
				// 	"title": "kd Paket"
				// }, {
				"field": "namaPaket",
				"title": "nama Paket"
			}, {
				// 	"field": "qPaket",
				// 	"title": "q Paket"
				// }, {
				// 	"field": "id",
				// 	"title": "id"
				// }, {
				// 	"field": "reportDisplay",
				// 	"title": "report Display"
				// }, {
				// 	"field": "kodeExternal",
				// 	"title": "kode External"
				// }, {
				// 	"field": "namaExternal",
				// 	"title": "nama External"
				// }, {
				"field": "statusEnabled",
				"title": "status Enabled"
			}, {
				"title": "Action",
				"width": "200px",
				"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
					"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}];

			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnPaket,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function (current) {
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.jenisPaket = {
					id: current.jenisPaketId
				}
				$scope.item.jenisPaketId = current.jenisPaketId;
				$scope.item.jenisTransaksi = current.jenisTransaksi;
				$scope.item.jenisTransaksiId = current.jenisTransaksiId;
				$scope.item.kdPaket = current.kdPaket;
				$scope.item.namaPaket = current.namaPaket;
				$scope.item.qPaket = current.qPaket;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};

			$scope.disableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=Paket&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
					init();
				});
			};

			$scope.enableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=Paket&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					init();
				});
			};

			$scope.tambah = function () {
				var data = {
					"class": "Paket",
					"listField": {
						"jenisPaket": $scope.item.jenisPaket,
						"jenisTransaksi": $scope.item.jenisTransaksi,
						"kdPaket": $scope.nextId,
						"namaPaket": $scope.item.namaPaket,
						"qPaket": $scope.nextId,
						"id": $scope.item.id,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
					}
				}

				IPSRSService.saveDataMaster(data, "save-master-table").then(function (e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
				});
			}

			$scope.edit = function () {
				var data = {
					"class": "Paket",
					"listField": {
						"jenisPaket": $scope.item.jenisPaket,
						"jenisTransaksi": $scope.item.jenisTransaksi,
						"kdPaket": $scope.item.kdPaket,
						"namaPaket": $scope.item.namaPaket,
						"qPaket": $scope.item.qPaket,
						"id": $scope.item.id,
						"noRec": $scope.item.noRec,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
						"statusEnabled": $scope.item.statusEnabled
					}
				}

				IPSRSService.saveDataMaster(data, "update-master-table").then(function (e) {
					console.log(JSON.stringify(e.data));
					init();
				});
			}

			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

			IPSRSService.getFieldListData("JenisPaket&select=id,namaExternal", true).then(function (dat) {
				$scope.listjenispaket = dat.data;
			});

			IPSRSService.getFieldListData("JenisTransaksi&select=id,namaExternal", true).then(function (dat) {
				$scope.listjenistransaksi = dat.data;
			});
		}
	]);
});
