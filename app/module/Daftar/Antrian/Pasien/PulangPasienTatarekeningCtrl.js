define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PulangPasienTatarekeningCtrl', ['$interval', 'SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', 'CetakHelper',
        function($interval, saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien, cetakHelper) {
            $scope.isRouteLoading = true;
            $scope.title = "ini page pencarian pasien";
            $scope.kodeRuangan = $state.params.kodeRuangan;
            $scope.tglhariIni = " ";

            var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            if (pegawai.ruangan !== undefined)
                $scope.validasiruangan = pegawai.ruangan.departemenId

            if ($scope.kodeRuangan === undefined) {
                window.byPassId = $state.params.id;
                $scope.kodeRuangan = $state.params.id
                $scope.namaRuangan = $state.params.nama;
            } else {
                window.byPassId = undefined;
            }
            $scope.isDokter = false;
            var statusCode = ModelItem.getStatusUser();
            if(statusCode === "suster"){
                $scope.isDokter=false;
                $scope.ruanganDokter=true;
            }else{
                $scope.isDokter=true;
                $scope.ruanganDokter=false;
            }
            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            $scope.PAPIGD = false;
            $scope.PAP = false;
            $scope.statusPegawai = ModelItem.getPegawai().ruangan.id;
            if($scope.statusPegawai===36){
                debugger;
                $scope.isPAPIGD = true;
            }else{
                $scope.isPAP = true;
            }

            $scope.isLoading = false;
            $interval(function() {
                $scope.tglhariIni = new Date();
            }, 1000)
            $scope.isCalling = false;
            
            // findPasien.getRuanganRI().then(function(e) {
            //     $scope.ruanganRI = e.data.data;
            // });

            $scope.ruangans = ModelItem.kendoHttpSource('/ruangan/get-all-ruangan-rawat-inap');
            $scope.ruangans.fetch(function() {
                var data = [];
                for (var key in this._data) {
                    if (this._data.hasOwnProperty(key)) {
                        var element = this._data[key];
                        if (element.departemenId !== undefined) {
                            if (element.departemenId === 18)
                                element.group = "Poliklinik";
                            else
                                element.group = "Penunjang";
                            data.push(element);
                        }
                    }
                }
                var temp = [];
                for (var key in _.groupBy(data, 'group')) {
                    if (_.groupBy(data, 'group').hasOwnProperty(key)) {
                        var element = _.groupBy(data, 'group')[key];
                        temp.push({ key: key, items: element });
                    }
                }
                $scope.ruangansLocal = temp;

                $scope.$apply();
            });
            $scope.nav = function(item) {
                $state.go('antrianPasien', { id: item.id, nama: item.namaRuangan });
            }
            if ($state.current.name === 'LaporanKonselingFind' || $state.current.name === 'PelayananIVAdmixtureFind' || $state.current.name === 'PelayananHandlingCytotoxicFind' || $state.current.name === 'PelayananTPNFind' || $state.current.name === 'dashboardpasien.InformasiIbu.findPasienTerdaftar') {
                $scope.isCalling = true;
            }
            if ($scope.isCalling === true) {
                $scope.$on("kendoWidgetCreated", function(event, widget) {
                    if (widget === $scope.grid) {
                        $scope.grid.element.on('dblclick', function(e) {
                            if ($state.current.name === 'PelayananHandlingCytotoxicFind') {
                                $state.go('PelayananHandlingCytotoxicDetail', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'PelayananIVAdmixtureFind') {
                                $state.go('PelayananIVAdmixtureDetail', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'PelayananTPNFind') {
                                $state.go('PelayananTPNDetail', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'LaporanKonselingFind') {
                                $state.go('LaporanKonselingDetailCtrl', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'dashboardpasien.InformasiIbu.findPasienTerdaftar') {
                                $rootScope.tempPasien = $scope.item;

                                $state.go('dashboardpasien.InformasiIbu', {
                                    noCM: $scope.noCM,
                                    tanggal: $state.params.tanggal,
                                    noRec: $state.params.noRec,
                                    noCmIbu: $rootScope.tempPasien.pasien.noCm,
                                    terdaftar: $rootScope.tempPasien.ruangan.id
                                });
                            }

                        });
                    }
                });
            }
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.group = {
                field: "ruangan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "pasien",
                aggregate: "count"
            }, {
                field: "ruangan.namaRuangan",
                aggregate: "count"
            }]
            $scope.Column = [{
                field: "noAntrian",
                title: "No.",
                width: 50,
                aggregates: ["count"]
            }, {
                title: "Registrasi",
                columns: [{
                    field: "pasienDaftar.tglRegistrasi",
                    title: "Tanggal",
                    template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY') #"
                }, {
                    field: "pasienDaftar.tglRegistrasi",
                    title: "Jam",
                    template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('HH:mm') #"
                }]
            },{
                field: "pasien.namaPasien",
                title: "Nama Pasien",
                aggregates: ["count"]
            }, {
                field: "pasien.noCm",
                title: "No. Rekam Medis",
                aggregates: ["count"]
            }, {
                field: "pasien.umur",
                title: "Umur",
                aggregates: ["count"]
            }, {
                field: "dokter",
                title: "Dokter",
                aggregates: ["count"]
            }, {
                field: "jenisKelamin",
                title: "Jenis Kelamin",
                aggregates: ["count"]
            }, {
                field: "kelompokPasien",
                title: "Tipe Pembayaran",
                aggregates: ["count"]
            }, {
                field: "kelas.namaKelas",
                title: "Kelas",
                aggregates: ["count"]
            }, {
                field: "statusAntrian",
                title: "Status",
                aggregates: ["count"]
            }, {
                hidden: true,
                field: "ruangan.namaRuangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            var arrFieldSelectVoPekerjaan = ['id', 'namaRuangan'];
            // ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
            //     $scope.ruangans = data;
            // });

            $scope.findData = function() {
                $scope.isRouteLoading = true;
                var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
                if ($scope.noCm === undefined) $scope.noCm = '';
                if ($scope.namaPasien === undefined) $scope.namaPasien = '';
                if (!$scope.from || !$scope.until) {$scope.from = '';$scope.until = ''};
                if (!$scope.ruangan) {
                    $scope.ruangan="";
                }else{
                    $scope.ruangan=$scope.ruangan.id;
                }
                $scope.isLoading === true
                findPasien.findQueueTatarekening('', '', $scope.ruangan, $scope.namaPasien).then(function(e) {
                // findPasien.findQueueInap($scope.from, $scope.until, $scope.ruangan, $scope.namaPasien, pegawai).then(function(e) {
                    debugger;
                    $scope.isRouteLoading = false;
                    $scope.isLoading === false
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            if (element.kelas === undefined)
                                element.kelas = { namaKelas: "Non Kelas" };
                                $scope.ruangana = element.ruangan.id;
                            data.push(element);
                        }
                    }
                    $scope.listRuanganTujuans = _.filter(e.data.data, function(e) {
                    return e.ruangan === "36";
                    });
                /*$scope.ruanganapa = $scope.listRuanganTujuan = $scope.listRuanganTujuans[0].id === "36"; */

                    $scope.listPasien = data;
                    $scope.patienGrids = new kendo.data.DataSource({
                        data: $scope.listPasien,
                        group: $scope.group,
                        pageSize: 20,
                        aggregate: $scope.aggregates
                    });
                    debugger;
                    if ($scope.kodeRuangan !== undefined) {
                            debugger;
                        // $scope.listPasien.then(function(e) {
                        $scope.listPatients = $scope.listPasien;
                        $scope.patienGrids = new kendo.data.DataSource({
                            data: $scope.listPatients,
                            group: $scope.group
                        });
                        $scope.listQueue = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "MENUNGGU"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });
                        $scope.listCallingUser = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "DIPANGGIL_SUSTER"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });

                        $scope.listCallingDoctor = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "DIPANGGIL_DOKTER"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });

                        $scope.listCallingDone = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "SELESAI_DIPERIKSA"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });
                        // var listQueue = _.filter(e.data.data, {
                        //     "statusAntrian": "DIPANGGIL_SUSTER"
                        // });
                        // $scope.sumSuster = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                        // $scope.ruanganSuster = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                        // listQueue = _.filter(e.data.data, {
                        //     "statusAntrian": "DIPANGGIL_DOKTER"
                        // });
                        // $scope.sumDokter = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                        // $scope.ruanganDokter = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                        // listQueue = _.filter(e.data.data, {
                        //     "statusAntrian": "SELESAI_DIPERIKSA"
                        // });
                        // $scope.sumSelesai = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                        // $scope.ruanganSelesai = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                        // });

                    }
                })

            }
            $scope.findData();
            // socket.on('DaftarAntrian', function(data) {
            //     $scope.findData();
            // });
            // socket.on('DaftarAntrianLaboratorium', function(data) {
            //     if ($scope.isLoading === false)
            //         $scope.findData();
            // });
            // socket.on('DashboardLaboratorium', function(data) {
            //     if ($scope.isLoading === false)
            //         $scope.findData();
            // });

            $scope.pasienPulang = function() {
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pasienPulangTatarekening', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec,
                            noRecPasienDaftar: $scope.item.pasienDaftar.noRec
                        });
                    } else {
                        $state.go('dashboardpasien.pasienPulangTatarekening', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec,
                            noRecPasienDaftar: $scope.item.pasienDaftar.noRec
                        });
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
            }

            $scope.cekStatusBeforePemeriksaan = function(statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": true
                }
                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.status = true;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien harus di panggil dokter terlebih dahulu";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                }

                return obj;
            }

            $scope.cekStatusBeforePanggil = function(statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": false,
                    "statusAntrian": 0
                }

                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien sudah di panggil suster";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.status = true;
                                obj.statusAntrian = 1;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                obj.statusAntrian = 2;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                }
                return obj;
            }
        }
    ]);
});