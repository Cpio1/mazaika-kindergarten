/**
 * Декоративные детали настольной мозаики. У каждой — собственный силуэт:
 * полукруг, лучи-капсулы, четверть круга, облако, зёрна, следы, пунктир, капля-метка.
 * Все рисунки помечены aria-hidden и не перехватывают нажатия.
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
  sunSoft: "#fcefc2",
  lilac: "#b49be0",
  milk: "#fbf6ec",
};

const svgProps = { "aria-hidden": true, focusable: false } as const;

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

/* ───────────── Первый экран: солнце рядом с фото ───────────── */

/**
 * Мозаичный домик под восходящим солнцем: полукруг, три коротких луча и цветная четверть круга.
 * Четверть круга — последняя деталь, она мягко встаёт на место при загрузке.
 */
export function HeroCluster({ className = "" }: { className?: string }) {
  const cx = 104;
  const cy = 62;
  const rays = [210, 270, 330].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x1: cx + Math.cos(a) * 43, y1: cy + Math.sin(a) * 43, x2: cx + Math.cos(a) * 55, y2: cy + Math.sin(a) * 55 };
  });
  return (
    <svg viewBox="0 0 160 176" className={className} {...svgProps}>
      {rays.map((r, i) => (
        <line key={i} {...r} stroke={C.apricot} strokeWidth="9" strokeLinecap="round" />
      ))}
      <path d={`M${cx - 34} ${cy} A34 34 0 0 1 ${cx + 34} ${cy}Z`} fill={C.sun} />
      <rect x="18" y="116" width="70" height="54" rx="6" fill={C.turquoise} />
      <path d="M8 120 L53 82 L98 120Z" fill={C.apricotDeep} stroke={C.apricotDeep} strokeWidth="9" strokeLinejoin="round" />
      <path d="M42 170 V150 A11 11 0 0 1 64 150 V170Z" fill={C.sun} />
      <circle cx="75" cy="136" r="7" fill={C.lilac} />
      <path className="mosaic-drop" d={`M${cx + 34} ${cy + 6} V${cy + 34} A28 28 0 0 1 ${cx + 6} ${cy + 6}Z`} fill={C.teal} />
    </svg>
  );
}

/** Волнистый край секции. Рисуется цветом самой секции и выступает над её верхней или нижней границей. */
export function Wave({ fill, className = "", flip = false }: { fill: string; className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      {...svgProps}
    >
      <path d="M0 40 V24 C 180 4 360 2 540 18 S 900 38 1080 20 S 1320 2 1440 14 V40Z" fill={fill} />
    </svg>
  );
}

/** Запасная композиция первого экрана, если фото main-page не подключено. */
export function MosaicScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 360" className={className} {...svgProps}>
      <defs>
        <pattern id="mz-holes" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2.3" fill={C.hole} />
        </pattern>
      </defs>
      <rect x="6" y="6" width="388" height="348" rx="40" fill={C.board} stroke={C.boardLine} strokeWidth="2" />
      <rect x="18" y="18" width="364" height="324" rx="30" fill="url(#mz-holes)" />
      {[210, 270, 330].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={266 + Math.cos(a) * 92}
            y1={214 + Math.sin(a) * 92}
            x2={266 + Math.cos(a) * 118}
            y2={214 + Math.sin(a) * 118}
            stroke={C.apricot}
            strokeWidth="16"
            strokeLinecap="round"
          />
        );
      })}
      <path d="M190 214 A76 76 0 0 1 342 214Z" fill={C.sun} />
      <path d="M66 312 V214 L140 150 L214 214 V312Z" fill={C.turquoise} stroke={C.turquoise} strokeWidth="14" strokeLinejoin="round" />
      <path d="M118 312 V276 A22 22 0 0 1 162 276 V312Z" fill={C.lilac} />
      <path className="mosaic-drop" d="M342 224 V284 A60 60 0 0 1 282 224Z" fill={C.apricotDeep} />
    </svg>
  );
}

/* ───────────── О садике ───────────── */

/** Небольшое речевое облако с волнистым краем — знак языка обучения. */
export function CloudShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 92" className={className} {...svgProps}>
      <g fill={C.lilac}>
        <circle cx="36" cy="40" r="24" />
        <circle cx="62" cy="30" r="28" />
        <circle cx="88" cy="42" r="22" />
        <rect x="14" y="40" width="94" height="32" rx="16" />
        <path d="M30 66 L18 90 L50 70Z" />
      </g>
    </svg>
  );
}

/* ───────────── Питание ───────────── */

/** Тарелка-полукруг с узором и пять маленьких цветных деталей по ободу — визуальный счёт. */
export function PlateGrains({ className = "" }: { className?: string }) {
  const cx = 110;
  const cy = 18;
  const pieces = [C.turquoise, C.apricotDeep, C.sun, C.lilac, C.teal];
  return (
    <svg viewBox="0 0 220 124" className={className} {...svgProps}>
      <rect x="4" y="8" width="212" height="14" rx="7" fill={C.apricot} />
      <path d={`M${cx - 100} ${cy} A100 100 0 0 0 ${cx + 100} ${cy}Z`} fill={C.board} stroke={C.boardLine} strokeWidth="3" />
      <path d={`M${cx - 62} ${cy} A62 62 0 0 0 ${cx + 62} ${cy}Z`} fill={C.sunSoft} />
      <path
        d={`M${cx - 46} ${cy} A46 46 0 0 0 ${cx + 46} ${cy}`}
        fill="none"
        stroke={C.apricot}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="0.1 11"
      />
      <path d={`M${cx - 22} ${cy} A22 22 0 0 0 ${cx + 22} ${cy}Z`} fill={C.sunLight} />
      {pieces.map((col, i) => {
        const deg = 160 - i * 35;
        const a = (deg * Math.PI) / 180;
        const x = cx + Math.cos(a) * 81;
        const y = cy + Math.sin(a) * 81;
        return i % 2 === 0 ? (
          <circle key={i} cx={x} cy={y} r="8.5" fill={col} />
        ) : (
          <ellipse key={i} cx={x} cy={y} rx="12" ry="7" transform={`rotate(${deg + 90} ${x} ${y})`} fill={col} />
        );
      })}
    </svg>
  );
}

