define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPemesananBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();

            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarPemesananBarangCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.tglAwal = new Date(chacePeriode[0]);
                    $scope.item.tglAkhir = new Date(chacePeriode[1]);

                    init();
                } else {
                    $scope.item.tglAwal = $scope.now;
                    $scope.item.tglAkhir = $scope.now;
                    init();
                }
            }

            function loadCombo() {
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function (data) {
                    $scope.listNamaBarang = data;
                });
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.newOrder = function () {
                // var confirmDialog = $mdDialog.alert()
                //     .title(`Tidak bisa membuat SPPB`)
                //     .textContent('Harap hubungi pihak ITI')
                //     .ok('Ya')
                // $mdDialog.show(confirmDialog)
                $state.go('OrderBarangSPPBLangsung')
            }
            $scope.terimaBarang = function () {
                if ($scope.dataSelected.status2 != 'Done') {
                    $state.go('PenerimaanBarangSuplier')
                    var chacePeriode = {
                        0: '',
                        1: 'SPPB',
                        2: $scope.dataSelected.norec,
                        3: '',
                        4: '',
                        5: '',
                        6: ''
                    }
                    cacheHelper.set('PenerimaanBarangSuplierCtrl', chacePeriode);
                    $state.go('PenerimaanBarangSuplier')
                } else {
                    alert('Permintaan sudah di terima!!')
                }

            }

            function init() {
                $scope.isRouteLoading = true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                // var rg =""
                // if ($scope.item.namaruangantujuan != undefined){
                //     var rg ="&ruangantujuanfk=" +$scope.item.namaruangantujuan.id
                // }
                // var Jra =""
                // if ($scope.item.jenisRacikan != undefined){
                //     var Jra ="&jenisobatfk=" +$scope.item.jenisRacikan.id
                // }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                var produkfk = ""
                if ($scope.item.namaBarang != undefined) {
                    var produkfk = "&produkfk=" + $scope.item.namaBarang.id
                }
                manageLogistikPhp.getDataTableTransaksi("sppb/get-daftar-permintaan-pengiriman-barang?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&noorder=" + $scope.item.noSPPB +
                    "&noKontrak=" + $scope.item.noKontrak +
                    "&keterangan=" + $scope.item.keterangan +
                    "&rekanan=" + $scope.item.namaPerusahaan +
                    produkfk, true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i + 1
                        if (dat.data.daftar[i].status == 1) {
                            dat.data.daftar[i].status2 = "Done"
                        } else {
                            dat.data.daftar[i].status2 = ""
                        }
                        // var tanggal = $scope.now;
                        // var tanggalLahir = new Date(dat.data.daftar[i].tgllahir);
                        // var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        // dat.data.daftar[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.daftar,
                        pageSize: 20
                    });
                    pegawaiUser = dat.data.datalogin
                });

                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir,
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('DaftarPemesananBarangCtrl', chacePeriode);


            }
            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {

                init();
            }

            // $scope.TransaksiPelayanan = function(){
            //     debugger;
            //     var arrStr ={ 0 : $scope.dataSelected.nocm ,
            //         1 : $scope.dataSelected.namapasien,
            //         2 : $scope.dataSelected.jeniskelamin,
            //         3 : $scope.dataSelected.noregistrasi, 
            //         4 : $scope.dataSelected.umur,
            //         5 : $scope.dataSelected.klid,
            //         6 : $scope.dataSelected.namakelas,
            //         7 : $scope.dataSelected.tglregistrasi,
            //         8 : $scope.dataSelected.norec_apd,
            //         9 : 'resep'
            //     }
            //     cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
            //     $state.go('TransaksiPelayananApotik')

            //     var arrStr2 ={ 0 : $scope.dataSelected.norec 
            //     }
            //     cacheHelper.set('DaftarResepCtrl', arrStr2);
            //     $state.go('DaftarResepCtrl')
            // }

            $scope.Cetak = function () {
                var stt = 'false'
                if (confirm('View SPPB? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                //client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=NonLayanan'+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-SPPB=1&norec=' + $scope.dataSelected.norec + '&view=true', function (response) {

                    //aadc=response;
                });
            }
            $scope.editOrder = function () {
                if ($scope.dataSelected.status2 != 'Done') {
                    // $state.go('OrderBarangSPPB')
                    var chacePeriode = {
                        0: $scope.dataSelected.norec,
                        1: 'EditOrder',
                        2: '',
                        3: '',
                        4: '',
                        5: '',
                        6: ''
                    }
                    cacheHelper.set('EditBarangSPPBCtrl', chacePeriode);
                    $state.go('EditBarangSPPB', {
                        norec: $scope.dataSelected.norec,
                        noOrder: 'EditOrder'
                    });
                    // $state.go('OrderBarangSPPB')
                } else {
                    alert('Permintaan sudah di terima!!')
                }
            }
            $scope.KirimBarang = function () {
                if ($scope.dataSelected.status != 'Terima Order Barang') {
                    alert('Tidak bisa mengirim ke ruangan Sendiri!')
                    return;
                }
                if ($scope.dataSelected.statusorder == 'Sudah Kirim') {
                    alert('Sudah Di Kirim!')
                    return;
                }
                var chacePeriode = {
                    0: '',
                    1: $scope.dataSelected.norec,
                    2: 'KirimBarang',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('KirimBarangLogistikCtrl', chacePeriode);
                $state.go('KirimBarangLogistik')
            }

            $scope.HapusPenerimaan = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                if ($scope.dataSelected.nosbm != undefined) {
                    alert("Sudah di bayar tidak dapat di hapus!!")
                    return;
                }
                var stt = 'false'
                if (confirm('Hapus Penerimaan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?" + "norec_sp=" + $scope.dataSelected.norec, true).then(function (dat) {
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnGrid = [{
                    "field": "no",
                    "title": "No",
                    "width": "15px",
                },
                {
                    "field": "noorder",
                    "title": "No. SPPB",
                    "width": "100px"
                },
                {
                    "field": "nousulan",
                    "title": "No. Usulan",
                    "width": "100px"
                },

                {
                    "field": "tglorder",
                    "title": "Tanggal",
                    "width": "50px",
                    "template": "<span>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "namarekanan",
                    "title": "Supplier",
                    "width": "100px",
                },
                {
                    "field": "jmlitem",
                    "title": "Item",
                    "width": "35px",
                    "template": "<span>#= kendo.toString(jmlitem) #</span>",
                },
                // {
                //     "field": "keterangan",
                //     "title": "Keterangan",
                //     "width" : "80px",
                // },
                // {
                //     "field": "nokontrak",
                //     "title": "No Kontrak",
                //     "width" : "50px",
                // },
                // {
                //     "field": "tahunusulan",
                //     "title": "Tahun",
                //     "width" : "30px",
                // },
                // {
                //     "field": "totalhargasatuan",
                //     "title": "Total",
                //     "width" : "50px",
                //     "template": "<span class='style-right'>{{formatRupiah('#: totalhargasatuan #', '')}}</span>"
                // },
                {
                    "field": "petugas",
                    "title": "Pembuat PO",
                    "width": "100px",
                },
                // {
                //     "field": "status2",
                //     "title": "Status",
                //     "width" : "40px",
                // }
            ];

            $scope.gridOption = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    },
                        {
                            text: "export",
                            name: "Export detail",
                            template: '<button ng-click="exportExcelDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export Detail</button>'
                        }
                ],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            }

            $scope.exportExcel = function () {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "No."
                        },
                        {
                            value: "No. SPPB"
                        },
                        // {
                        //     value: "No. Usulan"
                        // },
                        {
                            value: "Tanggal"
                        },
                        {
                            value: "Suplier"
                        },
                        {
                            value: "Item"
                        },
                        {
                            value: "Pembuat PO"
                        }
                    ]
                }];

                tempDataExport = $scope.dataGrid;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].tglorder
                                },
                                {
                                    value: data[i].noorder
                                },
                                // {
                                //     value: data[i].nousulan
                                // },
                                {
                                    value: data[i].tglorder
                                },
                                {
                                    value: data[i].namarekanan
                                },
                                {
                                    value: data[i].jmlitem
                                },
                                {
                                    value: data[i].petugas
                                }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [{
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }],
                            // Title of the sheet
                            title: "Daftar Pemesanan Barang / SPPB ",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "daftar-pemesanan-barang.xlsx"
                    });
                });
            };

            $scope.exportExcelDetail = function () {

                let dataGridPB = $scope.dataGrid.data();
                let dataTempSourceExportPB = [];


                for (let i = 0; i < dataGridPB.length; i++) {

                    for (let ii = 0; ii < dataGridPB[i].details.length; ii++) {
                        let dataTemp2 = {
                            noorder: dataGridPB[i].noorder,
                            noUsulan: dataGridPB[i].nousulan,

                            namarekanan: dataGridPB[i].namarekanan,
                            jmlitem: dataGridPB[i].jmlitem,
                            petugas: dataGridPB[i].petugas,
                            tglorder: dataGridPB[i].tglorder,
                            namaproduk: dataGridPB[i].details[ii].namaproduk,
                            satuanstandar: dataGridPB[i].details[ii].satuanstandar,
                            qtyproduk: dataGridPB[i].details[ii].qtyproduk,
                            qtyterimalast: dataGridPB[i].details[ii].qtyterimalast,

                            hargasatuan: dataGridPB[i].details[ii].hargasatuan,
                            hargadiscount: dataGridPB[i].details[ii].hargadiscount,
                            hargappn: dataGridPB[i].details[ii].hargappn,
                            total: dataGridPB[i].details[ii].total,
                            qtyprodukkonfirmasi: dataGridPB[i].details[ii].qtyprodukkonfirmasi
                        }
                        dataTempSourceExportPB.push(dataTemp2);
                    }

                }

                $scope.dataSourceExportPB = new kendo.data.DataSource({
                    data: dataTempSourceExportPB
                });

                console.log($scope.dataSourceExportPB);

                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "No. SPPB"
                        },
                        {
                            value: "No. Usulan"
                        },
                        {
                            value: "Tanngal"
                        },
                        {
                            value: "Supplier"
                        },
                        {
                            value: "Item"
                        },
                        {
                            value: "Pembuat PO"
                        },
                        {
                            value: "Nama Produk"
                        },
                        {
                            value: "Satuan"
                        },
                        {
                            value: "QTY"
                        },
                        {
                            value: "Sudah Terima"
                        },
                        {
                            value: "Harga Satuan"
                        },
                        {
                            value: "Disc%"
                        },
                        {
                            value: "PPN%"
                        },
                        {
                            value: "Total"
                        }
                    ]
                }];

                tempDataExport = $scope.dataSourceExportPB;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].noorder
                                },
                                {
                                    value: data[i].noUsulan
                                },
                                {
                                    value: data[i].tglorder
                                },
                                {
                                    value: data[i].namarekanan
                                },
                                {
                                    value: data[i].jmlitem
                                },
                                {
                                    value: data[i].petugas
                                },
                                {
                                    value: data[i].namaproduk
                                },
                                {
                                    value: data[i].satuanstandar
                                },
                                {
                                    value: data[i].qtyproduk
                                },
                                {
                                    value: data[i].qtyterimalast
                                },
                                {
                                    value: data[i].hargasatuan
                                },
                                {
                                    value: data[i].hargadiscount
                                },
                                {
                                    value: data[i].hargappn
                                },
                                {
                                    value: data[i].total
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
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }
                            ],
                            // Title of the sheet
                            title: "Detail Daftar Pemesanan Barang",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "Detail Daftar Pemesanan Barang.xlsx"
                    });
                });

            }

            $scope.data2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width": "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width": "30px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width": "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: qtyproduk #', '')}}</span>"
                        },
                        {
                            "field": "qtyterimalast",
                            "title": "Sdh Terima",
                            "width": "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: qtyterimalast #', '')}}</span>"
                        },
                        // {
                        //     "field": "qtyprodukkonfirmasi",
                        //     "title": "Qty",
                        //     "width" : "30px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: qtyprodukkonfirmasi #', '')}}</span>"
                        // },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width": "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscount",
                            "title": "Disc%",
                            "width": "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                        },
                        {
                            "field": "hargappn",
                            "title": "Ppn%",
                            "width": "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargappn #', '')}}</span>"
                        },
                        // {
                        //     "field": "totalkonfirmasi",
                        //     "title": "Total",
                        //     "width" : "30px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                        // },
                        {
                            "field": "total",
                            "title": "Total",
                            "width": "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        }
                    ]
                }
            };
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD/MM/YYYY');
            }

            function itungUsia(tgl) {
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih / (1000 * 60 * 60 * 24 * 365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn ' // + bln + ' bln'
            }
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            //***********************************

        }
    ]);
});