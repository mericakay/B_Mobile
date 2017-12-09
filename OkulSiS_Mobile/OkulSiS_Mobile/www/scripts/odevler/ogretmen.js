
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
                $('.left').append('<ul><li><a href="../' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');

            }
        }
    });
    //menu Son


    //contenier başlangıç
    $.ajax({
        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensubelistesi_mbllogin&ogretmenID=' + kisiid + '&cid=' + cid + '&languageID=' + lid +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#sinifsec').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].aciklama;
                var sinifid = data[j].SinifID;
                // alert(sinifid);
                $('#sinifsec').append("<option value=" + sinifid + ">" + text + "</option>");
            }
            $("#sinifsec").on('change', function () {
                var sinifid = $(this).find('option:selected').attr('value');
                localStorage.setItem("sinifid", sinifid);
                $.ajax({
                    url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersPrgDersSaatleriOgrencileri_mbllogin&sinifID=F4201B97-B073-4DD7-8891-8091C3DC82CF&tarih=2016-09-19+00%3A00%3A00&dersSirasi=1&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&kisiId=1250E188-B635-4418-ABB4-98E8886C707D&dbn=Bilsanet1&cid=1&languageID=' + lid +'',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        $('#multi-select-demo').empty();
                        for (var j = 0; j < data.length; j++) {
                            var text = data[j].Adsoyad;
                            var ogrenciid = data[j].OgrenciID;
                            // alert(sinifid);
                            $('#multi-select-demo').append("<option value=" + ogrenciid + ">" + text + "</option>");
                        }
                        $('#multi-select-demo').on('change', function (){
                            var arr = $(this).val();
                            var myJSON = JSON.stringify(arr);
                            console.log(myJSON);
                            localStorage.setItem("myJSON", myJSON);
                            
                        });

                    }
                   

                });
                 

            });
        }

    });

    $.ajax({
        url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevTipleri_mbllogin&cid=' + cid + '&languageID=' + lid +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            $('#odevtipi').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].OdevTipi;
                var odevtipid = data[j].OdevTipID;
                // alert(sinifid);
                $('#odevtipi').append("<option value=" + odevtipid + ">" + text + "</option>");
            }
            $("#odevtipi").on('change', function () {
                var odevtipid = $(this).find('option:selected').attr('value');
                localStorage.setItem("odevtip", odevtipid);
            });

        }

    });


    //atama 
    $('input[id^="button"]').click(function () {
        alert("gg");
        var odevtip = localStorage.getItem("odevtip");
        var sinifid = localStorage.getItem("sinifid");
        var myJSON = localStorage.getItem("myJSON");
        alert(odevtip);
        alert(sinifid);
        alert(myJSON);
        konu = $("#ltanim").val();
        mesaj = $("#fmesaj").val();
       
        $.ajax({
            url: 'http://' + ip + ' /Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevAtama_mbllogin&sinifDersID=' + sinifid + '&ogretmenID=' + kisiid + '&teslimTarihi=2017-11-18+00:00:00&tanim=' + konu + '&aciklama=' + mesaj + '&odevTipID=' + odevtip + '&notIleDegerlendirilsin=0&donemNotunaEtkiEtsin=0&cid=' + cid + '&XmlData=' + myJSON + '&languageID=' + lid +'',
            data: {

                konu: $("#ltanim").val(),
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

