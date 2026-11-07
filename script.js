document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. FILTER FUNCTIONALITY (Vanilla JS)
  // ==========================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and add to the clicked one
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetCategory = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (targetCategory === "all" || cardCategory === targetCategory) {
          card.style.display = "flex";
          // Fade-in effect
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(8px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  

  // ==========================================
  // 2. MINI AUDIO PLAYER (HTML5 Audio API)
  // ==========================================
  const audio = document.getElementById("audio-element");
  const playBtn = document.getElementById("player-btn");
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.getElementById("progress-container");

  if (!audio || !playBtn || !progressBar || !progressContainer) return;

  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        playBtn.textContent = "Pause";
        playBtn.style.color = "var(--music-accent)";
      }).catch(err => {
        console.log("Audio playback was blocked or audio source invalid:", err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      playBtn.textContent = "Play";
      playBtn.style.color = "var(--text-main)";
    }
  });

  // Update progress bar as audio plays
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  });

  // Seek on clicking the progress bar
  progressContainer.addEventListener("click", (e) => {
    const clickX = e.offsetX;
    const width = progressContainer.clientWidth;
    const duration = audio.duration;

    if (duration) {
      audio.currentTime = (clickX / width) * duration;
    }
  });

  // Reset button when audio finishes
  audio.addEventListener("ended", () => {
    isPlaying = false;
    playBtn.textContent = "Play";
    playBtn.style.color = "var(--text-main)";
    progressBar.style.width = "0%";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".edu-card");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");

  if (!searchInput || !noResults) return;

  let currentCategory = "all";
  let searchQuery = "";

  // 1. Filter logic
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.getAttribute("data-filter");
      filterCards();
    });
  });

  // 2. Search logic
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    filterCards();
  });

  // 3. Combined Filter Function
  function filterCards() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const cardText = card.textContent.toLowerCase();

      // Check category match
      const matchesCategory =
        currentCategory === "all" || category === currentCategory;

      // Check text search match
      const matchesSearch =
        searchQuery === "" || cardText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    // Show/hide empty state
    if (visibleCount === 0) {
      noResults.classList.remove("hidden");
    } else {
      noResults.classList.add("hidden");
    }
  }
});


/*=============== SHOW MENU ===============*/
const showMenu = (navId, toggleId) => {
   const nav = document.getElementById(navId),
         toggle = document.getElementById(toggleId)

   if (!nav || !toggle) return

   toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu')
      toggle.classList.toggle('show-icon')
   })

   nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
         if (window.matchMedia('(max-width: 1150px)').matches) {
            nav.classList.remove('show-menu')
            toggle.classList.remove('show-icon')
         }
      })
   })
}
showMenu('nav-menu','nav-toggle')

