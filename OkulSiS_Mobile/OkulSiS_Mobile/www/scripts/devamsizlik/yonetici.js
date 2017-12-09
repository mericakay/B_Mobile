
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
    var x = document.getElementById("myDate").value;
    try {
        $.ajax({

            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=KurumVePersonelDevamsizlik_mbllogin&dersYiliID=' + dersyiliid + '&tarih=' + x + '&cid=' + cid + '&languageID=' + lid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var Numarasi = data[j].Numarasi;
                    var Adi = data[j].Adsoyad;
                    var SoyAdi = data[j].Soyadi;
                    var Tc = data[j].TCKimlikNo;
                    var aciklama = data[j].DevamsizlikAdi;
                    var selected = data[j].selected;
                    $('#example').append('<tr><td>' + Numarasi + '</td><td>' + Adi + '</td><td>' + aciklama + '</td></tr>');
                }

            }
        });
    } catch (e) {
        alert(e);
    }
  
    //Contenier Son
};

