const fs = require('fs');
const path = require('path');

const units = {
  "1": {
    "title": "Cloud computing introduction: cloud computing fundamentals, history of cloud computing, cloud components, usage scenarios and applications.",
    "shortTitle": "Cloud computing intro",
    "questions": [
      {"text": "Describe the fundamental concepts of cloud computing, including its definition, characteristics, and applications.", "papers": ["DECAP470_2"], "isGd": false},
      {"text": "Define Cloud Computing.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Trace the historical development of cloud computing, along with the modern-day upgradation in cloud computing", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "What is cloud computing? Discuss the benefits of cloud computing over traditional computing.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false},
      {"text": "What is the difference between the Internet and the Cloud?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is on-demand computing?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "List and discuss about the various advantages and disadvantages of the Cloud Computing.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Discuss the advantages of cloud computing.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true}
    ]
  },
  "2": {
    "title": "Cloud computing architecture and models: why cloud computing matters, issues in cloud, cloud architecture, cloud storage, NIST cloud computing reference model, Cloud cube model.",
    "shortTitle": "Cloud arch & models",
    "questions": [
      {"text": "List two advantages of cloud storage.", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Identify and describe two key components of cloud computing architecture.", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Define Scalability in cloud computing.", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Discuss the reasons for wide adoption of cloud computing.", "papers": ["DECAP470_1", "DECAP470_2"], "isGd": false},
      {"text": "Describe the Cloud Cube Model explaining its service, deployment, and resource pool dimensions.", "papers": ["DECAP470_2"], "isGd": false},
      {"text": "What is Cloud Storage?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is a Private Cloud?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is a Hybrid Cloud?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Write a short note on cloud architecture.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is Cloud Computing? Discuss in detail that why Cloud Computing is important in today’s networked Environment?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "How Cloud Computing Provides Access to Databases, Files and Directories, Applications, and Cloud-Based Storage.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is Cloud Storage? Discuss the risks associated when storing data in the clouds.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true}
    ]
  },
  "3": {
    "title": "Cloud services: types of cloud services, service providers, software as a service, platform as a service, infrastructure as a service, database as a service, monitoring as a service, communication as services.",
    "shortTitle": "Cloud services",
    "questions": [
      {"text": "List two examples of cloud service providers.", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Discuss the major activities of cloud service provider in cloud computing.", "papers": ["cloud1"], "isGd": false},
      {"text": "Name any four organisation those provides SaaS cloud services.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "What assets of an organization can be monitored using MaaS (Monitoring-as-a-Service) model?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Discuss the cloud service management activity with the perspective of provisioning and configuration.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Describe the Software-as-a-Service models with its advantages.", "papers": ["DECAP470_1", "DECAP470_2"], "isGd": false},
      {"text": "Differentiate between platform as a services and infrastructure as a service in detail.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false},
      {"text": "What are Web Services?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is IaaS (Infrastructure as a Service)?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is PaaS (Platform as a Service)?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is SaaS (Software as a Service)?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is Amazon EC2?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Briefly describe Google App Engine.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Write a short note on IBM Clouds.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Define cloud services.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Briefly explain web services.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is a Cloud Service Model? List and discuss the different types of the models available by quoting examples of each type.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "How Google App Engine is providing Cloud based compute and platform services? How it is different from IBM based Cloud Services?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "List and discuss any Five Cloud based web services offered to clients in both social and commercial verticals.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Write a short note on:- i) Infrastructure as a Service ii) Platform as a Service iii) Software as a Service", "papers": ["GDINFOTECH_DECAP470"], "isGd": true}
    ]
  },
  "4": {
    "title": "Introduction to big data: big data, Hadoop framework, introduction to Mapreduce, phases of Mapreduce.",
    "shortTitle": "Intro to big data",
    "questions": [
      {"text": "Define Big Data.", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is MapReduce? Discuss working of MapReduce with its phases.", "papers": ["cloud1"], "isGd": false},
      {"text": "What are the major challenges associated with big data?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Discuss the operation modes of a Hadoop cluster.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Differentiate between Structured and Unstructured data.", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Describe the contrast between big data and traditional database methods.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false}
    ]
  },
  "5": {
    "title": "File system in cloud: Google file system, architecture of GFS, GFS operations, Hadoop distributed file system, HDFS architecture, HDFS operations, GFS vs HDFS.",
    "shortTitle": "File system in cloud",
    "questions": [
      {"text": "Explain the architectural design of Hadoop Distributed File System (HDFS) and its advantages for storing large datasets.", "papers": ["cloud1"], "isGd": false},
      {"text": "What is heartbeat in GFS?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Differentiate between GFS and HDFS.", "papers": ["DECAP470 (1)", "DECAP470_3", "DECAP470_2", "DECAP470_4"], "isGd": false},
      {"text": "Describe the role of the Hadoop Distributed File System (HDFS) in big data processing.", "papers": ["DECAP470_1", "DECAP470_2"], "isGd": false},
      {"text": "Illustrate the procedure for read operations in GFS.", "papers": ["DECAP470_2"], "isGd": false}
    ]
  },
  "6": {
    "title": "Collaborating using Google cloud: working on word processing applications, spreadsheet applications, online forms, storing and sharing files and other online content.",
    "shortTitle": "Google cloud collab",
    "questions": [
      {"text": "What Google Cloud product allows collaborative editing of word documents?", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Where are files stored in Google Cloud for collaboration?", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Elaborate on the use cases for Google Forms in collaborative data collection and analysis.", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Why do we use Google Docs?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Discuss about the Web-based word processing applications.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true}
    ]
  },
  "7": {
    "title": "Collaborating on event management: event management applications, exploring calendars, exploring schedules, task management applications, exploring to-do lists, exploring contact management.",
    "shortTitle": "Event mgmt collabs",
    "questions": [
      {"text": "Evaluate the benefits and potential drawbacks of using a cloud-based contact management system for event attendee information.", "papers": ["cloud1"], "isGd": false},
      {"text": "Discuss the role of task management tools with deadline tracking in keeping event planning on track.", "papers": ["DECAP470_2"], "isGd": false},
      {"text": "Short Notes i) ZOHO ii) Big Contacts Application", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "How you can explore contact management and CRM application?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Explore Online Scheduling Applications.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true}
    ]
  },
  "8": {
    "title": "Collaborating on Project Management: Project management, project management tools, exploring project management, choosing cloud-based project management tool.",
    "shortTitle": "Project Mgmt collab",
    "questions": [
      {"text": "What is project management?", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What considerations are required when organisation move to a web based project management tool?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "What is the primary goal of project management?", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Discuss the importance of user-friendliness and accessibility when choosing a cloud-based project management tool for team collaboration.", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Explain the different stages of a project life cycle and how collaboration tools can support each stage.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false}
    ]
  },
  "9": {
    "title": "Collaborating on Databases: understanding databases, working of databases, exploring online databases, exploring web-based databases, evaluating online databases.",
    "shortTitle": "Collab on Databases",
    "questions": [
      {"text": "What is a database?", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Explain different types of databases with suitable examples.", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "List the various types of databases.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Discuss the advantages of using web based databases?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "What is a database in simple terms?", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Explain the working of online database?", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Discuss the differences between working with a local database and cloud-based database for collaborative projects.", "papers": ["DECAP470_2"], "isGd": false},
      {"text": "Illustrate the three level architecture of database.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false}
    ]
  },
  "10": {
    "title": "Collaborate using web-based communication: web-based communication tools, exploring web mail services, instant messaging, web conferencing tools, social networks, groupware, blogs, wikis.",
    "shortTitle": "Web-based comms",
    "questions": [
      {"text": "What is the primary function of web mail services?", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Discuss the effectiveness of different web-based communication tools in fostering team engagement and promoting a collaborative work environment.", "papers": ["cloud1", "DECAP470_1"], "isGd": false},
      {"text": "What is a cloud collaboration tool?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "What is instant messaging service?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Describe the required features in a web conferencing service?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "List features of the web based email service solutions.", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Explain the features of google meet as a web conferencing services solution.", "papers": ["DECAP470_2"], "isGd": false},
      {"text": "Explain the different types of web-based communication tools and their suitability for various collaborative tasks.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false},
      {"text": "What are Cloud Blogs?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What do you mean by Collaborative Computing?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Define virtual communities in the cloud.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Discuss in detail that how Cloud Computing helps in managing, running and providing Collaboration and Communication based services seamlessly to the clients.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Discuss about Web conferencing services.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "How do we evaluate online groupware? Which tools we use to evaluate?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Explain all the ways/tools to collaborate online.", "papers": ["GDINFOTECH_DECAP470"], "isGd": true}
    ]
  },
  "11": {
    "title": "Virtualization concepts: virtualization, need for virtualization, types of virtualization, features of virtualization, working of virtualization, pros and cons of virtualization.",
    "shortTitle": "Virtualization concepts",
    "questions": [
      {"text": "Define virtualization.", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Describe the factors affecting the need of virtualization.", "papers": ["cloud1", "DECAP470_1"], "isGd": false},
      {"text": "Define storage virtualization.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Explain the concept of system virtualization. Discuss the advantages of virtualization.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Briefly discuss the processor virtualization.", "papers": ["DECAP470_1"], "isGd": false},
      {"text": "Explain the challenges that led to the development of virtualization technologies and how they address those challenges.", "papers": ["DECAP470_2"], "isGd": false},
      {"text": "Describe the major components of virtualization.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false}
    ]
  },
  "12": {
    "title": "Virtual machine: virtual machine properties, interpretation and binary translation, hypervisors, types of hypervisors, HLL VM, Xen, KVM, VMware, virtual box, hyper-V.",
    "shortTitle": "Virtual machine",
    "questions": [
      {"text": "List various types of Hypervisors used in modern-day computing.", "papers": ["cloud1", "DECAP470_1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "What is an hypervisor? Explain different types of hypervisors with suitable illustrations.", "papers": ["cloud1", "DECAP470_1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Elaborate on the functionalities of a Type1 (bare-metal) hypervisor compared to a Type2 (hosted) hypervisor.", "papers": ["DECAP470_2"], "isGd": false},
      {"text": "Explain in detail the key properties of virtual machines.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false}
    ]
  },
  "13": {
    "title": "Security and standards in Cloud: cloud security, security challenges, open cloud consortium, DMTF, standards for application developers, standards for messaging, standards for security.",
    "shortTitle": "Security & standards",
    "questions": [
      {"text": "Discuss the concept of OpenID?", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Explain different phases of Secure Software Development Life Cycle (SecSDLC).", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Define blockchain and its features.", "papers": ["DECAP470_1"], "isGd": false}
    ]
  },
  "14": {
    "title": "Application of cloud computing: end user access to cloud computing, cloud computing in areas of life, role of mobile internet devices.",
    "shortTitle": "App of cloud computing",
    "questions": [
      {"text": "Describe the role of mobile internet devices in accessing cloud computing services.", "papers": ["cloud1", "GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "Elaborate on the functionalities and benefits of cloud-based mobile applications compared to traditional app installations.", "papers": ["cloud1"], "isGd": false},
      {"text": "List the types of end users of cloud computing.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Discuss the end user access to the cloud computing.", "papers": ["DECAP470 (1)", "DECAP470_3"], "isGd": false},
      {"text": "Explore the applications of cloud services in the education sector, healthcare, and e-commerce. Explain how these services have transformed the respective areas.", "papers": ["DECAP470_2", "DECAP470_4"], "isGd": false},
      {"text": "What do you understand by accessing documents on the road?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true},
      {"text": "How Cloud Computing increases the revenues for a business based on Web Applications and Infrastructure?", "papers": ["GDINFOTECH_DECAP470"], "isGd": true}
    ]
  }
};

let navHTML = '';
let contentHTML = '';

Object.keys(units).forEach(key => {
  const unit = units[key];
  navHTML += `
      <a href="#unit-${key}" class="nav-item">
        <span class="nav-icon">0${key}</span>
        ${unit.shortTitle}
      </a>`;

  contentHTML += `
      <section id="unit-${key}" class="unit-section">
        <h2 class="unit-title">
          <span class="unit-badge">Unit ${key}</span>
          ${unit.title}
        </h2>
        <div class="questions-grid">`;

  unit.questions.forEach(q => {
    let paperTags = q.papers.map(p => {
      let tagClass = 'tag-p1';
      let tagText = p;
      if (p === 'cloud1') { tagClass = 'tag-p1'; }
      else if (p === 'DECAP470 (1)') { tagClass = 'tag-p2'; }
      else if (p === 'DECAP470_1') { tagClass = 'tag-p3'; }
      else if (p === 'DECAP470_2') { tagClass = 'tag-p4'; }
      else if (p === 'DECAP470_3') { tagClass = 'tag-p5'; }
      else if (p === 'DECAP470_4') { tagClass = 'tag-p6'; }
      else if (p === 'GDINFOTECH_DECAP470') { tagClass = 'tag-p7'; tagText = 'GDINFOTECH'; }
      return `<span class="paper-tag ${tagClass}">${tagText}</span>`;
    }).join('\n              ');

    let gdBadge = q.isGd ? `
              <span class="paper-tag tag-gdinfotech-indicator" title="Repeated in GDINFOTECH Question Paper">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                GDINFOTECH
              </span>` : '';

    contentHTML += `
          <div class="question-card">
            <div class="question-text">${q.text}</div>
            <div class="paper-tags">
              ${paperTags}${gdBadge ? '\n              ' + gdBadge : ''}
            </div>
          </div>`;
  });

  contentHTML += `
        </div>
      </section>`;
});

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DECAP470 - Cloud Computing | Question Bank</title>
  <meta name="description"
    content="Organized question bank for DECAP470 Cloud Computing. All questions sorted by unit from multiple past papers." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="../style.css" />
  <style>
    /* Override watermark for Cloud Computing */
    .site-header::after {
      content: 'DECAP470';
    }

    :root {
      --tag-p7-bg: rgba(251, 146, 60, 0.12);
      --tag-p7-c: #fb923c;
    }

    .tag-p7 {
      background: var(--tag-p7-bg);
      color: var(--tag-p7-c);
    }

    .tag-gdinfotech-indicator {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.65rem;
      padding: 3px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      letter-spacing: 0.03em;
      background: rgba(255, 215, 0, 0.15);
      color: #ffd700;
      border: 1px solid rgba(255, 215, 0, 0.3);
      text-transform: uppercase;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.1), inset 0 0 5px rgba(255, 215, 0, 0.05);
      text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
    }

    .tag-gdinfotech-indicator svg {
      color: #ffd700;
      filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
    }
  </style>
</head>

<body class="theme-cc">
  <div class="app-layout">
    <!-- Sidebar Navigation -->
    <nav class="sidebar">
      <div class="sidebar-header">
        <a href="../index.html" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Portal
        </a>
        <h1>Units</h1>
      </div>
      <div class="nav-links">
        ${navHTML}
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <header class="site-header">
        <div>
          <div class="course-code">DECAP470</div>
          <h1 class="page-title">Cloud Computing</h1>
        </div>
      </header>

      <div class="content-wrapper">
        ${contentHTML}
      </div>
    </main>
  </div>
</body>

</html>`;

fs.writeFileSync(path.join(__dirname, 'Cloud Computing/index.html'), htmlTemplate);
console.log('HTML written successfully.');
