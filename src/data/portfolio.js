/**
 * Portfolio content and static data.
 * Keeps App.jsx focused on composition.
 */

export const JOBS = [
  {
    company: 'Bank of America',
    role: 'Senior Software Engineer / DevOps',
    dates: 'November 2024 – Present',
    domain: 'European Risk Finance Technology (ERFT)',
    items: [
      { label: 'DevSecOps & Security', text: 'Automated weekly CVE scanning and reporting to identify and remediate vulnerabilities before formal security audits.' },
      { label: 'Advanced Observability', text: 'Designed Splunk dashboards to monitor UI performance, screen-load times, and system errors with month-over-month/year-over-year comparative analysis.' },
      { label: 'Production Support', text: 'Engineered automated Splunk alerting for HTTP errors with real-time email notifications, significantly reducing MTTR.' },
      { label: 'CI/CD & Testing', text: 'Championed "Shift-Left" culture with automated unit, integration, and UAT suites in Docker. Maintained 80% code coverage, reduced deployment failures by 80%.' },
      { label: 'Developer Experience', text: 'Engineered Kubernetes-based solution for UI team to eliminate local backend environments.' },
      { label: 'Release Orchestration', text: 'Designed cascading release solutions using Ansible and Bitbucket for seamless environment synchronisation.' },
      { label: 'AI Productivity', text: 'Trained GitHub Copilot Agents with custom skills to automate routine tasks and maintain architectural standards.' },
    ],
  },
  {
    company: 'AIB',
    role: 'Senior Software Engineer',
    dates: 'August 2019 – November 2024',
    domain: 'Account Services and Payments',
    items: [
      'Led Java Microservices for SEPA Instant Payments, ensuring high availability and compliance in Agile environment.',
      'Reduced API latency by 87.5% with "Single Customer View" and parallel processing.',
      'Improved nCino credit decision speed by over 96% (2-day manual process → 30-minute automated approval).',
      'Designed IBM Db2 solutions, stored procedures, and database normalisation for high-volume banking data.',
      'Migrated legacy unit tests to JUnit 5 and resolved Sonar quality gate issues.',
    ],
  },
  {
    company: 'Test Triangle Ltd',
    role: 'Software Engineer',
    dates: 'January 2019 – August 2019',
    domain: 'Employment networking service (contracts)',
    items: [
      'Spearheaded Techfynder.com migration from monolith to microservices architecture.',
      'Engineered authentication microservices using Keycloak for secure API access and social integrations.',
      "Integrated Stripe API to build the platform's first subscription and payment infrastructure.",
    ],
  },
]

export const CONTRIBUTIONS = [
  { label: 'Digital Transformation', text: 'Led the migration of monolithic banking systems to microservices and Kubernetes, resulting in a 96% improvement in credit decision speeds.' },
  { label: 'Performance Engineering', text: 'Architected "Single Customer View" solutions that reduced API transaction latency by 87.5% (2.8s per transaction).' },
  { label: 'DevSecOps & Automation', text: 'Automated CVE vulnerability scanning and post-deployment smoke testing, reducing deployment failures by 80% and ensuring proactive security compliance.' },
  { label: 'Observability & DevEx', text: 'Engineered Kubernetes-based API solutions and Splunk comparative analytics that eliminated local environment overhead and accelerated production issue resolution (MTTR).' },
]

export const SKILL_GROUPS = [
  { label: 'Languages & Frameworks', skills: ['Java 8 & 17', 'Spring Boot', 'Hibernate', 'MyBatis', 'JUnit 5', 'Mockito', 'Angular 18'] },
  { label: 'Architecture', skills: ['Microservices', 'Kafka', 'RabbitMQ', 'IBM MQ', 'REST APIs', 'Oracle', 'IBM Db2', 'MongoDB'] },
  { label: 'DevOps & Cloud', skills: ['Kubernetes', 'Docker', 'OpenShift', 'Ansible', 'Jenkins', 'CI/CD', 'Linux RHEL 9'] },
  { label: 'Observability & Security', skills: ['Splunk', 'CVE Scanning', 'OpenTelemetry', 'Grafana', 'GitHub Copilot'] },
  {
    label: 'Data & AI',
    skills: [
      'AI Fundamentals',
      'Data Literacy',
      'AI solutions for business',
      'AI tooling & enablement',
      'AI agents & workflow design',
      'AI fit assessments (when not to use AI)',
    ],
  },
  { label: 'Tools', skills: ['Git', 'Jira', 'Agile/Scrum', 'OpenAPI', 'Postman', 'JMeter'] },
]

