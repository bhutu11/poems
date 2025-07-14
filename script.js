
  const correctPassword = "123"; // Change your password here

  let poems = [];
  let songs = [];

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

  let currentTab = 'poems';

  async function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    if (input === correctPassword) {
      try {
        const res = await fetch('writings.json');
        const data = await res.json();
        poems = data.poems || [];
        songs = data.songs || [];

        passwordScreen.style.display = "none";
        tabs.style.display = "flex";
        contentList.style.display = "block";
        loadTitles(currentTab);
      } catch (e) {
        errorMsg.textContent = "Failed to load writings.json";
      }
    } else {
      errorMsg.textContent = "Incorrect password. Please try again.";
    }
  }

  function loadTitles(tab) {
    titlesList.innerHTML = "";
    const items = tab === 'poems' ? poems : songs;
    listTitle.textContent = tab === 'poems' ? "কবিতার নাম" : "গানের নাম";
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item.title;
      li.onclick = () => showContent(tab, index);
      titlesList.appendChild(li);
    });
  }

  function showContent(tab, index) {
    const items = tab === 'poems' ? poems : songs;
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
    poemsTabBtn.classList.toggle('active', tab === 'poems');
    songsTabBtn.classList.toggle('active', tab === 'songs');
    loadTitles(tab);
    showList();
  }

  // Allow pressing Enter to submit password
  document.getElementById("passwordInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });

