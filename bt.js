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



driver.wait(1000);
driver.quit();
