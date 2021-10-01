let cityUrl = "./json/stad.json";
let countryUrl = "./json/land.json";

fetchData = async(url) => {
    const response = await fetch(url);
    const data = response.json();
    return data;
}

customCreateElement = (tag, parent) => {
    const element = document.createElement(tag);
    parent.appendChild(element);
    return element;
}

createHtmlList = async(cityUrl, countryUrl) => {
    const cityData = await fetchData(cityUrl);
    const countryData = await fetchData(countryUrl);

    cityData.sort((a, b) => b.population - a.population);

    let countryUlElement = customCreateElement("ul", document.getElementsByTagName("body")[0]);

    countryData.forEach(country => {
        let liElement = customCreateElement("li", countryUlElement);
        liElement.innerText = country.countryname + "\nID:" + country.id;
        let cityUlElement = customCreateElement("ul", liElement);

        
        cityData.forEach(city => {
            if(city.countryid === country.id) {
                console.log(city.stadname);
                liElement = customCreateElement("li", cityUlElement);
                liElement.innerText = city.stadname + 
                "\nPopulation: " + city.population +
                "\nID: " + city.id +
                "\nCountry ID: " + city.countryid + "\n\n";
            }
        });
    });
}

createHtmlList(cityUrl, countryUrl);