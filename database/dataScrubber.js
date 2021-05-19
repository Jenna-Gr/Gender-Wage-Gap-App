const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const schema = require('./schema.js');

async function run(company, gender) {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  // page.on('console', consoleObj => console.log(consoleObj.text()));

  await page.goto(`https://www.levels.fyi/company/${company}/salaries/Software-Engineer/`);

  // dom element selectors
  const BUTTON_SELECTOR = 'body > div.container.company-info-full-container > div > div.col-12.col-lg-10.company-header-col.about-company-header > div > div.compensation-table-levelbase.mb-4 > div.row.salaries-header > div.smallerSidePadding-md.col-7 > div.form-group.search-bar-container > div > span > button';
  const FILTER_GENDER_SELECTOR = gender === 'female' ? '#genderFemaleRadioOption' : (gender === 'male' ? '#genderMaleRadioOption' : '#genderOtherRadioOption');
  // const FILTER_female_SELECTOR = '#genderFemaleRadioOption';
  // const FILTER_male_SELECTOR = '#genderMaleRadioOption';
  // const FILTER_other_SELECTOR = '#genderOtherRadioOption';
  const NEXT_PAGE_SELECTOR = 'body > div.container.company-info-full-container > div > div.col-12.col-lg-10.company-header-col.about-company-header > div > div.compensation-table-levelbase.mb-4 > div.spreadsheet > div > div > div.bootstrap-table.bootstrap4 > div.fixed-table-pagination > div.float-right.pagination > ul > li.page-item.page-next';

  await page.click(BUTTON_SELECTOR);
  await page.click(FILTER_GENDER_SELECTOR);
  await page.click(BUTTON_SELECTOR);
  await page.waitForTimeout(2000);

  const LIST_COMPANY_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.vcenter.text-left.otherWidth > span';
  const LIST_LOCATION_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.vcenter.text-left.otherWidth > p > span';
  const LIST_YOE_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.text-left.otherWidth.d-none.d-md-table-cell > span';
  const LIST_COMPENSATION_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.text-right.otherWidth > div > div > span';

  const numUsers = await getNumUsers(page);
  const numLeftUsers = numUsers <= 10 ? numUsers : numUsers % 10;
  const numPages = Math.ceil(numUsers / 10);
  // console.log('numUsers:', numUsers);
  // console.log('numLeftUsers:', numLeftUsers);
  // console.log('numPages:', numPages);

  if (numPages > 1) {
    for (let h = 1; h <= numPages -1; h++) {
      // console.log(`Page ${h} of ${numPages}`);
      for (let i = 1; i <= 10; i++) {
        // change the index to the next child
        let locationSelector = LIST_LOCATION_SELECTOR.replace("INDEX", i);
        let yoeSelector = LIST_YOE_SELECTOR.replace("INDEX", i);
        let compensationSelector = LIST_COMPENSATION_SELECTOR.replace("INDEX", i);

        let location = await page.evaluate((sel) => {
          let element = document.querySelector(sel).innerHTML;
          let cutBefore = element.indexOf('|') -1;
          return element.slice(0, cutBefore);
        }, locationSelector);

        let yoe = await page.evaluate((sel) => {
          let element = document.querySelector(sel).innerHTML;
          let cutAfter = element.indexOf('/') + 2;
          return element.slice(cutAfter);
        }, yoeSelector);

        let compensation = await page.evaluate((sel) => {
          let element = document.querySelector(sel).innerText;
          var num = element.slice(1);
          return parseInt(num.replace(',', ''));
        }, compensationSelector);

        console.log(`Company: ${company}, Gender: ${gender}, Location: ${location}, Years of Experience: ${yoe}, Compensation: $${compensation}`);

        schema.upsertUser({
          company: company,
          gender: gender,
          location: location,
          yoe: parseInt(yoe),
          compensation: compensation
        });

      }
      await page.click(NEXT_PAGE_SELECTOR);
      await page.waitForTimeout(2000);
    }
    // console.log(`Page ${numPages} of ${numPages}`);
    for (let i = 1; i <= numLeftUsers; i++) {
      // change the index to the next child
      let locationSelector = LIST_LOCATION_SELECTOR.replace("INDEX", i);
      let yoeSelector = LIST_YOE_SELECTOR.replace("INDEX", i);
      let compensationSelector = LIST_COMPENSATION_SELECTOR.replace("INDEX", i);

      let location = await page.evaluate((sel) => {
        let element = document.querySelector(sel).innerHTML;
        let cutBefore = element.indexOf('|') -1;
        return element.slice(0, cutBefore);
      }, locationSelector);

      let yoe = await page.evaluate((sel) => {
        let element = document.querySelector(sel).innerHTML;
        let cutAfter = element.indexOf('/') + 2;
        return element.slice(cutAfter);
      }, yoeSelector);

      let compensation = await page.evaluate((sel) => {
        let element = document.querySelector(sel).innerText;
        var num = element.slice(1);
        return parseInt(num.replace(',', ''));
      }, compensationSelector);

      console.log(`Company: ${company}, Gender: ${gender}, Location: ${location}, Years of Experience: ${yoe}, Compensation: $${compensation}`);

      schema.upsertUser({
          company: company,
          gender: gender,
          location: location,
          yoe: parseInt(yoe),
          compensation: compensation
        });
    }

  } else {
    for (let i = 1; i <= numLeftUsers; i++) {
      // change the index to the next child
      let locationSelector = LIST_LOCATION_SELECTOR.replace("INDEX", i);
      let yoeSelector = LIST_YOE_SELECTOR.replace("INDEX", i);
      let compensationSelector = LIST_COMPENSATION_SELECTOR.replace("INDEX", i);

      let location = await page.evaluate((sel) => {
        let element = document.querySelector(sel).innerHTML;
        let cutBefore = element.indexOf('|') -1;
        return element.slice(0, cutBefore);
      }, locationSelector);

      let yoe = await page.evaluate((sel) => {
        let element = document.querySelector(sel).innerHTML;
        let cutAfter = element.indexOf('/') + 2;
        return element.slice(cutAfter);
      }, yoeSelector);

      let compensation = await page.evaluate((sel) => {
        let element = document.querySelector(sel).innerText;
        var num = element.slice(1);
        return parseInt(num.replace(',', ''));
      }, compensationSelector);

      console.log(`Company: ${company}, Gender: ${gender}, Location: ${location}, Years of Experience: ${yoe}, Compensation: $${compensation}`);

      schema.upsertUser({
          company: company,
          gender: gender,
          location: location,
          yoe: parseInt(yoe),
          compensation: compensation
        });
    }
  }

  browser.close();
}

async function getNumUsers(page) {
  let inner = await page.evaluate(() => {
    let html = document.getElementsByClassName("pagination-info")[0].innerText;

    // format is: "Showing 1 to 10 of 34 rows"
    if (html.length <= 24) {
      return html.slice(17).replace(' rows', '').trim();
    } else {
      return html.slice(19).replace(' rows', '').trim();
    }
  });
  // console.log('inner:', inner);

  const numRows = parseInt(inner);

  return numRows;
}

const companiesArr = ['Google', 'Amazon', 'Facebook', 'Apple', 'Microsoft', 'VMware', 'IBM', 'Tesla', 'Spotify', 'Adobe'];
const gendersArr = ['female', 'male', 'other'];

async function generateData(companies, genders) {
  for (var j = 0; j < companies.length; j++) {
    for (var k = 0; k < genders.length; k++) {
      await run(companies[j], genders[k]);
    }
  }
};

generateData(companiesArr, gendersArr);

// run('Dell', 'male');
