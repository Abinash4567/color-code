let color = 'white';

chrome.runtime.onInstalled.addListener(() => 
{
    chrome.storage.sync.set({ color });
});