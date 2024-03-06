'use strict';


const { Eyes, 
  ClassicRunner,
  VisualGridRunner, 
  RunnerOptions,
  Target, 
  Configuration, 
  BatchInfo,
  BrowserType } = require('@applitools/eyes-webdriverio');

describe('ignore heroku wdio', function () {
  const USE_ULTRAFAST_GRID = false;

  var applitoolsApiKey;

  let batch;
  let config;
  let runner;
  let eyes;


  before(async () => {
    applitoolsApiKey = process.env.APPLITOOLS_API_KEY;

    if (USE_ULTRAFAST_GRID) {
      runner = new VisualGridRunner(new RunnerOptions().testConcurrency(5));
    }
    else {
      // Create the classic runner.
      runner = new ClassicRunner();
    }
    batch = new BatchInfo(`Classic runner heroku wdio ignore`);

    // Create a configuration for Applitools Eyes.
    config = new Configuration();
    config.setApiKey(applitoolsApiKey);

    config.setBatch(batch);

    config.addBrowser(1920, 1080, BrowserType.CHROME);
    config.addBrowser(1920, 1080, BrowserType.SAFARI);

  });
  
  
  beforeEach(async function () {
    eyes = new Eyes(runner);
    eyes.setConfiguration(config);


    browser = await eyes.open(
      browser,
      'ignore wdio heroku',
      this.currentTest.fullTitle()
    );
  });
  
  it('should ignore region in heroku', async () => {

    await driver.url('http://the-internet.herokuapp.com/login');
    await eyes.check('Login Window', Target.window().fully().ignore('.radius'));
  });
  
  afterEach(async () => {
    await eyes.closeAsync();
    await browser.closeWindow();
  });
  
  after(async () => {
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
  
});
