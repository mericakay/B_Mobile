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
    document.getElementById('myDate').valueAsDate = new Date();
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

    //dashboard başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboardIconCounts_mbllogin&rolId=9&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid +'',
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
    var x = document.getElementById("myDate").value;


    $.ajax({

        url: ' http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Kurumyoneticisisubelistesi_mbllogin&dersYiliID=0F17DCF7-EFCF-41D8-82A0-D4CCFF77E487&cid=1&languageID=' + lid +'',
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
                $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
            }
            $("#selectNumber").on('change', function () {
              
                    $.ajax({
                        url: ' http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Kysubeogrencilistesi_mbllogin&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&cid=1&languageID=' + lid +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#sube').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].Aciklama;
                                var seviyeid = data[j].SeviyeID;
                                var dersid = data[j].DersID;

                                $('#sube').append("<option >" + text + "</option>");
                            }
                            $("#sube").on('change', function () {
                                $.ajax({

                                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KySubeOgrenciDersListesi_mbllogin&ogrenciSeviyeID=F9871608-EAF7-45B2-AE89-5B5EE1975D28&cid=1&languageID=' + lid +'',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j;
                                        var dataSet = [];
                                        var properties = [];
                                        //$('#location').empty();
                                        for (var j = 0; j < data.length; j++) {
                                            var yilsonunotu = data[j].YilSonuNotu;
                                            var haftalikderssaati = data[j].HaftalikDersSaati;
                                            var dersadi = data[j].DersAdi;
                                            var donembirnotu = data[j].Donem1_DonemNotu;
                                            var donemikinotu = data[j].Donem2_DonemNotu;
                                            var yilsonupuani = data[j].YilSonuPuani;
                                            var selected = data[j].selected;
                                            $('#example').append('<tr><td>' + dersadi + '</td><td>' + haftalikderssaati + '</td><td>' + donembirnotu + '</td><td>' + donemikinotu + '</td><td>' + donemikinotu + '</td><td>' + yilsonupuani + '</td></tr>');
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

