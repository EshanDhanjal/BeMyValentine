const messages = [
  "Are you sure?",
  "Really sure??",
  "Are you positive?",
  "My dear pleasee...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very sad...",
  "I will be very very very sad...",
  "Ok fine, I will stop asking...",
  "Just kidding, muheheh you have to say yes cause I love you ❤️"
];

let messageIndex = 0;

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");

  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

async function handleYesClick() {
  // TODO: replace with your Formspree form endpoint
  const FORMSPREE_URL = "https://formspree.io/f/mvzzqaay";

  // Optional: disable buttons to prevent double-click spam
  const yesButton = document.querySelector(".yes-button");
  const noButton = document.querySelector(".no-button");
  if (yesButton) yesButton.disabled = true;
  if (noButton) noButton.disabled = true;

  try {
    await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        event: "valentine_yes",
        message: "She pressed YES 💖",
        time: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    });
  } catch (err) {
    // If it fails, we still redirect — don't ruin the moment.
    console.warn("Notification failed:", err);
  } finally {
    window.location.href = "yes_page.html";
  }
}
