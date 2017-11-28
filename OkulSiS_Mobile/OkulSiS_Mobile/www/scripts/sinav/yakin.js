﻿
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
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=0F17DCF7-EFCF-41D8-82A0-D4CCFF77E487&kisiId=5B153648-7B6B-4160-9274-B2EA69A1D717&cid=1&languageID=' + lid +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#selectNumber').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].AdiSoyadi;
                var value = data[j].OgrenciID;
                $('#selectNumber').append("<option value=" + value + ">" + text + "</option>");
            }
            $("#selectNumber").on('change', function () {
                var ogrenciidselected = this.value;
               // alert(ogrenciidselected);
                $.ajax({
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Yakinisinavlistesi_mbllogin&ogretmenID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&egitimYilID=2016&okulID=7E755C68-ABC1-492B-9D82-3B39B831A962&kisiID=AEEFE2B7-6653-4776-9343-031155AF6181&cid=1&languageID=' + lid +'',
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
                            $('#example').append('<tr><td>' + sinavtarih + '</td><td>' + aciklama + '</td><td>' + sinavturadi + '</td></tr>');
                        }

                    }
                });
            });
        }

    });

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=0F17DCF7-EFCF-41D8-82A0-D4CCFF77E487&kisiId=5B153648-7B6B-4160-9274-B2EA69A1D717&cid=1&languageID=' + lid + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#snc').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].AdiSoyadi;
                var value = data[j].OgrenciID;
                $('#snc').append("<option value=" + value + ">" + text + "</option>");
            }
            $("#snc").on('change', function () {
                var ogrenciidselected = this.value;
                // alert(ogrenciidselected);
                $.ajax({
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencininAldigiNotlar_mbllogin&kisiId=AEEFE2B7-6653-4776-9343-031155AF6181&donemID=1&cid=1&languageID=' + lid + '',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        //$('#location').empty();
                        for (var j = 0; j < data.length; j++) {
                            var aciklamasi = data[j].Aciklamasi;
                            var puan = data[j].Puan;



                            $('#sonuc').append('<tr><td>' + aciklamasi + '</td><td>' + puan + '</td></tr>');
                        }

                    }
                });
            });
        }

    });
    //Contenier Son
};

