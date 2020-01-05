// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // chrome.declarativeContent.onPageChanged.addRules([{
//     //   conditions: [
//     //       new chrome.declarativeContent.PageStateMatcher({
//     //       pageUrl: {hostEquals: 'developer.chrome.com'},
//     //     })
//     //   ],
//     //   actions: [new chrome.declarativeContent.ShowPageAction()]
//     // }]);
//   });
// });

let onColor = 'green';
let offColor = 'red';
let onText = 'on';
let offText = 'off';

chrome.browserAction.setBadgeText({text:'off'});
chrome.browserAction.setBadgeBackgroundColor({
  color: "red"
});

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
  chrome.tabs.executeScript(tab.id, {
    "file": "inject.js"
  }, function () { // Execute your code
      console.log("initiation Script Executed .. "); // Notification on Completion
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    setBadge(request.on, sender.tab);
  }
);

function setBadge(on, tab) {
  if (on) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: onColor,
      tabId: tab.id
    });
    chrome.browserAction.setBadgeText({
      text: onText,
      tabId: tab.id
    });
  } else {
    chrome.browserAction.setBadgeBackgroundColor({
      color: offColor,
      tabId: tab.id
    });
    chrome.browserAction.setBadgeText({
      text: offText,
      tabId: tab.id
    });
  } 
}
