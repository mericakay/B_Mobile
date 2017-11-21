
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

    //menu başlangıç

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '',
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
                    $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');               
            }
        }
    });
    //menu Son
    alert(kisiid);
    //dashboard başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboardIconCounts_mbllogin&rolId=9&kisiId=' + kisiid + '&cid=' + cid + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            var url = "";
            var value = "";
            var iconclass = "";
            for (var j = 0; j < data.length; j++) {
                text = data[j].aciklama;
                url = data[j].url;
                value = data[j].adet;
                iconclass = data[j].iconclass;

                $('.dashboard').append('<img src="' + url + '" align="left"/><a style="color:white" href="#" id="mail_menu">' + text + '<br />' + value + '</a><br /><br />');
            }
        }
    });
    // Dashboard son

    //contenier başlangıç
    $.ajax({

        url: 'http://' + ip +':8080//Slim_Proxy_okulsis/SlimProxyBoot.php?url=KurumPersoneliSinifListesi_mbllogin&dersYiliID=0F17DCF7-EFCF-41D8-82A0-D4CCFF77E487&cid='+cid+'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#selectNumber').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].SinifAdi;
                var sinifid = data[j].SinifID;
                // alert(sinifid);
                $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
            }
            $("#selectNumber").on('change', function () {


                $.ajax({
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Kysubeogrencilistesi_mbllogin&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&cid=' + cid +'',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        $('#sube').empty();
                        for (var j = 0; j < data.length; j++) {
                            var text = data[j].Aciklama;
                            var derssirasi = data[j].DersSirasi;
                            var dersid = data[j].DersID;

                            $('#sube').append("<option >" + text + "</option>");
                        }
                        $("#sube").on('change', function () {
                            $.ajax({

                                url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MuhBorcluSozlesmeleri_mbllogin&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&ogrenciID=5A4BEF62-184D-4884-8BE0-B939E2DFBAE6&dbn=Bilsanet1&cid=' + cid +'',
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    var j;
                                    var dataSet = [];
                                    var properties = [];
                                    //$('#location').empty();
                                    for (var j = 0; j < data.length; j++) {
                                        var toplamtutar = data[j].ToplamTutar;
                                        var taahutno = data[j].TaahhutnameNo;
                                        var toplamodenen = data[j].ToplamOdenen;
                                        var kalantutar = data[j].KalanTutar;
                                        var borclusozlesmeid = data[j].BorcluSozlesmeID;

                                        $('#example').append('<tr><td  onclick="myFunction()">' + taahutno + '</td><td>' + toplamtutar + '</td><td>' + toplamodenen + '</td><td>' + kalantutar + '</td></tr>');
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

