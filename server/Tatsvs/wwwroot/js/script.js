// var app = new Vue({
//     el: '.wrapper',
//     data: {
//         colors:['FF5555','3BC171','5194BA','7351BA','C02C61','C18B3B'],
//         closetsColor:{

//         },
//         entrances:{
//             0:{
//                 aparts:[
//                     ["1",'1-110кв',false,'1abc'],
//                     ["2",'1-110кв',false,'1abc'],
//                     ["3",'1-110кв',false,'1abc'],
//                     ["4",'1-110кв',false,'1abc'],
//                     ["5",'1-110кв',true,'1abc'],
//                     ["6",'1-110кв',false,'1abc'],
//                     ["7",'1-110кв',false,'1abc'],
//                     ["8",'1-110кв',false,'1abc'],
//                     ["9",'1-110кв',false,'1abc'],
//                     ["10",'1-110кв',true,'1abc'],
//                     ["11",'1-110кв',false,'1abc'],
//                     ["12",'1-110кв',false,'1abc'],
//                     ["13",'1-110кв',false,'2abc'],
//                     ["14",'1-110кв',false,'2abc'],
//                     ["15",'1-110кв',true,'2abc'],
//                     ["16",'1-110кв',false,'2abc'],
//                     ["17",'1-110кв',false,'2abc'],
//                     ["18",'1-110кв',false,'2abc'],
//                     ["19",'1-110кв',false,'2abc'],
//                 ],
//                 closets:{bottom:'1abc',top:'2abc'}
//             },
//             1:{
//                 aparts:[
//                     ["1",'1-110кв',false,'1abc'],
//                     ["2",'1-110кв',false,'1abc'],
//                     ["3",'1-110кв',false,'1abc'],
//                     ["4",'1-110кв',true,'1abc'],
//                     ["5",'1-110кв',false,'1abc'],
//                     ["6",'1-110кв',false,'1abc'],
//                     ["7",'1-110кв',false,'1abc'],
//                     ["8",'1-110кв',true,'1abc'],
//                     ["9",'1-110кв',false,'1abc']
//                 ],
//                 closets:{bottom:'1abc',}
//             },
//             2:{
//                 aparts:[
//                     ["1",'1-110кв',false,'3abc'],
//                     ["2",'1-110кв',false,'3abc'],
//                     ["3",'1-110кв',false,'3abc'],
//                     ["4",'1-110кв',true,'3abc'],
//                     ["5",'1-110кв',false,'3abc'],
//                     ["6",'1-110кв',false,'3abc'],
//                     ["7",'1-110кв',false,'3abc'],
//                     ["8",'1-110кв',true,'3abc'],
//                     ["9",'1-110кв',false,'3abc']
//                 ],
//                 closets:{bottom:'3abc',}
//             },
//             3:{
//                 aparts:[
//                     ["1",'1-110кв',false,'3abc'],
//                     ["2",'1-110кв',false,'3abc'],
//                     ["3",'1-110кв',true,'3abc'],
//                     ["4",'1-110кв',false,'3abc'],
//                     ["5",'1-110кв',false,'3abc'],
//                     ["6",'1-110кв',false,'3abc'],
//                     ["7",'1-110кв',true,'3abc'],
//                     ["8",'1-110кв',false,'3abc'],
//                     ["9",'1-110кв',false,'3abc']
//                 ],
//                 closets:{bottom:'3abc',}
//             },
//             4:{
//                 aparts:[
//                     ["1",'1-110кв',false,'4abc'],
//                     ["2",'1-110кв',false,'4abc'],
//                     ["3",'1-110кв',true,'4abc'],
//                     ["4",'1-110кв',false,'4abc'],
//                     ["5",'1-110кв',false,'4abc'],
//                     ["6",'1-110кв',true,'4abc'],
//                     ["7",'1-110кв',false,'4abc'],
//                     ["8",'1-110кв',false,'4abc'],
//                     ["9",'1-110кв',false,'4abc']
//                 ],
//                 closets:{bottom:'4abc'}
//             },
//             5:{
//                 aparts:[
//                     ["1",'1-110кв',false,'4abc'],
//                     ["2",'1-110кв',true,'4abc'],
//                     ["3",'1-110кв',false,'4abc'],
//                     ["4",'1-110кв',false,'4abc'],
//                     ["5",'1-110кв',false,'4abc'],
//                     ["6",'1-110кв',false,'4abc'],
//                     ["7",'1-110кв',false,'4abc'],
//                     ["8",'1-110кв',true,'4abc'],
//                     ["9",'1-110кв',false,'4abc']
//                 ],
//                 closets:{bottom:'4abc'}
//             },
//             6:{
//                 aparts:[
//                     ["1",'1-110кв',false,'5abc'],
//                     ["2",'1-110кв',true,'5abc'],
//                     ["3",'1-110кв',false,'5abc'],
//                     ["4",'1-110кв',false,'5abc'],
//                     ["5",'1-110кв',false,'5abc'],
//                     ["6",'1-110кв',false,'5abc'],
//                     ["7",'1-110кв',false,'5abc'],
//                     ["8",'1-110кв',true,'5abc'],
//                     ["9",'1-110кв',false,'5abc'],
//                     ["10",'1-110кв',false,'6abc'],
//                     ["11",'1-110кв',false,'6abc'],
//                     ["12",'1-110кв',false,'6abc'],
//                     ["13",'1-110кв',false,'6abc'],
//                     ["14",'1-110кв',false,'6abc'],
//                     ["15",'1-110кв',true,'6abc'],
//                     ["16",'1-110кв',false,'6abc'],
//                     ["17",'1-110кв',false,'6abc'],
//                     ["18",'1-110кв',false,'6abc'],
//                     ["19",'1-110кв',false,'6abc'],
//                 ],
//                 closets:{bottom:'5abc',top:'6abc'}
//             },
//         }
//     },
//     methods:{
//         sortColor: function() {
//             const colorIndexMap = {}; // объект для хранения соответствия между идентификаторами и цветами
//             let colorIndex = 0;
        
//             for (const floor in this.entrances) {
//                 const floorData = this.entrances[floor];
//                 const aparts = floorData.aparts;
        
//                 // Перебираем каждую квартиру на е
//                 for (const apart of aparts) {
//                     const id = apart[3];
//                     // Если идентификатора нет в объекте, присваиваем ему новый цвет
//                     if (!colorIndexMap.hasOwnProperty(id)) {
//                         colorIndexMap[id] = colorIndex;
//                         colorIndex++;
//                         // Если индекс превышает количество доступных цветов, обнуляем его
//                         if (colorIndex >= this.colors.length) {
//                             colorIndex = 0;
//                         }
//                     }
//                     const color = this.colors[colorIndexMap[id]];
//                     this.$set(this.closetsColor, id, color);
//                 }
//             }
//         }
//     },
// })
// app.sortColor()

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

var coords = [
    ["<b>Заголовок</b><br>Это HTML-контент для точки. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", [55.74876991286144,49.20673906803132,409], false],
    ["", [55.749518671268454,49.20814990997315,161], false], 
    ["спавн", [55.75075650647214,49.20552134513856,266], true]
]
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
