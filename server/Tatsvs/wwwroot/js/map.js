var GLOBALMAP = L.map('map').setView([55.79008712193883, 49.12811279296876], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(GLOBALMAP);



let global_constructor = new Constructor()
function changePoint(a){
    global_constructor.changePointConstructor(a)
}



// for(let i = 0; i < sss.length; i++)
// {
//     switch(sss[i].type){
//         case "WELL":
//             let markerObject = {opacity: 1, visible: true, interactive: true, icon: customIcon, pane: 'markerPane'}
//             L.marker(L.latLng(sss[i].coords), markerObject).addTo(GLOBALMAP).bindPopup(sss[i].name);

//             if(sss[i].wells.length > 0){
//                 sss[i].wells.forEach(element => {
//                     let finded = sss.find(x => x.name == element)
//                     var polyline = L.polyline([sss[i].coords, finded.coords], { color: 'rgba(205, 92, 92, 0.5)', weight: 8 });
//                     polyline.addTo(GLOBALMAP)
//                     polyline.on('click', function (e) {
//                         var clickedPoint = e.latlng;
//                         console.log('Нажатие на линии:', clickedPoint);
//                     })
//                 });
//             }
//         break
//     }
// }


// var polylines = []
// var customIcon = L.icon({
//     iconUrl: './assets/1.png',
//     iconSize: [11, 11],
//     iconAnchor: [5, 5],
// });
// for(let i = 0; i < coords.length; i++){
//     let markerObject = {opacity: 1,visible: true,interactive: true,icon: customIcon,pane: 'markerPane'}
//     var points = []

//     if(i != 0) points = [coords[i - 1][1]]
//     if(i == 0) points = [coords[0][1]]

//     switch(coords[i][2]){
//         case "izgib":
//             markerObject =
//             {
//                 opacity: 0,
//                 visible: false,
//                 interactive: false,
//             }
//             points.push(L.latLng(coords[i][1]))
//             break;
//         case "kol":
//             points.push(L.latLng(coords[i][1]))
//             L.marker(points[i], markerObject).addTo(GLOBALMAP).bindPopup(coords[i][0]);
//             break;
//     }
//     var polyline = L.polyline(points, { color: 'rgba(205, 92, 92, 0.5)', weight: 8 });
//     polylines.push(polyline)
// }

// for(let i = 0; i < polylines.length; i++){
//     var addedPolyline = polylines[i].addTo(GLOBALMAP)
//     addedPolyline.on('click', function (e) {
//         var clickedPoint = e.latlng;
//         console.log('Нажатие на линии:', clickedPoint);
//     })
// }
// // var polyline = L.polyline(points, { color: 'rgba(205, 92, 92, 0.5)', weight: 8 }).addTo(GLOBALMAP);


// GLOBALMAP.on('click', function (e) {
//     var coordinates = e.latlng;
//     var altitude = e.layerPoint.y;
//     console.log(coordinates.lat + "," + coordinates.lng +"," + altitude);
// });

// // // Создание метки с пользовательской иконкой и добавление на карту
// // var marker = L.marker([51.5, -0.09], { icon: customIcon, pane: 'markerPane' }).addTo(GLOBALMAP);