let AllCableChannels = []
let AllWells = []
let AllObjects = []


let abs = {
    characteristics:{
        type: "Жилой дом",
        floors: "10-19",
        entrancesCount: 6,
        apartmentsCount: 320,
        offices: "Да",
        storageRooms: "Да",
        yard: true,
        yardWickets: 3,
        yardGates: 5,
        operators: [["МТС", "+79046628335"], ["ШИРХАН", "+79046628335"]],
        managementCompanies: [["ШИРХАН", "+79046628335"]],
        usefulContacts: [["ШИРХАН", "+79046628335"]],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    spd:{
        docs:[],
        cableDuct:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    svn:{
        DVR: 12,
        internalCameras: 11,
        externalCameras: 8,
        photo:"",
        docs:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    skud:{
        callPanels: 7,
        wickets: 4,
        gates: 3,
        barriers: 2,

        docs:[],
        backups:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    askue:{
        docs:[],

        additionalParameters: [

        ]
    },
    apartmentAutomation:{
        docs:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    }
}
let abs2 = {
    numWell: '123',
    typeWell: 'ККС-5',
    typeLuke: 'ГТС',
    imgWell: { reader: {name: null, path: null }, file: null},
    imgWellSchem: { reader: {name: null, path: null }, file: null},
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem eius corporis nulla, amet modi doloremque, nam recusandae, nihil eos eum voluptates reprehenderit ea!',
    additionalParameters: [
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
        ["Параметр", "Значение"]
    ]
}
let abs3 = {
    numKabChannel: '123',
    start: 'ККС-5',
    finish: 'ККС-4',
    length: '16',
    diameter: '2',
    material: 'Пластик',
    KabLines: [
        ['КЛ-1',0],
        ['КЛ-2',1],
        ['КЛ-4',2],
    ],
    additionalParameters: [
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
    ]
}
let abs4 = {
    numKabLine: '123',
    start: 'ККС-5',
    finish: 'ККС-4',
    length: '16',
    type: 'Медь',
    mark: 'Lorem, ipsum.',
    owner: 'Мтс',
    backid: 12,
    additionalParameters: [
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
        ["Параметр", "Значение"],
    ]
}   
let abs5 = {
    characteristics:{
        type: "Жилой дом",
        floors: "10-19",
        entrancesCount: 6,
        apartmentsCount: 320,
        offices: "Да",
        storageRooms: "Да",
        yard: true,
        yardWickets: 3,
        yardGates: 5,
        operators: [["МТС", "+79046628335"], ["ШИРХАН", "+79046628335"]],
        managementCompanies: [["ШИРХАН", "+79046628335"]],
        usefulContacts: [["ШИРХАН", "+79046628335"]],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    spd:{
        docs:[],
        cableDuct:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    svn:{
        DVR: 12,
        internalCameras: 11,
        externalCameras: 8,
        photo:"",
        docs:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    skud:{
        callPanels: 7,
        wickets: 4,
        gates: 3,
        barriers: 2,

        docs:[],
        backups:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    },
    askue:{
        docs:[],

        additionalParameters: [

        ]
    },
    apartmentAutomation:{
        docs:[],

        additionalParameters: [
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
            ["Параметр", "Значение"],
        ]
    }
}