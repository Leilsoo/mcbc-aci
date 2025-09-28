// next.config.ts
// ✅ Config Next en TypeScript
// - On ajoute une redirection /thanks -> /merci pour couvrir les retours Formspree.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/thanks",      // URL demandée (externe te renvoie ici)
        destination: "/merci",  // URL réelle de ta page de remerciement
        permanent: true,        // 308 permanent (OK pour SEO / caches)
      },
    ];
  },
};

export default nextConfig;
