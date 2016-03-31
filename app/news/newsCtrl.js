(function(){
  "use strict";
  angular.module("newsWikiApp")
    // min-safe array
    .controller("NewsCtrl", ["NewsService", NewsCtrl ]);

  // Funciones de los controladores
  function NewsCtrl(NewsService) {
    var me = this;

    // Busco los News en el repositorio, pasandole un objeto <- options (el servicio + un callback success)
    newsRepository.queryNews(
      {
        newsService: NewsService,
        success: function(data) {
          me.news = data;
        }
      }
    );

    // Category Filter Click
    me.onCategoryClick = function(category) {
      me.filterCategory = category ? category : "";
    };
  }

  // **** Repositorios ****

  // Patron Revealing Module
  var newsRepository = (function() {
    var me = {};

    // Query obtengo todos los News
    me.queryNews = function(options) {
      options.newsService.query(function(data) {
        options.success(data);
      });
    };
    // Retorno el objeto del Query
    return {
      queryNews : me.queryNews
    };
  }());

})();
