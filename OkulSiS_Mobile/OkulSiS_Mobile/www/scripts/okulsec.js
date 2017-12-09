function load() {
    var kid = localStorage.getItem("gelenid");
   
    var tc = localStorage.getItem("tc");
    var lid = localStorage.getItem("lid");
    var cid = "";
    var ip = "";
    var dersyiliid = "";
   // alert(lid);
    $.ajax({
        url: 'http://mobile.okulsis.net:8280/Slim_Proxy_okulsis/SlimProxyBoot.php?tc=' + tc + '&url=mobilfirstdata_mbllogin&languageID=' + lid + '',
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
                var egitimyiliid = data[j].EgitimYilID;  
                rolid = data[j].RolID;

                $('#selectNumber').append("<option data-egitimyiliid=" + egitimyiliid + " data-okulid=" + okulid + " data-dersyiliid=" + dersyiliid + " data-cid=" + cid + " data-proxy=" + proxy + " id=" + proxylist + " class=" + kurumID + "  value=" + rolid + ">" + text + "</option>");
          
            }
            $("#selectNumber").on('change', function () {
                
                var proxylist = document.getElementById("proxylist");
                var cidlist = document.getElementById("proxylist");
                var dersyiliidlist = document.getElementById("proxylist");
                var okulidlist = document.getElementById("proxylist");
                var egitimyiliidlist = document.getElementById("proxylist");
                ip = proxylist.getAttribute("data-proxy");
                cid = cidlist.getAttribute("data-cid");
                dersyiliid = dersyiliidlist.getAttribute("data-dersyiliid");
               
                okulid = dersyiliidlist.getAttribute("data-okulid");
                egitimyiliid = egitimyiliidlist.getAttribute("data-egitimyiliid");
                //-----------------------------------------------------------
                localStorage.setItem("RolID", $(this).find('option:selected').attr('value'));
                localStorage.setItem("kurumid", $(this).find('option:selected').attr('class'));
                localStorage.setItem("cid", cid);
                localStorage.setItem("ip", ip);
                localStorage.setItem("dersyiliid", dersyiliid);
                localStorage.setItem("okulid", okulid);
                localStorage.setItem("egitimyiliid", egitimyiliid);
               
               window.location.href = "pages/main.html";
            });
        }

    });
}