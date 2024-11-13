<?php
    require './php/index.php';
    session_start();
    
    $username = getUsername();
    $check = checkAuth();
    $role = null;
    if($check){
        $role = getRole();
    }
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--==================Font================== -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet">
    <!--======================================== -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <!--==================Map================== -->
    <link rel="stylesheet" href="./assets/css/library/leaflet.css" />
    <script src="./js/library/leaflet.js"></script>
    <!--======================================== -->
    <!--==================Notify================== -->
    <link rel="stylesheet" href="./assets/css/library/notify.css" />
    <!--======================================== -->
    <!--==================Slider Owl================== -->
    <link rel="stylesheet" href="./assets/css/library/owl.carousel.css" />
    <!--======================================== -->
    <meta name="csrf-token" content="<?php if(isset($_SESSION['csrf_token'])) echo $_SESSION['csrf_token']; ?>">
    <link rel="stylesheet" href="./assets/css/styles.css">
    <title>Tatsvs</title>
</head>
<body>
    <div class="wrapper" v-cloak>
        <div id="notifications"></div>
        <div class="container">
            <header class="header">
                <h1 class="logo" @click="GetMainPage()">
                    Tatsvs
                </h1>
                <button class="button">
                    Логин: <?php if($check) echo $username; ?>
                </button>
            </header>
        </div>
        <div class="container">
            <main class="main" 
            :style="(state.mainType != 5 && state.mainType != 6 && state.mainType != 52 && state.mainType != 62 && state.mainType != 8 && state.mainType != 9) ? {} : {  position: 'absolute', left: '-9999px' }">
                <div class="map" >
                    <div class="map-search">
                        <div class="map-search__input">
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.1111 4.41667C13.256 4.41667 15.8056 6.96616 15.8056 10.1111M16.5559 16.5514L21.5 21.5M19.2222 10.1111C19.2222 15.1431 15.1431 19.2222 10.1111 19.2222C5.07918 19.2222 1 15.1431 1 10.1111C1 5.07918 5.07918 1 10.1111 1C15.1431 1 19.2222 5.07918 19.2222 10.1111Z" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input v-model="state.search" id="search" type="text" placeholder="Поиск">
                        </div>

                        <div class="map-search__items" v-show="state.search!='' && state.search!=' '">
                            <p v-for="(value, key) in filteredObjects" :key="key" @click="perehod(key, value)">
                                <img v-if="value.type == 'schema'"  src="./assets/well.png" alt="">
                                <img v-if="value.type == 'object' && value.objecttype == 'Жилой дом'" src="./assets/home.png" alt="">
                                <img v-if="value.type == 'object' && value.objecttype == 'Паркинг'" src="./assets/parking.png" alt="">
                                <img v-if="value.type == 'object' && value.objecttype == 'Офисное здание'" src="./assets/office.png" alt="">
                                {{ key }} 
                            </p>
                        </div>
                    </div>
                    <div class="map-filter">
                        <button class="map-filter__button" @click="CabChannelsActiveToggle()">
                            <div v-if="state.cabChannelsActive"></div>
                        </button>
                        <p>Кабельная канализация</p>
                    </div>
                    <div class="map__main">
                        <div id="map" ></div>
                    </div>
                </div>
                <firstpage  
                    v-if="state.mainType==0" 
                    :countObjects="state.countObj" 
                    :countKabLine="state.countKl"
                    :loading="state.loading"
                    role="<?php echo $role; ?>">
                </firstpage>
                <homeobject v-if="state.mainType==1" :obj="state.objectHome" role="<?php echo $role; ?>"></homeobject>
                <wellobject v-if="state.mainType==2" :obj="state.wellObj" role="<?php echo $role; ?>"></wellobject>
                <kabchannel v-if="state.mainType==3" :obj="state.kabChannelObj" role="<?php echo $role; ?>"></kabchannel>
                <kablines v-if="state.mainType==4" :obj="state.kabLinelObj" :schemaid="state.kabChannelObj.schemaId" @func-back="back"></kablines> 
                <objectconstructor
                  :obj="state.objectForConstructor"
                  v-if="state.mainType==12"
                  @set-data="setData()"
                  :promts="promptsOptions"
                ></objectconstructor>
                <wellconstructor 
                    :obj="state.wellForConstructor"  
                    v-if="state.mainType==22"
                    @func-back="back"
                    :promts="promptsOptions"
                ></wellconstructor>
                <kkconstructor   
                    :obj="state.kkForConstructor"  
                    v-if="state.mainType==32"
                    :cable-lines="state.newScheme.cableLines"
                    :promts="promptsOptions"
                    @func-back="back">
                </kkconstructor>
                <kablinesconstructor
                    v-if="state.mainType==42"
                    :obj="state.kabLinelForConstructor"  
                    :kls="state.newScheme.kls"
                    :scheme="state.newScheme"
                    @func-back="back"
                    :prompts="promptsOptions"
                ></kablinesconstructor>
                <firstkkconstructor  
                    v-show="state.mainType==72"
                    :obj="state.newScheme" 
                    @well-button-fp="wellButtonFp"
                    @kls-button-fp="klsButtonFp"
                 ></firstkkconstructor>

            </main>
        </div>
        <scheme 
            v-if="state.mainType==5" 
            :entrances="state.objectHome.houseschem.entrances" 
            :colors="state.colors"
            :drc="state.objectHome.houseschem.drc"
            @func-back="back"
        ></scheme>
        <drc @func-back="back" v-if="state.mainType==6" :obj="state.drc" :operators="operators" :colors="operatorsColors" ></drc>
        <schemeconstructor @func-back="back" v-if="state.mainType==52" :newscheme="state.objectForConstructor.houseschem.entrances" :drc="state.objectForConstructor.houseschem.drc"></schemeconstructor>
        <drcconstructor :promts="promptsOptions" v-if="state.mainType==62" :obj="state.newDrc" @func-back="back"></drcconstructor>
        <userlist 
            :users="state.userList" 
            :newuser="state.newUser" 
            v-if="state.mainType==8"
            @back-to-main="state.mainType=0"
        ></userlist>
        <logslist 
            :logs="state.logs"
            v-if="state.mainType==9"
            @back-to-main="state.mainType=0"
        ></logslist>
        <?php
            if(!$check){
                echo '
                <div id="auth" class="auth">
                    <div class="auth__container">
                        <div class="auth__title">
                            Авторизация
                        </div>
                        <div class="auth__input">
                            <input type="text" v-model="state.username" placeholder="Введите логин" required>
                        </div>
                        <div class="auth__input">
                            <input type="password" v-model="state.password" placeholder="Введите пароль" required>
                        </div>
                        <div class="auth__buttons">
                            <button @click="auth()" type="submit" class="button">
                                Войти
                            </button>
                        </div>
                    </div>
                </div>';
            }
        ?>
    </div>
    <!-- ==================Libraries================== -->
    <script type="importmap">
        {
            "imports": {
                "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
                "wellcomp": "/js/cableSchem/well/components/component.js",
                "wellconstructor": "/js/cableSchem/well/components/component_constructor.js",
                "homecomp": "/js/object/component.js",
                "firstpage": "/js/firstpage/component.js",
                "kablines": "/js/cableSchem/cableChannel/cableLines/components/component.js",
                "kabchannel": "/js/cableSchem/cableChannel/components/component.js",
                "objectconstructor": "/js/object/component_constructor.js",
                "kkconstructor": "/js/cableSchem/cableChannel/components/component_constructor.js",
                "kablinesconstructor": "/js/cableSchem/cableChannel/cableLines/components/component_constructor.js",
                "firstkkconstructor": "/js/cableSchem/firstConkk.js",
                "drc": "/js/object/drc/component.js",
                "schemeconstructor": "/js/object/scheme/component_constructor.js",
                "drcconstructor": "/js/object/drc/component_constructor.js",
                "scheme": "/js/object/scheme/component.js",
                "userlist": "/js/userList/component.js",
                "logslist": "/js/logs/logs.js"
            }
        }
    </script>

    <script src="./js/library/jquery.min.js"></script>
    <script src="./js/library/bootstrap.min.js"></script>
    <script src="./js/library/bootstrap-notify.min.js"></script>
    <script src="./js/library/notify.js"></script>
    <script src="./js/library/defaultComponents.js"></script>
    <script src="./js/library/owl.carousel.min.js"></script>
    <!-- ======================================== -->

    <!-- ==================API================== -->
    <script src="./js/api/apiRequests.js"></script>
    <script src="./js/api/userManager.js"></script>
    <!-- ======================================== -->

    <!-- ==================Map================== -->
    <script src="./js/map/manager.js"></script>
    <!-- ======================================== -->

    <!-- ==================Files================== -->
    <script src="./js/files/file.js"></script>
    <script src="./js/files/manager.js"></script>
    <!-- ======================================== -->

    <!-- ==================Object================== -->
    <script src="./js/object/classes/object.js"></script>
    <script src="./js/object/manager.js"></script>
    <script src="./js/object/constructor_system/manager.js"></script>
    <!-- ======================================== -->

    <!-- ==================cableSchem================== -->
    <script src="./js/cableSchem/cableChannel/cableChannel.js"></script>
    <script src="./js/cableSchem/well/well.js"></script>
    <script src="./js/cableSchem/cableSchema.js"></script>
    <script src="./js/cableSchem/cableChannel/manager.js"></script>
    <script src="./js/cableSchem/well/manager.js"></script>
    <script src="./js/cableSchem/constructor/manager.js"></script>
    <script src="./js/cableSchem/manager.js"></script>
    <!-- ======================================== -->

    <!-- ==================Constructor================== -->
        <script src="./js/constructor/index.js"></script>
    <!-- ======================================== -->

    <!-- ==================Main================== -->
    <script src="./js/data.js"></script>
    <script type="module" src="./js/main.js"></script>
    <script src="./js/functions.js"></script>
    <script src="./js/index.js"></script>
    <!-- ======================================== -->
</body>
</html>