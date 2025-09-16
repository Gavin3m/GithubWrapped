async function getGitHubUserId(username) {
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`User not found: ${response.status}`);
    }

    const data = await response.json();
    return [data.name, data.id, data.html_url, data.avatar_url, data.company, data.public_repos, data.followers, data.following, data.created_at]

  } catch (error) {
    console.error('Error fetching user ID:', error.message);
    return null;
  }
}

function gen_company_statement(string){
    if(string === null){
        return "A company would be lucky to have you\n";
    }
    else{return `Working for ${string}? Quite the achievement\n`}
}

function gen_repos_statement(number){
    if (number < 3) {
      return `Only ${number} repositories? Start getting your code out there!\n`;
    } 
    else if (number < 6) {
      return `It takes time to make ${number} repositories, keep it up!\n`;
    } 
    else {
      return `${number} REPOSITORIES!!! The FOSS community thanks you for your service!\n`;
    }
}


function gen_fans_statement(number){
    if (number < 3) {
      return `${number} fans... a niche micro-celebrity!!\n`;
    } 
    else if (number < 100) {
      return `A whole ${number} fans. You are so popular!!\n`;
    } 
    else {
      return `${number} FANS!!! You're paving the way for junior devs!\n`;
    }
}

function gen_stans_statement(number){
    if (number < 5) {
      return `You follow ${number} people. A great start to github society!\n`;
    } 
    else if (number < 100) {
      return `You follow ${number} people. Make sure to learn from their code!\n`;
    } 
    else {
      return `YOU FOLLOW ${number} PEOPLE!!! I have never seen such a social butterfly!\n`;
    }
}

function gen_created_statement(string){
  var splitted = string.split("-");
  var year = splitted[0];
  if (2022 < year) {
    return `You've been GitHubbin since ${year}. Keep it up!\n`;
  }
  else if (2020 <= year) {
    return `Even a pandemic couldn't keep you from code. Contributing since ${year}!\n`;
  } 
  else if (2018 <= year) {
    return `You were already pushing code before the world paused. Contributing since ${year}!\n`;
  } 
  else if (2015 <= year) {
    return `You've seen frameworks rise and fall. Contributing since ${year}!\n`;
  } 
  else if (2013 <= year) {
    return `You were pushing code before Swift had its first "Hello, World!". Contributing since ${year}!\n`;
  } 
  else if (2011 <= year) {
    return `TypeScript wasn't even born yet—and you were already coding like a pro. Contributing since ${year}!\n`;
  } 
  else if (2009 <= year) {
    return `You were coding before Rust was learning to keep your memory safer. How does it feel to be a part of club ${year}?!\n`;
  } 
  else if (2006 <= year) {
    return `Talk about an early adopter. How does it feel to be a part of club ${year}?!\n`;
  } 
  else {
    return `You joined the fun in ${year}. Welcome to the community!\n`;
  }
}


const inputField = document.getElementById('myInput');
const scrape = document.getElementById('scraper');
const all_query = document.getElementById('fetch-all');
const newSearch = document.getElementById('newSearch');
const outputDiv = document.getElementById('output');

var current_setter = false;

all_query.addEventListener('click', _ => {
    var value = (current_setter) ? false : true
    document.getElementById("fetch-name").checked = value;
    document.getElementById("fetch-id").checked = value;
    document.getElementById("fetch-html").checked = value;
    document.getElementById("fetch-company").checked = value;
    document.getElementById("fetch-repos").checked = value;
    document.getElementById("fetch-fans").checked = value;
    document.getElementById("fetch-stans").checked = value;
    document.getElementById("fetch-created_at").checked = value;
    current_setter = value;
  }
)

newSearch.addEventListener('click', _ => {
  document.getElementById("card").style.display = "none"
  document.getElementById("employmentStatus").style.display = "none";
  document.getElementById("repoStatus").style.display = "none";
  document.getElementById("fansStatus").style.display = "none";
  document.getElementById("stansStatus").style.display = "none";
  document.getElementById("creationStatus").style.display = "none";
  document.getElementById("dataCollector").style.display = "block";
  document.getElementById("cardTitle").href = "";
})

scrape.addEventListener('click', async () => {
    const input = inputField.value;
    document.getElementById("myInput").value = ""
    var fetchName = document.querySelector('#fetch-name:checked')?.value;
    var fetchID = document.querySelector('#fetch-id:checked')?.value; 
    var fetchLink = document.querySelector('#fetch-html:checked')?.value;
    var fetchCompany = document.querySelector('#fetch-company:checked')?.value;
    var fetchRepos = document.querySelector('#fetch-repos:checked')?.value;
    var fetchFans = document.querySelector('#fetch-fans:checked')?.value;
    var fetchStans = document.querySelector('#fetch-stans:checked')?.value;
    var fetchCreation = document.querySelector('#fetch-created_at:checked')?.value;

    const [name, id, html_url, avatar_url, company, public_repos, followers, following, created_at] = await getGitHubUserId(input); 
    let output = "";
    let title = "";

    document.getElementById("pfp").src = avatar_url;
    if(fetchName){
      document.getElementById("cardTitle").textContent = name;
      title+=`${name}`;
    }
    if(fetchName && fetchID){title+=" - "}
    if(fetchID){
      title+=`${id}`;
      document.getElementById("cardTitle").textContent = title;
    }
    if(fetchLink){
      document.getElementById("cardTitle").href = html_url;
    }
    if(fetchCompany){
      document.getElementById("employmentStatus").textContent = gen_company_statement(company);
      document.getElementById("employmentStatus").style.display = "block";
    }
    if(fetchRepos){
      document.getElementById("repoStatus").textContent = gen_repos_statement(public_repos);
      document.getElementById("repoStatus").style.display = "block";
    }
    if(fetchFans){
      document.getElementById("fansStatus").textContent = gen_fans_statement(followers);
      document.getElementById("fansStatus").style.display = "block";
    }
    if(fetchStans){
      document.getElementById("stansStatus").textContent = gen_stans_statement(following);
      document.getElementById("stansStatus").style.display = "block";
    }
    if(fetchCreation){
      document.getElementById("creationStatus").textContent = gen_created_statement(created_at);
      document.getElementById("creationStatus").style.display = "block";
    }

    document.getElementById("dataCollector").style.display = "none"
    document.getElementById("card").style.display = "block"
});