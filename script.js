async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;
  const customShortId = document.getElementById("customShortId").value;

  const response = await fetch("http://localhost:3000/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: longUrl,
      shortID: customShortId || undefined,
    }),
  });

  const data = await response.json();

  if (data.shortId) {
    const shortUrl = `http://localhost:3000/${data.shortId}`;
    document.getElementById("generatedUrl").value = shortUrl;
    document.getElementById("shortUrl").style.display = "block";
  } else {
    alert("Error: " + data.error);
  }
}

function copyUrl() {
  const generatedUrl = document.getElementById("generatedUrl");
  generatedUrl.select();
  document.execCommand("copy");
  alert("URL copied to clipboard!");
}

async function getAnalytics() {
  const shortId = document.getElementById("analyticsShortId").value;

  const response = await fetch(
    `http://localhost:3000/url/analytics/${shortId}`
  );
  const data = await response.json();

  if (data.totalClicks !== undefined) {
    document.getElementById("totalClicks").textContent = data.totalClicks;
    const visitHistoryList = document.getElementById("visitHistory");
    visitHistoryList.innerHTML = "";
    data.analytics.forEach((visit) => {
      const li = document.createElement("li");
      li.textContent = new Date(visit.timeStamp).toLocaleString();
      visitHistoryList.appendChild(li);
    });
    document.getElementById("analytics").style.display = "block";
  } else {
    alert("Error: " + data.error);
  }
}
