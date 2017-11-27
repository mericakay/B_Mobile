
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
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=GnlProfil_mbllogin&kisiID=' + kisiid + '&cid=' + cid + '&dbn=' + dbn + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {



            var j;
            var dataSet = [];
            var properties = [];
            for (var j = 0; j < data.length; j++) {
                var tc = data[j].TCKimlikNo;
                var adi = data[j].Adi;
                var soyadi = data[j].Soyadi;
                var eposta = data[j].ePosta;
                $('.profile-usertitle-name').append('<p>' + adi + '&nbsp' + soyadi + '</p>');
                $('#tc').append('<a href="#"><i class="glyphicon glyphicon-home"></i>' + tc + '</a>');
                $('#email').append('<a href="#"><i class="glyphicon glyphicon-user"></i>' + eposta + '</a>');

            }
        }

    });
    //Contenier Son
};

