/**
 * Декоративные детали настольной мозаики. Все элементы помечены aria-hidden
 * и не перехватывают нажатия.
 */

const C = {
  board: "#fffdf8",
  boardLine: "#e7dcc7",
  hole: "#ebdfc9",
  teal: "#0a6967",
  turquoise: "#22b5a6",
  apricot: "#f59e6b",
  apricotDeep: "#e57a45",
  sun: "#f7c843",
  sunLight: "#fbdc7a",
  lilac: "#b49be0",
  milk: "#fbf6ec",
};

function petalPath(cx: number, cy: number, len: number, width: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const nx = -uy;
  const ny = ux;
  const tipX = cx + ux * len;
  const tipY = cy + uy * len;
  const midX = cx + (ux * len) / 2;
  const midY = cy + (uy * len) / 2;
  const f = (n: number) => n.toFixed(1);
  return `M${f(cx)} ${f(cy)} Q${f(midX + nx * width)} ${f(midY + ny * width)} ${f(tipX)} ${f(tipY)} Q${f(midX - nx * width)} ${f(midY - ny * width)} ${f(cx)} ${f(cy)}Z`;
}

/** Четыре четверти круга с зазором — окно из деталей мозаики. */
function QuarterWindow({ cx, cy, r, gap, colors }: { cx: number; cy: number; r: number; gap: number; colors: string[] }) {
  const q = [
    { sx: -1, sy: -1 },
    { sx: 1, sy: -1 },
    { sx: 1, sy: 1 },
    { sx: -1, sy: 1 },
  ];
  return (
    <g>
      {q.map(({ sx, sy }, i) => {
        const ox = cx + sx * gap;
        const oy = cy + sy * gap;
        const sweep = sx * sy > 0 ? 1 : 0;
        return (
          <path
            key={i}
            d={`M${ox} ${oy} H${ox + sx * r} A${r} ${r} 0 0 ${sweep} ${ox} ${oy + sy * r}Z`}
            fill={colors[i % colors.length]}
          />
        );
      })}
    </g>
  );
}

function SunRays({ cx, cy, r, len, width, angles, colors }: { cx: number; cy: number; r: number; len: number; width: number; angles: number[]; colors: string[] }) {
  return (
    <g>
      {angles.map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        return (
          <path
            key={deg}
            d={petalPath(cx + Math.cos(a) * r, cy + Math.sin(a) * r, len, width, deg)}
            fill={colors[i % colors.length]}
          />
        );
      })}
    </g>
  );
}

/** Главная композиция: восходящее солнце над домиком на светлой доске. */
export function MosaicScene({ className = "" }: { className?: string }) {
  const groundColors = [C.turquoise, C.teal, C.lilac, C.turquoise, C.sun, C.teal, C.turquoise, C.apricot];
  return (
    <svg viewBox="0 0 400 360" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="mz-holes" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2.3" fill={C.hole} />
        </pattern>
      </defs>
      <rect x="6" y="6" width="388" height="348" rx="40" fill={C.board} stroke={C.boardLine} strokeWidth="2" />
      <rect x="18" y="18" width="364" height="324" rx="30" fill="url(#mz-holes)" />

      {/* солнце */}
      <SunRays
        cx={266}
        cy={214}
        r={84}
        len={34}
        width={11}
        angles={[192, 222, 252, 282, 312, 342]}
        colors={[C.apricot, C.sun, C.apricotDeep, C.sun, C.apricot, C.sun]}
      />
      <path d="M190 214 A76 76 0 0 1 342 214Z" fill={C.sun} />
      <path d="M226 214 A40 40 0 0 1 306 214Z" fill={C.sunLight} />

      {/* домик */}
      <rect x="66" y="196" width="148" height="116" rx="14" fill={C.turquoise} />
      <path d="M92 312 V266 A20 20 0 0 1 132 266 V312Z" fill={C.lilac} />
      <circle cx="123" cy="290" r="3.5" fill={C.milk} />
      <QuarterWindow cx={176} cy={250} r={20} gap={2.5} colors={[C.sun, C.sunLight, C.sun, C.sunLight]} />
      <path
        className="mosaic-drop"
        d="M58 200 L140 128 L222 200Z"
        fill={C.apricotDeep}
        stroke={C.apricotDeep}
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* земля из круглых фишек */}
      {groundColors.map((col, i) => (
        <circle key={i} cx={48 + i * 22} cy={330} r={8.5} fill={col} />
      ))}
      <circle cx={232} cy={330} r={8.5} fill={C.turquoise} />
      <circle cx={254} cy={330} r={8.5} fill={C.lilac} />

      {/* рассыпанные детали */}
      <circle cx="54" cy="56" r="11" fill={C.lilac} />
      <circle cx="84" cy="80" r="6.5" fill={C.sun} />
      <path d={petalPath(334, 40, 34, 10, 120)} fill={C.turquoise} />
      <path d="M352 330 h-26 a26 26 0 0 1 26 -26Z" fill={C.apricot} />
    </svg>
  );
}

