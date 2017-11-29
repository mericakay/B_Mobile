
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
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j = 0;
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

    //dashboard başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboardIconCounts_mbllogin&rolId=9&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid +'',
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
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgrami_mbllogin&kisiId=17A68CAA-1A13-460A-BEAA-FB483AC82F7B&OkulID=7E755C68-ABC1-492B-9D82-3B39B831A962&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&dbn=Bilsanet1&cid=1&languageID=' + lid +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j=0;
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
                // alert($(this).val());
                var x = document.getElementById("myDate").value;
                // alert(x);
                if (x === "") {
                    alert("Lütfen Tarih Seçiniz !!")

                }
                else {
                    $.ajax({
                        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgramiDersSaatleri_mbllogin&kisiId=17A68CAA-1A13-460A-BEAA-FB483AC82F7B&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&tarih=2017-10-16&dbn=Bilsanet1&cid=1&languageID=' + lid +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j = 0;
                            var dataSet = [];
                            var properties = [];
                            $('#sube').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].Aciklama;
                                var derssirasi = data[j].DersSirasi;
                                var dersid = data[j].DersID;

                                $('#sube').append("<option >" + text + "</option>");
                            }
                            $("#sube").on('change', function () {
                                $.ajax({

                                    url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersPrgDersSaatleriOgrencileri_mbllogin&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&tarih=2016-09-19+00%3A00%3A00&dersSirasi=1&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&kisiId=1250E188-B635-4418-ABB4-98E8886C707D&dbn=Bilsanet1&cid=1&languageID=' + lid +'',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j = 0;
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
                                            $('#example').append('<tr><td multiple="multiple" onclick="myFunction()">' + Numarasi + '</td><td>' + Adi + '</td><td><input type="checkbox" name="gec" value="gec"></td><td><input type="checkbox" name="yok" value="yok">  </td><td style="display:none;">' + oid+'</td></tr>');
                                        }
                                        $("#example").on('click', 'td', function () {
                                            
                                            var getJsonFromTable = function () {
                                                var rows = [];
                                                $('#example tbody tr').each(function (i, n) {
                                                    var $row = $(n);
                                                    rows.push({
                                                        no: $row.find('td:eq(0)').text(),
                                                        name: $row.find('td:eq(1)').text(),
                                                        yok: $row.find('td:eq(2) input[type=checkbox]').prop('checked'),
                                                        gec: $row.find('td:eq(3) input[type=checkbox]').prop('checked'),
                                                        id: $row.find('td:eq(4)').text(),
                                                        
                                                    });
                                                });
                                                return JSON.stringify(rows);
                                            };
                                            $(function () {
                                                console.log(getJsonFromTable());
                                            });;

                                        });


                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    });
    //Contenier Son
};

