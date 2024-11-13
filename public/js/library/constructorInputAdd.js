export const Constructorinputadd = {
    props:{
        firesPlaceholder:{
            type: String,
        },
        name:{
            type: String
        },
        operator:{
            type: Object
        },
        items: {
            type: Array
        },
        options: {
            type: Array
        },
        optionsid: {
            type: String
        }
    },
    emits: ['update:operator','delOper'],
    setup(props, { emit }) {
        const updateField = (field, value) => {
          emit('update:operator', { ...props.operator, [field]: value });
        };
        function saveItem(){
            emit('save-item')
        }
    
        return { updateField,saveItem };
    },
    template: `
    <div class="sub-table__item">
        <div class="sub-table__title" onclick="setSubActive(this)">
            <p>{{name}}</p>
            <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#2E2E2E"/>
            </svg>
        </div>
        <div class="sub-table__content">
            <div class="constructor-item">
                <div class="constructor-item__input constructor-item_small">
                    <input type="text"
                     :list="'operators'+ optionsid" 
                     :value="operator.name" @input="e => updateField('name', e.target.value)" 
                     :placeholder="firesPlaceholder">
                    <datalist :id="'operators'+ optionsid">
                        <option v-for="prompt in options" :value="prompt"></option>
                    </datalist>
                </div>
                <div class="constructor-item__input">
                    <input type="text" 
                     :value="operator.num" @input="e => updateField('num', e.target.value)"
                     placeholder="Номер телефона">
                </div>
            </div>
            <div class="constructor-description">
                <textarea                      
                 :value="operator.dop" @input="e => updateField('dop', e.target.value)"
                 placeholder="Дополнительная информация"></textarea>
            </div>
            <button class="constructor__button for_m" @click="saveItem()">
                Добавить
            </button>
            <div style="margin-top:20px;display:flex;align-items: center;" class="number" v-for='(number,i) in items'>
                {{number[0]}} - <a href="tel: {{number[1]}}">{{number[1]}}</a > <span>{{number[2]}}</span>
                <div class="slider">
                    <div style="width:90px" class="slider__title" @click="$emit('delOper',i)">
                        <p style="font-size: 20px;">Удалить</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    `
}