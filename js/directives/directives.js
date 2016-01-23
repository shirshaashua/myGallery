app.directive('myGallery', function ($http, $rootScope,$interval, $uibModal) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/galleryTemplate.html',
        scope: {
            images:"=",
            sortFeature: "=?sortFeature",
            searchFeature: "=?searchFeature",
            autoRotateTime: "=?autoRotateTime",
            pagiFeature: "=?pagiFeature"

        },
        link: function (scope, element, attrs) {

            scope.bottomLimit = 0;
            scope.maxTumbImg = 10;
            scope.opened = false;
            scope.predicate = "";
            scope.activePaginationIndex = 0;
            scope.autoSlide;
            scope.timeInterval = 4000;
            scope.query;
            (scope.sortFeature == undefined ? scope.sortFeature = true:'');
            (scope.searchFeature == undefined ? scope.searchFeature = true:'');
            (scope.autoRotateTime == undefined ? scope.autoRotateTime = 4000:'');
            (scope.pagiFeature == undefined ? scope.pagiFeature = true:'');

            console.log(scope.autoRotateTime);
            $interval(function () {
                if (scope.autoSlide && scope.autoSlide!="false") {
                    callAtInterval()
                }
            }, scope.timeInterval);
            function callAtInterval() {
                scope.showNextImages();
            }

            scope.showNextImages = function () {
                if (scope.bottomLimit + scope.maxTumbImg < scope.images.length) {
                    scope.bottomLimit += scope.maxTumbImg;
                    scope.activePaginationIndex = Math.ceil(scope.bottomLimit / scope.maxTumbImg);

                }
                else {
                    scope.bottomLimit = 0;
                    scope.activePaginationIndex = 0;

                }
                console.log(scope.bottomLimit);
            };
            scope.showPrevImages = function () {
                if (scope.bottomLimit > 0) {
                    scope.bottomLimit -= scope.maxTumbImg;
                    scope.activePaginationIndex = Math.ceil(scope.bottomLimit / scope.maxTumbImg);
                }
                else {
                    scope.bottomLimit = scope.images.length - scope.maxTumbImg;
                    scope.activePaginationIndex = scope.maxTumbImg - 1;

                }
            };

            scope.search = function (row) {
                if (!scope.query) {
                    return true;
                }

                return (row.title.indexOf(scope.query || '') !== -1);
            };

            scope.$watch('maxTumbImg', function () {
                if (!scope.arrayLength) {
                    scope.arrayLength = 100;
                }
                scope.numberOfPages = Math.ceil(scope.arrayLength / scope.maxTumbImg);

            });

            scope.range = function () {
                if (scope.numberOfPages) {
                    return new Array(scope.numberOfPages);
                }
            }

            scope.changeImageView = function (index) {
                scope.bottomLimit = index * scope.maxTumbImg;
                scope.activePaginationIndex = index;
            };

            scope.open = function (type, index, item) {

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/directives/templates/' + type + '.html',
                    controller: function($scope, $uibModalInstance, imgIndex, $rootScope, $interval){
                        $scope.img = scope.images[imgIndex];
                        $scope.images = scope.images;
                        $scope.bottomLimit = imgIndex;
                        $scope.maxTumbImg = 10;

                        $scope.showNextImages = function () {
                            if ($scope.bottomLimit < scope.images.length) {
                                $scope.bottomLimit += 1;
                            }
                            else {
                                $scope.bottomLimit = scope.images.length - 1;
                            }
                            $scope.img = scope.images[$scope.bottomLimit];
                        };
                        $scope.showPrevImages = function () {
                            if ($scope.bottomLimit > 0) {
                                $scope.bottomLimit -= 1;
                            }
                            else {
                                $scope.bottomLimit = 0;
                            }
                            $scope.img = scope.images[$scope.bottomLimit];
                        };

                        $scope.showImages = function (index) {
                            console.log(index + "," + $scope.bottomLimit);
                            var j = 0;
                            for (i = $scope.bottomLimit; i < scope.images.length; i++) {
                                if (j == index) {
                                    $scope.img = scope.images[i];
                                    //console.log("i=index"+i+index);
                                }
                                j++;
                            }
                        };
                        $scope.slideShow = function () {
                            var index = 1;
                            $interval(function () {
                                callAtInterval()
                                index++;
                                if (index == scope.images.length) {
                                    index = 0;
                                }
                            }, scope.autoRotateTime);
                            function callAtInterval() {
                                $scope.img = scope.images[index];
                            }
                        }
                        $uibModalInstance.opened.then(function () {
                            if (scope.modalType === "slideShowModal") {
                                $scope.slideShow();
                            }
                        });


                        $scope.ok = function () {
                            $uibModalInstance.close($scope.selected.item);
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: 'lg',
                    resolve: {
                        imgIndex: function () {
                            scope.modalType = type;
                            if (type === "slideShowModal") {
                                return 0;
                            }
                            console.log("title" + item.title + index);

                            for (i = 0; i < scope.images.length; i++) {
                                if (scope.images[i].title == item.title) {
                                    index = i;
                                    console.log("i=index" + i + index);
                                }
                            }
                            return index;
                        }
                    }
                });
            }
        }
    }
});
