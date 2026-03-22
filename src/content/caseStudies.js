export const CASE_STUDIES = [
  {
    id: 'automated-credit-decisioning-tier1',
    title: 'Automated Credit Decisioning Systems (Tier-1 Banking)',
    role: 'Senior Software Engineer',
    domain: 'Credit Decisioning · Retail Banking',
    problem:
      'Manual credit reviews were a major bottleneck, taking up to 7 days to process small loan applications. The process was slow, prone to human error, and difficult to audit at scale. Leadership required a high-integrity automation solution that could accelerate decisions while strictly adhering to complex regulatory and risk frameworks.',
    approach: [
      'Systems Architecture: Partnered with Risk and Architecture to decompose manual workflows into a high-performance, rules-based engine, defining strict boundaries for automated approvals.',
      'Deterministic Logic: Engineered a robust service layer to execute complex credit-scoring models. By moving from manual review to programmatic, logic-driven processing.',
      'Operational Safety: Implemented advanced feature flagging, comprehensive regression testing suites, and structured telemetry. This ensured that every automated decision could be analysed, defended to regulators, or rolled back instantly if needed.',
    ],
    results: [
      'Efficiency: Reduced credit decisioning turnaround from 7 days to under 2 hours.',
      'Scalability: Established a modular, reusable framework for automated financial workflows that set the gold standard for security and risk approvals within the bank.',
    ],
  },
  {
    id: 'payments-latency-single-customer-view',
    title: '87.5% latency reduction with Single Customer View',
    role: 'Senior Software Engineer',
    domain: 'Payments · Core banking',
    problem:
      'Payment APIs were slowed down by multiple synchronous calls to legacy systems. Customers and internal teams experienced delays, and incident response was difficult due to poor observability.',
    approach: [
      'Designed and implemented a Single Customer View microservice that aggregates data from multiple systems into a single optimised response.',
      'Introduced caching, parallel calls, and circuit breakers, while keeping strict controls around data access and audit logging.',
      'Improved metrics and dashboards so engineering and support teams could see the impact of changes in real time.',
    ],
    results: [
      'Reduced API latency by 87.5% per transaction.',
      'Improved reliability and reduced time to detect performance regressions.',
      'Created a pattern for future services that need secure, high-performance data aggregation.',
    ],
  },
  {
    id: 'microservices-migration-keycloak-stripe',
    title: 'From monolith to microservices with secure auth and payments',
    role: 'Software Engineer',
    domain: 'SaaS platform · Subscriptions',
    problem:
      'A growing employment platform was limited by a monolithic codebase with ad-hoc authentication and no flexible subscription model.',
    approach: [
      'Led the migration from a monolithic architecture to microservices, focusing first on authentication and billing boundaries.',
      'Implemented Keycloak-based authentication for secure API access and social login, centralising identity and access control.',
      'Integrated Stripe to deliver the platform’s first subscription and payment infrastructure with clear separation of concerns.',
    ],
    results: [
      'Unlocked new subscription offerings without destabilising the core application.',
      'Modernized security infrastructure by centralizing authentication and optimizing permission management for improved auditability.',
      'Set the foundation for future services to be added independently and safely.',
    ],
  },
]

