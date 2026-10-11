import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'Kislaya-Kanak-Invitation.pptx');
const ganesh = path.join(root, 'public/ganesh.jpg');
const ringVideo = path.join(root, 'public/engagement-ring.mp4');

const GREEN = '3A4F32';
const GOLD = 'B59A6D';
const GOLD_DEEP = '8C6F3A';
const IVORY = 'E8D7F0';
const INNER = 'FFFDF8';
const MUTED = '5C5C5C';
const WHITE = 'FFFFFF';

const SCRIPT = 'Snell Roundhand';
const BODY = 'Georgia';
const DEVANAGARI = 'Kohinoor Devanagari';

const pres = new PptxGenJS();
pres.defineLayout({ name: 'INVITE', width: 7.5, height: 13.33 });
pres.layout = 'INVITE';
pres.author = 'Kislaya & Kanak';
pres.title = 'Kislaya & Kanak – Engagement Invitation';
pres.subject = 'Engagement invitation';
pres.theme = { headFontFace: SCRIPT, bodyFontFace: BODY };

const R = pres.ShapeType.roundRect;
const OVAL = pres.ShapeType.ellipse;
const LINE = pres.ShapeType.line;

function applyTemplate(slide) {
  slide.background = { color: IVORY };

  slide.addShape(R, {
    x: 0.22,
    y: 0.22,
    w: 7.06,
    h: 12.89,
    fill: { type: 'none' },
    line: { color: GOLD, width: 1.5 },
    rectRadius: 0.12,
  });
  slide.addShape(R, {
    x: 0.36,
    y: 0.36,
    w: 6.78,
    h: 12.61,
    fill: { type: 'none' },
    line: { color: GOLD_DEEP, width: 0.75 },
    rectRadius: 0.1,
  });

  const corners = [
    { x: 0.48, y: 0.48, rotate: 0 },
    { x: 6.42, y: 0.48, rotate: 90 },
    { x: 0.48, y: 12.25, rotate: 270 },
    { x: 6.42, y: 12.25, rotate: 180 },
  ];
  for (const corner of corners) {
    slide.addShape(LINE, {
      x: corner.x,
      y: corner.y,
      w: 0.6,
      h: 0,
      line: { color: GOLD, width: 1.25 },
      rotate: corner.rotate,
    });
    slide.addShape(LINE, {
      x: corner.x,
      y: corner.y,
      w: 0,
      h: 0.6,
      line: { color: GOLD, width: 1.25 },
      rotate: corner.rotate,
    });
  }

  const leaves = [
    [0.7, 1.15],
    [6.5, 1.3],
    [0.75, 6.4],
    [6.55, 6.55],
    [0.7, 11.7],
    [6.5, 11.55],
    [3.6, 0.55],
    [3.6, 12.5],
  ];
  for (const [x, y] of leaves) {
    slide.addShape(OVAL, {
      x,
      y,
      w: 0.2,
      h: 0.11,
      fill: { color: GOLD },
      rotate: Math.round((x + y) * 19) % 50,
    });
  }
}

function goldCard(slide, { x, y, w, h }) {
  slide.addShape(R, {
    x,
    y,
    w,
    h,
    fill: { color: GOLD },
    shadow: { type: 'outer', color: '000000', blur: 16, opacity: 0.16, offset: 5 },
    rectRadius: 0.2,
  });
  slide.addShape(R, {
    x: x + 0.07,
    y: y + 0.07,
    w: w - 0.14,
    h: h - 0.14,
    fill: { color: INNER },
    rectRadius: 0.15,
  });
}

function heartSeal(slide, { x, y, w = 0.55, h = 0.55 }) {
  slide.addShape(OVAL, {
    x,
    y,
    w,
    h,
    fill: { color: GOLD_DEEP },
  });
  slide.addText('♥', {
    x,
    y: y - 0.02,
    w,
    h,
    fontFace: BODY,
    fontSize: 16,
    color: INNER,
    align: 'center',
    valign: 'middle',
  });
}

