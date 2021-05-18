const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://www.levels.fyi/company/VMware/salaries/Software-Engineer/');

  // dom element selectors
  const BUTTON_SELECTOR = 'body > div.container.company-info-full-container > div > div.col-12.col-lg-10.company-header-col.about-company-header > div > div.compensation-table-levelbase.mb-4 > div.row.salaries-header > div.smallerSidePadding-md.col-7 > div.form-group.search-bar-container > div > span > button';
  const FILTER_FEMALE_SELECTOR = '#genderFemaleRadioOption';

  await page.click(BUTTON_SELECTOR);
  await page.click(FILTER_FEMALE_SELECTOR);
  await page.click(BUTTON_SELECTOR);
  await page.waitFor(6000);

  // const LIST_COMPANY_SELECTOR = '#compTable > tbody > tr:nth-child(1) > td.vcenter.text-left.otherWidth > span';
  const LIST_COMPANY_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.vcenter.text-left.otherWidth > span';
  // const LIST_LOCATION_SELECTOR = '#compTable > tbody > tr:nth-child(1) > td.vcenter.text-left.otherWidth > p > span';
  const LIST_LOCATION_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.vcenter.text-left.otherWidth > p > span';
  // const YOE_SELECTOR = '#compTable > tbody > tr:nth-child(1) > td.text-left.otherWidth.d-none.d-md-table-cell > span';
  const LIST_YOE_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.text-left.otherWidth.d-none.d-md-table-cell > span';
  // const COMPENSATION_SELECTOR = '#compTable > tbody > tr:nth-child(1) > td.text-right.otherWidth > div > div > span';
  const LIST_COMPENSATION_SELECTOR = '#compTable > tbody > tr:nth-child(INDEX) > td.text-right.otherWidth > div > div > span';

  // const LENGTH_SELECTOR_CLASS = 'user-list-item';

  // const numPages = await getNumPages(page);

  // console.log('Numpages: ', numPages);

  for (let i = 1; i <= 10; i++) {
    // change the index to the next child
    let companySelector = LIST_COMPANY_SELECTOR.replace("INDEX", i);
    let locationSelector = LIST_LOCATION_SELECTOR.replace("INDEX", i);
    let yoeSelector = LIST_YOE_SELECTOR.replace("INDEX", i);
    let compensationSelector = LIST_COMPENSATION_SELECTOR.replace("INDEX", i);

    let company = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element.innerHTML;
    }, companySelector);

    let location = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element.innerHTML;
    }, locationSelector);

    let yoe = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element.innerHTML;
    }, yoeSelector);

    let compensation = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element.innerText;
    }, compensationSelector);

    console.log(`Company: ${company}, Location: ${location}, Years of Experience: ${yoe}, Compensation: ${compensation}`);

    // TODO save this user
  }

  // for (let h = 1; h <= numPages; h++) {
  //   let pageUrl = searchUrl + '&p=' + h;
  //   await page.goto(pageUrl);

  //   let listLength = await page.evaluate((sel) => {
  //     return document.getElementsByClassName(sel).length;
  //   }, LENGTH_SELECTOR_CLASS);

  //   for (let i = 0; i <= listLength; i++) {
  //     // change the index to the next child
  //     let companySelector = LIST_COMPANY_SELECTOR.replace("INDEX", i);
  //     let locationSelector = LIST_LOCATION_SELECTOR.replace("INDEX", i);
  //     let yoeSelector = LIST_YOE_SELECTOR.replace("INDEX", i);
  //     let compensationSelector = LIST_COMPENSATION_SELECTOR.replace("INDEX", i);

  //     let  = await page.evaluate((sel) => {
  //       return document.querySelector(sel).getAttribute('href').replace('/', '');
  //     }, usernameSelector);

  //     let email = await page.evaluate((sel) => {
  //       let element = document.querySelector(sel);
  //       return element ? element.innerHTML : null;
  //     }, emailSelector);

  //     // not all users have emails visible
  //     if (!email)
  //       continue;

  //     console.log(username, ' -> ', email);

  //     // upsertUser({
  //     //   username: username,
  //     //   email: email,
  //     //   dateCrawled: new Date()
  //     // });
  //   }
  // }

  // browser.close();
}

async function getNumPages(page) {
  const NUM_USER_SELECTOR = '#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > div.d-flex.flex-column.flex-md-row.flex-justify-between.border-bottom.pb-3.position-relative > h3';
  let inner = await page.evaluate((sel) => {
    let html = document.querySelector(sel).innerHTML;

    // format is: "69,803 users"
    return html.replace(',', '').replace('users', '').trim();
  }, NUM_USER_SELECTOR);

  const numUsers = parseInt(inner);

  console.log('numUsers: ', numUsers);

  /**
   * GitHub shows 10 resuls per page, so
   */
  return Math.ceil(numUsers / 10);
}

// function upsertUser(userObj) {
//   const DB_URL = 'mongodb://localhost/thal';

//   if (mongoose.connection.readyState == 0) {
//     mongoose.connect(DB_URL);
//   }

//   // if this email exists, update the entry, don't insert
//   const conditions = { email: userObj.email };
//   const options = { upsert: true, new: true, setDefaultsOnInsert: true };

//   User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
//     if (err) {
//       throw err;
//     }
//   });
// }


run();