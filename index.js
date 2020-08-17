const puppeteer = require('puppeteer')

// Account credential
const BNIAccount = {
  username: 'ABCxxxxx', // your username
  password: '*********' // your password
}

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()

  // Goto Main Website
  await page.goto('https://ibank.bni.co.id/MBAWeb/FMB')
  await page.setViewport({ width: 1536, height: 731 })

  // Click Login Button
  await page.waitForSelector('#RetailUser_table #RetailUser')
  await page.click('#RetailUser_table #RetailUser')
  await navigationPromise

  // Click `Username` Text Input & Typing Credential
  await page.waitForSelector('#s1_table #CorpId')
  await page.click('#s1_table #CorpId')
  await page.type('#s1_table #CorpId', BNIAccount.username)

  // Click `Password` Text Input & Typing Credential
  await page.waitForSelector('#s1_table #PassWord')
  await page.click('#s1_table #PassWord')
  await page.type('#s1_table #PassWord', BNIAccount.password)

  // Submit Login
  await page.keyboard.press('Enter')
  await navigationPromise

  // Click `Header` Button
  await page.waitForSelector('#Header_table #dashBoard')
  await page.click('#Header_table #dashBoard')
  await navigationPromise
  
  // Get Saldo Value
  const saldoValue = await page.$eval('#DashboardDisplayTable #db_acc2', el => el.textContent)
  console.log(`Saldo anda : ${saldoValue}`)

  // Click `Logout` Button
  await page.waitForSelector('#Header_table #LogOut')
  await page.click('#Header_table #LogOut')
  await navigationPromise

  // Agree for Logout
  await page.waitForSelector('#Combo1_table #\__LOGOUT__')
  await page.click('#Combo1_table #\__LOGOUT__')
  await navigationPromise

  // Close Browser
  await browser.close()
})()