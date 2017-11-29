
$(document).ready(function () {

 
    
    $('input[id^="button"]').click(function () {
      
        username = $("#name").val();
        sifre = $("#password").val();
        var ip = localStorage.getItem("proxy");
        $.ajax({
            url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?&url=gnlKullaniciFindForLoginByTcKimlikNo_mbllogin',
            data: {
                tc: $("#name").val(),
                sifre: $("#password").val(),
            },
            type: 'Get',
            dataType: 'json',
            success: function (data) {
                if (data.lenght !== 0) {
                    var gelen = data[0].adsoyad;
                    var kisiid = data[0].KisiID;
                    var okulid = data[0].OkulID;
                    document.getElementsByTagName("P")[0].innerHTML = gelen;
                    localStorage.setItem("tc", username);
                    localStorage.setItem("KullaniciAdi", gelen);
                    localStorage.setItem("gelenid", kisiid, "OkulID", okulid);
                    var add = localStorage.getItem("KullaniciAdi");

                    window.location.href = "okulsec.html";
                }
                else {
                    alert("Hatalı kullanıcı adı ya da şifre")
                }

            },
            error: function (textStatus, errorThrown) {
                Success = false;//doesnt goes here
                alert("Beklenmedik bir hata oluştu lütfen daha sonra deneyiniz")
            }
        });

    })

})

function load() {
    var lid = 647; 
   
 
    $.ajax({
        url: 'http://192.168.1.111:8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=fillComboBoxTsql_syslanguage',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            //$('#location').empty();
            for (var j = 0; j < data.length; j++) {
                var dil = data[j].language;
                var id = data[j].id;
                var url = data[j].url;
                var background = "background- image:url("+url+")"

                $('#selectLanguage').append("<option style="+url+"  value=" + id + ">" + dil + "</option>");
            }
            $("#selectLanguage").on('change', function () {
                
                lid = this.value;
               
                localStorage.setItem("lid", lid);

            });


        }
    });
    $.ajax({
        url: 'http://192.168.1.111:8080/Slim_Proxy_okulsis/SlimProxyBoot.php?&url=mobilUrlData_mobilsettings',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            var rolid;
            $('#selectNumber').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].abbrevation;
                var proxy = data[j].proxy;
                var schoolLogo = data[j].logo;
                var combologo = data[j].combologo;
                var cid = data[j].id;
                $('#selectNumber').append("<option id=" + cid + " background=" + combologo + " value=" + proxy + " >" + text + "</option>");
            }
            $("#selectNumber").on('change', function () {
                localStorage.setItem("cid", $(this).find('option:selected').attr('id'));
                var ip = $(this).val();
                localStorage.setItem("proxy", ip);
             

            });
        }

    })

   
}
