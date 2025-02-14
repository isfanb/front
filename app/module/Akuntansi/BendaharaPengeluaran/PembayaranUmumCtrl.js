define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PembayaranUmumCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
        function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.confirm = {};
            $scope.edit = {};

            $scope.verif = {};
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.now = new Date();
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            $scope.item.tanggalVerifikasi = $scope.now;

            $scope.showbtnEdit = false;
            let init = function () {
                // serive get sumber dana
                ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-sumber-dana').then(res => {
                    $scope.listSumberDana = res.data;
                })

                modelItemAkuntansi.getDataDummyPHP("spk/rekanan/get-data-combo-rekanan", true, true, 20).then(function (data) {
                    $scope.listRekanan = data;
                })

            }

            init();
            $scope.getListAnggaran = function () {
                $scope.verif.anggaran = null;
                $scope.isPagu = false;
                ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-penggunaan-anggaran?tahun=' + new Date().getFullYear() + "&kodeDana=" + $scope.verif.sumberDana.kodeanggaran).then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.data[i].anggaran);
                    }
                    $scope.listAnggaran = res.data.data;
                });
            }

            $scope.onChangeAnggaran = function (data) {
                $scope.edit.keperluan = 'Untuk Pembayaran ' + ($scope.edit.anggaran ? $scope.edit.anggaran.nama_anggaran : '');
                $scope.edit.kodeDana = data.kode_dana;
                $scope.edit.tahunDana = data.tahun;
                $scope.edit.namaAnggaran = data.nama_anggaran;

                $scope.verif.sisaPagu = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format((data.anggaran - data.penggunaan));
                $scope.edit.pagu = data.anggaranFormatted;
                $scope.edit.rawSisaPagu = (data.anggaran - data.penggunaan);
                $scope.getTerbilang((data.anggaran - data.penggunaan), 'sisaPaguTerbilang');
                $scope.getTerbilang(data.anggaran, 'paguTerbilang');
                // $scope.isPagu = true;
            }

            $scope.showPagu = function (data) {
                $scope.keperluan = 'Untuk Pembayaran ' + ($scope.verif.anggaran ? $scope.verif.anggaran.nama_anggaran : '');
                $scope.verif.kodeDana = data.kode_dana;
                $scope.verif.tahunDana = data.tahun;
                $scope.verif.namaAnggaran = data.nama_anggaran;
                console.log($scope.verif.anggaran);
                $scope.verif.sisaPagu = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format((data.anggaran - data.penggunaan));
                $scope.verif.pagu = data.anggaranFormatted;
                $scope.verif.rawSisaPagu = (data.anggaran - data.penggunaan);
                $scope.getTerbilang((data.anggaran - data.penggunaan), 'sisaPaguTerbilang');
                $scope.getTerbilang(data.anggaran, 'paguTerbilang');
                $scope.isPagu = true;
            }

            $scope.loadData = function () {
                let dataTempVerified = [],
                    dataTempUnverified = [];
                $scope.isRouteLoading = true;
                ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-verifikasi-pembayaran-umum?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD')).then((res) => {
                    console.log(res.data.daftar);
                    for (let i = 0; i < res.data.daftar.length; i++) {
                        res.data.daftar[i].totalTagihanFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].totaltagihan);
                        res.data.daftar[i].totalBayarFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].totalbayar);
                        res.data.daftar[i].tglTransaksiFormatted = dateHelper.formatDate(res.data.daftar[i].tgltransaksi, 'DD-MM-YYYY');
                        res.data.daftar[i].tglVerifikasiFormatted = dateHelper.formatDate(res.data.daftar[i].tglverifikasi, 'DD-MM-YYYY');

                        if (res.data.daftar[i].status === "VERIFIKASI") dataTempVerified.push(res.data.daftar[i])
                        else dataTempUnverified.push(res.data.daftar[i])
                    }

                    $scope.dataGridVerified = new kendo.data.DataSource({
                        data: dataTempVerified,
                        pageSize: 5
                    });

                    $scope.dataGridUnverified = new kendo.data.DataSource({
                        data: dataTempUnverified,
                        pageSize: 5
                    })
                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.loadData();

            $scope.columnGridVerified = [{
                    "field": "tglSPK",
                    "title": "<h3>Tanggal SPK</h3>",
                    "width": "150px"
                },
                {
                    "field": "tglVerifikasiFormatted",
                    "title": "<h3>Tanggal Verifikasi</h3>",
                    "width": "150px"
                },
                {
                    "field": "namarekanan",
                    "title": "<h3>Kepada</h3>",
                    "width": "150px"
                },
                {
                    "field": "noverifikasi",
                    "title": "<h3>No. Verifikasi</h3>",
                    "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "nospk",
                    "title": "<h3>No. SPK</h3>",
                    "width": "150px"
                },
                {
                    "field": "namaAnggaran",
                    "title": "<h3>Nama Anggaran</h3>",
                    "width": "200px"
                },
                {
                    "field": "kodeanggaran",
                    "title": "<h3>Kode Anggaran</h3>",
                    "width": "170px"
                },
                {
                    "field": "status",
                    "title": "<h3>Status</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusbayar",
                    "title": "<h3>Status Bayar</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusconfirmkabag",
                    "title": "<h3>Status Konfirmasi<br> Ka. Subag</h3>",
                    "width": "170px"
                },
                {
                    "field": "statusconfirmanggaran",
                    "title": "<h3>Status Konfirmasi<br> Ka. Bag</h3>",
                    "width": "200px"
                },
                {
                    "field": "totalTagihanFormatted",
                    "title": "<h3>Total Tagihan</h3>",
                    "width": "150px"
                },
                {
                    "field": "totalBayarFormatted",
                    "title": "<h3>Total Bayar</h3>",
                    "width": "150px"
                },
                {
                    "field": "keperluan",
                    "title": "<h3>Keterangan Keperluan</h3>",
                    "width": "150px"
                },
                {
                    command: [{
                            text: "Konfirmasi Kasubag",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: showWindowKonfirmasi,
                            imageClass: "k-icon k-i-pencil"
                        },
                        {
                            text: "Konfirmasi Kabag",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: showWindowKonfirmasi,
                            imageClass: "k-icon k-i-pencil"
                        },
                        {
                            text: "Cetak",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: cetak,
                            imageClass: "k-printer"
                        },
                        // {
                        //     text: "Batal Verifikasi",
                        //     align: "center",
                        //     attributes: {
                        //         align: "center"
                        //     },
                        //     click: confirmBatalVerif,
                        //     imageClass: "k-icon k-i-pencil"
                        // }
                        // {
                        //     text: "Detail Tagihan",
                        //     align: "center",
                        //     attributes: {
                        //         align: "center"
                        //     },
                        //     click: detailTagihan,
                        //     imageClass: "k-icon k-i-pencil"
                        // }
                    ],
                    title: "",
                    width: "600px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
            ];

            function confirmBatalVerif(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);

                if (dataItem.confirmfk || dataItem.confirm1fk) {
                    toastr.info("Data sudah di verifikasi", "Tidak Bisa Membatalkan")
                    return;
                }

                var confirm = $mdDialog.confirm()
                    .title(`Apakah Anda yakin akan membatalkan Verifikasi Tagihan`)
                    .textContent(`Anda akan membatalkan Verifikasi Tagihan dengan No. Voucher ${dataItem.noverifikasi}`)
                    .ok('Ya')
                    .cancel('Tidak');

                $mdDialog.show(confirm).then(function () {
                    batalVerif(dataItem);
                }, function () {});
            }

            let batalVerif = (data) => {
                console.log(data);
                let dataSave = {
                    noverifikasi: data.noverifikasi,
                    norec: data.norec
                }
                console.log(dataSave);
                ManageAkuntansi.postpost(dataSave, 'bendahara-pengeluaran/batal-verifikasi-pembayaran-umum').then((data) => {
                    $scope.loadData();
                });

            }

            $scope.columnGridUnverified = [{
                    "field": "tglSPK",
                    "title": "<h3>Tanggal SPK</h3>",
                    "width": "150px"
                },
                {
                    "field": "tglVerifikasiFormatted",
                    "title": "<h3>Tanggal Verifikasi</h3>",
                    "width": "150px"
                },
                {
                    "field": "namarekanan",
                    "title": "<h3>Kepada</h3>",
                    "width": "150px"
                },
                {
                    "field": "noverifikasi",
                    "title": "<h3>No. Verifikasi</h3>",
                    "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "kodeanggaran",
                    "title": "<h3>Kode Anggaran</h3>",
                    "width": "170px"
                },
                {
                    "field": "status",
                    "title": "<h3>Status</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusbayar",
                    "title": "<h3>Status Bayar</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusconfirmkabag",
                    "title": "<h3>Status Konfirmasi<br> Ka. Subag</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusconfirmanggaran",
                    "title": "<h3>Status Konfirmasi<br> Ka. Bag</h3>",
                    "width": "200px"
                },
                {
                    "field": "totalTagihanFormatted",
                    "title": "<h3>Total Bayar</h3>",
                    "width": "150px"
                },
                // {
                //     "field": "totalBayarFormatted",
                //     "title": "<h3>Total Bayar</h3>",
                //     "width": "150px"
                // },
                {
                    "field": "keperluan",
                    "title": "<h3>Keterangan<br> Keperluan</h3>",
                    "width": "450px"
                }
                // {
                //     command: [{
                //             text: "Verifikasi",
                //             align: "center",
                //             attributes: {
                //                 align: "center"
                //             },
                //             click: showDataVerifikasi,
                //             imageClass: "k-icon k-i-pencil"
                //         },
                //         {
                //             text: "Detail Tagihan",
                //             align: "center",
                //             attributes: {
                //                 align: "center"
                //             },
                //             click: detailTagihan,
                //             imageClass: "k-icon k-i-pencil"
                //         }
                //     ],
                //     title: "",
                //     width: "300px",
                //     attributes: {
                //         style: "text-align:center;valign=middle"
                //     },
                // }
            ];

            $scope.columnGridAnggaran = [{
                    "field": "kode_anggaran",
                    "title": "<h3>Kode Anggaran</h3>",
                    "width": "150px"
                },
                {
                    "field": "kode_dana",
                    "title": "<h3>Kode Dana</h3>",
                    "width": "150px"
                },
                {
                    "field": "nama_anggaran",
                    "title": "<h3>Nama Anggaran</h3>",
                    "width": "170px"
                },
                {
                    "field": "anggaranFormatted",
                    "title": "<h3>Anggaran</h3>",
                    "width": "150px"
                },
                {
                    "field": "penggunaanFormatted",
                    "title": "<h3>Penggunaan</h3>",
                    "width": "150px"
                },

            ];

            $scope.gridOptVerified = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel(true)" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }

                ],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridVerified
            };

            $scope.gridOptUnverified = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel(false)" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    },

                    {
                        name: "Tambah Baru",
                        template: '<button ng-click="tambahBaru()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Baru</button>'
                    }
                ],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridUnverified
            };

            $scope.exportExcel = (isVerified) => {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "Tanggal SPK"
                        },
                        {
                            value: "Tanggal Verifikasi"
                        },
                        {
                            value: "No. Verifikasi"
                        },
                        {
                            value: "No. SPK"
                        },
                        {
                            value: "Nama Anggaran"
                        },
                        {
                            value: "Kode Anggaran"
                        },
                        {
                            value: "Status"
                        },
                        {
                            value: "Status Bayar"
                        },
                        {
                            value: "Status Konfirmasi Ka. Subag"
                        },
                        {
                            value: "Status Konfirmasi K. Bag"
                        },
                        // {
                        //     value: "Status Total Tagihan"
                        // },
                        {
                            value: "Total Bayar"
                        },
                        {
                            value: "Keterangan Keperluan"
                        },
                    ]
                }];

                tempDataExport = isVerified ? $scope.dataGridVerified : $scope.dataGridUnverified;
                tempDataExport.fetch(() => {
                    var data = tempDataExport._data;
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].tglSPK
                                },
                                {
                                    value: data[i].tglVerifikasiFormatted
                                },
                                {
                                    value: data[i].noverifikasi
                                },
                                {
                                    value: data[i].nospk
                                },
                                {
                                    value: data[i].namaAnggaran
                                },
                                {
                                    value: data[i].kodeanggaran
                                },
                                {
                                    value: data[i].status
                                },
                                {
                                    value: data[i].statusbayar
                                },
                                {
                                    value: data[i].statusconfirmkabag
                                },
                                {
                                    value: data[i].statusconfirmanggaran
                                },
                                {
                                    value: data[i].totaltagihan
                                },
                                // {
                                //     value: data[i].totalbayar
                                // },
                                {
                                    value: data[i].keperluan
                                }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [
                                // Column settings (width)
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                }
                            ],
                            // Title of the sheet
                            title: "Daftar Verifikasi Tagihan Rekanan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "pembayaran-umum-" + (isVerified ? "verified" : "unverified") + ".xlsx"
                    });
                });
            };

            $scope.gridOptPenggunaanAnggaran = {
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridAnggaran
            }

            $scope.tambahBaru = function () {
                $scope.popupTambahBaru.open().center();

            }

            function cetak(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);
                console.log(dataItem);

                window.open('http://192.168.12.4:7777/service-reporting/lap-verifikasi-pembayaran-umum/' + dataItem.noverifikasifk, '_blank');
            }

            function showWindowKonfirmasi(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);

                $scope.confirm = dataItem;
                
                $scope.edit = dataItem;
                // $scope.showbtnEdit = false;
                $scope.isKasubag = e.data.commandName === "Konfirmasi Kasubag" ? true : false;
                $scope.showbtnEdit = $scope.isKasubag;
                if (!$scope.isKasubag && !$scope.confirm.confirmfk) {
                    toastr.warning('Harap Konfirmasi Ka. Subag Terlebih dahulu')
                    return;
                }

                ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-penggunaan-anggaran?tahun=' + new Date().getFullYear() + "&kodeAnggaran=" + dataItem.kodeanggaran).then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.data[i].anggaran);

                        res.data.data[i].penggunaanFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.data[i].penggunaan);
                    }
                    $scope.dataGridPenggunaanAnggaran = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    });
                    // $scope.listAnggaran = res.data.data;
                });
                $scope.konfirmasiAnggaran.open().center();
            }

            function detailTagihan(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);
                $scope.dataSelected = dataItem;
                let tglTerima = moment($scope.dataSelected.tglstruk).format('YYYY-MM-DD');
                let tglfaktur = moment($scope.dataSelected.tgldokumen).format('YYYY-MM-DD');
                let tglJatuhTempo = moment($scope.dataSelected.tgljatuhtempo).format('YYYY-MM-DD');

                var tempData = tglTerima + "#" + $scope.dataSelected.namarekanan + "#" + $scope.dataSelected.nodokumen + "#" + tglJatuhTempo + "#" + tglfaktur + "#" + $scope.dataSelected.norec + "#DaftarTagihanSupplier#" + $scope.dataSelected.nostruk;
                cacheHelper.set('DetailTagihanRekanan', tempData);
                $state.go('DetailTagihanRekanan', {
                    noTerima: '0308'
                })
            }

            function showDataVerifikasi(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);
                $scope.dataSelected = dataItem;
                if (dataItem.statusbayar !== 'BELUM LUNAS') {
                    toastr.info('Data Tagihan SUDAH LUNAS');
                    return;
                }

                // status
                if (dataItem.status !== 'BLM VERIFIKASI') {
                    toastr.info('Data Tagihan Sudah Verifikasi');
                    return;
                }


                $scope.loadData();
                $scope.verif.totalBayar = dataItem.sisautang;
                $scope.popupTambahBaru.open().center();

            }

            $scope.editData = () => {
                if($scope.edit.statusconfirmanggaran === "CONFIRM") {
                    toastr.warning("Data sudah di konfirmasi Ka. Bag");
                    return;
                }
                $scope.popupEditData.open().center();
                $scope.konfirmasiAnggaran.close();
                // statusconfirmanggaran
                $scope.edit.totalbayar = $scope.edit.totaltagihan;
                $scope.edit.noFaktur = $scope.edit.faktur;
                $scope.edit.namaRekanan = $scope.edit.namarekanan;
                $scope.edit.noSpk = $scope.edit.nospk;

                $scope.edit.isBa = $scope.edit.ba !== "" || $scope.edit.ba ? true : false;
                $scope.edit.isNoFaktur = $scope.edit.faktur !== "" || $scope.edit.faktur ? true : false;
                $scope.showInputNoFaktur = $scope.edit.isBa;
                $scope.showInputBa = $scope.edit.isNoFaktur;
                // $scope.edit.isSppb = true;
                // $scope.edit.permohonanPembayaran = true;
                // $scope.edit.isKwitansi = true;
                
                if ($scope.confirm.kodeDana) {
                    let kdDana = $scope.confirm.kodeDana.split('.');

                    $scope.verif.sumberDana = {
                        asalproduk: kdDana[0] === "RM" ? "Rupiah Murni" : "Badan Layanan Umum",
                        id: kdDana[0] === "RM" ? 2 : 1,
                        kodeanggaran: kdDana[0],
                    }

                    $scope.getListAnggaran();
                }

                $scope.edit.anggaran = {
                    kode_anggaran: $scope.edit.kodeanggaran,
                    nama_anggaran: $scope.edit.namaAnggaran
                }
                console.log($scope.edit);
            }

            $scope.simpanEditData = () => {
                if (!$scope.verif.sumberDana) {

                    toastr.warning("Harap isi Sumber Dana");
                    return;
                };
                if (!$scope.edit.anggaran) {

                    toastr.warning("Harap isi Anggaran");
                    return;
                }

                if (!$scope.edit.totalbayar) {

                    toastr.warning("Harap isi Total yang akan dibayarkan");
                    return;
                };

                $scope.popupEditData.close();
                var confirm = $mdDialog.confirm()
                    .title(`Apakah Anda yakin akan Menyimpan Data`)
                    // .textContent(`Anda akan konfirmasi Verifikasi Tagihan dengan Supplier ${$scope.confirm.namarekanan} dengan No. SPK ${$scope.confirm.noSPK}`)
                    .ok('Ya')
                    .cancel('Batal');

                $mdDialog.show(confirm).then(function () {
                    let dataSave = {
                        kodeAnggaran: $scope.edit.anggaran.kode_anggaran,
                        pegawaifk: $scope.dataPegawaiLogin.id,
                        tglVerifikasi: dateHelper.formatDate($scope.edit.tglverifikasi, "YYYY-MM-DD"),
                        keperluan: $scope.edit.keperluan,
                        totalTagihan: $scope.edit.totalbayar,
                        ba: $scope.edit.isBa ? $scope.edit.ba : "",
                        sppb: $scope.edit.isSppb ? $scope.edit.sppb : "",
                        faktur: $scope.edit.isNoFaktur ? $scope.edit.noFaktur : "",
                        norecPU: $scope.edit.norec,
                        noverifikasifk:$scope.edit.noverifikasifk,
                        tglSPK: $scope.edit.tglSPK,
                        pph: $scope.edit.pph ? $scope.edit.pph : 0,
                        nospk: $scope.edit.noSpk ? $scope.edit.noSpk : "",
                        namarekanan: $scope.edit.namaRekanan ? $scope.edit.namaRekanan : "",
                        dana: $scope.edit.sumberDana ? $scope.edit.sumberDana.asalproduk : "",
                    };

                    ManageAkuntansi.postpost(dataSave, 'bendahara-pengeluaran/save-verifikasi-pembayaran-umum').then(res => {
                        $scope.clear();
                        $scope.popupEditData.close();
                        $scope.loadData();
                    });
                }, function () {
                    $scope.popupEditData.open().center();
                    toastr.info('Konfirmasi dibatalkan');
                });
            }

            $scope.simpanDataPembayaranUmum = function () {
                console.log($scope.item.namaRekanan);

                if (!$scope.verif.sumberDana) {
                    $scope.popupTambahBaru.open().center();
                    toastr.warning("Harap isi Sumber Dana");
                    return;
                };
                if (!$scope.verif.anggaran) {
                    $scope.popupTambahBaru.open().center();
                    toastr.warning("Harap isi Anggaran");
                    return;
                }

                if (!$scope.verif.totalBayar) {
                    $scope.popupTambahBaru.open().center();
                    toastr.warning("Harap isi Total yang akan dibayarkan");
                    return;
                };

                let dataSave = {
                    kodeAnggaran: $scope.verif.anggaran.kode_anggaran,
                    pegawaifk: $scope.dataPegawaiLogin.id,
                    tglVerifikasi: dateHelper.formatDate($scope.item.tanggalVerifikasi, "YYYY-MM-DD"),
                    keperluan: $scope.keperluan,
                    totalTagihan: $scope.verif.totalBayar,
                    ba: $scope.item.isBa ? $scope.item.ba : "",
                    sppb: $scope.item.isSppb ? $scope.item.sppb : "",
                    faktur: $scope.item.isNoFaktur ? $scope.item.noFaktur : "",

                    tglSPK: $scope.item.tglSPK,
                    pph: $scope.item.pph ? $scope.item.pph : 0,
                    nospk: $scope.item.noSpk ? $scope.item.noSpk : "",
                    namarekanan: $scope.item.namaRekanan ? $scope.item.namaRekanan : "",
                    dana: $scope.verif.sumberDana ? $scope.verif.sumberDana.asalproduk : "",
                };

                ManageAkuntansi.postpost(dataSave, 'bendahara-pengeluaran/save-verifikasi-pembayaran-umum').then(res => {
                    $scope.clear();
                    $scope.popupTambahBaru.close();
                    $scope.loadData();
                });
            };

            $scope.confirmSave = function () {
                $scope.popupTambahBaru.close();
                var confirm = $mdDialog.confirm()
                    .title(`Apakah Anda yakin akan Menyimpan Data`)
                    // .textContent(`Anda akan konfirmasi Verifikasi Tagihan dengan Supplier ${$scope.confirm.namarekanan} dengan No. SPK ${$scope.confirm.noSPK}`)
                    .ok('Ya')
                    .cancel('Batal');

                $mdDialog.show(confirm).then(function () {
                    // yes
                    $scope.simpanDataPembayaranUmum()
                }, function () {
                    $scope.popupTambahBaru.open().center();
                    toastr.info('Konfirmasi dibatalkan');
                });
            }

            $scope.toogleClick = () => {
                $scope.showInputNoSpk = $scope.item.isNoSpk ? true : false;
                $scope.showInputNoFaktur = $scope.item.isNoFaktur ? true : false;
                $scope.showInputBa = $scope.item.isBa ? true : false;
                $scope.showInputSppb = $scope.item.isSppb ? true : false;

                $scope.showInputNoSpk = $scope.edit.isNoSpk ? true : false;
                $scope.showInputNoFaktur = $scope.edit.isNoFaktur ? true : false;
                $scope.showInputBa = $scope.edit.isBa ? true : false;
                $scope.showInputSppb = $scope.edit.isSppb ? true : false;
            }

            $scope.clear = function () {
                $scope.keperluan = "";
                $scope.verif = {};
                $scope.item.tanggalVerifikasi = new Date();
                $scope.isPagu = false;
            }

            $scope.closePopupKonfirmasi = function () {
                // $scope.clear();
                $scope.konfirmasiAnggaran.close();
                $scope.isPagu = false;

            }

            $scope.closePopupAdd = function () {
                // $scope.clear();
                $scope.popupTambahBaru.close();
                $scope.isPagu = false;

            }

            $scope.konfirmasiData = (state) => {
                if($scope.confirm.statusconfirmkabag === "CONFIRM" && state) {
                    toastr.warning("Data sudah di verifikasi");
                    return;
                }

                if($scope.confirm.statusconfirmanggaran === "CONFIRM" && !state) {
                    toastr.warning("Data sudah di verifikasi");
                    return;
                }
                console.log($scope.confirm);
                $scope.closePopupKonfirmasi();

                var confirm = $mdDialog.confirm()
                    .title(`Apakah Anda yakin akan mengkonfirmasi Pembayaran Umum`)
                    .textContent(`Anda akan konfirmasi Verifikasi Tagihan dengan No. Verifikasi ${$scope.confirm.noverifikasi} dan Kode Anggaran ${$scope.confirm.kodeanggaran}`)
                    .ok('Ya')
                    .cancel('Batal');

                $mdDialog.show(confirm).then(function () {
                    // yes
                    if (state) {
                        // if (!$scope.confirm.confirmfk) {
                        //     toastr.warning('Harap Konfirmasi Kabag terlebih dahulu', 'Perhatian!');
                        //     return;
                        // }

                        let data = {
                            noverifikasifk: $scope.confirm.noverifikasifk,
                            confirmfk: $scope.dataPegawaiLogin.id,
                            tglconfirm: dateHelper.formatDate(new Date, 'YYYY-MM-DD')
                        }
                        ManageAkuntansi.postpost(data, 'bendahara-pengeluaran/save-confirm-verifikasi-tagihan-suplier').then(res => {
                            $scope.loadData();
                        });
                    } else {

                        let data = {
                            noverifikasifk: $scope.confirm.noverifikasifk,
                            confirmfk: $scope.confirm.confirmfk,
                            confirm1fk: $scope.dataPegawaiLogin.id,
                            tglconfirm: dateHelper.formatDate(new Date, 'YYYY-MM-DD')
                        }
                        ManageAkuntansi.postpost(data, 'bendahara-pengeluaran/save-confirm-anggaran-verifikasi-tagihan-suplier').then(res => {
                            $scope.loadData();
                        });

                    }
                }, function () {
                    $scope.konfirmasiAnggaran.open().center();
                    toastr.info('Konfirmasi dibatalkan');
                });
            }

            $scope.getTerbilang = function (data, model) {
                modelItemAkuntansi.getDataGlobal('valet/terbilang/' + data).then(res => {
                    $scope.verif[`${model}`] = res.terbilang;
                });
            }

            $scope.closePopUpKonfirmasi = function () {
                $scope.konfirmasiAnggaran.close();
            }
        }
    ]);
});