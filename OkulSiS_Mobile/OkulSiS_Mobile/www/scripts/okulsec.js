function load() {
    var kid = localStorage.getItem("gelenid");
   
    var tc = localStorage.getItem("tc");
    var lid = localStorage.getItem("lid");
    var cid = "";
    var did = "";
    var ip = "";
    var dersyiliid = "";
    var kisiid = "";
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
                 kisiid = data[j].KisiID;
                cid = data[j].cid;
                var proxy = data[j].proxy;     
                var egitimyiliid = data[j].EgitimYilID;  
                 did = data[j].did;  
              //  alert(did);
                rolid = data[j].RolID;

                $('#selectNumber').append("<option  data-did=" + did + " data-kisiid=" + kisiid + " data-egitimyiliid=" + egitimyiliid + " data-okulid=" + okulid + " data-dersyiliid=" + dersyiliid + " data-cid=" + cid + " data-proxy=" + proxy + " id=" + proxylist + " class=" + kurumID + "  value=" + rolid + ">" + text + "</option>");
          
            }
            $("#selectNumber").on('change', function () {
                
                var proxylist = document.getElementById("proxylist");
                var cidlist = document.getElementById("proxylist");
                var dersyiliidlist = document.getElementById("proxylist");
                var okulidlist = document.getElementById("proxylist");
                var egitimyiliidlist = document.getElementById("proxylist");
                var didlist = document.getElementById("proxylist");
                var kisilist = document.getElementById("proxylist");
                did = didlist.getAttribute("data-did");
                ip = proxylist.getAttribute("data-proxy");
                cid = cidlist.getAttribute("data-cid");
                dersyiliid = dersyiliidlist.getAttribute("data-dersyiliid");
                kisiid = kisilist.getAttribute("data-kisiid");
                okulid = dersyiliidlist.getAttribute("data-okulid");
                egitimyiliid = egitimyiliidlist.getAttribute("data-egitimyiliid");
              
            
               // alert(okulid);
                //-----------------------------------------------------------
                localStorage.setItem("RolID", $(this).find('option:selected').attr('value'));
                localStorage.setItem("kurumid", $(this).find('option:selected').attr('class'));
                localStorage.setItem("cid", $(this).find('option:selected').attr('data-cid'));
                localStorage.setItem("did", $(this).find('option:selected').attr('data-did'));
                localStorage.setItem("ip", $(this).find('option:selected').attr('data-proxy'));
                localStorage.setItem("dersyiliid", $(this).find('option:selected').attr('data-dersyiliid'));
                localStorage.setItem("kisiid", $(this).find('option:selected').attr('data-kisiid'));
                localStorage.setItem("okulid", $(this).find('option:selected').attr('data-okulid'));
                localStorage.setItem("egitimyiliid", $(this).find('option:selected').attr('data-egitimyiliid'));
               
               window.location.href = "pages/main.html";
            });
        }

    });
}