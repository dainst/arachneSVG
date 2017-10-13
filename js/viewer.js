/**
 * Created by shohl on 13.10.17.
 * 
 * @author Simon Hohl <simon.hohl@dainst.org>
 */

var backendUri = "http://arachne.dainst.org/data";
var requestedId = null;

var titleDisplay = document.querySelector("#title");
var licenseDisplay = document.querySelector("#license");
var formatDisplay = document.querySelector("#format");
var modellerDisplay = document.querySelector("#modeller");

function init(){
    requestedId = getRequestId();

    var metadataRequest = new XMLHttpRequest();
    metadataRequest.open('get', backendUri + '/model/' + requestedId  + "?meta=true");

    metadataRequest.onreadystatechange = function () {
        if (metadataRequest.readyState === XMLHttpRequest.DONE ) {
            var response = JSON.parse(metadataRequest.responseText);
            if (metadataRequest.status === 200) {
                displayMetadata(response)
            }
            else {
                console.error(response);
            }
        }
    };
    metadataRequest.send();

    displaySVGData(backendUri + '/model/' + requestedId);
}

function displayMetadata(metadata) {

    if(!validFormat(metadata.format)){
        console.dir(metadata.format + "is no valid vector graphics format for this viewer.");
        return;
    }

    titleDisplay.innerHTML = metadata['title'];
    licenseDisplay.innerHTML = metadata['license'];
    formatDisplay.innerHTML = metadata['format'];
    modellerDisplay.innerHTML = metadata['modeller'];
}

function validFormat(format) {
    switch(format) {
        case 'svg':
        case 'dae':
            return true;
        default:
            return false;
    }
}

function displaySVGData(url) {
    var embed = document.querySelector('#svg-embed');

    embed.onload = function () {
        embed.style.display = 'inline';
        var panZoom = svgPanZoom(embed, {
            controlIconsEnabled: true,
            maxZoom: 1000,
            center: true,
            fit: true,
            contain: true
        });

        console.dir("loaded");
    };
    embed.src = url;

}

function getRequestId() {
    var searchString = window.location.search.substring(1);
    var urlParams = searchString.split("&");
    var values;

    for(var i = 0; i < urlParams.length; i++){
        values = urlParams[i].split("=");
        if(values[0] === "id"){
            return decodeURIComponent(values[1])
        }
    }
}

document.onload = init();
