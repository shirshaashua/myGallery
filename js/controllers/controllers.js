app.controller('mainController', function ($scope,$rootScope,getImgService,imagesList) {

    $rootScope.imagesList = imagesList.data;

});

