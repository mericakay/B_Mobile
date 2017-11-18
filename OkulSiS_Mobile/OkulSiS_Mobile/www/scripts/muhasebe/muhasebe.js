
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

    //menu başlangıç

    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&cid=' + cid + '',
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
                collapse = data[j].collapse;
                // alert(collapse);
                if (collapse == 0) {

                    $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a></li></ul>');
                }
                else {
                    alert("geldi");
                    $('.left').append('<ul><li><a href="' + url + ' "><i class="fa ' + iconclass + '"></i>' + text + '</a><i class="fa-arrow-down"></i></li></ul>');
                }

            }
        }
    });
    //menu Son

    //dashboard başlangıç
    $.ajax({
        url: 'http://' + ip + ':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboardIconCounts_mbllogin&rolId=9&kisiId=' + kisiid + '&cid=' + cid + '',
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

                $('.dashboard').append('<img src="' + url + '" align="left"/><a style="color:white" href="#" id="mail_menu">' + text + '<br />' + value + '</a><br /><br />');
            }
        }
    });
    // Dashboard son

    //contenier başlangıç

    $.ajax({

        url: 'http://'+ip+':8080/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MuhBorcluSozlesmeleri_mbllogin&dersYiliID=9D7A115C-5E96-4F6E-B31D-E5710BDA1C97&ogrenciID=5A4BEF62-184D-4884-8BE0-B939E2DFBAE6&dbn=Bilsanet1&cid=3',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            //$('#location').empty();
            for (var j = 0; j < data.length; j++) {
                var toplamtutar = data[j].ToplamTutar;
                var taahutno = data[j].TaahhutnameNo;
                var toplamodenen = data[j].ToplamOdenen;
                var kalantutar = data[j].KalanTutar;
                var borclusozlesmeid = data[j].BorcluSozlesmeID;

                $('#example').append('<tr><td  onclick="myFunction()">' + taahutno + '</td><td>' + toplamtutar + '</td><td>' + toplamodenen + '</td><td>' + kalantutar + '</td><td>' + borclusozlesmeid + '</td></tr>');
            }

        }
    });

    function myFunction() {
        //   document.getElementById("demo").innerHTML = "Hello World";
        var table = document.getElementById("location");
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
                        var devamsız = row.getElementsByTagName("td")[1];
                        var id = cell.innerHTML;
                        var gelen = devamsız.innerHTML;
                        alert(id);
                        // alert("<OgrenciID>" + id + "</OgrenciID>" + "<DevamsizlikKodID>" + gelen + "</DevamsizlikKodID>");
                    };
                };

            currentRow.onclick = createClickHandler(currentRow);
        }


    }
    //Contenier Son
};

