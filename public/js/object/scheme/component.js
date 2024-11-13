import { computed   } from 'vue'
export const scheme = {
    props:{
        entrances: {
            type: Array
        },
        colors: {
            type: Array
        },
        drc: {
            type: Array
        },
    },
    setup(props,{emit}){
        const closetsColor = computed(() => {
            let a = {}
            const colorIndexMap = {};
            let colorIndex = 0;
        
            for (const floor in props.entrances) {
                const floorData = props.entrances[floor];
                const aparts = floorData.aparts;
        
                for (const apart of aparts) {
                    const id = apart[3];
                    if (!colorIndexMap.hasOwnProperty(id)) {
                        colorIndexMap[id] = colorIndex;
                        colorIndex++;
                        if (colorIndex >= props.colors.length) {
                            colorIndex = 0;
                        }
                    }
                    const color = props.colors[colorIndexMap[id]];
                    a[id] = color;
                }
            }
            return a

        })
        function backTo(){
            emit('func-back')
        }
        function OpenDrc(name){
            objectsManager.OpenDrc(props.drc.find(x => x.name == name));
        }

        return {
            closetsColor,
            backTo,
            OpenDrc
        }
    },
    template:`
        <div class="maket">
            <div class="maket__title">
                Макет дома
                <button class="button" @click="backTo">Назад</button>
            </div>
            <div class="maket__main">
                <div class="maket-container owl-carousel owl-theme">
                    <div class="maket-entrance" v-for="entrance in entrances">
                        <div @click="OpenDrc(entrance.closets.top)" class="maket-drc drc_top" 
                        :style="'background: #' + closetsColor[entrance.closets.top]" 
                        :class="{'drc_opac': !entrance.closets.top}">
                            <img src="./assets/images/drc.svg" alt="">
                        </div>
                        <div class="maket-floors">
                            <div class="maket-floor"  
                             :style="'background: #' + closetsColor[floor[3]]"
                             v-for="floor in entrance.aparts.slice().reverse()">
                                <div class="maket-patch" v-if="floor[2]">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3699 12.3698C12.0961 12.6436 11.651 12.6436 11.3772 12.3698C11.1034 12.096 11.1034 11.651 11.3772 11.3772C11.651 11.1034 12.0961 11.1034 12.3699 11.3772C12.6437 11.651 12.6437 12.096 12.3699 12.3698ZM7.49636 7.49629C7.22257 7.77008 6.77747 7.77008 6.50368 7.49629C6.22988 7.22249 6.22988 6.77751 6.50368 6.50371C6.77747 6.22992 7.22257 6.22992 7.49636 6.50371C7.77016 6.77751 7.77016 7.22249 7.49636 7.49629ZM2.60246 12.3903C2.32866 12.6641 1.88356 12.6641 1.60977 12.3903C1.33597 12.1165 1.33597 11.6714 1.60977 11.3976C1.88356 11.1238 2.32866 11.1238 2.60246 11.3976C2.87625 11.6714 2.87625 12.1165 2.60246 12.3903ZM2.62282 2.62276C2.34972 2.89656 1.90392 2.89656 1.63013 2.62276C1.35633 2.34896 1.35633 1.90398 1.63013 1.63018C1.90392 1.35639 2.34972 1.35639 2.62282 1.63018C2.89661 1.90398 2.89661 2.34896 2.62282 2.62276ZM11.3976 1.60967C11.6714 1.33588 12.1165 1.33588 12.3903 1.60967C12.6641 1.88347 12.6641 2.32863 12.3903 2.60243C12.1165 2.87623 11.6714 2.87623 11.3976 2.60243C11.1238 2.32863 11.1238 1.88347 11.3976 1.60967ZM10.9722 9.97877L8.89482 7.90149C9.24093 7.25562 9.16581 6.66926 8.89482 6.09851L10.9925 4.00021C11.7746 4.37229 12.7357 4.24316 13.3829 3.59518C14.2057 2.7731 14.2057 1.43918 13.3829 0.617092C12.5609 -0.205697 11.227 -0.205697 10.4049 0.617092C9.75763 1.26437 9.62775 2.22539 9.99983 3.00746L7.90144 5.10593C7.33068 4.83424 6.74448 4.75912 6.0986 5.10593L4.02127 3.02865C4.31262 2.32661 4.26348 1.28471 3.6162 0.637429C2.79341 -0.18536 1.45954 -0.18536 0.63745 0.637429C-0.185339 1.46022 -0.185339 2.79341 0.63745 3.6162C1.28473 4.26348 2.32656 4.31258 3.02859 4.02123L5.10593 6.09851C4.75912 6.74438 4.83424 7.33074 5.10593 7.90149L3.00753 9.99979C2.22546 9.62771 1.26437 9.75754 0.617092 10.4048C-0.205697 11.2269 -0.205697 12.5608 0.617092 13.3829C1.43918 14.2057 2.77305 14.2057 3.59514 13.3829C4.24312 12.7356 4.37229 11.7746 4.00021 10.9925L6.0986 8.89476C6.66936 9.16574 7.25556 9.24086 7.90144 8.89476L9.97877 10.9722C9.68812 11.6735 9.73657 12.7153 10.3845 13.3626C11.2066 14.1854 12.5405 14.1854 13.3626 13.3626C14.1854 12.5405 14.1854 11.2066 13.3626 10.3845C12.7153 9.73651 11.6735 9.68742 10.9722 9.97877Z" fill="white"/>
                                    </svg>
                                </div>
                                <p>{{floor[0]}} этаж ({{floor[1]}})</p>
                            </div>
                        </div>
                        <div  @click="OpenDrc(entrance.closets.bottom)" class="maket-drc drc_bottom" 
                         :style="'background: #' + closetsColor[entrance.closets.bottom]"
                         :class="{'drc_opac': !entrance.closets.bottom}"
                        >
                            <img src="./assets/images/drc.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="maket-pages">
                <svg width="17" height="34" viewBox="0 0 17 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4342 0.496921C15.8084 -0.165642 14.7953 -0.165642 14.1711 0.496921L0.937423 14.545C-0.312474 15.8718 -0.312474 18.0243 0.937423 19.3511L14.2669 33.5028C14.8863 34.1586 15.8868 34.1671 16.5142 33.5198C17.1559 32.8589 17.1621 31.77 16.5315 31.0989L4.33168 18.15C3.70592 17.4858 3.70592 16.4104 4.33168 15.7461L16.4342 2.89914C17.0599 2.23658 17.0599 1.15948 16.4342 0.496921Z" fill="#2E2E2E" fill-opacity="0.5"/>
                </svg>
                <p>1</p>
                <svg width="17" height="34" viewBox="0 0 17 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.565823 33.5031C1.19158 34.1656 2.20475 34.1656 2.82891 33.5031L16.0626 19.455C17.3125 18.1282 17.3125 15.9757 16.0626 14.6489L2.73307 0.497184C2.11374 -0.158585 1.11318 -0.167082 0.485834 0.480193C-0.15593 1.14106 -0.162066 2.23003 0.468477 2.90109L12.6683 15.85C13.2941 16.5142 13.2941 17.5896 12.6683 18.2539L0.565823 31.1009C-0.0599309 31.7634 -0.0599309 32.8405 0.565823 33.5031Z" fill="#2E2E2E"/>
                </svg>
            </div> -->
        </div>
    `
}