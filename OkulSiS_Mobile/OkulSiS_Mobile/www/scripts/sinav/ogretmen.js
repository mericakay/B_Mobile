
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

    var okulid = localStorage.getItem("okulid");
    var kisiid = localStorage.getItem("kisiid");
    var dersyiliid = localStorage.getItem("dersyiliid");
    var did = localStorage.getItem("did");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var egitimyiliid = localStorage.getItem("egitimyiliid");
    var cid = localStorage.getItem("cid");
    
    //  alert(ip);
    //menu başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // alert("geldi");
                var j;
                var len = data.length;
                var dataSet = [];
                var properties = [];
                var url = "";
                var value = "";
                var iconclass = "";
                for (var j = 0; j < data.length; j++) {
                    console.log(url);
                    text = data[j].MenuAdi;
                    url = data[j].URL;
                    value = data[j].value;
                    iconclass = data[j].iconclass;
                    collapse = data[j].collapse;
                    $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');

                }
            }
        });
    } catch (e) {
        alert(e);
    }

    //menu Son



    //contenier başlangıç
    // Sınavlar
    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&okulID=' + okulid + '&kisiID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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

    //Sınav Sonuç

    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&okulID=' + okulid + '&kisiID=' + kisiid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did + '&grid=0',
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
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencilerinAldigiNotlarSinavBazli_mbllogin&sinavID=' + this.value + '&donemID=1&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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

     //Klasik Puan Girişi
    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&okulID=' + okulid + '&kisiID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var sinaviddd = "sinaviddd";
            var sinavidlist = "";
            var j;
            var dataSet = [];
            var properties = [];

            $('#sinavsec').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].SinavAciklamasi;
                var sinavid = data[j].SinavID;

                // alert(sinifid);
                $('#sinavsec').append("<option  data-sinvaid=" + sinavid + " id=" + sinaviddd + " >" + text + "</option>");
            }
            $("#sinavsec").on('change', function () {
                var sinaviddd = document.getElementById("sinaviddd");
                sinavidlist = $(this).find('option:selected').attr('data-sinvaid');
                localStorage.setItem("sinavidlist", sinavidlist);
                $.ajax({
                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavaGirenSubeler_mbllogin&sinavID=' + sinavidlist + '&okulID=' + okulid + '&ogretmenID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        var sinavagirensubeler = "sinavagirensubeler";
                        var sinavokulidlist = "sinavokulidlist";
                        var sinavokulidgelen = "";
                        var girensubler = "";
                        $('#subesec').empty();
                        for (var j = 0; j < data.length; j++) {
                            var text = data[j].SinifKodu;
                            var sinavokulid = data[j].SinavOkulID;
                            var SinifKodu = data[j].SinifKodu;

                            // alert(sinifid);
                            $('#subesec').append("<option  value=" + sinavokulid + " id=" + sinavagirensubeler + " data-snifkodu=" + SinifKodu + " data-sinavokulid=" + sinavokulid + " >" + text + "</option>");
                        }
                        $("#subesec").on('change', function () {
                            var sinavagirensubeler = document.getElementById("sinavagirensubeler");
                            girensubler = $(this).find('option:selected').attr('data-snifkodu');
                            sinavokulidgelen = $(this).find('option:selected').attr('data-sinavokulid');
                            localStorage.setItem("girensubler", girensubler);
                            localStorage.setItem("sinavokulidgelen", sinavokulidgelen);
                            $.ajax({
                                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=TopluOgrenciCevap_mbllogin&sinavOkulID=' + this.value + '&sinifKodu=' + girensubler + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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
                                        var SinifKodu = data[j].SinifKodu;
                                        var sinavogrenciid = data[j].SinavOgrenciID;

                                        // alert(sinifid);
                                        $('#ogrencisec').append("<option value=" + SinifKodu + " data-user=" + sinavogrenciid + " id=" + msglist + ">" + text + "</option>");
                                    }
                                    $("#ogrencisec").on('change', function () {
                                        var girensublerr = localStorage.getItem("girensubler");
                                        var sinavokulidgelenler = localStorage.getItem("sinavokulidgelen");
                                        var msglist = document.getElementById("msglist");
                                        sinavogrenciid = msglist.getAttribute("data-user");
                                        $.ajax({
                                            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=SinavdaKullanilanKitaplar_mbllogin&sinavOkulID=' + sinavokulidgelenler + '&sinifKodu=' + SinifKodu + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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
                                                    var sinavidlist = localStorage.getItem("sinavidlist");
                                                    $.ajax({
                                                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavDersleriListesi_mbllogin&sinavID=' + sinavidlist + '9&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        success: function (data) {
                                                            var j;
                                                            var dataSet = [];
                                                            var properties = [];
                                                            //$('#location').empty();
                                                            for (var j = 0; j < data.length; j++) {
                                                                var kategori = data[j].BolumKategoriAdi;
                                                                var sinavdersid = data[j].SinavDersID;
                                                                //alert(sinavdersid);

                                                                $('#sinavderssec').append("<option value=" + sinavdersid + ">" + kategori + "</option>");
                                                            }
                                                            $("#sinavderssec").on('change', function () {
                                                                var sinavidlist = localStorage.getItem("sinavidlist");
                                                                $.ajax({
                                                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavSorulariKDK_mbllogin&sinavDersID=' + this.value + '&sinavOgrenciID=' + sinavogrenciid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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
                                                                        $("#sinifsec").on('change', function () {
                                                                            alert("asdqad");

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


                        });
                    }

                });

            });
        }

    });


    //Contenier Son

};

