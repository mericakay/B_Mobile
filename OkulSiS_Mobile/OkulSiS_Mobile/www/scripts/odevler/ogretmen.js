
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
                $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');

            }
        }
    });
    //menu Son


    //contenier başlangıç
  
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgramiDersSaatleri_mbllogin&kisiId=17A68CAA-1A13-460A-BEAA-FB483AC82F7B&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&tarih=2017-10-16&dbn=Bilsanet1&cid=1',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#sinifsec').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].Aciklama;
                var sinifid = data[j].SinifID;
                // alert(sinifid);
                $('#sinifsec').append("<option value=" + sinifid + ">" + text + "</option>");
            }
            $("#sinifsec").on('change', function () {
                alert("asdqad");

            });
        }

});
    $.ajax({

        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgretmen_mbllogin&ogretmenID=5F7F8763-F9BD-40E8-8F0E-532E136EB483&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&cid=' + cid + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            var j;
            var dataSet = [];
            var properties = [];
            //$('#location').empty();
            for (var j = 0; j < data.length; j++) {
                var dersbilgisi = data[j].DersBilgisi;
                var tanim = data[j].Tanim;
                var tarih = data[j].Tarih;
                var kod = data[j].SinifKodu;
             

                $('#liste').append('<tr><td>' + dersbilgisi + '</td><td>' + tanim + '</td><td>' + kod + '</td><td>' + tarih + '</td></tr>');
            }

        }
    });


    //Contenier Son
};

