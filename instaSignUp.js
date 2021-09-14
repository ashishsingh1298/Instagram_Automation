// https://temp-sms.org/
const { getMaxListeners } = require("process");
let puppeteer = require("puppeteer");
const { start } = require("repl");
let startTime = Date.now();
function processeSingleInstagram(userName,getPassword,instaTargetId){
    
    let browserStractPromise = puppeteer.launch({
        headless :false,
        defaultViewport:null,
        args: ["--start-maximized", "--disable-notifications"]
    });    
let page;
browserStractPromise
    .then(function(browerObj){
        console.log("browser opened",Date.now() - startTime);
        browser = browerObj;
        let i = 0;                  
        function myLoop() {         
        setTimeout(function() { 
        browser.close();
        console.log("This operation is closed by browser.close function",Date.now() - startTime);
        i++;                   
        if (i < 1) {           
        myLoop();              
        }                      
        }, 150000 + instaTargetId.length * 41000)
        }
        myLoop();
        let browserTabOpenpromise = browerObj.newPage();
        return browserTabOpenpromise;
    }).then(function(newTab){
        page = newTab;
        console.log("insta New tab opened",Date.now() - startTime);
        let GooglePageOpen = newTab.goto("https://www.instagram.com/");
        return GooglePageOpen;
    })
    .then(function(){
        let waitForEleSelector = page.waitForSelector('input[aria-label="Phone number, username, or email"]',{visible : true});
        return waitForEleSelector;
    }).catch(function (err){
        console.log("ERROR____________________Selector input email, password  => ",Date.now() - startTime);
    }).then(function(){
        let waitForTypingEmail = page.type('input[aria-label="Phone number, username, or email"]',userName,{delay: 350});
        return waitForTypingEmail;
    }).then(function(){
        let waitForTypingPassword = page.type('input[aria-label="Password"]',getPassword,{delay: 350});
        return waitForTypingPassword;
    }).then(function(){
        let waitForPage = page.waitForSelector('.sqdOP.L3NKy.y3zKF',{visible : true});
        return waitForPage;
    }).catch(function (err){
        console.log("ERROR____________________ waiting for login button selector  => ",Date.now() - startTime);
    }).then(function(){
        // delay for 2 sec
        let future10secondAfter = Date.now() + 20000;
        while (Date.now() < future10secondAfter) {
        }
        let elemClickPromise = page.click('.sqdOP.L3NKy.y3zKF');
        return elemClickPromise;
    }).then(function(){
        let waitForPage = page.waitForSelector('.cmbtv',{visible : true});
        return waitForPage;
    }).catch(function (err){
        console.log("ERROR____________________ insta home page selector  => ",Date.now() - startTime);
    }).then(function(){
        // delay for 2 sec
        let future10secondAfter = Date.now() + 5000;
        while (Date.now() < future10secondAfter) {
        }
        let elemClickPromise = page.click('.cmbtv');
        return elemClickPromise;
    }).then(function (){
        // loop
        let i = 0;
        function myLoop() {
        setTimeout(function() {
            console.log("working on this insta id --------",instaTargetId[i],Date.now() - startTime);
            customPromise('input[placeholder="Search"]', page,instaTargetId[i],Date.now() - startTime);
            i++;           
            if (i < instaTargetId.length) {       
            myLoop();             
            }
            else if(i == instaTargetId.length){
                console.log("Now the time is to log out",Date.now() - startTime);
                customPromiseHandleLogOut('.XrOey',page);
            }                      
        },40000)
        }
        myLoop();
    }).catch(function(err){
        console.log("ERROR____________________This err at last=> ",Date.now() - startTime);
    });
}
function myWaitAndClick(selector, cPage){
    return new Promise ( function (resole, reject){
        let waitForModalPromise = cPage.waitForSelector(selector,{visible:true});
        waitForModalPromise.then(function (){
            let clickModal = cPage.click(selector,{delay:100});
            return clickModal;
        }).then(function(){
            resole();
        }).catch(function(){
            reject();
        })
    })
}

// promise if banner is not present
function handelIfNotPresent(selector,cPage){
    return new Promise(function (resolve, reject){
        // wait click modal
        let waitAndClickPromise = myWaitAndClick(selector,cPage);
        waitAndClickPromise.then(function(){
            resolve();
        }).catch(function(){
            resolve();
        })
    })
}

// custom function for repeatative calls of follow
function customPromise(selector, cPage, followID){
    return new Promise(function (resolve,reject){
        // wait for click
        let waitForInputSelector = cPage.waitForSelector(selector,{visible:true});
        waitForInputSelector.then(function (){
            let clickInput = cPage.click(selector,{delay:100});
            return clickInput;
        }).then(function(){
            let typingItem = cPage.keyboard.type(followID,{delay:300});
            return typingItem;
        }).then(function (){
            let future5secondAfter = Date.now() + 10000;
            while (Date.now() < future5secondAfter) {
            }
            cPage.keyboard.press('ArrowDown',{ delay: 100 });
            let keyBoardDown = cPage.keyboard.press('Enter');
            return keyBoardDown;
        }).then(function (){
            let future18secondAfter = Date.now() + 12000;
            while (Date.now() < future18secondAfter) {
            }
            console.log("clicking on follow",Date.now() - startTime);
            let waitForEleSelector = handelIfNotPresent('div[style="height: 30px;"]',cPage);
            return waitForEleSelector; 
        }).then(function(){
            let future29secondAfter = Date.now() + 10000;
            while (Date.now() < future29secondAfter) {
            }
            console.log("Successfully clicked on follow button",Date.now() - startTime);
            return future29secondAfter;
            // Ending of follow button
        }).then(function(){
            resolve();
        }).catch(function (){
            resolve();
            console.log("Error occurs in Follow loop function kindly check selector----------------------",Date.now() - startTime);
        })
    })
}

// custom function for logOut
function customPromiseHandleLogOut(selector,cPage){
    return new Promise(function (resolve,reject){
        // wait for click
        let waitForLoginSelector = cPage.waitForSelector(selector,{visible : true});
        waitForLoginSelector.then(function(){
            let allElem = cPage.$$(selector);
            return allElem;
        }).then(function (allElem){
            console.log("Logout options--",Date.now() - startTime);
            let elementClick = allElem[4].click({ delay: 100});
            return elementClick;
        }).then(function(){
            console.log("Selecting Select logout button selector",Date.now() - startTime);
            let future2secondAfter = Date.now() + 20000;
            while (Date.now() < future2secondAfter) {
            }
            let waitForLevel2promise = cPage.waitForSelector('div[style="height: 28px; width: 170px;"]',{visible:true});
            console.log("waiting for logout button",Date.now() - startTime);
            return waitForLevel2promise;
        }).then(function () {
            // page element -> cheerio 
            let allLisPromise2 = cPage.$$('div[style="height: 28px; width: 170px;"]');
            return allLisPromise2;
        }).then(function (allElem){
            console.log("Logout options clicked",Date.now() - startTime);
            let elementClick = allElem[4].click({ delay: 100});
            console.log("Successfully clicked on logout button",Date.now() - startTime);
            return elementClick;
        }).then(function (){
            resolve();
        }).catch(function (){
            resolve();
            console.log("Failed to click on logout button--------------------------------------",Date.now() - startTime);
        })
    })
}
module.exports = {
    isf: processeSingleInstagram
}

