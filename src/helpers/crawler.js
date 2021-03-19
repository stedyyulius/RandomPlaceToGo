import imagesScraper from 'images-scraper';

const crawl = async () => {
	const google = new imagesScraper({
		puppeteer: {
		  headless: false,
		},
	  });

	  console.log('a')

	  const result = await google.scrape('banana', 200);

	  
	  console.log(result);	
	  console.log('tolol')  
}


export default crawl;