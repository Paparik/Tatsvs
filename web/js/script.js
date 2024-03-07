var app = new Vue({
    el: '.wrapper',
    data: {
        colors:['FF5555','3BC171','5194BA','7351BA','C02C61','C18B3B'],
        closetsColor:{

        },
        shkafs: [],
        entrances:{
            0:{
                aparts:[
                    ["1",'1-110кв',false,'1abc'],
                    ["2",'1-110кв',false,'1abc'],
                    ["3",'1-110кв',false,'1abc'],
                    ["4",'1-110кв',false,'1abc'],
                    ["5",'1-110кв',true,'1abc'],
                    ["6",'1-110кв',false,'1abc'],
                    ["7",'1-110кв',false,'1abc'],
                    ["8",'1-110кв',false,'1abc'],
                    ["9",'1-110кв',false,'1abc'],
                    ["10",'1-110кв',true,'1abc'],
                    ["11",'1-110кв',false,'1abc'],
                    ["12",'1-110кв',false,'1abc'],
                    ["13",'1-110кв',false,'2abc'],
                    ["14",'1-110кв',false,'2abc'],
                    ["15",'1-110кв',true,'2abc'],
                    ["16",'1-110кв',false,'2abc'],
                    ["17",'1-110кв',false,'2abc'],
                    ["18",'1-110кв',false,'2abc'],
                    ["19",'1-110кв',false,'2abc'],
                ],
                closets:{bottom:'1abc',top:'2abc'}
            },
            1:{
                aparts:[
                    ["1",'1-110кв',false,'1abc'],
                    ["2",'1-110кв',false,'1abc'],
                    ["3",'1-110кв',false,'1abc'],
                    ["4",'1-110кв',true,'1abc'],
                    ["5",'1-110кв',false,'1abc'],
                    ["6",'1-110кв',false,'1abc'],
                    ["7",'1-110кв',false,'1abc'],
                    ["8",'1-110кв',true,'1abc'],
                    ["9",'1-110кв',false,'1abc']
                ],
                closets:{bottom:'1abc',}
            },
            2:{
                aparts:[
                    ["1",'1-110кв',false,'3abc'],
                    ["2",'1-110кв',false,'3abc'],
                    ["3",'1-110кв',false,'3abc'],
                    ["4",'1-110кв',true,'3abc'],
                    ["5",'1-110кв',false,'3abc'],
                    ["6",'1-110кв',false,'3abc'],
                    ["7",'1-110кв',false,'3abc'],
                    ["8",'1-110кв',true,'3abc'],
                    ["9",'1-110кв',false,'3abc']
                ],
                closets:{bottom:'1abc',}
            },
            3:{
                aparts:[
                    ["1",'1-110кв',false,'3abc'],
                    ["2",'1-110кв',false,'3abc'],
                    ["3",'1-110кв',true,'3abc'],
                    ["4",'1-110кв',false,'3abc'],
                    ["5",'1-110кв',false,'3abc'],
                    ["6",'1-110кв',false,'3abc'],
                    ["7",'1-110кв',true,'3abc'],
                    ["8",'1-110кв',false,'3abc'],
                    ["9",'1-110кв',false,'3abc']
                ],
                closets:{bottom:'3abc',}
            },
            4:{
                aparts:[
                    ["1",'1-110кв',false,'4abc'],
                    ["2",'1-110кв',false,'4abc'],
                    ["3",'1-110кв',true,'4abc'],
                    ["4",'1-110кв',false,'4abc'],
                    ["5",'1-110кв',false,'4abc'],
                    ["6",'1-110кв',true,'4abc'],
                    ["7",'1-110кв',false,'4abc'],
                    ["8",'1-110кв',false,'4abc'],
                    ["9",'1-110кв',false,'4abc']
                ],
                closets:{bottom:'4abc'}
            },
            5:{
                aparts:[
                    ["1",'1-110кв',false,'4abc'],
                    ["2",'1-110кв',true,'4abc'],
                    ["3",'1-110кв',false,'4abc'],
                    ["4",'1-110кв',false,'4abc'],
                    ["5",'1-110кв',false,'4abc'],
                    ["6",'1-110кв',false,'4abc'],
                    ["7",'1-110кв',false,'4abc'],
                    ["8",'1-110кв',true,'4abc'],
                    ["9",'1-110кв',false,'4abc']
                ],
                closets:{bottom:'4abc'}
            },
            6:{
                aparts:[
                    ["1",'1-110кв',false,'5abc'],
                    ["2",'1-110кв',true,'5abc'],
                    ["3",'1-110кв',false,'5abc'],
                    ["4",'1-110кв',false,'5abc'],
                    ["5",'1-110кв',false,'5abc'],
                    ["6",'1-110кв',false,'5abc'],
                    ["7",'1-110кв',false,'5abc'],
                    ["8",'1-110кв',true,'5abc'],
                    ["9",'1-110кв',false,'5abc'],
                    ["10",'1-110кв',false,'6abc'],
                    ["11",'1-110кв',false,'6abc'],
                    ["12",'1-110кв',false,'6abc'],
                    ["13",'1-110кв',false,'6abc'],
                    ["14",'1-110кв',false,'6abc'],
                    ["15",'1-110кв',true,'6abc'],
                    ["16",'1-110кв',false,'6abc'],
                    ["17",'1-110кв',false,'6abc'],
                    ["18",'1-110кв',false,'6abc'],
                    ["19",'1-110кв',false,'6abc'],
                ],
                closets:{bottom:'5abc',top:'6abc'}
            },
        }
    },
    methods:{
        aszdasd: function(){
            function findDuplicates(arr) {
                let counts = {};
                let unique = [];
                let oneMatch = [];
                let twoMatches = [];
            
                // Подсчитываем количество вхождений каждого элемента в массиве
                arr.forEach(item => {
                    counts[item] = (counts[item] || 0) + 1;
                });
            
                // Определяем уникальные элементы и элементы с одним и двумя совпадениями
                for (let key in counts) {
                    if (counts[key] === 1) {
                        unique.push(key);
                    } else if (counts[key] === 2) {
                        oneMatch.push(key);
                    } else if (counts[key] === 3) {
                        twoMatches.push(key);
                    }
                }
            
                return {
                    unique: unique,
                    oneMatch: oneMatch,
                    twoMatches: twoMatches
                };
            }


            let a = []
            for(let i = 0; i < Object.keys(this.entrances).length; i++){
                a.push(this.entrances[i].closets.bottom)
            }
            console.log(findDuplicates(a));
        },
        sortColor: function() {
            const colorIndexMap = {}; // объект для хранения соответствия между идентификаторами и цветами
            let colorIndex = 0;
        
            for (const floor in this.entrances) {
                const floorData = this.entrances[floor];
                const aparts = floorData.aparts;
        
                // Перебираем каждую квартиру на е
                for (const apart of aparts) {
                    const id = apart[3];
                    // Если идентификатора нет в объекте, присваиваем ему новый цвет
                    if (!colorIndexMap.hasOwnProperty(id)) {
                        colorIndexMap[id] = colorIndex;
                        colorIndex++;
                        // Если индекс превышает количество доступных цветов, обнуляем его
                        if (colorIndex >= this.colors.length) {
                            colorIndex = 0;
                        }
                    }
                    const color = this.colors[colorIndexMap[id]];
                    this.$set(this.closetsColor, id, color);
                }
            }
        }
    },
})
app.sortColor()
app.aszdasd()

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