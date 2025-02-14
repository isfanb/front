define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SettingDataFixedCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=SettingDataFixed", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.SettingDataFixed;
					
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
			$scope.columnSettingDataFixed = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "fieldKeyTabelRelasi",
				"title": "field Key Tabel Relasi"
			},
			{
				"field": "fieldReportDisplayTabelRelasi",
				"title": "field Report Display Tabel Relasi"
			},
			{
				"field": "keteranganFungsi",
				"title": "keterangan Fungsi"
			},
			{
				"field": "namaField",
				"title": "nama Field"
			},
			{
				"field": "nilaiField",
				"title": "nilai Field"
			},
			{
				"field": "tabelRelasi",
				"title": "tabel Relasi"
			},
			{
				"field": "typeField",
				"title": "type Field"
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
                columns: $scope.columnSettingDataFixed,
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
				$scope.item.fieldKeyTabelRelasi = current.fieldKeyTabelRelasi;
				$scope.item.fieldReportDisplayTabelRelasi = current.fieldReportDisplayTabelRelasi;
				$scope.item.keteranganFungsi = current.keteranganFungsi;
				$scope.item.namaField = current.namaField;
				$scope.item.nilaiField = current.nilaiField;
				$scope.item.tabelRelasi = current.tabelRelasi;
				$scope.item.typeField = current.typeField;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=SettingDataFixed&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=SettingDataFixed&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "SettingDataFixed",
					"listField": {
							"fieldKeyTabelRelasi": $scope.item.fieldKeyTabelRelasi,
					 		"fieldReportDisplayTabelRelasi": $scope.item.fieldReportDisplayTabelRelasi,
					 		"keteranganFungsi": $scope.item.keteranganFungsi,
					 		"namaField": $scope.item.namaField,
					 		"nilaiField": $scope.item.nilaiField,
					 		"tabelRelasi": $scope.item.tabelRelasi,
					 		"typeField": $scope.item.typeField,
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
					"class": "SettingDataFixed",
					"listField": {
							"id": $scope.item.id,
							"fieldKeyTabelRelasi": $scope.item.fieldKeyTabelRelasi,
					 		"fieldReportDisplayTabelRelasi": $scope.item.fieldReportDisplayTabelRelasi,
					 		"keteranganFungsi": $scope.item.keteranganFungsi,
					 		"namaField": $scope.item.namaField,
					 		"nilaiField": $scope.item.nilaiField,
					 		"tabelRelasi": $scope.item.tabelRelasi,
					 		"typeField": $scope.item.typeField,
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