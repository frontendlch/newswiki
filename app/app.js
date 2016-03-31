// IIFE Immediately Invoked Functino Expression
(function() {
  "use strict";
  var app = angular.module("newsWikiApp",
                                  ["common.services",
                                   "common.servicesMock",
                                   "ui.router",
                                   "ui.mask",
                                   "ui.bootstrap",
                                   "ngMessages"]);

  app.config( ["$stateProvider","$urlRouterProvider", function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "app/welcomeView.html"
      })
      .state("newsList", {
        url: "/news",
        templateUrl: "app/news/views/newsListView.html",
        controller: "NewsCtrl as vm"
      })
      .state("newsEdit", {
        url: "/news/edit/:idNoticia",
        templateUrl: "app/news/views/newsEditView.html",
        controller: "NewsEditCtrl as vm",
        resolve : {
          // Cuando quiero cargar DATA , que este disponible cuando la vista se levanta por primera vez
          newsService : "NewsService",
          newsItem: function(newsService, $stateParams) {
            var idNoticia = $stateParams.idNoticia;
            return newsService.get({idNoticia : idNoticia}).$promise;
          }
        }
      })
        .state("newsEdit.info", {
          url: "/info",
          templateUrl: "app/news/views/newsEditInfoView.html"
        })
        .state("newsEdit.tags", {
          url: "/tags",
          templateUrl: "app/news/views/newsEditTagsView.html"
        })
      .state("newsDetail", {
        url: "/news/:idNoticia",
        templateUrl: "app/news/views/newsDetailView.html",
        controller: "NewsDetailCtrl as vm",
        resolve : {
          // Cuando quiero cargar DATA , que este disponible cuando la vista se levanta por primera vez
          newsService : "NewsService",
          newsItem: function(newsService, $stateParams) {
            var idNoticia = $stateParams.idNoticia;
            return newsService.get({idNoticia : idNoticia}).$promise;
          }
        }
      });
  }] );

  // Manejador de Errores
  app.config(function($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
      return function(exception, cause) {
        exception.message = "Por favor contactese con Help Desk! " + "\n Message: " + exception.message;
        toastr.error(exception.message);
      };
    }] );
  });

})();
