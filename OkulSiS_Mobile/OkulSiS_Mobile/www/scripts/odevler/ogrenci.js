
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
                // alert(collapse);


                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');



            }
        }
    });
    //menu Son


    //contenier başlangıç


    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgrenciveYakin_mbllogin&ogrenciID=AEEFE2B7-6653-4776-9343-031155AF6181&egitimYilID=2016&cid=1',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
           
            var j;
            var dataSet = [];
            var properties = [];
            for (var j = 0; j < data.length; j++) {
                var ogretmenadi = data[j].OgretmenAdi;
                var dersadi = data[j].DersAdi;
                var tanim = data[j].Tanim;
                var teslimtarihi = data[j].TeslimTarihi;
                $('#example').append('<tr><td>' + ogretmenadi + '</td><td>' + dersadi + '</td><td>' + tanim + '</td><td>' + teslimtarihi + '</td></tr>');
            }
        }

    });
    //Contenier Son
};

