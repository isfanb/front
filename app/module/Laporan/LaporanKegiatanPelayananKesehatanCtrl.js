define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanKegiatanPelayananKesehatanCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};


            $scope.CariData = function () {
                LoadData()
            }
            function LoadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');



                // var tempDepartemenId = "";
                // if ($scope.item.departement != undefined) {
                //     tempDepartemenId = "&idDept=" + $scope.item.departement.id;
                // }
                var tempRuanganId = "";
                if ($scope.item.ruangan != undefined) {
                    tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
                }
                var tempKelasId = "";
                if ($scope.item.kelas != undefined) {
                    tempKelasId = "&kelas=" + $scope.item.kelas.id;
                }
                // var tempMutasiId = "";
                // if ($scope.item.jenisMutasi != undefined) {
                //     tempMutasiId = "&kelompokPasien=" + $scope.item.jenisMutasi.id;
                // }


                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir
                }
                cacheHelper.set('LaporanKegiatanPelayananKesehatanCtrl', chacePeriode);

                modelItemAkuntansi.getDataTableTransaksi("laporan/get-jml-kegiatan-pelayanan?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    // + tempDepartemenId
                    + tempRuanganId
                    + tempKelasId
                    // + tempKelPasienId
                ).then(function (data) {
                    var dbtotal = 0;
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].no = i + 1
                      
                    }
                   
                    // $scope.item.total = dbtotal;
                    $scope.sourceLaporan = new kendo.data.DataSource({
                        data: data.data,
                        group: $scope.group,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                  
                    $scope.dataExcel = data.data;
                })
            }

            $scope.click = function (dataPasienSelected) {
                var data = dataPasienSelected;

            };
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.selectedData = [];
            $scope.onClick = function (e) {
                var element = $(e.currentTarget);

                var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#kGrid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                // $scope.selectedData[dataItem.noRec] = checked;
                if (checked) {
                    var result = $.grep($scope.selectedData, function (e) {
                        return e.noregistrasi == dataItem.noregistrasi;
                    });
                    if (result.length == 0) {
                        $scope.selectedData.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                        $scope.selectedData.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedData.length; i++)
                        if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                            $scope.selectedData.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }

            // $scope.group = {
            //     field: "departemen",
            //     aggregates: [{
            //         field: "departemen",
            //         aggregate: "count"
            //     }, {
            //         field: "departemen",
            //         aggregate: "count"
            //     }]
            // };
            // $scope.aggregate = [{
            //     field: "departemen",
            //     aggregate: "count"
            // }, {
            //     field: "departemen",
            //     aggregate: "count"
            // }]
     

            $("#kGrid").kendoGrid({
                toolbar: ["excel"],
                    // , "pdf"],

                excel: {
                    fileName: "KegiatanPelayananRS.xlsx",
                    allPages: true,

                },
                // pdf: {
                //     fileName: "LaporanPasienMasuk.pdf",
                //     allPages: true,
                // },

                dataSource: $scope.dataExcel,
                sortable: true,
                // reorderable: true,
                // filterable: true,
                pageable: true,
                // groupable: true,
                // columnMenu: true,
                // resizable: true,
                excelExport: function(e) {
                    var rows = e.workbook.sheets[0].rows;
                    rows.unshift({
                        cells: [ { value: "KEGIATAN PELAYANAN KESEHATAN RSAB HARAPAN KITA", background: "#fffff" } ]
                    });
                  },
                columns: [
                    // {
                    //     hidden: true,
                    //     field: "departemen",
                    //     title: "Departemen",
                    //     aggregates: ["count"],
                    //     groupHeaderTemplate: "Departemen #= value # (Jumlah: #= count#)"
                    // },
                    {
                                  field: "no", 
                                  title: "No",
                                  Template: "<span class='style-center'>#: no #</span>",
                                  width:"30px"
                    },
                    {
                        field: "namaruangan",
                        title: "POLIKLINIK",
                        width: "180px",
                        template: "<span class='style-center'>#: namaruangan #</span>",
                        headerAttributes: { style: "text-align : center" },
                    },
                    {
                        title: "UMUM/TUNAI",
                        headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "jumlahUmumB",
                                title: "BARU",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" }
                            },
                            {
                                field: "jumlahUmumL",
                                title: "LAMA",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" },
                            },
                            {
                                field: "totalUmum",
                                title: "JML",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" },
                            }
                        ]
                    },
                    // {
                    //     title: "KARYAWAN",
                    //     headerAttributes: { style: "text-align : center" },
                    //     columns: [
                    //         {
                    //             field: "",
                    //             title: "BARU",
                    //             width: "60px",
                    //             headerAttributes: { style: "text-align : center" }
                    //         },
                    //         {
                    //             field: "",
                    //             title: "LAMA",
                    //             width: "60px",
                    //             headerAttributes: { style: "text-align : center" },
                    //         },
                    //         {
                    //             field: "",
                    //             title: "JML",
                    //             width: "60px",
                    //             headerAttributes: { style: "text-align : center" },
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: "KEL. KARYAWAN",
                    //     headerAttributes: { style: "text-align : center" },
                    //     columns: [
                    //         {
                    //             field: "",
                    //             title: "BARU",
                    //             width: "60px",
                    //             headerAttributes: { style: "text-align : center" }
                    //         },
                    //         {
                    //             field: "",
                    //             title: "LAMA",
                    //             width: "60px",
                    //             headerAttributes: { style: "text-align : center" },
                    //         },
                    //         {
                    //             field: "",
                    //             title: "JML",
                    //             width: "60px",
                    //             headerAttributes: { style: "text-align : center" },
                    //         }
                    //     ]
                    // },
                    {
                        title: "JAMINAN (PERUSAHAAN)",
                        headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "jumlahPerusahaanB",
                                title: "BARU",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" }
                            },
                            {
                                field: "jumlahPerusahaanL",
                                title: "LAMA",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" },
                            },
                            {
                                field: "totalPerusahaan",
                                title: "JML",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" },
                            }
                        ]
                    },
                    {
                        title: "ASKES (BPJS NON PBI)",
                        headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "jumlahBpjsB",
                                title: "BARU",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" }
                            },
                            {
                                field: "jumlahBpjsL",
                                title: "LAMA",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" },
                            },
                            {
                                field: "totalBpjs",
                                title: "JML",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" },
                            }
                        ]
                    },
                     {
                                field: "totalAll",
                                title: "TOTAL",
                                width: "60px",
                                headerAttributes: { style: "text-align : center" }
                    },
                  
                    
                ]
            });
            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

            //fungsi clear kriteria search
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.CariLapPendapatanPoli();
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
            manageTataRekening.getDataTableTransaksi("laporan/get-data-combo-laporan", false).then(function (data) {
                $scope.listRuangan = data.data.ruangan;
                $scope.listKelompokPasien = data.data.kelompokpasien;
                $scope.listKelas = data.data.kelas;
                $scope.listKamar = data.data.kamar;
                $scope.listMutasi =
                    [{ id: 1, namamutasi: "MASUK" },
                    { id: 2, namamutasi: "KELUAR" },
                    { id: 3, namamutasi: "DIPINDAHKAN" },
                    { id: 4, namamutasi: "PINDAHAN" },
                    { id: 5, namamutasi: "MENINGAL" }
                    ];

            })

            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.departement.ruangan
            }
            //sdm service hanya sementara, nanti harus diganti pake service kasir !!
            ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
                $scope.listPegawai = dat.data;
            });



            $scope.tglPelayanan = $scope.item.pelayanan;
            $scope.dokter = $scope.item.namaPegawai;

            $scope.listDataFormat = [

                {
                    "id": 1, "format": "pdf"
                },
                {
                    "id": 2, "format": "xls"
                }

            ]


            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

            //Tanggal Default
            $scope.item.tglawal = tanggals + " 00:00";
            $scope.item.tglakhir = tanggals + " 15:00";

            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;
            $scope.pegawai = modelItemAkuntansi.getPegawai();

            $scope.Cetak = function () {

                var daftarCetak = [];
                if ($scope.selectedData.length > 0) {
                    $scope.selectedData.forEach(function (items) {
                        daftarCetak.push(items)
                    })
                    var resultCetak = daftarCetak.map(a => a.noregistrasi).join("|");
                } else {
                    var resultCetak = "";
                }
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                if ($scope.item.tglawal == $scope.tglawal)
                    var tglawal = $scope.item.tglawal;
                else
                    var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
                if ($scope.item.tglakhir == $scope.tglakhir)
                    var tglakhir = $scope.item.tglakhir;
                else
                    var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

                // if ($scope.item.KelompokPasien == undefined)
                //     var kelompokPasien = "";
                // else
                //     var kelompokPasien = $scope.item.KelompokPasien.id;
                if ($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;
                if ($scope.item.departement == undefined)
                    var departement = "";
                else
                    var departement = $scope.item.departement.id;
                if ($scope.item.kelas == undefined)
                    var kelas = "";
                else
                    var kelas = $scope.item.kelas.id;
                // if ($scope.item.namaPegawai == undefined)
                //     var namaPegawai = "";
                // else
                //     var namaPegawai = $scope.item.namaPegawai.id;
                var stt = 'false'
                if (confirm('View Laporan Pendapatan Per Kelas? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatan-perkelas=1&tglAwal='
                    + tglawal + '&tglAkhir=' + tglakhir + '&strNoReg=' + resultCetak + '&strIdDepartemen=' + departement
                    + '&strIdRuangan=' + ruangan + '&strIdKelas=' + kelas + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {
                        // do something with response
                    });
            };




        }
    ]);
});