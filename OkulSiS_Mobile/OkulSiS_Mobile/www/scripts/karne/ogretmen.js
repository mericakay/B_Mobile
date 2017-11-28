
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
                // alert(collapse);


                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');



            }
        }
    });
    //menu Son


    //contenier başlangıç




    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgrami_mbllogin&kisiId=17A68CAA-1A13-460A-BEAA-FB483AC82F7B&OkulID=7E755C68-ABC1-492B-9D82-3B39B831A962&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&dbn=Bilsanet1&cid=1&languageID=' + lid +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#selectNumber').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].Aciklama;
                var sinifid = data[j].SinifID;
                // alert(sinifid);
                $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
            }
            $("#selectNumber").on('change', function () {
                $.ajax({
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersPrgDersSaatleriOgrencileri_mbllogin&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&tarih=2016-09-19+00%3A00%3A00&dersSirasi=1&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&kisiId=1250E188-B635-4418-ABB4-98E8886C707D&dbn=Bilsanet1&cid=1&languageID=' + lid +'',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        $('#sube').empty();
                        for (var j = 0; j < data.length; j++) {
                            var text = data[j].Adsoyad;
                            var seviyeid = data[j].SeviyeID;
                            var dersid = data[j].DersID;

                            $('#sube').append("<option value=" + seviyeid + " >" + text + "</option>");
                        }
                        $("#sube").on('change', function () {

                            $.ajax({
                                url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciKarnesi_mbllogin&donemID=1&ogrenciID=AEEFE2B7-6653-4776-9343-031155AF6181&cid=1&languageID=' + lid +'',
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    var j;
                                    var dataSet = [];
                                    var properties = [];
                                    //$('#location').empty();
                                    for (var j = 0; j < data.length; j++) {
                                        var dersadi = data[j].DersAdi;
                                        var hs = data[j].HaftalikDersSaati;
                                        var ysp = data[j].YilSonuPuani;
                                        var y1 = data[j].Yazili1;
                                        var y2 = data[j].Yazili2;
                                        var y3 = data[j].Yazili3;
                                        var y4 = data[j].Yazili4;
                                        var y5 = data[j].Yazili5;

                                        $('#example').append('<tr><td>' + dersadi + '</td><td>' + y1 + '</td><td>' + y2 + '</td><td>' + y3 + '</td><td>' + ysp + '</td></tr>');
                                    }

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

