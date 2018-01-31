!function(){"use strict";angular.module("frontApp",["ui.router","Core","Views","Shared"])}(),function(){"use strict";window.__env__=window.__env__?window.__env__:{}}(),function(){"use strict";function a(a,b,c){b.otherwise("/"),c.html5Mode({enabled:window.__env__.HTML5MODE!==!1,requireBase:!1}),a.state("auth",{"abstract":!0,template:"<ui-view></ui-view>"}).state("auth.Dashboard",{url:"/",templateUrl:"scripts/views/auth/dashboard/dashboard.html",controller:"DashboardCtrl",controllerAs:"vm"}).state("auth.ListLeads",{url:"/leads",templateUrl:"scripts/views/auth/leads/listLeads.html",controller:"ListLeadsCtrl",controllerAs:"vm"}).state("auth.LeadDetails",{url:"/leads/{leadId}",templateUrl:"scripts/views/auth/leads/lead.html",controller:"LeadCtrl",controllerAs:"vm"}).state("auth.NewLead",{url:"/leads/nuevo",templateUrl:"scripts/views/auth/leads/newLead.html",controller:"NewLeadCtrl",controllerAs:"vm"}).state("auth.Quotation",{url:"/cotizador/{leadId}",templateUrl:"scripts/views/auth/quoting/quoting.html",controller:"QuotingCtrl",controllerAs:"vm"})}angular.module("frontApp").config(a),a.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"]}(),function(){"use strict";angular.module("Core",[])}(),function(){"use strict";var a={API_ROOT:window.__env__.API_ROOT||""};angular.module("Core").constant("Config",a)}(),function(){"use strict";var a={all_required:"Todos los campos son requeridos.",invalid_email_format:"Ingrese un correo válido."};angular.module("Core").constant("Message",a)}(),function(){"use strict";function a(){function a(a){var b=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;return a&&a.match(b)}return{validateEmail:a}}angular.module("Core").factory("Utils",a)}(),function(){"use strict";function a(){function a(a){return d.getItem(a)}function b(a,b){d.setItem(a,b)}function c(a){return a?d.removeItem(a):d.clear()}var d=window.localStorage;return{get:a,set:b,clear:c}}angular.module("Core").factory("Persist",a)}(),function(){"use strict";function a(a,b){function c(a){return j("auth",a)}function d(a){return j("leads",a)}function e(a){return k("leads",a)}function f(a,b){return k("leads/"+a,b)}function g(a){return k("truck_size_types",a)}function h(a){return k("home_types",a)}function i(a,b){return j("quotations",a,b)}function j(b,c,d){var e=m("csrftoken");e&&(a.defaults.headers.common["X-CSRFToken"]=e),b=l(b,d);var f=a.post(b,c);return f=f.then(function(a){return a.data})}function k(b,c,d){b=l(b,d);var e=a.get(b,{params:c});return e=e.then(function(a){return a.data})}function l(c,d){return d&&(a.defaults.headers.common.Authorization="Token "+d),b.API_ROOT+"/api/"+c+"/"}function m(a){var b=null;if(document.cookie&&""!=document.cookie)for(var c=document.cookie.split(";"),d=0;d<c.length;d++){var e=jQuery.trim(c[d]);if(e.substring(0,a.length+1)==a+"="){b=decodeURIComponent(e.substring(a.length+1));break}}return b}return{signIn:c,createLead:d,listLeads:e,getLead:f,listTruckTypes:g,listHomeTypes:h,createQuotation:i}}angular.module("Core").factory("Api",a),a.$inject=["$http","Config"]}(),function(){"use strict";function a(a,b,c,d,e){function f(f,g){if(!f||!g)return a.reject(e.all_required);if(!c.validateEmail(f))return a.reject(e.invalid_email_format);var h={email:f,password:g},i=b.signIn(h);return i=i.then(function(a){return a.token&&d.set("token",a.token),a})}function g(d,f,g,h){if(!(d&&f&&g&&h))return a.reject(e.all_required);if(!c.validateEmail(g))return a.reject(e.invalid_email_format);var i={first_name:d,last_name:f,email:g,dni:h},j=b.createLead(i);return j=j.then(function(a){return a},function(b){return a.reject(b.data)})}function h(){var a=b.listLeads();return a=a.then(function(a){return a})}function i(c){if(!c)return a.reject("No está permitido.");var d=b.getLead(c);return d=d.then(function(a){return a})}function j(){var a=b.listTruckTypes();return a=a.then(function(a){return a})}function k(){var a=b.listHomeTypes();return a=a.then(function(a){return a})}function l(c){if(!(c.lead_id&&c.address_from&&c.home_type_from_id&&c.floor_from&&c.address_to&&c.home_type_to_id&&c.floor_to&&c.travel_distance_aprox&&c.travel_time_aprox&&c.truck_size_type_id&&c.packaging_time_aprox&&c.packaging_price&&c.travel_price&&c.total_price&&c.final_price&&c.profit))return $.reject("Revise que todos los campos estén completos.");var d=b.createQuotation(c);return d=d.then(function(a){return a},function(b){return a.reject(b.data)})}return{signIn:f,createLead:g,listLeads:h,getLead:i,listTruckTypes:j,listHomeTypes:k,createQuotation:l}}angular.module("Core").factory("Main",a),a.$inject=["$q","Api","Utils","Persist","Message"]}(),function(){"use strict";angular.module("Views",["Public","Auth"])}(),function(){"use strict";angular.module("Public",[])}(),function(){"use strict";function a(a){function b(){c.error=!1;var b=a.signIn(c.user.email,c.user.password);b.then(function(){},function(a){c.error=a})}var c=this;c.user={},c.signIn=b}angular.module("Public").controller("SigninCtrl",a),a.$inject=["Main"]}(),function(){"use strict";angular.module("Auth",[])}(),function(){"use strict";function a(){}angular.module("Auth").controller("DashboardCtrl",a)}(),function(){"use strict";function a(a,b){function c(){d()}function d(){var c=a.leadId,d=b.getLead(c);d.then(function(a){e.lead=a})}var e=this;c()}angular.module("Auth").controller("LeadCtrl",a),a.$inject=["$stateParams","Main"]}(),function(){"use strict";function a(a){function b(){c()}function c(){var b=a.listLeads();d.empty_list=!1,b.then(function(a){d.list=a,d.list.length||(d.empty_list=!0)})}var d=this;b()}angular.module("Auth").controller("ListLeadsCtrl",a),a.$inject=["Main"]}(),function(){"use strict";function a(a,b){function c(){var c=b.createLead(d.lead.first_name,d.lead.last_name,d.lead.email,d.lead.dni);c.then(function(b){console.log(b),a.go("auth.Quotation",{leadId:b.id})},function(a){console.log(a),d.error=a})}var d=this;d.lead={},d.createLead=c}angular.module("Auth").controller("NewLeadCtrl",a),a.$inject=["$state","Main"]}(),function(){"use strict";function a(a,b,c,d){function e(){var a=c.leadId;return a?(m.quoting.lead_id=a,f(a),g(),h(),void i()):b.go("auth.Leads")}function f(a){var b=d.getLead(a);b.then(function(a){m.lead=a})}function g(){var a={zoom:7,center:q};n=new google.maps.Map(document.getElementById("map"),a),p.setMap(n),j()}function h(){var a=d.listTruckTypes();a.then(function(a){m.truckSizeTypes=a})}function i(){var a=d.listHomeTypes();a.then(function(a){m.homeTypes=a})}function j(){if(m.quoting.address_from&&m.quoting.address_to){var b={origin:m.quoting.address_from,destination:m.quoting.address_to,travelMode:google.maps.TravelMode.DRIVING,language:"es"};o.route(b,function(b,c){c===google.maps.DirectionsStatus.OK&&(p.setDirections(b),m.distance_aprox=b.routes[0].legs[0].distance.text,m.quoting.travel_distance_aprox=b.routes[0].legs[0].distance.value,m.time_travel_aprox=b.routes[0].legs[0].duration.text,m.quoting.travel_time_aprox=b.routes[0].legs[0].duration.value,k(),a.$apply())})}}function k(){if(m.quoting.travel_time_aprox&&m.quoting.truck_size_type_id){var a=m.quoting.travel_time_aprox/60,b=m.truckSizeTypes[m.quoting.truck_size_type_id-1].hour_price;m.quoting.packaging_price=(m.quoting.packaging_time_aprox*b/60).toFixed(2),m.quoting.travel_price=(a*b/60).toFixed(2),m.quoting.total_price=parseFloat(m.quoting.packaging_price)+parseFloat(m.quoting.travel_price),m.quoting.final_price=(m.quoting.total_price+50).toFixed(2)}}function l(){m.quoting.profit=(m.quoting.final_price-m.quoting.total_price).toFixed(2),console.log(JSON.stringify(m.quoting));var a=d.createQuotation(m.quoting);a.then(function(){b.go("auth.Lead",{leadId:c.leadId})},function(a){console.log(a)})}var m=this;m.quoting={lead_id:null,address_from:"",home_type_from_id:"",floor_from:1,address_to:"",home_type_to_id:"",floor_to:1,travel_distance_aprox:0,travel_time_aprox:0,truck_size_type_id:"",packaging_time_aprox:0,packaging_price:0,travel_price:0,total_price:0,final_price:0,profit:0},m.search={};var n,o=new google.maps.DirectionsService,p=new google.maps.DirectionsRenderer,q=new google.maps.LatLng(-12.0266032,-77.1282069);e(),m.calculateRoute=j,m.calculateTruckPrice=k,m.registerQuotation=l}angular.module("Auth").controller("QuotingCtrl",a),a.$inject=["$scope","$state","$stateParams","Main"]}(),function(){"use strict";angular.module("Shared",[])}(),function(){"use strict";function a(){return{require:"ngModel",link:function(a,b,c,d){var e={types:[],componentRestrictions:{country:"pe"}};a.gPlace=new google.maps.places.Autocomplete(b[0],e),google.maps.event.addListener(a.gPlace,"place_changed",function(){a.$apply(function(){console.log(b.val()),d.$setViewValue(b.val())})})}}}angular.module("Shared").directive("googlePlace",a)}(),angular.module("frontApp").run(["$templateCache",function(a){"use strict";a.put("scripts/views/auth/dashboard/dashboard.html",'<div class="container"> <iframe width="100%" height="550" src="https://www.youtube.com/embed/YjTRpUdw8Q4?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> </div>'),a.put("scripts/views/auth/leads/lead.html",'<div class="container"> <div class="list-leads to-uppercase"> <table class="table table-striped"> <thead> <tr> <th></th> <th>Nombre y Apellidos</th> <th>DNI</th> <th>Correo</th> </tr> </thead> <tbody class="text-left"> <tr> <td><img src="//panel.aloha.pe/static/images/lead.ce08db4f.jpg" class="media-photo"></td> <td>{{ vm.lead.first_name }} {{ vm.lead.last_name }}</td> <td>{{ vm.lead.dni }}</td> <td>{{ vm.lead.email }}</td> </tr> </tbody> </table> <div class="page-header"> <h1 class="text-muted">Cotizaciones</h1> </div> <div class="list-quotings"> <table class="table table-striped"> <thead> <tr> <th>Fecha</th> <th>Desde</th> <th>Hasta</th> <th>Precio</th> <th></th> </tr> </thead> <tbody class="text-left"> <tr> <td>Hoy</td> <td>{{ vm.lead.first_name }} {{ vm.lead.last_name }}</td> <td>{{ vm.lead.dni }}</td> <td>900</td> <td><a href="">Ver</a></td> </tr> </tbody> </table> </div> </div> </div>'),a.put("scripts/views/auth/leads/listLeads.html",'<div class="container"> <div class="leads leads-container text-center"> <div class="actions"> <ul class="list-inline pull-right"> <li> <a ui-sref="auth.NewLead()" class="btn btn-success">Nuevo Lead</a> </li> </ul> </div> <div class="list-leads to-uppercase"> <table class="table table-striped"> <thead> <tr> <th></th> <th>Nombre y Apellidos</th> <th>DNI</th> <th>Correo</th> <th></th> </tr> </thead> <tbody class="text-left"> <tr ng-repeat="item in vm.list"> <td><img src="//panel.aloha.pe/static/images/lead.ce08db4f.jpg" class="media-photo"></td> <td>{{ item.first_name }} {{ item.last_name }}</td> <td>{{ item.dni }}</td> <td>{{ item.email }}</td> <td> <a ui-sref="auth.Quotation({leadId: item.id})">Cotizar</a> <br> <a ui-sref="auth.LeadDetails({leadId: item.id})">Detalle</a> </td> </tr> <tr ng-if="vm.empty_list"> <td colspan="6">No hay leads registrados.</td> </tr> </tbody> </table> </div> </div> </div>'),a.put("scripts/views/auth/leads/newLead.html",'<div class="container"> <div class="leads leads-container"> <div class="page-header"> <h1 class="text-center text-muted">Nuevo Lead</h1> </div> <form ng-submit="vm.createLead()"> <div class="form-group"> <label>Nombres</label> <input ng-model="vm.lead.first_name" type="text" class="form-control" autofocus> </div> <div class="form-group"> <label>Apellidos</label> <input ng-model="vm.lead.last_name" type="text" class="form-control"> </div> <div class="form-group"> <label>Correo</label> <input ng-model="vm.lead.email" type="text" class="form-control"> </div> <div class="form-group"> <label>DNI</label> <input ng-model="vm.lead.dni" type="text" class="form-control"> </div> <div class="alert alert-danger" ng-if="vm.error">{{ vm.error }}</div> <button class="btn btn-lg btn-primary btn-block">COTIZAR</button> </form> </div> </div>'),a.put("scripts/views/auth/quoting/quoting.html",'<div class="container"> <div class="list-leads to-uppercase"> <table class="table table-striped"> <thead> <tr> <th></th> <th>Nombre y Apellidos</th> <th>DNI</th> <th>Correo</th> </tr> </thead> <tbody class="text-left"> <tr> <td><img src="//panel.aloha.pe/static/images/lead.ce08db4f.jpg" class="media-photo"></td> <td>{{ vm.lead.first_name }} {{ vm.lead.last_name }}</td> <td>{{ vm.lead.dni }}</td> <td>{{ vm.lead.email }}</td> </tr> </tbody> </table> </div> <div class="lead leads-container"> <div class="page-header"> <h1 class="text-center text-muted">Cotizador</h1> </div> <form ng-submit="vm.registerQuotation()"> <div class="form-group"> <label>¿Desde dónde se muda?</label> <input ng-model="vm.quoting.address_from" ng-blur="vm.calculateRoute()" google-place type="text" class="form-control" autofocus> </div> <div class="form-group"> <label>Tipo de vivienda</label> <select ng-model="vm.quoting.home_type_from_id" class="form-control"> <option value="">-- Elige un tipo de vivienda --</option> <option ng-repeat="type in vm.homeTypes" value="{{ type.id }}">{{ type.name }}</option> </select> </div> <div class="form-group"> <label>Piso</label> <input ng-model="vm.quoting.floor_from" type="number" class="form-control"> </div> <div class="form-group"> <label>¿Hasta dónde se muda?</label> <input ng-model="vm.quoting.address_to" ng-blur="vm.calculateRoute()" google-place type="text" class="form-control"> </div> <div class="form-group"> <label>Tipo de vivienda</label> <select ng-model="vm.quoting.home_type_to_id" class="form-control"> <option value="">-- Elige un tipo de vivienda --</option> <option ng-repeat="type in vm.homeTypes" value="{{ type.id }}">{{ type.name }}</option> </select> </div> <div class="form-group"> <label>Piso</label> <input ng-model="vm.quoting.floor_to" type="number" class="form-control"> </div> <div class="form-group"> <div id="map"></div> </div> <div class="form-group"> <div class="col-xs-6"> <label>Distancia aproximada</label> <input ng-model="vm.distance_aprox" type="text" class="form-control" disabled> </div> <div class="col-xs-6"> <label>Tiempo de viaje</label> <input ng-model="vm.time_travel_aprox" type="text" class="form-control" disabled> </div> </div> <div class="form-group"> <label>Tipo de camión</label> <select ng-model="vm.quoting.truck_size_type_id" ng-change="vm.calculateTruckPrice()" class="form-control"> <option value="">-- Elige el tipo de camión --</option> <option ng-repeat="truck_size_type in vm.truckSizeTypes" value="{{ truck_size_type.id }}">{{ truck_size_type.name }}</option> </select> </div> <div class="form-group"> <label>Tiempo aproximado de la mudanza (Minutos)</label> <input ng-change="vm.calculateTruckPrice()" ng-model="vm.quoting.packaging_time_aprox" type="number" class="form-control"> </div> <div class="summary"> <div class="page-header"> <h1 class="text-muted">Resumen</h1> </div> <div class="form-group"> <label>Precio por cargar cosas</label> <label class="pull-right"><strong>{{ vm.quoting.packaging_price }}</strong></label> </div> <div class="form-group"> <label>Precio transporte al nuevo punto</label> <label class="pull-right"><strong>{{ vm.quoting.travel_price }}</strong></label> </div> <div class="form-group"> <label>Precio por mudanza</label> <label class="pull-right"><strong>{{ vm.quoting.total_price }}</strong></label> </div> </div> <div class="summary"> <div class="page-header"> <h1 class="text-muted">Total</h1> </div> <div class="form-group"> <label>Precio acordado con el cliente</label> <input ng-model="vm.quoting.final_price" type="text" class="form-control"> </div> </div> <button class="btn btn-lg btn-primary btn-block">GUARDAR</button> </form> </div> </div>'),a.put("scripts/views/public/signin/signin.html",'<div class="container"> <div class="card card-container"> <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"> <form ng-submit="vm.signIn()" class="form-signin"> <input ng-model="vm.user.email" type="email" class="form-control" placeholder="Correo" required autofocus> <input ng-model="vm.user.password" type="password" class="form-control" placeholder="Contraseña" required> <div ng-if="vm.error" class="alert alert-danger small">{{ vm.error }}</div> <button class="btn btn-primary btn-block" type="submit">Sign in</button> </form> </div> </div>')}]);