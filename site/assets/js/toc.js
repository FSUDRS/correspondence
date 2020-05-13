//variables for getting json
var files = [];
var french = [
    'and_fr.xml',
    'audience_fr.xml',
    'ballGatherer_fr.xml',
    'blackStar_fr.xml',
    'bronzeDoor_fr.xml',
    'chains_fr.xml',
    'christimas_fr.xml',
    'dayOverHarlem_fr.xml',
    'dontHangUp_fr.xml',
    'dream_fr.xml',
    'dream2_fr.xml',
    'embersInTheNight_fr.xml',
    'files.txt_fr.xml',
    'flame_fr.xml',
    'flightRise_fr.xml',
    'forPoets_fr.xml',
    'fullFire_fr.xml',
    'hands_fr.xml',
    'harlem_fr.xml',
    'iSingTheMan_fr.xml',
    'iWait_fr.xml',
    'inTheGreatDay_fr.xml',
    'jesusInRio_fr.xml',
    'jesusRests_fr.xml',
    'kouakouAmelan_fr.xml',
    'letOurSong_fr.xml',
    'masks_fr.xml',
    'names.txt_fr.xml',
    'newDawn_fr.xml',
    'onTheRoad_fr.xml',
    'parisForMe_fr.xml',
    'peopleContinents_fr.xml',
    'perfumeForYou_fr.xml',
    'prayerOfTheNewYear_fr.xml',
    'prayerToMary_fr.xml',
    'returnHome_fr.xml',
    'script.sh_fr.xml',
    'silenceInTheNight_fr.xml',
    'stopoverInTime_fr.xml',
    'theGlass_fr.xml',
    'theWind_fr.xml',
    'thoseWhoLeave_fr.xml',
    'toSmile_fr.xml',
    'weDanced_fr.xml',
    'whiteBrother_fr.xml',
    'youSleep_fr.xml',
    'yourHandMyHeart_fr.xml',
    ];

$.getJSON("../assets/js/index.json", function (data) {
    console.log(data);
    count = 0;
    for(i in data){
        files.push(i);
        $("tbody").append("<tr><td>"+data[i].title+"</td><td><a href=/collection/"+data[i].filename+">[EN]</a><a href=/collection/"+french[count]+">[FR]</td><td>"+data[i].date+"</td></tr>");
        count++;
    }

});

//variables for sorting tables
var toc, asc1 = 1,
asc2 = 1,
asc3 = 1;
window.onload = function () {
toc = document.getElementById("toc");
}

function sort_table(tbody, col, asc) {
var rows = tbody.rows,
    rlen = rows.length,
    arr = new Array(),
    i, j, cells, clen;
// fill the array with values from the table
for (i = 0; i < rlen; i++) {
    cells = rows[i].cells;
    clen = cells.length;
    arr[i] = new Array();
    for (j = 0; j < clen; j++) {
        arr[i][j] = cells[j].innerHTML;
    }
}
// sort the array by the specified column number (col) and order (asc)
arr.sort(function (a, b) {
    return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
});
// replace existing rows with new rows created from the sorted array
for (i = 0; i < rlen; i++) {
    rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
}
}