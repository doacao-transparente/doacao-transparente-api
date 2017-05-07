// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('App', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

/*
 * groupBy
 *
 * Define when a group break occurs in a list of items
 *
 * @param {array}  the list of items
 * @param {String} then name of the field in the item from the list to group by
 * @returns {array} the list of items with an added field name named with "_new"
 *                  appended to the group by field name
 *
 * @example     <div ng-repeat="item in MyList  | groupBy:'groupfield'" >
 *              <h2 ng-if="item.groupfield_CHANGED">{{item.groupfield}}</h2>
 *
 *              Typically you'll want to include Angular's orderBy filter first
 */

app.filter('groupBy', function(){
    return function(list, group_by) {

    var filtered = [];
    var prev_item = null;
    var group_changed = false;
    // this is a new field which is added to each item where we append "_CHANGED"
    // to indicate a field change in the list
    var new_field = group_by + '_CHANGED';
    var group_index_field = group_by + '_INDEX';
    var group_index = 0;

	var el = document.getElementById('#category-container');
    var scope = angular.element(el).scope();

    // loop through each item in the list
    angular.forEach(list, function(item) {

        group_changed = false;

        // if not the first item
        if (prev_item !== null) {

            // check if the group by field changed
            if (prev_item[group_by] !== item[group_by]) {
                group_changed = true;
            }

        // otherwise we have the first item in the list which is new
        } else {
            group_changed = true;
        }

        // if the group changed, then add a new field to the item
        // to indicate this
        if (group_changed) {
            item[new_field] = true;
            group_index = group_index + 1;
            item[group_index_field] = group_index;
        } else {
            item[new_field] = false;
            item[group_index_field] = group_index;
        }

        filtered.push(item);
        prev_item = item;

    });

    return filtered;
    };
});
