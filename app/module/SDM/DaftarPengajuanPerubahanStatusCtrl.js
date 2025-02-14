define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanPerubahanStatusCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$state', '$timeout', '$mdDialog',
		function ($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $state, $timeout, $mdDialog) {
			var cekDataCuti = JSON.parse(localStorage.getItem('permohonanCutiPegawai'));
			if (cekDataCuti) {
				localStorage.removeItem('permohonanCutiPegawai');
			}
			$scope.listStatusPermohonan = [
				{ id: 0, name: "Belum diputuskan" },
				// {id:1, name: "Disetujui"},
				{ id: 2, name: "Ditolak" },
				{ id: 3, name: "Ditangguhkan" },
			]
			$scope.listStatusCutiLuarNegeri = [
				{ id: 1, name: "Ya" },
				{ id: 0, name: "Tidak" },
			]
			$scope.listStatusCutiLuarKota = [
				{ id: 1, name: "Ya" },
				{ id: 0, name: "Tidak" },
			]
			$scope.item = {};
			$scope.filter = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.isRouteLoading = true;
			$scope.disKeputusan = true;
			$scope.disUnverif = true;
			$scope.yearSelected = {
				format: "MMMM yyyy",
				start: "year",
				depth: "year"
			};
			$scope.mainGridOptions = {
				// pageable: true,
				toolbar: [
					{ text: "export", name: "Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' }
				],
				excel: {
					allPages: true,
					margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
					scale: 0.8,
					fileName: "RSAB HK Export Daftar Pengajuan Perubahan Status - " + DateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
				},
				excelExport: function (e) {
					var columns = e.workbook.sheets[0].columns;
					columns.forEach(function (column) {
						delete column.width;
						column.autoWidth = true;
					});
				},
				columns: [
					{ "field": "noPlanning", "title": "No Usulan", width: 100 },
					{ "field": "namaPegawai", "title": "Nama Pegawai" },
					{ "field": "nip", "title": "NIP" },
					// {"field": "namaJabatan","title": "Jabatan"},
					// {"field": "unitKerja","title": "Ruangan Bekerja"},
					{ "field": "deskripsiStatusPegawaiPlan", "title": "Deskripsi Usulan" },
					{ "title": "Usulan", "columns": [{ "field": "tglPengajuan", "title": "Tanggal", "template": "#= kendo.toString(kendo.parseDate(new Date(tglPengajuan)),'dd-MM-yyyy') #", width: 100 }, { "field": "statusPegawai", "title": "Status", width: 100 }] },
					{ "field": "lisTanggal", "title": "Tanggal Permohonan", "template": "# for(var i=0; i < lisTanggal.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\">#= kendo.toString(new Date(lisTanggal[i].tgl), \"dd-MM-yyyy\") #</button> #}#" },
					// {"field": "tglAwalPlan","title": "Tanggal Awal","template": "#= kendo.toString(kendo.parseDate(new Date(tglAwalPlan)),'dd-MM-yyyy') #"},
					// {"field": "tglAkhirPlan","title": "Tanggal Akhir","template": "#= kendo.toString(kendo.parseDate(new Date(tglAkhirPlan)),'dd-MM-yyyy') #"},
					{
						"title": "Keputusan", "columns": [{ "field": "tglKeputusan", "title": "Tanggal", "template": "# if(tglKeputusan===null){# - #} else {# #: kendo.toString(kendo.parseDate(new Date(tglKeputusan)),'dd-MM-yyyy') # #}#", width: 100 },
						{ "field": "approvalStatus", "title": "Status", "template": "#if(approvalStatus===0){# Belum diputuskan #} else if(approvalStatus===1) {# Disetujui #} else if(approvalStatus===2) {# Ditolak #} else {# Ditangguhkan #}#", width: 100 }]
					},
					{ "field": "isCutiLuarNegeri", "title": "Cuti<br/>Luar<br/>Negeri", "template": "#if(isCutiLuarNegeri==false){# Tidak #} else if(isCutiLuarNegeri==true) {# Ya #} else {# Tidak #}#", width: 75 },
					{ "field": "isCutiLuarKota", "title": "Cuti<br/>Luar Kota", "template": "#if(isCutiLuarKota==false){# Tidak #} else if(isCutiLuarKota==true) {# Ya #} else {# Tidak #}#", width: 75 },
					{ command: [{ text: "Keputusan", click: setKeputusan, imageClass: "k-icon k-i-pencil" }, { text: "Unverif", click: setUnverifikasi, imageClass: "k-icon k-i-cancel" }, { text: "Delete", click: confirmDelete, imageClass: "k-icon k-i-close" }], width: 180 }
				],
				scrollable: true
			};

			// $scope.dataSource = new kendo.data.DataSource({
			// 	pageSize: 15,
			// 	data: [],
			// 	sort: { field: "approvalStatus", dir: "asc" }
			// });

			$scope.exportDetail = function (e) {
				var tempDataExport = [];
				var rows = [{
					cells: [
						{ value: "Nama Pegawai" },
						{ value: "NIP" },
						{ value: "No Usulan" },
						{ value: "Deskripsi Usulan" },
						{ value: "Tanggal Usulan" },
						{ value: "Status Usulan" },
						{ value: "Tanggal Permohonan" }
					]
				}];
				tempDataExport = $scope.daftarPengajuan;
				tempDataExport.fetch(function () {
					var data = this.data();
					for (var i = 0; i < data.length; i++) {
						var listTglPengajuan = "";
						for (var j = 0; j < data[i].lisTanggal.length; j++) {
							if (j === data[i].lisTanggal.length - 1) {
								listTglPengajuan = listTglPengajuan + DateHelper.formatDate(data[i].lisTanggal[j].tgl, 'DD-MM-YYYY')
							} else {
								listTglPengajuan = listTglPengajuan + DateHelper.formatDate(data[i].lisTanggal[j].tgl, 'DD-MM-YYYY') + ", "
							}
						};
						rows.push({
							cells: [
								{ value: data[i].namaPegawai },
								{ value: data[i].nip },
								{ value: data[i].noPlanning },
								{ value: data[i].deskripsiStatusPegawaiPlan },
								{ value: DateHelper.formatDate(data[i].tglPengajuan, 'DD-MM-YYYY') },
								{ value: data[i].statusPegawai },
								{ value: listTglPengajuan }
							]
						})
					};
					var workbook = new kendo.ooxml.Workbook({
						sheets: [
							{
								freezePane: {
									rowSplit: 1
								},
								frozenRows: 1,
								filter: { from: 0, to: 6 },
								columns: [
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true }
								],
								title: "Daftar Pengajuan",
								rows: rows
							}
						]
					});
					kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "RSAB HK Export Daftar Pengajuan Perubahan Status - " + DateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx" });
				})
			}

			$scope.loadGrid = function (page) {
				var pegawaiLogin;
				$scope.isRouteLoading = true;

				$scope.rows;
				$scope.namaPegawai;
				$scope.tglPermohonan;
				$scope.jenisPermohonan;
				$scope.statusPermohonan;
				$scope.isCutiLuarNegeri;
				$scope.isCutiLuarKota;
				$scope.page;
				$scope.statusRowsFilterChanged;

				if ($scope.filter.rows == undefined) {
					$scope.rows = 5;
					$scope.statusRowsFilterChanged = true;
				} else {
					if ($scope.rows != $scope.filter.rows) {
						$scope.statusRowsFilterChanged = true;

					} else {
						$scope.statusRowsFilterChanged = false;
					}
					$scope.rows = $scope.filter.rows;
				}

				if (page == undefined) {
					$scope.page = 1;
				} else {
					$scope.page = page;
				}

				if ($scope.filter.tglPermohonan == undefined) {
					$scope.tglPermohonan = "";
				} else {
					$scope.tglPermohonan = DateHelper.formatDate($scope.filter.tglPermohonan, "YYYY-MM");
				}

				if ($scope.filter.namaPegawai == undefined) {
					$scope.namaPegawai = "";
				} else {
					$scope.namaPegawai = $scope.filter.namaPegawai;
				}

				if ($scope.filter.statusPegawai == undefined) {
					$scope.jenisPermohonan = "";
				} else {
					$scope.jenisPermohonan = $scope.filter.statusPegawai;
				}

				if ($scope.filter.status == undefined) {
					$scope.statusPermohonan = "";
				} else {
					$scope.statusPermohonan = $scope.filter.status.id;
				}

				if ($scope.filter.cutiLuarNegeri == undefined) {
					$scope.isCutiLuarNegeri = "";
				} else {
					$scope.isCutiLuarNegeri = $scope.filter.cutiLuarNegeri.id == 1 ? true : false;
				}

				if ($scope.filter.cutiLuarKota == undefined) {
					$scope.isCutiLuarKota = "";
				} else {
					$scope.isCutiLuarKota = $scope.filter.cutiLuarKota.id == 1 ? true : false;
				}

				// if (localStorage.getItem('isBack')=="Y"){
				// 	var permohonanCutiPegawai = JSON.parse(localStorage.getItem('permohonanCutiPegawai'));
				// 	var noRec=permohonanCutiPegawai.noRec;
				// 	var dataFromStorage=JSON.parse(localStorage.getItem('AllDataPermohonanCutiPegawai'));
				// 	ManageSdmNew.getListData("sdm/get-list-approval-status-paging?idPegawai=" + pegawaiLogin.idPegawai + "&noRec=" + noRec + "&take=" + $scope.rows + "&page=" + $scope.page + "&nama=" + $scope.namaPegawai + "&jenisPermohonan=" + $scope.jenisPermohonan + "&statusPermohonan=" + $scope.statusPermohonan).then(function(e){ 
				// 		filteredData = dataFromStorage.filter(e.data.data.listData.noRec!=noRec);
				// 		filteredData.push(e.data.data.listData);
				// 	})
				// 	var grid = $("#gridPerubahanStatus").data("kendoGrid"), filteredData2;
				// 	filteredData2 = filteredData.filter(filterByStatus);
				// 	var dataSource = new kendo.data.DataSource({
				// 				pageSize: 20,
				// 				data: filteredData2,
				// 				sort: { field: "approvalStatus", dir: "asc" }
				// 			});
				// 	$scope.isRouteLoading = false;
				// 			grid.setDataSource(dataSource);
				// 			grid.dataSource.read();
				// 	localStorage.setItem('isBack','')
				// 	return;
				// }

				// ManageSdm.findPegawaiById(ModelItem.getPegawai().id).then(function(result){
				ManageSdmNew.getListData("pegawai/find-pegawai-by-id-custom/" + ModelItem.getPegawai().id).then(function (result) {
					pegawaiLogin = result.data.data;
				}).then(function () {
					var grid = $("#gridPerubahanStatus").data("kendoGrid"), filteredData;
					if (pegawaiLogin.idSubUnitKerja === 26 || pegawaiLogin.idJabatanInternal === 633 || pegawaiLogin.idJabatanInternal === 1139) {
						$scope.isLoginKesja = true; // login bukan sdm, button verif & unverif disable

						// ManageSdmNew.getListData("sdm/get-list-approval-status?idPegawai=").then(function(e){ // get all permohonan status
						ManageSdmNew.getListData("sdm/get-list-approval-status-paging?idPegawai=" + "&take=" + $scope.rows + "&page=" + $scope.page + "&nama=" + $scope.namaPegawai + "&jenisPermohonan=" + $scope.jenisPermohonan + "&statusPermohonan=" + $scope.statusPermohonan + "&tglPermohonan=" + $scope.tglPermohonan + "&isCutiLuarNegeri=" + $scope.isCutiLuarNegeri  + "&isCutiLuarKota=" + $scope.isCutiLuarKota).then(function (e) {
							//Data yang masuk kesini sudah dipaging di server
							if (e.data.data.listData != undefined) {
								filteredData = e.data.data.listData.filter(filterByStatus);

								//Untuk tombol halaman
								// if ($scope.statusRowsFilterChanged == true) {
								$scope.pages = []
								var i;
								$scope.totalPages = e.data.data.totalPages;
								for (i = $scope.page; i <= $scope.page+4; i++) {
									if (i <= $scope.totalPages) {
										$scope.pages.push({
											pageNumber: i,
											value: i
										})
									}
								}
								// }
								$scope.filter.rows = e.data.data.listData.length;
							}
							$scope.daftarPengajuan = new kendo.data.DataSource({
								pageSize: 20,
								data: filteredData,
								sort: { field: "approvalStatus", dir: "asc" }
							});
							$scope.isRouteLoading = false;
							grid.setDataSource($scope.daftarPengajuan);
							grid.dataSource.read();
							// localStorage.setItem('AllDataPermohonanCutiPegawai', JSON.stringify(filteredData));
						});
					} else {
						$scope.isLoginKesja = false; // login sdm, button verif & unverif enable

						// ManageSdmNew.getListData("sdm/get-list-approval-status?idPegawai=" + pegawaiLogin.idPegawai).then(function(e){ // get permohonan status by user login
						ManageSdmNew.getListData("sdm/get-list-approval-status-paging?idPegawai=" + pegawaiLogin.idPegawai + "&take=" + $scope.rows + "&page=" + $scope.page + "&nama=" + $scope.namaPegawai + "&jenisPermohonan=" + $scope.jenisPermohonan + "&statusPermohonan=" + $scope.statusPermohonan + "&isCutiLuarNegeri=" + $scope.isCutiLuarNegeri + "&isCutiLuarKota=" + $scope.isCutiLuarKota).then(function (e) {
							//Data yang masuk kesini sudah dipaging di server
							if (e.data.data.listData != undefined) {
								filteredData = e.data.data.listData.filter(filterByStatus);

								// if ($scope.statusRowsFilterChanged == true) {
								$scope.pages = []
								//Untuk tombol halaman
								var i;
								$scope.totalPages = e.data.data.totalPages;
								for (i = $scope.page; i <= $scope.page+4; i++) {
									if (i <= $scope.totalPages) {
										$scope.pages.push({
											pageNumber: i,
											value: i
										})
									}
								}
								// }

								$scope.filter.rows = e.data.data.listData.length;
							}
							$scope.daftarPengajuan = new kendo.data.DataSource({
								pageSize: 20,
								data: filteredData,
								sort: { field: "approvalStatus", dir: "asc" }
							});
							$scope.isRouteLoading = false;
							grid.setDataSource($scope.daftarPengajuan);
							grid.dataSource.read();
							// localStorage.setItem('AllDataPermohonanCutiPegawai', JSON.stringify(filteredData));
						});
					}
				});
			}

			$scope.filter.rows = 5;
			$scope.totalPages = 0;

			// $scope.pages = [
			// 			    {pageNumber:1, value:1},
			// 			    {pageNumber:2, value:2},
			// 			    {pageNumber:3, value:3},
			// 			    {pageNumber:4, value:4},
			// 			    {pageNumber:5, value:5},
			// 						];

			$scope.next = function () {
				var i = 0;
				var pageNumberInLastIndex;
				pageNumberInLastIndex = $scope.pages[$scope.pages.length - 1].pageNumber;

				if (pageNumberInLastIndex < $scope.totalPages) {
					$scope.pages = [];
					for (i = pageNumberInLastIndex + 1; i < pageNumberInLastIndex + 6; i++) {
						if (i <= $scope.totalPages) {
							$scope.pages.push({
								pageNumber: i,
								value: i
							})
						}
					}
				}
			}

			$scope.back = function () {
				var i = 0;
				var pageNumberInFirstIndex;
				pageNumberInFirstIndex = $scope.pages[0].pageNumber;

				if (pageNumberInFirstIndex > 1) {
					$scope.pages = [];
					for (i = (pageNumberInFirstIndex - 1) - 4; i <= pageNumberInFirstIndex - 1; i++) {
						if (i > 0) {
							$scope.pages.push({
								pageNumber: i,
								value: i
							})
						}
					}
				}
			}

			$q.all([
				// ModelItem.getPegawai(),
				// ManageSdm.findPegawaiById(ModelItem.getPegawai().id),
				ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true),
				// ManageSdm.getItem("sdm/get-list-approval-status?namaPegawai=", true)
			]).then(function (result) {
				if (result[0].statResponse) $scope.listPegawai = result[0].data;
				$scope.loadGrid();
			}, function (error) {
				// $scope.isRouteLoading = false;
			}).then(function () {
				// $scope.isRouteLoading = false;
			});
			function filterByStatus(item) {
				if (item.approvalStatus !== 1 && item.approvalStatus !== 3) {
					return true;
				}
				// invalidEntries++;
				return false;
			}

			// $scope.Cari = function () {
			// 	$scope.isRouteLoading = true;
			// 	$scope.dataSource.data([]);
			// 	ManageSdm.getItem("sdm/get-list-approval-status?namaPegawai="+$scope.item.pencarianNamaPegawai.namaLengkap, true).then(function(dat){
			// 		if(dat.data.data.listData){
			// 			$scope.dataSource.data(dat.data.data.listData);
			// 		} else {
			// 			messageContainer.log('Data tidak di temukan');
			// 		}
			// 		$scope.isRouteLoading = false;
			// 	}, function(error){
			// 		$scope.isRouteLoading = false;
			// 	});
			// };

			$scope.click = function (current) {
				for (var key in current) {
					if (current.hasOwnProperty(key)) {
						if (key.indexOf('tgl') >= 0) {
							if (typeof current[key] === 'object') {
								current[key] = DateHelper.getTanggalFormattedNew(new Date(current[key]));
							}
						}
						if (key.indexOf('approvalStatus') >= 0) {
							if (current[key] === 0 && $scope.isLoginKesja) {
								$scope.disKeputusan = false;
								$scope.disUnverif = false;
							} else {
								$scope.disKeputusan = true;
								$scope.disUnverif = true;
							}
						}
					}
				}
				$scope.current = current;
			};

			// $scope.keputusan = function(current){
			// 	if(current){
			// 		localStorage.setItem('permohonanCutiPegawai', JSON.stringify(current));
			// 		$state.go("VerifikasiPengajuanPerubahanStatus", {
			// 			namaPegawai: current.namaPegawai,
			// 			noPlanning: current.noPlanning,
			// 			nip: current.nip
			// 		});
			// 	} else {
			// 		toastr.warning("Data belum di pilih");
			// 		return;
			// 	}
			// };

			function setKeputusan(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				localStorage.setItem('permohonanCutiPegawai', JSON.stringify(dataItem));
				$state.go("VerifikasiPengajuanPerubahanStatus", {
					namaPegawai: dataItem.namaPegawai,
					noPlanning: dataItem.noPlanning,
					nip: dataItem.nip
				});
			}

			// $scope.unverifikasi = function (current) {
			// 	if(current){
			// 		var data = {
			// 			"noRec": current.noRec
			// 		}
			// 		ManageSdm.saveData(data,"sdm/unverif-permohonan-status").then(function(e) {
			// 			// console.log(JSON.stringify(e.data));
			// 			loadGrid();
			// 		});
			// 	} else {
			// 		toastr.warning("Data belum di pilih");
			// 		return;
			// 	}
			// };

			var timeoutPromise;
			$scope.$watch('filter.namaPegawai', function (newVal, oldVal) {
				if (!newVal) return;
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						// applyFilter("namaPegawai", newVal)
						$scope.loadGrid();
					}
				}, 1000);
			});

			$scope.$watch('filter.statusPegawai', function (newVal, oldVal) {
				if (!newVal) return;
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						// applyFilter("statusPegawai", newVal)
						$scope.loadGrid();
					}
				}, 1000);
			});

			$scope.$watch('filter.tglPermohonan', function (newVal, oldVal) {
				if (!newVal) return;
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						// applyFilter("namaPegawai", newVal)
						$scope.loadGrid();
					}
				}, 1000);
			});

			$scope.$watch('filter.status', function (newVal, oldVal) {
				if (!newVal) return;
				if (newVal && newVal !== oldVal) {
					// applyFilter("approvalStatus", newVal.id)
					$scope.loadGrid();
				}
			})

			$scope.$watch('filter.cutiLuarNegeri', function (newVal, oldVal) {
				if (!newVal) return;
				if (newVal && newVal !== oldVal) {
					// applyFilter("approvalStatus", newVal.id)
					$scope.loadGrid();
				}
			})

			$scope.$watch('filter.cutiLuarKota', function (newVal, oldVal) {
				if (!newVal) return;
				if (newVal && newVal !== oldVal) {
					// applyFilter("approvalStatus", newVal.id)
					$scope.loadGrid();
				}
			})

			function applyFilter(filterField, filterValue) {
				var dataGrid = $("#gridPerubahanStatus").data("kendoGrid");
				var currFilterObject = dataGrid.dataSource.filter();
				var currentFilters = currFilterObject ? currFilterObject.filters : [];

				if (currentFilters && currentFilters.length > 0) {
					for (var i = 0; i < currentFilters.length; i++) {
						if (currentFilters[i].field == filterField) {
							currentFilters.splice(i, 1);
							break;
						}
					}
				}
				if (filterField.indexOf("approvalStatus") >= 0) {
					currentFilters.push({
						field: filterField,
						operator: "eq",
						value: filterValue
					});
				} else {
					currentFilters.push({
						field: filterField,
						operator: "contains",
						value: filterValue
					});
				}
				dataGrid.dataSource.filter({
					logic: "and",
					filters: currentFilters
				});
			}

			$scope.resetFilters = function () {
				var dataGrid = $("#gridPerubahanStatus").data("kendoGrid");
				dataGrid.dataSource.filter({});
				$scope.filter = {};
				$scope.filter.rows = 5;
			}

			function setUnverifikasi(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				var data = {
					noRec: dataItem.noRec
				};
				// ManageSdm.saveData(data,"sdm/unverif-permohonan-status").then(function(e) {
				ManageSdmNew.saveData(data, "sdm/unverif-permohonan-status").then(function (e) {
					// console.log(JSON.stringify(e.data));
					$scope.loadGrid();
				});
			}

			function confirmDelete(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				console.log(dataItem);
				var confirm = $mdDialog.confirm()
					.title('Apakah anda yakin akan menghapus data pengajuan a.n ' + dataItem.namaPegawai)
					.textContent(`Anda akan menghapus data ini secara permanen`)
					.ariaLabel('Lucky day')
					.targetEvent(e)
					.ok('Ya')
					.cancel('Tidak');
				$mdDialog.show(confirm).then(function () {
					deleteRecord(dataItem.noRec);
					console.warn('Masuk sini pak eko');
				}, function () {
					console.error('Tidak jadi hapus');
				});
			}

			function deleteRecord(noRec) {
				ManageSdmNew.deleteTransactionData("sdm/delete-pegawai-status/?noRec=", noRec).then(function () {
					// reload dataSource
					$scope.filter = {};
					$scope.loadGrid();
				});
			}
		}
	]);
});