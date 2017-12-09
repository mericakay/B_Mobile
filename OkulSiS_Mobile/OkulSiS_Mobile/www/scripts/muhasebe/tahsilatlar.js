
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
                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');              
            }
        }
    });
    //menu Son

    //contenier başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=MsjIcinOkulListesi_mbllogin&sendrolID=4&cid=' + cid + '&languageID=' + lid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#tahsilat').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].aciklama;
                    var id = data[j].ID;

                    $('#tahsilat').append("<option value=" + id + ">" + text + "</option>");
                }
                $("#tahsilat").on('change', function () {
                    $.ajax({
                        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=MuhYapilacakTahsilatlarA_mbllogin&kurumID=A4EFFBCB-0291-4D2B-BCAC-E4BD8BFD6BE4&cid=' + cid + '&languageID=' + lid + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {

                            var j;
                            var dataSet = [];
                            var properties = [];
                            //$('#location').empty();
                            for (var j = 0; j < data.length; j++) {
                                var tahsilat = data[j].Tahsilat;
                                var gelecek = data[j].Gelecek;
                                var tahsilataciklama = data[j].TahsilatAciklama;
                                var mesaj = data[j].Mesaj;
                                var selected = data[j].selected;
                                $('#tahsilatlar').append('<tr><td>' + tahsilat + '</td><td>' + gelecek + '</td><td>' + tahsilataciklama + '</td></tr>');
                            }

                        }
                    });


                });
            }
        });

        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=MsjIcinOkulListesi_mbllogin&sendrolID=4&cid=' + cid + '&languageID=' + lid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#ozet').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].aciklama;
                    var id = data[j].ID;

                    $('#ozet').append("<option value=" + id + ">" + text + "</option>");
                }
                $("#ozet").on('change', function () {
                    $.ajax({
                        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=MuhYapilacakTahsilatlarB_mbllogin&kurumID=A4EFFBCB-0291-4D2B-BCAC-E4BD8BFD6BE4&cid=' + cid + '&languageID=' + lid + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            //$('#location').empty();
                            for (var j = 0; j < data.length; j++) {
                                var tahsilat = data[j].Tahsilat;
                                var aciklama = data[j].Aciklama;
                                var toplamtutar = data[j].ToplamTutar;
                                $('#ozet').append('<tr><td  >' + tahsilat + '</td><td>' + aciklama + '</td><td>' + toplamtutar + '</td></tr>');
                            }

                        }
                    });



                });
            }
        });

        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=MsjIcinOkulListesi_mbllogin&sendrolID=4&cid=' + cid + '&languageID=' + lid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#alacak').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].aciklama;
                    var id = data[j].ID;

                    $('#alacak').append("<option value=" + id + ">" + text + "</option>");
                }
                $("#alacak").on('change', function () {
                    $.ajax({

                        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=MuhYapilacakTahsilatlarC_mbllogin&kurumID=A4EFFBCB-0291-4D2B-BCAC-E4BD8BFD6BE4&cid=1&languageID=' + lid + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            //$('#location').empty();
                            for (var j = 0; j < data.length; j++) {
                                var aciklama = data[j].Aciklama;
                                var taksittutari = data[j].TaksitTutari;
                                var tc = data[j].TCKimlikNo;
                                var ogrenciadi = data[j].OgrenciAdi;
                                $('#giden').append('<tr><td>' + aciklama + '</td><td>' + taksittutari + '</td><td>' + ogrenciadi + '</td></tr>');
                            }

                        }
                    });




                });
            }
        });
    } catch (e) {
        alert(e);
    }
  

   

    //Contenier Son
};