function divider(slide, { y }) {
  slide.addShape(LINE, {
    x: 2.35,
    y,
    w: 1.0,
    h: 0,
    line: { color: GOLD, width: 1 },
  });
  slide.addText('✧', {
    x: 3.35,
    y: y - 0.18,
    w: 0.8,
    h: 0.36,
    fontFace: BODY,
    fontSize: 14,
    color: GOLD,
    align: 'center',
  });
  slide.addShape(LINE, {
    x: 4.15,
    y,
    w: 1.0,
    h: 0,
    line: { color: GOLD, width: 1 },
  });
}

function slideInvite() {
  const slide = pres.addSlide();
  applyTemplate(slide);
  goldCard(slide, { x: 1.15, y: 4.55, w: 5.2, h: 3.85 });
  slide.addText('You are Invited', {
    x: 1.4,
    y: 4.95,
    w: 4.7,
    h: 1.55,
    fontFace: SCRIPT,
    fontSize: 40,
    color: GREEN,
    align: 'center',
    valign: 'middle',
  });
  heartSeal(slide, { x: 3.475, y: 6.9 });
}

function slideNames() {
  const slide = pres.addSlide();
  applyTemplate(slide);
  goldCard(slide, { x: 0.85, y: 1.45, w: 5.8, h: 10.35 });
  slide.addImage({
    path: ganesh,
    x: 2.65,
    y: 1.8,
    w: 2.2,
    h: 2.7,
  });
  slide.addText('श्री गणेशाय नमः', {
    x: 1.15,
    y: 4.6,
    w: 5.2,
    h: 0.5,
    fontFace: DEVANAGARI,
    fontSize: 18,
    color: GREEN,
    align: 'center',
    bold: true,
  });
  divider(slide, { y: 5.25 });
  slide.addText('Kislaya', {
    x: 1.15,
    y: 5.5,
    w: 5.2,
    h: 1.15,
    fontFace: SCRIPT,
    fontSize: 54,
    color: GREEN,
    align: 'center',
  });
  slide.addText('&', {
    x: 1.15,
    y: 6.6,
    w: 5.2,
    h: 0.7,
    fontFace: SCRIPT,
    fontSize: 32,
    color: GOLD,
    align: 'center',
  });
  slide.addText('Kanak', {
    x: 1.15,
    y: 7.25,
    w: 5.2,
    h: 1.15,
    fontFace: SCRIPT,
    fontSize: 54,
    color: GREEN,
    align: 'center',
  });
  slide.addText('Baat Pakki', {
    x: 1.15,
    y: 8.7,
    w: 5.2,
    h: 0.9,
    fontFace: SCRIPT,
    fontSize: 36,
    color: GOLD,
    align: 'center',
  });
}

function slideDate() {
  const slide = pres.addSlide();
  applyTemplate(slide);
  goldCard(slide, { x: 0.85, y: 2.15, w: 5.8, h: 8.95 });
  slide.addText('SAVE THE DATE', {
    x: 1.15,
    y: 2.55,
    w: 5.2,
    h: 0.4,
    fontFace: BODY,
    fontSize: 13,
    color: GOLD,
    align: 'center',
    bold: true,
    charSpacing: 6,
  });
  slide.addText('23rd October 2026', {
    x: 1.15,
    y: 3.1,
    w: 5.2,
    h: 1.2,
    fontFace: SCRIPT,
    fontSize: 40,
    color: GREEN,
    align: 'center',
  });
  slide.addText('2:00 PM ONWARDS', {
    x: 1.15,
    y: 4.35,
    w: 5.2,
    h: 0.4,
    fontFace: BODY,
    fontSize: 14,
    color: GOLD,
    align: 'center',
    bold: true,
    charSpacing: 3,
  });
  slide.addShape(R, {
    x: 2.15,
    y: 5.1,
    w: 3.2,
    h: 2.55,
    fill: { color: GOLD },
    rectRadius: 0.16,
  });
  slide.addMedia({
    type: 'video',
    path: ringVideo,
    x: 2.25,
    y: 5.2,
    w: 3.0,
    h: 2.35,
  });
}

