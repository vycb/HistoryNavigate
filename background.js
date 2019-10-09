function setUpMenu(){
	let today = new Date(),
			pastYear = today.getFullYear() - 1,
			sdate = new Date(pastYear+"-01-01"),
			searching = browser.history.search({
		text: "",
		startTime: sdate.toISOString()
		,maxResults: 125
	})

	function listVisits(historyItems){
		browser.menus.removeAll() //{{{
		let i=0
		for (let item of historyItems) {
			let url = new URL(item.url),
				itemTitle = item.title? item.title: item.url;

			if(itemTitle.length >71 ){
				try{
					const beg = itemTitle.slice(0, 32)
					const end = itemTitle.slice(-35)
					itemTitle = beg+'...'+end
				}catch(err){
					console.log(`itemTitle: ${error}`)
				}
			}
	
			browser.menus.create({ id: "historynavigate-" + i++, title: itemTitle, contexts: ["all"], enabled: true, onclick: (info, tab)=>{
				const querying = browser.tabs.query({currentWindow: true, active: true})
				querying.then(tabs=>{
					browser.tabs.update(tabs[0].id, {
						active: true,
						url: item.url
					})
					//console.log(`url: ${item.url}`)
				}, error=>{	console.log(`querying: ${error}`) })
			}
			, icons: {16: url.origin+"/favicon.ico"} })
		}
	} //}}}

	searching.then(listVisits)

}

browser.webNavigation.onCompleted.addListener( /* page loaded */
	setUpMenu
)

browser.tabs.onUpdated.addListener( /* URL updated */
	setUpMenu
)


browser.tabs.onActivated.addListener( /* tab selected */
	setUpMenu
)

