
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


