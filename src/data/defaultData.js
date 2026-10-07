// Default Portfolio Data for Prashant Singh
// All data here is 100% editable by Prashant through the Admin Panel

export const defaultPortfolioData = {
  profile: {
    name: "Prashant Singh",
    headline: "BCA Student | Tech Enthusiast | Aspiring Professional",
    subHeadline: "Passionate about building modern software, robust web applications, and solving real-world challenges through code.",
    aboutIntro: "Hello! I am Prashant Singh, a dedicated Bachelor of Computer Applications (BCA) student with a passion for software development, modern web technologies, and database systems. I love turning complex logic into elegant, user-friendly digital solutions. Always eager to learn emerging technologies and collaborate on impactful projects.",
    careerObjective: "To secure a challenging role or internship as a Software Developer / Web Developer where I can apply my skills in Java, Web Technologies, Database Management, and Problem Solving to create meaningful products while continuously expanding my technical capabilities.",
    professionalGoals: "My goal is to master scalable software architecture, build high-performance full-stack applications, contribute to open-source software, and evolve into an exceptional technology leader who solves critical problems.",
    interests: ["Full-Stack Web Development", "Java Application Development", "Database Architecture & SQL", "AI Productivity & Automation Tools", "UI/UX & Responsive Web Design", "Video Editing & Content Creation"],
    personalAchievements: [
      "1st Prize in College Speed Coding & Logic Competition (2025)",
      "Recognized for Academic Excellence in BCA Coursework",
      "Successfully developed and showcased 4+ end-to-end software & web projects",
      "Active organizer and student coordinator in Campus Computer Science Club"
    ],
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800", // professional avatar placeholder
    phone: "9628676007",
    email: "prashantsingh00887@gmail.com",
    linkedin: "https://linkedin.com/in/prashant-singh-8b7209348",
    github: "https://github.com/prashantsingh00887",
    location: "India",
    status: "Open to Internships & Opportunities",
    experienceYears: "BCA Undergraduate (Active Student)",
  },

  education: [
    {
      id: "edu-col-1",
      category: "college",
      institution: "College / University Name (Editable in Admin)",
      degree: "BCA (Bachelor of Computer Applications)",
      duration: "2024 - 2027 (Expected)",
      currentStatus: "2nd Year / 4th Semester",
      location: "India",
      score: "CGPA: 8.4 / 10",
      description: "Undergoing comprehensive undergraduate training in Computer Applications. Deepening fundamentals in Core Java, Data Structures & Algorithms, Database Management Systems (SQL), Web Technologies, Python, and Software Engineering methodologies.",
      courses: ["Core Java & OOP", "Data Structures & Algorithms", "DBMS & SQL", "Web Development", "Computer Networks", "Operating Systems"]
    },
    {
      id: "edu-sch-12",
      category: "school",
      institution: "Senior Secondary High School (Editable in Admin)",
      degree: "Class 12th (Senior Secondary - Science / PCM)",
      duration: "2022 - 2024",
      currentStatus: "Completed",
      location: "India",
      score: "82.4%",
      description: "Completed Intermediate education with subjects including Mathematics, Physics, Chemistry, and Computer Basics. Developed strong analytical reasoning, quantitative problem-solving skills, and foundation in computational logic.",
      courses: ["Mathematics", "Physics", "Chemistry", "Computer Science Basics", "English"]
    },
    {
      id: "edu-sch-10",
      category: "school",
      institution: "Secondary High School (Editable in Admin)",
      degree: "Class 10th (Secondary School Examination)",
      duration: "2020 - 2022",
      currentStatus: "Completed",
      location: "India",
      score: "85.2%",
      description: "Completed secondary school curriculum with distinction in Science and Mathematics, laying the groundwork for higher scientific and technical pursuits.",
      courses: ["Mathematics", "Science", "Social Science", "English", "Hindi"]
    }
  ],

  skills: [
    { id: "sk-1", name: "Java", category: "Programming", level: "Proficient", percentage: 85, icon: "Code2", description: "OOP, Collections Framework, Multithreading, Exception Handling, JDBC" },
    { id: "sk-2", name: "HTML5", category: "Web Development", level: "Advanced", percentage: 92, icon: "Layout", description: "Semantic tags, accessibility, modern forms, responsive structuring" },
    { id: "sk-3", name: "CSS3 / Modern CSS", category: "Web Development", level: "Advanced", percentage: 88, icon: "Palette", description: "Flexbox, Grid, animations, Glassmorphism, Responsive UI, Tailwind" },
    { id: "sk-4", name: "JavaScript (ES6+)", category: "Web Development", level: "Proficient", percentage: 82, icon: "Terminal", description: "DOM manipulation, Async/Await, Fetch API, modern ES6+ features" },
    { id: "sk-5", name: "SQL & Databases", category: "Database & Tools", level: "Proficient", percentage: 80, icon: "Database", description: "Relational modeling, joins, subqueries, MySQL, table indexing, normalization" },
    { id: "sk-6", name: "Python", category: "Programming", level: "Intermediate", percentage: 75, icon: "FileCode", description: "Scripting, OOP basics, data manipulation libraries, automation scripts" },
    { id: "sk-7", name: "Data Analytics", category: "Analytical", level: "Intermediate", percentage: 72, icon: "BarChart3", description: "Data exploration, metric evaluation, statistical analysis basics" },
    { id: "sk-8", name: "DSA (Data Structures)", category: "Programming", level: "Intermediate", percentage: 74, icon: "Cpu", description: "Arrays, Linked Lists, Stacks, Queues, Searching, Sorting, Recursion" },
    { id: "sk-9", name: "MS Excel", category: "Database & Tools", level: "Advanced", percentage: 86, icon: "FileSpreadsheet", description: "Formulas, VLOOKUP/XLOOKUP, Pivot tables, data charts, reporting" },
    { id: "sk-10", name: "Video Editing", category: "Creative", level: "Proficient", percentage: 78, icon: "Film", description: "Timeline cutting, transitions, audio mixing, visual effects, storytelling" },
    { id: "sk-11", name: "AI Tools & Prompting", category: "Analytical", level: "Proficient", percentage: 85, icon: "Sparkles", description: "Modern LLMs, prompt engineering, AI code assistance, automation tools" },
    { id: "sk-12", name: "Git & Version Control", category: "Database & Tools", level: "Proficient", percentage: 80, icon: "GitBranch", description: "Repository management, branching, commit discipline, GitHub workflows" }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Event Booking & Management System",
      category: "Full Stack",
      featured: true,
      tagline: "Comprehensive web platform for venue scheduling, seat reservations & ticket generation",
      description: "A full-featured event discovery and booking portal built for organizers and attendees. Includes real-time seat availability checking, dynamic ticket confirmation generation, event category filtering, responsive booking flow, and an intuitive organizer management console to oversee bookings.",
      technologies: ["React", "JavaScript", "HTML5", "CSS3 / Tailwind", "Node.js Basics", "SQL"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
      screenshots: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000"
      ],
      videoUrl: "", // Supports video upload / URL in admin
      videoDemoText: "Video demo available: Shows interactive seat selection, ticket booking flow, and admin event dashboard in action.",
      github: "https://github.com/prashantsingh00887/event-booking-system",
      liveDemo: "https://prashweb.dev/events",
      highlights: [
        "Interactive seat selection and real-time availability updates",
        "Digital ticket confirmation with unique booking credentials",
        "Admin event management dashboard for creating, modifying, and monitoring events",
        "Mobile-first responsive UI built with modern glassmorphism aesthetic"
      ]
    },
    {
      id: "proj-2",
      title: "Library Management System",
      category: "Java & Database",
      featured: true,
      tagline: "Robust computerized library application for cataloging, issuing & fine automation",
      description: "An automated management application designed to handle end-to-end library operations. Simplifies book inventory tracking, student membership management, borrow and return logging, automated late fee calculation, and multi-criteria book search by title, author, or ISBN code.",
      technologies: ["Java", "JDBC", "MySQL / SQL", "Java Swing / UI", "OOP Principles"],
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
      screenshots: [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000"
      ],
      videoUrl: "",
      videoDemoText: "Walkthrough of book issuance, student member verification, and automated penalty fee calculation.",
      github: "https://github.com/prashantsingh00887/library-management-system",
      liveDemo: "",
      highlights: [
        "Normalized MySQL relational schema ensuring zero data redundancy",
        "Automated late fee computing based on configurable return grace periods",
        "Instant search filter across thousands of cataloged titles and author records",
        "Secured administrative authentication for librarian operations"
      ]
    },
    {
      id: "proj-3",
      title: "AI Resume Screening & Job Matching System",
      category: "AI & Analytics",
      featured: true,
      tagline: "Smart talent evaluation tool using text parsing & relevance score algorithms",
      description: "An intelligent application designed to streamline candidate shortlisting. Parses PDF and text resumes, extracts technical skills and educational backgrounds, compares candidate profiles against given job descriptions, and computes objective similarity match scores with actionable resume feedback.",
      technologies: ["Python", "Natural Language Processing (NLP)", "Data Analytics", "JavaScript", "Modern Web UI"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000",
      screenshots: [
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000"
      ],
      videoUrl: "",
      videoDemoText: "Video demonstration of resume document parsing, skill extraction, and candidate compatibility scoring.",
      github: "https://github.com/prashantsingh00887/ai-resume-screener",
      liveDemo: "https://prashweb.dev/ai-resume",
      highlights: [
        "Automated skill entity recognition from diverse resume formats",
        "Cosine similarity and TF-IDF matching against target job descriptions",
        "Visual breakdown highlighting matched skills versus missing requirements",
        "Recruiter dashboard to export ranked candidate shortlists"
      ]
    },
    {
      id: "proj-4",
      title: "Personal Finance & Expense Tracker",
      category: "Web Application",
      featured: false,
      tagline: "Interactive daily budget planner with visual spending charts & transaction logs",
      description: "A clean, modern financial organizer that helps users record income and expenses, organize spendings into intuitive categories (Food, Education, Tech, Travel), set monthly budget thresholds, and inspect analytical graphs of their spending habits.",
      technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "LocalStorage API", "Chart Visualization"],
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
      screenshots: [
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000"
      ],
      videoUrl: "",
      videoDemoText: "Demo showing real-time budget calculation, interactive donut charts, and CSV transaction export.",
      github: "https://github.com/prashantsingh00887/expense-tracker",
      liveDemo: "https://prashweb.dev/tracker",
      highlights: [
        "Zero-latency offline data persistence via structured browser storage",
        "Interactive graphical breakdown of expenditure distributions",
        "Budget warning notifications when category limits near 85%",
        "Print-friendly financial summary statement generator"
      ]
    },
    {
      id: "proj-5",
      title: "PrashWeb - Professional Portfolio & Digital Identity",
      category: "Full Stack",
      featured: true,
      tagline: "Personal portfolio with integrated offline AI Assistant & real-time CMS",
      description: "The very portfolio you are browsing! Engineered with modern React, responsive design, dark/light theme switching, a dedicated Admin content management system with passcode security, and an offline-first RAG AI assistant grounded purely on authentic portfolio data.",
      technologies: ["React", "Vite", "Tailwind CSS", "Lucide Icons", "Client-Side RAG AI", "LocalStorage CMS"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000",
      screenshots: [
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000"
      ],
      videoUrl: "",
      videoDemoText: "Overview of responsive layout, instant dark mode switching, AI assistant interaction, and live admin CMS updates.",
      github: "https://github.com/prashantsingh00887/prashweb-portfolio",
      liveDemo: "https://prashweb.dev",
      highlights: [
        "Custom portfolio RAG AI assistant that never invents fake data",
        "Protected Admin dashboard allowing complete real-time content editing without code changes",
        "Full support for unlimited projects, certificates, photos, and video uploads",
        "Modern glassmorphic UI with light/dark theme toggle and print-ready CV engine"
      ]
    }
  ],

  certificates: [
    {
      id: "cert-1",
      title: "Java Programming & OOP Fundamentals",
      organization: "HackerRank / Coding Platform",
      issueDate: "July 2025",
      credentialId: "HKR-JAVA-98214",
      verifyUrl: "https://hackerrank.com/certificates",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800",
      description: "Demonstrated proficiency in Core Java programming, object-oriented concepts, exception handling, data structures, and multithreading."
    },
    {
      id: "cert-2",
      title: "Responsive Web Design & Modern Frontend",
      organization: "freeCodeCamp / Web Academy",
      issueDate: "March 2025",
      credentialId: "FCC-WEB-77312",
      verifyUrl: "https://freecodecamp.org/certification",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      description: "Mastered semantic HTML5, modern CSS3 layout paradigms (Flexbox and Grid), media queries, accessible web development, and responsive typography."
    },
    {
      id: "cert-3",
      title: "SQL & Relational Database Design",
      organization: "Oracle Academy / Great Learning",
      issueDate: "November 2024",
      credentialId: "GL-SQL-44091",
      verifyUrl: "https://mygreatlearning.com/certificate",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
      description: "Validated hands-on knowledge in relational schema creation, data manipulation, complex subqueries, database normalization, and index optimization."
    },
    {
      id: "cert-4",
      title: "Python for Problem Solving & Data Basics",
      organization: "Coursera / University Partner",
      issueDate: "February 2025",
      credentialId: "CRS-PY-66129",
      verifyUrl: "https://coursera.org/verify",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      description: "Completed intensive coursework on Python fundamentals, functional modularity, data structures, and practical data analysis scripts."
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "1st Place - Annual College Speed Coding Challenge",
      category: "Achievements",
      date: "November 2025",
      description: "Clinched top honors among 60+ computer science and BCA student participants by solving logic and algorithm problems in record time.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800",
      badge: "Winner Trophy"
    },
    {
      id: "ach-2",
      title: "Live Project Demonstration at Campus Tech Fest",
      category: "Events",
      date: "January 2026",
      description: "Showcased the Event Booking & Management System live to visiting industry professionals and faculty, demonstrating real-time seat booking and tickets.",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // High-reliability sample video
      badge: "Tech Presentation"
    },
    {
      id: "ach-3",
      title: "Academic Excellence Recognition - BCA Semester",
      category: "Achievements",
      date: "June 2025",
      description: "Awarded a Certificate of Merit for consistent academic standing and outstanding performance across foundational computer application subjects.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      badge: "Honor Roll"
    },
    {
      id: "ach-4",
      title: "Campus Tech Club Workshop & Peer Mentoring",
      category: "College",
      date: "September 2024",
      description: "Co-conducted a practical hands-on session introducing junior batch students to HTML5, CSS3, and Git version control basics.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      badge: "Student Mentorship"
    },
    {
      id: "ach-5",
      title: "National Webinar on Generative AI & Web Innovation",
      category: "Memories",
      date: "December 2025",
      description: "Participated in an intensive tech symposium exploring advancements in generative AI models, vector search, and cloud computing infrastructures.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
      badge: "Conference"
    },
    {
      id: "ach-6",
      title: "Software Project Showcase & Team Collaboration",
      category: "Memories",
      date: "February 2026",
      description: "Collaborated with fellow tech students to build and present software solutions during intra-college project review week.",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      badge: "Project Video"
    }
  ],

  messages: [
    // Received visitor inquiries stored here
  ],

  adminConfig: {
    passcode: "prashant2026", // Default passcode, editable by Prashant
    cvFilename: "Prashant_Singh_CV.pdf",
    customPdfDataUrl: null // If Prashant uploads a custom PDF
  }
};
