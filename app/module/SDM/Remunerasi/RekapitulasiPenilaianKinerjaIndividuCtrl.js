define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapitulasiPenilaianKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.rupiahFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            $scope.optGrid = {
                toolbar: [{
                    text: "export",
                    name: "Export detail",
                    template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "unitKerja",
                    title: "<h3>Unit Kerja</h3>",
                    width: 200,
                }, {
                    field: "subunitKerja",
                    title: "<h3>Sub Unit Kerja</h3>",
                    width: 200
                }, {
                    field: "namaLengkap",
                    title: "<h3>Nama Pegawai</h3>",
                    width: 200,
                }, {
                    title: "<h3>Kuantitas</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotKuantitas",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilKuantitas",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    title: "<h3>Kualitas</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotKualitas",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilKualitas",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    title: "<h3>Perilaku</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotPerilaku",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilPerilaku",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    field: "iki",
                    title: "<h3>IKI</h3>",
                    width: 50,
                }, {
                    field: "kriteria",
                    title: "<h3>Kriteria</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: center;"
                    }
                }, {
                    field: "p1",
                    title: "<h3>P1</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    template: "<span>{{rupiahFormatter.format('#= p1 #')}}</span>"
                }, {
                    field: "p2",
                    title: "<h3>P2</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    template: "<span>{{rupiahFormatter.format('#= p2 #')}}</span>"
                },]
            }

            $scope.getData = () => {
                $scope.isRouteLoading = true;

                if (!$scope.item.bulan) {
                    toastr.warning("Silakan pilih bulan terlebih dahulu", "Peringatan")

                    $scope.isRouteLoading = false;
                    return
                }

                if (!$scope.item.unitKerja) {
                    toastr.warning("Silakan pilih unit kerja terlebih dahulu", "Peringatan")

                    $scope.isRouteLoading = false;
                    return
                }

                if (!$scope.item.subUnitKerja) {
                    toastr.warning("Silakan pilih subunit kerja terlebih dahulu", "Peringatan")

                    $scope.isRouteLoading = false;
                    return
                }

                let bulan = dateHelper.toTimeStamp($scope.item.bulan)
                ManageSdmNew.getListData(`iki-remunerasi/get-rekap-penilaian-kinerja-individu?bulan=${bulan}&unitKerjaId=${$scope.item.unitKerja.id}&subunitKerjaId=${$scope.item.subUnitKerja.id}&pegawaiId=${$scope.item.pegawai ? $scope.item.pegawai.id : ""}`).then((res) => {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    });

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                })
            }

            let init = () => {
                ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled,id&values=true,!0&order=name:asc").then((res) => {
                    $scope.listOfUnitKerja = res.data;
                })

                ManageSdmNew.getListData(`iki-remunerasi/pegawai-remun-unit-kerja?unitKerjaId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&subunitKerjaId=${$scope.item.subUnitKerja ? $scope.item.subUnitKerja.id : ""}`).then((res) => {
                    $scope.listOfPegawai = res.data.data;
                })
            }

            init();

            $scope.getSubUnitKerja = (id) => {
                $scope.item.subUnitKerja = undefined
                ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,id,unitKerjaId&values=true,!0," + id + "&order=name:asc").then((res) => {
                    $scope.listOfSubUnitKerja = res.data;
                })

                $scope.item.pegawai = undefined
                $scope.listOfPegawai = []
                ManageSdmNew.getListData(`iki-remunerasi/pegawai-remun-unit-kerja?unitKerjaId=${id}&subunitKerjaId=${$scope.item.subUnitKerja ? $scope.item.subUnitKerja.id : ""}`).then((res) => {
                    $scope.listOfPegawai = res.data.data;
                })
            }

            $scope.getPegawai = (id) => {
                $scope.item.pegawai = undefined
                $scope.listOfPegawai = []
                ManageSdmNew.getListData(`iki-remunerasi/pegawai-remun-unit-kerja?unitKerjaId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&subunitKerjaId=${id}`).then((res) => {
                    $scope.listOfPegawai = res.data.data;
                })
            }

            $scope.exportExcel = function () {
                let unitKerja = $scope.item.unitKerja ? $scope.item.unitKerja.name : undefined;
                let subunitKerja = $scope.item.subUnitKerja ? $scope.item.subUnitKerja.name : undefined;
                let bulan = dateHelper.toMonth(new Date($scope.item.bulan).getMonth());
                let tahun = new Date($scope.item.bulan).getFullYear();
                let periode = new Date($scope.item.bulan).getFullYear() + '-' + ("0" + (new Date($scope.item.bulan).getMonth() + 1)).slice(-2); 
                // console.log(periode)
                let tempDataExport = [];
                let rows = []

                tempDataExport = $scope.dataSource;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    // console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                // { value: data[i].unitKerja },
                                // { value: data[i].subunitKerja },
                                { value: data[i].namaLengkap },
                                { value: data[i].bobotKuantitas },
                                { value: data[i].hasilKuantitas },
                                { value: data[i].bobotKualitas },
                                { value: data[i].hasilKualitas },
                                { value: data[i].bobotPerilaku },
                                { value: data[i].hasilPerilaku },
                                { value: data[i].iki },
                                { value: data[i].kriteria },
                                { value: data[i].p1 },
                                { value: data[i].p2 },
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            mergedCells: [
                                // "A1:K1", "L1:M1", "A2:A3", "B2:B3", "C2:C3", "D2:E2", "F2:G2", "H2:I2", "J2:J3", "K2:K3", "L2:L3", "M2:M3"
                                "A1:K1", "A2:K2", "A3:K3", "A4:A5", "B4:C4", "D4:E4", "F4:G4", "H4:H5", "I4:I5", "J4:J5", "K4:K5"
                            ],
                            // Column settings (width)
                            columns: [{
                                width: 400
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
                            }, {
                                width: 40
                            }, {
                                width: 200
                            }, {
                                width: 130
                            }, {
                                width: 130
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            // }, {
                            //     autoWidth: true
                            }],
                            // Title of the sheet
                            // title: "Rekapitulasi Penilaian Kinerja Individu",
                            // Rows of the sheet
                            rows: [{
                                cells: [{
                                    value: "Periode " + bulan + " " + tahun,
                                    fontSize: 14,
                                    textAlign: "left"
                                }],
                            }, {
                                cells: [{
                                    value: unitKerja + (subunitKerja ? " (" + subunitKerja + ")" : ""),
                                    fontSize: 14,
                                    textAlign: "left"
                                }],
                            }, {
                                cells: [{
                                    value: `${dateHelper.formatDate(new Date(), "DD-MM-YYYY HH:MM:SS")}`,
                                    fontSize: 10,
                                    textAlign: "right"
                                    // index: 11,
                                }],
                            }, {
                                cells: [{
                                //     value: "Unit Kerja",
                                //     textAlign: "center",
                                //     verticalAlign: "center",
                                //     background: "#d3e0ea",
                                //     borderRight: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     },
                                //     borderTop: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     },
                                //     borderLeft: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     },
                                //     borderBottom: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     }
                                // }, {
                                //     value: "Sub Unit Kerja",
                                //     textAlign: "center",
                                //     verticalAlign: "center",
                                //     background: "#d3e0ea",
                                //     borderRight: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     },
                                //     borderTop: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     },
                                //     borderLeft: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     },
                                //     borderBottom: {
                                //         color: "#f2f2f2f",
                                //         size: 1
                                //     }
                                // }, {
                                    value: "Nama Pegawai",
                                    textAlign: "center",
                                    verticalAlign: "center"
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Kuantitas",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 1,
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Kualitas",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 3
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Perilaku",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 5
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "IKI",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 7
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Kriteria",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 8
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "P1",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 9
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "P2",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 10
                                    // background: "#d3e0ea",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }]
                            }, {
                                cells: [{
                                    value: "Bobot (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 1
                                    // background: "#1687a7",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Hasil (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 2
                                    // background: "#1687a7",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Bobot (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 3
                                    // background: "#1687a7",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Hasil (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 4
                                    // background: "#1687a7",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Bobot (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 5
                                    // background: "#1687a7",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }, {
                                    value: "Hasil (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 6
                                    // background: "#1687a7",
                                    // borderRight: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderTop: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderLeft: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // },
                                    // borderBottom: {
                                    //     color: "#f2f2f2f",
                                    //     size: 1
                                    // }
                                }]
                            }, ...rows]
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ 
                        dataURI: workbook.toDataURL(), 
                        fileName: "Rekap Penilaian Kinerja Individu " + unitKerja + (subunitKerja ? " (" + subunitKerja + ")" : "") + " Periode " + periode + ".xlsx" 
                    });
                });

            }
        }
    ])
});