/* ───────────── Занятия ───────────── */

/** Логопед: два речевых облака разного размера. */
export function SpeechPair({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 104" className={className} {...svgProps}>
      <g fill={C.lilac}>
        <circle cx="30" cy="56" r="20" />
        <circle cx="52" cy="46" r="24" />
        <circle cx="74" cy="58" r="18" />
        <rect x="12" y="56" width="78" height="28" rx="14" />
        <path d="M24 80 L14 102 L44 84Z" />
      </g>
      <circle cx="34" cy="66" r="5" fill={C.board} />
      <circle cx="51" cy="66" r="5" fill={C.board} />
      <circle cx="68" cy="66" r="5" fill={C.board} />
      <g fill={C.turquoise}>
        <ellipse cx="104" cy="26" rx="24" ry="18" />
        <path d="M112 40 L126 56 L100 42Z" />
      </g>
      <path d="M96 26 h16" stroke={C.board} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function Footprint({ x, y, angle, color }: { x: number; y: number; angle: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} fill={color}>
      <ellipse cx="0" cy="6" rx="11" ry="17" />
      <circle cx="-8.5" cy="-17" r="4.4" />
      <circle cx="-1.5" cy="-20.5" r="4.4" />
      <circle cx="6" cy="-18" r="4" />
    </g>
  );
}

/** Хореография: пара танцевальных следов вдоль плавной дуги. */
export function DanceSteps({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 104" className={className} {...svgProps}>
      <path d="M6 96 C 26 22, 108 2, 136 76" fill="none" stroke={C.apricot} strokeWidth="7" strokeLinecap="round" strokeDasharray="0.1 14" />
      <Footprint x={44} y={58} angle={40} color={C.teal} />
      <Footprint x={96} y={48} angle={112} color={C.turquoise} />
    </svg>
  );
}

/* ───────────── Контакты ───────────── */

/** Небольшая карта: кварталы, дороги, пунктирная дорожка к мозаичному домику. */
export function MapScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" className={className} {...svgProps}>
      <rect width="320" height="220" fill={C.board} />
      <rect x="14" y="14" width="150" height="96" rx="20" fill="#d5f1ed" />
      <rect x="232" y="14" width="74" height="104" rx="20" fill="#ece4f8" />
      <circle cx="56" cy="186" r="40" fill={C.sunSoft} />
      <rect x="236" y="160" width="70" height="52" rx="18" fill="#fde4d2" />
      <path d="M-10 140 C 80 124, 150 160, 330 120" fill="none" stroke={C.milk} strokeWidth="20" strokeLinecap="round" />
      <path d="M200 -10 C 190 80, 222 150, 212 230" fill="none" stroke={C.milk} strokeWidth="16" strokeLinecap="round" />
      <path
        d="M58 182 C 96 170, 120 144, 166 140 S 236 128, 252 98"
        fill="none"
        stroke={C.teal}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="0.1 14"
      />
      <circle cx="56" cy="184" r="9" fill={C.sun} />
      <rect x="250" y="66" width="40" height="30" rx="4" fill={C.turquoise} />
      <path d="M244 70 L270 46 L296 70Z" fill={C.apricotDeep} stroke={C.apricotDeep} strokeWidth="7" strokeLinejoin="round" />
      <path d="M264 96 V86 A6 6 0 0 1 276 86 V96Z" fill={C.sun} />
    </svg>
  );
}

/** Цветная лента — мотив хореографии. */
export function Ribbon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 40" preserveAspectRatio="none" className={className} {...svgProps}>
      <path d="M6 22 C 46 2, 86 42, 126 22 S 196 2, 234 20" fill="none" stroke={C.apricot} strokeWidth="9" strokeLinecap="round" />
      <path d="M6 32 C 46 12, 86 52, 126 32 S 196 12, 234 30" fill="none" stroke={C.lilac} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Фон заголовка в виде речевого облака (растягивается по размеру заголовка). */
export function CloudBg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className={className} {...svgProps}>
      <path
        d="M30 80 C 6 80 2 54 20 46 C 12 22 42 8 60 22 C 70 4 108 2 120 20 C 138 6 172 12 172 36 C 196 40 198 76 172 80Z"
        fill={C.lilac}
      />
      <path d="M38 78 L24 98 L64 79Z" fill={C.lilac} />
    </svg>
  );
}

/* ───────────── Мелкие формы ───────────── */

/** Маленькие формы-маркеры: круг, арка, лепесток, четверть круга. */
export function ShapeMark({ shape, color, className = "" }: { shape: "circle" | "arch" | "petal" | "quarter"; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...svgProps}>
      {shape === "circle" && <circle cx="20" cy="20" r="17" fill={color} />}
      {shape === "arch" && <path d="M3 37 V20 A17 17 0 0 1 37 20 V37Z" fill={color} />}
      {shape === "petal" && <path d={petalPath(6, 34, 40, 13, -45)} fill={color} />}
      {shape === "quarter" && <path d="M4 36 V4 A32 32 0 0 1 36 36Z" fill={color} />}
    </svg>
  );
}

export const mosaicColors = C;
