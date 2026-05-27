#!/usr/bin/env node
/**
 * SaaS MVP Scope Builder — CLI
 * Swift Tech Co. — https://swifttechco.com
 */

const { VERTICALS, FEATURES, TARGETS, TIMELINES, calculate } = require("./calculator");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

async function interactive() {
  console.log("\nSaaS MVP Scope Builder");
  console.log("Swift Tech Co. — https://swifttechco.com");
  console.log("=".repeat(48));

  console.log("\nIndustry vertical:");
  VERTICALS.forEach((v, i) => console.log(`  ${i + 1}. ${v}`));
  const vIdx = parseInt(await ask(`Select (1-${VERTICALS.length}): `), 10) - 1;

  console.log("\nTarget users:");
  TARGETS.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  const tIdx = parseInt(await ask(`Select (1-${TARGETS.length}): `), 10) - 1;

  console.log("\nTimeline pressure:");
  TIMELINES.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  const tlIdx = parseInt(await ask(`Select (1-${TIMELINES.length}): `), 10) - 1;

  const featList = Object.keys(FEATURES);
  console.log("\nCore features for MVP (comma-separated numbers, or leave blank):");
  featList.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  const featRaw = await ask("Select features: ");
  const selected = featRaw.trim()
    ? featRaw.split(",").map(s => featList[parseInt(s.trim(), 10) - 1]).filter(Boolean)
    : [];

  rl.close();

  const result = calculate(VERTICALS[vIdx], TARGETS[tIdx], TIMELINES[tlIdx], selected);
  console.log("\n" + "=".repeat(48));
  console.log("Your MVP Scope");
  console.log(`  Estimated cost:    $${result.lowK}K to $${result.highK}K USD`);
  console.log(`  Timeline to ship:  ${result.weeks} weeks`);
  console.log("\n  Include in MVP:");
  result.essentials.forEach(f => console.log(`    + ${f}`));
  if (result.deferred.length) {
    console.log("\n  Defer to v2:");
    result.deferred.forEach(f => console.log(`    o ${f}`));
  }
  console.log("\nGet a detailed quote: https://swifttechco.com/contact");
}

interactive().catch(e => { console.error(e.message); process.exit(1); });
