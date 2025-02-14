define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatPsikososialRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'ManagePasien', 'FindPasien','ManagePhp',
        function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, ManagePasien, findPasien,ManagePhp) {

            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "RiwayatPsikososial");
            $rootScope.showMenuPengkajianMedis = false;
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.tanggal = $state.params.tanggal;
            $rootScope.tanggal = $state.params.tanggal;
            $scope.pasien = {};
            $scope.item = {};
            $scope.title= "PSIKOSOSIAL (Hanya untuk Rawat Inap)";

            $scope.noRecPap = cacheHelper.get('noRecPap');

            $scope.listStatus=[
            {"id":1,"nama":"Status Psikologi","detail":[{"id":1,"nama":"Tenang"},{"id":2,"nama":" Gelisah"},{"id":3,"nama":"Cemas"},{"id":4,"nama":"Takut"},{"id":5,"nama":"Marah"},{"id":6,"nama":"Sedih"},{"id":7,"nama":"Kecenderungan Bunuh Diri"}]}
            ]
            $scope.listTempatTinggal=[
            {"id":2,"nama":"Tempat Tinggal","detail":[{"id":1,"nama":"Rumah"},{"id":2,"nama":"Apartemen"},{"id":3,"nama":"Panti"}]}
            ]
            $scope.listRawat=[
            {"id":3,"nama":"Dirawat Oleh","detail":[{"id":1,"nama":"Orang Tua Kandung"},{"id":2,"nama":"Bapak/Ibu Tiri"},{"id":3,"nama":"Anggota Keluarga Lain"}]}
            ]
            $scope.listHubungan=[
            {"id":4,"nama":"Hubungan pasien dengan anggota keluarga","detail":[{"id":1,"nama":"Baik"},{"id":2,"nama":"Tidak Baik"}]}
            ]

            $scope.getdata=function(){
                var objectfk = "PSI";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                    + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                        $scope.dataPsikologi = e.data.data;
                        if($scope.dataPsikologi.length != 0){
                            for (var i = 0; i < $scope.dataPsikologi.length; i++) {

                                if($scope.dataPsikologi[i].objectfk == "PSI-000001"){
                                    $scope.noRecStatusSatu = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                     if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })
                                    // $scope.addListStatus($scope.bool ,temp)


                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000002"){
                                    $scope.noRecStatusDua = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                       if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })


                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000003"){
                                    $scope.noRecStatusTiga = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                     if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000004"){
                                    $scope.noRecStatusEmpat = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                     if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000005"){
                                    $scope.noRecStatusLima = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                     if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000006"){
                                    $scope.noRecStatusEnam = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                     if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000007"){
                                    $scope.noRecStatusTujuh = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                     if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000008"){
                                    $scope.noRecStatusDelapan = $scope.dataPsikologi[i].norec
                                    $scope.listStatus[0].detail.forEach(function(e){
                                     if (e.id ==  $scope.dataPsikologi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                        "nama":e.nama                                                    
                                    }  
                                    $scope.currentStatus.push(dataid)
                                }
                            })
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000009"){
                                    $scope.noRecTempatTinggal = $scope.dataPsikologi[i].norec
                                    $scope.item.tempatTinggal = $scope.dataPsikologi[i].nilai;
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000010"){
                                    $scope.noRecRawat = $scope.dataPsikologi[i].norec
                                    $scope.item.rawat = $scope.dataPsikologi[i].nilai;
                                }
                                if($scope.dataPsikologi[i].objectfk == "PSI-000011"){
                                    $scope.noRecHubungan = $scope.dataPsikologi[i].norec
                                    $scope.item.hubungan = $scope.dataPsikologi[i].nilai;
                                }

                            }
                        }
                    })
}
$scope.getdata();

