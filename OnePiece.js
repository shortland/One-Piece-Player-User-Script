// ==UserScript==
// @name         One Piece Player
// @namespace    http://github.com/shortland
// @version      0.1
// @description  Ease of life video player additions
// @author       Ilan Kleiman
// @match        http://ww1.animeland.tv/emb.php?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /*
        next url stuff
    */
    var nextVideo = parseInt(((window.location.href).match(/=(\d+)/g))[0].replace('=', ''))+1;
    var hostURL = (window.location.href).match(/(.+)=/);
    localStorage.setItem("host", hostURL[0]);
    localStorage.setItem("next", nextVideo);
    /*
        remove old player
    */
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "#myvid { display: none } #my-video {display:none;} #videop {display:none;} #thisMyVideo {z-index:999; width:100%;} #skipme {z-index:999;width:200px;height:24px;}";
    document.body.appendChild(css);
    /*
        create <video>
    */
    var player = document.createElement("video");
    player.id = "thisMyVideo";
    player.width = "100%";
    player.volume = 0.12;
    document.body.appendChild(player);
    /*
        add skip button
    */
    var skipbutton = document.createElement("button");
    skipbutton.id = "skipme";
    skipbutton.innerHTML = "Skip Intro";
    document.body.appendChild(skipbutton);
    document.getElementById('skipme').setAttribute("onclick", "document.getElementById('thisMyVideo').currentTime = (60*3)");
    /*
        add attributes (control, autoplay)
    */
    document.getElementById('thisMyVideo').setAttribute("controls", "true");
    document.getElementById('thisMyVideo').setAttribute("autoplay", "true");
    /*
        add source to video
    */
    var markup = document.documentElement.innerHTML;
    var url = markup.match(/file: "(.+)",/);
    document.getElementById('thisMyVideo').innerHTML = '<source src="' + url[1] + '" type="video/mp4">';
    /*
        add skip button
    */
    var nextvid = document.createElement("button");
    nextvid.id = "nextbutton";
    nextvid.innerHTML = "Next Video";
    document.body.appendChild(nextvid);
    document.getElementById('nextbutton').setAttribute("onclick", "window.location.href=localStorage.getItem('host') + localStorage.getItem('next');");
    /*
        scroll to bottom? not necessary anymore
    */
    setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 5000);
    /*
        check if 2 min to next vid, autoplay
    */
    (function checkForPlay() {
        if (player.currentTime + 120 > player.duration) {
            window.location.href = localStorage.getItem('host') + localStorage.getItem('next');
        }
        setTimeout(function() { checkForPlay(); }, 10000);
    })();
})();
