var config = require('./config.json');

var username = config.username;
var password = config.password;

var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();


driver.get('https://beartracks.ualberta.ca');
driver.findElement(By.xpath('//*[@id="button" and contains(@src, "ZSS_singlesignon_button.gif")]')).click();
driver.wait(until.titleIs('Campus Computing ID Login'), 1000);

driver.findElement(By.xpath('//*[@id="query"]/table/tbody/tr[1]/td[2]/input')).sendKeys(username);
driver.findElement(By.xpath('//*[@id="query"]/table/tbody/tr[2]/td[2]/input')).sendKeys(password);
driver.findElement(By.xpath('//*[@id="query"]/table/tbody/tr[3]/td[2]/input')).click();

driver.wait(until.titleIs("Bear Tracks"), 15000);
var schedule_builder = '/html/body/table/tbody/tr/td/table/tbody/tr[9]/td/table/tbody/tr/td[5]/a'
var nav = driver.findElement(By.xpath('//*[@id="SubFrame"]/frame[1]'));
var content = driver.findElement(By.xpath('//*[@id="SubFrame"]/frame[2]'));
driver.switchTo().frame(nav);
driver.findElement(By.xpath(schedule_builder)).click();
content = driver.findElement(By.xpath('//*[@id="SubFrame"]/frame[2]'));
driver.switchTo().frame(content);
driver.wait(until.elementLocated(By.xpath('//*[@id="SSR_DUMMY_RECV1$sels$0$$0"]')));
driver.findElement(By.xpath('//*[@id="SSR_DUMMY_RECV1$sels$0$$0"]')).click();
driver.findElement(By.xpath('//*[@id="DERIVED_SSS_SCT_SSR_PB_GO$span"]')).click();

driver.wait(until.elementLocated(By.xpath('//*[@id="P_SELECT$0"]'))).then( function(f){
  // var elements = driver.findElements(By.xpath('//*[starts-with(@id, "P_SELECT$")]'));
  var elements = driver.findElements(By.xpath('//*[@type="checkbox"]'));
  elements.then(function(e){
    e.forEach(function(elem){
      if (elem.isDisplayed()){
        elem.click();
      }
    })
    driver.findElement(By.xpath('//*[@id="win0divDERIVED_REGFRM1_LINK_ADD_ENRL"]')).click();
  })
}
);

driver.wait(until.elementLocated(By.xpath('//*[@id="win0divDERIVED_REGFRM1_SSR_PB_SUBMIT"]')))
  .then(function(elem){
    elem.click();
  });

driver.quit();