/*=============== LANGUAGE AND COLOR THEME ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const frenchTranslations = {
    "Portfolio | Developer • Designer • Educator • Musician": "Portfolio | Développeuse • Designer • Éducatrice • Musicienne",
    "Education & Certifications | Portfolio": "Formation et certifications | Portfolio",
    "Contact Gracia | Portfolio": "Contacter Gracia | Portfolio",
    "Home": "Accueil",
    "Overview": "Aperçu",
    "Learning path": "Parcours d’apprentissage",
    "Explore my degrees, certificates, and bootcamp training.": "Découvrez mes diplômes, certificats et formations intensives.",
    "Certificate files have not been provided yet, so the view buttons are unavailable.": "Les fichiers des certificats n’ont pas encore été fournis ; les boutons de visualisation sont donc indisponibles.",
    "Certificate file not provided": "Fichier du certificat non fourni",
    "View certificate": "Voir le certificat",
    "Hosting": "Hébergement",
    "Hosting Certificate": "Certificat en hébergement",
    "Certificate in hosting.": "Certificat en hébergement.",
    "Hosting Bootcamp": "Formation intensive en hébergement",
    "Bootcamp training in hosting.": "Formation intensive en hébergement.",
    "Testimonials": "Témoignages",
    "Projects": "Projets",
    "Vision": "Vision",
    "Reviews": "Avis",
    "About": "À propos",
    "Skills": "Compétences",
    "Contact": "Contact",
    "Skills & Strengths": "Compétences et qualités",
    "A mix of practical expertise and people-focused strengths.": "Un mélange de compétences pratiques et de qualités humaines.",
    "Hard Skills": "Compétences techniques",
    "Soft Skills": "Compétences humaines",
    "HTML & CSS": "HTML et CSS",
    "JavaScript": "JavaScript",
    "Node.js & Python": "Node.js et Python",
    "Responsive web design": "Conception web adaptative",
    "Visual identity & branding": "Identité visuelle et image de marque",
    "Photography & visual storytelling": "Photographie et récit visuel",
    "Music & creative expression": "Musique et expression créative",
    "Education & workshop design": "Éducation et conception d’ateliers",
    "Communication": "Communication",
    "Creativity": "Créativité",
    "Collaboration": "Collaboration",
    "Mentorship": "Mentorat",
    "Adaptability": "Adaptabilité",
    "Problem-solving": "Résolution de problèmes",
    "Empathy": "Empathie",
    "Copy email": "Copier",
    "Copied!": "Copié !",
    "Back": "Retour",
    "Back to Portfolio": "Retour au portfolio",
    "Switch language to French": "Passer en français",
    "Switch language to English": "Passer en anglais",
    "Switch to light mode": "Activer le mode clair",
    "Switch to dark mode": "Activer le mode sombre",
    "Site preferences": "Préférences du site",
    "Available for Select Projects & Workshops": "Disponible pour certains projets et ateliers",
    "Building where": "Créer là où",
    "logic, aesthetics, and sound": "la logique, l’esthétique et le son",
    "converge.": "se rencontrent.",
    "I engineer modern web systems, design visual identities, educate aspiring developers, and compose soundscapes. Four practices rooted in one goal: thoughtful human connection.": "Je conçois des systèmes web modernes, crée des identités visuelles, forme de futurs développeurs et compose des paysages sonores. Quatre pratiques réunies autour d’un même objectif : créer des liens humains authentiques.",
    "Web Developer": "Développeuse web",
    "Graphic Designer": "Designer graphique",
    "Educator": "Éducatrice",
    "Musician": "Musicienne",
    "Photographer": "Photographe",
    "Kinshasa, Ngaliema": "Kinshasa, Ngaliema",
    "Code • Visuals": "Code • Visuels",
    "gracia Portrait": "Portrait de Gracia",
    "Code Screenshot": "Capture d’écran de code",
    "Design Identity": "Identité visuelle",
    "Educator in workshop": "Éducatrice en atelier",
    "Music Recording": "Enregistrement musical",
    "Alex working": "Alex au travail",
    "Selected Works & Creative Experiences": "Réalisations et expériences créatives",
    "Every projects tells a story. Every creation reflects a vision, a skill, and a purpose": "Chaque projet raconte une histoire. Chaque création reflète une vision, un savoir-faire et une intention.",
    "All": "Tout",
    "Web Development": "Développement web",
    "Graphic Design": "Design graphique",
    "Education": "Éducation",
    "Photography": "Photographie",
    "Music": "Musique",
    "Node JS • Python • JavaScript": "Node.js • Python • JavaScript",
    "Branding • Posters • Visual Communication": "Image de marque • Affiches • Communication visuelle",
    "Teaching • Mentorship • Child Development": "Enseignement • Mentorat • Développement de l’enfant",
    "Music Education • Child Development • Creativity": "Éducation musicale • Développement de l’enfant • Créativité",
    "Vanilla JS • Web Audio API • Canvas": "JavaScript natif • Web Audio API • Canvas",
    "Branding • Typography • Print": "Image de marque • Typographie • Impression",
    "Workshop • Art • Group Activities": "Ateliers • Art • Activités de groupe",
    "Music Performance • Instruments • Sound": "Interprétation musicale • Instruments • Son",
    "Portrait • Events • Visual Storytelling": "Portrait • Événements • Récit visuel",
    "Digital Experience & Web Development": "Expériences numériques et développement web",
    "Building responsive websites and interactive digital experiences through creativity, structure, and technology.": "Je crée des sites adaptatifs et des expériences numériques interactives en alliant créativité, structure et technologie.",
    "Get to know ↗": "En savoir plus ↗",
    "Testimonials ↗": "Témoignages ↗",
    "Visual Identity & Creative Design": "Identité visuelle et design créatif",
    "Transforming ideas into visual stories through graphic composition, typography, color, and creative communication.": "Je transforme les idées en récits visuels grâce à la composition graphique, la typographie, la couleur et une communication créative.",
    "Pedagogy & Child Development": "Pédagogie et développement de l’enfant",
    "Creating meaningful learning experiences that encourage curiosity, confidence, independence, and personal development.": "Je crée des expériences d’apprentissage enrichissantes qui encouragent la curiosité, la confiance, l’autonomie et l’épanouissement personnel.",
    "Musical Play Time": "Éveil musical",
    "An educational and musical initiative designed to help children explore creativity, develop musical awareness, and learn through interactive experiences.": "Une initiative éducative et musicale qui aide les enfants à explorer leur créativité, développer leur sens musical et apprendre grâce à des expériences interactives.",
    "Real-Time Algorithmic Visualizer": "Visualiseur algorithmique en temps réel",
    "An in-browser audio engine generating real-time geometric visualizers from microphonic sound frequencies at 60 FPS.": "Un moteur audio dans le navigateur qui génère des visualisations géométriques en temps réel à partir des fréquences sonores, à 60 images par seconde.",
    "Kinesis Architecture Studio": "Studio d’architecture Kinesis",
    "Minimalist corporate branding, bespoke typographic rhythm, and physical stationery designed for an eco-architecture firm.": "Une identité de marque minimaliste, une typographie sur mesure et de la papeterie conçues pour un cabinet d’architecture écologique.",
    "Creative Learning & Artistic Workshops": "Apprentissage créatif et ateliers artistiques",
    "Combining art, games, music, and collaborative activities to make learning more engaging and enjoyable for children.": "J’associe l’art, les jeux, la musique et les activités collectives pour rendre l’apprentissage plus stimulant et agréable pour les enfants.",
    "Music, Sound & Creative Expression": "Musique, son et expression créative",
    "Exploring musical expression through instruments, rhythm, sound, and collaborative artistic experiences.": "J’explore l’expression musicale à travers les instruments, le rythme, le son et des expériences artistiques collectives.",
    "Photography & Visual Storytelling": "Photographie et récit visuel",
    "Capturing meaningful moments, exploring perspectives, and transforming everyday experiences into visual stories.": "Je capture des moments précieux, explore différents points de vue et transforme le quotidien en récits visuels.",
    "The Intersection": "Au carrefour des disciplines",
    "Eight dimensions. One creative vision.": "Huit dimensions. Une vision créative.",
    "Innovation": "Innovation",
    "Technology creates possibilities": "La technologie ouvre le champ des possibles",
    "Architecture that does not buckle under pressure. Clean, semantic structures built to endure.": "Une architecture fiable, même sous pression. Des structures claires et sémantiques conçues pour durer.",
    "Aesthetics": "Esthétique",
    "Design gives ideas identity": "Le design donne une identité aux idées",
    "The visual cadence of whitespace, intentional typographic balance, and deliberate hierarchy.": "Le rythme de l’espace, l’équilibre typographique et une hiérarchie visuelle réfléchie.",
    "Empowerment": "Autonomie",
    "Education shapes minds": "L’éducation façonne les esprits",
    "Teaching forces you to peel away jargon. If an idea cannot be taught simply, it is poorly designed.": "Enseigner oblige à dépasser le jargon. Si une idée ne peut être expliquée simplement, elle est mal conçue.",
    "Perspective": "Perspective",
    "Photography captures stories": "La photographie raconte des histoires",
    "Turning ordinary moments into meaningful visual stories.": "Transformer des instants ordinaires en récits visuels qui ont du sens.",
    "resonance": "Résonance",
    "Music gives emotions a voice": "La musique donne une voix aux émotions",
    "Creating sound and experiences that connect and inspire.": "Créer des sons et des expériences qui rapprochent et inspirent.",
    "imagination": "Imagination",
    "Ideas have no boundaries": "Les idées n’ont pas de frontières",
    "Exploring original concepts and turning creativity into possibilities.": "Explorer des concepts originaux et transformer la créativité en possibilités.",
    "connection": "Lien",
    "creativity brings people together": "La créativité rassemble",
    "Building relationships through collaboration, communication and art.": "Tisser des liens grâce à la collaboration, à la communication et à l’art.",
    "impact": "Impact",
    "Purpose turns talent into value": "Le sens transforme le talent en valeur",
    "Creating meaningful experiences that make a difference.": "Créer des expériences porteuses de sens qui font la différence.",
    "Sample quotes are placeholders; replace them with genuine client feedback.": "Ces citations sont des exemples : remplacez-les par de vrais témoignages de clients.",
    "Client testimonials": "Témoignages clients",
    "Education testimonials": "Témoignages sur l’éducation",
    "Client testimonial": "Témoignage client",
    "Participant testimonial": "Témoignage de participant·e",
    "Collaborator testimonial": "Témoignage de collaborateur·rice",
    "Learner testimonial": "Témoignage d’apprenant·e",
    "“Gracia brings care and clarity to every stage of a project. The collaboration felt thoughtful from the first conversation to the final delivery.”": "« Gracia apporte attention et clarté à chaque étape d’un projet. La collaboration a été réfléchie, de notre premier échange jusqu’à la livraison. »",
    "Web development client": "Client en développement web",
    "Replace with a real client name": "Remplacer par le nom d’un vrai client",
    "“The design captured exactly what we wanted to communicate. Every detail felt intentional, and the final result was easy to use.”": "« Le design exprimait exactement ce que nous voulions transmettre. Chaque détail était pensé et le résultat final est simple à utiliser. »",
    "Graphic design client": "Client en design graphique",
    "“The workshop made learning feel welcoming and creative. Gracia encouraged everyone to participate and leave with new confidence.”": "« L’atelier a rendu l’apprentissage accueillant et créatif. Gracia a encouragé chacun à participer et à gagner en confiance. »",
    "Workshop participant": "Participant à un atelier",
    "“The photographs captured the feeling of the day and the small details we wanted to remember. The whole experience felt relaxed and thoughtful.”": "« Les photos ont saisi l’ambiance de la journée et les petits détails que nous voulions garder en mémoire. L’expérience était détendue et attentionnée. »",
    "Photography client": "Client en photographie",
    "“Her music brought warmth and energy to the project. She listened closely and helped create an atmosphere everyone could enjoy.”": "« Sa musique a apporté chaleur et énergie au projet. Elle a été à l’écoute et a créé une ambiance appréciée de tous. »",
    "Music collaborator": "Collaborateur musical",
    "Replace with a real collaborator name": "Remplacer par le nom d’un vrai collaborateur",
    "The Mind Behind the Work": "La personne derrière les projets",
    "My journey is driven by curiosity, creativity, and a passion for making meaningful things happen. I am a multidisciplinary creative professional working at the intersection of education, technology, visual arts, and music. From developing digital experiences and designing visual identities to capturing moments through photography and expressing ideas through music, I find inspiration in exploring different forms of creativity. Education also plays a fundamental role in who I am. As an educator, I believe in the power of learning, mentorship, and creative experiences to shape minds, inspire confidence, and create opportunities.": "Mon parcours est guidé par la curiosité, la créativité et le désir de donner vie à des projets qui ont du sens. Je suis une professionnelle créative pluridisciplinaire, au croisement de l’éducation, de la technologie, des arts visuels et de la musique. Du développement d’expériences numériques à la création d’identités visuelles, en passant par la photographie et la musique, je trouve mon inspiration dans l’exploration de différentes formes de créativité. L’éducation occupe également une place essentielle dans ma vie. En tant qu’éducatrice, je crois au pouvoir de l’apprentissage, du mentorat et des expériences créatives pour former les esprits, renforcer la confiance et ouvrir des possibilités.",
    "Today, I bring these different disciplines together to transform ideas into meaningful projects, connect with people, and create experiences that go beyond expectations. I don't believe creativity has just one direction. I believe every talent has the power to make a difference.": "Aujourd’hui, je réunis ces différentes disciplines pour transformer des idées en projets porteurs de sens, créer des liens et proposer des expériences qui dépassent les attentes. La créativité n’a pas une seule direction : chaque talent peut faire la différence.",
    "Areas of expertise": "Domaines d’expertise",
    "Creative vision": "Vision créative",
    "Fields of passion": "Domaines de passion",
    "Possibilities": "Possibilités",
    "Let's connect": "Prenons contact",
    "Work with me.": "Travaillons ensemble.",
    "Your vision. My creativity. One collaboration.": "Votre vision. Ma créativité. Une collaboration.",
    "© 2026 . Gracia MBADU Design and Developed by me with semantic HTML, CSS, and JavaScript.": "© 2026. Gracia MBADU. Conçu et développé avec du HTML sémantique, du CSS et du JavaScript.",
    "© 2026 Gracia MBADU. Designed and developed with semantic HTML, CSS, and JavaScript.": "© 2026 Gracia MBADU. Conçu et développé avec du HTML sémantique, du CSS et du JavaScript.",
    "Academic Journey": "Parcours académique",
    "A progression from technical foundations to continued study.": "Un parcours des bases techniques vers la poursuite des études.",
    "Engineering foundation": "Fondements en ingénierie",
    "Built a foundation in engineering with a specialization in electronics.": "Acquisition de bases en ingénierie avec une spécialisation en électronique.",
    "Expanding practical skills": "Développement de compétences pratiques",
    "Continued learning across web development and design, English, digital marketing, music, and office automation.": "Poursuite de l’apprentissage en développement et design web, anglais, marketing numérique, musique et bureautique.",
    "Teaching and mentorship": "Enseignement et mentorat",
    "Developed skills in teaching and mentorship to support learners through workshops and collaborative activities.": "Développement de compétences en enseignement et mentorat pour accompagner les apprenants lors d’ateliers et d’activités collaboratives.",
    "Next goal: Computer Science": "Prochain objectif : informatique",
    "Plan to pursue further study in computer science and build on the engineering foundation.": "Projet de poursuivre des études en informatique et de s’appuyer sur les bases en ingénierie.",
    "Education &": "Formation et",
    "Credentials": "diplômes",
    "My engineering degree and certificates in English, web development, web design, digital marketing, music, and teaching and mentorship.": "Mon diplôme d’ingénieure et mes certificats en anglais, développement web, design web, marketing numérique, musique, enseignement et mentorat.",
    "Bachelor's Degree": "Licence",
    "Degrees (including 1 upcoming)": "Diplômes (dont 1 à venir)",
    "Certifications": "Certifications",
    "Engineering specialization": "Spécialisation en ingénierie",
    "Bootcamps": "Formations intensives",
    "Degrees": "Diplômes",
    "Certificates": "Certificats",
    "Search by degree, certificate, or subject...": "Rechercher un diplôme, un certificat ou un domaine...",
    "Degree": "Diplôme",
    "Upcoming": "À venir",
    "Upcoming Computer Science Degree": "Diplôme en informatique à venir",
    "Computer Science": "Informatique",
    "Planned degree studies in computer science.": "Études en informatique prévues.",
    "Office Automation Certificate": "Certificat en bureautique",
    "Office automation": "Bureautique",
    "Certificate in office automation.": "Certificat en bureautique.",
    "Office Automation Bootcamp": "Formation intensive en bureautique",
    "Bootcamp training in office automation.": "Formation intensive en bureautique.",
    "Bachelor's Degree in Engineering": "Licence en ingénierie",
    "Specialization: Electronics": "Spécialisation : électronique",
    "Bachelor's degree in engineering, with a specialization in electronics.": "Diplôme de premier cycle en ingénierie, avec une spécialisation en électronique.",
    "Engineering": "Ingénierie",
    "Electronics": "Électronique",
    "Certification": "Certification",
    "English Language Certificate": "Certificat d’anglais",
    "English language": "Langue anglaise",
    "Certificate in English.": "Certificat en anglais.",
    "English": "Anglais",
    "Web Development Certificate": "Certificat en développement web",
    "Web development": "Développement web",
    "Certificate in web development.": "Certificat en développement web.",
    "Web Design Certificate": "Certificat en design web",
    "Web design": "Design web",
    "Certificate in web design.": "Certificat en design web.",
    "Digital Marketing Certificate": "Certificat en marketing numérique",
    "Digital marketing": "Marketing numérique",
    "Certificate in digital marketing.": "Certificat en marketing numérique.",
    "Music Certificate": "Certificat en musique",
    "Certificate in music.": "Certificat en musique.",
    "Teaching & Mentorship Certificate": "Certificat en enseignement et mentorat",
    "Teaching and mentorship": "Enseignement et mentorat",
    "Certificate in teaching and mentorship.": "Certificat en enseignement et mentorat.",
    "Teaching": "Enseignement",
    "Bootcamp": "Formation intensive",
    "Web Development Bootcamp": "Formation intensive en développement web",
    "Completed bootcamp training in web development.": "Formation intensive en développement web suivie.",
    "Digital Marketing Bootcamp": "Formation intensive en marketing numérique",
    "Completed bootcamp training in digital marketing.": "Formation intensive en marketing numérique suivie.",
    "Music Bootcamp": "Formation intensive en musique",
    "Completed bootcamp training in music.": "Formation intensive en musique suivie.",
    "No matching education records found.": "Aucun résultat de formation correspondant.",
    "Sample quotes are placeholders; replace them with genuine learner feedback.": "Ces citations sont des exemples : remplacez-les par de vrais témoignages d’apprenants.",
    "“Gracia made challenging concepts easier to understand and created a welcoming space to ask questions and learn.”": "« Gracia a rendu les notions difficiles plus faciles à comprendre et a créé un cadre accueillant pour poser des questions et apprendre. »",
    "“The lessons were engaging, well organized, and full of practical activities that helped the ideas stick.”": "« Les cours étaient captivants, bien organisés et riches en activités pratiques qui aidaient à retenir les notions. »",
    "“Gracia encouraged curiosity and confidence, making learning a positive experience for everyone in the group.”": "« Gracia a encouragé la curiosité et la confiance, faisant de l’apprentissage une expérience positive pour tout le groupe. »",
    "“The mentorship helped me approach new challenges with more confidence and a clearer plan for learning.”": "« Le mentorat m’a aidé·e à aborder de nouveaux défis avec plus de confiance et un plan d’apprentissage plus clair. »",
    "Mentorship participant": "Participant·e au mentorat",
    "“The creative activities made it easy for everyone to join in, share ideas, and learn together.”": "« Les activités créatives ont permis à chacun de participer, de partager ses idées et d’apprendre ensemble. »",
    "Learning program participant": "Participant·e au programme d’apprentissage",
    "Office automation learner": "Apprenant·e en bureautique",
    "“The practical office automation exercises helped me feel more confident using everyday productivity tools.”": "« Les exercices pratiques de bureautique m’ont aidé·e à gagner en confiance dans l’utilisation des outils de productivité du quotidien. »",
    "Sample quote; replace with genuine learner feedback.": "Citation fictive ; à remplacer par un véritable témoignage d’apprenant·e.",
    "Student": "Étudiant·e",
    "Replace with a real student name": "Remplacer par le nom d’un·e vrai·e étudiant·e",
    "Replace with a real participant name": "Remplacer par le nom d’un·e vrai·e participant·e",
    "Parent": "Parent",
    "Replace with a real parent name": "Remplacer par le nom d’un vrai parent",
    "Previous testimonial": "Témoignage précédent",
    "Next testimonial": "Témoignage suivant",
    "Back to portfolio": "Retour au portfolio",
    "Let's create something meaningful": "Créons quelque chose qui a du sens",
    "Have a project": "Un projet",
    "in": "en",
    "mind?": "tête ?",
    "Tell me a little about what you’re working on. I’ll get back to you as soon as I can.": "Parlez-moi de votre projet. Je vous répondrai dès que possible.",
    "Email": "E-mail",
    "Based in": "Basée à",
    "Send a message": "Envoyer un message",
    "Fields marked with": "Les champs marqués d’un",
    "are required.": "sont obligatoires.",
    "Your name": "Votre nom",
    "Email address": "Adresse e-mail",
    "What is this about?": "Quel est le sujet ?",
    "Optional": "Facultatif",
    "Your message": "Votre message",
    "Send message": "Envoyer le message",
    "Sending...": "Envoi en cours...",
    "Message sent": "Message envoyé",
    "Share a few details about your project...": "Décrivez brièvement votre projet...",
    "Project inquiry, collaboration...": "Demande de projet, collaboration...",
    "Jane Doe": "Camille Dupont",
    "Switch to portfolio": "Retourner au portfolio",
    "Close notification": "Fermer la notification",
    "Your message has been sent. Returning to the portfolio...": "Votre message a été envoyé. Retour au portfolio...",
    "Your message has been sent successfully. Taking you back to the portfolio...": "Votre message a bien été envoyé. Retour au portfolio...",
    "Message delivery is not configured yet. Please email me directly at mbadugracia9@email.com.": "L’envoi de messages n’est pas encore configuré. Veuillez m’écrire directement à mbadugracia9@email.com.",
    "Your email app should open with the message ready. Send it there to complete delivery.": "Votre application de messagerie devrait s’ouvrir avec le message prêt. Envoyez-le depuis cette application pour terminer l’envoi.",
    "Could not open your email app. Please email me directly at mbadugracia9@email.com.": "Impossible d’ouvrir votre application de messagerie. Veuillez m’écrire directement à mbadugracia9@email.com.",
    "Your message could not be sent. Please try again or email me directly.": "Votre message n’a pas pu être envoyé. Réessayez ou écrivez-moi directement.",
    "Something went wrong. Please try again.": "Une erreur est survenue. Veuillez réessayer.",
  };

  const hasTranslation = (text) => Object.prototype.hasOwnProperty.call(frenchTranslations, text);
  const originalTitle = document.title;
  const sourceNodes = [];
  const sourceAttributes = [];
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  while (textWalker.nextNode()) {
    const node = textWalker.currentNode;
    const source = node.nodeValue;
    const normalized = source.trim().replace(/\s+/g, " ");
    if (normalized && hasTranslation(normalized)) {
      sourceNodes.push({ node, source, key: normalized });
    }
  }

  document.querySelectorAll("*").forEach((element) => {
    ["placeholder", "aria-label", "title", "alt"].forEach((attribute) => {
      const source = element.getAttribute(attribute);
      if (source && hasTranslation(source)) {
        sourceAttributes.push({ element, attribute, source });
      }
    });
  });

  const applyLanguage = (language, persist = true) => {
    const isFrench = language === "fr";
    sourceNodes.forEach(({ node, source, key }) => {
      if (!isFrench) {
        node.nodeValue = source;
        return;
      }

      const leadingWhitespace = source.match(/^\s*/)[0];
      const trailingWhitespace = source.match(/\s*$/)[0];
      node.nodeValue = `${leadingWhitespace}${frenchTranslations[key]}${trailingWhitespace}`;
    });

    sourceAttributes.forEach(({ element, attribute, source }) => {
      element.setAttribute(attribute, isFrench ? frenchTranslations[source] : source);
    });

    document.title = isFrench && hasTranslation(originalTitle)
      ? frenchTranslations[originalTitle]
      : originalTitle;
    document.documentElement.lang = isFrench ? "fr" : "en";

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      button.querySelectorAll("[data-language-label]").forEach((label) => {
        label.textContent = isFrench ? "EN" : "FR";
      });
      const accessibleLabel = isFrench ? "Passer en anglais" : "Passer en français";
      button.setAttribute("aria-label", accessibleLabel);
      button.setAttribute("aria-pressed", String(isFrench));
      button.title = accessibleLabel;
    });

    if (persist) {
      try {
        localStorage.setItem("site-language", language);
      } catch {
        return;
      }
    }
  };

  const applyTheme = (theme, persist = true) => {
    const nextTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = nextTheme === "light" ? "#f4f6fb" : "#090a10";

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const label = nextTheme === "dark"
        ? (document.documentElement.lang === "fr" ? "Activer le mode clair" : "Switch to light mode")
        : (document.documentElement.lang === "fr" ? "Activer le mode sombre" : "Switch to dark mode");
      button.querySelectorAll("i").forEach((icon) => {
        icon.classList.toggle("ri-sun-line", nextTheme === "dark");
        icon.classList.toggle("ri-moon-line", nextTheme === "light");
      });
      button.setAttribute("aria-label", label);
      button.setAttribute("aria-pressed", String(nextTheme === "light"));
      button.title = label;
    });

    if (persist) {
      try {
        localStorage.setItem("site-theme", nextTheme);
      } catch {
        return;
      }
    }
  };

  let savedLanguage = "en";
  let savedTheme = document.documentElement.dataset.theme || "dark";
  try {
    savedLanguage = localStorage.getItem("site-language") === "fr" ? "fr" : "en";
    savedTheme = localStorage.getItem("site-theme") === "light" ? "light" : "dark";
  } catch {
    savedLanguage = "en";
  }

  applyLanguage(savedLanguage, false);
  applyTheme(savedTheme, false);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(document.documentElement.lang === "fr" ? "en" : "fr");
      applyTheme(document.documentElement.dataset.theme, false);
    });
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  });
});

