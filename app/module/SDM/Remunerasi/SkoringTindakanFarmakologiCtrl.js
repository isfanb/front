define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkoringTindakanFarmakologiCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.isEdit = false;
            $scope.isVerifStaf = false
            $scope.isDuplicated = false

            var userLogin = JSON.parse(localStorage.getItem('datauserlogin'));
            var pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            $scope.listStatusVerif = [{
                id: 0,
                statusVerif: "Belum Verifikasi"
            }, {
                id: 1,
                statusVerif: "Terverifikasi"
            }]

            $('#idSkor').on('change, keyup', function () {
                var currentInput = $(this).val();
                var fixedInput = currentInput.replace(/[^\d.-]/g, '');
                $(this).val(fixedInput);
            });

            $scope.optGridSkoringTindakan = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="tambahData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }, {
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="exportToExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "namaProduk",
                    title: "<h3>Produk</h3>",
                    width: 150
                }, {
                    field: "jenisProduk",
                    title: "<h3>Jenis Produk</h3>",
                    width: 100
                }, {
                    field: "skor",
                    title: "<h3>Skor</h3>",
                    width: 25,
                    attributes: {
                        style: "text-align: right"
                    }
                }, {
                    field: "tglMulaiBerlaku",
                    title: "<h3>Tanggal Berlaku</h3>",
                    width: 50
                }, {
                    field: "stVerif",
                    title: "<h3>Status</h3>",
                    width: 50
                }, {
                    command: [{
                        text: "Edit",
                        click: editData,
                        imageClass: "k-icon k-i-pencil"
                    }, {
                        text: "Hapus",
                        click: hapusData,
                        imageClass: "k-icon k-i-cancel"
                    }],
                    title: "",
                    width: 100
                }],
            };

            $scope.exportToExcel = () => {
                var tempDataExport = [];
                var rows = [
                    {
                        cells: [
                            { value: "Produk" },
                            { value: "Skor" },
                            { value: "Tanggal Berlaku" },
                            { value: "Status" }
                        ]
                    }
                ];

                tempDataExport = $scope.dataSourceSkoring;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].namaProduk },
                                { value: data[i].skor },
                                { value: data[i].tglMulaiBerlaku },
                                { value: data[i].stVerif }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                // title: "Skoring Tindakan Farmakologi " + pegawaiLogin.nama,
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "skoring-tindakan-farmakologi " + pegawaiLogin.nama + ".xlsx" });
                });

            }
            $scope.getAllData = () => {
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("iki-remunerasi/get-all-skoring-tindakan-farmakologi?"
                    + "namaProduk=" + ($scope.item.srcNamaProduk ? $scope.item.srcNamaProduk : "")
                    + "&isVerif=" + ($scope.item.srcStatusVerif ? ($scope.item.srcStatusVerif.id == 1 ? true : false) : "")
                ).then((res) => {
                    $scope.dataSourceSkoring = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    });
                    $scope.isRouteLoading = false;
                }, function (error) {
                    $scope.isRouteLoading = false;
                })

                ManageSdmNew.getListData("service/list-generic/?view=ProdukFarmakologi&"
                    + "select=id,namaProduk&criteria=statusEnabled&values=true&order=namaProduk:asc").then(res => {
                        $scope.listNamaProduk = res.data;
                        $scope.isRouteLoading = false;
                    }, function (error) {
                        $scope.isRouteLoading = false;
                    })
            }

            let init = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-akses-skoring-tindakan-farmakologi?pegawaiId=" + pegawaiLogin.id).then((res) => {
                    var listUK = ""
                    if (!_.isEmpty(res.data.data)) {
                        $scope.listId = res.data.data.listId
                        $scope.listSk = res.data.data.listSk
                        $scope.isStaf = res.data.data.isStaf
                        $scope.isAtasan = res.data.data.isAtasan
                        $scope.isSuperuser = res.data.data.isSuperuser

                        listUK = res.data.data.listId.join(";")
                        if (res.data.data.isStaf) {
                            $scope.isVerifHidden = true
                            $scope.isHapusGranted = false
                            $scope.isTambahGranted = true
                        } else if (res.data.data.isAtasan || res.data.data.isSuperuser) {
                            $scope.isVerifHidden = false
                            $scope.isHapusGranted = true
                            $scope.isTambahGranted = true
                        } else {
                            $scope.isVerifHidden = true
                            $scope.isHapusGranted = false
                            $scope.isTambahGranted = false
                        }
                    } else {
                        $scope.listId = [61]
                        $scope.listSk = []
                        listUK = "61"
                    }

                    $scope.getAllData();
                });
            }

            init();

            $scope.tambahData = () => {
                // if (!$scope.isTambahGranted) {
                //     toastr.warning("Tidak memiliki akses menambah data!")
                //     return
                // }

                $scope.reset();
                $scope.isEdit = false
                $scope.isVerifStaf = false
                $scope.popupTambah.open().center();
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!$scope.listId.includes(dataItem.unitKerjaId)) {
                    toastr.warning("Tidak memiliki akses menghapus data!");
                    return
                } else if (!$scope.isHapusGranted) {
                    if (dataItem.kdVerif) {
                        toastr.warning("Mapping skor sudah terverifikasi");
                        return
                    } else {
                        toastr.warning("Tidak memiliki akses menghapus data!");
                        return
                    }
                } else if (dataItem.kdVerif) {
                    toastr.warning("Mapping skor sudah terverifikasi");
                    return
                }

                $scope.item.namaProduk = {
                    id: dataItem.produkId,
                    namaProduk: dataItem.namaProduk
                }

                $scope.norecData = dataItem.noRec;

                $scope.item.tglBerlaku = new Date(dataItem.tglMulaiBerlaku);
                $scope.item.skor = dataItem.skor
                $scope.item.statusVerif = dataItem.kdVerif;

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.saveData('delete');
                }, function () {
                    $scope.reset();
                });
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var listProduk = []

                if (!$scope.listId.includes(dataItem.unitKerjaId)) {
                    toastr.warning("Tidak memiliki akses mengubah data!")
                    return
                }

                $scope.isEdit = true

                if (dataItem.kdVerif && $scope.isStaf) {
                    $scope.isVerifStaf = true
                } else {
                    $scope.isVerifStaf = false
                }

                $scope.item.namaProduk = {
                    id: dataItem.produkId,
                    namaProduk: dataItem.namaProduk
                }

                listProduk.push($scope.item.namaProduk)

                $scope.listNamaProduk = listProduk

                $scope.norecData = dataItem.noRec;

                $scope.item.tglBerlaku = new Date(dataItem.tglMulaiBerlaku);
                $scope.item.skor = dataItem.skor
                $scope.item.statusVerif = dataItem.kdVerif;

                $scope.popupTambah.open().center();
            }

            $scope.saveData = (method) => {
                var listRawRequired = [
                    "item.tglBerlaku|ng-model|Tanggal Berlaku",
                    "item.skor|ng-model|Skor",
                    "item.namaProduk|k-ng-model|Tindakan"
                ];

                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    let statusEnabled = method === 'save' || method === 'update';

                    if ($scope.item.statusVerif) {
                        toastr.warning("Mapping skor sudah terverifikasi", "Peringatan");
                        return
                    }

                    let dataSave = {
                        skor: parseFloat($scope.item.skor),
                        statusVerifikasi: $scope.item.statusVerif ? true : false,
                        tanggalMulaiBerlaku: dateHelper.toTimeStamp($scope.item.tglBerlaku),
                        produk: {
                            id: $scope.item.namaProduk.id
                        },
                        kdProfile: 0,
                        statusEnabled: statusEnabled,
                        loginUserId: userLogin.id
                    }

                    if ($scope.norecData) {
                        dataSave.noRec = $scope.norecData;
                    }

                    if ($scope.isDuplicated && method != 'delete') {
                        toastr.warning("Data mapping skoring sudah tersedia!")
                        return
                    } else {
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-skoring-tindakan-farmakologi").then(res => {
                            $scope.getAllData();
                            $scope.closePopUp();
                        })
                    }
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            $scope.reset = () => {
                $scope.item.namaProduk = null;
                $scope.item.tglBerlaku = null;
                $scope.item.skor = null;
                $scope.item.statusVerif = null;
                $scope.norecData = null;
            }

            $scope.$watch('item.namaProduk', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-farmakologi?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&skor=" + $scope.item.skor
                        + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })

            $scope.$watch('item.skor', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-farmakologi?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&skor=" + $scope.item.skor
                        + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })

            $scope.$watch('item.tglBerlaku', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-farmakologi?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&skor=" + $scope.item.skor
                        + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })
        }
    ])
});