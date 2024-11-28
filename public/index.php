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
            :style="(store.state.mainType != 5 && store.state.mainType != 6 && store.state.mainType != 52 && store.state.mainType != 62 && store.state.mainType != 8 && store.state.mainType != 9) ? {} : {  position: 'absolute', left: '-9999px' }">
                <div class="map" >
                    <div class="map-search">
                        <div class="map-search__input">
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.1111 4.41667C13.256 4.41667 15.8056 6.96616 15.8056 10.1111M16.5559 16.5514L21.5 21.5M19.2222 10.1111C19.2222 15.1431 15.1431 19.2222 10.1111 19.2222C5.07918 19.2222 1 15.1431 1 10.1111C1 5.07918 5.07918 1 10.1111 1C15.1431 1 19.2222 5.07918 19.2222 10.1111Z" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input v-model="store.search" id="search" type="text" placeholder="Поиск">
                        </div>

                        <div class="map-search__items" v-show="store.search!='' && store.search!=' '">
                            <p v-for="(value, key) in store.filteredObjects" :key="key" @click="perehod(key, value)">
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
                            <div v-if="store.state.cabChannelsActive"></div>
                        </button>
                        <p>Кабельная канализация</p>
                    </div>
                    <div class="map__main">
                        <div id="map" ></div> 
                    </div>
                </div> 
                <firstpage v-if="store.state.mainType==0" ></firstpage>
                <homeobject v-if="store.state.mainType==1" ></homeobject>
                <wellobject v-if="store.state.mainType==2" ></wellobject>
                <kabchannel v-if="store.state.mainType==3" ></kabchannel>
                <kablines v-if="store.state.mainType==4" ></kablines> 
                <objectconstructor v-if="store.state.mainType==12"></objectconstructor>
                <wellconstructor v-if="store.state.mainType==22"></wellconstructor>
                <kkconstructor v-if="store.state.mainType==32"></kkconstructor>
                <kablinesconstructor v-if="store.state.mainType==42"></kablinesconstructor>
                
                <firstkkconstructor v-if="store.state.mainType==72"></firstkkconstructor>
                <!-- v-show store.state.mainType==72-->
            </main>
        </div>
        <scheme v-if="store.state.mainType==5"></scheme>
        <drc v-if="store.state.mainType==6"></drc>


        <schemeconstructor v-if="store.state.mainType==52"></schemeconstructor>
        <drcconstructor v-if="store.state.mainType==62"></drcconstructor>

        <userlist v-if="store.state.mainType==8"></userlist> 
        <logslist v-if="store.state.mainType==9"></logslist>
        <?php
            if(!$check){
                echo '
                <div id="auth" class="auth">
                    <div class="auth__container">
                        <div class="auth__title">
                            Авторизация
                        </div>
                        <div class="auth__input">
                            <input type="text" v-model="store.state.username" placeholder="Введите логин" required>
                        </div>
                        <div class="auth__input">
                            <input type="password" @keyup.enter="store.auth()" v-model="store.state.password" placeholder="Введите пароль" required>
                        </div>
                        <div class="auth__buttons">
                            <button @click="store.auth()" type="submit" class="button">
                                Войти
                            </button>
                        </div>
                    </div>
                </div>';
            }
        ?>
        <?php
        if ($check) {
            echo "
            <script>
                window.appConfig = { role: '" . htmlspecialchars($role, ENT_QUOTES, 'UTF-8') . "' };
                window.onload = function() {
                    if (window.stateStore) {
                        window.stateStore.role = window.appConfig.role;
                    }
                };
            </script>";
        }
        ?>
            </div>
    <!-- ==================Libraries================== -->
    <script type="importmap">
        {
            "imports": {
                "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
                "vue-demi": "https://unpkg.com/vue-demi/lib/index.mjs",
                "@vue/devtools-api": "/js/pinia/fake-devtools-api.js",
                "pinia": "https://unpkg.com/pinia@2.0.28/dist/pinia.esm-browser.js", 
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
    <script src="./js/index.js"></script>
    <script type="module" src="./js/main.js"></script>
    <script src="./js/functions.js"></script>
    <!-- ======================================== -->
</body>
</html>