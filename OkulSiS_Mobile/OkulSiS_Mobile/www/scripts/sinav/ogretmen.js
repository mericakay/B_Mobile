
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

                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');



            }
        }
    });
    //menu Son


    //contenier başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&egitimYilID=2016&okulID=7E755C68-ABC1-492B-9D82-3B39B831A962&kisiID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&cid=1',
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
                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavaGirenSubeler_mbllogin&sinavID=C6C84DB4-BA8C-40EB-AD36-9CFBF6DEF89B&okulID=C79927D0-B3AD-40CD-80CF-DCA7D841FDBD&ogretmenID=CF822218-8FD1-4B95-A4C0-9A3113332B4F&cid=1',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        $('#sube').empty();
                        for (var j = 0; j < data.length; j++) {
                            var text = data[j].SinifKodu;
                            var sinavokulid = data[j].SinavOkulID;
                            // alert(sinifid);
                            $('#sube').append("<option value=" + sinavokulid + ">" + text + "</option>");
                        }
                        $("#sube").on('change', function () {
                            alert("asdqad");

                        });
                    }

                });

            });
        }

    });




    $.ajax({

        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID='+kisiid+'&egitimYilID=2016&okulID=' + okulid + '&kisiID=' + kisiid + '&cid=' + cid + '',
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

