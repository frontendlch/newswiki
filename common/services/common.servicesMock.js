(function() {
  "use strict";


  var app = angular.module("common.servicesMock", ["ngMockE2E"]); //ngMockE2E para usar $httpBackend

  // Interceptor $httpBackend API
  app.run( ["$httpBackend", function($httpBackend) {
    // Simular Categorias WebService
    var categories = ["Politica", "Economia", "Deportes", "Moda", "Mundo"];
    var categoriesUrl = "/api/categorias";
    $httpBackend.whenGET(categoriesUrl).respond(categories);

    // Simular News API REST <- Query
    var news = [
      {
        "idNoticia": 1,
        "codigoNoticia": "NWD-9838",
        "tituloNoticia": "Peru envio nota diplomatica a Chile",
        "descripcionNoticia": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolor,eos laborum quaerat quam quos rerum!" +
        "Expedita itaque optio praesentium quo sequi soluta voluptatem! At eos est fuga illum iusto necessitatibus " +
        "bcaecati quia tempora ullam. Commodi doloribus error ex fugiat laborum magni, officiis ratione reiciendis sunt" +
        "velit voluptas voluptates. Culpa deleniti dolore, excepturi fugit id in sed vitae voluptates. Tenetur.",
        "fechaPublicacion": new Date(),
        "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/4/1234815/base_image.jpg",
        "destacado": true,
        "categoria": "Politica",
        "tags": ["peru", "politica", "guerra"]
      },
      {
        "idNoticia": 2,
        "codigoNoticia": "NFK-1275",
        "tituloNoticia": "Alan Garcia cuestiona ofertas laborales",
        "descripcionNoticia": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Al quaerat quam quos rerum!" +
        "Expedita itaque Commodi doloribus error ex fugiat laborum mag At eos est fuga illum iusto necessitatibus " +
        "bcaecati quia tempora ullam. Commodi doloribus error ex fugiat laborum magni, officiis ratione reiciendis sunt" +
        "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur.",
        "fechaPublicacion": new Date(2015,0,1),
        "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/5/1235147/base_image.jpg",
        "destacado": true,
        "categoria": "Politica",
        "tags": ["alan garcia", "politica"]
      },
      {
        "idNoticia": 3,
        "codigoNoticia": "TFH-1455",
        "tituloNoticia": "Mestiza, la marca de Gamarra que compite en Brasil",
        "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
        "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
        "fechaPublicacion": new Date(2015,7,30),
        "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/4/1234368.jpg",
        "destacado": false,
        "categoria": "Economia",
        "tags": ["mestiza", "gamarra"]
      },
      {
        "idNoticia": 4,
        "codigoNoticia": "TFS-7890",
        "tituloNoticia": "Esta semana continua el torneo Clausura",
        "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
        "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
        "fechaPublicacion": new Date(2015,10,2),
        "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/5/1235138/base_image.jpg",
        "destacado": false,
        "categoria": "Deportes",
        "tags": ["futbol", "clausura"]
      },
      {
        "idNoticia": 5,
        "codigoNoticia": "JNQ-4564",
        "tituloNoticia": "Avion ruso que cayo en Egipto se despedazo",
        "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
        "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
        "fechaPublicacion": new Date(2015,10,3),
        "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/5/1235130/base_image.jpg",
        "destacado": false,
        "categoria": "Mundo",
        "tags": ["avion", "accidente"]
      },
      {
        "idNoticia": 6,
        "codigoNoticia": "NRR-6002",
        "tituloNoticia": "Los primeros dias del LifWeek",
        "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
        "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
        "fechaPublicacion": new Date(2015,10,2),
        "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/4/1234337.jpg",
        "destacado": false,
        "categoria": "Moda",
        "tags": ["lifweek", "moda"]
      }
    ];
    var newsUrl = "/api/news";
    $httpBackend.whenGET(newsUrl).respond(news);

    // Siminular News con ID <- GET
    var editingRegExp = new RegExp(newsUrl + "/[0-9][0-9]*",'');
    $httpBackend.whenGET(editingRegExp).respond(function(method, url, data) {
      var newsItem = { idNoticia : 0 };
      var parameters = url.split('/');
      var length = parameters.length;
      var newsItemId = parameters[length-1];

      if(newsItemId > 0) {
        for(var i = 0; i < news.length; i++) {
          if(news[i].idNoticia == newsItemId) {
            newsItem = news[i];
            break;
          }
        }
      }
      return [200, newsItem, {}];
    });

    // Siminular News Post <- SAVE
    $httpBackend.whenPOST(newsUrl).respond(function(method, url, data) {
      var newsItem = angular.fromJson(data);

      if(!newsItem.idNoticia) {
        newsItem.idNoticia = news[news.length-1].idNoticia + 1;
        news.push(newsItem);
      } else {
        for(var i = 0; i < news.length; i++) {
          if(news[i].idNoticia == newsItem.idNoticia) {
            news[i] = newsItem;
            break;
          }
        }
      }
      return [200, newsItem, {}];
    });

    // Ignorar estas peticiones
    $httpBackend.whenGET(/app/).passThrough();
  }] );

  //******* Tambien puede funcionar asi *****

  // angular.module("common.servicesMock", ["ngMockE2E"])
  //   .run( [ "$httpBackend",HttpBackend ] );
  //
  // function HttpBackend($httpBackend) {
  //   // Simular Categorias WebService
  //   var categories = ["Politica", "Economia", "Deportes", "Moda", "Mundo"];
  //   var categoriesUrl = "/api/categorias";
  //   $httpBackend.whenGET(categoriesUrl).respond(categories);
  //
  //   // Simular News API REST
  //   var news = [
  //     {
  //       "idNoticia": 1,
  //       "codigoNoticia": "NWD-9838",
  //       "tituloNoticia": "Peru envio nota diplomatica a Chile",
  //       "descripcionNoticia": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolor,eos laborum quaerat quam quos rerum!" +
  //       "Expedita itaque optio praesentium quo sequi soluta voluptatem! At eos est fuga illum iusto necessitatibus " +
  //       "bcaecati quia tempora ullam. Commodi doloribus error ex fugiat laborum magni, officiis ratione reiciendis sunt" +
  //       "velit voluptas voluptates. Culpa deleniti dolore, excepturi fugit id in sed vitae voluptates. Tenetur.",
  //       "fechaPublicacion": new Date(),
  //       "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/4/1234815/base_image.jpg",
  //       "destacado": true,
  //       "categoria": "Politica",
  //       "tags": ["peru", "politica", "guerra"]
  //     },
  //     {
  //       "idNoticia": 2,
  //       "codigoNoticia": "NFK-1275",
  //       "tituloNoticia": "Alan Garcia cuestiona ofertas laborales",
  //       "descripcionNoticia": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Al quaerat quam quos rerum!" +
  //       "Expedita itaque Commodi doloribus error ex fugiat laborum mag At eos est fuga illum iusto necessitatibus " +
  //       "bcaecati quia tempora ullam. Commodi doloribus error ex fugiat laborum magni, officiis ratione reiciendis sunt" +
  //       "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur.",
  //       "fechaPublicacion": new Date(2015,0,1),
  //       "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/5/1235147/base_image.jpg",
  //       "destacado": true,
  //       "categoria": "Politica",
  //       "tags": ["alan garcia", "politica"]
  //     },
  //     {
  //       "idNoticia": 3,
  //       "codigoNoticia": "TFH-1455",
  //       "tituloNoticia": "Mestiza, la marca de Gamarra que compite en Brasil",
  //       "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
  //       "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
  //       "fechaPublicacion": new Date(2015,7,30),
  //       "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/4/1234368.jpg",
  //       "destacado": false,
  //       "categoria": "Economia",
  //       "tags": ["mestiza", "gamarra"]
  //     },
  //     {
  //       "idNoticia": 4,
  //       "codigoNoticia": "TFS-7890",
  //       "tituloNoticia": "Esta semana continua el torneo Clausura",
  //       "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
  //       "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
  //       "fechaPublicacion": new Date(2015,10,2),
  //       "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/5/1235138/base_image.jpg",
  //       "destacado": false,
  //       "categoria": "Deportes",
  //       "tags": ["futbol", "clausura"]
  //     },
  //     {
  //       "idNoticia": 5,
  //       "codigoNoticia": "JNQ-4564",
  //       "tituloNoticia": "Avion ruso que cayo en Egipto se despedazo",
  //       "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
  //       "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
  //       "fechaPublicacion": new Date(2015,10,3),
  //       "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/5/1235130/base_image.jpg",
  //       "destacado": false,
  //       "categoria": "Mundo",
  //       "tags": ["avion", "accidente"]
  //     },
  //     {
  //       "idNoticia": 6,
  //       "codigoNoticia": "NRR-6002",
  //       "tituloNoticia": "Los primeros dias del LifWeek",
  //       "descripcionNoticia": "Loryade laborum magni, officiis ratione reiciendis sunt aque Commodi doloribus error ex fuos est fuga illum iusto ne" +
  //       "velit voluptas voluptates. Dst fuga illum iusto necessita in sed vitae voluptates. Tenetur giat laborum mag At e",
  //       "fechaPublicacion": new Date(2015,10,2),
  //       "banner" : "http://cde.3.elcomercio.pe/ima/0/1/2/3/4/1234337.jpg",
  //       "destacado": false,
  //       "categoria": "Moda",
  //       "tags": ["lifweek", "moda"]
  //     }
  //   ];
  //   var newsUrl = "/api/news";
  //   $httpBackend.whenGET(newsUrl).respond(news);
  //
  // }
})();
