function setUpMenu(){
	var searching = browser.history.search({
		text: "",
		maxResults: 50
	})
	function listVisits(historyItems){
		chrome.contextMenus.removeAll()
		let i=0
		for (let item of historyItems) {
			let url = new URL(item.url)
			chrome.contextMenus.create({ id: "historynavigate-" + (i++), title: item.title, contexts: ["all"], enabled: true, onclick: ()=>{
				let querying = browser.tabs.query({currentWindow: true, active: true})
				querying.then((tabs)=>{
					browser.tabs.update(tabs[0].id, {
						active: true,
						url: item.url
					})
					//console.log(`url: ${item.url}`)
				}, (error)=>{	console.log(`Error: ${error}`) })
			}
			, icons: {16: url.origin+"/favicon.ico"} })
		}
	}
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

