/**
 * URL-patronen voor de Naamtester en KvK voorbereiding
 * Vin's Survival Gids Platform
 */

export function slugifyDomain(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // spaties en leestekens eruit, geen streepjes voor domeinnaam slug
    .trim();
}

export const checkLinks = {
  // 1. Google test (autocorrectie & vindbaarheid)
  google: (name: string) => `https://www.google.com/search?q=${encodeURIComponent(name)}`,

  // 2. Domein check (.nl en .com)
  domainNl: (name: string) => {
    const slug = slugifyDomain(name);
    return `https://www.sidn.nl/whois?q=${slug}.nl`;
  },
  domainHosting: (name: string) => {
    const slug = slugifyDomain(name);
    return `https://www.transip.nl/domeinnaam/?domain=${slug}.nl`;
  },

  // 3. KvK Handelsregister
  kvk: (name?: string) => (name ? `https://www.kvk.nl/zoeken/?q=${encodeURIComponent(name)}` : "https://www.kvk.nl/zoeken/"),
  kvkZoeken: "https://www.kvk.nl/zoeken/",

  // 4. Benelux Merkenregister (BOIP)
  boip: (name: string) => `https://www.boip.int/nl/merkenregister?query=${encodeURIComponent(name)}`,

  // 5. Social Media Handles
  instagram: (name: string) => `https://www.instagram.com/${slugifyDomain(name)}/`,
  linkedin: (name: string) => `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(name)}`,

  // 6. Officiële KvK Afspraak link
  kvkAfspraak: "https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven/",
};
