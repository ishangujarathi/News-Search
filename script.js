const Apikey = 'ebcb48b1257e4ebfade7e71c7d41e6e4';

const BlogContainer = document.getElementById("blog-container");

const SearchField = document.getElementById("search-input");

const SearchButton = document.getElementById("search-button");


async function getRandomNews(){
    try{
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${Apikey}`
        const response = await fetch(apiURL)
        const data = await response.json()
        return data.articles;
    }
    catch(error){
        console.error("Error Fetching News", error)
        return []
    }
}

SearchButton.addEventListener("click", async ()=>{
    const query = SearchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }
        catch(error){
            console.log("Error fetching news by query", error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${Apikey}`
        const response = await fetch(apiURL)
        const data = await response.json()
        return data.articles;
    }
    catch(error){
        console.error("Error Fetching News", error)
        return []
    }
}

function displayBlogs(articles){
    BlogContainer.innerHTML = ""
    articles.forEach((article)=>{
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const Truncatedtitle = article.title.length > 30? article.title.slice(0,30) + "...." : article.title;
        title.textContent = Truncatedtitle;

        const description = document.createElement("p");
        const Truncateddescription = article.description.length > 120? article.description.slice(0,120) + "...." : article.description;
        description.textContent = Truncateddescription;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click',()=>{
            window.open(article.url, "_blank");
        })
        BlogContainer.appendChild(blogcard);

    })
}


(async()=>{
    try{
        const articles = await getRandomNews()
        displayBlogs(articles);
    }
    catch(error)
    {
        console.error("Error Fetching News", error)
    }
})()
