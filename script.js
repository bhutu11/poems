const correctPassword = "poetry123"; // Change this to your password

const poems = [
  {
    title: "The Sun's Warm Hug",
    text: `Golden rays gently touch the earth,\nWhispering tales of dawn's rebirth.\nIn every beam, a warm embrace,\nLighting hearts with gentle grace.`
  },
  {
    title: "Whispers of the Night",
    text: `Stars twinkle softly, a lullaby,\nMoonlight dances across the sky.\nDreams take flight on wings of peace,\nNight's calm whispers never cease.`
  }
  // Add more poems here ...
];

const songs = [
  {
    title: "Song of the Breeze",
    text: `Soft winds hum a gentle tune,\nDancing lightly with the moon.\nLeaves sway in rhythmic flight,\nCarrying dreams through the night.`
  },
  {
    title: "Melody of the Heart",
    text: `Beats that echo deep inside,\nWhere secrets and feelings reside.\nA song that never fades away,\nPlaying softly every day.`
  }
  // Add more songs here ...
];

const passwordScreen = document.getElementById("passwordScreen");
const tabs = document.getElementById("tabs");
const contentList = document.getElementById("contentList");
const contentView = document.getElementById("contentView");
const titlesList = document.getElementById("titlesList");
const listTitle = document.getElementById("listTitle");
const contentTitle = document.getElementById("contentTitle");
const contentText = document.getElementById("contentText");
const errorMsg = document.getElementById("errorMsg");
const poemsTabBtn = document.getElementById("poemsTab");
const songsTabBtn = document.getElementById("songsTab");

let currentTab = 'poems'; // default tab

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    passwordScreen.style.display = "none";
    tabs.style.display = "flex";
    contentList.style.display = "block";
    contentView.style.display = "none";
    loadTitles(currentTab);
  } else {
    errorMsg.textContent = "Incorrect password. Please try again.";
  }
}

function loadTitles(tab) {
  titlesList.innerHTML = "";
  let items = tab === 'poems' ? poems : songs;
  listTitle.textContent = tab === 'poems' ? "কবিতার নাম" : "গানের নাম";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.title;
    li.onclick = () => showContent(tab, index);
    titlesList.appendChild(li);
  });
}

function showContent(tab, index) {
  let items = tab === 'poems' ? poems : songs;
  contentTitle.textContent = items[index].title;
  contentText.textContent = items[index].text;
  contentList.style.display = "none";
  contentView.style.display = "flex";
}

function showList() {
  contentView.style.display = "none";
  contentList.style.display = "block";
}

function switchTab(tab) {
  if (tab === currentTab) return;
  currentTab = tab;

  if (tab === 'poems') {
    poemsTabBtn.classList.add('active');
    songsTabBtn.classList.remove('active');
  } else {
    songsTabBtn.classList.add('active');
    poemsTabBtn.classList.remove('active');
  }
  loadTitles(tab);
  showList();
}

// Enter key submits password
document.getElementById("passwordInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    checkPassword();
  }
});

// Hide lists initially
tabs.style.display = "none";
contentList.style.display = "none";