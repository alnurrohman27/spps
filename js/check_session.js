$(document).ready(function () {
	var url_now = window.location.href.toString().split(window.location.host)[1];
    if(!sessionStorage.id && url_now != "/spps/#/login"){
        window.location.reload();
    }
});