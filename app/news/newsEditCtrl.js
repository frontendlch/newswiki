(function() {
  "use strict";

  angular.module("newsWikiApp")
    .controller("NewsEditCtrl", [ "newsItem","$state", NewsEditCtrl ] );

  function NewsEditCtrl(newsItem, $state) {
    var me = this;

    me.newsItem = newsItem;
    
    me.newsItem.destacado = me.newsItem.destacado ? true : false;
    me.titulo = me.newsItem.idNoticia ? "Editar: " + me.newsItem.tituloNoticia : "Nueva Noticia";

    me.showDatepicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      me.opened = !me.opened;
    };

    me.addTags = function(tags) {
      var array = tags.split(',');
      me.newsItem.tags = me.newsItem.tags ? me.newsItem.tags.concat(array) : array;
      me.newsTags = "";
    };

    me.removeTag = function(idx) {
      me.newsItem.tags.splice(idx , 1);
    };

    me.guardar = function() {
      me.newsItem.$save(function(data) {
        toastr.success("Datos guardados correctamente","", {timeOut: 1000});
        // toastr.info("¿ Estas seguro que quieres eliminar ? <button type='button' class='btn btn-danger'>Confirmar</button>", "", {
        //   timeOut: 0,
        //   positionClass: "toast-bottom-full-width",
        //   onHidden: function() {
        //     console.log("Goodbye");
        //   }
        // });
      });
    };

    me.cancelar = function() {
      $state.go("newsList");
    };
  }
})();
