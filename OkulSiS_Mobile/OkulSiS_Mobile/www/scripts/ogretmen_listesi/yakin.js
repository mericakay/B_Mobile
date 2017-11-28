
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
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '',
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

    //dashboard başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboardIconCounts_mbllogin&rolId=9&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '',
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
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=0F17DCF7-EFCF-41D8-82A0-D4CCFF77E487&kisiId=5B153648-7B6B-4160-9274-B2EA69A1D717&cid=' + cid + '&languageID=' + lid + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#sube').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].AdiSoyadi;
                var sinifid = data[j].SinifID;

                $('#sube').append("<option value=" + sinifid + ">" + text + "</option>");
            }
            $("#sube").on('change', function () {
                $.ajax({
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeliIcinOgretmenListesi_mbllogin&kisiId=85C6D8E3-C853-4FBA-B700-C2C36B9CBA1A&cid=1&languageID=' + lid + '',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {

                        var j;
                        var dataSet = [];
                        var properties = [];
                        for (var j = 0; j < data.length; j++) {
                            var aciklama = data[j].aciklama;
                            var dersadi = data[j].DersAdi;
                            var tanim = data[j].Tanim;
                            var teslimtarihi = data[j].TeslimTarihi;
                            $('#example').append('<tr><td>' + aciklama + '</td><td>' + dersadi + '</td></tr>');
                        }
                    }

                });

            });
        }
    });
    //Contenier Son
};

