import { computed,ref } from 'vue'
import { useStateStore } from '../../pinia/store.js'
export const drc = {

    setup(){
        const store = useStateStore()
        function backTo(){
            window.vueApp.back()
        }

        const indexPhoto = ref(0);

        const nextImage = () => {
            indexPhoto.value = (indexPhoto.value + 1) % store.drc.photos.length;
        };
  
        const prevImage = () => {
            indexPhoto.value =
                (indexPhoto.value - 1 + store.drc.photos.length) % store.drc.photos.length;
        };

        const drcImg = computed(() => {
            return store.drc.photos[indexPhoto.value].path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        })

        // const wellImg = computed(() => {
        //     if(store.drc.lastPhoto.reader.path != null && store.drc.lastPhoto.reader.path.includes("./php")){
        //         return store.drc.lastPhoto.reader.path + "&csrf_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        //     }
        //     else if(store.drc.lastPhoto.reader.path != null && !store.drc.lastPhoto.reader.path.includes("./php")){
        //         return store.drc.lastPhoto.reader.path;
        //     }
        // })
        
        const operators = computed(() => {
            const uniqueOperators = [];
            const operatorsSet = new Set();
            
                
            store.drc.closet.opers.forEach(item => {
                if (item.operator && !operatorsSet.has(item.operator)) {
                    operatorsSet.add(item.operator);
                    uniqueOperators.push(item.operator);
                }
            });
            
    
            
            return uniqueOperators;
        })
    
        const operatorsColors = computed(() => {
            let a = {}
            const colorIndexMap = {};
            let colorIndex = 0;
            for (const floor in store.drc.closet.opers) {
                const floorData =  store.drc.closet.opers[floor];
                const id = floorData.operator;
                if (!colorIndexMap.hasOwnProperty(id)) {
                    colorIndexMap[id] = colorIndex;
                    colorIndex++;
                    if (colorIndex >=  store.state.colors.length) {
                        colorIndex = 0;
                    }
                }
                const color =  store.state.colors[colorIndexMap[id]];
                a[id] = color;
            }
            return a
    
        })
        
        return{
            backTo,
            drcImg,
            indexPhoto,
            store,
            operators,
            operatorsColors,
            nextImage,
            prevImage
        }
    },
    template:`
        <div class="container">
            <div class="drc">
                <div class="drc-about">
                    <button class="button" @click="backTo">Назад</button>
                    <div class="drc-about__title">
                        Последнее фото шкафа:
                    </div>
                    <div class="item-slot item-slot_active">
                        <div class="item-slot__title" onclick="openItemSlot(this)">
                            <p>Фото шкафа:</p>
                            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                            </svg>
                        </div>
                        <div class="item-slot__content">
                            <div class="photos-slider">
                                <div class="photos-slider__btn" @click="prevImage()">
                                    <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                                    </svg>
                                </div>
                                <div class="photos-slider__content">
                                    <svg class="photos-slider__empty" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                                        <path d="M36,40.301c0.552,0,1-0.447,1-1v-24.6c0-0.022-0.011-0.041-0.013-0.063c-0.006-0.09-0.023-0.177-0.053-0.262
                                        c-0.012-0.034-0.021-0.066-0.036-0.098c-0.045-0.096-0.103-0.186-0.179-0.265c-0.006-0.006-0.009-0.015-0.016-0.021
                                        c-0.001-0.001-0.002-0.003-0.003-0.005l-5.5-5.4c-0.083-0.081-0.18-0.14-0.282-0.188c-0.031-0.014-0.063-0.022-0.096-0.033
                                        c-0.085-0.029-0.172-0.047-0.262-0.053C30.54,8.312,30.522,8.301,30.5,8.301H14c-0.552,0-1,0.447-1,1v30c0,0.553,0.448,1,1,1H36z
                                        M31.5,11.685l2.054,2.017H31.5V11.685z M15,10.301h14.5v4.4c0,0.553,0.448,1,1,1H35v22.6H15V10.301z"/>
                                    </svg>                                    
                                    <div class="photos-slider__date">
                                        {{store.drc.photos[indexPhoto].date}}
                                    </div>
                                    <img :src="drcImg" :alt="indexPhoto">
                                </div>
                                <div class="photos-slider__btn" @click="nextImage()">
                                    <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="drc-about__desc">
                       {{store.drc.desc}}
                    </div>
                </div>
                <div class="drc-main">
                    <div class="drc-operList">
                        <p>Операторы</p>
                        <div 
                            class="drc-operList__item" 
                            v-for="oper in operators"
                            :style="{background: '#' + operatorsColors[oper]}"
                        >
                            {{oper}}
                        </div>
                    </div>
                    <div class="drc-main__container">
                        <div class="drc-main__opers">
                            <div class="drc-main__item" >
                                <p>Шкаф операторов</p>
                            </div>
                            <div 
                                class="drc-main__item" 
                                :style="{background: oper.operator!=null ?  '#' + operatorsColors[oper.operator]: 'none',color:  oper.operator!=null ? '#fff' : '#000'}"
                                v-for="(oper,i) in store.drc.closet.opers"
                                >
                                <div class="drc-main__number" >
                                    {{i+1}}
                                </div>
                                <p>{{oper.name}}</p>
                            </div>
                        </div>
                        <div class="drc-main__ports">
                            <div class="drc-main__item">
                                <p>ДРС</p>

                            </div>
                            <div class="drc-main__item" v-for="(port, i) in store.drc.closet.ports">
                                <p>{{port.name}}</p>
                                <div class="drc-main__number" >
                                    {{i+1}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}