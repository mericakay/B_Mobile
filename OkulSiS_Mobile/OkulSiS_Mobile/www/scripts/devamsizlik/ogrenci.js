
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
                // alert(collapse);
           

                    $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');
              
               

            }
        }
    });
    //menu Son



    //contenier başlangıç

    try {
        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciDevamsizlikListesi_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '',
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
                    if (j == 1) {
                        var alan1 = data[j].OzurluDevamsiz1;
                        var alan2 = data[j].OzursuzDevamsiz1;
                        var alan3 = data[j].OzurluDevamsiz2;
                        var alan4 = data[j].OzursuzDevamsiz2;
                        $('#toplam').append('<tr><td>' + alan1 + '</td><td>' + alan2 + '</td><td>' + alan3 + '</td><td>' + alan4 + '</td></tr>');
                    }


                    $('#example').append('<tr><td>' + text + '</td><td>' + value + '</td><td>' + kod + '</td></tr>');
                }

            }
        });
    } catch (e) {
        alert(e);
    }

    //Contenier Son
};

