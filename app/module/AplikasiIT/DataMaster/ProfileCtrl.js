define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('ProfileCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Profile", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Profile;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnProfile = [
{
"field": "No",
"title": "No"
},
{
"field": "alamatEmail",
"title": "alamat Email"
},
{
"field": "alamatLengkap",
"title": "alamat Lengkap"
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
"field": "gambarLogo",
"title": "gambar Logo"
},
{
"field": "account",
"title": "account"
},
{
"field": "accountId",
"title": "account Id"
},
{
"field": "departemen",
"title": "departemen"
},
{
"field": "departemenId",
"title": "departemen Id"
},
{
"field": "desaKelurahan",
"title": "desa Kelurahan"
},
{
"field": "desaKelurahanId",
"title": "desa Kelurahan Id"
},
{
"field": "jenisProfile",
"title": "jenis Profile"
},
{
"field": "jenisProfileId",
"title": "jenis Profile Id"
},
{
"field": "jenisTarif",
"title": "jenis Tarif"
},
{
"field": "jenisTarifId",
"title": "jenis Tarif Id"
},
{
"field": "kecamatan",
"title": "kecamatan"
},
{
"field": "kecamatanId",
"title": "kecamatan Id"
},
{
"field": "kelasLevel",
"title": "kelas Level"
},
{
"field": "kelasLevelId",
"title": "kelas Level Id"
},
{
"field": "kotaKabupaten",
"title": "kota Kabupaten"
},
{
"field": "kotaKabupatenId",
"title": "kota Kabupaten Id"
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
"field": "pemilikProfile",
"title": "pemilik Profile"
},
{
"field": "pemilikProfileId",
"title": "pemilik Profile Id"
},
{
"field": "propinsi",
"title": "propinsi"
},
{
"field": "propinsiId",
"title": "propinsi Id"
},
{
"field": "satuanKerja",
"title": "satuan Kerja"
},
{
"field": "satuanKerjaId",
"title": "satuan Kerja Id"
},
{
"field": "statusAkreditasiLast",
"title": "status Akreditasi Last"
},
{
"field": "statusAkreditasiLastId",
"title": "status Akreditasi Last Id"
},
{
"field": "statusSuratIjinLast",
"title": "status Surat Ijin Last"
},
{
"field": "statusSuratIjinLastId",
"title": "status Surat Ijin Last Id"
},
{
"field": "tahapanAkreditasiLast",
"title": "tahapan Akreditasi Last"
},
{
"field": "tahapanAkreditasiLastId",
"title": "tahapan Akreditasi Last Id"
},
{
"field": "kodePos",
"title": "kode Pos"
},
{
"field": "luasBangunan",
"title": "luas Bangunan"
},
{
"field": "luasTanah",
"title": "luas Tanah"
},
{
"field": "messageToPasien",
"title": "message To Pasien"
},
{
"field": "mobilePhone",
"title": "mobile Phone"
},
{
"field": "mottoSemboyan",
"title": "motto Semboyan"
},
{
"field": "namaLengkap",
"title": "nama Lengkap"
},
{
"field": "noPKP",
"title": "no PKP"
},
{
"field": "noSuratIjinLast",
"title": "no Surat Ijin Last"
},
{
"field": "nPWP",
"title": "n PWP"
},
{
"field": "qProfile",
"title": "q Profile"
},
{
"field": "rTRW",
"title": "r TRW"
},
{
"field": "signatureByLast",
"title": "signature By Last"
},
{
"field": "tglAkreditasiLast",
"title": "tgl Akreditasi Last"
},
{
"field": "tglRegistrasi",
"title": "tgl Registrasi"
},
{
"field": "tglSuratIjinExpiredLast",
"title": "tgl Surat Ijin Expired Last"
},
{
"field": "tglSuratIjinLast",
"title": "tgl Surat Ijin Last"
},
{
"field": "website",
"title": "website"
},
{
"field": "id",
"title": "id"
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
 columns: $scope.columnProfile,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.alamatEmail = current.alamatEmail;
$scope.item.alamatLengkap = current.alamatLengkap;
$scope.item.faksimile = current.faksimile;
$scope.item.fixedPhone = current.fixedPhone;
$scope.item.gambarLogo = current.gambarLogo;
$scope.item.account = current.account;
$scope.item.accountId = current.accountId;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.desaKelurahan = current.desaKelurahan;
$scope.item.desaKelurahanId = current.desaKelurahanId;
$scope.item.jenisProfile = current.jenisProfile;
$scope.item.jenisProfileId = current.jenisProfileId;
$scope.item.jenisTarif = current.jenisTarif;
$scope.item.jenisTarifId = current.jenisTarifId;
$scope.item.kecamatan = current.kecamatan;
$scope.item.kecamatanId = current.kecamatanId;
$scope.item.kelasLevel = current.kelasLevel;
$scope.item.kelasLevelId = current.kelasLevelId;
$scope.item.kotaKabupaten = current.kotaKabupaten;
$scope.item.kotaKabupatenId = current.kotaKabupatenId;
$scope.item.pegawaiKepala = current.pegawaiKepala;
$scope.item.pegawaiKepalaId = current.pegawaiKepalaId;
$scope.item.pemilikProfile = current.pemilikProfile;
$scope.item.pemilikProfileId = current.pemilikProfileId;
$scope.item.propinsi = current.propinsi;
$scope.item.propinsiId = current.propinsiId;
$scope.item.satuanKerja = current.satuanKerja;
$scope.item.satuanKerjaId = current.satuanKerjaId;
$scope.item.statusAkreditasiLast = current.statusAkreditasiLast;
$scope.item.statusAkreditasiLastId = current.statusAkreditasiLastId;
$scope.item.statusSuratIjinLast = current.statusSuratIjinLast;
$scope.item.statusSuratIjinLastId = current.statusSuratIjinLastId;
$scope.item.tahapanAkreditasiLast = current.tahapanAkreditasiLast;
$scope.item.tahapanAkreditasiLastId = current.tahapanAkreditasiLastId;
$scope.item.kodePos = current.kodePos;
$scope.item.luasBangunan = current.luasBangunan;
$scope.item.luasTanah = current.luasTanah;
$scope.item.messageToPasien = current.messageToPasien;
$scope.item.mobilePhone = current.mobilePhone;
$scope.item.mottoSemboyan = current.mottoSemboyan;
$scope.item.namaLengkap = current.namaLengkap;
$scope.item.noPKP = current.noPKP;
$scope.item.noSuratIjinLast = current.noSuratIjinLast;
$scope.item.nPWP = current.nPWP;
$scope.item.qProfile = current.qProfile;
$scope.item.rTRW = current.rTRW;
$scope.item.signatureByLast = current.signatureByLast;
$scope.item.tglAkreditasiLast = current.tglAkreditasiLast;
$scope.item.tglRegistrasi = current.tglRegistrasi;
$scope.item.tglSuratIjinExpiredLast = current.tglSuratIjinExpiredLast;
$scope.item.tglSuratIjinLast = current.tglSuratIjinLast;
$scope.item.website = current.website;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Profile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Profile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "Profile",
	"listField": {
"alamatEmail": $scope.item.alamatEmail,
"alamatLengkap": $scope.item.alamatLengkap,
"faksimile": $scope.item.faksimile,
"fixedPhone": $scope.item.fixedPhone,
"gambarLogo": $scope.item.gambarLogo,
"account": $scope.item.account,
"accountId": $scope.item.accountId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"desaKelurahan": $scope.item.desaKelurahan,
"desaKelurahanId": $scope.item.desaKelurahanId,
"jenisProfile": $scope.item.jenisProfile,
"jenisProfileId": $scope.item.jenisProfileId,
"jenisTarif": $scope.item.jenisTarif,
"jenisTarifId": $scope.item.jenisTarifId,
"kecamatan": $scope.item.kecamatan,
"kecamatanId": $scope.item.kecamatanId,
"kelasLevel": $scope.item.kelasLevel,
"kelasLevelId": $scope.item.kelasLevelId,
"kotaKabupaten": $scope.item.kotaKabupaten,
"kotaKabupatenId": $scope.item.kotaKabupatenId,
"pegawaiKepala": $scope.item.pegawaiKepala,
"pegawaiKepalaId": $scope.item.pegawaiKepalaId,
"pemilikProfile": $scope.item.pemilikProfile,
"pemilikProfileId": $scope.item.pemilikProfileId,
"propinsi": $scope.item.propinsi,
"propinsiId": $scope.item.propinsiId,
"satuanKerja": $scope.item.satuanKerja,
"satuanKerjaId": $scope.item.satuanKerjaId,
"statusAkreditasiLast": $scope.item.statusAkreditasiLast,
"statusAkreditasiLastId": $scope.item.statusAkreditasiLastId,
"statusSuratIjinLast": $scope.item.statusSuratIjinLast,
"statusSuratIjinLastId": $scope.item.statusSuratIjinLastId,
"tahapanAkreditasiLast": $scope.item.tahapanAkreditasiLast,
"tahapanAkreditasiLastId": $scope.item.tahapanAkreditasiLastId,
"kodePos": $scope.item.kodePos,
"luasBangunan": $scope.item.luasBangunan,
"luasTanah": $scope.item.luasTanah,
"messageToPasien": $scope.item.messageToPasien,
"mobilePhone": $scope.item.mobilePhone,
"mottoSemboyan": $scope.item.mottoSemboyan,
"namaLengkap": $scope.item.namaLengkap,
"noPKP": $scope.item.noPKP,
"noSuratIjinLast": $scope.item.noSuratIjinLast,
"nPWP": $scope.item.nPWP,
"qProfile": $scope.item.qProfile,
"rTRW": $scope.item.rTRW,
"signatureByLast": $scope.item.signatureByLast,
"tglAkreditasiLast": $scope.item.tglAkreditasiLast,
"tglRegistrasi": $scope.item.tglRegistrasi,
"tglSuratIjinExpiredLast": $scope.item.tglSuratIjinExpiredLast,
"tglSuratIjinLast": $scope.item.tglSuratIjinLast,
"website": $scope.item.website,
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

 $scope.edit = function()
  {	
   var data = {
 "class": "Profile",
	"listField": {
"alamatEmail": $scope.item.alamatEmail,
"alamatLengkap": $scope.item.alamatLengkap,
"faksimile": $scope.item.faksimile,
"fixedPhone": $scope.item.fixedPhone,
"gambarLogo": $scope.item.gambarLogo,
"account": $scope.item.account,
"accountId": $scope.item.accountId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"desaKelurahan": $scope.item.desaKelurahan,
"desaKelurahanId": $scope.item.desaKelurahanId,
"jenisProfile": $scope.item.jenisProfile,
"jenisProfileId": $scope.item.jenisProfileId,
"jenisTarif": $scope.item.jenisTarif,
"jenisTarifId": $scope.item.jenisTarifId,
"kecamatan": $scope.item.kecamatan,
"kecamatanId": $scope.item.kecamatanId,
"kelasLevel": $scope.item.kelasLevel,
"kelasLevelId": $scope.item.kelasLevelId,
"kotaKabupaten": $scope.item.kotaKabupaten,
"kotaKabupatenId": $scope.item.kotaKabupatenId,
"pegawaiKepala": $scope.item.pegawaiKepala,
"pegawaiKepalaId": $scope.item.pegawaiKepalaId,
"pemilikProfile": $scope.item.pemilikProfile,
"pemilikProfileId": $scope.item.pemilikProfileId,
"propinsi": $scope.item.propinsi,
"propinsiId": $scope.item.propinsiId,
"satuanKerja": $scope.item.satuanKerja,
"satuanKerjaId": $scope.item.satuanKerjaId,
"statusAkreditasiLast": $scope.item.statusAkreditasiLast,
"statusAkreditasiLastId": $scope.item.statusAkreditasiLastId,
"statusSuratIjinLast": $scope.item.statusSuratIjinLast,
"statusSuratIjinLastId": $scope.item.statusSuratIjinLastId,
"tahapanAkreditasiLast": $scope.item.tahapanAkreditasiLast,
"tahapanAkreditasiLastId": $scope.item.tahapanAkreditasiLastId,
"kodePos": $scope.item.kodePos,
"luasBangunan": $scope.item.luasBangunan,
"luasTanah": $scope.item.luasTanah,
"messageToPasien": $scope.item.messageToPasien,
"mobilePhone": $scope.item.mobilePhone,
"mottoSemboyan": $scope.item.mottoSemboyan,
"namaLengkap": $scope.item.namaLengkap,
"noPKP": $scope.item.noPKP,
"noSuratIjinLast": $scope.item.noSuratIjinLast,
"nPWP": $scope.item.nPWP,
"qProfile": $scope.item.qProfile,
"rTRW": $scope.item.rTRW,
"signatureByLast": $scope.item.signatureByLast,
"tglAkreditasiLast": $scope.item.tglAkreditasiLast,
"tglRegistrasi": $scope.item.tglRegistrasi,
"tglSuratIjinExpiredLast": $scope.item.tglSuratIjinExpiredLast,
"tglSuratIjinLast": $scope.item.tglSuratIjinLast,
"website": $scope.item.website,
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
IPSRSService.getFieldListData("ChartOfAccount&select=id,namaExternal", true).then(function(dat){
$scope.listaccount= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("DesaKelurahan&select=id,namaExternal", true).then(function(dat){
$scope.listdesakelurahan= dat.data;
});
IPSRSService.getFieldListData("JenisProfile&select=id,namaExternal", true).then(function(dat){
$scope.listjenisprofile= dat.data;
});
IPSRSService.getFieldListData("JenisTarif&select=id,namaExternal", true).then(function(dat){
$scope.listjenistarif= dat.data;
});
IPSRSService.getFieldListData("Kecamatan&select=id,namaExternal", true).then(function(dat){
$scope.listkecamatan= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelaslevel= dat.data;
});
IPSRSService.getFieldListData("KotaKabupaten&select=id,namaExternal", true).then(function(dat){
$scope.listkotakabupaten= dat.data;
});
IPSRSService.getFieldListData("LoginUser&select=id,namaExternal", true).then(function(dat){
$scope.listpegawaikepala= dat.data;
});
IPSRSService.getFieldListData("PemilikProfile&select=id,namaExternal", true).then(function(dat){
$scope.listpemilikprofile= dat.data;
});
IPSRSService.getFieldListData("Propinsi&select=id,namaExternal", true).then(function(dat){
$scope.listpropinsi= dat.data;
});
IPSRSService.getFieldListData("SatuanKerja&select=id,namaExternal", true).then(function(dat){
$scope.listsatuankerja= dat.data;
});
IPSRSService.getFieldListData("StatusAkreditasi&select=id,namaExternal", true).then(function(dat){
$scope.liststatusakreditasilast= dat.data;
});
IPSRSService.getFieldListData("StatusSuratIjin&select=id,namaExternal", true).then(function(dat){
$scope.liststatussuratijinlast= dat.data;
});
IPSRSService.getFieldListData("TahapanAkreditasi&select=id,namaExternal", true).then(function(dat){
$scope.listtahapanakreditasilast= dat.data;
});
}
]);
});