export const PROJECTS = [
  {
    title: 'Gym Attendance Management Microservice',
    href: 'https://github.com/FelipeMello/gym-attendance-api',
    description: 'REST API using Spring Boot to manage gym attendance and apply discounts. Features: create/get memberships, record attendance, discount eligibility.',
    tech: ['Docker', 'Spring Boot', 'PostgreSQL', 'JUnit', 'Swagger'],
  },
  {
    title: 'API Gateway Camp',
    href: 'https://github.com/FelipeMello/api-gateway-camp',
    description: 'Spring Cloud Gateway configuration: routing, load balancing, circuit breaker, rate limiting, auth, CORS, centralized entry point.',
    tech: ['Spring Cloud Gateway', 'Spring Boot', 'Docker', 'JUnit'],
  },
  {
    title: 'Campsite API Microservice',
    href: 'https://github.com/FelipeMello/api-camp',
    description: 'REST API for campsite management: registration, updates, media uploads, comments.',
    tech: ['Spring Boot', 'REST API'],
  },
]

export const EDUCATION = [
  {
    degree: 'Master of Science in Computer Science (Advanced Software Development) – Part-Time',
    institution: 'Technological University Dublin',
    dates: 'September 2023 – Present',
    focus: 'Web Applications Architectures, Secure Systems Development, Programming Paradigms, Advanced Databases, Systems Architecture, Software Design, Research Methods, Dissertation',
  },
  {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'College of Computing Technology',
    dates: 'September 2015 – September 2018',
    focus: 'Interactive Web Applications, OOP, Design Patterns, Network Forensics, Big Data, Cloud Computing, Data Structures & Algorithms',
  },
]

/** Certifications with verification URLs (opens in new tab). */
export const CERTIFICATIONS = [
  { title: 'AI Fundamentals', issuer: 'DataCamp', date: null, url: 'https://www.datacamp.com/skill-verification/AIF0020684163736' },
  { title: 'Data Literacy', issuer: 'DataCamp', date: null, url: 'https://www.datacamp.com/skill-verification/DL0037750883045' },
  { title: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift', issuer: 'IBM | Coursera', date: 'July 2025', url: 'https://www.coursera.org/account/accomplishments/records/OGV3BDCZTDAJ' },
  { title: 'Introduction to DevOps', issuer: 'IBM | Coursera', date: 'February 2024', url: 'https://coursera.org/verify/8EKYC2AA4L7A' },
  { title: 'Object Oriented Programming in Java Specialization', issuer: 'Duke University | Coursera', date: null, url: 'https://www.coursera.org/account/accomplishments/specialization/USHT8ZNMAMBK' },
  { title: 'Web Development with Java Spring Framework', issuer: 'Peter the Great St. Petersburg Polytechnic University | Coursera', date: null, url: 'https://coursera.org/verify/AUV7T5CTG23N' },
  { title: 'Java Programming and Software Engineering Fundamentals Specialization', issuer: 'Duke University | Coursera', date: null, url: 'https://www.coursera.org/account/accomplishments/specialization/HBBTE37DY8P9' },
  { title: 'Learning Spring with Spring Boot', issuer: 'LinkedIn Learning', date: null, url: 'https://www.linkedin.com/learning/certificates/b53d39673dbff8b5f92fa93c7f52ab5731e3df2e320ab902a16fd1a6f32f164a?trk=backfilled_certificate' },
  { title: 'The Bits and Bytes of Computer Networking', issuer: 'Google | Coursera', date: 'September 2018', url: 'https://www.coursera.org/account/accomplishments/verify/7PLP3VS5Z6WK' },
  { title: 'Technical Support Fundamentals', issuer: 'Google | Coursera', date: 'June 2018', url: 'https://www.coursera.org/account/accomplishments/verify/GSAGNUTAWGTU' },
  { title: 'Meet Your Brain: A Short Introduction to Neuroscience', issuer: 'Udemy', date: null, url: 'http://ude.my/UC-4Q9PIBF5' },
]

export const LANGUAGES = [
  { name: 'English', level: 'Fluent' },
  { name: 'Portuguese', level: 'Native' },
  { name: 'Spanish', level: 'Intermediate' },
]

export const ADDITIONAL_INFO = [
  { label: 'Hobbies', text: 'Family time, exercise, reading, continuous learning through online courses' },
  { label: 'Volunteering', text: 'Shoebox Appeal Charity, October 2022 – Distributed and prepared gift boxes for children' },
  { label: 'Mentorship', text: 'Mentored first-year students in Java Programming at College of Computing Technology' },
]

export const SUMMARY_TEXT =
  "Results-driven Senior Software Engineer with over 7 years of experience in designing, delivering, and modernising robust, scalable backend architectures. Expert in the full development lifecycle, specialising in Java microservices, Kubernetes, and DevOps automation. Proven track record of enhancing Developer Experience (DevEx) and driving \"Shift-Left\" testing and security strategies. Currently pursuing a part-time Master's in Computer Science to integrate emerging technologies into enterprise-level solutions."