function slideParents() {
  const slide = pres.addSlide();
  applyTemplate(slide);
  goldCard(slide, { x: 0.85, y: 2.35, w: 5.8, h: 8.45 });
  slide.addText('With the Blessings of\nOur Beloved Parents', {
    x: 1.1,
    y: 2.7,
    w: 5.3,
    h: 2.0,
    fontFace: SCRIPT,
    fontSize: 34,
    color: GREEN,
    align: 'center',
  });
  divider(slide, { y: 4.95 });
  slide.addText("GROOM'S PARENTS", {
    x: 1.1,
    y: 5.3,
    w: 5.3,
    h: 0.4,
    fontFace: BODY,
    fontSize: 13,
    color: GREEN,
    align: 'center',
    bold: true,
    charSpacing: 3,
  });
  slide.addText('Ravindra Nath Roy & Smt. Aishwarya Roy', {
    x: 1.1,
    y: 5.75,
    w: 5.3,
    h: 0.7,
    fontFace: BODY,
    fontSize: 17,
    color: MUTED,
    align: 'center',
    italic: true,
  });
  slide.addText("BRIDE'S PARENTS", {
    x: 1.1,
    y: 6.85,
    w: 5.3,
    h: 0.4,
    fontFace: BODY,
    fontSize: 13,
    color: GREEN,
    align: 'center',
    bold: true,
    charSpacing: 3,
  });
  slide.addText('Sikandar Prasad & Smt. Madhuri Devi', {
    x: 1.1,
    y: 7.3,
    w: 5.3,
    h: 0.7,
    fontFace: BODY,
    fontSize: 17,
    color: MUTED,
    align: 'center',
    italic: true,
  });
}

function slideVenue() {
  const slide = pres.addSlide();
  applyTemplate(slide);
  goldCard(slide, { x: 0.85, y: 2.45, w: 5.8, h: 8.2 });
  slide.addText('JOIN US', {
    x: 1.1,
    y: 2.8,
    w: 5.3,
    h: 0.35,
    fontFace: BODY,
    fontSize: 13,
    color: GOLD,
    align: 'center',
    bold: true,
    charSpacing: 6,
  });
  slide.addText('Engagement Venue', {
    x: 1.1,
    y: 3.2,
    w: 5.3,
    h: 1.05,
    fontFace: SCRIPT,
    fontSize: 40,
    color: GREEN,
    align: 'center',
  });
  divider(slide, { y: 4.5 });
  slide.addText('Terapanth Bhawan', {
    x: 1.1,
    y: 4.85,
    w: 5.3,
    h: 0.7,
    fontFace: BODY,
    fontSize: 24,
    color: GREEN,
    align: 'center',
    bold: true,
  });
  slide.addText('Railway Station Road,\nAraria, Bihar', {
    x: 1.1,
    y: 5.6,
    w: 5.3,
    h: 1.0,
    fontFace: BODY,
    fontSize: 16,
    color: MUTED,
    align: 'center',
  });
  slide.addShape(R, {
    x: 2.15,
    y: 7.0,
    w: 3.2,
    h: 0.7,
    fill: { color: GREEN },
    rectRadius: 0.35,
  });
  slide.addText('Navigate to Venue', {
    x: 2.15,
    y: 7.0,
    w: 3.2,
    h: 0.7,
    fontFace: BODY,
    fontSize: 13,
    color: WHITE,
    align: 'center',
    valign: 'middle',
    bold: true,
    hyperlink: {
      url: 'https://www.google.com/maps/search/?api=1&query=Terapanth+Bhawan+Railway+Station+Road+Araria+Bihar',
    },
  });
}

function slideFamily() {
  const slide = pres.addSlide();
  applyTemplate(slide);
  goldCard(slide, { x: 0.85, y: 2.45, w: 5.8, h: 8.2 });
  slide.addText('With Love & Blessings', {
    x: 1.1,
    y: 2.85,
    w: 5.3,
    h: 1.15,
    fontFace: SCRIPT,
    fontSize: 36,
    color: GREEN,
    align: 'center',
  });
  slide.addText(
    "We can't wait to share the beginning of our forever with you. Your presence and blessings mean the world to us.",
    {
      x: 1.2,
      y: 4.15,
      w: 5.1,
      h: 1.7,
      fontFace: BODY,
      fontSize: 16,
      color: MUTED,
      align: 'center',
      italic: true,
    }
  );
  divider(slide, { y: 6.15 });
  slide.addText('Our Family', {
    x: 1.1,
    y: 6.45,
    w: 5.3,
    h: 0.95,
    fontFace: SCRIPT,
    fontSize: 34,
    color: GREEN,
    align: 'center',
  });
  slide.addText('TOGETHER WITH OUR FAMILIES', {
    x: 1.1,
    y: 7.45,
    w: 5.3,
    h: 0.4,
    fontFace: BODY,
    fontSize: 12,
    color: GOLD,
    align: 'center',
    bold: true,
    charSpacing: 3,
  });
  heartSeal(slide, { x: 3.475, y: 8.15 });
}

