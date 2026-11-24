// Weirdest Job Title: Blind Judge Showdown — make.fun entry.
//
// The entry is one job title, 36 characters, built to win a blind
// head-to-head against any other title:
//
//   Senior Sorry Writer for Billionaires
//
// Why this title, against the judge's brief (most important first):
//
// 1. It IS a weird job title — a few words naming an odd job. The
//    shape is the shape of a real posting: a seniority word, a
//    craft word, a clientele. Nothing in it is random.
// 2. It is stranger than ordinary work. "Sorry Writer" is a job
//    nobody has heard of: a person whose whole profession is
//    writing apologies. Then the clientele twists it again —
//    billionaires, people rich enough to outsource saying sorry.
// 3. The twist lands on the first read. "Senior Sorry Writer"
//    already raises the question "sorry for what?", and
//    "for Billionaires" answers it with the funniest possible
//    client: someone who can afford to never apologise in person.
// 4. It sounds like a real job, specific enough to picture the
//    person doing it: at a desk, drafting a grovelling note while
//    a billionaire dictates over the phone what he did this time.
//    It is the apology-letter cousin of a speechwriter — a real
//    craft, pointed at a gloriously odd client.
// 5. It reads instantly: 36 characters, five words, one breath.
//
// It is fresh — no "professional apologiser" cliché, no queue,
// no pet psychic, no underwater anything — while staying inside
// the job-title tradition: seniority + craft + clientele, the
// way real postings are written. And it is short on purpose: on
// an exact tie the smaller text places first.
//
// The program writes that single title to /output/entry.txt (the
// directory comes from MAKEFUN_OUTPUT_DIR, default /output) and
// prints exactly the same title to stdout. No network, no
// randomness, no environment secrets — every run produces the
// same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const title = "Senior Sorry Writer for Billionaires";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate counts characters, not UTF-16 code units: count code
// points, so a title with a character outside the BMP could never
// slip past the limit on a technicality. (This title is plain
// ASCII, so the two counts agree here — the check is written for
// the gate's definition, not for this one string.)
const charCount = [...title].length;
if (charCount < 1 || charCount > 60) {
  throw new Error(`entry title is ${charCount} characters, outside the 1-60 limit`);
}
if (title.trim().length === 0 || /[\r\n]/.test(title)) {
  throw new Error("entry title must be one non-blank line");
}
if (title !== title.trim()) {
  throw new Error("entry title must not start or end with whitespace");
}

const dst = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(dst, title, "utf8");

// Read it back and verify the file holds exactly the title, byte
// for byte, so a partial or corrupted write can never reach the
// judge — and that its byte length matches the title, so no stray
// newline or encoding surprise can slip past the character gate.
const written = readFileSync(dst, "utf8");
if (written !== title) {
  throw new Error("entry.txt does not hold exactly the entry title");
}
if (Buffer.byteLength(written, "utf8") !== title.length) {
  throw new Error("entry.txt byte length does not match the entry title");
}
console.log(title);
