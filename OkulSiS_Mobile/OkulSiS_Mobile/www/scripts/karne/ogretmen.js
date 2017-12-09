
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

    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '',
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
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensubelistesi_mbllogin&ogretmenID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].Aciklama;
                    var sinifid = data[j].SinifID;
                    // alert(sinifid);
                    $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
                }
                $("#selectNumber").on('change', function () {
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Kysubeogrencilistesi_mbllogin&sinifID='+this.value+'&cid=' + cid + '&languageID=' + lid + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#sube').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].Aciklama;
                                var seviyeid = data[j].SeviyeID;
                                var dersid = data[j].DersID;
                                var ogrenciID = data[j].OgrenciID;

                                $('#sube').append("<option value=" + ogrenciID + " >" + text + "</option>");
                            }
                            $("#sube").on('change', function () {

                                $.ajax({
                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciKarnesi_mbllogin&donemID=1&ogrenciID=' + ogrenciID + '&cid=' + cid + '&languageID=' + lid + '',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j;
                                        var dataSet = [];
                                        var properties = [];
                                        //$('#location').empty();
                                        for (var j = 0; j < data.length; j++) {
                                            var dersadi = data[j].DersAdi;
                                            var hs = data[j].HaftalikDersSaati;
                                            var ysp = data[j].YilSonuPuani;
                                            var y1 = data[j].Yazili1;
                                            var y2 = data[j].Yazili2;
                                            var y3 = data[j].Yazili3;
                                            var y4 = data[j].Yazili4;
                                            var y5 = data[j].Yazili5;

                                            $('#example').append('<tr><td>' + dersadi + '</td><td>' + y1 + '</td><td>' + y2 + '</td><td>' + y3 + '</td><td>' + ysp + '</td></tr>');
                                        }

                                    }
                                });
                            });
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

