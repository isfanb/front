define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InformasiDaftarGajiPnsCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm',
        function($rootScope, $scope, ModelItem, $state, manageSdm) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            /*$scope.item.Periode = "Maret 2016";
            $scope.item.jenis = "Gaji Induk PNS";*/
            $scope.arrPilihan = [];
            var init = function() {
                manageSdm.getOrderList("sdm/get-daftar-gaji-pns?periode=", true).then(function(dat) {
                    $scope.listDataGajiPns = dat.data.data.listData;
                    var data = [];
                    var i = 1;
                    $scope.listDataGajiPns.forEach(function(e) {
                        var daftar = {
                            "noGaji": e.noGaji,
                            "jenisGaji": e.jenisGaji,
                            "noRec": e.noRec,
                            "periode": e.periode
                        }
                        data[i-1]=daftar
                        i++;
                    });
                    $scope.source = data;
                    
                    $scope.dataSource = new kendo.data.DataSource({
                        data: $scope.source,
                        pageSize: 10
                    });
                });
            }
            init();
            $scope.cekArrPilihan = function (data) {
                var isExist = _.find($scope.arrPilihan, function(dataExist) {
                  return dataExist == data;
                });
                if (isExist == undefined) {
                  $scope.arrPilihan.push(data);
                  data.isChecked = true;
                }
                else {
                  $scope.arrPilihan = _.without($scope.arrPilihan, data);
                  data.isChecked = false;
                }
            };
            $scope.klik = function(current) {
                $scope.current = current;
                $scope.item.noGaji = current.noGaji;
                $scope.item.Periode = current.periode;
                $scope.item.jenis = current.jenisGaji;
                $scope.item.noRec = current.noRec;
            }; 
            $scope.Detail = function() {
                $scope.dataPilihan = $scope.item.Pilihan.id;
                
                /*$state.go("DetailDaftarGajiPns");*/
                /*var obj = {
                    periode: $scope.item.Periode,
                    jenis: $scope.item.jenis,
                };*/
                $state.go("DetailDaftarGajiPns", {
                    idPNS: $scope.arrPilihan[0].id,
                    periode: $scope.item.Periode,
                    jenis: $scope.item.jenis,
                    noRec: $scope.item.noRec
                }); 
            };
            manageSdm.getOrderList("sdm/get-list-periode-golongan", true).then(function(dat) {
                $scope.listPilihan = dat.data.data.listGolongan;
            });
            $scope.mainGridOptions = {
                columns: $scope.columnInformasiDaftarGajiPns,
                editable: "popup",
                selectable: "row",
                pageable: true
            };
            $scope.columnInformasiDaftarGajiPns = [{
                "field": "noGaji",
                "title": "No Gaji"
            }, {
                "field": "periode",
                "title": "Periode"
            }, {
                "field": "jenisGaji",
                "title": "Jenis Gaji"
            }, {
                "field": "noRec",
                "hidden": true
            }, {
                "field": "keterangan",
                "title": "Keterangan"
            }];


























        }
    ]);
});
