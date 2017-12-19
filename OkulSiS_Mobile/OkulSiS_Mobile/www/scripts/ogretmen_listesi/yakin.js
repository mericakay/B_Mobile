
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
    var kisiid = localStorage.getItem("kisiid");
    var dersyiliid = localStorage.getItem("dersyiliid");
    var did = localStorage.getItem("did");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var kurumid = localStorage.getItem("kurumid");
    var cid = localStorage.getItem("cid");
    var egitimyiliid = localStorage.getItem("egitimyiliid");


    //menu başlangıç


    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#sube').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].AdiSoyadi;
                    var yakinogrenciid = data[j].OgrenciID;

                    $('#sube').append("<option value=" + yakinogrenciid + ">" + text + "</option>");
                }
                if (data.length == 2) {
                    document.getElementById("selectNumber").style.visibility = "hidden";
                    document.getElementsByTagName("P")[0].innerHTML = text;
                    $("#example tr").remove();
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeliIcinOgretmenListesi_mbllogin&kisiId=' + yakinogrenciid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {

                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var aciklama = data[j].aciklama;
                                var dersadi = data[j].DersAdi;
                                var tanim = data[j].Tanim;
                                var teslimtarihi = data[j].TeslimTarihi;
                                $('#example').append('<tr><td>' + aciklama + '</td><td>' + dersadi + '</td></tr>');
                            }
                        }

                    });
                }
                $("#sube").on('change', function () {
                    $("#example tr").remove(); 
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeliIcinOgretmenListesi_mbllogin&kisiId=' + this.value + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {

                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var aciklama = data[j].aciklama;
                                var dersadi = data[j].DersAdi;
                                var tanim = data[j].Tanim;
                                var teslimtarihi = data[j].TeslimTarihi;
                                $('#example').append('<tr><td>' + aciklama + '</td><td>' + dersadi + '</td></tr>');
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

