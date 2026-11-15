
/*
  UMANI TV - CHANNEL SETTINGS

  Har channel ke liye:
  name = Channel ka naam
  icon = Logo/image ka URL ya emoji
  url  = Live stream ka link
*/

window.TV_CHANNELS = [

  {
    name: "ARY Digital",
    icon: "📺",
    url: "PASTE_ARY_STREAM_LINK_HERE"
  },

  {
    name: "Geo News",
    icon: "📡",
    url: "https://www.youtube.com/live/t3fvgmDDmdc?si=wAOMf7DRz6Xm-dPp"
  },

  {
    name: "Hum TV",
    icon: "🎬",
    url: "PASTE_HUM_TV_STREAM_LINK_HERE"
  },

  {
    name: "Green TV",
    icon: "📺",
    url: "PASTE_GREEN_TV_STREAM_LINK_HERE"
  }

];


/* CHANNELS DISPLAY SYSTEM */
(function () {
  const channelList = document.getElementById("channelList");
  const emptyMessage = document.getElementById("emptyMessage");

  function renderChannels() {
    const channels = window.TV_CHANNELS || [];

    channelList.replaceChildren();

    if (channels.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    channels.forEach(channel => {
      const card = document.createElement("button");
      card.className = "channel-card";
      card.type = "button";

      const iconValue = channel.icon || "📺";

      if (/^https?:\/\//i.test(iconValue)) {
        const logo = document.createElement("img");
        logo.src = iconValue;
        logo.alt = channel.name || "Channel logo";
        card.appendChild(logo);
      } else {
        const emoji = document.createElement("span");
        emoji.className = "channel-emoji";
        emoji.textContent = iconValue;
        card.appendChild(emoji);
      }

      const title = document.createElement("strong");
      title.textContent = channel.name || "TV Channel";
      card.appendChild(title);

      card.addEventListener("click", function () {
        const url = channel.url || "";

        if (!/^https?:\/\//i.test(url)) {
          alert("Is channel ka valid stream link channels.js mein add karein.");
          return;
        }

        window.playChannel(url, channel.name || "TV Channel");
      });

      channelList.appendChild(card);
    });
  }

  renderChannels();
})();