slideInvite();
slideNames();
slideDate();
slideParents();
slideVenue();
slideFamily();

await pres.writeFile({ fileName: outFile });
await addTransitionsAndAutoplay(outFile);
console.log(`Wrote unified editable PPT to ${outFile}`);

function collectPicIds(xml) {
  const ids = [];
  const picBlocks = xml.matchAll(/<p:pic>[\s\S]*?<\/p:pic>/g);
  for (const block of picBlocks) {
    const idMatch = block[0].match(/<p:cNvPr id="(\d+)"/);
    if (idMatch) ids.push(idMatch[1]);
  }
  return ids;
}

function fadeTransition() {
  return '<p:transition spd="med"><p:fade/></p:transition>';
}

function animationTiming(picIds, autoplayVideo = false) {
  const effects = [];
  let nextId = 6;

  for (const picId of picIds) {
    effects.push(`
      <p:par>
        <p:cTn id="${nextId}" fill="hold">
          <p:stCondLst><p:cond delay="0"/></p:stCondLst>
          <p:childTnLst>
            <p:animEffect transition="in" filter="fade">
              <p:cBhvr>
                <p:cTn id="${nextId + 1}" dur="800"/>
                <p:tgtEl><p:spTgt spid="${picId}"/></p:tgtEl>
              </p:cBhvr>
            </p:animEffect>
          </p:childTnLst>
        </p:cTn>
      </p:par>`);
    nextId += 2;
  }

  if (autoplayVideo) {
    for (const picId of picIds) {
      effects.push(`
        <p:video>
          <p:cMediaNode vol="0" mute="1">
            <p:cTn id="${nextId}" fill="hold" display="0" repeatCount="indefinite">
              <p:stCondLst><p:cond delay="0"/></p:stCondLst>
            </p:cTn>
            <p:tgtEl><p:spTgt spid="${picId}"/></p:tgtEl>
          </p:cMediaNode>
        </p:video>`);
      nextId += 1;
    }
  }

  return `
<p:timing>
  <p:tnLst>
    <p:par>
      <p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot">
        <p:childTnLst>
          <p:seq concurrent="1" nextAc="seek">
            <p:cTn id="2" dur="indefinite" nodeType="mainSeq">
              <p:childTnLst>
                <p:par>
                  <p:cTn id="3" fill="hold">
                    <p:stCondLst><p:cond delay="0"/></p:stCondLst>
                    <p:childTnLst>
                      <p:par>
                        <p:cTn id="4" fill="hold">
                          <p:stCondLst><p:cond delay="0"/></p:stCondLst>
                          <p:childTnLst>
                            ${effects.join('\n')}
                          </p:childTnLst>
                        </p:cTn>
                      </p:par>
                    </p:childTnLst>
                  </p:cTn>
                </p:par>
              </p:childTnLst>
            </p:cTn>
            <p:prevCondLst>
              <p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond>
            </p:prevCondLst>
            <p:nextCondLst>
              <p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond>
            </p:nextCondLst>
          </p:seq>
        </p:childTnLst>
      </p:cTn>
    </p:par>
  </p:tnLst>
</p:timing>`;
}

async function addTransitionsAndAutoplay(filePath) {
  const zip = await JSZip.loadAsync(await readFile(filePath));
  const slideNames = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

  for (const name of slideNames) {
    let xml = await zip.file(name).async('string');
    const slideNum = Number(name.match(/\d+/)[0]);
    const picIds = collectPicIds(xml);
    const hasVideo = xml.includes('videoFile');

    xml = xml.replace(
      '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">',
      '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main">'
    );

    xml = xml.replace('</p:sld>', `${fadeTransition()}${animationTiming(picIds, hasVideo)}</p:sld>`);
    zip.file(name, xml);
  }

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
  await writeFile(filePath, content);
}
