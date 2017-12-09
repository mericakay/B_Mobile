
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
    var kisiid = localStorage.getItem("gelenid");
    var dersyiliid = localStorage.getItem("dersyiliid");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var cid = localStorage.getItem("cid");

    var dvmGec = 0;
    var dvmYok = 0;

    //menu başlangıç

    $.ajax({
        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid +'',
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
    try {
        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=Kurumyoneticisisubelistesi_mbllogin&dersYiliID=' + did + '&cid=' + cid + '&languageID=' + lid + '',
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
                        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=Kysubeogrencilistesi_mbllogin&sinifID=' + this.value + '&cid=' + cid + '&languageID=' + lid + '',
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

                                $('#sube').append("<option value=" + seviyeid + " >" + text + "</option>");
                            }
                            $("#sube").on('change', function () {

                                $.ajax({
                                    url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=KySubeOgrenciDersListesi_mbllogin&ogrenciSeviyeID=F9871608-EAF7-45B2-AE89-5B5EE1975D28&cid=' + cid + '&languageID=' + lid + '',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j;
                                        var dataSet = [];
                                        var properties = [];
                                        //$('#location').empty();
                                        for (var j = 0; j < data.length; j++) {
                                            var derssaati = data[j].HaftalikDersSaati;
                                            var Adi = data[j].DersAdi;
                                            var bir = data[j].Donem1_DonemNotu;
                                            var iki = data[j].Donem2_DonemNotu;
                                            var ys = data[j].YilSonuNotu;
                                            var selected = data[j].selected;
                                            $('#example').append('<tr><td>' + Adi + '</td><td>' + derssaati + '</td><td>' + bir + '</td><td>' + iki + '</td><td>' + ys + '</td></tr>');
                                        }

                                    }
                                });
                            });
                        }
                    });

                });
            }
        });
    } catch (e) {
        alert(e);
    }
   
    //Contenier Son
};

