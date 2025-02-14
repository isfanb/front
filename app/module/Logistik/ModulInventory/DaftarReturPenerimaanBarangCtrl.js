define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarReturPenerimaanBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            ComboLoad();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarReturPenerimaanBarangCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
               $scope.item.tglAwal = new Date(chacePeriode[0]);
               $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
               init();
           }
           else{
             $scope.item.tglAwal = $scope.now;
             $scope.item.tglAkhir = $scope.now;
             init();
         }
     }
     function loadCombo(){
       modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
        $scope.listNamaBarang = data;
    });                
   }

   function ComboLoad () {

    manageLogistikPhp.getDataTableTransaksi("humas/get-daftar-combo", true).then(function(dat){
       $scope.listDataJabatan = dat.data.jabatan;
   });

    modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
        $scope.ListDataPegawai=data;
    });
}

$scope.BatalCetak = function(){

   $scope.popUp.close();                               
}

$scope.CetakAh = function(){               
    var jabatan1 =''
    if($scope.item.DataJabatan1 != undefined){
        jabatan1 = $scope.item.DataJabatan1.namajabatan;
    }            

    var pegawai1 = ''
    if($scope.item.DataPegawai1 != undefined){
        pegawai1 =$scope.item.DataPegawai1.id;
    }

    var jabatan2 =''
    if($scope.item.DataJabatan2 != undefined){
        jabatan2 = $scope.item.DataJabatan2.namajabatan;
    }            

    var pegawai2 = ''
    if($scope.item.DataPegawai2 != undefined){
        pegawai2 =$scope.item.DataPegawai2.id;
    }

    var jabatan3 =''
    if($scope.item.DataJabatan3 != undefined){
        jabatan3 = $scope.item.DataJabatan3.namajabatan;
    }            

    var pegawai3 = ''
    if($scope.item.DataPegawai3 != undefined){
        pegawai3 =$scope.item.DataPegawai3.id;
    }


    var stt = 'false'
    if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }

                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+$scope.dataSelected.norec+'&pegawaiPenerima='+pegawai2+'&pegawaiPenyerahan='+pegawai1+'&pegawaiMengetahui='+pegawai3
                    +'&jabatanPenerima='+jabatan2+'&jabatanPenyerahan='+jabatan1+'&jabatanMengetahui='+jabatan3+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response; 

                });                               
                $scope.popUp.close();
            }

            $scope.Tambah = function(){
                $state.go('PenerimaanBarangSuplier')
            }
            $scope.BatalTerima = function(){
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
                    stt='true';
                } else {
                    // Do nothing!
                    return;
                }
                var objSave = 
                {
                    nostruk: $scope.dataSelected.norec,
                    noorderfk: $scope.dataSelected.noorderfk
                }
                manageLogistikPhp.postbatalterimabarangsuplier(objSave).then(function(e) {
                   init();
               })
            }
            function init() {
                $scope.isRouteLoading=true;
                var ins =""
                if ($scope.item.instalasi != undefined){
                    var ins ="&dpid=" +$scope.item.instalasi.id
                }
                var rg =""
                if ($scope.item.ruangan != undefined){
                    var rg ="&ruid=" +$scope.item.ruangan.id
                }
                var produkfk =""
                if ($scope.item.namaBarang != undefined){
                    var produkfk ="&produkfk=" + $scope.item.namaBarang.id
                }
                var noSppb =""
                if ($scope.item.noSppb != undefined){
                    noSppb ="&noSppb=" + $scope.item.noSppb
                }
                 var retur =""
                if ($scope.item.Retur != undefined){
                    retur ="&noretur=" + $scope.item.Retur
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("retur-stok/get-daftar-retur-penerimaan?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk +
                    "&nofaktur=" + $scope.item.nofaktur +
                    "&namarekanan=" + $scope.item.namarekanan
                    + produkfk
                    + noSppb+retur
                    , true).then(function(dat){
                        $scope.isRouteLoading=false;
                        var datas = dat.data.daftar;
                        for (var i = 0; i < datas.length; i++) {
                            datas[i].no = i+1                       
                        }
                        $scope.dataGrid = datas;
                        pegawaiUser = dat.data.datalogin.userData
                    });
                    var objSave ={
                      tglAwal:tglAwal,
                      tglAkhir:tglAkhir
                  }              

                  var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarReturPenerimaanBarangCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }


            $scope.CetakRincian = function(){
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.CetakBukti = function(){
                // var stt = 'false'
                // if (confirm('View Bukti Penerimaan? ')) {
                //     // Save it!
                //     stt='true';
                // } else {
                //     // Do nothing!
                //     stt='false'
                // }
                // var client = new HttpClient();
                // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                //     //aadc=response;
                // });
                $scope.popUp.center().open();
            }
            
            $scope.EditTerima = function(){
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditTerima',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('PenerimaanBarangSuplierCtrl', chacePeriode);
                $state.go('PenerimaanBarangSuplier')
            }

            $scope.RegisAset = function(){
                debugger;
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'RegisAset',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('RegisterAsetCtrl', chacePeriode);
                $state.go('RegisterAset')
            }

            $scope.HapusPenerimaan = function(){
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
                    stt='true';
                } else {
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?"+"norec_sp=" + $scope.dataSelected.norec, true).then(function(dat){
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "45px",
                },
                {
                    "field": "tglretur",
                    "title": "Tanggal Retur",
                    "width" : "35px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglretur #', '')}}</span>"
                },
                {
                    "field": "noretur",
                    "title": "No Retur",
                    "width" : "100px",
                },
                {
                    "field": "nofaktur",
                    "title": "No Dokumen",
                    "width" : "100px",
                },
                {
                    "field": "nosppb",
                    "title": "No PO",
                    "width" : "100px",
                    "template": "#if (nosppb) {# #= nosppb # #} else {# - #} #",
                },                       
                {
                    "field": "namarekanan",
                    "title": "Supplier",
                    "width" : "120px",
                },
                {
                    "field": "jmlitem",
                    "title": "Item",
                    "width" : "35px",
                    "template": "<span class='style-right'>#= kendo.toString(jmlitem) #</span>",
                }             
            ];
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width" : "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width" : "30px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width" : "30px",
                        },
                        {
                            "field": "harganetto1",
                            "title": "Harga Satuan",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: harganetto1 #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscount",
                            "title": "Discount",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width" : "70px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        },
                        {
                            "field": "tglkadaluarsa",
                            "title": "Tgl Kadaluarsa",
                            "width" : "70px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                        },
                        {
                            "field": "nobatch",
                            "title": "nobatch",
                            "width" : "50px"
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
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatNumber = function(value, currency) {
                return number + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "1,");
            }
            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
          }
          function itungUsia(tgl){
            debugger;
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih/(1000*60*60*24*365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn '// + bln + ' bln'
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
//***********************************

}
]);
});
