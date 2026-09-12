// ---- Rule-based Scam Detector ----
// Each rule adds "points" toward a suspicion score (0-100) and gives a reason.

const urlShorteners = [
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "cutt.ly", "rebrand.ly"
];

const urgencyWords = [
  "urgent", "verify now", "act now", "immediately", "suspended",
  "click here", "limited time", "final notice", "your account will be closed",
  "congratulations", "you won", "claim your prize", "free gift", "winner"
];

const financialBaitWords = [
  "bank account", "otp", "one time password", "cvv", "pin number",
  "wire transfer", "gift card", "bitcoin", "crypto payment", "tax refund"
];

const brandImpersonationHints = [
  "paypal", "amazon", "netflix", "apple", "microsoft", "irs", "fedex", "dhl", "bank"
];

function checkForScam(text) {
  let score = 0;
  const reasons = [];
  const lowerText = text.toLowerCase();

  if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(text)) {
    score += 25;
    reasons.push("🔴 Contains a raw IP address as a link — legitimate sites rarely do this.");
  }

  urlShorteners.forEach(shortener => {
    if (lowerText.includes(shortener)) {
      score += 15;
      reasons.push(`🟠 Uses a URL shortener (${shortener}) which can hide the real destination.`);
    }
  });

  if (/\.(xyz|top|club|info|zip|click|gq|tk)(\/|\s|$)/i.test(text)) {
    score += 15;
    reasons.push("🟠 Uses an unusual domain extension often associated with spam sites.");
  }

  urgencyWords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 10;
      reasons.push(`🟡 Uses urgency/pressure language: "${word}"`);
    }
  });

  financialBaitWords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 15;
      reasons.push(`🔴 Requests sensitive financial info: "${word}"`);
    }
  });

  brandImpersonationHints.forEach(brand => {
    if (lowerText.includes(brand) && !lowerText.includes(`${brand}.com`)) {
      score += 10;
      reasons.push(`🟠 Mentions "${brand}" but doesn't link to their official domain.`);
    }
  });

  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount >= 3) {
    score += 10;
    reasons.push("🟡 Excessive use of exclamation marks — common in spam messages.");
  }

  const hasLink = /https?:\/\//.test(text);
  if (hasLink && lowerText.includes("click")) {
    score += 5;
    reasons.push("🟡 Directly instructs you to click a link.");
  }

  score = Math.min(score, 100);

  return { score, reasons };
}

document.getElementById("checkBtn").addEventListener("click", () => {
  const input = document.getElementById("userInput").value.trim();
  const resultCard = document.getElementById("resultCard");
  const verdict = document.getElementById("verdict");
  const reasonsList = document.getElementById("reasonsList");
  const scoreFill = document.getElementById("scoreFill");

  if (!input) {
    alert("Please paste a link or message first.");
    return;
  }

  const { score, reasons } = checkForScam(input);

  resultCard.classList.remove("hidden");
  reasonsList.innerHTML = "";

  if (reasons.length === 0) {
    reasonsList.innerHTML = "<li>✅ No obvious red flags detected.</li>";
  } else {
    reasons.forEach(reason => {
      const li = document.createElement("li");
      li.textContent = reason;
      reasonsList.appendChild(li);
    });
  }

  let label, color;
  if (score >= 60) {
    label = "🚨 High Risk — Likely a Scam";
    color = "#dc2626";
  } else if (score >= 30) {
    label = "⚠️ Medium Risk — Be Cautious";
    color = "#f59e0b";
  } else {
    label = "✅ Low Risk";
    color = "#22c55e";
  }

  verdict.textContent = `${label} (Score: ${score}/100)`;
  verdict.style.color = color;
  scoreFill.style.width = `${score}%`;
  scoreFill.style.background = color;
});
