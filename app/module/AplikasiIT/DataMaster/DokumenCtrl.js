define(['initialize'], function(initialize) {
	'use strict';

initialize.controller('DokumenCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Dokumen", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Dokumen;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnDokumen = [
{
"field": "No",
"title": "No"
},
{
"field": "deskripsiDokumen",
"title": "deskripsi Dokumen"
},
{
"field": "isDokumenInOutInt",
"title": "is Dokumen In Out Int"
},
{
"field": "kdDokumen",
"title": "kd Dokumen"
},
{
"field": "dokumenHead",
"title": "dokumen Head"
},
{
"field": "dokumenHeadId",
"title": "dokumen Head Id"
},
{
"field": "jenisDokumen",
"title": "jenis Dokumen"
},
{
"field": "jenisDokumenId",
"title": "jenis Dokumen Id"
},
{
"field": "kategoryDokumen",
"title": "kategory Dokumen"
},
{
"field": "kategoryDokumenId",
"title": "kategory Dokumen Id"
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
"field": "pegawaiPembuat",
"title": "pegawai Pembuat"
},
{
"field": "pegawaiPembuatId",
"title": "pegawai Pembuat Id"
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
"field": "namaJudulDokumen",
"title": "nama Judul Dokumen"
},
{
"field": "noDokumen",
"title": "no Dokumen"
},
{
"field": "pathFile",
"title": "path File"
},
{
"field": "namaPegawaiPembuat",
"title": "nama Pegawai Pembuat"
},
{
"field": "qDokumen",
"title": "q Dokumen"
},
{
"field": "qtyLampiran",
"title": "qty Lampiran"
},
{
"field": "tglDokumen",
"title": "tgl Dokumen"
},
{
"field": "surat",
"title": "surat"
},
{
"field": "suratId",
"title": "surat Id"
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
 columns: $scope.columnDokumen,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.deskripsiDokumen = current.deskripsiDokumen;
$scope.item.isDokumenInOutInt = current.isDokumenInOutInt;
$scope.item.kdDokumen = current.kdDokumen;
$scope.item.dokumenHead = current.dokumenHead;
$scope.item.dokumenHeadId = current.dokumenHeadId;
$scope.item.jenisDokumen = current.jenisDokumen;
$scope.item.jenisDokumenId = current.jenisDokumenId;
$scope.item.kategoryDokumen = current.kategoryDokumen;
$scope.item.kategoryDokumenId = current.kategoryDokumenId;
$scope.item.lokasi = current.lokasi;
$scope.item.lokasiId = current.lokasiId;
$scope.item.pegawaiPembuat = current.pegawaiPembuat;
$scope.item.pegawaiPembuatId = current.pegawaiPembuatId;
$scope.item.ruangan = current.ruangan;
$scope.item.ruanganId = current.ruanganId;
$scope.item.namaJudulDokumen = current.namaJudulDokumen;
$scope.item.noDokumen = current.noDokumen;
$scope.item.pathFile = current.pathFile;
$scope.item.namaPegawaiPembuat = current.namaPegawaiPembuat;
$scope.item.qDokumen = current.qDokumen;
$scope.item.qtyLampiran = current.qtyLampiran;
$scope.item.tglDokumen = current.tglDokumen;
$scope.item.tglBerakhir = current.tglBerakhir;
$scope.item.tglTerbit = current.tglTerbit;
$scope.item.surat = current.surat;
$scope.item.suratId = current.suratId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Dokumen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Dokumen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "Dokumen",
	"listField": {
"deskripsiDokumen": $scope.item.deskripsiDokumen,
"isDokumenInOutInt": $scope.item.isDokumenInOutInt,
"kdDokumen": $scope.item.kdDokumen,
"dokumenHead": $scope.item.dokumenHead,
"dokumenHeadId": $scope.item.dokumenHeadId,
"jenisDokumen": $scope.item.jenisDokumen,
"jenisDokumenId": $scope.item.jenisDokumenId,
"kategoryDokumen": $scope.item.kategoryDokumen,
"kategoryDokumenId": $scope.item.kategoryDokumenId,
"lokasi": $scope.item.lokasi,
"lokasiId": $scope.item.lokasiId,
"pegawaiPembuat": $scope.item.pegawaiPembuat,
"pegawaiPembuatId": $scope.item.pegawaiPembuatId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
"namaJudulDokumen": $scope.item.namaJudulDokumen,
"noDokumen": $scope.item.noDokumen,
"pathFile": $scope.item.pathFile,
"namaPegawaiPembuat": $scope.item.namaPegawaiPembuat,
"qDokumen": $scope.item.qDokumen,
"qtyLampiran": $scope.item.qtyLampiran,
"tglDokumen": $scope.item.tglDokumen,
"tglBerakhir": $scope.item.tglBerakhir,
"tglTerbit": $scope.item.tglTerbit,
"surat": $scope.item.surat,
"suratId": $scope.item.suratId,
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
 "class": "Dokumen",
	"listField": {
"deskripsiDokumen": $scope.item.deskripsiDokumen,
"isDokumenInOutInt": $scope.item.isDokumenInOutInt,
"kdDokumen": $scope.item.kdDokumen,
"dokumenHead": $scope.item.dokumenHead,
"dokumenHeadId": $scope.item.dokumenHeadId,
"jenisDokumen": $scope.item.jenisDokumen,
"jenisDokumenId": $scope.item.jenisDokumenId,
"kategoryDokumen": $scope.item.kategoryDokumen,
"kategoryDokumenId": $scope.item.kategoryDokumenId,
"lokasi": $scope.item.lokasi,
"lokasiId": $scope.item.lokasiId,
"pegawaiPembuat": $scope.item.pegawaiPembuat,
"pegawaiPembuatId": $scope.item.pegawaiPembuatId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
"namaJudulDokumen": $scope.item.namaJudulDokumen,
"noDokumen": $scope.item.noDokumen,
"pathFile": $scope.item.pathFile,
"namaPegawaiPembuat": $scope.item.namaPegawaiPembuat,
"qDokumen": $scope.item.qDokumen,
"qtyLampiran": $scope.item.qtyLampiran,
"tglDokumen": $scope.item.tglDokumen,
"tglBerakhir": $scope.item.tglBerakhir,
"tglTerbit": $scope.item.tglTerbit,
"surat": $scope.item.surat,
"suratId": $scope.item.suratId,
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
IPSRSService.getFieldListData("Dokumen&select=id,namaJudulDokumen", true).then(function(dat){
$scope.listdokumenhead= dat.data;
});
IPSRSService.getFieldListData("JenisDokumen&select=id,namaExternal", true).then(function(dat){
$scope.listjenisdokumen= dat.data;
});
IPSRSService.getFieldListData("KategoryDokumen&select=id,namaExternal", true).then(function(dat){
$scope.listkategorydokumen= dat.data;
});
IPSRSService.getFieldListData("Lokasi&select=id,namaExternal", true).then(function(dat){
$scope.listlokasi= dat.data;
});
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listpegawaipembuat= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});
IPSRSService.getFieldListData("Surat&select=id,nama", true).then(function(dat){
$scope.listsurat= dat.data;
});
/////end
}
		]);
});