/** Небольшие детали вокруг фотографии на первом экране. */
export function HeroPhotoPieces({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <path d="M10 70 A50 50 0 0 1 110 70Z" fill={C.sun} />
      <SunRays cx={60} cy={70} r={56} len={22} width={7} angles={[200, 245, 295, 340]} colors={[C.apricot, C.apricotDeep]} />
    </svg>
  );
}

/** Полукруглая тарелка с пятью цветными деталями по краю — визуальный счёт. */
export function MosaicPlate({ className = "" }: { className?: string }) {
  const pegColors = [C.teal, C.apricot, C.sun, C.lilac, C.turquoise];
  const cx = 110;
  const cy = 44;
  const r = 92;
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden="true" focusable="false">
      <rect x="8" y="32" width="204" height="18" rx="9" fill={C.sun} />
      <path d={`M${cx - r} ${cy + 6} A${r} ${r} 0 0 0 ${cx + r} ${cy + 6}Z`} fill={C.board} stroke={C.boardLine} strokeWidth="2" />
      <path d={`M${cx - 58} ${cy + 6} A58 58 0 0 0 ${cx + 58} ${cy + 6}Z`} fill={C.milk} />
      {pegColors.map((col, i) => {
        const deg = 150 - i * 30;
        const a = (deg * Math.PI) / 180;
        const pr = r - 17;
        return <circle key={i} cx={cx + Math.cos(a) * pr} cy={cy + 6 + Math.sin(a) * pr} r={10} fill={col} />;
      })}
    </svg>
  );
}

/** Округлое речевое облако — мотив логопеда. */
export function MosaicSpeech({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      <path
        d="M24 14 H80 A20 20 0 0 1 100 34 V52 A20 20 0 0 1 80 72 H44 L26 90 L30 72 H24 A20 20 0 0 1 4 52 V34 A20 20 0 0 1 24 14Z"
        fill={C.lilac}
      />
      <circle cx="32" cy="43" r="7" fill={C.board} />
      <circle cx="52" cy="43" r="7" fill={C.sun} />
      <circle cx="72" cy="43" r="7" fill={C.board} />
      <path d="M106 26 A22 22 0 0 1 106 60" fill="none" stroke={C.apricot} strokeWidth="6" strokeLinecap="round" />
      <path d="M114 16 A34 34 0 0 1 114 70" fill="none" stroke={C.turquoise} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Пара изогнутых следов движения — мотив хореографии. */
export function MosaicDance({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      <path d="M10 78 C 34 20, 62 96, 92 30" fill="none" stroke={C.apricot} strokeWidth="10" strokeLinecap="round" />
      <path d="M26 92 C 52 46, 74 104, 110 52" fill="none" stroke={C.turquoise} strokeWidth="7" strokeLinecap="round" />
      <circle cx="98" cy="18" r="8" fill={C.sun} />
      <circle cx="112" cy="36" r="5" fill={C.lilac} />
      <circle cx="12" cy="56" r="5" fill={C.lilac} />
    </svg>
  );
}

/** Фрагмент главной композиции для раздела контактов. */
export function MosaicHouseSmall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true" focusable="false">
      <SunRays cx={136} cy={92} r={52} len={22} width={7} angles={[200, 240, 280, 320]} colors={[C.apricot, C.sun]} />
      <path d="M90 92 A46 46 0 0 1 182 92Z" fill={C.sun} />
      <rect x="22" y="84" width="92" height="74" rx="10" fill={C.turquoise} />
      <path d="M18 88 L68 42 L118 88Z" fill={C.apricotDeep} stroke={C.apricotDeep} strokeWidth="10" strokeLinejoin="round" />
      <path d="M38 158 V128 A13 13 0 0 1 64 128 V158Z" fill={C.lilac} />
      <QuarterWindow cx={90} cy={116} r={13} gap={2} colors={[C.sun, C.sunLight, C.sun, C.sunLight]} />
    </svg>
  );
}

/** Маленькие формы-маркеры: круг, арка, лепесток, четверть круга. */
export function ShapeMark({ shape, color, className = "" }: { shape: "circle" | "arch" | "petal" | "quarter"; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      {shape === "circle" && <circle cx="20" cy="20" r="17" fill={color} />}
      {shape === "arch" && <path d="M3 37 V20 A17 17 0 0 1 37 20 V37Z" fill={color} />}
      {shape === "petal" && <path d={petalPath(6, 34, 40, 13, -45)} fill={color} />}
      {shape === "quarter" && <path d="M4 36 V4 A32 32 0 0 1 36 36Z" fill={color} />}
    </svg>
  );
}

export const mosaicColors = C;
