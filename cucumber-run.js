Cucumber.run = (fn) => {
  var eventBroadcaster = {
    emit: (name, data) => {
      // console.log(name, data)
    }
  }

  var testCases
  var gherkin = featureSource => {
    testCases = Cucumber.getTestCases({
      eventBroadcaster: eventBroadcaster,
      pickleFilter: new Cucumber.PickleFilter({}),
      source: featureSource,
      uri: '/feature'
    });
  }

  Cucumber.supportCodeLibraryBuilder.reset('');
  fn({ gherkin, When: Cucumber.When, Then: Cucumber.Then })
  var supportCodeLibrary = Cucumber.supportCodeLibraryBuilder.finalize();

  var runtime = new Cucumber.Runtime({
    eventBroadcaster: eventBroadcaster,
    options: {},
    testCases: testCases,
    supportCodeLibrary: supportCodeLibrary
  });

  runtime.start().then((success) => {
    console.log(`result: ${success ? 'pass!' : 'fail :('}`)
  })
}

