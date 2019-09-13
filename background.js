function setUpMenu(){
		var searching = browser.history.search({
			text: "",
			maxResults: 26
		})
		function listVisits(historyItems){
			let i=0
			for (let item of historyItems) {
				chrome.contextMenus.create({ id: "historycontextmenu-" + (i++), title: item.title, contexts: ["all"], enabled: true, onclick: ()=>{			
					let querying = browser.tabs.query({currentWindow: true, active: true})
					querying.then((tabs)=>{
							browser.tabs.update(tabs[0].id, {
								active: true,
								url: item.url
							})
							console.log(`url: ${item.url}`)
						}, (error)=>{	console.log(`Error: ${error}`) })
				} })
			}
		}
	chrome.contextMenus.removeAll()
	searching.then(listVisits)

}

chrome.webNavigation.onCompleted.addListener(  /* page loaded */
	setUpMenu
)

chrome.tabs.onUpdated.addListener(  /* URL updated */
	setUpMenu
)


chrome.tabs.onActivated.addListener(  /* tab selected */
	setUpMenu
)

