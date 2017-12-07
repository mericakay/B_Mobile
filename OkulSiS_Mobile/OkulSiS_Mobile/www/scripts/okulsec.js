function load() {
    var kid = localStorage.getItem("gelenid");
   
    var tc = localStorage.getItem("tc");
   
    var cid = "";
    var ip = "";
    var dersyiliid = "";

    $.ajax({
        url: 'http://mobile.okulsis.net:8280/Slim_Proxy_okulsis/SlimProxyBoot.php?tc=' + tc + '&url=mobilfirstdata_mbllogin',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          //  alert("ss");
            var j;
            var dataSet = [];
            var properties = [];
            var rolid;
            var proxylist = "proxylist";
            $('#selectNumber').empty();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].OkulAdi;
                var okulid = data[j].OkulID;
                dersyiliid = data[j].DersYiliID;
                var kurumID = data[j].KurumID;
                cid = data[j].cid;
                var proxy = data[j].proxy;
             
                rolid = data[j].RolID;
                alert(cid);
                

                $('#selectNumber').append("<option data-dersyiliid=" + dersyiliid + " data-cid=" + cid + " data-proxy=" + proxy + " id=" + proxylist + " class=" + kurumID + "  value=" + rolid + ">" + text + "</option>");
              //  alert(rolid);
            }
            $("#selectNumber").on('change', function () {
                
                var proxylist = document.getElementById("proxylist");
                var cidlist = document.getElementById("proxylist");
                var dersyiliidlist = document.getElementById("proxylist");
                ip = proxylist.getAttribute("data-proxy");
                cid = cidlist.getAttribute("data-cid");
                dersyiliid = dersyiliidlist.getAttribute("data-dersyiliid");
                alert(dersyiliid);
               
                alert(ip);
         
                localStorage.setItem("RolID", $(this).find('option:selected').attr('value'));
                localStorage.setItem("kurumid", $(this).find('option:selected').attr('class'));
                localStorage.setItem("OkulID", okulid);
                localStorage.setItem("dyiliid", dersyiliid);
                localStorage.setItem("ip", ip);
               window.location.href = "pages/main.html";
            });
        }

    });
}