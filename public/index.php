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
                <div class="header__buttons">
                    <button class="button">
                        Логин: <?php if($check) echo $username; ?>
                    </button> 
                    <button class="button">
                        <svg width="64px" height="64px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <g fill="#000000"> <path d="M1 8a6 6 0 018.514-5.45.75.75 0 01-.629 1.363 4.5 4.5 0 100 8.175.75.75 0 11.63 1.361A6 6 0 011 8z"/> <path d="M11.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H6.75a.75.75 0 000 1.5h5.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.748.748 0 00-.002-1.012l-2.498-2.748a.75.75 0 00-1.06-.05z"/> </g> </g>
                        </svg>
                    </button> 
                </div>

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
                            <input v-model="store.state.search" id="search" type="text" placeholder="Поиск">
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
                    <div class="map-filter"  @click="CabChannelsActiveToggle()">
                        <button class="map-filter__button">
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

                <div class="loading-page" v-if="store.state.loading">
                    <svg width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"/></svg>
                </div>
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