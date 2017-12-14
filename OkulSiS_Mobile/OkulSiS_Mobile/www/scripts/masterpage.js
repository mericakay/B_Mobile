function user() {
    var did = localStorage.getItem("dyiliid");
    var rolid = localStorage.getItem("RolID");
    var okulid = localStorage.getItem("okulid");
    var kisiid = localStorage.getItem("kisiid");
    var dersyiliid = localStorage.getItem("dyiliid");
    var ip = localStorage.getItem("proxy");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var cid = localStorage.getItem("cid");
    var lid = localStorage.getItem("lid");


    try {
        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciDevamsizlikListesi_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + 'languageID=' + lid + '&cid=' + cid + '',
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
    

    } catch (e) {
        alert(e);
    }

 
};

