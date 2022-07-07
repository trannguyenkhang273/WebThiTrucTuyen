var h = 0; // Giờ
var m = 10; // Phút
var s = 5; // Giây

var timeout = null; // Timeout
document.getElementById("dongho").onclick=function(){
   
}
function start() {
    
    if (s === -1) {
        m -= 1;
        s = 59;
    }

    
    if (m === -1) {
        h -= 1;
        m = 59;
    }


    if (h == -1) {
        clearTimeout(timeout);
        alert('Hết giờ');
        var diembaithi = document.getElementById("diembaithi").innerHTML;
        alert("Bài thi của bạn được: "+diembaithi + " điểm");
        document.location.href = "/ASM_GD1/layout.html#!/trangchu";
        return false;
    }

    /*BƯỚC 1: HIỂN THỊ ĐỒNG HỒ*/
    document.getElementById('h').innerText = h.toString();
    document.getElementById('m').innerText = m.toString();
    document.getElementById('s').innerText = s.toString();

    timeout = setTimeout(function () {
        s--;
        start();
    }, 1000);
}

function stop() {
    clearTimeout(timeout);
}