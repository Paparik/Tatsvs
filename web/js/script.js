function openAuth(){
    auth.classList.remove('dn')
}
function closeAuth(){
    auth.classList.add('dn')
}

function removeBoxShadow(event) {
    const input = event.target;
    const parentContainer = input.parentNode;
    parentContainer.style.boxShadow = 'none';
}

function restoreBoxShadow(event) {
    const input = event.target;
    const parentContainer = input.parentNode;
    parentContainer.style.boxShadow = '0px 8px 22px 1px rgba(0, 0, 0, 0.25)';
}

const inputElements = document.querySelectorAll('input');

inputElements.forEach(function (input) {
    input.addEventListener('focus', removeBoxShadow);
    input.addEventListener('blur', restoreBoxShadow);
});


var map = L.map('map').setView([55.79008712193883, 49.12811279296876], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var coords = [["<b>Заголовок</b><br>Это HTML-контент для точки. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", [55.74876991286144,49.20673906803132,409], true],["", [55.749518671268454,49.20814990997315,161], false], ["хуятина", [55.75075650647214,49.20552134513856,266], true]]
var points = []
for(let i = 0; i < coords.length; i++){
    points.push(L.latLng(coords[i][1]))
    L.marker(points[i], { opacity: coords[i][2] ? 1 : 0, visible: coords[i][2], interactive: coords[i][2] }).addTo(map).bindPopup(coords[i][0]);
}
var polyline = L.polyline(points, { color: 'green', weight: 8 }).addTo(map);
// for(let i = 0; i < coords.length; i++){
//     L.marker(points[i]).addTo(map).bindPopup(coords[i][0]);
// }

//var pointA = L.latLng(55.74736804241256, 49.210164042833654, 419.3076934814453);
//var pointB = L.latLng(55.753701606710266, 49.21619488814031, 128.3076934814453);


polyline.on('click', function (e) {
    var clickedPoint = e.latlng;
    console.log('Нажатие на линии:', clickedPoint);
});

map.on('click', function (e) {
    var coordinates = e.latlng; // Координаты (широта, долгота)
    var altitude = e.layerPoint.y; // Z-координата

    // Вывод координат в консоль (вы можете использовать их по своему усмотрению)
    console.log(coordinates.lat + "," + coordinates.lng +"," + altitude);
});