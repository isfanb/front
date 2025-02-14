define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('TarifLayananByRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DataTarif' ,'TampilDataTarif', 'ManageSarpras', '$state', 'ModelItemAkuntansi', 'ManageLogistikPhp',
        function($rootScope, $scope, ModelItem,DataTarif,TampilDataTarif, manageSarpras, $state, modelItemAkuntansi, manageLogistikPhp) {
		$scope.isRouteLoading=false;
		$scope.item = {};
		

		loadDataCombo();

			// logistik-stok/get-data-combo-transfer
		
			function loadDataCombo(){
				
				modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-data-produk", true, true, 20).then(function(data) {
                    $scope.listProduk=data;
                });

                modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function(dat){
                	$scope.ListKelas=dat.kelas;
                	// $scope.ListRuangan=dat.ruangan;
                })

                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-combo-transfer", true).then(function(dat){
                	$scope.ListRuangan = dat.data.ruangan;
                	 $scope.item.ruangan = {id:$scope.ListRuangan[0].id,namaruangan:$scope.ListRuangan[0].namaruangan};
                	LoadData();
                })
			}

			function LoadData(){
				$scope.isRouteLoading=true;
				var produk="";
				if($scope.item.produk != undefined){
					produk = $scope.item.produk.kdproduk
				}
				var kelas="";
				if($scope.item.kelas != undefined){
					kelas = $scope.item.kelas.id
				}
				var ruangan="";
				if($scope.item.ruangan != undefined){
					ruangan = $scope.item.ruangan.id
				}
				modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-tarif-layanan?"
					+ "produkId=" + produk
					+ "&kelasId=" + kelas
					+ "&ruanganId=" + ruangan, true).then(function(dat){
					var datas = dat.data;
					$scope.isRouteLoading=false;
		            $scope.sourceTarif = new kendo.data.DataSource({
						data: datas,//data[0].details,
	            		// pageSize: 20,
						group: [
	                        {field: "namaruangan"}
	                    ],
	                	// pageSize: 10,
					});
                })
			}

			$scope.formatRupiah = function(value, currency) {
            	return currency  + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        	}

			$scope.columndata= [
			{
				"field": "namaproduk",
				"title": "Layanan",
				"width": "120px"
			}, 
			{
				"field": "namakelas",
				"title": "Kelas",
				"width": "100px"
					
			},
			// {
			// 	"field": "namaruangan",
			// 	"title": "Ruangan",
			// 	"width": "100px"
					
			// },
			{
				"field": "hargalayanan",
				"title": "Tarif",
				"width": "100px",
				"template": "<span class='style-right'>{{formatRupiah('#: hargalayanan #', '')}}</span>",
				"attributes": {align:"right"}

		    }];

		    $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "komponenharga",
                            "title": "Nama Komponen",
                            "width": "40px",
                        },
                        {
                            "field": "harganetto1",
                            "title": "Tarif",
                            "template": "<span class='style-right'>{{formatRupiah('#: harganetto1 #', '')}}</span>",
                            "width" : "100px",
                            "attributes": {align:"right"}
                        }
                        // {
                        //     "field": "harganetto2",
                        //     "title": "Harga Netto2",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: harganetto2 #', '')}}</span>",
                        //     "width" : "100px",
                        // },
                        // {
                        //     "field": "hargasatuan",
                        //     "title": "Harga Satuan",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>",
                        //     "width" : "100px",
                        // }
                    ]
                }
            };  

			$scope.SearchData = function()
			{
				LoadData();
			}
		}
	]);
});