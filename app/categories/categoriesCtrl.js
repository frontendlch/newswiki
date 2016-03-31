(function(){
  "use strict";
  angular.module("newsWikiApp") //camel case
    // min-safe array
    .controller("CategoriesCtrl", [ "CategoriesService", CategoriesCtrl ]); //pascal case

  // Funciones de los controladores
  function CategoriesCtrl(CategoriesService) {
    var me = this;

    // Busco las categorias en el repositorio, pasandole un objeto <- options (el servicio + un callback success)
    categoriesRepository.getCategories(
      {
        categoriesService : CategoriesService,
        success: function(data) {
          // Obtengo los valores <- categorias
          me.categories = data;
        }
      }
    );

    // Oculto las categorias <- Por default
    me.showCategories = true;
    // Funcion que muestra y oculta las categorias
    me.toogleCategories = function() {
      me.showCategories = !me.showCategories;
    };
  }

  // **** Repositorios ****

  // Patron Revealing Module
  var categoriesRepository = (function() {
    var me = {};

    // GET Obtengo las categorias
    me.getCategories = function(options) {
      options.categoriesService.then(function(response) {
        options.success(response.data);
      });
    };
    // Retorno el objeto del GET
    return {
      getCategories : me.getCategories
    };
  }());

})();
