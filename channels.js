
const channels = [
  {
    name: "Geo News",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Geo_News_logo.svg/512px-Geo_News_logo.svg.png",
    url: "https://www.youtube.com/live/t3fvgmDDmdc?si=wAOMf7DRz6Xm-dPp",
    type: "youtube"
  }
];

document.addEventListener("DOMContentLoaded", function () {

  const channelList = document.getElementById("channelList");
  const playerBox = document.getElementById("playerBox");
  const playerTitle = document.getElementById("playerTitle");
  const video = document.getElementById("tvPlayer");
  const emptyMessage = document.getElementById("emptyMessage");

  if (!channelList || !playerBox || !video) {
    console.error("Channel page elements not found.");
    return;
  }

  // Create channel cards
  channelList.innerHTML = "";

  channels.forEach(function(channel) {

    const card = document.createElement("div");
    card.className = "channel-card";

    const logo = document.createElement("img");
    logo.src = channel.logo;
    logo.alt = channel.name;

    logo.onerror = function() {
      logo.style.display = "none";
    };

    const name = document.createElement("strong");
    name.textContent = channel.name;

    const watch = document.createElement("span");
    watch.textContent = "▶ Watch Live";
    watch.style.color = "#00eaff";
    watch.style.fontSize = "13px";

    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(watch);

    card.addEventListener("click", function() {
      playMyChannel(channel);
    });

    channelList.appendChild(card);
  });

  if (emptyMessage) {
    emptyMessage.style.display = channels.length ? "none" : "block";
  }

  // Play selected channel
  function playMyChannel(channel) {

    if (typeof stopVideo === "function") {
      stopVideo();
    }

    // Remove old YouTube player
    const oldFrame = document.getElementById("youtubeFrame");
    if (oldFrame) oldFrame.remove();

    video.style.display = "none";

    playerTitle.textContent = channel.name;
    playerBox.style.display = "block";

    if (channel.type === "youtube") {

      const match = channel.url.match(
        /(?:live\/|watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
      );

      if (!match) {
        playerTitle.textContent = "Invalid YouTube link";
        return;
      }

      const videoId = match[1];

      const iframe = document.createElement("iframe");
      iframe.id = "youtubeFrame";
      iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
      iframe.title = channel.name;
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;

      iframe.style.width = "100%";
      iframe.style.aspectRatio = "16 / 9";
      iframe.style.border = "0";
      iframe.style.borderRadius = "8px";
      iframe.style.background = "#000";

      playerBox.appendChild(iframe);

    } else {

      video.style.display = "block";
      video.src = channel.url;
      video.play().catch(function() {});

    }

    playerBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  // Close player when returning home
  const originalStopVideo = window.stopVideo;

  window.stopVideo = function() {

    const oldFrame = document.getElementById("youtubeFrame");
    if (oldFrame) oldFrame.remove();

    video.pause();
    video.removeAttribute("src");
    video.load();
    video.style.display = "block";

    playerBox.style.display = "none";

    if (typeof originalStopVideo === "function") {
      // Original player cleanup is handled above.
    }
  };

});
