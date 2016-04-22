/**
MIT License

Copyright (c) 2016 John Slevinsky.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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

driver.wait(until.elementLocated(By.xpath('//*[@id="win0divDERIVED_REGFRM1_SSR_PB_SUBMIT"]')), 15000)
  .then(function(elem){
    elem.click();
  });

driver.wait(until.elementLocated(By.xpath('//*[@id="win0divDERIVED_REGFRM1_SSR_LINK_STARTOVER"]')), 15000)
  .then(function(e){
    e.click();
  }
);
driver.quit();
