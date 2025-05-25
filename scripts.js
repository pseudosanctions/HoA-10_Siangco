    document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        box.addEventListener("click", function () {
            console.log('Box clicked');
            this.classList.toggle("revealed");
        });
    });
});


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const params = {
    pointNumber: 60,
    widthFactor: 30,
    speed: 0.004,
    noiseFactor: 0.4,
};

const colors = [
    "rgba(255, 69, 0, 0.7)",
    "rgba(255, 165, 0, 0.7)",
    "rgba(255, 255, 0, 0.7)",
    "rgba(0, 255, 0, 0.7)",
    "rgba(0, 191, 255, 0.7)",
    "rgba(75, 0, 130, 0.7)",
    "rgba(238, 130, 238, 0.7)"
];

let points = new Array(params.pointNumber).fill().map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    dx: (Math.random() - 0.5) * params.noiseFactor,
    dy: (Math.random() - 0.5) * params.noiseFactor,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 15 + params.widthFactor,
}));

setupCanvas();
update();
window.addEventListener('resize', setupCanvas);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    points.forEach((p) => {
        p.x += p.dx * params.speed * window.innerWidth;
        p.y += p.dy * params.speed * window.innerHeight;

        if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
    });

    points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 60;
        ctx.shadowColor = p.color;
        ctx.fill();
    });

    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const flowers = [
    ["Zinnia", "Red, Orange, Pink", "Lasting Friendship and endurance"],
    ["Snapdragon", "Red, Yellow, Pink", "Strength and graciousness"],
    ["FoxGlove", "Purple, Pink, White", "Insincerity and riddles"],
    ["Pansy", "Purple, Yellow, White", "Loving Thoughts and Remembrance"],
    ["Morning Glory", "Blue, Purple, Pink", "Affection and fleeting beauty"],
    ["Forget-Me-Not", "Blue", "True Love and Remembrance"],
    ["Daffodil", "Yellow, White", "Chivalry, Rebirth and new beginnings"],
    ["Buttercup", "Yellow", "Cheerfulness and childish Joy"],
    ["Bluebell", "Blue, Purple", "Humility and gratitude"],
    ["Begonia", "Pink, Red, Yellow", "Deep Thoughts and individuality"],
    ["Gladiolus", "Red, Pink, White", "Strength of character and integrity"],
    ["Hibiscus", "Red, Pink, Yellow", "Delicate beauty and passion"],
    ["Gardenia", "White", "Joy and Secret Love"],
    ["Magnolia", "White, Pink, Purple", "Dignity and Perseverance"],
    ["Lotus", "White, Pink, Blue", "Purity, enlightenment, and rebirth"],
    ["Jasmine", "White, Yellow", "Unconditional love and grace"],
    ["Lilac", "Purple, White", "First Emotion of Love"],
    ["Marigold", "Orange, Yellow", "Desire for Riches, Grief and Jealousy"],
    ["Violet", "Blue, Yellow, White", "Faithfulness and modesty"],
    ["Iris", "Blue, Purple, Yellow", "Wisdom, Faith, and Valor"],
    ["Cherry Blossom", "Pink, White", "Renewal and fleeting nature of life"],
    ["Protea", "Pink, Red, Orange", "Diversity and courage"],
    ["Hyacinth", "Blue, Purple, White", "Apology, consistency, and Playfulness"],
    ["Anemone", "Purple, Red, White", "Forsaken feeling or anticipation"],
    ["Camellia", "Pink, Red, White", "Self-Reflection and inner strength"],
    ["Freesia", "Yellow, Pink, White", "Friendship and Trust"],
    ["Dahlia", "Red, Yellow, Purple", "Beauty, Commitment, and kindness"],
    ["Ranunculus", "Pink, Yellow, Red", "Charm and Attractiveness"],
    ["Poppy", "Red, Orange, White", "Remembrance"],
    ["Aster", "Purple, White", "Love and Daintiness"],
    ["Lily", "White, Orange, Pink", "Magnificent beauty and purity"],
    ["Carnation", "PInk, White, Red", `"I'll Never Forget You", Pure Love`],
    ["Chrysanthemum", "Red, White, Yellow", "Love, Truth, Slighted love"],
    ["Lavender", "Purple", "Purity, Silence, Devotion and Grace"],
    ["Daisy", "White, Pink, Yellow", "Youth, Purity, Innocence, Loyal Love"],
    ["Sunflower", "Yellow", "Lasting happiness and long life"],
    ["Peony", "Pink, White, Red", "Nobility, Honor and Wealth"],
    ["Orchid", "White, Pink, Purple", "Elegance and Luxury"],
    ["Tulip", "Red, Yellow, Purple", "Perfect, Deep, and Undying Love"],
    ["Rose", "Red, White, Pink, Yellow", "Love, Jealousy, Purity, Happiness"]
];

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tableBody");
  const searchInput = document.getElementById("search");
  const searchClearBtn = document.getElementById("search-clear-btn");

  function displayFlowers(data) {
    tbody.innerHTML = "";
    const noResultsMessage = document.getElementById("noResultsMessage");

    if (data.length === 0) {
      noResultsMessage.style.display = "block";
      return;
    }

    noResultsMessage.style.display = "none";
    
    data.forEach(([name, color, meaning]) => {
      tbody.innerHTML += `
        <tr>
          <td>${name}</td>
          <td>${color}</td>
          <td>${meaning}</td>
        </tr>
      `;
    });
  }

function filterFlowers() {
  const query = searchInput.value.toLowerCase().trim();

  if (query === "") {
    tbody.innerHTML = "";
    document.getElementById("noResultsMessage").style.display = "none";
    return;
  }

  const filtered = flowers.filter(([name, color, meaning]) =>
    [name, color, meaning].some(field =>
      field.toLowerCase().includes(query)
    )
  );

  displayFlowers(filtered);
}

  function updateButtonLabel() {
    searchClearBtn.textContent = searchInput.value.trim() === "" ? "Search" : "Clear";
  }

  // DO NOT show flowers on initial load
  tbody.innerHTML = "";
  updateButtonLabel();

  searchInput.addEventListener("input", () => {
    filterFlowers();
    updateButtonLabel();
  });

  searchClearBtn.addEventListener("click", () => {
    if (searchInput.value.trim() !== "") {
      searchInput.value = "";
      tbody.innerHTML = ""; // Empty the table
      updateButtonLabel();
    }
  });
});

document.getElementById("play-music").addEventListener("click", function () {
    let audio = document.getElementById("bg-music");
    let button = document.getElementById("play-music");

    if (audio.paused) {
        audio.play().then(() => {
            console.log("Music is playing.");
            button.textContent = "Stop Music";   
        }).catch(error => {
            console.log("Playback failed:", error);
        });
    } else {
        audio.pause();  
        audio.currentTime = 0;   
        console.log("Music is stopped.");
        button.textContent = "Play Music";   
    }
});


    (function() {
  const navLinksContainer = document.getElementById('nav-links');
  const navButtons = document.querySelectorAll('.nav-btn');
  const contentSections = document.querySelectorAll('.content-section');
  const hamburger = document.querySelector('.hamburger');

  function setActiveSection(sectionId) {
    contentSections.forEach(section => {
      section.style.display = (section.id === sectionId) ? 'block' : 'none';
    });
    navButtons.forEach(btn => {
      if (btn.dataset.section === sectionId) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }
    });
  }

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      setActiveSection(button.dataset.section);
      if (navLinksContainer.classList.contains('show')) {
        navLinksContainer.classList.remove('show');
        hamburger.classList.remove('active');
      }
    });
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('show');
  });

  
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
 
  setActiveSection('home');
})();