/*=============== SCROLL REVEAL ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll([
    ".hero-text",
    ".hero-visual",
    ".section-header",
    ".card",
    ".philosophy-text",
    ".pillar",
    ".testimonial-list",
    ".about-grid",
    ".skills-section",
    ".hero-section",
    ".stats-grid",
    ".controls-wrapper",
    ".edu-card",
    ".testimonials-section",
    ".back-link",
    ".no-results",
    ".contact-intro",
    ".contact-detail",
    ".contact-container",
    ".form-group",
    "#submit-btn",
    ".contact-back-link",
    ".footer-content",
    ".copyright",
  ].join(", "));

  if (reduceMotion || !("IntersectionObserver" in window) || revealTargets.length === 0) return;

  document.documentElement.classList.add("has-scroll-reveal");

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  });

  revealTargets.forEach((element, index) => {
    element.classList.add("scroll-reveal");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    observer.observe(element);
  });

  document.querySelectorAll('.nav__link[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").slice(1);
      const target = targetId ? document.getElementById(targetId) : document.querySelector(".hero");
      if (!target) return;

      const targetsToReplay = [
        ...(target.matches(".scroll-reveal") ? [target] : []),
        ...target.querySelectorAll(".scroll-reveal"),
      ];

      targetsToReplay.forEach((element) => {
        observer.unobserve(element);
        element.classList.remove("is-visible");
        observer.observe(element);
      });
    });
  });
});

/*=============== COPY EMAIL ===============*/
const navEmail = document.getElementById('nav-email');
const navCopyElement = document.getElementById('nav-copy');
const navText = document.getElementById('nav-text');

