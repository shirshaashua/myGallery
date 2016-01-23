var app = angular.module('shirApp', ['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/main", {
            templateUrl: "templates/main.html",
            controller: "mainController",
            resolve: {
                imagesList: function (getImgService) {
                    return getImgService.getImgs().then(function (imagesList) {
                        return imagesList;

                    });
                }
            }
        });
    }]);


