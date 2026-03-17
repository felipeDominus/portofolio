export const BLOG_POSTS = [
  {
    slug: 'secure-ai-in-fintech-7-pitfalls',
    title: 'Secure AI in Fintech: 7 Pitfalls to Avoid',
    date: '2025-01-10',
    readingTime: '9 min read',
    category: 'AI',
    tags: ['Security', 'AI', 'Fintech'],
    excerpt:
      'Why, when, and how to deploy AI and automation in regulated financial environments without creating new compliance and security risks—framed as seven concrete pitfalls and a safer adoption pattern.',
    sections: [
      {
        heading: 'The problem and who this is for',
        body: [
          'Banks, payment providers, and fintechs are under pressure to use AI for efficiency and new products, but every new AI workflow is also a new attack surface and a potential compliance risk. This post is for heads of engineering, risk, and security who want a concise, practical view of why secure AI in fintech is different, when to worry most, how pitfalls show up in real projects, and what value a safer pattern brings. It is informed by OWASP guidance on secure AI and model operations and by NIST’s AI Risk Management Framework, but written as a checklist rather than a formal standard.',
        ],
      },
      {
        heading: 'Why AI in fintech is different',
        body: [
          'AI and automation can remove manual work from KYC, fraud monitoring, and internal operations—but in regulated environments every new workflow is also a new potential attack surface and a decision that may be scrutinised by regulators or auditors. AI systems are socio-technical: they combine data, models, and human processes, and failures can create financial loss, unfair outcomes, or data leakage.',
          'NIST’s AI Risk Management Framework describes AI risks as different from traditional software because behaviour depends heavily on data and context, and OWASP’s Secure AI Model Ops Cheat Sheet and AI security work catalogue concrete threats like data poisoning, prompt injection, model extraction, and insecure model APIs. In finance, you also have to align use cases with risk appetite and regulatory expectations, not just technical feasibility.',
        ],
      },
      {
        heading: '7 common pitfalls in banks and fintechs',
        body: [
          '1. Shadow AI tools with no central ownership or risk review (teams adopting SaaS AI or LLM features without security, risk, or data protection involvement).',
          '2. Moving sensitive data into third-party LLMs without data-minimisation, masking, or clear purpose limitation.',
          '3. Skipping threat modelling for new AI workflows because they are “just internal tools” and not seen as production systems.',
          '4. No audit trail for prompts, decisions, or human overrides—so it is hard to reconstruct what happened when something goes wrong.',
          '5. Lack of regression testing when models, prompts, or providers change; behaviour drifts without anyone noticing until customers or operations teams feel it.',
          '6. No clear rollback or kill-switch for AI-driven decisions or automations, so incidents drag on longer than they should.',
          '7. Treating AI as a magic box instead of part of a secure system design with controls around access, inputs, outputs, and monitoring.',
        ],
      },
      {
        heading: 'Example: starting with a narrow, auditable workflow',
        body: [
          'A concrete starting point is an internal assistant that summarises risk comments or triages alerts for analysts, without making final decisions. You define who can access it, what data it can see (e.g. masked or minimised inputs), what tools it has (e.g. read-only access to specific systems), and how you log prompts, outputs, and overrides. When the model, prompts, or provider change, you run a focused regression suite on representative cases before rollout and keep a simple kill-switch (feature flag or routing rule) to fall back to the previous version.',
        ],
      },
      {
        heading: 'A safer pattern for secure AI adoption',
        body: [
          'Start with a small, high-value workflow and treat it like any other production service: clear ownership, access control, observability, testing, and rollback. Align with OWASP’s themes for secure AI and agentic systems—strong audit trails, clear tool permissions, least-privilege access to systems, and human-in-the-loop oversight for high-risk actions.',
          'Use NIST’s AI RMF ideas as a backdrop: understand the context and risks (“Map”), measure impact where possible (“Measure”), and manage AI like part of your broader risk and control framework (“Manage”), not as an isolated experiment.',
        ],
      },
      {
        heading: 'Summary and takeaways',
        body: [
          'Secure AI in fintech is about more than model quality: it is about ownership, data handling, auditability, testing, and the ability to roll back when behaviour drifts. The seven pitfalls above show where AI projects most often go wrong in banks and fintechs; starting with a narrow, auditable workflow and applying existing security and risk practices is usually a safer path than broad, uncontrolled rollouts. The framing here is informed by OWASP’s Secure AI Model Ops and AI agent security work and by NIST’s AI Risk Management Framework; the concrete pitfalls and examples are my own experience.',
        ],
      },
      {
        heading: 'If you want help applying this',
        body: [
          'My experience in European banking and regulated environments means I understand how to design secure AI and automation workflows that can pass security review and move the needle on risk, cost, or revenue.',
          'If you want to stress-test your current approach or design a secure pilot, you can reach out via LinkedIn to explore whether I can help.',
        ],
      },
      {
        heading: 'References',
        body: [
          {
            label: 'OWASP – Secure AI Model Ops Cheat Sheet',
            href: 'https://cheatsheetseries.owasp.org/cheatsheets/Secure_AI_Model_Ops_Cheat_Sheet.html',
          },
          {
            label: 'OWASP – AI Agent Security Cheat Sheet',
            href: 'https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html',
          },
          {
            label: 'NIST – AI Risk Management Framework (AI RMF 1.0)',
            href: 'https://www.nist.gov/itl/ai-risk-management-framework',
          },
        ],
      },
    ],
  },
  {
    slug: 'cloud-microservices-security-readiness-checklist',
    title: 'Cloud & Microservices Security Readiness Checklist',
    date: '2025-01-05',
    readingTime: '7 min read',
    category: 'Cloud',
    tags: ['Cloud', 'Microservices', 'Security'],
    excerpt:
      'Why, when, and how to run a readiness check on your microservices platform—with a practical checklist grounded in NIST and OWASP—before you scale from a few services to dozens of critical workloads.',
    sections: [
      {
        heading: 'The problem and who this is for',
        body: [
          'Microservices platforms in banks and payment providers often start as a handful of services, then grow into dozens of critical workloads. Without a deliberate readiness check, gaps in boundaries, auth, secure SDLC, and observability become harder and costlier to fix later. This post is for engineering leads, platform and security teams, and architects who want a clear why, when, how, and value for a short readiness checklist—grounded in NIST SP 800-204 (security strategies for microservices-based systems) and the OWASP Microservices Security Cheat Sheet.',
        ],
      },
      {
        heading: 'Why use a readiness checklist?',
        body: [
          'NIST SP 800-204 and related NIST work (e.g. service-mesh and DevSecOps guidance) stress authentication and access management, secure communication, security monitoring, and availability and resiliency (e.g. circuit breakers, throttling) as core concerns for microservices. OWASP’s microservices guidance emphasises authentication and authorisation at design time, edge- and service-level auth patterns, identity propagation between services, and logging for accountability and detection.',
          'A short checklist forces the right conversations before scale: do we have clear ownership and API boundaries? Is auth handled consistently at the edge and where needed at service level? Are we scanning dependencies and testing in an environment that resembles production? Can we observe and respond to partial failures? Treat the checklist as a lens to spot gaps early, not as a replacement for a full standard or a formal risk assessment.',
        ],
      },
      {
        heading: 'When to run this check',
        body: [
          'Use it before scaling from a few services to many: e.g. before a major product launch, before onboarding several new teams to the platform, or when planning a migration from monoliths to microservices. It also fits internal or external architecture reviews—when security or compliance ask “how ready is this platform?” or when you want an outside perspective before committing more investment.',
          'The checklist is not a one-time audit. Revisit it when you add new classes of workloads (e.g. payment vs. reporting), when you introduce a service mesh or a new API gateway, or when ownership or team boundaries change.',
        ],
      },
      {
        heading: 'How: the checklist in practice',
        body: [
          '1. Architecture & boundaries — Clear ownership per service, well-defined APIs, and data domains that avoid “god services”. Authentication and authorisation handled consistently at the edge (API gateway, BFF); OWASP recommends defence in depth, with coarse-grained auth at the edge and finer-grained enforcement at service level where needed. Avoid ad-hoc, per-service auth with no shared model.',
          '2. Secure SDLC & environments — Automated dependency and CVE scanning in CI, with clear ownership for fixing issues. Environment parity: what you test (containers, config, feature flags) should resemble production so that security and behaviour are validated in a realistic setting. NIST’s microservices and DevSecOps publications align with integrating security into the pipeline and environment consistency.',
          '3. Observability & incident readiness — Centralised logs and metrics with dashboards for latency, errors, and saturation. OWASP’s microservices cheat sheet stresses logging for accountability and traceability and recommends decoupling log collection (e.g. agents, message broker) from application code so that logging failures do not take down services. Runbooks and on-call rotations that assume partial failures, not just full outages.',
        ],
      },
      {
        heading: 'Example: a payment provider adding a new service',
        body: [
          'A typical scenario: a team adds a new microservice for a payment flow. The checklist prompts: Who owns this service and its API contract? Is the new service behind the same API gateway and auth model (e.g. tokens or mTLS) as the rest? Is it included in dependency and image scanning in CI? Is it deployed with the same observability stack (logs, metrics, traces) and is there a runbook and owner for “this service is slow or failing”? Running through the three areas—boundaries, SDLC, observability—surfaces missing contracts, ad-hoc auth, or missing runbooks before the service becomes critical.',
        ],
      },
      {
        heading: 'Value for engineering, security, and business',
        body: [
          'For engineering: fewer surprises at scale. You catch boundary and auth drift, missing scanning, or observability gaps before they become incidents or audit findings.',
          'For security and compliance: the checklist is informed by NIST and OWASP themes (auth, boundaries, secure pipeline, logging). It supports “show how you manage risk” conversations and helps prioritise hardening work.',
          'For business: reducing readiness risk before scaling reduces the chance of costly rework, outages, or regulatory friction. A short, repeatable check is a low-cost way to align platform investment with security and operational expectations.',
        ],
      },
      {
        heading: 'Summary and takeaways',
        body: [
          'A microservices security readiness checklist should cover architecture and boundaries (ownership, APIs, auth at edge and service), secure SDLC and environments (scanning, parity), and observability and incident readiness (logs, metrics, runbooks, partial failure). Use it before scaling or when ownership changes; ground it in NIST and OWASP so the conversation is traceable to standards. The structure and emphasis above are informed by NIST SP 800-204 and the OWASP Microservices Security Cheat Sheet; the exact checklist and value framing are my own.',
        ],
      },
      {
        heading: 'Need an outside perspective?',
        body: [
          'If you would like an external perspective on your microservices platform or migration plan, I have the skills and experience to perform short, focused architecture and readiness reviews for engineering leaders in banks and fintechs.',
        ],
      },
      {
        heading: 'References',
        body: [
          {
            label: 'NIST – SP 800-204: Security Strategies for Microservices-based Application Systems',
            href: 'https://csrc.nist.gov/pubs/sp/800/204/final',
          },
          {
            label: 'OWASP – Microservices Security Cheat Sheet',
            href: 'https://cheatsheetseries.owasp.org/cheatsheets/Microservices_Security_Cheat_Sheet.html',
          },
        ],
      },
    ],
  },
  {
    slug: 'secure-dev-workstations-docker-postgres',
    title: 'Secure Developer Workstations with Docker',
    date: '2025-01-15',
    readingTime: '10 min read',
    category: 'Security',
    tags: ['Security', 'Docker', 'DevOps', 'PostgreSQL', 'Full Stack', 'React', 'Spring Boot'],
    excerpt:
      'Why, when, and how to run your dev toolchain in containers—with a concrete React, Spring Boot, and PostgreSQL setup—so workstations stay reproducible and easier to secure, for developers and teams.',
    sections: [
      {
        heading: 'The problem and who this is for',
        body: [
          'Developer laptops that run every runtime and database directly become hard to patch, hard to reproduce, and attractive targets for supply-chain and credential theft. A practical alternative is to treat the machine as a thin client and run the real toolchain inside Linux containers, with the IDE attached remotely. This post is for developers, platform engineers, and security or engineering leads in fintech and regulated environments who want a clear why, when, how, and value—grounded in NIST workstation guidance, OWASP and Docker container security practices, and vendor docs.',
        ],
      },
      {
        heading: 'Why use containers for developer workstations?',
        body: [
          'NIST guidance on securing workstations (e.g. SP 800-46 Rev. 2 and related build-pipeline advice) stresses strong access control, least privilege, keeping software updated, and protecting credentials. Installing Node, Java, Postgres, and dozens of tools directly on the host works against that: versions drift, machines diverge, and secrets and dependencies mix with personal use.',
          'Containers give you a single, declarative environment: one dev image plus a database service, both defined in code. You get dependency isolation, a clear boundary between “my OS” and “project tooling”, and the ability to rebuild or throw away the environment without touching the host. Docker’s own developer-workstation best practices emphasise using trusted images, isolating and restricting permissions, and keeping environments updated—all easier when the toolchain lives in a defined image rather than scattered across the host.',
        ],
      },
      {
        heading: 'When to use this pattern (and when not)',
        body: [
          'Use containerised dev workstations when you want a reproducible, team-wide stack (e.g. React + Spring Boot + Postgres), when you need to reduce “works on my machine” and speed up onboarding, or when security or compliance expect a defined, patchable dev environment. It fits full stack web development, API and service development, and CI-aligned local testing.',
          'Containers share the host kernel, so they do not replace a patched host, least-privilege use, or careful credential handling. For truly untrusted or high-risk code, you may still need VMs or dedicated build systems. Do not expose the Docker daemon socket to containers (OWASP and Docker both warn this effectively grants root on the host). Treat dev containers as an improvement over a messy host install, not as a full replacement for host and network security.',
        ],
      },
      {
        heading: 'How to do it: secure dev container with Postgres',
        body: [
          '1. Base image from a maintained Linux (e.g. Debian or Alpine) with security updates; keep host and Docker up to date (OWASP Docker Cheat Sheet stresses this to mitigate container escape risks).',
          '2. Install Node LTS, OpenJDK, git, and psql in the image; create a non-root dev user and run the app as that user (OWASP and Docker recommend not running as root in containers).',
          '3. Add Postgres as a service in docker-compose on an internal network; do not publish it to the host unless needed. Use a dedicated DB user and database for the app.',
          '4. Mount only the project directory into the container; avoid mounting your whole home or broad credential paths. Use SSH agent forwarding or scoped keys instead of copying private keys into the image.',
          '5. Rebuild the dev image periodically to pick up base image and dependency patches.',
          '6. Use VS Code Dev Containers or Remote – SSH so the IDE runs language servers, builds, and tests inside the container; the laptop runs only the editor UI and client. Heavy dependencies and secrets stay in the container.',
        ],
      },
      {
        heading: 'Example: React, Spring Boot, and PostgreSQL in one dev setup',
        body: [
          'A concrete setup is a full stack app: React front end, Java Spring Boot API, PostgreSQL database. The React app (via Node) and the Spring Boot API run inside the same dev image; Postgres runs as a separate container on an internal Docker network. No database on the host; the Spring app connects over the Docker network with credentials from env or a secret store.',
          'React, used correctly, gives built-in XSS mitigation through JSX escaping—avoid dangerouslySetInnerHTML with unsanitised input and validate URLs and state. Spring Boot and Spring Security provide authentication, authorization, CSRF protection, and secure session handling; harden with secure headers, HTTPS, and least-privilege DB access. This stack is common in fintech and enterprise, well documented, and fits a single versioned dev environment you can rebuild and share.',
        ],
      },
      {
        heading: 'Value for developers, teams, and business',
        body: [
          'For developers: one command (or devcontainer open) gives you the same Node, Java, and Postgres versions as everyone else; no “works on my machine” and no polluting the host. You can test full stack behaviour locally and throw the environment away when done.',
          'For teams: onboarding is “clone repo, open in container”; the Dockerfile and devcontainer.json are the single source of truth. Security and compliance can review a defined, patchable environment and align with NIST-style workstation and build-pipeline controls (least privilege, updated software, controlled credentials).',
          'For business: fewer environment-related bugs, faster onboarding, and a dev setup that supports supply-chain and audit expectations. Docker’s guidance notes that developer workstations are increasingly targeted; isolating tooling and using trusted, updated images reduces attack surface and supports a more secure supply chain.',
        ],
      },
      {
        heading: 'Summary and takeaways',
        body: [
          'Containerised dev workstations give you isolation, reproducibility, and a clear boundary between host and project tooling—especially with a single dev image plus a database service and a remote IDE. Use them when you want a team-wide, reproducible stack; keep the host patched and avoid exposing the Docker socket. The why, when, and how above are grounded in NIST workstation and build-pipeline guidance, OWASP Docker Security Cheat Sheet, and Docker’s developer workstation best practices; the concrete stack and value framing are my own.',
        ],
      },
      {
        heading: 'If you want to go deeper',
        body: [
          'I have experience designing and using containerised dev environments in regulated contexts. If you want to adopt this pattern for your team or harden an existing setup, you can reach out via LinkedIn.',
        ],
      },
      {
        heading: 'References',
        body: [
          {
            label: 'NIST – SP 800-46 Rev. 2: Guide to Enterprise Telework, Remote Access, and BYOD Security',
            href: 'https://csrc.nist.gov/publications/detail/sp/800-46/rev-2/final',
          },
          {
            label: 'OWASP – Docker Security Cheat Sheet',
            href: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html',
          },
          {
            label: 'Docker – Developer Workstation Security Best Practices',
            href: 'https://www.docker.com/blog/developer-workstation-security-best-practices/',
          },
          {
            label: 'React – Official documentation (security and escape hatches)',
            href: 'https://react.dev/learn/escape-hatches',
          },
          {
            label: 'Spring Security – Official reference',
            href: 'https://docs.spring.io/spring-security/reference/',
          },
          {
            label: 'Spring Boot – Web and security',
            href: 'https://docs.spring.io/spring-boot/reference/web/spring-security.html',
          },
          {
            label: 'PostgreSQL – Official documentation',
            href: 'https://www.postgresql.org/docs/',
          },
          {
            label: 'VS Code – Developing inside a Container',
            href: 'https://code.visualstudio.com/docs/remote/dev-containers',
          },
          {
            label: 'VS Code – Develop on a Remote Docker Host',
            href: 'https://code.visualstudio.com/remote/advancedcontainers/develop-remote-host',
          },
        ],
      },
    ],
  },
  {
    slug: 'kubernetes-kind-why-when-how',
    title: 'Kubernetes Kind: Why, When, and How to Run Kubernetes in Docker',
    date: '2025-01-18',
    readingTime: '8 min read',
    category: 'DevOps',
    tags: ['Kubernetes', 'Docker', 'DevOps', 'CI/CD', 'Local Development'],
    excerpt:
      'Kind runs real Kubernetes clusters inside Docker—ideal for local development, test environments, and CI. Here’s why it matters, when to use it, and how to get value for your team and business.',
    sections: [
      {
        heading: 'The problem and who this is for',
        body: [
          'Teams that ship on Kubernetes need a way to run a real cluster locally and in CI without the cost and delay of cloud control planes or the heaviness of VM-based local clusters. This post is for developers, platform and DevOps engineers, and leads who want a clear why, when, and how for Kind (Kubernetes in Docker)—grounded in the project’s own design and the official Kubernetes and Kind documentation.',
        ],
      },
      {
        heading: 'What is Kind?',
        body: [
          'Kind (Kubernetes in Docker) is a Kubernetes SIG Testing project that runs local Kubernetes clusters using Docker containers as nodes instead of virtual machines. It is designed for testing Kubernetes itself and for use in local development and CI. You get a real, conformant Kubernetes API on your laptop or in pipelines, without VMs or a cloud cluster. Kind’s design principles emphasise hermeticity (minimal external dependencies), support for officially supported Kubernetes versions, and suitability for conformance testing—all of which make it a reliable, reproducible option for teams.',
        ],
      },
      {
        heading: 'Why use Kind?',
        body: [
          'Traditional local Kubernetes options often meant heavy VMs, slow startup, or environments that drifted from production. Kind uses Docker containers as nodes, so you use less CPU and memory than VM-based setups; clusters come up in seconds and can be torn down just as fast.',
          'Kind is used for Kubernetes conformance testing and is certified for conformance, so what you test locally behaves like a real cluster. Configuration is declarative—you define your cluster in a YAML file, commit it, and anyone can recreate the same environment. That makes it a strong fit for development, integration tests, and CI/CD where you need a real Kubernetes API without the cost or delay of a full cloud cluster. This aligns with the project’s stated scope: supporting testing of Kubernetes and providing a local cluster for development and CI.',
        ],
      },
      {
        heading: 'When to use Kind',
        body: [
          'Use Kind when you need a real Kubernetes cluster that is fast to create, easy to throw away, and cheap to run. Good fits: local development and debugging of Helm charts or manifests; integration and end-to-end tests in CI; learning or experimenting with Kubernetes; testing operator and controller behaviour; multi-node or high-availability scenarios on a single machine.',
          'Kind is less suitable when you need to test cloud-specific resources (e.g. load balancers or node pools that only exist on a given cloud), when you need to simulate very large clusters, or when your organisation mandates a different local K8s tool. For most teams building or deploying to Kubernetes, Kind is a practical default for “Kubernetes on my machine” and “Kubernetes in my pipeline.”',
        ],
      },
      {
        heading: 'How to use Kind',
        body: [
          '1. Install Docker, then install Kind (official releases, or e.g. brew on macOS).',
          '2. Create a cluster: kind create cluster. Default name is "kind"; use --name my-cluster for a custom name.',
          '3. Use kubectl with the kind context to deploy and test workloads.',
          '4. For multi-node or custom node images: define a Kind config file (see Kind docs) and run kind create cluster --config your-config.yaml.',
          '5. Tear down: kind delete cluster --name my-cluster.',
          'The Kind Quick Start and the Kubernetes “Set up Kind” learning-environment docs cover installation and options in full.',
        ],
      },
      {
        heading: 'Example: Kind in a CI pipeline',
        body: [
          'A typical pattern is to add a CI job that creates a fresh Kind cluster, applies your Helm chart or manifests, runs integration or E2E tests (e.g. with a test runner that talks to the in-cluster API), and then deletes the cluster in the same job. No long-lived test cluster, no drift between runs, and the same Kubernetes API you use in production. Many teams run this on every PR or on a schedule; the Kind project’s own design supports this “create, test, destroy” workflow.',
        ],
      },
      {
        heading: 'Value for developers, test environments, and business',
        body: [
          'For developers: you get a real cluster in seconds, no cloud account required. You can test Helm releases, CRDs, and in-cluster behaviour before pushing to a shared environment. Spin up a cluster, run your tests, delete it—repeat without leaving your machine.',
          'For test environments: CI jobs can create a fresh Kind cluster, run integration or E2E tests, and destroy it in the same job. That gives you consistent, reproducible test runs and avoids long-lived test clusters that drift or cost money when idle.',
          'For business: faster feedback loops mean fewer bugs in production; reproducible environments reduce “works on my machine” and speed up onboarding. Kind is free and open source, so you avoid per-developer or per-cluster cloud spend for local and CI use. When production runs on Kubernetes, having the same API locally and in pipelines reduces risk and speeds delivery.',
        ],
      },
      {
        heading: 'Summary and takeaways',
        body: [
          'Kind gives you real, conformant Kubernetes in Docker: fast to create and destroy, declarative, and well suited to local dev and CI. Use it when you need a disposable, reproducible cluster; avoid it when you need cloud-specific features or very large clusters. The why, when, and how above are grounded in Kind’s official design and scope and the Kubernetes documentation; the recommendations and “value” framing are my own.',
        ],
      },
      {
        heading: 'If you want to go deeper',
        body: [
          'I use Kind in secure, containerised dev setups and CI pipelines. If you want to standardise on Kind for your team or integrate it into your release process, you can reach out via LinkedIn.',
        ],
      },
      {
        heading: 'References',
        body: [
          {
            label: 'Kind – Official site and documentation',
            href: 'https://kind.sigs.k8s.io/',
          },
          {
            label: 'Kind – Quick Start',
            href: 'https://kind.sigs.k8s.io/docs/user/quick-start',
          },
          {
            label: 'Kind – Design principles (hermeticity, testing)',
            href: 'https://kind.sigs.k8s.io/docs/design/principles/',
          },
          {
            label: 'Kind – Project scope',
            href: 'https://kind.sigs.k8s.io/docs/contributing/project-scope',
          },
          {
            label: 'Kubernetes – Set up Kind (learning environment)',
            href: 'https://kubernetes.io/docs/setup/learning-environment/kind/',
          },
          {
            label: 'Kind – GitHub (kubernetes-sigs/kind)',
            href: 'https://github.com/kubernetes-sigs/kind',
          },
        ],
      },
    ],
  },
]

