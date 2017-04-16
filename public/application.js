var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,
  ['ngResource','ngRoute','users', 'example','articles']);

mainApplicationModule.config(['$locationProvider', function($locationProvider){
  //Hashbangs, utilizado para permitir aos crawlers de SEO identificar que é uma SPA
  $locationProvider.hashPrefix('!');
}]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
  angular.bootstrap(document, [mainApplicationModuleName]);
});
