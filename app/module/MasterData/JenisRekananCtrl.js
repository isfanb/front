define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisRekananCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisRekanan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisRekanan;
					
					$scope.dataSource = new kendo.data.DataSource({
	                    pageSize: 10,
	                    data: $scope.listDataMaster,
	                    autoSync: true
	                    /*schema: {
	                      	model: {
	                        	id: "asetId",
	                        	fields: {
	                            	
	                        	}   
	                    	}
	                	}	*/
	            	});
					
				});
			}
			init();
			IPSRSService.getFieldListData("JenisRekanan&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisRekanan = dat.data;
			});
			$scope.columnJenisRekanan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "namaJenisRekanan",
				"title": "nama Jenis Rekanan"
			},
			{
				"field": "kdJenisRekanan",
				"title": "kd Jenis Rekanan"
			},
			{
				"field": "qJenisRekanan",
				"title": "q Jenis Rekanan"
			},
			{
				"field": "jenisRekanan",
				"title": "jenis Rekanan"
			},
			{
				"field": "jenisRekananId",
				"title": "jenis Rekanan Id"
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
                columns: $scope.columnJenisRekanan,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.namaJenisRekanan = current.namaJenisRekanan;
				$scope.item.kdJenisRekanan = current.kdJenisRekanan;
				$scope.item.qJenisRekanan = current.qJenisRekanan;
				$scope.item.jenisRekanan = current.jenisRekanan;
				$scope.item.jenisRekananId = current.jenisRekananId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisRekanan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisRekanan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisRekanan",
					"listField": {
							"namaJenisRekanan": $scope.item.namaJenisRekanan,
					 		"kdJenisRekanan": $scope.item.kdJenisRekanan,
					 		"qJenisRekanan": $scope.item.qJenisRekanan,
					 		"jenisRekanan": $scope.item.jenisRekanan,
					 		"jenisRekananId": $scope.item.jenisRekananId,
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
					"class": "JenisRekanan",
					"listField": {
							"id": $scope.item.id,
							"namaJenisRekanan": $scope.item.namaJenisRekanan,
					 		"kdJenisRekanan": $scope.item.kdJenisRekanan,
					 		"qJenisRekanan": $scope.item.qJenisRekanan,
					 		"jenisRekanan": $scope.item.jenisRekanan,
					 		"jenisRekananId": $scope.item.jenisRekananId,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
		        });
		    }
		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }

		}
		]);
});