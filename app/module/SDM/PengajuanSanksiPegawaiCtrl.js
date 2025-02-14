define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengajuanSanksiPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ManageSdm','DateHelper',
		function($q, $rootScope, $scope, ManageSdm, DateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.tanggalUsulan = new Date();



			ManageSdm.getItem("sdm/get-login-user-musare", true).then(function(dat){
				$scope.ruanganId = dat.data.data.idRuangan;
				load();
				init();
			});
			var load = function () {
				ManageSdm.getItem("sdm/get-load-pengajuan-sanksi?ruanganId="+$scope.ruanganId , true).then(function(dat){
					$scope.listnamaPengusul = dat.data.data.listNamaPegusul;
					$scope.listnamaPegawai = dat.data.data.listPegawai;
					$scope.item.noUsulan = dat.data.data.noUsulan;
					//debugger;
					$scope.listjenisHukuman = dat.data.data.jenisHukuman;
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
				ManageSdm.getItem("sdm/get-list-pengajuan-sanksi?id="+ruanganId, true).then(function(dat){
					$scope.dataResignPegawai = dat.data.data.listData;
					$scope.dataResignPegawai.forEach(function(data){
						var date = new Date(data.tglRencanaKeluar);
						var date2 = new Date(data.tglRekam);
						data.tglRencanaKeluar = DateHelper.getTanggalFormattedNew(date);
						data.tglRekam = DateHelper.getTanggalFormattedNew(date2);
					});
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataResignPegawai,
						autoSync: true	
					});
				});
			}

			$scope.Save = function () {
				var tglPlanning = DateHelper.getTanggalFormattedNew($scope.item.tanggalUsulan);
				var data = {
					"noPlanning": $scope.item.noUsulan,
					"tglPlanning": tglPlanning,
					"deskripsiMutasiSanksiResignPlan": $scope.item.deskripsiUsulan,
					"keteranganLainya": $scope.item.keterangan,
					"pegawai": {
						"id": $scope.item.namaPegawai.id
					},
					"ruanganBefore": {
						"id": $scope.item.runganBekerjaId
					},
					"jabatanFungsionalBefore": {
						"id": $scope.item.jabatanFungsionalId
					},
					"jabatanInternalBefore": {
						"id": $scope.item.jabatanInternalId
					},
					"eselonBefore": {
						"id": $scope.item.eselonId
					},
					"pangkatBefore": {
						"id": $scope.item.pangkatId
					},
					"jenisHukumanPlan": {
						"id": $scope.item.jenisHukuman.id
					},
					"pengusul": {
						"id": $scope.item.namaPengusul.id
					}
				}
				ManageSdm.saveData(data,"sdm/save-pengajuan-sanksi").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					loadData();
				});
			}
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnPengajuanSanksiPegawai,
				scrollable:true
			};
			$scope.columnPengajuanSanksiPegawai = [
			{
				"field": "noUsulan",
				"title": "No Usulan",
				"width": "120px"
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
				"field": "jenisHukuman",
				"title": "Jenis Hukuman",
				"width": "120px"
			},
			{
				"field": "tanggalUsulan",
				"title": "Tanggal Usulan",
				"width": "120px"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
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