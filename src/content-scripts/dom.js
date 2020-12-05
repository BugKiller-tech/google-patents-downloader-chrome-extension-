chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == 'getDOM')
    sendResponse({ dom: document.documentElement.outerHTML })
  else if (request.greeting == 'getPatents') {
    let patents = []
    let list = document.querySelectorAll('search-result-item')
    for (let i = 0; i<list.length; i++) {
      let item = list[i]
      console.log(item.querySelector('h3 #htmlContent').innerText)
      patents.push({
        title: item.querySelector('h3 #htmlContent').innerText
      })
    }
    sendResponse({ patents: patents })
  } else
    sendResponse({})
})