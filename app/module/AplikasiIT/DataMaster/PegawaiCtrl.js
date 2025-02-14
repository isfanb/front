define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PegawaiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Pegawai", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Pegawai;
					
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
			IPSRSService.getFieldListData("Kedudukan&select=id,namaExternal", true).then(function(dat){
				$scope.listkedudukan = dat.data;
			});

			IPSRSService.getFieldListData("KodeGapok&select=id,namaExternal", true).then(function(dat){
				$scope.listkodeGapok = dat.data;
			});

			IPSRSService.getFieldListData("Golongan&select=id,name", true).then(function(dat){
				$scope.listGolongan = dat.data;
			});
			IPSRSService.getFieldListData("StatusKawin&select=id,namaExternal", true).then(function(dat){
				$scope.liststatusKawin = dat.data;
			});
			IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listPegawai = dat.data;
			});
			IPSRSService.getFieldListData("KategoryPegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listdetailKategoryPegawai = dat.data;
			});

			IPSRSService.getFieldListData("Eselon&select=id,namaExternal", true).then(function(dat){
				$scope.listeselon = dat.data;
			});
			IPSRSService.getFieldListData("GolonganDarah&select=id,namaExternal", true).then(function(dat){
				$scope.listgolonganDarah = dat.data;
			});
			IPSRSService.getFieldListData("JabatanFungsional&select=id,namaExternal", true).then(function(dat){
				$scope.listjabatanFungsional = dat.data;
			});
			IPSRSService.getFieldListData("JabatanLamar&select=id,namaExternal", true).then(function(dat){
				$scope.listjabatanLamar = dat.data;
			});
			IPSRSService.getFieldListData("JabatanStruktural&select=id,namaExternal", true).then(function(dat){
				$scope.listjabatanStruktural = dat.data;
			});
			IPSRSService.getFieldListData("JenisKelamin&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisKelamin = dat.data;
			});
			IPSRSService.getFieldListData("JenisPegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisPegawai = dat.data;
			});
			IPSRSService.getFieldListData("JenisPegawaiLamar&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisPegawaiLamar = dat.data;
			});
			IPSRSService.getFieldListData("KualifikasiJurusan&select=id,namaExternal", true).then(function(dat){
				$scope.listkualifikasiJurusan = dat.data;
			});
			IPSRSService.getFieldListData("Negara&select=id,namaExternal", true).then(function(dat){
				$scope.listnegara = dat.data;
			});
			IPSRSService.getFieldListData("Pangkat&select=id,namaExternal", true).then(function(dat){
				$scope.listpangkat = dat.data;
			});
			IPSRSService.getFieldListData("Pendidikan&select=id,namaExternal", true).then(function(dat){
				$scope.listpendidikan = dat.data;
			});
			IPSRSService.getFieldListData("PenghasilanTidakKenaPajak&select=id,namaExternal", true).then(function(dat){
				$scope.listpenghasilanTidakKenaPajak = dat.data;
			});
			IPSRSService.getFieldListData("Range&select=id,namaExternal", true).then(function(dat){
				$scope.listrange = dat.data;
			});
			IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
				$scope.listruangan = dat.data;
			});
			IPSRSService.getFieldListData("ShiftKerja&select=id,namaExternal", true).then(function(dat){
				$scope.listshiftKerja = dat.data;
			});
			IPSRSService.getFieldListData("KategoryPegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listkategoryPegawai = dat.data;
			});
			IPSRSService.getFieldListData("StatusPegawai&select=id,namaExternal", true).then(function(dat){
				$scope.liststatusPegawai = dat.data;
			});
			IPSRSService.getFieldListData("StatusPerkawinanPegawai&select=id,namaExternal", true).then(function(dat){
				$scope.liststatusPerkawinanPegawai = dat.data;
			});
			IPSRSService.getFieldListData("Suku&select=id,namaExternal", true).then(function(dat){
				$scope.listsuku = dat.data;
			});
			IPSRSService.getFieldListData("TitlePasien&select=id,namaExternal", true).then(function(dat){
				$scope.listtitlePasien = dat.data;
			});
			IPSRSService.getFieldListData("TypePegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listtypePegawai = dat.data;
			});
			IPSRSService.getFieldListData("SatuanKerja&select=id,namaExternal", true).then(function(dat){
				$scope.listsatuanKerja = dat.data;
			});

			$scope.columnPegawai = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "nip",
				"title": "nip"
			},
			{
				"field": "nama",
				"title": "nama"
			},
			{
				"field": "kedudukan",
				"title": "kedudukan"
			},
			{
				"field": "kedudukanId",
				"title": "kedudukan Id"
			},
			{
				"field": "tanggalMeninggal",
				"title": "tanggal Meninggal"
			},
			{
				"field": "idFinger",
				"title": "id Finger"
			},
			{
				"field": "kodeGapok",
				"title": "kode Gapok"
			},
			{
				"field": "kodeGapokId",
				"title": "kode Gapok Id"
			},
			{
				"field": "Golongan",
				"title": "Golongan"
			},
			{
				"field": "GolonganId",
				"title": "Golongan Id"
			},
			{
				"field": "pensiun",
				"title": "pensiun"
			},
			{
				"field": "tunjanganFungsional",
				"title": "tunjangan Fungsional"
			},
			{
				"field": "tunjanganPapua",
				"title": "tunjangan Papua"
			},
			{
				"field": "wilayahTerperinci",
				"title": "wilayah Terperinci"
			},
			{
				"field": "tunjanganUmum",
				"title": "tunjangan Umum"
			},
			{
				"field": "statusKawin",
				"title": "status Kawin"
			},
			{
				"field": "statusKawinId",
				"title": "status Kawin Id"
			},
			{
				"field": "beras",
				"title": "beras"
			},
			{
				"field": "sewaRumah",
				"title": "sewa Rumah"
			},
			{
				"field": "nomorRekening",
				"title": "nomor Rekening"
			},
			{
				"field": "namaRekening",
				"title": "nama Rekening"
			},
			{
				"field": "kodeBank",
				"title": "kode Bank"
			},
			{
				"field": "alamat",
				"title": "alamat"
			},
			{
				"field": "kodePos",
				"title": "kode Pos"
			},
			{
				"field": "bankRekeningAtasNama",
				"title": "bank Rekening Atas Nama"
			},
			{
				"field": "bankRekeningNama",
				"title": "bank Rekening Nama"
			},
			{
				"field": "bankRekeningNomor",
				"title": "bank Rekening Nomor"
			},
			{
				"field": "fingerPrintId",
				"title": "finger Print Id"
			},
			{
				"field": "agama",
				"title": "agama"
			},
			{
				"field": "agamaId",
				"title": "agama Id"
			},
			{
				"field": "detailKategoryPegawai",
				"title": "detail Kategory Pegawai"
			},
			{
				"field": "detailKategoryPegawaiId",
				"title": "detail Kategory Pegawai Id"
			},
			{
				"field": "dokumen",
				"title": "dokumen"
			},
			{
				"field": "dokumenId",
				"title": "dokumen Id"
			},
			{
				"field": "eselon",
				"title": "eselon"
			},
			{
				"field": "eselonId",
				"title": "eselon Id"
			},
			{
				"field": "golonganDarah",
				"title": "golongan Darah"
			},
			{
				"field": "golonganDarahId",
				"title": "golongan Darah Id"
			},
			{
				"field": "jabatanFungsional",
				"title": "jabatan Fungsional"
			},
			{
				"field": "jabatanFungsionalId",
				"title": "jabatan Fungsional Id"
			},
			{
				"field": "jabatanLamar",
				"title": "jabatan Lamar"
			},
			{
				"field": "jabatanLamarId",
				"title": "jabatan Lamar Id"
			},
			{
				"field": "jabatanStruktural",
				"title": "jabatan Struktural"
			},
			{
				"field": "jabatanStrukturalId",
				"title": "jabatan Struktural Id"
			},
			{
				"field": "jenisKelamin",
				"title": "jenis Kelamin"
			},
			{
				"field": "jenisKelaminId",
				"title": "jenis Kelamin Id"
			},
			{
				"field": "jenisPegawai",
				"title": "jenis Pegawai"
			},
			{
				"field": "jenisPegawaiId",
				"title": "jenis Pegawai Id"
			},
			{
				"field": "jenisPegawaiLamar",
				"title": "jenis Pegawai Lamar"
			},
			{
				"field": "jenisPegawaiLamarId",
				"title": "jenis Pegawai Lamar Id"
			},
			{
				"field": "kualifikasiJurusan",
				"title": "kualifikasi Jurusan"
			},
			{
				"field": "kualifikasiJurusanId",
				"title": "kualifikasi Jurusan Id"
			},
			{
				"field": "negara",
				"title": "negara"
			},
			{
				"field": "negaraId",
				"title": "negara Id"
			},
			{
				"field": "pangkat",
				"title": "pangkat"
			},
			{
				"field": "pangkatId",
				"title": "pangkat Id"
			},
			{
				"field": "pendidikan",
				"title": "pendidikan"
			},
			{
				"field": "pendidikanId",
				"title": "pendidikan Id"
			},
			{
				"field": "penghasilanTidakKenaPajak",
				"title": "penghasilan Tidak Kena Pajak"
			},
			{
				"field": "penghasilanTidakKenaPajakId",
				"title": "penghasilan Tidak Kena Pajak Id"
			},
			{
				"field": "range",
				"title": "range"
			},
			{
				"field": "rangeId",
				"title": "range Id"
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
				"field": "shiftKerja",
				"title": "shift Kerja"
			},
			{
				"field": "shiftKerjaId",
				"title": "shift Kerja Id"
			},
			{
				"field": "kategoryPegawai",
				"title": "kategory Pegawai"
			},
			{
				"field": "kategoryPegawaiId",
				"title": "kategory Pegawai Id"
			},
			{
				"field": "statusPegawai",
				"title": "status Pegawai"
			},
			{
				"field": "statusPegawaiId",
				"title": "status Pegawai Id"
			},
			{
				"field": "statusPerkawinanPegawai",
				"title": "status Perkawinan Pegawai"
			},
			{
				"field": "statusPerkawinanPegawaiId",
				"title": "status Perkawinan Pegawai Id"
			},
			{
				"field": "suku",
				"title": "suku"
			},
			{
				"field": "sukuId",
				"title": "suku Id"
			},
			{
				"field": "titlePasien",
				"title": "title Pasien"
			},
			{
				"field": "titlePasienId",
				"title": "title Pasien Id"
			},
			{
				"field": "typePegawai",
				"title": "type Pegawai"
			},
			{
				"field": "typePegawaiId",
				"title": "type Pegawai Id"
			},
			{
				"field": "namaKeluarga",
				"title": "nama Keluarga"
			},
			{
				"field": "namaLengkap",
				"title": "nama Lengkap"
			},
			{
				"field": "namaPanggilan",
				"title": "nama Panggilan"
			},
			{
				"field": "nikIntern",
				"title": "nik Intern"
			},
			{
				"field": "nipPns",
				"title": "nip Pns"
			},
			{
				"field": "noIdentitas",
				"title": "no Identitas"
			},
			{
				"field": "noCm",
				"title": "no Cm"
			},
			{
				"field": "noStruk_TTujuanLastId",
				"title": "no Struk _TTujuan Last Id"
			},
			{
				"field": "npwp",
				"title": "npwp"
			},
			{
				"field": "photoDiri",
				"title": "photo Diri"
			},
			{
				"field": "qPegawai",
				"title": "q Pegawai"
			},
			{
				"field": "qtyAnak",
				"title": "qty Anak"
			},
			{
				"field": "qtyTanggungan",
				"title": "qty Tanggungan"
			},
			{
				"field": "qtyTotalJiwa",
				"title": "qty Total Jiwa"
			},
			{
				"field": "statusRhesus",
				"title": "status Rhesus"
			},
			{
				"field": "tempatLahir",
				"title": "tempat Lahir"
			},
			{
				"field": "totalNilaiScore",
				"title": "total Nilai Score"
			},
			{
				"field": "email",
				"title": "email"
			},
			{
				"field": "emailAlternatif",
				"title": "email Alternatif"
			},
			{
				"field": "noTlp",
				"title": "no Tlp"
			},
			{
				"field": "noHandphone",
				"title": "no Handphone"
			},
			{
				"field": "tglMasuk",
				"title": "tgl Masuk"
			},
			{
				"field": "tglLahir",
				"title": "tgl Lahir"
			},
			{
				"field": "noBPJS",
				"title": "no BPJS"
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
                columns: $scope.columnPegawai,
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
				$scope.item.nip = current.nip;
				$scope.item.nama = current.nama;
				$scope.item.kedudukan = current.kedudukan;
				$scope.item.kedudukanId = current.kedudukanId;
				$scope.item.tanggalMeninggal = current.tanggalMeninggal;
				$scope.item.idFinger = current.idFinger;
				$scope.item.kodeGapok = current.kodeGapok;
				$scope.item.kodeGapokId = current.kodeGapokId;
				$scope.item.Golongan = current.Golongan;
				$scope.item.GolonganId = current.GolonganId;
				$scope.item.pensiun = current.pensiun;
				$scope.item.tunjanganFungsional = current.tunjanganFungsional;
				$scope.item.tunjanganPapua = current.tunjanganPapua;
				$scope.item.wilayahTerperinci = current.wilayahTerperinci;
				$scope.item.tunjanganUmum = current.tunjanganUmum;
				$scope.item.statusKawin = current.statusKawin;
				$scope.item.statusKawinId = current.statusKawinId;
				$scope.item.beras = current.beras;
				$scope.item.sewaRumah = current.sewaRumah;
				$scope.item.nomorRekening = current.nomorRekening;
				$scope.item.namaRekening = current.namaRekening;
				$scope.item.kodeBank = current.kodeBank;
				$scope.item.alamat = current.alamat;
				$scope.item.kodePos = current.kodePos;
				$scope.item.bankRekeningAtasNama = current.bankRekeningAtasNama;
				$scope.item.bankRekeningNama = current.bankRekeningNama;
				$scope.item.bankRekeningNomor = current.bankRekeningNomor;
				$scope.item.fingerPrintId = current.fingerPrintId;
				$scope.item.agama = current.agama;
				$scope.item.agamaId = current.agamaId;
				$scope.item.detailKategoryPegawai = current.detailKategoryPegawai;
				$scope.item.detailKategoryPegawaiId = current.detailKategoryPegawaiId;
				$scope.item.dokumen = current.dokumen;
				$scope.item.dokumenId = current.dokumenId;
				$scope.item.eselon = current.eselon;
				$scope.item.eselonId = current.eselonId;
				$scope.item.golonganDarah = current.golonganDarah;
				$scope.item.golonganDarahId = current.golonganDarahId;
				$scope.item.jabatanFungsional = current.jabatanFungsional;
				$scope.item.jabatanFungsionalId = current.jabatanFungsionalId;
				$scope.item.jabatanLamar = current.jabatanLamar;
				$scope.item.jabatanLamarId = current.jabatanLamarId;
				$scope.item.jabatanStruktural = current.jabatanStruktural;
				$scope.item.jabatanStrukturalId = current.jabatanStrukturalId;
				$scope.item.jenisKelamin = current.jenisKelamin;
				$scope.item.jenisKelaminId = current.jenisKelaminId;
				$scope.item.jenisPegawai = current.jenisPegawai;
				$scope.item.jenisPegawaiId = current.jenisPegawaiId;
				$scope.item.jenisPegawaiLamar = current.jenisPegawaiLamar;
				$scope.item.jenisPegawaiLamarId = current.jenisPegawaiLamarId;
				$scope.item.kualifikasiJurusan = current.kualifikasiJurusan;
				$scope.item.kualifikasiJurusanId = current.kualifikasiJurusanId;
				$scope.item.negara = current.negara;
				$scope.item.negaraId = current.negaraId;
				$scope.item.pangkat = current.pangkat;
				$scope.item.pangkatId = current.pangkatId;
				$scope.item.pendidikan = current.pendidikan;
				$scope.item.pendidikanId = current.pendidikanId;
				$scope.item.penghasilanTidakKenaPajak = current.penghasilanTidakKenaPajak;
				$scope.item.penghasilanTidakKenaPajakId = current.penghasilanTidakKenaPajakId;
				$scope.item.range = current.range;
				$scope.item.rangeId = current.rangeId;
				$scope.item.ruangan = current.ruangan;
				$scope.item.ruanganId = current.ruanganId;
				$scope.item.shiftKerja = current.shiftKerja;
				$scope.item.shiftKerjaId = current.shiftKerjaId;
				$scope.item.kategoryPegawai = current.kategoryPegawai;
				$scope.item.kategoryPegawaiId = current.kategoryPegawaiId;
				$scope.item.statusPegawai = current.statusPegawai;
				$scope.item.statusPegawaiId = current.statusPegawaiId;
				$scope.item.statusPerkawinanPegawai = current.statusPerkawinanPegawai;
				$scope.item.statusPerkawinanPegawaiId = current.statusPerkawinanPegawaiId;
				$scope.item.suku = current.suku;
				$scope.item.sukuId = current.sukuId;
				$scope.item.titlePasien = current.titlePasien;
				$scope.item.titlePasienId = current.titlePasienId;
				$scope.item.typePegawai = current.typePegawai;
				$scope.item.typePegawaiId = current.typePegawaiId;
				$scope.item.namaKeluarga = current.namaKeluarga;
				$scope.item.namaLengkap = current.namaLengkap;
				$scope.item.namaPanggilan = current.namaPanggilan;
				$scope.item.nikIntern = current.nikIntern;
				$scope.item.nipPns = current.nipPns;
				$scope.item.noIdentitas = current.noIdentitas;
				$scope.item.noCm = current.noCm;
				$scope.item.noStruk_TTujuanLastId = current.noStruk_TTujuanLastId;
				$scope.item.npwp = current.npwp;
				$scope.item.photoDiri = current.photoDiri;
				$scope.item.qPegawai = current.qPegawai;
				$scope.item.qtyAnak = current.qtyAnak;
				$scope.item.qtyTanggungan = current.qtyTanggungan;
				$scope.item.qtyTotalJiwa = current.qtyTotalJiwa;
				$scope.item.statusRhesus = current.statusRhesus;
				$scope.item.tempatLahir = current.tempatLahir;
				$scope.item.totalNilaiScore = current.totalNilaiScore;
				$scope.item.email = current.email;
				$scope.item.emailAlternatif = current.emailAlternatif;
				$scope.item.noTlp = current.noTlp;
				$scope.item.noHandphone = current.noHandphone;
				$scope.item.tglMasuk = current.tglMasuk;
				$scope.item.tglLahir = current.tglLahir;
				$scope.item.noBPJS = current.noBPJS;
				$scope.item.satuanKerja = current.satuanKerja;
				$scope.item.satuanKerjaId = current.satuanKerjaId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;


				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Pegawai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Pegawai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.tambah = function()
		    {
		        var data = {
					"class": "Pegawai",
					"listField": {
							"nip": $scope.item.nip,
					 		"nama": $scope.item.nama,
					 		"kedudukan": $scope.item.kedudukan,
					 		"kedudukanId": $scope.item.kedudukanId,
					 		"tanggalMeninggal": $scope.item.tanggalMeninggal,
					 		"idFinger": $scope.item.idFinger,
					 		"kodeGapok": $scope.item.kodeGapok,
					 		"kodeGapokId": $scope.item.kodeGapokId,
					 		"Golongan": $scope.item.Golongan,
					 		"GolonganId": $scope.item.GolonganId,
					 		"pensiun": $scope.item.pensiun,
					 		"tunjanganFungsional": $scope.item.tunjanganFungsional,
					 		"tunjanganPapua": $scope.item.tunjanganPapua,
					 		"wilayahTerperinci": $scope.item.wilayahTerperinci,
					 		"tunjanganUmum": $scope.item.tunjanganUmum,
					 		"statusKawin": $scope.item.statusKawin,
					 		"statusKawinId": $scope.item.statusKawinId,
					 		"beras": $scope.item.beras,
					 		"sewaRumah": $scope.item.sewaRumah,
					 		"nomorRekening": $scope.item.nomorRekening,
					 		"namaRekening": $scope.item.namaRekening,
					 		"kodeBank": $scope.item.kodeBank,
					 		"alamat": $scope.item.alamat,
					 		"kodePos": $scope.item.kodePos,
					 		"bankRekeningAtasNama": $scope.item.bankRekeningAtasNama,
					 		"bankRekeningNama": $scope.item.bankRekeningNama,
					 		"bankRekeningNomor": $scope.item.bankRekeningNomor,
					 		"fingerPrintId": $scope.item.fingerPrintId,
					 		"agama": $scope.item.agama,
					 		"agamaId": $scope.item.agamaId,
					 		"detailKategoryPegawai": $scope.item.detailKategoryPegawai,
					 		"detailKategoryPegawaiId": $scope.item.detailKategoryPegawaiId,
					 		"dokumen": $scope.item.dokumen,
					 		"dokumenId": $scope.item.dokumenId,
					 		"eselon": $scope.item.eselon,
					 		"eselonId": $scope.item.eselonId,
					 		"golonganDarah": $scope.item.golonganDarah,
					 		"golonganDarahId": $scope.item.golonganDarahId,
					 		"jabatanFungsional": $scope.item.jabatanFungsional,
					 		"jabatanFungsionalId": $scope.item.jabatanFungsionalId,
					 		"jabatanLamar": $scope.item.jabatanLamar,
					 		"jabatanLamarId": $scope.item.jabatanLamarId,
					 		"jabatanStruktural": $scope.item.jabatanStruktural,
					 		"jabatanStrukturalId": $scope.item.jabatanStrukturalId,
					 		"jenisKelamin": $scope.item.jenisKelamin,
					 		"jenisKelaminId": $scope.item.jenisKelaminId,
					 		"jenisPegawai": $scope.item.jenisPegawai,
					 		"jenisPegawaiId": $scope.item.jenisPegawaiId,
					 		"jenisPegawaiLamar": $scope.item.jenisPegawaiLamar,
					 		"jenisPegawaiLamarId": $scope.item.jenisPegawaiLamarId,
					 		"kualifikasiJurusan": $scope.item.kualifikasiJurusan,
					 		"kualifikasiJurusanId": $scope.item.kualifikasiJurusanId,
					 		"negara": $scope.item.negara,
					 		"negaraId": $scope.item.negaraId,
					 		"pangkat": $scope.item.pangkat,
					 		"pangkatId": $scope.item.pangkatId,
					 		"pendidikan": $scope.item.pendidikan,
					 		"pendidikanId": $scope.item.pendidikanId,
					 		"penghasilanTidakKenaPajak": $scope.item.penghasilanTidakKenaPajak,
					 		"penghasilanTidakKenaPajakId": $scope.item.penghasilanTidakKenaPajakId,
					 		"range": $scope.item.range,
					 		"rangeId": $scope.item.rangeId,
					 		"ruangan": $scope.item.ruangan,
					 		"ruanganId": $scope.item.ruanganId,
					 		"shiftKerja": $scope.item.shiftKerja,
					 		"shiftKerjaId": $scope.item.shiftKerjaId,
					 		"kategoryPegawai": $scope.item.kategoryPegawai,
					 		"kategoryPegawaiId": $scope.item.kategoryPegawaiId,
					 		"statusPegawai": $scope.item.statusPegawai,
					 		"statusPegawaiId": $scope.item.statusPegawaiId,
					 		"statusPerkawinanPegawai": $scope.item.statusPerkawinanPegawai,
					 		"statusPerkawinanPegawaiId": $scope.item.statusPerkawinanPegawaiId,
					 		"suku": $scope.item.suku,
					 		"sukuId": $scope.item.sukuId,
					 		"titlePasien": $scope.item.titlePasien,
					 		"titlePasienId": $scope.item.titlePasienId,
					 		"typePegawai": $scope.item.typePegawai,
					 		"typePegawaiId": $scope.item.typePegawaiId,
					 		"namaKeluarga": $scope.item.namaKeluarga,
					 		"namaLengkap": $scope.item.namaLengkap,
					 		"namaPanggilan": $scope.item.namaPanggilan,
					 		"nikIntern": $scope.item.nikIntern,
					 		"nipPns": $scope.item.nipPns,
					 		"noIdentitas": $scope.item.noIdentitas,
					 		"noCm": $scope.item.noCm,
					 		"noStruk_TTujuanLastId": $scope.item.noStruk_TTujuanLastId,
					 		"npwp": $scope.item.npwp,
					 		"photoDiri": $scope.item.photoDiri,
					 		"qPegawai": $scope.item.qPegawai,
					 		"qtyAnak": $scope.item.qtyAnak,
					 		"qtyTanggungan": $scope.item.qtyTanggungan,
					 		"qtyTotalJiwa": $scope.item.qtyTotalJiwa,
					 		"statusRhesus": $scope.item.statusRhesus,
					 		"tempatLahir": $scope.item.tempatLahir,
					 		"totalNilaiScore": $scope.item.totalNilaiScore,
					 		"email": $scope.item.email,
					 		"emailAlternatif": $scope.item.emailAlternatif,
					 		"noTlp": $scope.item.noTlp,
					 		"noHandphone": $scope.item.noHandphone,
					 		"tglMasuk": $scope.item.tglMasuk,
					 		"tglLahir": $scope.item.tglLahir,
					 		"noBPJS": $scope.item.noBPJS,
					 		"satuanKerja": $scope.item.satuanKerja,
					 		"satuanKerjaId": $scope.item.satuanKerjaId,
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
					"class": "Pegawai",
					"listField": {
							"id": $scope.item.id,
							"nip": $scope.item.nip,
					 		"nama": $scope.item.nama,
					 		"kedudukan": $scope.item.kedudukan,
					 		"kedudukanId": $scope.item.kedudukanId,
					 		"tanggalMeninggal": $scope.item.tanggalMeninggal,
					 		"idFinger": $scope.item.idFinger,
					 		"kodeGapok": $scope.item.kodeGapok,
					 		"kodeGapokId": $scope.item.kodeGapokId,
					 		"Golongan": $scope.item.Golongan,
					 		"GolonganId": $scope.item.GolonganId,
					 		"pensiun": $scope.item.pensiun,
					 		"tunjanganFungsional": $scope.item.tunjanganFungsional,
					 		"tunjanganPapua": $scope.item.tunjanganPapua,
					 		"wilayahTerperinci": $scope.item.wilayahTerperinci,
					 		"tunjanganUmum": $scope.item.tunjanganUmum,
					 		"statusKawin": $scope.item.statusKawin,
					 		"statusKawinId": $scope.item.statusKawinId,
					 		"beras": $scope.item.beras,
					 		"sewaRumah": $scope.item.sewaRumah,
					 		"nomorRekening": $scope.item.nomorRekening,
					 		"namaRekening": $scope.item.namaRekening,
					 		"kodeBank": $scope.item.kodeBank,
					 		"alamat": $scope.item.alamat,
					 		"kodePos": $scope.item.kodePos,
					 		"bankRekeningAtasNama": $scope.item.bankRekeningAtasNama,
					 		"bankRekeningNama": $scope.item.bankRekeningNama,
					 		"bankRekeningNomor": $scope.item.bankRekeningNomor,
					 		"fingerPrintId": $scope.item.fingerPrintId,
					 		"agama": $scope.item.agama,
					 		"agamaId": $scope.item.agamaId,
					 		"detailKategoryPegawai": $scope.item.detailKategoryPegawai,
					 		"detailKategoryPegawaiId": $scope.item.detailKategoryPegawaiId,
					 		"dokumen": $scope.item.dokumen,
					 		"dokumenId": $scope.item.dokumenId,
					 		"eselon": $scope.item.eselon,
					 		"eselonId": $scope.item.eselonId,
					 		"golonganDarah": $scope.item.golonganDarah,
					 		"golonganDarahId": $scope.item.golonganDarahId,
					 		"jabatanFungsional": $scope.item.jabatanFungsional,
					 		"jabatanFungsionalId": $scope.item.jabatanFungsionalId,
					 		"jabatanLamar": $scope.item.jabatanLamar,
					 		"jabatanLamarId": $scope.item.jabatanLamarId,
					 		"jabatanStruktural": $scope.item.jabatanStruktural,
					 		"jabatanStrukturalId": $scope.item.jabatanStrukturalId,
					 		"jenisKelamin": $scope.item.jenisKelamin,
					 		"jenisKelaminId": $scope.item.jenisKelaminId,
					 		"jenisPegawai": $scope.item.jenisPegawai,
					 		"jenisPegawaiId": $scope.item.jenisPegawaiId,
					 		"jenisPegawaiLamar": $scope.item.jenisPegawaiLamar,
					 		"jenisPegawaiLamarId": $scope.item.jenisPegawaiLamarId,
					 		"kualifikasiJurusan": $scope.item.kualifikasiJurusan,
					 		"kualifikasiJurusanId": $scope.item.kualifikasiJurusanId,
					 		"negara": $scope.item.negara,
					 		"negaraId": $scope.item.negaraId,
					 		"pangkat": $scope.item.pangkat,
					 		"pangkatId": $scope.item.pangkatId,
					 		"pendidikan": $scope.item.pendidikan,
					 		"pendidikanId": $scope.item.pendidikanId,
					 		"penghasilanTidakKenaPajak": $scope.item.penghasilanTidakKenaPajak,
					 		"penghasilanTidakKenaPajakId": $scope.item.penghasilanTidakKenaPajakId,
					 		"range": $scope.item.range,
					 		"rangeId": $scope.item.rangeId,
					 		"ruangan": $scope.item.ruangan,
					 		"ruanganId": $scope.item.ruanganId,
					 		"shiftKerja": $scope.item.shiftKerja,
					 		"shiftKerjaId": $scope.item.shiftKerjaId,
					 		"kategoryPegawai": $scope.item.kategoryPegawai,
					 		"kategoryPegawaiId": $scope.item.kategoryPegawaiId,
					 		"statusPegawai": $scope.item.statusPegawai,
					 		"statusPegawaiId": $scope.item.statusPegawaiId,
					 		"statusPerkawinanPegawai": $scope.item.statusPerkawinanPegawai,
					 		"statusPerkawinanPegawaiId": $scope.item.statusPerkawinanPegawaiId,
					 		"suku": $scope.item.suku,
					 		"sukuId": $scope.item.sukuId,
					 		"titlePasien": $scope.item.titlePasien,
					 		"titlePasienId": $scope.item.titlePasienId,
					 		"typePegawai": $scope.item.typePegawai,
					 		"typePegawaiId": $scope.item.typePegawaiId,
					 		"namaKeluarga": $scope.item.namaKeluarga,
					 		"namaLengkap": $scope.item.namaLengkap,
					 		"namaPanggilan": $scope.item.namaPanggilan,
					 		"nikIntern": $scope.item.nikIntern,
					 		"nipPns": $scope.item.nipPns,
					 		"noIdentitas": $scope.item.noIdentitas,
					 		"noCm": $scope.item.noCm,
					 		"noStruk_TTujuanLastId": $scope.item.noStruk_TTujuanLastId,
					 		"npwp": $scope.item.npwp,
					 		"photoDiri": $scope.item.photoDiri,
					 		"qPegawai": $scope.item.qPegawai,
					 		"qtyAnak": $scope.item.qtyAnak,
					 		"qtyTanggungan": $scope.item.qtyTanggungan,
					 		"qtyTotalJiwa": $scope.item.qtyTotalJiwa,
					 		"statusRhesus": $scope.item.statusRhesus,
					 		"tempatLahir": $scope.item.tempatLahir,
					 		"totalNilaiScore": $scope.item.totalNilaiScore,
					 		"email": $scope.item.email,
					 		"emailAlternatif": $scope.item.emailAlternatif,
					 		"noTlp": $scope.item.noTlp,
					 		"noHandphone": $scope.item.noHandphone,
					 		"tglMasuk": $scope.item.tglMasuk,
					 		"tglLahir": $scope.item.tglLahir,
					 		"noBPJS": $scope.item.noBPJS,
					 		"satuanKerja": $scope.item.satuanKerja,
					 		"satuanKerjaId": $scope.item.satuanKerjaId,
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