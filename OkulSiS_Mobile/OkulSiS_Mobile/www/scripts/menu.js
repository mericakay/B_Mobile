
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
    var did = localStorage.getItem("dyiliid");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    alert(ip);
    //menu başlangıç

    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&languageID='+lid+'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
           // alert("geldi");
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
                collapse = data[j].collapse;
              $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');
   
            }
        }
    });
    //menu Son

    //dashboard başlangıç
    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboardIconCounts_mbllogin&rolId=9&kisiId='+kisiid+'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            var url = "";
            var value = "";
            var iconclass = "";
            for (var j = 0; j < data.length; j++) {
                text = data[j].aciklama;            
                url = data[j].url;
                value = data[j].adet;
                iconclass = data[j].iconclass;
                
                $('.dashboard').append('<img src="' + url + '"/><a style="color:white" align="left" href="#" >&nbsp;' + text + '&nbsp;<span style="color:yellow; font-weight: bold;" >' + value +'<span></a> &nbsp;');
            }
        }
    });
    // Dashboard son

    //contenier başlangıç
 

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboarddataDersProgrami_mbllogin&kisiId=' + kisiid + '&rolId=' + rolid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
               // localStorage.setItem("gelendata", data);
               // alert(data);
                if (data == "") {
                    document.getElementById("example").style.display = "none";
                }
               
               
                var j;
                var dataSet = [];
                var properties = [];
                for (var j = 0; j < data.length; j++) {
                   
                    var derssaati = data[j].DersSaati;
                    var sinifadi = data[j].SinifAdi;
                    var ogretmen = data[j].ogretmen;
                    var ogrenci = data[j].ogrenci;
                   // alert(derssaati);
                    
                    if (j === 1) {
                        var alan1 = data[j].Alan1;
                        var alan2 = data[j].Alan2;
                        var alan3 = data[j].Alan3;
                        $('#example').append('<thead><tr><th>' + alan1 + '</th><th>' + alan2 + '</th><th>' + alan3 + '</th></tr></tbody>');
                    }
                    $('#example').append('<tbody><tr><td>' + derssaati + '</td><td>' + sinifadi + '</td><td>' + ogretmen + '</td></tr></tbody>');
                }
               /* $("#example").on('click', 'td', function () {
                    var header = Array();

                    $("table tr th").each(function (i, v) {
                        header[i] = $(this).text();
                    })

                    alert(header);

                    var data = Array();

                    $("table tr").each(function (i, v) {
                        data[i] = Array();
                        $(this).children('td').each(function (ii, vv) {
                            data[i][ii] = $(this).text();
                        });
                    })

                    alert(data);
                    
                    var myJSON = JSON.stringify(data);
                    console.log(myJSON);

                });*/


            }


        });

    
    //Contenier Son
};

