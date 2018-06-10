const angular = require('angular')
const fs = require('fs')
const { expect } = require('chai')
const { Before, After, When, Then } = require('cucumber')

const path = require('path')
const absoluteIndexPath = indexPath =>
  path.join(process.cwd(), indexPath)

const relativeIndexPath = indexPath =>
  path.relative(
    require.resolve('cucumber-electron'),
    absoluteIndexPath(indexPath)
  )

const openApp = async (indexPath) => 
  new Promise(resolve => {
    const frame = document.createElement('iframe')
    frame.onload = () => {
      resolve(frame)
    }
    frame.src = relativeIndexPath(indexPath)
    console.log(frame.src)
    document.body.appendChild(frame)
  })

Before(async () => {
  this.frame = await openApp("./index.html") 
  this.app = this.frame.contentWindow
})

After(() => {
  document.body.removeChild(this.frame)
})

When(/I open the app/, async () => {
})

Then(/I should see "Hello, Matt"/, () => {
  console.log(this.app.angular)
  expect(this.app.document.querySelector('h2').textContent).to.eql("Hello, Matt")
})
