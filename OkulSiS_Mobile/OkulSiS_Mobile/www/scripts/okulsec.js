function load() {
    var kid = localStorage.getItem("gelenid");
    var ip = localStorage.getItem("proxy");
    var tc = localStorage.getItem("tc");
    var cid = localStorage.getItem("cid");

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?tc=' + tc + '&url=mobilfirstdata_mbllogin&cid=' + cid + '&languageID=' + lid +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            var rolid;
            $('#selectNumber').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].OkulAdi;
                var okulid = data[j].OkulID;
                var dersyiliid = data[j].DersYiliID;
                var kurumID = data[j].KurumID;
               // alert(kurumID);
               
                rolid = data[j].RolID;

                $('#selectNumber').append("<option  class=" + kurumID + "  value=" + rolid + ">" + text + "</option>");

            }
            $("#selectNumber").on('change', function () {
               // alert($(this).find('option:selected').attr('class'));
                localStorage.setItem("RolID", $(this).find('option:selected').attr('value'));
                localStorage.setItem("kurumid", $(this).find('option:selected').attr('class'));
                localStorage.setItem("OkulID", okulid);
                localStorage.setItem("dyiliid", dersyiliid);
               window.location.href = "pages/main.html";
            });
        }

    });
}