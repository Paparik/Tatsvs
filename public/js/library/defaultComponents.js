const DefaultColumn = {
    props: {
        name: {
            type: String
        },
        value: {
            type: String
        }
    },
    template: `
        <div class="table__item">
            <div class="table__title">
                <p>{{name}}</p>
                <span v-html="value"></span>
            </div>
        </div>
    `
}

const DefaultColumnSlot = {
    props: {
        name: {
            type: String
        },
    },
    template: `
        <div class="table__item">
            <div class="table__title">
                <p>{{name}}</p>
                <slot></slot>
            </div>
        </div>
    `
}

const DefaultSlider = {
    props: {
        name: {
            type: String
        },
        operators: {
            type: Array
        },
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
            <div class="number" v-for='number in operators' v-if="operators">
                {{number[0]}} - <a href="tel: {{number[1]}}">{{number[1]}}</a > <span>{{number[2]}}</span>
            </div>
            <slot  v-html="content" v-else></slot>
        </div>
    </div>
    
    `,
    data() {
        return {
          content: ''
        };
    },
    mounted() {
        this.content = this.$slots.default ? this.$slots.default()[0].text : '';
    }
}
const DefaultItemScheme = {
    props: {
        name: {
            type: String
        },
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
            <slot></slot>
        </div>
    </div>
    
    `
}


// item_active
const DefaultItemTable = {
    props: {
        name: {
            type: String
        },
    },
    template: `
    <div class="item">
        <div class="item__title " onclick="setActive(this)">
            <p>{{name}}</p>
            <svg width="54" height="27" viewBox="0 0 54 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.789228 0.89866C-0.263081 1.8925 -0.263081 3.50166 0.789228 4.49298L23.1009 25.5112C25.2082 27.4963 28.6268 27.4963 30.7341 25.5112L53.2104 4.34077C54.2519 3.35711 54.2654 1.76799 53.2373 0.771618C52.1877 -0.247653 50.4582 -0.257398 49.3924 0.744053L28.8265 20.1203C27.7715 21.1141 26.0635 21.1141 25.0085 20.1203L4.60452 0.89866C3.55221 -0.0951823 1.84153 -0.0951823 0.789228 0.89866Z" fill="#2E2E2E"/>
            </svg>                                
        </div>
        <div class="item__content">
            <slot></slot>
        </div>
    </div>
    `
}

const AdditionalParameters = {
    template: `
    <div class="additional-parameters">
        <div class="additional-parameters__title">
            Дополнительные параметры
        </div>
        <div class="table">
            <slot></slot>
            
        </div>
    </div>
    
    `
}

const ConstructorInput = {
    props:{
        name:{
            type: String
        },
        model: {
            type: String
        },
        myplaceholder:{
            type: String
        }
    },
    emits: [
        'update:model'
    ],
    template: `
    <div class="table__item">
        <div class="table__title">
            <p>{{name}}</p>
            <div class="constructor__input">
                <input type="text" 
                 :value="model"
                 @input="$emit('update:model', $event.target.value)"
                 :placeholder="myplaceholder=='' ? 'Введите кол-во' : myplaceholder">
            </div>
        </div>
    </div>
    
    `
}
const ConstructorInputAp = {
    props:{
        name:{
            type: String
        },
        model: {
            type: String
        },

    },
    emits: [
        'update:model'
    ],
    template: `
    <div class="table__item">
        <div class="table__title">
            <div class="constructor__input">
                <input type="text" 
                 :value="name"
                 @input="$emit('update:name', $event.target.value)"
                 placeholder="Название">
            </div>
            <div class="constructor__input">
                <input type="text" 
                 :value="model"
                 @input="$emit('update:model', $event.target.value)"
                 placeholder="Значение">
            </div>
            <slot></slot>
        </div>
    </div>
    
    `
}

const ConstructorChoice = {
    props:{
        name:{
            type: String
        },
        model: {
            type: String
        },
        items:{
            type: Array
        },
    },
    methods:{
        setSlider(value){
            // this.model = value
            this.$emit('update:model', value)
            // this.model = $emit('update:model', value)
        },
    },
    emits: [
        'update:model'
    ],
    template: `
    <div class="table__item">
        <div class="table__title">
            <p>{{name}}</p>
            <div class="slider">
                <div class="slider__title" onclick="openSliderConstructor(this)">
                    <p style="font-size: 20px;">{{this.model=="" ? "Выбрать" : model}}</p>
                    <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                    </svg>                                                    
                </div>
                <div class="slider__items">
                    <div class="slider__item" onclick="closeSliderConstructor(this)" v-for="item in items" @click="setSlider(item)">{{item}}</div>
                    <div class="slider__item"><input 
                     type="text"
                     placeholder="Свой вариант"
                     :value="model"
                     @input="$emit('update:model', $event.target.value)"
                     ></div>
                </div>
            </div>
        </div>
    </div>
    
    `
}

const ConstructorDvor = {
    props:{
        name:{
            type: String
        },
        model: {
            type: String
        },
        input1:{
            type: String
        },
        input2:{
            type: String
        },
    },
    methods:{
        setSlider(value){
            // this.model = value
            this.$emit('update:model', value)
            // this.model = $emit('update:model', value)
        },
    },
    emits: [
        'update:model',
        'update:input1',
        'update:input2',
    ],
    template: `
    <div class="table__item">
        <div class="table__title">
            <p>{{name}}</p>
            <div class="table__title__items">
                <div class="constructor__input" v-if="model">
                    <input
                    :value="input1"
                    @input="$emit('update:input1', $event.target.value)" 
                    type="text" placeholder="Кол-во калиток">
                </div>
                <div class="constructor__input" v-if="model">
                    <input
                     :value="input2"
                     @input="$emit('update:input2', $event.target.value)" 
                     type="text" placeholder="Кол-во ворот">
                </div>
                <div class="slider">
                    <div class="slider__title" onclick="openSliderConstructor(this)">
                        <p style="font-size: 20px;">{{this.model==null ? "Выбрать" : model ? 'Да' : 'Нет'}}</p>
                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.38 0.432688C-0.126668 0.911205 -0.126668 1.68599 0.38 2.16328L11.1226 12.2831C12.1373 13.239 13.7833 13.239 14.7979 12.2831L25.6198 2.09C26.1213 1.61639 26.1278 0.851254 25.6328 0.371519C25.1274 -0.11924 24.2947 -0.123932 23.7815 0.358247L13.8794 9.68754C13.3715 10.1661 12.5491 10.1661 12.0411 9.68754L2.21699 0.432688C1.71032 -0.0458285 0.886666 -0.0458285 0.38 0.432688Z" fill="#6B6B6B"/>
                        </svg>                                                    
                    </div>
                    <div class="slider__items">
                        <div class="slider__item" onclick="closeSliderConstructor(this)" @click="setSlider(true)">Да</div>
                        <div class="slider__item" onclick="closeSliderConstructor(this)"  @click="setSlider(false)">Нет</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `
}
