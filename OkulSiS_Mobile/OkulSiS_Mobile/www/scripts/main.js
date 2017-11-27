function load() {

    $.ajax({
        url: 'http://192.168.1.117:8080/Slim_Proxy_okulsis/SlimProxyBoot.php?&url=mobilUrlData_mobilsettings',
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
                window.location.href = "login.html";

            });
        }

    })
};