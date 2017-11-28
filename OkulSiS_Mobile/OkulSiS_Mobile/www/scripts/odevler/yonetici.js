
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


    //contenier başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MsjIcinOkulListesi_mbllogin&sendrolID=4&cid=' + cid + '&languageID=' + lid + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#sube').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].aciklama;
                var id = data[j].ID;

                $('#sube').append("<option value=" + id + ">" + text + "</option>");
            }
            $("#sube").on('change', function () {
                $.ajax({
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KyOgretmenOdevListeleri_mbllogin&okulID=C79927D0-B3AD-40CD-80CF-DCA7D841FDBD&cid='+cid+'&languageID=' + lid + '',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        //$('#location').empty();
                        for (var j = 0; j < data.length; j++) {
                            var adsoyad = data[j].AdiSoyadi;
                            var brans = data[j].Brans;
                            var ogrencisayisi = data[j].OgrenciSayisi;
                            var odevsayisi = data[j].OdevSayisi;
                            var yapansayisi = data[j].YapanSayisi;
                            var onaysayisi = data[j].OnaySayisi;
                          

                            $('#example').append('<tr><td>' + adsoyad + '</td><td>' + brans + '</td><td>' + ogrencisayisi + '</td><td>' + odevsayisi + '</td><td>' + yapansayisi + '</td><td>' + onaysayisi + '</td></tr>');
                        }

                    }
                });

            });
        }
    });


    //Contenier Son
};

