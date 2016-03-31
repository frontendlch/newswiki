(function() {
  "use strict";

  angular.module("newsWikiApp")
    .controller("NewsDetailCtrl", [ "newsItem", NewsDetailCtrl ] );


  // Funciones de los controladores
  function NewsDetailCtrl(newsItem) {
    var me = this;
    // El parametro newsItem viene del Resolve
    me.newsItem = newsItem;

    me.newsItem.tagList = me.newsItem.tags ? me.newsItem.tags.toString() : me.newsItem.tags;
  }

})();
