function user() {
    var did = localStorage.getItem("dyiliid");
    var rolid = localStorage.getItem("RolID");
    var okulid = localStorage.getItem("OkulID");
    var kisiid = localStorage.getItem("gelenid");
    var dersyiliid = localStorage.getItem("dyiliid");
    var ip = localStorage.getItem("proxy");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var cid = localStorage.getItem("cid");
    var dbn = localStorage.getItem("dbn");
    alert("aa");

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciDevamsizlikListesi_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&dbn=' + dbn + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            //$('#location').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].Tarih;
                var kod = data[j].DevamsizlikAdi;
                var value = data[j].GunKarsiligi;

                $('#example').append('<tr><td>' + text + '</td><td>' + value + '</th><td>' + kod + '</th></tr>');
            }

        }
    });
};


