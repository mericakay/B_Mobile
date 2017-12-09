
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
    document.getElementById('myDate').valueAsDate = new Date();

    var dvmGec = 0;
    var dvmYok = 0;

    //menu başlangıç

    $.ajax({
        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid +'',
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
              

                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');
               

            }
        }
    });
    //menu Son

    var sinifid = ""; 

    //contenier başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgrami_mbllogin&kisiId=' + kisiid + '&okulid=' + okulid + '&dersYiliID=' + dersyiliid + '&&cid=' + cid + '&languageID=' + lid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j = 0;
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

                    sinifid = this.value;
                    if (x === "") {
                        alert("Lütfen Tarih Seçiniz !!")

                    }
                    else {
                        $.ajax({
                            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgramiDersSaatleri_mbllogin&kisiId='+kisiid+'&sinifID='+this.value+'&tarih='+x+'&cid='+cid+'&languageID=' + lid + '',
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

                                        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersPrgDersSaatleriOgrencileri_mbllogin&sinifID='+sinifid+'&tarih='+x+'&dersSirasi=1&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '',
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
                                                $('#example').append('<tr><td multiple="multiple" onclick="myFunction()">' + Numarasi + '</td><td>' + Adi + '</td><td><input type="checkbox" name="gec" value="gec"></td><td><input type="checkbox" name="yok" value="yok">  </td><td style="display:none;">' + oid + '</td></tr>');
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
    } catch (e) {
        alert(e);
    }

   
    //Contenier Son
};

