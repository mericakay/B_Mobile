﻿
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
    var kurumid = localStorage.getItem("kurumid");
    var did = localStorage.getItem("did");
   // alert(okulid);
    //menu başlangıç

    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
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
                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');

            }
        }
    });
    //menu Son
    //contenier başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo1_mbllogin&kisiId=' + kisiid + '&kurumID=' + kurumid + '&rolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#cmb1').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].RolAdi;
                    var cmbid = data[j].ID;

                    $('#cmb1').append("<option value=" + cmbid + ">" + text + "</option>");
                }
                $("#cmb1").on('change', function () {

                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo2_mbllogin&kisiId=' + kisiid + '&rolID=' + rolid + '&sendrolID=' + this.value + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#cmb2').empty();
                            for (var j = 0; j < data.length; j++) {
                                var aciklama = data[j].aciklama;
                                var cmbid = data[j].ID;


                                $('#cmb2').append("<option >" + aciklama + "</option>");
                            }
                            $("#cmb2").on('change', function () {

                                $.ajax({
                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo3_mbllogin&kisiId=' + kisiid + '&okulid=' + okulid + '&rolID=' + rolid + '&sendrolID=5&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j;
                                        var dataSet = [];
                                        var properties = [];
                                        var msglist = "msglist";
                                        $('#cmb3').empty();
                                        for (var j = 0; j < data.length; j++) {

                                            var aciklama = data[j].aciklama;
                                            var kontrol = data[j].kontrol;
                                            var cmbid = data[j].ID;

                                            $('#cmb3').append("<option  value=" + kontrol + "  data-user=" + cmbid + " id=" + msglist + "  >" + aciklama + "</option>");
                                        }

                                    }
                                });
                                $("#cmb3").on('change', function () {
                                    var msglist = document.getElementById("msglist");
                                    var show = msglist.getAttribute("data-user");
                                    localStorage.setItem("show", show);
                                    //   alert(this.value);
                                    if (this.value == 1) {
                                        $.ajax({
                                            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo4_mbllogin&kisiId=' + kisiid + '&sinifID=' + show + '&rolID=' + rolid + '&sendrolID=9&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                                            type: 'GET',
                                            dataType: 'json',
                                            success: function (data) {
                                                var j;
                                                var dataSet = [];
                                                var properties = [];
                                                $('#cmb4').empty();
                                                for (var j = 0; j < data.length; j++) {
                                                    var aciklama = data[j].aciklama;
                                                    var cmbid = data[j].ID;

                                                    $('#cmb4').append("<option >" + aciklama + "</option>");
                                                }

                                            }
                                        });
                                    } else {
                                        document.getElementById("cmb4").style.visibility = "hidden";
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
   
    // Mesaj Tipleri
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MesajTipleri_mbllogin&cid=' + cid + '&rolID=' + rolid + '&languageID=' + lid + '&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#cmb5').empty();
                for (var j = 0; j < data.length; j++) {
                    var aciklama = data[j].Aciklama;
                    var MesajTipID = data[j].MesajTipID;

                    $('#cmb5').append("<option value=" + MesajTipID + "  >" + aciklama + "</option>");
                }
                $("#cmb5").on('change', function () {
                    var mesajtipid = $(this).find('option:selected').attr('value');
                    localStorage.setItem("mesajtipid", mesajtipid);

                });
            }
        });

    } catch (e) {
        alert(e);
    }
   
    //giden mesajlar
    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=GidenMesajListesi_mbllogin&kisiID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var tarih = data[j].Tarih;
                    var Adi = data[j].ReceiverNames;
                    var konu = data[j].Konu;
                    var mesaj = data[j].Mesaj;
                    var selected = data[j].selected;

                    $('#giden').append('<tr><td>' + Adi + '</td><td>' + konu + '</td><td>' + tarih + '</td></tr>');
                }

            }
        });
    } catch (e) {
        alert(e);
    }
  

    //gelen mesajlar
    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=GelenMesajListesi_mbllogin&kisiID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var tarih = data[j].Tarih;
                    var Adi = data[j].SenderAdi;
                    var konu = data[j].Konu;
                    var mesaj = data[j].Mesaj;

                    $('#example').append('<tr value="' + mesaj + '" ><td  >' + Adi + '</td><td>' + konu + '</td><td>' + tarih + '</td><td style="display:none;">' + mesaj + '</td></tr>');
                }
                $("#example").on('click', function () {

                    var table = document.getElementById("example");
                    var rows = table.getElementsByTagName("tr");
                    for (i = 0; i < rows.length; i++) {
                        var currentRow = table.rows[i];
                        var createClickHandler =
                            function (row) {
                                return function () {
                                    var rows = $("#location>tr");
                                    // alert(JSON.stringify(rows, null, 4));
                                    console.log(JSON.stringify(rows, null, 4));
                                    var cell = row.getElementsByTagName("td")[3];

                                    var id = cell.innerHTML;

                                    alert(id);
                                    // alert("<OgrenciID>" + id + "</OgrenciID>" + "<DevamsizlikKodID>" + gelen + "</DevamsizlikKodID>");
                                };
                            };

                        currentRow.onclick = createClickHandler(currentRow);
                    }

                });

            }
        });
    } catch (e) {
        alert(e);
    }
   
    $('input[id^="button"]').click(function () {

        konu = $("#lname").val();
        mesaj = $("#fmesaj").val();
        var kime = localStorage.getItem("show");
        var msgtip = localStorage.getItem("mesajtipid");
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=SendMesajDefault_mbllogin&konu=' + konu + '&mesaj=' + mesaj + '&kisiId=' + kisiid + '&receiveKisiID=' + kime + '&mesajTipID=' + msgtip + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
            data: {
                konu: $("#lname").val(),
                mesaj: $("#fmesaj").val(),
            },
            type: 'Get',
            dataType: 'json',
            success: function (data) {
                if (data.lenght !== 0) {
                    alert("Mesajınız Başarıyla iletilmiştir");
                }
                else {
                    alert("Beklenmeyen Hata Oluştu Lütfen daha sonra tekrar deneyiniz")
                }

            }
        });

    })
    //Contenier Son
};

