
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
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid +'',
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
                var ogrenciseviyeid = data[j].OgrenciSeviyeID;
                var sinifid = data[j].SinifID;

                $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
            }
            $("#selectNumber").on('change', function () {
                var ogrenciidselected = this.value;
                alert(ogrenciidselected);
                $.ajax({
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeYakiniDersProgramiListesi_mbllogin&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&ogrenciID=AEEFE2B7-6653-4776-9343-031155AF6181&donemID=1&cid=1&languageID=' + lid +'',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        for (var j = 0; j < data.length; j++) {
                            var derssaati = data[j].DersSaati;
                            var bsaati = data[j].BaslangicSaati;
                            var bitissaati = data[j].BitisSaati;
                            var Tc = data[j].TCKimlikNo;
                            var selected = data[j].selected;

                            $('#example').append('<tr><td>' + derssaati + '</td><td>' + bsaati + '</td><td>' + bitissaati + '</td></tr>');

                        }
                    }

                });
            });
        }

    });
    //Contenier Son
};

