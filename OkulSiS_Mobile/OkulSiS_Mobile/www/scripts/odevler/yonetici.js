
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
    document.getElementById('myDate').valueAsDate = new Date();
    var lid = localStorage.getItem("lid");
    var dvmGec = 0;
    var dvmYok = 0;

    //menu başlangıç

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j =0;
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


                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a><i class="fa-arrow-down"></i></li></ul>');


            }
        }
    });
    //menu Son



    //contenier başlangıç


    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MsjIcinOkulListesi_mbllogin&sendrolID=4&cid=1',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            var rolid;
            $('#selectNumber').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].aciklama;
                var id = data[j].ID;
             

                $('#selectNumber').append("<option value=" + id + ">" + text + "</option>");

            }
            $("#selectNumber").on('change', function () {
               
                    $.ajax({
                        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MsjIcinOkuldakiSinifListesi_mbllogin&okulID=7E755C68-ABC1-492B-9D82-3B39B831A962&sendrolID=4&cid=1',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#sube').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].aciklama;
                               

                                $('#sube').append("<option >" + text + "</option>");
                            }
                            $("#sube").on('change', function () {
                                $.ajax({

                                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KyOgretmenOdevListeleri_mbllogin&okulID=C79927D0-B3AD-40CD-80CF-DCA7D841FDBD',
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
                                            var selected = data[j].selected;
                                            var oid = data[j].OgrenciID;
                                            $('#example').append('<tr><td multiple="multiple" onclick="myFunction()">' + Numarasi + '</td><td>' + Adi + '</td></tr>');
                                        }
                                        $("#example").on('click', 'td', function () {

                                            var header = Array();



                                            $("table tr th").each(function (i, v) {
                                                header[i] = $(this).text();

                                            })

                                            alert(header);

                                            var data = Array();

                                            $("table tr").each(function (i, v) {
                                                data[i] = Array();
                                                $(this).children('td').each(function (ii, vv) {
                                                    data[i][ii] = $(this).text();


                                                });
                                            })

                                            alert(data);

                                            var myJSON = JSON.stringify(data);
                                            console.log(myJSON);

                                        });


                                    }
                                });
                            });
                        }
                    });
                
            });
        }
    });
    //Contenier Son
};

