'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';

    $scope.showMenu = false;
    $scope.message = "Loading ...";
    menuFactory.getDishes().query(
        function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
}])

.controller('ContactController', ['$scope', '$stateParams', 'feedbackFactory', function ($scope, $stateParams, feedbackFactory) {
    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', '$stateParams', 'feedbackFactory', function ($scope, $stateParams, feedbackFactory) {
    $scope.feedback = [];
    $scope.sendFeedback = function () {
        console.log($scope.myfeedback);
        $scope.feedback.push($scope.myfeedback);

        feedbackFactory.getFeedback().save($scope.feedback);
        $scope.feedbackForm.$setPristine();
        
        $scope.myfeedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };
    }
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = menuFactory.getDishes().get({
            id: parseInt($stateParams.id, 10)
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    $scope.submitComment = function () {
        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);
        $scope.dish.comments.push($scope.mycomment);

        menuFactory.getDishes().update({
            id: $scope.dish.id
        }, $scope.dish);
        $scope.commentForm.$setPristine();
        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
    }
}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
    $scope.showDish = false;
    $scope.message = "Loading ...";
    menuFactory.getDishes().get({
            id: 0
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.showPromotion = false;
    menuFactory.getPromotions().get({
            id: 0
        })
        .$promise.then(
            function (response) {
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.showChef = false;
    corporateFactory.getLeaders().get({
            id: 3
        })
        .$promise.then(
            function (response) {
                $scope.execChef = response;
                $scope.showChef = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
    $scope.showLeaders = false;
    corporateFactory.getLeaders().query(
        function (response) {
            $scope.leaders = response;
            $scope.showLeaders = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
}]);