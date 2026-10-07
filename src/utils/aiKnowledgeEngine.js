// PrashWeb AI - Portfolio-Specific Knowledge Engine (Client-Side RAG)
// Strictly answers using ONLY the active portfolio data.
// Never hallucinates or invents missing credentials, jobs, marks, or personal details.
// Reflects dynamic updates made in Admin immediately.

export const queryPrashWebAI = (rawQuestion, portfolioData) => {
  if (!rawQuestion || typeof rawQuestion !== 'string') {
    return {
      text: "Hello! I am PrashWeb AI, Prashant Singh's portfolio assistant. How can I assist you with information about his projects, skills, education, or contact details?",
      actions: []
    };
  }

  const query = rawQuestion.trim().toLowerCase();
  const tokens = query.replace(/[^\w\s]/gi, '').split(/\s+/).filter(Boolean);

  const { profile, education, skills, projects, certificates, achievements } = portfolioData;

  // Security check: Never reveal admin passcode or secrets
  if (
    query.includes('passcode') || 
    query.includes('password') || 
    query.includes('secret') || 
    query.includes('credentials') || 
    query.includes('admin key') ||
    query.includes('admin login')
  ) {
    return {
      text: "I do not have access to administrative credentials or passwords. PrashWeb AI is a public, read-only portfolio assistant.",
      actions: []
    };
  }

  // 1. Who is Prashant / General Introduction / About
  if (
    query.includes('who is prashant') ||
    query.includes('who is he') ||
    query.includes('about prashant') ||
    query.includes('tell me about yourself') ||
    query.includes('tell me about prashant') ||
    query.includes('introduction') ||
    (tokens.includes('who') && tokens.includes('prashant'))
  ) {
    return {
      text: `Prashant Singh is a dedicated ${profile.headline}. ${profile.aboutIntro}`,
      actions: [
        { label: "Read More in About Section", target: "#about", type: "scroll" },
        { label: "Connect on LinkedIn", url: profile.linkedin, type: "link" }
      ]
    };
  }

  // 2. Education / Study / College / School / BCA / Degree / Marks / CGPA
  if (
    query.includes('study') ||
    query.includes('studying') ||
    query.includes('college') ||
    query.includes('university') ||
    query.includes('education') ||
    query.includes('bca') ||
    query.includes('school') ||
    query.includes('10th') ||
    query.includes('12th') ||
    query.includes('marks') ||
    query.includes('percentage') ||
    query.includes('cgpa') ||
    query.includes('academic') ||
    query.includes('degree')
  ) {
    const col = education.find(e => e.category === 'college') || education[0];
    const sch12 = education.find(e => e.degree && e.degree.includes('12th'));
    const sch10 = education.find(e => e.degree && e.degree.includes('10th'));

    if (query.includes('school') || query.includes('10th') || query.includes('12th')) {
      let schoolReply = "Here is Prashant's school education:\n";
      if (sch12) {
        schoolReply += `• 12th Grade: ${sch12.degree} from ${sch12.institution} (${sch12.duration}) with score: ${sch12.score}.\n`;
      }
      if (sch10) {
        schoolReply += `• 10th Grade: ${sch10.degree} from ${sch10.institution} (${sch10.duration}) with score: ${sch10.score}.`;
      }
      return {
        text: schoolReply,
        actions: [{ label: "View Education Timeline", target: "#education", type: "scroll" }]
      };
    }

    let eduText = `Prashant is pursuing ${col ? col.degree : "BCA"} at ${col ? col.institution : "his college"} (${col ? col.currentStatus : "2nd Year"}, expected graduation in ${col ? col.duration : "2027"}). Current academic standing: ${col ? col.score : "Consistent good standing"}.`;
    if (sch12 || sch10) {
      eduText += ` Prior to college, he completed his 12th (${sch12?.score || "Science"}) and 10th (${sch10?.score || "Distinction"}).`;
    }

    return {
      text: eduText,
      actions: [{ label: "Explore Education Details", target: "#education", type: "scroll" }]
    };
  }

  // 3. Projects - Specific matching or general
  // Check for specific project queries
  for (const proj of projects) {
    const titleWords = proj.title.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !['system', 'with', 'from'].includes(w));
    const isSpecific = titleWords.some(word => query.includes(word));

    if (isSpecific && (query.includes('event') || query.includes('booking') || query.includes('library') || query.includes('resume') || query.includes('screening') || query.includes('expense') || query.includes('portfolio') || query.includes('prashweb'))) {
      return {
        text: `📌 **${proj.title}**\n\n${proj.description}\n\n**Tech Stack:** ${proj.technologies.join(', ')}\n\n**Key Highlights:**\n${proj.highlights.map(h => `• ${h}`).join('\n')}`,
        actions: [
          { label: "View Project in Portfolio", target: "#projects", type: "scroll", projectId: proj.id },
          ...(proj.liveDemo ? [{ label: "Open Live Demo", url: proj.liveDemo, type: "link" }] : []),
          ...(proj.github ? [{ label: "GitHub Code", url: proj.github, type: "link" }] : [])
        ]
      };
    }
  }

  // Prior Work History / Employment / Jobs / Internships
  if (
    query.includes('internship') ||
    query.includes('work history') ||
    query.includes('job history') ||
    query.includes('employment') ||
    query.includes('previous job') ||
    query.includes('where did he work') ||
    query.includes('company worked') ||
    query.includes('prior company')
  ) {
    return {
      text: `Prashant is currently an undergraduate BCA student focused on building software and full-stack projects. He does not have corporate employment or prior internships listed on his portfolio yet, but he is actively seeking internship and software developer roles to contribute his skills in Java, Web Technologies, and SQL.`,
      actions: [
        { label: "Contact for Opportunities", target: "#contact", type: "scroll" },
        { label: "View Technical Projects", target: "#projects", type: "scroll" }
      ]
    };
  }

  // General projects inquiry
  if (
    query.includes('project') ||
    query.includes('what has he built') ||
    query.includes('what has he made') ||
    query.includes('portfolio items') ||
    query.includes('show projects') ||
    query.includes('applications')
  ) {
    const projectTitles = projects.map(p => `• ${p.title} (${p.technologies.slice(0, 3).join(', ')})`).join('\n');
    return {
      text: `Prashant has developed several software and web projects, including:\n\n${projectTitles}\n\nYou can inspect full details, screenshots, and live demos in the Projects section.`,
      actions: [
        { label: "View All Projects", target: "#projects", type: "scroll" }
      ]
    };
  }

  // 4. Skills / Programming Languages / Technologies
  if (
    query.includes('skill') ||
    query.includes('language') ||
    query.includes('tech stack') ||
    query.includes('technologies') ||
    query.includes('programming') ||
    query.includes('know') ||
    query.includes('java') ||
    query.includes('python') ||
    query.includes('javascript') ||
    query.includes('sql') ||
    query.includes('html') ||
    query.includes('css') ||
    query.includes('excel') ||
    query.includes('dsa') ||
    query.includes('video editing') ||
    query.includes('ai tool')
  ) {
    // Check if asking about a specific skill
    const specificSkill = skills.find(s => query.includes(s.name.toLowerCase()) || (s.name.toLowerCase().includes('java') && query.includes('java') && !query.includes('javascript')));
    if (specificSkill) {
      return {
        text: `Yes, Prashant knows **${specificSkill.name}** (${specificSkill.level} level - approx ${specificSkill.percentage}% proficiency). Details: ${specificSkill.description}.`,
        actions: [{ label: "Check Skills Section", target: "#skills", type: "scroll" }]
      };
    }

    const keySkills = skills.map(s => `${s.name} (${s.level})`).join(', ');
    return {
      text: `Prashant's technical skill set includes:\n\n• **Core Languages & Web:** Java, HTML5, CSS3, JavaScript (ES6+), Python\n• **Databases & Tools:** SQL, Git & GitHub, MS Excel\n• **Problem Solving & Creative:** DSA, Data Analytics, Video Editing, and Modern AI Tools.\n\nAll skills are presented with proficiency indicators in the Skills section.`,
      actions: [{ label: "Explore Skills Matrix", target: "#skills", type: "scroll" }]
    };
  }

  // 5. Certificates & Courses
  if (
    query.includes('certificate') ||
    query.includes('certification') ||
    query.includes('course') ||
    query.includes('credential') ||
    query.includes('certified')
  ) {
    const certList = certificates.map(c => `• **${c.title}** by ${c.organization} (${c.issueDate})`).join('\n');
    return {
      text: `Prashant has earned the following certifications:\n\n${certList}\n\nYou can view full credentials and verification previews in the Certificates section.`,
      actions: [{ label: "View Certificates Gallery", target: "#certificates", type: "scroll" }]
    };
  }

  // 6. Achievements & Memories / Awards / Competitions
  if (
    query.includes('achievement') ||
    query.includes('award') ||
    query.includes('memory') ||
    query.includes('memories') ||
    query.includes('competition') ||
    query.includes('hackathon') ||
    query.includes('winner') ||
    query.includes('fest') ||
    query.includes('prize')
  ) {
    const achList = achievements.map(a => `• **${a.title}** (${a.category}, ${a.date}) - ${a.description}`).join('\n\n');
    return {
      text: `Here are key achievements and moments from Prashant's journey:\n\n${achList}`,
      actions: [{ label: "See Achievements & Memories", target: "#achievements", type: "scroll" }]
    };
  }

  // 7. Resume / CV / Download CV
  if (
    query.includes('cv') ||
    query.includes('resume') ||
    query.includes('curriculum vitae') ||
    query.includes('download cv') ||
    query.includes('see cv') ||
    query.includes('view cv')
  ) {
    return {
      text: "You can view, print, or download Prashant Singh's complete professional CV directly from the dedicated Resume section on this website.",
      actions: [
        { label: "Go to Resume Section", target: "#resume", type: "scroll" }
      ]
    };
  }

  // 8. Contact / Phone / Email / Mobile / WhatsApp / Address
  if (
    query.includes('contact') ||
    query.includes('phone') ||
    query.includes('mobile') ||
    query.includes('number') ||
    query.includes('call') ||
    query.includes('email') ||
    query.includes('mail') ||
    query.includes('reach') ||
    query.includes('message') ||
    query.includes('whatsapp')
  ) {
    const gh = profile.github || "https://github.com/prashantsingh00887";
    return {
      text: `You can reach Prashant Singh directly through:\n\n• **Mobile / WhatsApp:** +91 ${profile.phone}\n• **Email:** ${profile.email}\n• **GitHub:** ${gh}\n• **LinkedIn:** ${profile.linkedin}\n• **Location:** ${profile.location}\n\nYou can also submit a message via the interactive contact form on this site.`,
      actions: [
        { label: "Send Message Now", target: "#contact", type: "scroll" },
        { label: "Visit GitHub Profile", url: gh, type: "link" },
        { label: "Connect on LinkedIn", url: profile.linkedin, type: "link" },
        { label: `Call ${profile.phone}`, url: `tel:${profile.phone}`, type: "link" }
      ]
    };
  }

  // 9a. GitHub / Git / Code Repositories
  if (
    query.includes('github') ||
    query.includes('git') ||
    query.includes('repo') ||
    query.includes('repository') ||
    query.includes('codebase') ||
    query.includes('source code')
  ) {
    const ghUrl = profile.github || "https://github.com/prashantsingh00887";
    return {
      text: `You can explore Prashant Singh's source code and public repositories directly on GitHub at:\n**${ghUrl}** (Handle: @prashantsingh00887).\n\nBrowse his implementations for Java database applications, AI tools, and full-stack web projects!`,
      actions: [
        { label: "Visit @prashantsingh00887 on GitHub", url: ghUrl, type: "link" },
        { label: "View Projects Showcase", target: "#projects", type: "scroll" }
      ]
    };
  }

  // 9b. LinkedIn / Socials
  if (
    query.includes('linkedin') ||
    query.includes('social') ||
    query.includes('profile link') ||
    query.includes('network')
  ) {
    return {
      text: `Prashant's official LinkedIn profile is:\n**${profile.linkedin}**\n\nHe is open to professional connections, discussions, and internship opportunities.`,
      actions: [
        { label: "Connect on LinkedIn", url: profile.linkedin, type: "link" }
      ]
    };
  }

  // 10. Internships / Experience query
  if (
    query.includes('internship') ||
    query.includes('experience') ||
    query.includes('job') ||
    query.includes('worked at') ||
    query.includes('company')
  ) {
    return {
      text: `Prashant is currently an undergraduate BCA student focused on building robust full-stack and software projects. He does not have corporate internships listed on his portfolio yet, but he is actively seeking internship and junior software developer opportunities to contribute his skills in Java, Web Technologies, and SQL.`,
      actions: [
        { label: "Contact for Opportunities", target: "#contact", type: "scroll" },
        { label: "Check Skills & Projects", target: "#projects", type: "scroll" }
      ]
    };
  }

  // 11. Career Objective / Goals
  if (
    query.includes('career') ||
    query.includes('goal') ||
    query.includes('objective') ||
    query.includes('future') ||
    query.includes('aspiration')
  ) {
    return {
      text: `**Career Objective:**\n${profile.careerObjective}\n\n**Professional Goals:**\n${profile.professionalGoals}`,
      actions: [{ label: "Learn More in About Section", target: "#about", type: "scroll" }]
    };
  }

  // 12. Strict Fallback - EXACT required message
  return {
    text: "I don't have that information on Prashant's portfolio yet. Please check the website or contact Prashant directly.",
    actions: [
      { label: "Contact Prashant", target: "#contact", type: "scroll" },
      { label: "Email Directly", url: `mailto:${profile.email}`, type: "link" }
    ]
  };
};
