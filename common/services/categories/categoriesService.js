(function() {
  "use strict";

  angular.module("common.services")
    .factory("CategoriesService", [ "$http", CategoriesService ]);

    function CategoriesService($http) {
      // Esto retorna una promesa <- promesa que va hacer recuperada por quien consuma ese servicio
      return $http.get("/api/categorias");
    }

})();
