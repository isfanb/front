define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianDokterRanapCtrl', ['SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', '$mdDialog', '$window', 'CetakHelper', 'ManageSarprasPhp','CacheHelper', '$q', 
        function(saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, DateHelper, socket, managePasien, $mdDialog, window, cetakHelper, manageSarprasPhp, cacheHelper, $q) {            
            $scope.dataVOloaded = true;
            $scope.lengthKonsul = 0;
            $scope.now = new Date();
            $scope.item = {};
            $scope.itema = {};
            $scope.item.periodeAwal =  new Date();
            $scope.item.periodeAkhir = new Date();            
            $scope.item = {};
            $scope.isRouteLoading=false;
            $rootScope.isOpen = true;
            $scope.cboUbahDokter= true;
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            // $scope.isRouteLoading = true;
            // $scope.title = "ini page pencarian pasien";
            // $scope.kodeRuangan = $state.params.kodeRuangan;
            // $scope.isCalling = false;
            $scope.pegawai = ModelItem.getPegawai();
            loadCombo()
            loadData()
            // loadData()
            loadKonsul();
            function loadKonsul() {
                manageSarprasPhp.getDataTableTransaksi("rekam-medis/get-order-konsul?dokterid=" + $scope.dataLogin.id).then(function (e) {
                    var res = e.data.data
                    for (var i = res.length - 1; i >= 0; i--) {
                        if (res[i].norec_apd != null)
                            res.splice([i], 1)
                    }
                    if (res.length > 0) {
                        $scope.showNotif = true
                        $scope.lengthKonsul = res.length;
                    } else
                        $scope.showNotif = false

                })
            }

            $scope.konsulOpt = {

                pageable: true,
                scrollable: true,
                columns: [
                    // { field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
                    { field: "no", title: "No", width: 40, headerAttributes: { style: "text-align : center" } },
                    { field: "noregistrasi", title: "No Registrasi", width: 100, headerAttributes: { style: "text-align : center" } },
                    { field: "nocm", title: "No RM", width: 80, headerAttributes: { style: "text-align : center" } },
                    { field: "namapasien", title: "Nama Pasien", width: 150, headerAttributes: { style: "text-align : center" } },
                    { field: "tglorder", title: "Tanggal", width: 120, headerAttributes: { style: "text-align : center" } },
                    { field: "ruanganasal", title: "Ruangan Asal", width: 120, headerAttributes: { style: "text-align : center" } },
                    { field: "ruangantujuan", title: "Ruangan Tujuan", width: 150, headerAttributes: { style: "text-align : center" } },
                    { field: "pengonsul", title: "Dokter<br> Pengonsul", width: 120, headerAttributes: { style: "text-align : center" } },
                    // { field: "keteranganorder", title: "Keterangan", width: 120, headerAttributes: { style: "text-align : center" }},
                    { field: "status", title: "Status", width: 120, headerAttributes: { style: "text-align : center" } },
                    { command: [{ name: "edit", text: "Verifikasi", click: verif }], title: "&nbsp;", width: 120 }
                ],
            };
            
            function verif(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (dataItem.status == 'Selesai') {
                    $scope.isVerify = true;
                } else {
                    $scope.isVerify = false;
                }
                $scope.item.jeniskonsultasi = dataItem.jeniskonsultasi;
                $scope.item.dokterPengonsul = dataItem.pengonsul;
                $scope.item.keteranganOrder = dataItem.keteranganorder;
                $scope.item.diagnosaKerja = dataItem.diagnosakerja;
                $scope.item.terapi = dataItem.terapi;
                $scope.item.diagnosa = dataItem.diagnosis;
                $scope.item.masalah = dataItem.masalah;
                $scope.item.saran = dataItem.saran;
                $scope.kelasfk = dataItem.kelasfk;
                $scope.item.periksaDidapatkan = dataItem.pemeriksaandidapat;
                $scope.item.kesan = dataItem.keterangankeperluan;
                $scope.statusKonsultasi = dataItem.status;
                $scope.noRecKonsultasi = dataItem.norec;
                $scope.noRecPdKonsultasi = dataItem.norec_pd;
                $scope.pegawaiFkKonsultasi = dataItem.pegawaifk;
                $scope.objectRuanganFkTujuanKonsultasi = dataItem.objectruangantujuanfk;
                $scope.objectRuanganFkKonsultasi = dataItem.objectruanganfk;
                $scope.winDescription.center().open();
            }

            function loadGridKonsul() {
                manageSarprasPhp.getDataTableTransaksi("rekam-medis/get-order-konsul?dokterid=" + $scope.dataLogin.id).then(function (e) {
                    var result = e.data.data
                    if (result.length > 0) {
                        $scope.item.dokterTujuan = result[0].namalengkap
                        for (var i = 0; i < result.length; i++) {
                            result[i].no = i + 1
                            if (result[i].norec_apd != null)
                                result[i].status = 'Selesai'
                            else
                                result[i].status = '-'
                        }
                    }
                    $scope.sourceKonsul = new kendo.data.DataSource({
                        data: result,
                        pageSize: 20,
                    });
                }, (error) => {
                    throw error;
                })
            }

            $scope.verifikasiKonsultasiDokter = function () {
                var length = $scope.sourceKonsul._data.length + 1;
                var dataKonsul = {
                    "kelasfk": $scope.kelasfk,
                    "noantrian": length,
                    "norec_so": $scope.noRecKonsultasi,
                    "norec_pd": $scope.noRecPdKonsultasi,
                    "dokterfk": $scope.pegawaiFkKonsultasi,
                    "objectruangantujuanfk": $scope.objectRuanganFkTujuanKonsultasi,
                    "objectruanganasalfk": $scope.objectRuanganFkKonsultasi,
                    "periksaDidapatkan": $scope.item.periksaDidapatkan,
                    "pemeriksaandidapat": $scope.item.periksaDidapatkan,
                    "keterangankeperluan": $scope.item.kesan,
                    "saran": $scope.item.saran,
                    "diagnosis": $scope.item.diagnosa
                }
                console.log(dataKonsul);
                manageSarprasPhp.saveDataTransaksi('rekam-medis/save-konsul-from-order', dataKonsul).then(function (e) {
                    $scope.winDescription.close();
                    $scope.winKonsul.close();
                    loadGridKonsul();
                    loadData();
                    loadKonsul();
                });
            }
            $scope.konsul = function () {
                loadGridKonsul();
                $scope.winKonsul.center().open();
            }

            $scope.cetakSEPPasien = () => {
                console.log($scope.item);
                if(!$scope.item.norec_pd) {
                    toastr.info("Harap pilih Pasien!");
                    return;
                }

                if($scope.item.kelompokpasien !== "BPJS") {
                    toastr.info("Bukan Pasien BPJS!");
                    return;
                }

                window.open("http://172.16.44.33:7777/service-reporting/cetak-sep/" + $scope.item.norec_pd, "_blank", "fullscreen=yes");
            }

            $scope.SearchEnter = function () {
                loadData()
            }

            function loadCombo(){
                var chacePeriode = cacheHelper.get('DaftarAntrianDokterRanapCtrl');
                if(chacePeriode != undefined){
                    //debugger;
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]); 
                    // $scope.item.tglpulang = new Date(arrPeriode[2]);                
                }else{
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;
                    // $scope.item.tglpulang = $scope.now;                 
                }
                manageSarprasPhp.getDataTableTransaksi("dokter/get-data-combo-dokter", false).then(function(data) {
                    $scope.listRuangan = data.data.ruanganRanap;
                });
            }

            function loadData(){
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

                var nocm =""
                if ($scope.itema.noCm != undefined){
                    var nocm ="&norm=" +$scope.itema.noCm
                }   
                var nama =""
                if ($scope.itema.namaPasien != undefined){
                    var nama ="&nama=" +$scope.itema.namaPasien
                }
                var noRegistrasi =""
                if ($scope.itema.noRegistrasi != undefined){
                    var noRegistrasi ="&noreg=" +$scope.itema.noRegistrasi
                }
                // var dokId=""
                // if ($scope.pegawai.id != undefined){
                //    var dokId = "&dokId=" +$scope.pegawai.id
                // }
                var ruangId=""
                if ($scope.itema.ruangan != undefined){
                   var ruangId = "&ruangId="+$scope.itema.ruangan.id
                }

                $q.all([
                   manageSarprasPhp.getDataTableTransaksi("dokter/get-daftar-antrian-ranap?"+
                    "&norm="+nocm+
                    "&noreg="+noRegistrasi+
                    "&nama="+nama
                    +ruangId),
                    ]).then(function(data) {
                    $scope.isRouteLoading = false;
                    var datas = data[0].data;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(DateHelper.formatDate(datas[i].tgllahir, "YYYY-MM-DD"));
                        var umurzz = DateHelper.CountAge(tanggalLahir, tanggal);
                        datas[i].umurzz = umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'
                    }
                        $scope.GridPasien = new kendo.data.DataSource({
                            data: datas,
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
                        var chacePeriode = tglAwal + "~" + tglAkhir;
                        cacheHelper.set('DaftarAntrianDokterRanapCtrl', chacePeriode);
                    });
            }

            $scope.klikGrid = function(item){
                loadCombo();
                // if (item != undefined) {
                //     $scope.item.namadokter = {id:item.objectpegawaifk,namalengkap:item.namadokter}
                // }
            }
            
            $scope.group = {
                field: "namaruangan",
                aggregates: [
                // {
                //     field: "pasien",
                //     aggregate: "count"
                // }, 
                {
                    field: "namaruangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [
            // {
            //     field: "pasien",
            //     aggregate: "count"
            // }, 
            {
                field: "namaruangan",
                aggregate: "count"
            }]
            $scope.ColumnPasien = [
            {
                "field":"no",
                "title":"No",
                "width":"20px",
            },
            {
                "field":"tglregistrasi",
                "title":"Tgl Registrasi",
                // "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                "width":"80px"
            }, 
            {
                "field":"noregistrasi",
                "title":"No Registrasi",
                "width":"60px"
            },
            {
                "field":"nocm",
                "title":"No. Rekam Medis",
                "width":"60px"               
            },
            {
                "field":"namapasien",
                "title":"Nama Pasien",
                "width":"160px"
            },
            {
                "field":"umurzz",
                "title":"Umur",
                "width":"80px"      
            }, 
            // {
            //     "field":"namadokter",
            //     "title":"Dokter",
            //     "width":"100px"     
            // },  
            {
                "field": "jeniskelamin",
                "title": "Jenis Kelamin",
                "width":"80px"
            },
            {
                "field": "kelompokpasien",
                "title": "Tipe Pembayaran",
                "width":"80px"
            }, 
            // {
            //     field: "statusAntrian",
            //     title: "Status",
            //     aggregates: ["count"]
            // }, 
            {
                hidden: true,
                field: "namaruangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

            $scope.optGrid = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                }
            }

            $scope.diagnosaICD10 = function() {
                debugger;
                // $state.go('RiwayatRegistrasi3', {
                //     nocm: $scope.item.nocm,
                //     noregistrasi: $scope.item.noregistrasi
                // });
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.item.nocm ,
                    1 : $scope.item.namapasien,
                    2 : $scope.item.jeniskelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umurzz,
                    5 : $scope.item.kelompokpasien,
                    6 : $scope.item.tglregistrasi,
                    7 : $scope.item.norec_apd,
                    8 : $scope.item.norec_pd,
                    9 : $scope.item.idkelas,
                    10 : $scope.item.namakelas,
                    11 : $scope.item.objectruanganfk,
                    12 : $scope.item.namaruangan
                }
                cacheHelper.set('DiagnosaDokterCtrl', arrStr);
                $state.go('DiagnosaDokter')
            }
            $scope.diagnosaICD9 = function() {
                debugger;
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                var arrStr ={ 0 : $scope.item.nocm ,
                    1 : $scope.item.namapasien,
                    2 : $scope.item.jeniskelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umurzz,
                    5 : $scope.item.kelompokpasien,
                    6 : $scope.item.tglregistrasi,
                    7 : $scope.item.norec_apd,
                    8 : $scope.item.norec_pd,
                    9 : $scope.item.idkelas,
                    10 : $scope.item.namakelas,
                    11 : $scope.item.objectruanganfk,
                    12 : $scope.item.namaruangan
                }
                cacheHelper.set('DiagnosaDokterICD9Ctrl', arrStr);
                $state.go('DiagnosaDokterICD9')
            }
              $scope.showInputDiagnosaDokter=function(){
                 if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.item.nocm ,
                    1 : $scope.item.namapasien,
                    2 : $scope.item.jeniskelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umurzz,
                    5 : $scope.item.kelompokpasien,
                    6 : $scope.item.tglregistrasi,
                    7 : $scope.item.norec_apd,
                    8 : $scope.item.norec_pd,
                    9 : $scope.item.idkelas,
                    10 : $scope.item.namakelas,
                    11 : $scope.item.objectruanganfk,
                    12 : $scope.item.namaruangan 
                }
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')

            }
            $scope.rekamMedisElektronik=function(){
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                  {
                       window.messageContainer.error("Pilih Dahulu Pasien!")
                       return
                   }
               // debugger;
               var arrStr ={ 0 : $scope.item.nocm ,
                   1 : $scope.item.namapasien,
                   2 : $scope.item.jeniskelamin,
                   3 : $scope.item.noregistrasi, 
                   4 : $scope.item.umurzz,
                   5 : $scope.item.kelompokpasien,
                   6 : $scope.item.tglregistrasi,
                   7 : $scope.item.norec_apd,
                   8 : $scope.item.norec_pd,
                   9 : $scope.item.idkelas,
                   10 : $scope.item.namakelas,
                   11 : $scope.item.objectruanganfk,
                   12 : $scope.item.namaruangan + '`'
               }
               cacheHelper.set('cacheRMelektronik', arrStr);
               $state.go('RekamMedis',{
                noRec: $scope.item.norec_apd
               })

           }

            $scope.resep = function() {
                debugger;
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.item.nocm ,
                    1 : $scope.item.namapasien,
                    2 : $scope.item.jeniskelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umurzz,
                    5 : $scope.item.kelompokpasien,
                    6 : $scope.item.tglregistrasi,
                    7 : $scope.item.norec_apd,
                    8 : $scope.item.norec_pd,
                    9 : $scope.item.idkelas,
                    10 : $scope.item.namakelas,
                    11 : $scope.item.objectruanganfk,
                    12 : $scope.item.namaruangan
                }
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }

            $scope.laboratorium = function() {
                debugger;
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.item.nocm ,
                    1 : $scope.item.namapasien,
                    2 : $scope.item.jeniskelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umurzz,
                    5 : $scope.item.kelompokpasien,
                    6 : $scope.item.tglregistrasi,
                    7 : $scope.item.norec_apd,
                    8 : $scope.item.norec_pd,
                    9 : $scope.item.idkelas,
                    10 : $scope.item.namakelas,
                    11 : $scope.item.objectruanganfk,
                    12 : $scope.item.namaruangan
                }
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }

            $scope.radiologi = function() {
                debugger;
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.item.nocm ,
                    1 : $scope.item.namapasien,
                    2 : $scope.item.jeniskelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umurzz,
                    5 : $scope.item.kelompokpasien,
                    6 : $scope.item.tglregistrasi,
                    7 : $scope.item.norec_apd,
                    8 : $scope.item.norec_pd,
                    9 : $scope.item.idkelas,
                    10 : $scope.item.namakelas,
                    11 : $scope.item.objectruanganfk,
                    12 : $scope.item.namaruangan
                }
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }

            $scope.inputTindakanDokter = function() {
                debugger;
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.item.nocm ,
                    1 : $scope.item.namapasien,
                    2 : $scope.item.jeniskelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umurzz,
                    5 : $scope.item.kelompokpasien,
                    6 : $scope.item.tglregistrasi,
                    7 : $scope.item.norec_apd,
                    8 : $scope.item.norec_pd,
                    9 : $scope.item.idkelas,
                    10 : $scope.item.namakelas,
                    11 : $scope.item.objectruanganfk,
                    12 : $scope.item.namaruangan
                }
                // cacheHelper.set('inputTindakanDokterRevCtrl', arrStr);
                // $state.go('inputTindakanDokterRev')
                 $state.go('InputTindakanPelayananDokterRev',{
                        norecPD:$scope.item.norec_pd,
                        norecAPD: $scope.item.norec_apd,
                      
                    });
            }
            $scope.detailOrder = function() {
                debugger;
                if ($scope.item.nocm ==null && $scope.item.norec_apd == null){
                    window.messageContainer.error("Pilih Dahulu Pasien!")
                    return
                }else{
                    $state.go('dashboardpasien.BillingDetail', {
                        noRecRegistrasi: $scope.item.norec_pd,
                        noRec: $scope.item.norec_apd
                    });
                }
                
            }
            $scope.Monitoring = function() {
                $state.go('MonitoringPasien', { 
                    noCm: $scope.item.nocm 
                });
            }

            $scope.PengkajianAwal = function(){
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.DashboardPAP', {
                            noCM: $scope.item.nocm,
                            tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.norec_apd,
                            ruangana: $scope.item.objectruanganfk
                        });
                    // } else {
                    //     $state.go('dashboardpasien.DashboardPAP', {
                    //         noCM: $scope.item.nocm,
                    //         tanggal: moment(new Date($scope.item.nocm .tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    //         noRec: $scope.item.noRec,
                    //         ruangana:$scope.item.ruangan.id
                    //     });
                    // }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }

            $scope.PengkajianMedis = function(){
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.PengkajianMedis', {
                            noCM: $scope.item.nocm,
                            tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.norec_apd,
                            ruangana: $scope.item.objectruanganfk
                        });
                    // } else {
                //         $state.go('dashboardpasien.PengkajianMedis', {
                //             noCM: $scope.item.pasien.noCm,
                //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                //             noRec: $scope.item.noRec,
                //             ruangana:$scope.item.ruangan.id
                //         });
                //     }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }

            // $scope.detailOrder = function() {
                
            //     $state.go('dashboardpasien.BillingDetail', {
            //         noRecRegistrasi: $scope.item.norec_pd,
            //         noRec: $scope.item.norec_apd
            //     });
            // }

            $scope.detailPasien = function() {
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pasien', {
                            noCM: $scope.item.nocm,
                            tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec:  $scope.item.norec_apd
                        });
                //     } else {
                //         $state.go('dashboardpasien.pasien', {
                //             noCM: $scope.item.pasien.noCm,
                //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                //             noRec: $scope.item.noRec
                //         });
                //     }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }

            $scope.PengkajianLanjutan = function() {                
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pengkajianLanjutan', {
                            noCM: $scope.item.nocm,
                            tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.norec_apd,
                            ruangana: $scope.item.objectruanganfk
                        });
                //     } else {
                //         $state.go('dashboardpasien.pengkajianLanjutan', {
                //             noCM: $scope.item.pasien.noCm,
                //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                //             noRec: $scope.item.noRec,
                //             ruangana:$scope.item.ruangan.id
                //         });
                //     }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }

            // var arrFieldSelectVoPekerjaan = ['id', 'namaRuangan'];
            // ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
            //     $scope.ruangans = data;
            // });

            $scope.findData = function() {
               loadData()
            }
                
            $scope.pemeriksaanPasien = function() {
                var cookie = document.cookie.split(';');

                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec
                        });
                    } else {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec
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

            $scope.UbahDokter = function(item, data) {
                if (data === undefined)
                    data = $scope.item;

                $scope.item = data;
                manageSarprasPhp.getDataTableTransaksi("pasien/get-dokters-combos", false).then(function(data) {
                    $scope.listDokter = data.data.dokter;
                })
                // show popup untuk pilih dokter
                $scope.winDialogss.center().open();
            }
            $scope.simpanDokter = function(item, data) {
                var listRawRequired = [
                    "items.pilihDokter|k-ng-model|Dokter"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    // munculkan nama dokter di grid
                   // items.pilihDokter = data.data.dokter.namalengkap;

                    // save dokter yang dipilih
                    var tmpData = {
                        norec_apd: $scope.item.norec_apd,
                        iddokter: $scope.items.pilihDokter.id
                    }
                    manageSarprasPhp.updateDokters(tmpData).then(function(e){
                        // update status antrian
                        $scope.winDialogss.close();
                        loadData();
                        // $scope.findData(); 
                        $scope.items.pilihDokter='';
                       
                    });

                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
        
            $scope.cetakGelang = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.nocmfk);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }

            $scope.pemeriksaanUscom = function() {
                 if ($scope.item.namadokter == undefined) {
                    alert("Dokter Belum Dipilih!!");
                    return;
                    // $scope.cekDokter();
                } else {
                    $state.go('HasilPemeriksaanUscom', {
                        noRecRegistrasi: $scope.item.norec_pd,
                        noRec: $scope.item.norec_apd
                    });
                }
            }

            $scope.skriningGizi = function() {
                if ($scope.item.namadokter == undefined) {
                    alert("Dokter Belum Dipilih!!");
                    return;
                } else {
                    var cookie = document.cookie.split(';');
                    var statusCode = ModelItem.getStatusUser();
                    // var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                    // if (objValid.status) {
                        saveToWindow.setItemToWindowChace("isRawatInap", false);
                        cookie = cookie[0].split('=');
                        // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                            $state.go('DashboarSkriningGizi', {
                                noCM: $scope.item.nocm,
                                tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                                noRec: $scope.item.norec_apd,
                                ruangana: $scope.item.objectruanganfk
                            });
                    //     } else {
                    //         $state.go('DashboarSkriningGizi', {
                    //             noCM: $scope.item.pasien.noCm,
                    //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    //             noRec: $scope.item.noRec,
                    //             ruangana:$scope.item.ruangan.id
                    //         });
                    //     }
                    // } else {
                    //     window.messageContainer.error(objValid.msg);
                    // }
                }
            }

            $scope.observasi = function() {
                if ($scope.item.namadokter == undefined) {
                    alert("Dokter Belum Dipilih!!");
                    return;
                } else {
                    var cookie = document.cookie.split(';');
                    var statusCode = ModelItem.getStatusUser();
                    var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                    // if (objValid.status) {
                        saveToWindow.setItemToWindowChace("isRawatInap", false);
                        cookie = cookie[0].split('=');
                        // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                            $state.go('FormulirObservasiHarianTerintegrasiIntensiveCareUnit', {
                                noCM: $scope.item.nocm,
                                tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                                noRec: $scope.item.norec_apd,
                                ruangana: $scope.item.objectruanganfk
                            });
                    //     } else {
                    //         $state.go('FormulirObservasiHarianTerintegrasiIntensiveCareUnit', {
                    //             noCM: $scope.item.pasien.noCm,
                    //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    //             noRec: $scope.item.noRec,
                    //             noRecDaftar: $scope.item.pasienDaftar.noRec,
                    //             ruangana:$scope.item.ruangan.id
                    //         });
                    //     }
                    // } else {
                    //     window.messageContainer.error(objValid.msg);
                    // }
                }
            }
 
            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
               }
            }

            // edit data registrasi pasien
            $scope.cekStatusBeforeEdit = function(statusAntrian){
                var obj = {
                    "msg": "",
                    "status": true
                }
                
                switch (statusAntrian) {
                    case "DIPANGGIL_DOKTER":
                        obj.msg = "Pasien sudah di panggil dokter";
                        obj.status = false;
                        break;
                    case "DIPANGGIL_SUSTER":
                        obj.msg = "Pasien sudah di panggil dokter";
                        obj.status = false;
                        break;
                    case "MENUNGGU":
                        obj.status = true;
                        break;
                }
                return obj;
            }
            $scope.editRegistrasi = function(){
                // var objValid = $scope.cekStatusBeforeEdit($scope.item.statusAntrian);
                // if (objValid.status) {
                    $state.go('editRegistrasiPelayanan', {
                        noCm: $scope.item.pasien.noCm,
                        noRec: $scope.item.pasienDaftar.noRec
                    });
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }
            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            $scope.Detail = function(){
                if($scope.item.noregistrasi != undefined){
                    var obj = {
                        noRegistrasi : $scope.item.noregistrasi
                    }

                    $state.go('RincianTagihanTataRekening', {
                        dataPasien: JSON.stringify(obj)
                    });
                }else{
                    toastr.error('Data belum dipilih','Info');
                }
            }
            $scope.TransaksiLayanan = function(){
                // debugger;
                if ($scope.item.norec_apd == undefined) {
                    toastr.error('Pilih Pasien dulu','Info');
                    return
                }else{
                     $state.go('DashboardPasien', {
                        noregistrasi: $scope.item.noregistrasi,
                        norec_pd: $scope.item.norec_pd,
                        norec_apd: $scope.item.norec_apd,
                        umur: $scope.item.umurzz,
                        idpegawai: $scope.pegawai.id
                    });
                }
            }

            $scope.pengkajianMedis = function() {
                // debugger
                if ($scope.item.noregistrasi == undefined){
                    toastr.error('Pilih Data dulu')
                    return
                }
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.PengkajianMedis', {
                            noCM: $scope.item.nocm,
                            tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.norec_pd,
                            ruangana:$scope.item.objectruanganfk
                        });
                    } else {
                        $state.go('dashboardpasien.PengkajianMedis', {
                            noCM: $scope.item.nocm,
                            tanggal: moment(new Date($scope.item.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.norec_pd,
                            ruangana:$scope.item.objectruanganfk
                        });
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
            }
        }

    ]);
});