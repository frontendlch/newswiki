(function() {
  "use strict";

  angular.module("common.services")
    .factory("NewsService", [ "$resource", NewsService ]);

    function NewsService($resource) {
      // Esto retorna una promesa <- promesa que va hacer recuperada por quien consuma ese servicio
      return $resource("/api/news/:idNoticia");
    }

})();
