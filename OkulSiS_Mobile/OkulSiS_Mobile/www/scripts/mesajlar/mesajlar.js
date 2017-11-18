
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
                if (collapse == 0) {

                    $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');
                }
                else {
                    
                    $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a><i class="fa-arrow-down"></i></li></ul>');
                }

            }
        }
    });
    //menu Son

    //dashboard başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboardIconCounts_mbllogin&rolId=9&kisiId=' + kisiid + '&cid=' + cid + '',
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

  
    $.ajax({

        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=GelenMesajListesi_mbllogin&kisiID=' + kisiid + '&dbn=Bilsanet1&cid=1',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
           
            var j;
            var dataSet = [];
            var properties = [];
            //$('#location').empty();
            for (var j = 0; j < data.length; j++) {
                var tarih = data[j].Tarih;
                var Adi = data[j].SenderAdiSoyadi;
                var konu = data[j].Konu;
                var mesaj = data[j].Mesaj;
                var selected = data[j].selected;
                var mesajid = data[j].MesajID;
                alert(mesajid);
                $('#example').append('<tr><td data-id="' + mesajid + '" >' + Adi + '</td><td>' + konu + '</td><td>' + tarih + '</td></tr>');
            }
            $("#example tr td").click(function () {
                
                var id = $(this).attr('data-id');
                alert(id);
                $.ajax({

                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=GelenMesajDetay_mbllogin&mesajID='+id+'&kisiID=1250E188-B635-4418-ABB4-98E8886C707D&cid=1',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {

                        var j;
                        var dataSet = [];
                        var properties = [];
                        //$('#location').empty();
                        for (var j = 0; j < 1; j++) {
                            var mesaj = data[j].Mesaj;
                            
                            alert(mesaj);
                        }

                    }
                });
            });

        }
    });


    $.ajax({

        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=GidenMesajListesi_mbllogin&kisiID=' + kisiid + '&cid='+cid+'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            var j;
            var dataSet = [];
            var properties = [];
            //$('#location').empty();
            for (var j = 0; j < data.length; j++) {
                var tarih = data[j].Tarih;
                var Adi = data[j].ReceiverNames;
                var konu = data[j].Konu;
                var mesaj = data[j].Mesaj;
                var selected = data[j].selected;
                
                $('#giden').append('<tr><td  onclick="gidendetay()">' + Adi + '</td><td>' + konu + '</td><td>' + tarih + '</td></tr>');
            }

        }
    });

   
    //Contenier Son
};

