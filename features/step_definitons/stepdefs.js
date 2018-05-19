const angular = require('angular')
const { expect } = require('chai')
const { Before, When, Then } = require('cucumber')

let $scope

Before(() => {
  $scope = document.createElement('div')
  $scope.innerHTML = `<div id="app">
    <div ng-controller="HelloController">
      <h2>{{message}}</h2>
    </div>
  </div>`
  document.body.appendChild($scope)

  const app = angular.module("app", []);
  app.controller("HelloController", function ($scope) {
    $scope.message = "Hello, Angular";
  });
})

When(/I open the app/, () => {
  angular.bootstrap($scope.querySelector('#app'), ['app'])
})

Then(/I should see "Hello, Matt"/, () => {
  expect($scope.querySelector('h2').textContent).to.eql("Hello, Matt")
})
