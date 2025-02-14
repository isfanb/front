define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPasienJatuhCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManagePhp',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, managePhp) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang = new Date();
			$scope.dataPasienSelected = {};

			$scope.isRouteLoading = false;
			var dataMenuSiklus = [];


			loadCombo();
			loadData();

			function loadCombo() {
				var chacePeriode = cacheHelper.get('cacheDaftarOrderGizi');
				if (chacePeriode != undefined) {

					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);
					$scope.item.tglpulang = new Date(arrPeriode[2]);
				} else {
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;
				}
				managePhp.getData("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
					$scope.listDepartemen = data.data.departemen;
					$scope.listKelompokPasien = data.data.kelompokpasien;
					$scope.listDokter = data.data.dokter;
					$scope.listDokter2 = data.data.dokter;
				})

			}
			$scope.getIsiComboRuangan = function () {
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}
			$scope.ClearSearch = function () {
				$scope.item = {};
				$scope.item.periodeAwal = $scope.now;
				$scope.item.periodeAkhir = $scope.now;

				$scope.SearchData();
			}

			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}
			$scope.formatTanggalNoTime = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY');
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.SearchData = function () {
				loadData()
			}
			function loadData() {

				$scope.isRouteLoading = true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg = ""
				if ($scope.item.noReg != undefined) {
					var reg = "&noreg=" + $scope.item.noReg
				}
				var rm = ""
				if ($scope.item.noRm != undefined) {
					var rm = "&norm=" + $scope.item.noRm
				}
				var nm = ""
				if ($scope.item.nama != undefined) {
					var nm = "&nama=" + $scope.item.nama
				}
				var ins = ""
				if ($scope.item.instalasi != undefined) {
					var ins = "&deptId=" + $scope.item.instalasi.id
				}
				var rg = ""
				if ($scope.item.ruangan != undefined) {
					var rg = "&ruangId=" + $scope.item.ruangan.id
				}

				var ket = ""
				if ($scope.item.keterangan != undefined) {
					ket = "&ket=" + $scope.item.keterangan
				}


				managePhp.getData("rensar/get-pasien-jatuh?" +
					"tglAwal=" + tglAwal +
					"&tglAkhir=" + tglAkhir +
					reg + rm + nm + ins + rg
					+ ket)
					.then(function (data) {
						$scope.isRouteLoading = false;
						var result = data.data.data
						for (var i = 0; i < result.length; i++) {
							result[i].no = i + 1
						}
						$scope.sourceGrid = new kendo.data.DataSource({
							data: result,
							pageSize: 10,
							total: result.length,
							serverPaging: true,
						});
						var chacePeriode = tglAwal + "~" + tglAkhir;
						cacheHelper.set('cacheDaftarOrderGizi', chacePeriode);
					});
				managePhp.postData2('rensar/post-kejadian-pasien-jatuh').then(function(res){

				})
			};

			$scope.columnGrid = [

				{
					"field": "no",
					"title": "No",
					"width": "20px",
				},
				{
					"field": "tglregistrasi",
					"title": "Tgl Registrasi",
					"width": "80px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
				},
				{
					"field": "noregistrasi",
					"title": "No Registrasi",
					"width": "100px"
				},

				{
					"field": "nocm",
					"title": "No RM",
					"width": "70px"
				},

				{
					"field": "namapasien",
					"title": "Nama Pasien",
					"width": "100px"
				},

				{
					"field": "namaruangan",
					"title": "Ruangan",
					"width": "100px"
				},
				{
					"field": "tgljatuh",
					"title": "Tgl Jatuh",
					"width": "100px",
					"template": "<span class='style-left'>{{formatTanggal('#: tgljatuh #')}}</span>"
				},

				{
					"field": "jumlah",
					"title": "Jumlah",
					"width": "50px"
				},

				{
					"field": "keterangan",
					"title": "Keterangan",
					"width": "100px"
				},

			];

			function hapusOrder(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				if (dataItem.nokirim != null) {
					toastr.error("Menu sudah dikirim tidak bisa dihapus");
					return;
				}
				var confirm = $mdDialog.confirm()
					.title('Peringatan')
					.textContent('Apakah anda yakin mau menghapus data ? ')
					.ariaLabel('Lucky day')
					.cancel('Tidak')
					.ok('Ya')
				$mdDialog.show(confirm).then(function () {

					var itemDelete = {
						"norec_op": dataItem.norec_op
					}
					manageServicePhp.deleteOrderPelayananGizi(itemDelete).then(function (e) {
						if (e.status === 201) {
							loadData();

						}
					})

				})

			}

			$scope.klikGrid = function (dataPasienSelected) {
				$scope.dataPasienSelected = dataPasienSelected
			}
			$scope.Edit = function () {
				if ($scope.dataPasienSelected == undefined) {
					toastr.error('Pilih data dulu')
					return
				}
				for (var i = 0; i < $scope.dataPasienSelected.details.length; i++) {
					if ($scope.dataPasienSelected.details[i].nokirim !== null) {
						var status = true
						break
					}
				}

				if (status) {
					toastr.error('Menu sudah dikirim, tidak bisa diedit')
					return
				}
				var cache = $scope.dataPasienSelected
				cacheHelper.set('cacheEditOrderGizi', cache);
				$state.go('EditOrderGizi')

			}

			// **** Kejadian pasien jatuh
			$scope.dialog = {
				tglJatuh: $scope.now
			}
			$scope.Edit = function () {
				selectData()
				$scope.dialogPasienJatuh.center().open()
			}
			$scope.Hapus = function () {
				selectData()
				$scope.simpanJatuh(false)
			}
			function selectData() {
				if (!$scope.dataPasienSelected) {
					toastr.error('Pilih data dulu')
					return
				}
				$scope.dialog.norec = $scope.dataPasienSelected.norec
				$scope.dialog.nocm = $scope.dataPasienSelected.nocm
				$scope.dialog.namapasien = $scope.dataPasienSelected.namapasien
				$scope.dialog.norec_pd = $scope.dataPasienSelected.norec_pd
				$scope.dialog.nocmfk = $scope.dataPasienSelected.nocmfk
				$scope.dialog.jumlah = parseFloat($scope.dataPasienSelected.jumlah)
				$scope.dialog.keterangan = $scope.dataPasienSelected.keterangan
				$scope.dialog.tglJatuh = $scope.dataPasienSelected.tgljatuh

			}
			$scope.simpanJatuh = function (data) {
				var statusenabled = true
				if (data == false)
					statusenabled = false
				var objsave = {
					"norec": $scope.dialog.norec,
					"statusenabled": statusenabled,
					"nocmfk": $scope.dialog.nocmfk,
					"noregistrasifk": $scope.dialog.norec_pd,
					"jumlah": $scope.dialog.jumlah != undefined ? $scope.dialog.jumlah : 0,
					"tgljatuh": moment($scope.dialog.tglJatuh).format('YYYY-MM-DD HH:mm'),
					"keterangan": $scope.dialog.keterangan != undefined ? data.keterangan : '-',
				}
				managePhp.postData2('rensar/save-pasien-jatuh', objsave).then(function (e) {
					$scope.dialog = {}
					loadData()
				})
			}
			$scope.Tambah = function(){
				$state.go('DaftarAntrianSusterRanap')
			}

			/*END */


		}
	]);
});