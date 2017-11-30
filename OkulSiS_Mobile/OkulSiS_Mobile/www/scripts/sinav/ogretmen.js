
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

    var okulid = localStorage.getItem("OkulID");
    var kisiid = localStorage.getItem("gelenid");
    var dersyiliid = localStorage.getItem("dyiliid");
    var cid = localStorage.getItem("cid");
    var dbn = localStorage.getItem("dbn");
    var did = localStorage.getItem("dyiliid");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("proxy");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var ogrenciid = "";
    var SinavOgrenciSoruCevapID = "F700A96B-4628-41E5-A261-D7834983CF4D";
    //menu başlangıç


    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid +'',
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
    //menu Son


    //contenier başlangıç
    //Klasik Puan Girişi

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&egitimYilID=2016&okulID=7E755C68-ABC1-492B-9D82-3B39B831A962&kisiID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&cid=1',
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
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavaGirenSubeler_mbllogin&sinavID=C6C84DB4-BA8C-40EB-AD36-9CFBF6DEF89B&okulID=C79927D0-B3AD-40CD-80CF-DCA7D841FDBD&ogretmenID=CF822218-8FD1-4B95-A4C0-9A3113332B4F&cid=1',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        $('#subesec').empty();
                        for (var j = 0; j < data.length; j++) {
                            var text = data[j].SinifKodu;
                            var sinavokulid = data[j].SinavOkulID;
                            // alert(sinifid);
                            $('#subesec').append("<option value=" + sinavokulid + ">" + text + "</option>");
                        }
                        $("#subesec").on('change', function () {
                            $.ajax({
                                url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=TopluOgrenciCevap_mbllogin&sinavOkulID=F700A96B-4628-41E5-A261-D7834983CF4D&sinifKodu=5KAR1&cid=1',
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
                                        var sinavokulid = data[j].SinavOkulID;
                                        var sinavogrenciid = data[j].SinavOgrenciID;
                                       
                                        // alert(sinifid);
                                        $('#ogrencisec').append("<option   value=" + sinavokulid + " data-user=" + sinavogrenciid + " id=" + msglist + ">" + text + "</option>");
                                    }
                                    $("#ogrencisec").on('change', function () {
                                        var msglist = document.getElementById("msglist");
                                        ogrenciid = msglist.getAttribute("data-user");
                                      //  alert(show);
                                        $.ajax({
                                            url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=TopluOgrenciCevap_mbllogin&sinavOkulID=F700A96B-4628-41E5-A261-D7834983CF4D&sinifKodu=5KAR1&cid=1',
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
                                                        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavDersleriListesi_mbllogin&sinavID=F50FFA1C-2532-48C6-955C-6604092A8189&cid=1',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        success: function (data) {
                                                            var j;
                                                            var dataSet = [];
                                                            var properties = [];
                                                            //$('#location').empty();
                                                            for (var j = 0; j < data.length; j++) {
                                                                var kategori = data[j].BolumKategoriAdi;
                                                                var sorusayisi = data[j].DersSoruSayisi;
                                                               


                                                                $('#derslistesi').append('<tr><td>' + kategori + '</td><td>' + sorusayisi + '</td></tr>');
                                                            }

                                                        }
                                                    });
                                                    $.ajax({
                                                        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavSorulariKDK_mbllogin&sinavDersID=7F85CF1A-545C-4E6B-A79B-A453490BA865&cid=1',
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



                                                                $('#cevaplar').append('<tr><td>' + sira + '</td><td><input  name="puan" type="text" placeholder="Puan"></td><td>' + sorupuani + '</td><td style="display:none;">' + soruid +'</td></tr>');
                                                            }
                                                            $("#cevaplar").on('click', 'td', function () {
                                                                var getJsonFromTable = function () {
                                                                    var rows = [];
                                                                    $('#cevaplar tbody tr').each(function (i, n) {
                                                                        var $row = $(n);
                                                                        rows.push({
                                                                            SinavOgrenciSoruCevapID,
                                                                            ogrenciid,
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

    //Sınav Sonuç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&egitimYilID=2016&okulID=7E755C68-ABC1-492B-9D82-3B39B831A962&kisiID=5F7F8763-F9BD-40E8-8F0E-532E136EB483languageID=' + lid + '',
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
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencilerinAldigiNotlarSinavBazli_mbllogin&sinavID=F50FFA1C-2532-48C6-955C-6604092A8189&donemID=1&cid=1&languageID=' + lid + '',
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



    // Sınavlar
    $.ajax({

        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&egitimYilID=2016&okulID=7E755C68-ABC1-492B-9D82-3B39B831A962&kisiID=5F7F8763-F9BD-40E8-8F0E-532E136EB483',
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
    //Contenier Son
    $("#sinavkitabi").click(function (e) {
        e.preventDefault();
        //alert("a");
        $.ajax({
            url: 'http://'+ip+':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavitapcikKaydet_mbllogin&sinavOgrenciId=F7557F49-E16C-4E53-9F6D-DBDE6210A9C3&kitapcikTurID=2&cid=1',
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
            url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavitapcikKaydet_mbllogin&sinavOgrenciId=F7557F49-E16C-4E53-9F6D-DBDE6210A9C3&kitapcikTurID=2&cid=1',
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
            url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavitapcikKaydet_mbllogin&sinavOgrenciId=F7557F49-E16C-4E53-9F6D-DBDE6210A9C3&kitapcikTurID=2&cid=1',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                alert("onay işleminiz başarılı..")
            }
        })
    });
};