if (navEmail && navCopyElement && navText) {
  navEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(navCopyElement.textContent.trim());
    navText.textContent = document.documentElement.lang === "fr" ? "Copié !" : "Copied!";
      setTimeout(() => {
      navText.textContent = document.documentElement.lang === "fr" ? "Copier" : "Copy email";
      }, 2000);
    } catch (error) {
      console.error('Unable to copy email address:', error);
    }
  });
}


const form = document.getElementById("contact-form");

if (form) {
  const formStatus = document.getElementById("form-status");
  const messageInput = document.getElementById("message");
  const messageCount = document.getElementById("message-count");

  if (messageInput && messageCount) {
    const updateMessageCount = () => {
      messageCount.textContent = `${messageInput.value.length} / ${messageInput.maxLength}`;
    };

    messageInput.addEventListener("input", updateMessageCount);
    updateMessageCount();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(form);
      const isFrench = document.documentElement.lang === "fr";
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const subject = String(formData.get("subject") ?? "").trim()
        || (isFrench ? "Contact depuis le portfolio" : "Portfolio contact");
      const message = String(formData.get("message") ?? "").trim();
      const body = isFrench
        ? `Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`
        : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailto = `mailto:mbadugracia9@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (formStatus) {
        formStatus.textContent = isFrench
          ? "Votre application de messagerie devrait s’ouvrir avec le message prêt. Envoyez-le depuis cette application pour terminer l’envoi."
          : "Your email app should open with the message ready. Send it there to complete delivery.";
        formStatus.className = "status-message";
      }
      window.location.href = mailto;
    } catch (error) {
      console.error("Unable to prepare the contact email:", error);
      if (formStatus) {
        formStatus.textContent = document.documentElement.lang === "fr"
          ? "Impossible d’ouvrir votre application de messagerie. Veuillez m’écrire directement à mbadugracia9@email.com."
          : "Could not open your email app. Please email me directly at mbadugracia9@email.com.";
        formStatus.className = "status-message error";
      }
    }
  });
}