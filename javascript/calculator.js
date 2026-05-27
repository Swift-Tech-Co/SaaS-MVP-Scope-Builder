/**
 * SaaS MVP Scope Builder
 * Swift Tech Co. — https://swifttechco.com
 */

const VERTICALS = [
  "B2B SaaS", "HR & Payroll", "Healthcare", "E-Commerce",
  "EdTech", "FinTech", "Logistics", "CRM / Sales", "Analytics / BI", "Other",
];

const FEATURES = {
  "User authentication & roles":    1.5,
  "Billing & subscriptions":        2.5,
  "Dashboard & analytics":          2.0,
  "REST API / webhooks":            2.0,
  "File uploads & storage":         1.0,
  "Notifications (email/SMS/push)": 1.5,
  "Admin panel":                    2.0,
  "Multi-tenant architecture":      3.0,
  "Third-party integrations":       2.5,
  "AI / ML features":               4.0,
};

const TARGETS = [
  "B2B (business customers)",
  "B2C (consumers)",
  "Internal tool (team use only)",
];
const TARGET_CPW = {
  "B2B (business customers)":       2800,
  "B2C (consumers)":                2200,
  "Internal tool (team use only)":  1600,
};

const TIMELINES = [
  "ASAP: < 3 months",
  "Standard: 3 to 6 months",
  "Flexible: 6+ months",
];

/**
 * @param {string} vertical
 * @param {string} target
 * @param {string} timeline
 * @param {string[]} selectedFeatures
 * @returns {{ weeks, lowK, highK, essentials, deferred }}
 */
function calculate(vertical, target, timeline, selectedFeatures = []) {
  if (!VERTICALS.includes(vertical)) throw new Error(`Unknown vertical: ${vertical}`);
  if (!TARGETS.includes(target))     throw new Error(`Unknown target: ${target}`);
  if (!TIMELINES.includes(timeline)) throw new Error(`Unknown timeline: ${timeline}`);

  const speedMult = timeline.includes("< 3") ? 0.7 : 1.0;
  const totalWeight = selectedFeatures.reduce((s, f) => s + (FEATURES[f] || 1.5), 0);
  const weeks = Math.round(4 + totalWeight * speedMult);
  const cpw   = TARGET_CPW[target];

  const essentials = selectedFeatures.length
    ? selectedFeatures
    : ["User authentication & roles", "Dashboard & analytics"];
  const deferred = Object.keys(FEATURES).filter(f => !selectedFeatures.includes(f)).slice(0, 3);

  return {
    weeks,
    lowK:      Math.round(weeks * cpw * 0.85 / 1000),
    highK:     Math.round(weeks * cpw * 1.25 / 1000),
    essentials,
    deferred,
  };
}

module.exports = { VERTICALS, FEATURES, TARGETS, TIMELINES, calculate };
