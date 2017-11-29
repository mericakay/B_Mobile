
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
};

