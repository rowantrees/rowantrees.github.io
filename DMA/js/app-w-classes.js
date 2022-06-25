var myApp = angular.module("myApp", []);

myApp.factory('serviceLocalStorage', ['$rootScope', function($rootScope) {
  return {
      get: function(key) {
          return JSON.parse(window.localStorage.getItem(key));
      },
      set: function(key, data) {
          window.localStorage.setItem(key, JSON.stringify(data));
      }
  };
}]);

myApp.controller("MainController", function ($scope, $http, serviceLocalStorage) {
  serviceLocalStorage.set("LocalStorageExample", "Local Storage Example");
  $scope.storageexample = serviceLocalStorage.get('LocalStorageExample');

  // default class type
  $scope.classtype = "";

  $scope.setClassModal = function (classdata) {
    $scope.classModalDetail = classdata;
    console.log($scope.classModalDetail)
  }

  $scope.filterAge = function(item){
    var filterAge = $scope.age;
    if (filterAge) { // check if there is an age entered and if not then just return the item
      var min = item.min_age ? item.min_age * 1 : 0; // ternary operator - if min_age is defined then use min_age, otherwise set min to 0
      var max = item.max_age ? item.max_age * 1 : 999; // ternary operator - if max_age is defined then use max_age, otherwise set max to 999
      if (filterAge >= min && filterAge <= max) { // if the age is between the min and max, return the item
        return item
      }
    }
    else { // if no age is entered, just return the item regardless
      return item
    }
  };

  $scope.dayFilters = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  };
  $scope.filterDay = function(item){
    const entries = Object.entries($scope.dayFilters);
    for (const entry of entries) {
      if (entry[1] == true) {
        if (item.meeting_days.daylist.includes(entry[0])) {
          return item;
        }
      }
    }
  };

});

myApp.controller("ClassController", function ($scope, $http) {
  $scope.getClasses = function (cat1, cat2, cat3, day) {
    $scope.requesting = true;
    var req = {
      method: "GET",
      url: "https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsJSON",
      headers: {
        "Content-Type": undefined,
      },
      params: {
        OrgId: "546238", // DMA OrgId
        // OrgId: "520628", // this is TDC's OrgId so you will have to change it to use yours
        ClassDays: day,
        Status: "Active",
        Cat1: cat1,
        Cat2: cat2,
        Cat3: cat3,
      },
    };
    $http(req).then(
      function successCallback(response) {
        var tempdata = response.data.rows;

        // modify each record from Jackrabbit to allow for better display and sorting on the page
        for (let i = 0; i < tempdata.length; i++) {

          // convert times from 24h to 12h
          tempdata[i].start_time = convertTime24to12(tempdata[i].start_time);
          tempdata[i].end_time = convertTime24to12(tempdata[i].end_time);

          // format age strings to readable format
          if (tempdata[i].min_age) {
            tempdata[i].min_age = convertAgeString(tempdata[i].min_age);
          }
          if (tempdata[i].max_age) {
            tempdata[i].max_age = convertAgeString(tempdata[i].max_age);
          }

          // create a list of the days the class is offered on and insert that list into the class record
          var daylist = new Array();
          for (const key in tempdata[i].meeting_days) {
            let value = tempdata[i].meeting_days[key];
            if (value) {
              daylist.push(key);
            }
          }
          tempdata[i].meeting_days.daylist = daylist;

          // online_reg_link from Jackrabbit is not formatted correctly for use on page - this replaces instances of &amp; with &
          tempdata[i].online_reg_link = tempdata[i].online_reg_link.replaceAll("&amp;", "&");
        }

        $scope.classes = tempdata;  // put the modified class data into a scope variable for use on page
        $scope.requestingclassdata = false;
        console.log($scope.classes);  // add the class data to the browser console for debugging or viewing
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  };

  function convertTime24to12(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  function convertAgeString(agestring) {
    agestring = agestring.substr(1); // remove first "P" character
    var agepcs = agestring.match(/.{1,3}/g);
    for (i = 0; i < agepcs.length; i++) {
      agepcs[i] = agepcs[i].substring(0, agepcs[i].length - 1);
      agepcs[i] = agepcs[i].replace(/^0+/, "");
    }
    var newagestring = agepcs[0] * 1 + agepcs[1] / 12;
    return newagestring;
  }
});

// in some cases such as the class description, you may find it useful to include HTML tags
// this filter is used for binding content that includes HTML from Jackrabbit into a page element
// to see a sample of this usage, search the HTML for "ng-bind-html"
myApp.filter("to_trusted", [
  "$sce",
  function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  },
]);

myApp.filter("dayFilter", function () {
  return function (items, filterDay) {
    var result = [];
    if (filterDay) {
      angular.forEach(items, function (item) {
        if (item.meeting_days.daylist.includes(filterDay)) {
          result.push(item);
        }
      });
      return result;
    } else {
      return items;
    }
  };
});

myApp.filter("monthFilter", function () {
  return function (items, filterMonth) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var result = [];
    if (filterMonth) {
      angular.forEach(items, function (item) {
        const classdate = new Date(item.start_date);
        if (filterMonth == monthNames[classdate.getMonth()]) {
          result.push(item);
        }
      });
      return result;
    } else {
      return items;
    }
  };
});

myApp.filter("yearFilter", function () {
  return function (items, filterYear) {
    var result = [];
    if (filterYear) {
      angular.forEach(items, function (item) {
        const classdate = new Date(item.start_date);
        if (filterYear == classdate.getFullYear()) {
          result.push(item);
        }
      });
      return result;
    } else {
      return items;
    }
  };
});
