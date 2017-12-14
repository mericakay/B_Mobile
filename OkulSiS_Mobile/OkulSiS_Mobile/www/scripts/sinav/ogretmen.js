
function user() {
    $("#showmenu").click(function (e) {
        e.preventDefault();
        $("#menu").toggleClass("show");
    });
    $("#menu a").click(function (event) {
        event.preventDefault();
        if ($(this).next('ul').length - 1) {
            $(this).next().toggle('fast');
            $(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
        }
    });
   // $("#cevaplar").paging({ limit: 10 });
    var okulid = localStorage.getItem("okulid");
    var kisiid = localStorage.getItem("kisiid");
    var dersyiliid = localStorage.getItem("dyiliid");
    var did = localStorage.getItem("did");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var kurumid = localStorage.getItem("kurumid");
    var cid = localStorage.getItem("cid");

    var ogrenciid = "";
    var SinavOgrenciSoruCevapID = "F700A96B-4628-41E5-A261-D7834983CF4D";
    //menu başlangıç
  
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '&did='+did+'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                
                var j;
                var len = data.length;
                var dataSet = [];
                var properties = [];
                var url = "";
                var value = "";
                var iconclass = "";
                for (var j = 0; j < data.length; j++) {
                    text = data[j].MenuAdi;
                    url = data[j].URL;
                    value = data[j].value;
                    iconclass = data[j].iconclass;
                    collapse = data[j].collapse;

                    $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');



                }
            }
        });
    } catch (e) {
        alert(e);
    }
   
    //menu Son


    //contenier başlangıç
    //Klasik Puan Girişi
   
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=2017&okulid=' + okulid + '&kisiID=' + kisiid + '&cid=' + cid + '&languageID=' + lid +'&did='+did+'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
            
                var j;
                var dataSet = [];
                var properties = [];
                $('#sinavsec').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].SinavAciklamasi;
                    var sinavid = data[j].SinavID;

                    // alert(sinifid);
                    $('#sinavsec').append("<option value=" + sinavid + ">" + text + "</option>");
                }
                $("#sinavsec").on('change', function () {
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavaGirenSubeler_mbllogin&sinavID=' + this.value + '&okulid=' + okulid + '&ogretmenID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#subesec').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].SinifKodu;
                                var sinavokulid = data[j].Sinavokulid;
                                // alert(sinifid);
                                $('#subesec').append("<option value=" + sinavokulid + ">" + text + "</option>");
                            }
                            $("#subesec").on('change', function () {
                                $.ajax({
                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=TopluOgrenciCevap_mbllogin&sinavokulid=' + this.value + '&sinifKodu=5KAR1&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j;
                                        var dataSet = [];
                                        var properties = [];
                                        var msglist = "msglist";
                                        $('#ogrencisec').empty();
                                        for (var j = 0; j < data.length; j++) {
                                            var text = data[j].AdiSoyadi;
                                            var sinavokulid = data[j].Sinavokulid;
                                            var sinavogrenciid = data[j].SinavOgrenciID;

                                            // alert(sinifid);
                                            $('#ogrencisec').append("<option   value=" + sinavokulid + " data-user=" + sinavogrenciid + " id=" + msglist + ">" + text + "</option>");
                                        }
                                        $("#ogrencisec").on('change', function () {
                                            var msglist = document.getElementById("msglist");
                                            sinavogrenciid = msglist.getAttribute("data-user");
                                            //  alert(show);
                                            $.ajax({
                                                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=TopluOgrenciCevap_mbllogin&sinavokulid=' + okulid + 'D&sinifKodu=5KAR1&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                                                type: 'GET',
                                                dataType: 'json',
                                                success: function (data) {
                                                    var j;
                                                    var dataSet = [];
                                                    var properties = [];
                                                    $('#kitapciksec').empty();
                                                    for (var j = 0; j < data.length; j++) {
                                                        var text = data[j].KitapcikAciklamasi;
                                                        var sinavkitapcikid = data[j].SinavKitapcikID;


                                                        $('#kitapciksec').append("<option value=" + sinavkitapcikid + ">" + text + "</option>");
                                                    }
                                                    $("#kitapciksec").on('change', function () {

                                                        $.ajax({
                                                            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavDersleriListesi_mbllogin&sinavID=' + this.value + '9&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                                                            type: 'GET',
                                                            dataType: 'json',
                                                            success: function (data) {
                                                                var j;
                                                                var dataSet = [];
                                                                var properties = [];
                                                                //$('#location').empty();
                                                                for (var j = 0; j < data.length; j++) {
                                                                    var kategori = data[j].BolumKategoriAdi;
                                                                    var sinavdersid = data[j].sinavDersID;



                                                                    $('#sinavderssec').append("<option value=" + sinavdersid + ">" + kategori + "</option>");
                                                                }
                                                                $("#kitapciksec").on('change', function () {
                                                                    $.ajax({
                                                                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavSorulariKDK_mbllogin&sinavDersID=' + this.value + '&sinavOgrenciID=' + sinavogrenciid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                                                                        type: 'GET',
                                                                        dataType: 'json',
                                                                        success: function (data) {
                                                                            var j;
                                                                            var dataSet = [];
                                                                            var properties = [];
                                                                            //$('#location').empty();
                                                                            for (var j = 0; j < data.length; j++) {
                                                                                var sira = data[j].Sira;
                                                                                var sorupuani = data[j].SoruPuani;
                                                                                var soruid = data[j].SinavSoruID;



                                                                                $('#cevaplar').append('<tr><td>' + sira + '</td><td><input  name="puan" type="text" placeholder="Puan"></td><td>' + sorupuani + '</td><td style="display:none;">' + soruid + '</td></tr>');
                                                                            }
                                                                            $("#cevaplar").on('click', 'td', function () {
                                                                                var getJsonFromTable = function () {
                                                                                    var rows = [];
                                                                                    $('#cevaplar tbody tr').each(function (i, n) {
                                                                                        var $row = $(n);
                                                                                        rows.push({
                                                                                            SinavOgrenciSoruCevapID,
                                                                                            sinavogrenciid,
                                                                                            soruid: $row.find('td:eq(3)').text(),
                                                                                            puan: $row.find('td:eq(1) input[name=puan]').val(),

                                                                                        });
                                                                                    });
                                                                                    return JSON.stringify(rows);
                                                                                };
                                                                                $(function () {
                                                                                    console.log(getJsonFromTable());
                                                                                });
                                                                            });

                                                                        }
                                                                    }); });

                                                            }
                                                        });
                                                       

                                                    });
                                                }

                                            });

                                        });
                                    }

                                });

                            });
                        }

                    });

                });
            }

        });
    } catch (e) {
        alert(e);
    }
   

    //Sınav Sonuç
 
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + ogrenciid + '&egitimYilID=2016&okulid=' + okulid + '&kisiID=' + kisiid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did +'&grid=1',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                
                var j;
                var dataSet = [];
                var properties = [];
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].SinavAciklamasi;
                    var sinavid = data[j].SinavID;
                    // alert(sinifid);
                    $('#selectNumber').append("<option value=" + sinavid + ">" + text + "</option>");
                }
                $("#selectNumber").on('change', function () {

                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencilerinAldigiNotlarSinavBazli_mbllogin&sinavID=' + this.value + '&donemID=1&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            //$('#location').empty();
                            for (var j = 0; j < data.length; j++) {
                                var numarasi = data[j].Numarasi;
                                var adsoyad = data[j].adsoyad;
                                var aciklama = data[j].Aciklamasi;
                                var puan = data[j].Puan;


                                $('#giden').append('<tr><td>' + numarasi + '</td><td>' + adsoyad + '</td><td>' + aciklama + '</td><td>' + puan + '</td></tr>');
                            }

                        }
                    });

                });
            }
        });

    } catch (e) {
        alert(e);
    }
    


    // Sınavlar

    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=2016&okulid=' + okulid + '&kisiID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var sinavtarih = data[j].SinavTarihi;
                    var aciklama = data[j].SinavAciklamasi;
                    var sinavturadi = data[j].SinavTurAdi;


                    $('#sinav').append('<tr><td>' + sinavtarih + '</td><td>' + aciklama + '</td><td>' + sinavturadi + '</td></tr>');

                }

            }
        })
    } catch (e) {
        alert(e);
    }
 
    //Contenier Son
    $("#sinavkitabi").click(function (e) {
        e.preventDefault();
        //alert("a");
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavitapcikKaydet_mbllogin&sinavOgrenciId=F7557F49-E16C-4E53-9F6D-DBDE6210A9C3&kitapcikTurID=2&cid=1&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

              alert("kayıt işleminiz başarılı..")
            }
        })
    });
    $("#kaydet").click(function (e) {
        e.preventDefault();
        //alert("a");
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavitapcikKaydet_mbllogin&sinavOgrenciId=F7557F49-E16C-4E53-9F6D-DBDE6210A9C3&kitapcikTurID=2&cid=1&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                alert("kayıt işleminiz başarılı..")
            }
        })
    });
    $("#onay").click(function (e) {
        e.preventDefault();
        //alert("a");
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavitapcikKaydet_mbllogin&sinavOgrenciId=F7557F49-E16C-4E53-9F6D-DBDE6210A9C3&kitapcikTurID=2&cid=1&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                alert("onay işleminiz başarılı..")
            }
        })
    });
};

