
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
    document.getElementById("username_mrc").innerHTML = kisiadi;


    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '',
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
                text = data[j].MenuAdi;
                url = data[j].URL;
                value = data[j].value;
                iconclass = data[j].iconclass;
                $('.left').append('<ul><li ><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');
            }
        }
    });

    if (rolid == 7 || rolid == 8 || rolid == 9) {

        $.ajax({
            url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboarddataDersProgrami_mbllogin&rolId=' + rolid + '&kisiId=' + kisiid + '&dbn=Bilsanet1&cid=' + cid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                localStorage.setItem("gelendata", data);
                var j;
                var dataSet = [];
                var properties = [];
                for (var j = 0; j < data.length; j++) {
                    var derssaati = data[j].DersSaati;
                    var sinifadi = data[j].SinifAdi;
                    var ogretmen = data[j].ogretmen;
                    var ogrenci = data[j].ogrenci;

                    $('#example').append('<tbody><tr><td>' + derssaati + '</td><td>' + sinifadi + '</td><td>' + ogretmen + '</td></tr></tbody>');
                }
                $("#example").on('click', 'td', function () {
                    var header = Array();

                    $("table tr th").each(function (i, v) {
                        header[i] = $(this).text();
                    })

                    alert(header);

                    var data = Array();

                    $("table tr").each(function (i, v) {
                        data[i] = Array();
                        $(this).children('td').each(function (ii, vv) {
                            data[i][ii] = $(this).text();
                        });
                    })

                    alert(data);
                    console.log(data);

                });


            }


        });

    }
    else {
        alert("Ekran Henüz Yapım Aşamasında...");
    }



};

