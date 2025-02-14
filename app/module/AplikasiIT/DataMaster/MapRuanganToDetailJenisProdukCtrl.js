define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapRuanganToDetailJenisProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapRuanganToDetailJenisProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapRuanganToDetailJenisProduk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnDepartemen = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "alamatEmail",
				"title": "alamat Email"
			},
			{
				"field": "faksimile",
				"title": "faksimile"
			},
			{
				"field": "fixedPhone",
				"title": "fixed Phone"
			},
			{
				"field": "kdDepartemen",
				"title": "kd Departemen"
			},
			{
				"field": "jenisPerawatan",
				"title": "jenis Perawatan"
			},
			{
				"field": "jenisPerawatanId",
				"title": "jenis Perawatan Id"
			},
			{
				"field": "pegawaiKepala",
				"title": "pegawai Kepala"
			},
			{
				"field": "pegawaiKepalaId",
				"title": "pegawai Kepala Id"
			},
			{
				"field": "mobilePhone",
				"title": "mobile Phone"
			},
			{
				"field": "namaDepartemen",
				"title": "nama Departemen"
			},
			{
				"field": "prefixNoAntrian",
				"title": "prefix No Antrian"
			},
			{
				"field": "qDepartemen",
				"title": "q Departemen"
			},
			{
				"field": "website",
				"title": "website"
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
 columns: $scope.columnMapRuanganToDetailJenisProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.detailJenisProduk = current.detailJenisProduk;
$scope.item.detailJenisProdukId = current.detailJenisProdukId;
$scope.item.ruangan = current.ruangan;
$scope.item.ruanganId = current.ruanganId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToDetailJenisProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToDetailJenisProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MapRuanganToDetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
init();
$scope.item = {};
 });
  }
////edit
 $scope.edit = function()
  {	
   var data = {
 "class": "MapRuanganToDetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
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
IPSRSService.getFieldListData("DetailJenisProduk&select=id,namaExternal", true).then(function(dat){
$scope.listdetailjenisproduk= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});

}
		]);
});