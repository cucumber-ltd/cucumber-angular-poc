const angular = require('angular')
const fs = require('fs')
const { expect } = require('chai')
const { Before, When, Then } = require('cucumber')

let $scope

Before(() => {
  const html = fs.readFileSync('./index.html', "utf8")
  document.write(html)
  $scope = document.getElementById('app')
})

When(/I open the app/, () => {
  angular.bootstrap($scope.querySelector('#app'), ['app'])
})

Then(/I should see "Hello, Matt"/, () => {
  expect($scope.querySelector('h2').textContent).to.eql("Hello, Matt")
})
