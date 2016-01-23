app.factory("getImgService", function ($http) {
    var getImgService = {};
    getImgService.getImgs = function () {
        return $http.get("json/images.json");

    };

    return getImgService;
});

/*app.factory("checkImagesService", function ($http) {
    var checkImagesService = {};
    var replacedItem = {
        "title": "Replaced Item",
        "url": "http://farm9.static.flickr.com/8305/7893507666_0d25cd9f30.jpg",
        "date": "Thu, 30 Aug 2012 10:41:00 -0400"
    };
    checkImagesService.arrangeList = function (imgList) {
        for (i = 0; i < imgList.length; i++) {
            if(imgList[i].status==304){
                imgList[i]=imgList[i].replace(replacedItem);
            }
        }

    };

    return checkImagesService;
});*/

