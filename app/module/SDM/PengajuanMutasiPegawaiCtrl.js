define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengajuanMutasiPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ManageSdm', 'DateHelper', 'ModelItem',
		function($q, $rootScope, $scope, ManageSdm, DateHelper, ModelItem) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.item.tanggalUsulan = new Date();
			
			ManageSdm.getItem("sdm/get-login-user-musare", true).then(function(dat){
				$scope.ruanganId = dat.data.data.idRuangan;
				loadData();
				init();
			});

			var loadData = function () {
				var asdasdasd = $scope.ruanganId;
				ManageSdm.getItem("sdm/get-load-pengajuan-mutasi?ruanganId="+asdasdasd , true).then(function(dat){
					$scope.listjabatanFungsionalPlan = dat.data.data.listJabatanFungsional;
					$scope.listjabatanInternalPlan = dat.data.data.listJabatanInternal;
					$scope.listruanganMutasi = dat.data.data.listRuanganMutasi;
					$scope.listeselonPlan = dat.data.data.listEselon;
					$scope.listnamaPengusul = dat.data.data.listNamaPegusul;
					$scope.listpangkatPlan = dat.data.data.listPangkat;
					$scope.listnamaPegawai = dat.data.data.listPegawai;
					$scope.item.noUsulan = dat.data.data.noUsulan;
					//debugger;listJabatanInternal
				});
			}
			$scope.getDataPegawai = function () {
				var idPegawai = $scope.item.namaPegawai.id;
				ManageSdm.getItem("sdm/get-data-by-pegawai?id="+idPegawai, true).then(function(dat){
					$scope.dataPegawai = dat.data.data;
					$scope.item.jabatanFungsional = $scope.dataPegawai.jabatanFungsional;
					$scope.item.jabatanFungsionalId = $scope.dataPegawai.jabatanFungsionalId;
					$scope.item.jabatanInternal = $scope.dataPegawai.jabatanInternal;
					$scope.item.jabatanInternalId = $scope.dataPegawai.jabatanInternalId;
					$scope.item.ruanganBekerja = $scope.dataPegawai.namaRuangan;
					$scope.item.runganBekerjaId = $scope.dataPegawai.ruanganId;
					$scope.item.eselon = $scope.dataPegawai.eselon;
					$scope.item.eselonId = $scope.dataPegawai.eselonId;
					$scope.item.pangkat = $scope.dataPegawai.namaPangkat;
					$scope.item.pangkatId = $scope.dataPegawai.pangkatId;
					
				});
			}
			var init = function () {
				var ruanganId = $scope.ruanganId;
				ManageSdm.getItem("sdm/get-list-pengajuan-mutasi?id="+ruanganId, true).then(function(dat){
					$scope.dataMutasiPegawai = dat.data.data.listData;
					$scope.dataMutasiPegawai.forEach(function(data){
						var date1 = new Date(data.tglUsulan);
						data.tglUsulan = DateHelper.getTanggalFormattedNew(date1);
					});
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMutasiPegawai,
						autoSync: true
					});
				});
			}


			var fungsiRuangan = function (ruanganId) {
				debugger;
				if ($scope.item.ruanganMutasi == undefined){
					ruanganId = 0
				} else {
					ruanganId = $scope.item.ruanganMutasi.id
				}
				return ruanganId;
			}
			var fungsiJabatanFungsional = function (jabatanFungsionalId) {
				if ($scope.item.jabatanFungsionalPlan == undefined){
					jabatanFungsionalId = 0
				} else {
					jabatanFungsionalId = $scope.item.jabatanFungsionalPlan.id
				}
				return jabatanFungsionalId;
			}
			var fungsiJabatanInternal = function (jabatanInternalId) {
				if ($scope.item.jabatanInternalPlan == undefined){
					jabatanInternalId = 0
				} else {
					jabatanInternalId = $scope.item.jabatanInternalPlan.id
				}
				return jabatanInternalId;
			}
			var fungsiEselon = function (eselonId) {
				if ($scope.item.eselonPlan == undefined){
					eselonId = 0
				} else {
					eselonId = $scope.item.eselonPlan.id
				}
				return eselonId;
			}
			var fungsiPangkat = function (pangkatId) {
				if ($scope.item.pangkatPlan == undefined){
					pangkatId = 0
				} else {
					pangkatId = $scope.item.pangkatPlan.id
				}
				return pangkatId;
			}
			var fungsiJabatanInternalBefore = function (jabatanInternalBefore) {
				debugger;
				if ($scope.item.jabatanInternalId == null){
					jabatanInternalBefore = 0
				} else {
					jabatanInternalBefore = $scope.item.jabatanInternalId
				}
				return jabatanInternalBefore;
			}

			var fungisJabatanFungsionalBefore = function (jabatanFungsionalBefore) {
				debugger;
				if ($scope.item.jabatanFungsionalId == null){
					jabatanFungsionalBefore = 0
				} else {
					jabatanFungsionalBefore = $scope.item.jabatanFungsionalId
				}
				return jabatanFungsionalBefore;
			}

			var fungsiEselonBefore = function (eselonBefore) {
				debugger;
				if ($scope.item.eselonId == null){
					eselonBefore = 0
				} else {
					eselonBefore = $scope.item.eselonId
				}
				return eselonBefore;
			}

			var fungsiPangkatBefore = function (pangkatBefore) {
				debugger;
				if ($scope.item.pangkatId == null){
					pangkatBefore = 0
				} else {
					pangkatBefore = $scope.item.pangkatId
				}
				return pangkatBefore;
			}

			$scope.Save = function () {
				debugger;
				var listRawRequired = [
				"item.tanggalUsulan|k-ng-model|Tanggal Pengajuan",
				"item.namaPengusul|k-ng-model|Nama Pengusul"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tanggalUsulan);
				if(isValid.status){
					var data = {
						"noPlanning": $scope.item.noUsulan,
						"tglPlanning": tanggal,
						"deskripsiMutasiSanksiResignPlan": $scope.item.deskripsiUsulan,
						"pegawai": {
							"id": $scope.item.namaPegawai.id
						},
						"ruanganBefore": {
							"id": $scope.item.runganBekerjaId
						},
						"ruanganPlan": {
							"id": fungsiRuangan()
						},
						"jabatanFungsionalBefore": {
							"id": fungisJabatanFungsionalBefore()
						},
						"jabatanFungsionalPlan": {
							"id": fungsiJabatanFungsional()
						},
						"jabatanInternalBefore": {
							"id": fungsiJabatanInternalBefore()
						},
						"jabatanInternalPlan": {
							"id": fungsiJabatanInternal()
						},
						"eselonBefore": {
							"id": fungsiEselonBefore()
						},
						"eselonPlan": {
							"id": fungsiEselon()
						},
						"pangkatBefore": {
							"id": fungsiPangkatBefore()
						},
						"pangkatPlan": {
							"id": fungsiPangkat()
						},
						"pengusul": {
							"id": $scope.item.namaPengusul.id
						}
					}
					ManageSdm.saveData(data,"sdm/save-pengajuan-mutasi").then(function(e) {
						console.log(JSON.stringify(e.data));
						init();
						loadData();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
				
				
			}

			
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnPengajuanMutasiPegawai,
				scrollable:true
			};
			$scope.columnPengajuanMutasiPegawai = [
			{
				"field": "noUsulan",
				"title": "No Usulan"
			},
			{
				"field": "deskripsiUsulan",
				"title": "Deskripsi Usulan",
				"width": "120px"
			},
			{
				"field": "namaPegawai",
				"title": "Nama Pegawai",
				"width": "120px"
			},
			{
				"field": "jabatanFungsional",
				"title": "Jabatan Fungsional",
				"width": "150px"
			},
			{
				"field": "jabatanInternal",
				"title": "Jabatan Internal",
				"width": "120px"
			},
			{
				"field": "ruanganBekerja",
				"title": "Ruangan Bekerja",
				"width": "120px"
			},
			{
				"field": "eselon",
				"title": "Eselon",
				"width": "120px"
			},
			{
				"field": "pangkat",
				"title": "Pangkat",
				"width": "120px"
			},
			{
				"field": "tglUsulan",
				"title": "Tanggal Usulan",
				"width": "120px"
			},
			{
				"field": "jabatanFungsionalPlan",
				"title": "Jabatan Fungsional Plan",
				"width": "170px"
			},
			{
				"field": "jabatanInternalPlan",
				"title": "Jabatan Internal Plan",
				"width": "170px"
			},
			{
				"field": "ruanganMutasi",
				"title": "Ruangan Mutasi",
				"width": "120px"
			},
			{
				"field": "eselonPlan",
				"title": "Eselon Plan",
				"width": "120px"
			},
			{
				"field": "pangkatPlan",
				"title": "Pangkat Plan",
				"width": "120px"
			},
			{
				"field": "namaPengusul",
				"title": "Nama Pengusul",
				"width": "120px"
			}
			];
		}

		]);
});