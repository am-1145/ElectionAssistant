export const timelineData = [
  { id: 1, stage: "Announcement", date: "Oct 1, 2026", description: "Official announcement of the election dates.", action: "Mark your calendar." },
  { id: 2, stage: "Nomination", date: "Oct 15, 2026", description: "Candidates file their nomination papers.", action: "Review local candidates starting now." },
  { id: 3, stage: "Campaigning", date: "Nov 1, 2026", description: "Active campaigning by political parties.", action: "Attend local debates or town halls." },
  { id: 4, stage: "Voting Day", date: "Nov 15, 2026", description: "The day to cast your vote.", action: "Go to your polling booth and vote." },
  { id: 5, stage: "Results", date: "Nov 20, 2026", description: "Counting of votes and declaration of winners.", action: "Check the election results." }
];

export const scenariosData = [
  { id: "first-time", title: "First-Time Voter", content: "1. Check if you hold a valid citizenship.\n2. Apply for your Voter ID.\n3. Find your polling station." },
  { id: "moved", title: "Moved to a New City", content: "1. Fill Form 8 to shift your constituency.\n2. Submit address proof.\n3. Verify your name in the new electoral roll." },
  { id: "lost-id", title: "Lost Voter ID", content: "1. File an FIR/police report.\n2. Apply for a duplicate ID online (Form 002).\n3. Keep alternate valid IDs handy." }
];

export const mythsFactsData = [
  { myth: "I must carry my Voter ID to vote.", fact: "Other valid IDs (like Passport, Driving License, Aadhaar) are often accepted if your name is on the electoral roll." },
  { myth: "I can vote online.", fact: "Currently, voting requires you to be physically present at the polling booth." },
  { myth: "If I don't vote, I lose my citizenship.", fact: "Voting is a right, but not legally enforced. You do not lose citizenship if you don't vote." }
];

export const quizData = [
  { question: "What is the minimum age to vote?", options: ["16", "18", "21", "25"], answer: "18" },
  { question: "Can you vote without a Voter ID card if your name is on the list?", options: ["Yes, with alternative ID", "No, it's mandatory"], answer: "Yes, with alternative ID" },
  { question: "What type of mark is applied to your finger after voting?", options: ["Washable marker", "Indelible ink", "Sticker"], answer: "Indelible ink" }
];

export const checklistData = [
  { id: "id", label: "Valid Photo ID" },
  { id: "slip", label: "Voter Information Slip" },
  { id: "water", label: "Water bottle" },
  { id: "phone", label: "Know that phones are usually NOT allowed inside" }
];

export const translations = {
  en: {
    app_title: "Election Assistant",
    progress_title: "Your Journey",
    ready_to_vote: "Ready to Vote",
    timeline_title: "Election Timeline",
    assistant_title: "Smart Assistant",
    scenarios_title: "Guides for You",
    myths_title: "Myth vs Fact",
    quiz_title: "Test Your Knowledge",
    checklist_title: "Polling Day Checklist"
  },
  es: {
    app_title: "Asistente Electoral",
    progress_title: "Tu Progreso",
    ready_to_vote: "Listo para Votar",
    timeline_title: "Cronograma Electoral",
    assistant_title: "Asistente Inteligente",
    scenarios_title: "Guías para Ti",
    myths_title: "Mito vs Realidad",
    quiz_title: "Pon a prueba tus conocimientos",
    checklist_title: "Lista para el día de votación"
  }
};

export const chatIntents = [
  {
    keywords: ["eligible", "eligibility", "age", "old"],
    phrases: ["Am I eligible to vote?", "What is the age requirement?", "Can I vote?"],
    answer: "To be eligible, you must be a citizen and at least 18 years old. You can use the 'Check Eligibility' tool above to be sure."
  },
  {
    keywords: ["register", "apply"],
    phrases: ["How do I register?", "Where do I apply for voter id?"],
    answer: "You can register online through the National Voter Portal or physically at your local registration office.",
    actionText: "Register Online ↗"
  },
  {
    keywords: ["lost", "stolen", "missing", "police"],
    phrases: ["I lost my voter ID", "My ID is stolen", "Need help, lost ID"],
    answer: "Don't panic! You must first file a police report (FIR), then apply for a duplicate ID online using Form 002. You can still vote showing your Passport or Aadhaar if your name on the electoral roll.",
    type: "emergency"
  },
  {
    keywords: ["where", "booth", "station", "place"],
    phrases: ["Where is my polling booth?", "How to find voting station?"],
    answer: "Use our 'Find Polling Booth' search tool above by entering your ZIP code or city.",
    actionText: "Find Booth ↗"
  }
];
