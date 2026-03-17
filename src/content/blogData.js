export const BLOG_POSTS = [
  {
    slug: 'secure-ai-in-fintech-7-pitfalls',
    title: 'Secure AI in Fintech: 7 Pitfalls to Avoid',
    date: '2025-01-10',
    readingTime: '8 min read',
    tags: ['Security', 'AI', 'Fintech'],
    excerpt:
      'A practical checklist for using AI and automation in regulated environments without creating new compliance and security risks.',
    sections: [
      {
        heading: 'Why AI in fintech is different',
        body: [
          'AI and automation can remove manual work from KYC, fraud monitoring, and internal operations—but in regulated environments every new workflow is also a new potential attack surface.',
        ],
      },
      {
        heading: '7 common pitfalls I see in banks and fintechs',
        body: [
          '1. Shadow AI tools with no central ownership or risk review.',
          '2. Moving sensitive data into third-party LLMs without data-minimisation or masking.',
          '3. Skipping threat modelling for new AI workflows because they are “just internal tools”.',
          '4. No audit trail for prompts, decisions, or overrides.',
          '5. Lack of regression testing when models or prompts change.',
          '6. No clear rollback or kill-switch when behaviour degrades.',
          '7. Treating AI as a magic box instead of part of a secure system design.',
        ],
      },
      {
        heading: 'A safer pattern for secure AI adoption',
        body: [
          'Start with a small, high-value workflow (e.g. summarising risk comments or triaging alerts) and wrap it with the same governance you would expect for any production service: access control, observability, testing, and rollback.',
        ],
      },
      {
        heading: 'If you want help applying this',
        body: [
          'My experience in European banking and regulated environments means I understand how to design secure AI and automation workflows that can pass security review and move the needle on risk, cost, or revenue.',
          'If you want to stress-test your current approach or design a secure pilot, you can reach out via LinkedIn to explore whether I can help.',
        ],
      },
    ],
  },
  {
    slug: 'cloud-microservices-security-readiness-checklist',
    title: 'Cloud & Microservices Security Readiness Checklist',
    date: '2025-01-05',
    readingTime: '6 min read',
    tags: ['Cloud', 'Microservices', 'Security'],
    excerpt:
      'A concise checklist I use when reviewing microservices platforms in banks and payment providers before they scale further.',
    sections: [
      {
        heading: 'What this checklist is for',
        body: [
          'This is the lens I use when reviewing microservices platforms in regulated environments—before they grow from a few services into dozens of critical workloads.',
        ],
      },
      {
        heading: 'Architecture & boundaries',
        body: [
          'Clear ownership per service, well-defined APIs, and data domains that avoid “god services”.',
          'Authentication and authorisation handled consistently at the edge (API gateway, BFF) instead of ad-hoc in each service.',
        ],
      },
      {
        heading: 'Secure SDLC & environments',
        body: [
          'Automated dependency and CVE scanning in CI, with clear ownership for fixing issues.',
          'Environment parity—what you test looks like what you run in production (containers, config, feature flags).',
        ],
      },
      {
        heading: 'Observability & incident readiness',
        body: [
          'Centralised logs and metrics with dashboards for latency, errors, and saturation.',
          'Runbooks and on-call rotations that assume partial failures, not just full outages.',
        ],
      },
      {
        heading: 'Need an outside perspective?',
        body: [
          'If you would like an external perspective on your microservices platform or migration plan, I have the skills and experience to perform short, focused architecture and readiness reviews for engineering leaders in banks and fintechs.',
        ],
      },
    ],
  },
]

