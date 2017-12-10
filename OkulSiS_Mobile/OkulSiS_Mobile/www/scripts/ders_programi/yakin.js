
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
    var did = localStorage.getItem("did");

    //menu başlangıç

    try {
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
    } catch (e) {
        alert(e);
    }
   
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
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].AdiSoyadi;
                    var value = data[j].OgrenciID;
                    var ogrenciseviyeid = data[j].OgrenciSeviyeID;
                    var ogrenciid = data[j].OgrenciID;

                    $('#selectNumber').append("<option value=" + ogrenciid + ">" + text + "</option>");
                }
                $("#selectNumber").on('change', function () {
                    var ogrenciidselected = this.value;
                    // alert(ogrenciidselected);
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeYakiniDersProgramiListesi_mbllogin&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&ogrenciID=' + this.value + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var derssaati = data[j].DersSaati;


                                var gun1 = data[j].Gun1_ders;
                                var gun2 = data[j].Gun2_ders;
                                var gun3 = data[j].Gun3_ders;
                                var gun4 = data[j].Gun4_ders;
                                var gun5 = data[j].Gun5_ders;


                                $('#example').append('<tr><td>' + derssaati + '</td><td>' + gun1 + '</td><td>' + gun2 + '</td><td>' + gun3 + '</td><td>' + gun4 + '</td><td>' + gun5 + '</td></tr>');

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

