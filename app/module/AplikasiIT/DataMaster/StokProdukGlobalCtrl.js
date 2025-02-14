define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StokProdukGlobalCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=StokProdukGlobal", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.StokProdukGlobal;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();
			$scope.columnStokProdukGlobal = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "hargaDiscount",
				"title": "harga Discount"
			},
			{
				"field": "hargaNetto1",
				"title": "harga Netto 1"
			},
			{
				"field": "hargaNetto2",
				"title": "harga Netto 2"
			},
			{
				"field": "asalProduk",
				"title": "asal Produk"
			},
			{
				"field": "asalProdukId",
				"title": "asal Produk Id"
			},
			{
				"field": "lokasi",
				"title": "lokasi"
			},
			{
				"field": "lokasiId",
				"title": "lokasi Id"
			},
			{
				"field": "produk",
				"title": "produk"
			},
			{
				"field": "produkId",
				"title": "produk Id"
			},
			{
				"field": "ruangan",
				"title": "ruangan"
			},
			{
				"field": "ruanganId",
				"title": "ruangan Id"
			},
			{
				"field": "persenDiscount",
				"title": "persen Discount"
			},
			{
				"field": "qtyProduk",
				"title": "qty Produk"
			},
			{
				"field": "qtyProdukMax",
				"title": "qty Produk Max"
			},
			{
				"field": "qtyProdukMin",
				"title": "qty Produk Min"
			},
			{
				"field": "qtyProdukOnHand",
				"title": "qty Produk On Hand"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			},

			{
				"title" : "Action",
				"width" : "200px",
				"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnStokProdukGlobal,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.hargaDiscount = current.hargaDiscount;
				$scope.item.hargaNetto1 = current.hargaNetto1;
				$scope.item.hargaNetto2 = current.hargaNetto2;
				$scope.item.asalProduk = current.asalProduk;
				$scope.item.asalProdukId = current.asalProdukId;
				$scope.item.lokasi = current.lokasi;
				$scope.item.lokasiId = current.lokasiId;
				$scope.item.produk = current.produk;
				$scope.item.produkId = current.produkId;
				$scope.item.ruangan = current.ruangan;
				$scope.item.ruanganId = current.ruanganId;
				$scope.item.persenDiscount = current.persenDiscount;
				$scope.item.qtyProduk = current.qtyProduk;
				$scope.item.qtyProdukMax = current.qtyProdukMax;
				$scope.item.qtyProdukMin = current.qtyProdukMin;
				$scope.item.qtyProdukOnHand = current.qtyProdukOnHand;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StokProdukGlobal&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					init();
				});
			};
			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StokProdukGlobal&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					init();

				});
			};

			$scope.tambah = function()
			{
				var data = {
					"class": "StokProdukGlobal",
					"listField": {
						"hargaDiscount": $scope.item.hargaDiscount,
						"hargaNetto1": $scope.item.hargaNetto1,
						"hargaNetto2": $scope.item.hargaNetto2,
						"asalProduk": $scope.item.asalProduk,
						"asalProdukId": $scope.item.asalProdukId,
						"lokasi": $scope.item.lokasi,
						"lokasiId": $scope.item.lokasiId,
						"produk": $scope.item.produk,
						"produkId": $scope.item.produkId,
						"ruangan": $scope.item.ruangan,
						"ruanganId": $scope.item.ruanganId,
						"persenDiscount": $scope.item.persenDiscount,
						"qtyProduk": $scope.item.qtyProduk,
						"qtyProdukMax": $scope.item.qtyProdukMax,
						"qtyProdukMin": $scope.item.qtyProdukMin,
						"qtyProdukOnHand": $scope.item.qtyProdukOnHand,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal
					}
				}
				IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
				});
			}

			$scope.edit = function()
			{	
				var data = {
					"class": "StokProdukGlobal",
					"listField": {
						"hargaDiscount": $scope.item.hargaDiscount,
						"hargaNetto1": $scope.item.hargaNetto1,
						"hargaNetto2": $scope.item.hargaNetto2,
						"asalProduk": $scope.item.asalProduk,
						"asalProdukId": $scope.item.asalProdukId,
						"lokasi": $scope.item.lokasi,
						"lokasiId": $scope.item.lokasiId,
						"produk": $scope.item.produk,
						"produkId": $scope.item.produkId,
						"ruangan": $scope.item.ruangan,
						"ruanganId": $scope.item.ruanganId,
						"persenDiscount": $scope.item.persenDiscount,
						"qtyProduk": $scope.item.qtyProduk,
						"qtyProdukMax": $scope.item.qtyProdukMax,
						"qtyProdukMin": $scope.item.qtyProdukMin,
						"qtyProdukOnHand": $scope.item.qtyProdukOnHand,
						"id": $scope.item.id,
						"noRec": $scope.item.noRec,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
						"statusEnabled": $scope.item.statusEnabled
					}
				}
				IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
					init();
				});
			}
			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}
			IPSRSService.getFieldListData("AsalProduk&select=id,namaExternal", true).then(function(dat){
				$scope.listasalProduk= dat.data;
			});
			IPSRSService.getFieldListData("Lokasi&select=id,namaExternal", true).then(function(dat){
				$scope.listlokasi= dat.data;
			});
			IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
				$scope.listproduk= dat.data;
			});
			IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
				$scope.listruangan= dat.data;
			});
		}
		]);
});