$scope.currentStatus=[];
$scope.addListStatus = function(bool,data) {
    var index = $scope.currentStatus.indexOf(data);
    if(bool){
                // if (_.filter($scope.currentStatus, {
                //         id: data.id
                //     }).length === 0)
                $scope.currentStatus.push(data);
            } else {
               $scope.currentStatus.splice(index, 1);             
           }
       }
       $scope.Save = function() {
        var dataForm = [];  
        var tempData = [];

        $scope.currentStatus.forEach(function(data){
            if(data.id === 1){
                var tmpStatus = {
                    norec: $scope.noRecStatusSatu,
                    objectfk: "PSI-000001",
                    nilai: data.id.toString(),
                    satuan: "-",
                    jenisobject : "checkbox"
                }
                tempData.push(tmpStatus);
            }
            if(data.id === 2){
                var tmpStatus = {
                    norec: $scope.noRecStatusDua,
                    objectfk: "PSI-000002",
                    nilai: data.id.toString(),
                    satuan: "-",
                    jenisobject : "checkbox"
                }
                tempData.push(tmpStatus);
            }
            if(data.id === 3){
                var tmpStatus = {
                    norec: $scope.noRecStatusTiga,
                    objectfk: "PSI-000003",
                    nilai: data.id.toString(),
                    satuan: "-",
                    jenisobject : "checkbox"
                }
                tempData.push(tmpStatus);
            }
            if(data.id === 4){
                var tmpStatus = {
                    norec: $scope.noRecStatusEmpat,
                    objectfk: "PSI-000004",
                    nilai: data.id.toString(),
                    satuan: "-",
                    jenisobject : "checkbox"
                }
                tempData.push(tmpStatus);
            }
            if(data.id === 5){
                var tmpStatus = {
                    norec: $scope.noRecStatusLima,
                    objectfk: "PSI-000005",
                    nilai: data.id.toString(),
                    satuan: "-",
                    jenisobject : "checkbox"
                }
                tempData.push(tmpStatus);
            }
            if(data.id === 6){
                var tmpStatus = {
                    norec: $scope.noRecStatusEnam,
                    objectfk: "PSI-000006",
                    nilai: data.id.toString(),
                    satuan: "-",
                    jenisobject : "checkbox"
                }
                tempData.push(tmpStatus);
            }
            if(data.id === 7){
                var tmpStatus = {
                    norec: $scope.noRecStatusTujuh,
                    objectfk: "PSI-000007",
                    nilai: data.id.toString(),
                    satuan: "-",
                    jenisobject : "checkbox"
                }
                tempData.push(tmpStatus);
            }
        })
        if($scope.item.tempatTinggal !== undefined){
            var tmpStatus = {
                norec: $scope.noRecTempatTinggal,
                objectfk: "PSI-000009",
                nilai: $scope.item.tempatTinggal.toString(),
                satuan: "-",
                jenisobject : "radio button"
            }
            tempData.push(tmpStatus);
        }
        if($scope.item.rawat !== undefined){
            var tmpStatus = {
                norec: $scope.noRecRawat,
                objectfk: "PSI-000010",
                nilai: $scope.item.rawat.toString(),
                satuan: "-",
                jenisobject : "radio button"
            }
            tempData.push(tmpStatus);
        }
        if($scope.item.hubungan !== undefined){
            var tmpStatus = {
                norec: $scope.noRecHubungan,
                objectfk: "PSI-000011",
                nilai: $scope.item.hubungan.toString(),
                satuan: "-",
                jenisobject : "radio button"
            }
            tempData.push(tmpStatus);
        }
        for (var i = tempData.length - 1; i >= 0; i--) {
            if(tempData[i].nilai == undefined){
                tempData.splice([i],1)
            }
            if(tempData[i].norec == undefined){
                tempData[i].norec = '-'
            }

        }
        debugger;
        var jsonSave = {
            data: tempData,
            noregistrasifk: $state.params.noRec,
            riwayatpapfk: $scope.noRecPap
        }
        ManagePhp.saveData(jsonSave).then(function(e) {
            $scope.currentStatus=[];  
            $scope.getdata();
            ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Psikososial').then(function (res) {
            })
        });
    }
            
        }
        ]);
});