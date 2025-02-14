define(['initialize', 'Configuration'], function (initialize, configuration) {
  'use strict';
  initialize.controller('InputTindakanPelayananRevCtrl', ['$scope', '$parse', 'ModelItem', '$state', '$rootScope', '$timeout', '$window', 'CacheHelper', 'DateHelper', 'CetakHelper', 'ModelItem', 'ManageServicePhp', 'ModelItemAkuntansi', 'FindPasien', 'ManagePasien',
    function ($scope, $parse, modelItem, $state, $rootScope, $timeout, $window, cacheHelper, dateHelper, cetakHelper, ModelItem, manageServicePhp, modelItemAkuntansi, findPasien, managePasien) {
      $scope.now = new Date();
      $scope.currentNorecPD = $state.params.norecPD;
      $scope.currentNorecAPD = $state.params.norecAPD;
      $scope.item = {};
      $scope.item.tglPelayanan = $scope.now;
      $scope.isNext = true;
      $scope.isKembali = true;
      $scope.isBatal = true;
      var cookie = document.cookie.split(';');
      cookie = cookie[0].split('=');
      if (cookie[1] === 'laborat') {
        $scope.showLab = true
      }
      // $scope.listKomponen =[];
      var data2 = [];
      loadPertama();

      function loadPertama() {
        $scope.isRouteLoading = true;
        manageServicePhp.getDataTableTransaksi("akutansi/get-tgl-posting", true).then(function (dat) {
          var tgltgltgltgl = dat.data.mindate[0].max
          var tglkpnaja = dat.data.datedate
          $scope.minDate = new Date(tgltgltgltgl);
          $scope.maxDate = new Date($scope.now);
          $scope.startDateOptions = {
            disableDates: function (date) {
              var disabled = tglkpnaja;
              if (date && disabled.indexOf(date.getDate()) > -1) {
                return true;
              } else {
                return false;
              }
            }
          };
        })
        manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasien-bynorec/"
          + $scope.currentNorecPD
          + "/"
          + $scope.currentNorecAPD)
          .then(function (e) {
            $scope.isRouteLoading = false;
            $scope.item.pasien = e.data[0];
            // var tanggal = $scope.now;
            // var tanggalLahir = new Date(e.data[0].tgllahir);
            // var umurzz = dateHelper.CountAge(tanggalLahir, tanggal);
            // $scope.item.pasien.umur =umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari';
            manageServicePhp.getDataTableTransaksi("inputtindakan/get-tindakan?idRuangan="
              + $scope.item.pasien.objectruanganfk
              + "&idKelas="
              + $scope.item.pasien.objectkelasfk
              // +"&idJenisPelayanan="
              // + $scope.item.pasien.objectjenispelayananfk
            )
              .then(function (x) {
                $scope.listProduk = x.data.data;
              })

          });
      }

      $scope.getHargaTindakan = function () {
        $scope.item.hargaTindakan = $scope.item.namaProduk.hargasatuan;
        $scope.item.jumlah = 1;
        getKomponenHarga()
      }

      function getKomponenHarga() {
        if ($scope.item.namaProduk != undefined) {
          manageServicePhp.getDataTableTransaksi("inputtindakan/get-komponenharga?idRuangan="
            + $scope.item.pasien.objectruanganfk
            + "&idKelas=" + $scope.item.pasien.objectkelasfk
            + "&idProduk=" + $scope.item.namaProduk.id
            // + "&idJenisPelayanan=" + $scope.item.pasien.objectjenispelayananfk 
          )
            .then(function (dat) {
              $scope.listKomponen = dat.data.data;

            })
        }
      }


      manageServicePhp.getDataTableTransaksi("inputtindakan/get-combo")
        .then(function (da) {
          $scope.listJenisPelaksana = da.data.jenispelaksana;
          $scope.listJenisKlasifikasi = da.data.jenisklasifikasi;
        })
      function getPegawaiById(id, input, output) {
        var selectedData = $parse(output);
        selectedData.assign($scope, []);
        var model = $parse(input);
        manageServicePhp.getDataTableTransaksi("inputtindakan/get-pegawaibyjenispetugas?idJenisPetugas=" + id, true).then(function (dat) {
          $scope.listPegawai = new kendo.data.DataSource({
            data: dat.data.jenispelaksana
          });
          model.assign($scope, $scope.listPegawai);
        });
      }

      $scope.listYaTidak = [
        {
          "id": 1, "name": "Ya"
        },
        {
          "id": 0, "name": "Tidak"
        }]
      $scope.dataPetugas = []; // data untus petugas Set

      $scope.dataSelectedRow = {};
      $scope.dataTindakan = new kendo.data.DataSource({
        autoSync: false,
        aggregate: [
          { field: "subTotal", aggregate: "sum" }
        ],
        editable: true,
        schema: {
          model: {
            rowNumber: "id",
            fields: {
              rowNumber: { editable: false },
              tglPelayanan: { editable: false, defaultValue: $scope.now },
              produk: {
                validation: {
                  productnamevalidation: function (input) {
                    if (input.is("[name='produk']") && input.val() === "") {
                      return false;
                    }
                    return true;
                  }
                }
              },
              hargaSatuan: { type: "number", editable: false },
              qty: {
                type: "number", validation: {
                  productqtyvalidation: function (input) {
                    if (input.is("[name='qty']") && input.val() === "0") {
                      return false;
                    }
                    return true;
                  }
                }
              },
              subTotal: { type: "number", editable: false }
            }
          }
        }
      });


      $scope.tambahTindakans = function () {
        if ($scope.item.namaProduk == undefined) {
          messageContainer.error("Tindakan harus di isi")
          return
        }
        if ($scope.item.jumlah == 0) {
          messageContainer.error("Jumlah tidak boleh nol")
          return
        }
        if ($scope.item.jenisPelaksana == undefined) {
          messageContainer.error("Jenis Pelaksana harus di isi")
          return
        }
        if ($scope.selectedPegawai.length == 0) {
          toastr.error('Petugas Pelaksana harus di isi')
          return
        }
        if ($scope.item.jenisPelaksana2) {
          for (let i = 0; i < $scope.selectedPegawai.length; i++) {
            for (let j = 0; j < $scope.selectedPegawai2.length; j++) {
              if ($scope.item.jenisPelaksana.jenispetugaspe == $scope.item.jenisPelaksana2.jenispetugaspe
                && $scope.selectedPegawai[i].namalengkap == $scope.selectedPegawai2[j].namalengkap) {
                toastr.error('Dokter Pemeriksa yg sama tidak boleh lebih dari 2 kali')
                return
              }
            }
          }
        }

        var nomor = 0
        if ($scope.dataTindakan == undefined) {
          nomor = 1
        } else {
          nomor = data2.length + 1
        }
        var data = {};
        data = {
          rowNumber: nomor,
          tglPelayanan: $scope.item.tglPelayanan,
          produk: $scope.item.namaProduk,//$scope.item.noRegistrasi,
          qty: $scope.item.jumlah,
          hargaSatuan: $scope.item.hargaTindakan,
          hargadiskon: 0,
          subTotal: ($scope.item.hargaTindakan) * ($scope.item.jumlah),
          listKomponen: $scope.listKomponen

        }
        data2.push(data)
        // $scope.dataGrid.add($scope.dataSelected)
        $scope.dataTindakan = new kendo.data.DataSource({
          data: data2
        });
        var subTotal = 0;
        for (var i = data2.length - 1; i >= 0; i--) {
          subTotal = subTotal + parseFloat(data2[i].subTotal)
        }
        $scope.item.totalAll = $scope.formatRupiah(subTotal, 'Rp.')//parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")


        // detail grid goes here
        if ($scope.item.jenisPelaksana && $scope.selectedPegawai) {
          for(let i = 0; $scope.item.jenisPelaksana.id === 6 && i < $scope.selectedPegawai.length; i++) {
            $scope.selectedPegawai[i].asaid = $scope.item.selectedJenisKlasifikasi.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana.id,
              "jenisPelaksana": $scope.item.jenisPelaksana.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai
          }
          $scope.gridPetugasPelaksana.add(pushData);
        }
        
        if ($scope.item.jenisPelaksana2 && $scope.selectedPegawai2) {
          for(let i = 0; $scope.item.jenisPelaksana2.id === 6 && i < $scope.selectedPegawai2.length; i++) {
            $scope.selectedPegawai2[i].asaid = $scope.item.selectedJenisKlasifikasi2.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana2.id,
              "jenisPelaksana": $scope.item.jenisPelaksana2.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai2
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana2 = false;
          delete $scope.item.jenisPelaksana2;
        }

        if ($scope.item.jenisPelaksana3 && $scope.selectedPegawai3) {
          for(let i = 0; $scope.item.jenisPelaksana3.id === 6 && i < $scope.selectedPegawai3.length; i++) {
            $scope.selectedPegawai3[i].asaid = $scope.item.selectedJenisKlasifikasi3.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana3.id,
              "jenisPelaksana": $scope.item.jenisPelaksana3.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai3
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana3 = false;
          delete $scope.item.jenisPelaksana3;
        }

        if ($scope.item.jenisPelaksana4 && $scope.selectedPegawai4) {
          for(let i = 0; $scope.item.jenisPelaksana4.id === 6 && i < $scope.selectedPegawai4.length; i++) {
            $scope.selectedPegawai4[i].asaid = $scope.item.selectedJenisKlasifikasi4.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana4.id,
              "jenisPelaksana": $scope.item.jenisPelaksana4.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai4
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana4 = false;
          delete $scope.item.jenisPelaksana4;
        }

        if ($scope.item.jenisPelaksana5 && $scope.selectedPegawai5) {
          for(let i = 0; $scope.item.jenisPelaksana5.id === 6 && i < $scope.selectedPegawai5.length; i++) {
            $scope.selectedPegawai5[i].asaid = $scope.item.selectedJenisKlasifikasi5.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana5.id,
              "jenisPelaksana": $scope.item.jenisPelaksana5.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai5
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana5 = false;
          delete $scope.item.jenisPelaksana5;
        }

        if ($scope.item.jenisPelaksana6 && $scope.selectedPegawai6) {
          for(let i = 0; $scope.item.jenisPelaksana6.id === 6 && i < $scope.selectedPegawai6.length; i++) {
            $scope.selectedPegawai6[i].asaid = $scope.item.selectedJenisKlasifikasi6.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana6.id,
              "jenisPelaksana": $scope.item.jenisPelaksana6.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai6
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana6 = false;
          delete $scope.item.jenisPelaksana6;
        }

        if ($scope.item.jenisPelaksana7 && $scope.selectedPegawai7) {
          for(let i = 0; $scope.item.jenisPelaksana7.id === 6 && i < $scope.selectedPegawai7.length; i++) {
            $scope.selectedPegawai7[i].asaid = $scope.item.selectedJenisKlasifikasi7.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana7.id,
              "jenisPelaksana": $scope.item.jenisPelaksana7.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai7
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana7 = false;
          delete $scope.item.jenisPelaksana7;
        }

        if ($scope.item.jenisPelaksana8 && $scope.selectedPegawai8) {
          for(let i = 0; $scope.item.jenisPelaksana8.id === 6 && i < $scope.selectedPegawai8.length; i++) {
            $scope.selectedPegawai8[i].asaid = $scope.item.selectedJenisKlasifikasi8.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana8.id,
              "jenisPelaksana": $scope.item.jenisPelaksana8.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai8
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana8 = false;
          delete $scope.item.jenisPelaksana8;
        }

        if ($scope.item.jenisPelaksana9 && $scope.selectedPegawai9) {
          for(let i = 0; $scope.item.jenisPelaksana9.id === 6 && i < $scope.selectedPegawai9.length; i++) {
            $scope.selectedPegawai9[i].asaid = $scope.item.selectedJenisKlasifikasi9.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana9.id,
              "jenisPelaksana": $scope.item.jenisPelaksana9.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai9
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana9 = false;
          delete $scope.item.jenisPelaksana9;
        }

        if ($scope.item.jenisPelaksana10 && $scope.selectedPegawai10) {
          for(let i = 0; $scope.item.jenisPelaksana10.id === 6 && i < $scope.selectedPegawai10.length; i++) {
            $scope.selectedPegawai10[i].asaid = $scope.item.selectedJenisKlasifikasi10.id;
          }
          var pushData = {
            "idParent": data.rowNumber,
            "jenisPetugas": {
              "id": $scope.item.jenisPelaksana10.id,
              "jenisPelaksana": $scope.item.jenisPelaksana10.jenispetugaspe
            },
            "listPetugas": $scope.selectedPegawai10
          }
          $scope.gridPetugasPelaksana.add(pushData);
          $scope.showJenisPelaksana10 = false;
          delete $scope.item.jenisPelaksana10;
        }
        console.log(JSON.stringify(data));
        $scope.show = true;
        kosongkan();


      }
      // });
      $scope.gridPetugasPelaksana = new kendo.data.DataSource({
        data: []
      })

      var onChange = function (e) {
        //var inputId = this.element.attr("id");
        //  console.log(inputId);
        var grid = $(this).data("mainGridOptions");

      }
      $scope.mainGridOptions = {
        sortable: true,
        // toolbar: [{
        //     name: "create",
        //     text: "Tambah"
        // }],
        autoSync: true,
        change: onChange,
        batch: true,
        selectable: 'row',
        pageable: {
          refresh: true,
          pageSizes: true,
          buttonCount: 5
        },
        columns: [
          {
            "field": "rowNumber",
            "title": "<h3 align=center>#</h3>",
            "width": 20
          },
          {
            "field": "tglPelayanan",
            "title": "<h3 align=center>Tanggal</h3>",
            "template": "#= new moment(new Date(tglPelayanan)).format('DD-MM-YYYY') #",
            "width": "60px"
          },
          {
            "field": "tglPelayanan",
            "title": "<h3 align=center>Jam</h3>",
            "template": "#= new moment(new Date(tglPelayanan)).format('HH:mm') #",
            "width": "40px"
          },
          {
            "field": "produk.namaproduk",
            "title": "<h3 align=center>Tindakan</h3>",
            "width": "300px"
          },
          {
            "field": "hargaSatuan",
            "title": "<h3 align=center>Harga Netto</h3>",
            "width": "150px",
            // "template": "#= kendo.toString(hargaSatuan, 'n0')#",
            "template": "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}",
            "attributes": { align: "center" }
          },
          {
            "field": "qty",
            "title": "<h3 align=center>Qty</h3>",
            "width": "70px",
            "attributes": { align: "center" }
          },
          {
            "field": "subTotal",
            "title": "<h3 align=center>SubTotal</h3>",
            "width": "150px",
            // "template": "#= kendo.toString(subTotal, 'n0')#",
            "template": "{{formatRupiah('#: subTotal #', 'Rp.')}}",
            "attributes": { align: "center" }
          },
          // { title: "<h3 align=center>Action<h3>",width : "100px",template : "<button class='btnHapus' ng-click='disableData()'>Disbled</button>"}
          {
            command: {
              text: "Hapus",
              width: "50px",
              align: "center",
              attributes: { align: "center" },
              click: removeRowTindakan
            },
            title: "",
            width: "80px",
            // template: "<a class='k-button k-grid-delete'><span class='glyphicon glyphicon-remove'></span></a>"
          }
        ],

      };

      function removeRowTindakan(e) {
        e.preventDefault();
        var grid = this;
        var row = $(e.currentTarget).closest("tr");
        var tr = $(e.target).closest("tr");
        var dataItem = this.dataItem(tr);
        $scope.tempDataTindakan = $scope.dataTindakan
          .filter(function (el) {
            return el.name !== grid[0].name;
          });
        grid.removeRow(row);
        var data = {};
        if (dataItem != undefined) {
          for (var i = data2.length - 1; i >= 0; i--) {
            if (data2[i].rowNumber == dataItem.rowNumber) {
              data2.splice(i, 1);
              for (var i = data2.length - 1; i >= 0; i--) {

                data2[i].rowNumber = i + 1
              }
              $scope.dataTindakan = new kendo.data.DataSource({
                data: data2
              });
            }
          }
        }
        var gridPetugas = $scope.gridPetugasPelaksana._data;
        for (var i = gridPetugas.length - 1; i >= 0; i--) {
          if (gridPetugas[i].idParent == dataItem.rowNumber) {
            gridPetugas.splice(i, 1);
            for (var i = gridPetugas.length - 1; i >= 0; i--) {

              gridPetugas[i].idParent = i + 1
            }
            $scope.gridPetugasPelaksana.add(gridPetugas);
            // $scope.gridPetugasPelaksana = new kendo.data.DataSource({
            //     data: gridPetugas
            // });
          }
        }
      }

      $scope.hapusAll = function () {
        data2 = [];
        $scope.dataTindakan = new kendo.data.DataSource({
          data: data2
        });
        var pushData = [];
        $scope.gridPetugasPelaksana = new kendo.data.DataSource({
          data: pushData
        });

      };
      $scope.detailGridOptions = function (dataItem) {
        return {
          dataSource: {
            data: $scope.gridPetugasPelaksana._data,
            filter: { field: "idParent", operator: "eq", value: dataItem.rowNumber }
          },
          columns: [
            {
              field: "jenisPetugas.jenisPelaksana",
              title: "Jenis Pelaksana",
              width: "100px",
              template: "#= jenisPetugas.jenisPelaksana #"
            },
            {
              field: "listPetugas[0].namalengkap",
              title: "Nama Pegawai",
              width: "200px",
              template: multiSelectArrayToString
            }
          ]
        };
      };

      function multiSelectArrayToString(item) {
        if (item.listPetugas !== "") {
          return item.listPetugas.map(function (elem) {
            return elem.namalengkap
          }).join(", ");
        }
      };
      $scope.formatRupiah = function (value, currency) {
        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      }
      $scope.refreshDetilTagihan = function () {
        findPasien.findDetailPelayanan(responData.noRec).then(function (e) {
          $scope.listData = e.data.data.orders;
          var data = e.data.data.orders;
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              var element = data[key];
              element.tglPelayanan = moment(element.tglPelayanan).format('DD MMM YYYY');
            }
          }


          $scope.total = _.reduce(data, function (memo, num) {
            if (num.nilaiNormal === 0)
              return memo + (num.jumlah * num.hargaSatuan * -1);
            return memo + (num.jumlah * num.hargaSatuan);
          }, 0);
        });
      }

      $scope.isInArray = function (value, array) {
        return array.indexOf(value) > -1;
      }
      function getGenericPegawai(input, output) {
        var selectedData = $parse(output);
        selectedData.assign($scope, []);
        var model = $parse(input);
        findPasien.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function (dat) {
          $scope.listPegawai = new kendo.data.DataSource({
            data: dat.data
          });
          model.assign($scope, $scope.listPegawai);
        });
      }
      $scope.listIdPetugas = [13827, 176873]
      $scope.init = function () {
        var id = $scope.item.jenisPelaksana.id;
        var model = 'dataSource';
        var listArray = 'selectedPegawai';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      
      $scope.selectedPegawai = [];
      $scope.init2 = function () {
        var id = $scope.item.jenisPelaksana2.id;
        var model = 'dataSource2';
        var listArray = 'selectedPegawai2';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai2 = [];
      $scope.init3 = function () {
        var id = $scope.item.jenisPelaksana3.id;
        var model = 'dataSource3';
        var listArray = 'selectedPegawai3';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai3 = [];
      $scope.init4 = function () {
        var id = $scope.item.jenisPelaksana4.id;
        var model = 'dataSource4';
        var listArray = 'selectedPegawai4';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai4 = [];
      $scope.init5 = function () {
        var id = $scope.item.jenisPelaksana5.id;
        var model = 'dataSource5';
        var listArray = 'selectedPegawai5';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai5 = [];
      $scope.init6 = function () {
        var id = $scope.item.jenisPelaksana6.id;
        var model = 'dataSource6';
        var listArray = 'selectedPegawai6';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai6 = [];
      $scope.init7 = function () {
        var id = $scope.item.jenisPelaksana7.id;
        var model = 'dataSource7';
        var listArray = 'selectedPegawai7';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai7 = [];
      $scope.init8 = function () {
        var id = $scope.item.jenisPelaksana8.id;
        var model = 'dataSource8';
        var listArray = 'selectedPegawai8';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai8 = [];
      $scope.init9 = function () {
        var id = $scope.item.jenisPelaksana9.id;
        var model = 'dataSource9';
        var listArray = 'selectedPegawai9';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai9 = [];
      $scope.init10 = function () {
        var id = $scope.item.jenisPelaksana10.id;
        var model = 'dataSource10';
        var listArray = 'selectedPegawai10';
        var isInList = $scope.isInArray(id, $scope.listIdPetugas);
        if (isInList) {
          getGenericPegawai(model, listArray);
        } else {
          getPegawaiById(id, model, listArray);
        }
      };
      $scope.selectedPegawai10 = [];
      $scope.showTambah1 = true;
      $scope.show = true;
      $scope.tambah = function () {
        $scope.showJenisPelaksana2 = true;
        $scope.show = false;
        $scope.show2 = true;
      };
      $scope.hapus = function () {
        $scope.show = true;
        $scope.show2 = false;
        $scope.showJenisPelaksana2 = false;
        $scope.item.jenisPelaksana2 = "";
        $scope.selectedPegawai2 = [];
      };

      $scope.tambah2 = function () {
        $scope.showJenisPelaksana3 = true;
        $scope.show3 = true;
        $scope.show2 = false;
      }
      $scope.hapus2 = function () {
        $scope.showJenisPelaksana3 = false;
        $scope.show2 = true;
        $scope.show3 = false;
        $scope.item.jenisPelaksana3 = "";
        $scope.selectedPegawai3 = [];
      };

      $scope.tambah3 = function () {
        $scope.showJenisPelaksana4 = true;
        $scope.show3 = false;
        $scope.show4 = true;
      }
      $scope.hapus3 = function () {
        $scope.showJenisPelaksana4 = false;
        $scope.show3 = true;
        $scope.show4 = false;
        $scope.item.jenisPelaksana4 = "";
        $scope.selectedPegawai4 = [];
      };

      $scope.tambah4 = function () {
        $scope.showJenisPelaksana5 = true;
        $scope.show4 = false;
        $scope.show5 = true;
      }
      $scope.hapus4 = function () {
        $scope.showJenisPelaksana5 = false;
        $scope.show4 = true;
        $scope.show5 = false;
        $scope.item.jenisPelaksana5 = "";
        $scope.selectedPegawai5 = [];
      };

      $scope.tambah5 = function () {
        $scope.showJenisPelaksana6 = true;
        $scope.show5 = false;
        $scope.show6 = true;
      }
      $scope.hapus5 = function () {
        $scope.showJenisPelaksana6 = false;
        $scope.show5 = true;
        $scope.show6 = false;
        $scope.item.jenisPelaksana5 = "";
        $scope.selectedPegawai5 = [];
      };

      $scope.tambah6 = function () {
        $scope.showJenisPelaksana7 = true;
        $scope.show6 = false;
        $scope.show7 = true;
      }
      $scope.hapus6 = function () {
        $scope.showJenisPelaksana7 = false;
        $scope.show6 = true;
        $scope.show7 = false;
        $scope.item.jenisPelaksana6 = "";
        $scope.selectedPegawai6 = [];
      };

      $scope.tambah7 = function () {
        $scope.showJenisPelaksana8 = true;
        $scope.show7 = false;
        $scope.show8 = true;
      }
      $scope.hapus7 = function () {
        $scope.showJenisPelaksana8 = false;
        $scope.show7 = true;
        $scope.show8 = false;
        $scope.item.jenisPelaksana7 = "";
        $scope.selectedPegawai7 = [];
      };

      $scope.tambah8 = function () {
        $scope.showJenisPelaksana9 = true;
        $scope.show8 = false;
        $scope.show9 = true;
      }
      $scope.hapus8 = function () {
        $scope.showJenisPelaksana9 = false;
        $scope.show8 = true;
        $scope.item.jenisPelaksana8 = "";
        $scope.selectedPegawai8 = [];
      };

      $scope.tambah9 = function () {
        $scope.showJenisPelaksana10 = true;
        $scope.show9 = false;
        $scope.show10 = true;
      }
      $scope.hapus9 = function () {
        $scope.showJenisPelaksana10 = false;
        $scope.show9 = true;
        $scope.show10 = false;
        $scope.item.jenisPelaksana9 = "";
        $scope.selectedPegawai9 = [];
      };


      $scope.selectOptions = {
        placeholder: "Pilih Pegawai...",
        dataTextField: "namaLengkap",
        dataValueField: "id",
        filter: "contains"
      };



      function kosongkan() {
        $scope.item.namaProduk = undefined;
        $scope.item.hargaTindakan = "";
        $scope.item.jumlah = undefined;
        $scope.item.jenisPelaksana = undefined;
        $scope.item.petugasPelaksana = undefined;
        $scope.item.jenisPelaksana2 = undefined;
        $scope.item.petugasPelaksana2 = undefined;
        $scope.item.jenisPelaksana3 = undefined;
        $scope.item.petugasPelaksana3 = undefined;
        $scope.item.jenisPelaksana4 = undefined;
        $scope.item.petugasPelaksana4 = undefined;
        $scope.selectedPegawai = [];
        $scope.selectedPegawai1 = [];
        $scope.selectedPegawai2 = [];
        $scope.selectedPegawai3 = [];
        $scope.selectedPegawai4 = [];
        $scope.selectedPegawai5 = [];
      }


      // function simpan tindakan
      $scope.Save = function () {
        var dataTindakanFix = [];
        $scope.dataTindakan._data.forEach(function (e) {

          if (e.listKomponen.length <= 0) {
            window.messageContainer.error("Simpan Gagal, Komponen Tindakan tidak ada");
            return
          }
          else {
            var petugasLayanan = [];
            $scope.gridPetugasPelaksana._data.forEach(function (a) {
              if (e.rowNumber === a.idParent) {
                petugasLayanan.push({
                  "objectjenispetugaspefk": a.jenisPetugas.id,
                  // "objectpegawaifk": a.jenisPetugas.id
                  "listpegawai": a.listPetugas
                });
              }
            })


            // if ( $scope.listKomponen.length>0)
            // {
            dataTindakanFix.push({
              "noregistrasifk": $scope.currentNorecAPD,
              "tglregistrasi": $scope.item.pasien.tglregistrasi,
              "tglpelayanan": new moment(e.tglPelayanan).format('YYYY-MM-DD HH:mm'),
              "ruangan": e.ruangan,
              "produkfk": e.produk.id,
              "hargasatuan": e.hargaSatuan,
              "diskon": e.hargadiskon,
              "hargajual": e.hargaSatuan,
              "harganetto": e.hargaSatuan,
              "jumlah": e.qty,
              "kelasfk": $scope.item.pasien.objectkelasfk,
              "pelayananpetugas": petugasLayanan,
              "komponenharga": e.listKomponen,
              "keterangan": $scope.item.pemeriksaanKeluar === true ? 'Pemeriksaan Keluar' : '-',

            });


          }
        })
        var objSave = {
          pelayananpasien: dataTindakanFix

        }
        manageServicePhp.saveTindakanPelayanan(JSON.stringify(objSave)).then(function (e) {
          //  $scope.isSimpan = true;
          // $scope.isNext = true;
          manageServicePhp.saveLogInputTindakan(objSave).then(function (data) {
          })

          $scope.hapusAll();

        }, function (error) {
          // $scope.isNext = false;

        })
        // $scope.SaveLogUser=function(){
        // }

      }

      // $scope.Save = function () {
      //       // $scope.isNext = true;
      //       var dataTindakanFix = [];
      //       $scope.dataTindakan._data.forEach(function(e){
      //           var petugasLayanan = [];
      //           $scope.gridPetugasPelaksana._data.forEach(function(a){
      //               if(e.rowNumber === a.idParent){
      //                   petugasLayanan.push({
      //                       "objectJenisPetugasPe":{  
      //                           "id": a.jenisPetugas.id
      //                       },
      //                       "mapPelayananPasienPetugasToPegawaiSet": a.listPetugas
      //                   });
      //               }
      //           })
      //           dataTindakanFix.push({
      //               "noRec":$scope.currentNorecAPD,
      //               "tglPelayanan": new Date(e.tglPelayanan).getTime(),
      //               "ruangan" :{
      //                  "id": $scope.item.pasien.objectruanganfk,
      //                   "namaRuangan": $scope.item.pasien.namaruangan
      //               },
      //               "produk": {
      //                   "id": e.produk.id,
      //                   "namaProduk": e.produk.namaproduk
      //               },
      //               "hargaSatuan": e.hargaSatuan,
      //               "qty" : e.qty,
      //               "kelas" :{
      //                   "id": $scope.item.pasien.objectkelasfk,
      //                   "namaKelas": $scope.item.pasien.namakelas
      //               },
      //               "pasienDaftar": {
      //                   "noRec" :$scope.currentNorecAPD
      //               },
      //               "pelayananPasienPetugasSet": petugasLayanan
      //           });
      //       })
      //       managePasien.saveTindakan(JSON.stringify(dataTindakanFix)).then(function(e){
      //           $scope.hapusAll();
      //       }, function(error){
      //           // $scope.isNext = false;
      //       })
      //   }

      $scope.Back = function () {
        window.history.back();
      }

    }
  ]);
});