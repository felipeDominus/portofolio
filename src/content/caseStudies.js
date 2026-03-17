export const CASE_STUDIES = [
  {
    id: 'secure-ai-credit-decisions',
    title: 'Secure AI-assisted credit decisions in a Tier-1 bank',
    role: 'Senior Software Engineer',
    domain: 'Credit decisioning · Retail banking',
    problem:
      'Manual credit review was slow, inconsistent, and difficult to audit. Leadership wanted to use automation and AI to accelerate decisions without creating new model risk or compliance issues.',
    approach: [
      'Partnered with product, risk, and architecture to map the existing decision workflow and identify low-risk candidates for automation.',
      'Introduced a service layer that combines deterministic rules with AI-assisted summarisation of supporting documents, keeping final decisions fully auditable.',
      'Implemented feature flags, regression tests, and detailed logging so every automated decision can be explained and rolled back if needed.',
    ],
    results: [
      'Reduced average credit decision time from two days to under 30 minutes.',
      'Improved consistency of decisions across teams, with clear audit trails for internal and external review.',
      'Created a reusable pattern for future AI-assisted workflows that security and risk were comfortable approving.',
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
      'Designed and implemented a \"Single Customer View\" microservice that aggregates data from multiple systems into a single optimised response.',
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
      'Improved security posture through centralised auth and simpler permission management.',
      'Set the foundation for future services to be added independently and safely.',
    ],
  },
]

