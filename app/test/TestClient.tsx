"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  id: number;
  asse: number;
  type: "scale" | "open";
  text: string;
  l?: string;
  r?: string;
  reverse?: boolean;
}

interface ProfileEntry {
  name: string;
  text: string;
}

interface AxisProfile {
  title: string;
  articleTitle: string;
  articleSlug: string;
  dense: ProfileEntry;
  soglia: ProfileEntry;
  active: ProfileEntry;
}

type Answer =
  | { type: "scale"; asse: number; score: number }
  | { type: "open"; asse: number; text: string };

// ─── Data ─────────────────────────────────────────────────────────────────────

const questions: Question[] = [
  { id: 1, asse: 5, type: "open", text: "Qualcuno critica qualcosa che hai fatto — non il modo, ma proprio la scelta. Cosa succede dentro di te nel primo secondo, prima ancora di aprire bocca?" },
  { id: 2, asse: 1, type: "scale", text: "Quando finisce una giornata difficile, quanto riesci a lasciarla andare senza che continui a girare nella testa?", l: "gira per ore, non riesco a fermarlo", r: "si deposita da solo, quasi senza sforzo" },
  { id: 3, asse: 4, type: "scale", text: "Ci sono momenti — in natura, in musica, in silenzio — in cui qualcosa si apre dentro di te prima che la mente abbia ancora nominato cosa sta succedendo. Con che frequenza accade?", l: "non ricordo che sia mai successo", r: "accade spesso, e lo riconosco" },
  { id: 4, asse: 2, type: "open", text: "Pensa a una convinzione che hai su te stesso che porti da almeno cinque anni. Hai mai passato anche solo un'ora a chiederti se è ancora vera — o la dai per acquisita?" },
  { id: 5, asse: 3, type: "scale", text: "In questo momento, mentre leggi, sai dove tieni la tensione nel corpo?", l: "non ci ho mai fatto caso", r: "sì, e so anche da quando è lì" },
  { id: 6, asse: 1, type: "scale", text: "Quando qualcuno descrive il tuo carattere in modo che non ti rispecchia, quanto ti disturba?", l: "molto, sento che non mi ha capito", r: "poco, so che nessuna descrizione mi contiene davvero" },
  { id: 7, asse: 5, type: "scale", text: "Nell'ultima settimana, quante volte hai fatto qualcosa per abitudine — e te ne sei accorto solo dopo?", l: "raramente, sono abbastanza presente nelle mie scelte", r: "spesso, la giornata scorre quasi da sola", reverse: true },
  { id: 8, asse: 2, type: "scale", text: 'Quanto spesso usi frasi come "sono fatto così", "è ovvio che", "questa persona è chiaramente..."?', l: "molto spesso, mi vengono naturali", r: "quasi mai, mi accorgo quando sto semplificando", reverse: true },
  { id: 9, asse: 4, type: "open", text: "Quando è stata l'ultima volta che hai sentito qualcosa di vero — non un pensiero, non un'emozione nominabile — ma qualcosa che ti orientava senza che tu sapessi ancora cosa fosse?" },
  { id: 10, asse: 3, type: "open", text: "Pensa all'ultima settimana. Il tuo corpo ti ha mandato un segnale che hai ignorato — stanchezza, tensione, un disagio fisico in una situazione specifica. Lo hai ascoltato o rimandato?" },
  { id: 11, asse: 1, type: "open", text: "C'è un pensiero ricorrente che torna nelle stesse situazioni — quasi sempre lo stesso, quasi sempre con la stessa intensità. Lo riconosci come un pensiero, o ti sembra ancora una valutazione oggettiva della realtà?" },
  { id: 12, asse: 5, type: "scale", text: "Quando eviti una situazione che ti mette a disagio, quanto spesso te ne accorgi mentre la stai evitando — e non solo dopo?", l: "quasi mai, lo realizzo dopo", r: "quasi sempre, lo vedo nel momento" },
  { id: 13, asse: 2, type: "scale", text: 'Quanto ti riesce facile dire "non lo so" su qualcosa che ti riguarda direttamente?', l: "difficile, preferisco avere una posizione", r: "abbastanza naturale, l'incertezza non mi disturba" },
  { id: 14, asse: 3, type: "scale", text: "Quando sei in una conversazione che ti pesa, il tuo respiro cambia. Te ne accorgi?", l: "no, non ci faccio caso", r: "sì, e a volte mi aiuta a capire cosa sta succedendo davvero" },
  { id: 15, asse: 4, type: "scale", text: "Hai mai avuto la sensazione che una direzione fosse giusta — non perché l'avevi ragionata, ma perché qualcosa dentro di te lo sapeva già?", l: "no, mi fido quasi solo del ragionamento", r: "sì, e spesso quella direzione si è rivelata quella vera" },
  { id: 16, asse: 1, type: "scale", text: "Quanto distingui tra quello che pensi e quello che sei?", l: "quasi per niente, i miei pensieri sono io", r: "abbastanza, so che i pensieri passano e io resto" },
  { id: 17, asse: 5, type: "open", text: "Quando hai cambiato idea profondamente su qualcosa che ti riguardava — non per pressione esterna, ma perché qualcosa si è aperto dentro — quanto tempo fa è successo?" },
  { id: 18, asse: 2, type: "open", text: "C'è qualcosa che pensi di te stesso con così tanta certezza che non ti sei mai fermato a metterla in dubbio? Cosa succederebbe se quella certezza fosse solo un'abitudine di pensiero?" },
  { id: 19, asse: 3, type: "scale", text: "Quanto ascolti il corpo come fonte di informazione — non solo di dolore o stanchezza, ma come segnale su persone, situazioni, scelte?", l: "quasi mai, mi fido più della testa", r: "spesso, il corpo mi dice cose che la mente non ha ancora elaborato" },
  { id: 20, asse: 4, type: "open", text: "C'è un luogo, un suono, un momento della giornata in cui qualcosa in te si quieta senza che tu lo cerchi attivamente? Descrivilo." },
  { id: 21, asse: 1, type: "scale", text: "Quanto spesso ti osservi mentre stai reagendo — non dopo, ma durante?", l: "quasi mai, mi accorgo solo a posteriori", r: "abbastanza spesso, c'è qualcosa in me che guarda anche mentre accade" },
  { id: 22, asse: 5, type: "scale", text: "Quando qualcosa non va come vuoi, la prima risposta è cercare di cambiare la situazione, o chiederti cosa in te si sta attivando?", l: "cambio la situazione, è più utile", r: "guardo prima cosa si muove dentro" },
  { id: 23, asse: 2, type: "scale", text: "Quanto le tue opinioni su te stesso sono cambiate negli ultimi tre anni?", l: "poco, sono sostanzialmente la stessa persona", r: "molto, alcune cose che credevo vere si sono rivelate interpretazioni" },
  { id: 24, asse: 3, type: "open", text: 'In quale parte del corpo senti più spesso una tensione che non riesci a spiegare razionalmente — che c\'è anche quando tutto "va bene"?' },
  { id: 25, asse: 4, type: "scale", text: "Quanto spesso rimani in un'esperienza — un tramonto, un silenzio, una musica — senza trasformarla subito in qualcosa da raccontare o da ricordare?", l: "quasi mai, la mente si attiva subito", r: "abbastanza spesso, a volte resto lì senza fare nulla con quello che sento" },
];

const profiles: Record<number, AxisProfile> = {
  1: {
    title: "Identificazione",
    articleTitle: "Non sei i tuoi pensieri. Ma ci vuole coraggio per scoprirlo.",
    articleSlug: "/blog/non-sei-i-tuoi-pensieri",
    dense: {
      name: "Il narratore",
      text: "C'è una storia che porti su te stesso da così tanto tempo che non la riconosci più come storia — la chiami carattere, destino, natura. Ogni volta che qualcuno tocca quella storia, qualcosa in te si irrigidisce prima ancora che tu abbia deciso di difenderti. Non è debolezza: è il segno che quella storia è diventata la casa. Il problema non è abitarla — è aver dimenticato che è stata costruita. Da qualche parte in te esiste qualcosa che ha osservato tutto quello che hai vissuto oggi, senza essere nessuna delle cose che ha osservato. Quella cosa non ha ancora un nome. Ma era lì, anche mentre leggevi questa frase.",
    },
    soglia: {
      name: "Il testimone che si distrae",
      text: "Hai già sentito, almeno una volta, quella strana sensazione di guardarti dall'esterno mentre stavi reagendo — e di sapere, in quel momento, che la reazione non era tutta te. Quel momento è reale. Il problema è che dura poco: la mente torna a identificarsi, la storia riprende il comando, e quell'osservatore silenzioso sparisce di nuovo nel rumore. Non devi cercarlo. Devi solo imparare a riconoscerlo quando si affaccia — perché si affaccia più spesso di quanto pensi.",
    },
    active: {
      name: "Il testimone",
      text: "C'è qualcosa in te che non si è mai completamente perso nei suoi stessi pensieri. Lo chiami distacco, lucidità, presenza — il nome cambia, ma la qualità è la stessa: uno spazio interno da cui puoi guardare senza essere consumato da quello che guardi. Questo non significa essere freddo o assente. Significa che la storia che racconti su te stesso non ha mai avuto l'ultima parola. Continua a coltivare quello spazio — non come conquista, ma come abitudine quotidiana di tornare.",
    },
  },
  2: {
    title: "Linguaggio",
    articleTitle: "Ogni certezza che hai su te stesso è anche un confine che hai smesso di esaminare.",
    articleSlug: "/blog/ogni-certezza",
    dense: {
      name: "Il cartografo",
      text: "La mente è una macchina straordinaria nella produzione di certezze. Sa dirti chi sei, cosa vale, cosa è ovvio, cosa non cambierà mai. E lo fa con tale velocità che quelle certezze sembrano percezioni dirette della realtà — non interpretazioni, non abitudini di pensiero. Il Taoismo lo dice in apertura del suo testo più antico: il nome che può essere nominato non è il nome eterno. Non perché i nomi siano inutili — ma perché ogni nome cattura meno di ciò che nomina. C'è sempre uno spazio tra la parola e la cosa. Cominciare a sentire quello spazio non destabilizza: libera.",
    },
    soglia: {
      name: "Il traduttore",
      text: "Hai già cominciato a sentire che alcune delle cose che dici su te stesso sono più fragili di quanto sembrino. Forse te ne accorgi in certi momenti — quando una vecchia convinzione non regge più di fronte a qualcosa che hai vissuto, o quando ti sorprendi a pensare il contrario di quello che pensavi. Questo non è contraddizione: è il segno che la coscienza sta crescendo oltre le sue etichette. Lo spazio tra ciò che sei e ciò che credi di essere è esattamente il territorio in cui avviene qualcosa di reale.",
    },
    active: {
      name: "Lo spazio tra le parole",
      text: "Sai già che il dito non è la luna. Sai che ogni descrizione di te stesso è provvisoria — utile, ma non definitiva. Questa consapevolezza non ti rende incerto: ti rende più libero di cambiare, di sorprenderti, di contraddirti senza sentirti in pericolo. La sfida ora non è smettere di usare le parole — è usarle sapendo sempre che dall'altra parte c'è qualcosa che eccede ogni nome. Continua a tenere aperto quello spazio. È lì che vive ciò che nessuna etichetta può contenere.",
    },
  },
  3: {
    title: "Corpo",
    articleTitle: "Il corpo non è solo tuo. È il tempio in cui la coscienza si fa forma.",
    articleSlug: "/blog/il-corpo-non-e-solo-tuo",
    dense: {
      name: "L'esiliato",
      text: "Viviamo in un'epoca che ha imparato a trattare il corpo come uno strumento — qualcosa da ottimizzare, da silenziare quando protesta, da spingere oltre i suoi segnali. Il risultato è una forma sottile di esilio: la mente che abita il corpo senza davvero abitarlo. Ma il corpo non dimentica nulla. Registra ogni tensione non esaminata, ogni emozione non attraversata, ogni separazione che la mente ha dichiarato definitiva. Non si tratta di fare yoga o meditazione. Si tratta di cominciare a chiedersi: cosa sta cercando di dirti adesso, in questo momento, quella parte di te che non usa le parole?",
    },
    soglia: {
      name: "Il pellegrino",
      text: "Stai cominciando a capire che il corpo sa cose che la mente non ha ancora elaborato. Forse lo senti in certi momenti di disagio fisico inspiegabile, o in quella tensione che arriva sempre nelle stesse situazioni. Questi non sono capricci del sistema nervoso: sono informazioni. Il corpo è il primo livello di lettura della realtà — quello che risponde prima che il pensiero costruisca la sua versione dei fatti. Imparare a leggere queste informazioni non richiede competenze speciali. Richiede solo di fermarsi un momento prima di andare avanti.",
    },
    active: {
      name: "Il tempio aperto",
      text: "Per te il corpo non è un ostacolo né uno strumento — è una soglia. Sai già che certe tensioni portano messaggi, che certi movimenti aprono spazi che il pensiero da solo non raggiungerebbe. Questa capacità di leggere il corpo come fonte di conoscenza è rara, e va coltivata con la stessa cura che si darebbe a qualsiasi altro tipo di intelligenza. Il tempio non si abita una volta sola: si attraversa ogni giorno, con attenzione sempre più sottile.",
    },
  },
  4: {
    title: "Richiamo",
    articleTitle: "C'è qualcosa che senti prima ancora di sapere che stai sentendo qualcosa.",
    articleSlug: "/blog/qualcosa-che-senti-prima",
    dense: {
      name: "Il sordo",
      text: "Non è colpa tua. Viviamo immersi in un rumore talmente continuo — notifiche, opinioni, aspettative, narrazioni — che il segnale più sottile semplicemente non arriva. O arriva, ma viene immediatamente coperto da qualcos'altro. Eppure quel segnale esiste. La Qabbalah lo chiama la scintilla nascosta nel guscio: non scomparsa, solo sepolta sotto strati di rumore accumulato. Il primo passo non è cercarlo attivamente — è creare le condizioni perché possa farsi sentire. Silenzio. Lentezza. Un momento al giorno in cui non stai producendo nulla.",
    },
    soglia: {
      name: "Chi si ferma",
      text: "Hai già sentito quel richiamo — quella qualità di certi momenti in cui qualcosa si apre prima che la mente abbia nominato cosa sta succedendo. Forse in natura, forse in musica, forse in un silenzio inaspettato. Il problema è che dura poco e poi la mente interviene, classifica, trasforma l'esperienza in contenuto. Non devi impedirlo — è naturale. Ma puoi imparare a restare un momento di più prima che arrivi la classificazione. Quello spazio, anche brevissimo, è già il bordo di qualcosa di più grande.",
    },
    active: {
      name: "Chi riconosce",
      text: "Conosci già quella qualità di attenzione che precede il pensiero. Sai come si sente quando qualcosa ti orienta prima che tu sappia ancora verso cosa. E sai anche che non si costruisce a volontà — si riceve, quando le condizioni sono giuste. La tua pratica ora non è trovarlo: è riconoscerlo quando arriva, senza afferrarlo troppo in fretta. Il richiamo non chiede di essere capito. Chiede solo di essere ascoltato.",
    },
  },
  5: {
    title: "Reattività",
    articleTitle: "Non stai scegliendo. Stai reagendo. E probabilmente non te ne accorgi.",
    articleSlug: "/blog/non-stai-scegliendo",
    dense: {
      name: "L'automatico",
      text: "C'è un meccanismo dentro di te che risponde prima che tu abbia deciso di rispondere. Non è un difetto del carattere — è il modo in cui la mente ha imparato a proteggersi, a muoversi veloce, a non restare esposta troppo a lungo. Il problema è quando questo meccanismo prende il comando anche dove non serve protezione — nelle conversazioni ordinarie, nelle scelte quotidiane, nelle relazioni. Gurdjieff lo chiamava meccanicità: non l'assenza di movimento, ma il movimento senza presenza. Il primo atto non è cambiare la reazione. È vederla mentre accade — anche solo un secondo dopo che è cominciata.",
    },
    soglia: {
      name: "Chi si accorge",
      text: "Hai già sviluppato una certa capacità di vederti reagire — non sempre in tempo, ma abbastanza spesso da sapere che esiste uno spazio tra lo stimolo e la risposta. Quello spazio è tutto. È lì che vive la scelta reale. La sfida ora è espanderlo — non attraverso la forza di volontà, ma attraverso la pratica dell'attenzione. Ogni volta che ti accorgi di una reazione automatica, anche dopo che è già avvenuta, stai già esercitando qualcosa di fondamentale.",
    },
    active: {
      name: "Chi sceglie",
      text: "Non sempre, non perfettamente — ma con una frequenza che fa differenza. Tra quello che ti succede e quello che fai c'è uno spazio che hai imparato a riconoscere e, sempre più spesso, ad abitare. Questo non ti rende impermeabile alle reazioni: ti rende capace di non esserne completamente governato. La tradizione buddhista chiama questo equanimità — non indifferenza, ma la capacità di restare presente senza essere sequestrato. Continua a coltivare quello spazio. È la forma più concreta di libertà che esista.",
    },
  },
};

// ─── Zone styling ─────────────────────────────────────────────────────────────

const zoneStyles = {
  dense: { bg: "rgba(199,186,140,0.10)", color: "var(--gold)" },
  soglia: { bg: "rgba(160,152,129,0.08)", color: "var(--text2)" },
  active: { bg: "rgba(100,165,100,0.10)", color: "#7aaa88" },
};

const zoneBarColor = {
  dense: "var(--gold-muted)",
  soglia: "var(--text2)",
  active: "#7aaa88",
};

// ─── Report computation ───────────────────────────────────────────────────────

function computeReport(answers: Record<number, Answer>) {
  const axisScores: Record<number, { sum: number; count: number }> = {
    1: { sum: 0, count: 0 },
    2: { sum: 0, count: 0 },
    3: { sum: 0, count: 0 },
    4: { sum: 0, count: 0 },
    5: { sum: 0, count: 0 },
  };
  const axisMax: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  Object.values(answers).forEach((a) => {
    if (a.type === "scale") {
      axisScores[a.asse].sum += a.score;
      axisScores[a.asse].count++;
    }
  });
  questions.forEach((q) => {
    if (q.type === "scale") axisMax[q.asse] = (axisMax[q.asse] || 0) + 7;
  });

  let densestAxis: number | null = null, densestPct = 1;
  let vividestAxis: number | null = null, vividestPct = 0;

  [1, 2, 3, 4, 5].forEach((a) => {
    const s = axisScores[a];
    if (s.count === 0) return;
    const pct = s.sum / axisMax[a];
    if (pct < densestPct) { densestPct = pct; densestAxis = a; }
    if (pct > vividestPct) { vividestPct = pct; vividestAxis = a; }
  });

  let introText = "Questa è la tua mappa. Non è un giudizio — è una fotografia di dove sei adesso.";
  if (densestAxis && vividestAxis && densestAxis !== vividestAxis) {
    const dp = profiles[densestAxis], vp = profiles[vividestAxis];
    introText = `La dimensione più densa in te è quella del ${dp.title.toLowerCase()}. Da lì puoi cominciare. Il tuo punto di forza è la dimensione del ${vp.title.toLowerCase()} — da lì è più facile muoversi.`;
  }

  const axes = [1, 2, 3, 4, 5].map((a) => {
    const s = axisScores[a];
    const p = profiles[a];
    let zone: "dense" | "soglia" | "active";
    let zoneLabel: string;
    let profileData: ProfileEntry;

    if (s.count === 0) {
      zone = "soglia"; zoneLabel = "Soglia"; profileData = p.soglia;
    } else {
      const pct = s.sum / axisMax[a];
      if (pct < 0.43) { zone = "dense"; zoneLabel = "Sonno denso"; profileData = p.dense; }
      else if (pct < 0.72) { zone = "soglia"; zoneLabel = "Soglia"; profileData = p.soglia; }
      else { zone = "active"; zoneLabel = "Presenza attiva"; profileData = p.active; }
    }

    const barPct = s.count > 0 ? Math.round((s.sum / axisMax[a]) * 100) : 50;
    return { a, p, zone, zoneLabel, profileData, barPct };
  });

  return { introText, axes };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestClient() {
  const [screen, setScreen] = useState<"intro" | "q" | "report">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [selectedScale, setSelectedScale] = useState<number | null>(null);
  const [openText, setOpenText] = useState("");

  const q = questions[current];
  const isNextEnabled = q?.type === "scale" ? selectedScale !== null : openText.trim().length >= 3;

  function advance() {
    const next = current + 1;
    if (next >= questions.length) {
      setScreen("report");
    } else {
      setCurrent(next);
      setSelectedScale(null);
      setOpenText("");
    }
  }

  function handleSelectScale(val: number) {
    setSelectedScale(val);
    const score = q.reverse ? 8 - val : val;
    setAnswers((prev) => ({ ...prev, [current]: { type: "scale", asse: q.asse, score } }));
  }

  function handleNext() {
    if (q.type === "open" && openText.trim().length >= 3) {
      setAnswers((prev) => ({ ...prev, [current]: { type: "open", asse: q.asse, text: openText } }));
    }
    advance();
  }

  const reportData = screen === "report" ? computeReport(answers) : null;

  // ── Shared button style helpers ──────────────────────────────────────────────
  const btnBase: React.CSSProperties = {
    background: "transparent",
    border: "0.5px solid var(--border)",
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    transition: "border-color 0.15s, color 0.15s",
  };

  return (
    <div style={{ maxWidth: "740px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

      {/* ── INTRO ─────────────────────────────────────────────────────────── */}
      {screen === "intro" && (
        <div>
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold-muted)", marginBottom: "0.75rem" }}>
            Test filosofico
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "var(--gold)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
            Quanto sei lontano<br />da te stesso?
          </h1>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--gold-muted)", marginBottom: "2rem" }} />
          <p style={{ fontSize: "1.25rem", color: "var(--text2)", lineHeight: 1.85, marginBottom: "1.75rem" }}>
            Un test in 25 domande. Non misura quanto sai — misura come stai. Il risultato è una mappa a cinque dimensioni: dove il sonno è più denso in te, e da dove puoi cominciare a tornare.
          </p>
          <div style={{ fontSize: "1rem", color: "var(--text3)", lineHeight: 1.75, padding: "1.1rem 1.4rem", border: "0.5px solid var(--border)", marginBottom: "2.5rem" }}>
            Non ci sono risposte giuste o sbagliate. Rispondi con la prima cosa che senti, non con quello che pensi di dover sentire. Alcune domande richiedono una risposta scritta breve — anche una sola frase va bene.
          </div>
          <button
            onClick={() => setScreen("q")}
            style={{ ...btnBase, padding: "0.75rem 2.25rem", fontSize: "0.875rem", color: "var(--gold)", borderColor: "var(--gold-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Inizia
          </button>
        </div>
      )}

      {/* ── QUESTION ──────────────────────────────────────────────────────── */}
      {screen === "q" && (
        <div>
          {/* Progress */}
          <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "2.5rem" }}>
            <div style={{ height: "1px", backgroundColor: "var(--gold-muted)", width: `${(current / questions.length) * 100}%`, transition: "width 0.3s" }} />
          </div>

          <p style={{ fontSize: "0.875rem", color: "var(--text3)", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>
            {current + 1} di {questions.length}
          </p>

          <p style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)", color: "var(--white)", lineHeight: 1.7, marginBottom: "2.25rem", fontWeight: 300 }}>
            {q.text}
          </p>

          {/* Scale */}
          {q.type === "scale" && (
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.9rem", gap: "1rem" }}>
                <span style={{ fontSize: "0.875rem", color: "var(--text3)", lineHeight: 1.5, maxWidth: "45%" }}>{q.l}</span>
                <span style={{ fontSize: "0.875rem", color: "var(--text3)", lineHeight: 1.5, maxWidth: "45%", textAlign: "right" }}>{q.r}</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleSelectScale(val)}
                    style={{
                      flex: 1,
                      height: "54px",
                      fontSize: "1.1rem",
                      fontFamily: "inherit",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      color: selectedScale === val ? "var(--gold)" : "var(--text2)",
                      backgroundColor: selectedScale === val ? "var(--surface)" : "transparent",
                      border: `0.5px solid ${selectedScale === val ? "var(--gold-muted)" : "var(--border)"}`,
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Open */}
          {q.type === "open" && (
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text2)", marginBottom: "0.75rem", letterSpacing: "0.06em" }}>
                Scrivi quello che senti, anche in poche parole.
              </p>
              <textarea
                value={openText}
                onChange={(e) => setOpenText(e.target.value)}
                placeholder="..."
                style={{
                  width: "100%",
                  minHeight: "120px",
                  padding: "1rem 1.25rem",
                  fontSize: "1.15rem",
                  fontFamily: "inherit",
                  color: "var(--white)",
                  backgroundColor: "var(--bg)",
                  border: "0.5px solid var(--border)",
                  resize: "vertical",
                  lineHeight: 1.75,
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold-muted)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          )}

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={advance}
              style={{ fontSize: "0.875rem", color: "var(--text3)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.1em" }}
            >
              salta
            </button>
            <button
              onClick={handleNext}
              disabled={!isNextEnabled}
              style={{
                ...btnBase,
                padding: "0.7rem 2rem",
                fontSize: "0.875rem",
                color: isNextEnabled ? "var(--gold)" : "var(--text3)",
                borderColor: isNextEnabled ? "var(--gold-muted)" : "var(--border)",
                cursor: isNextEnabled ? "pointer" : "not-allowed",
                opacity: isNextEnabled ? 1 : 0.4,
              }}
            >
              continua
            </button>
          </div>
        </div>
      )}

      {/* ── REPORT ────────────────────────────────────────────────────────── */}
      {screen === "report" && reportData && (
        <div id="print-report">

          {/* Print-only header — hidden on screen, visible when printing */}
          <div className="print-header-only">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Prima del Verbo" />
            <div className="print-header-text">
              <span className="print-brand">Prima del Verbo</span>
              <span className="print-sub">Test filosofico · Dalla separazione all'Uno</span>
            </div>
            <div className="print-divider" />
          </div>

          {/* Report header */}
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold-muted)", marginBottom: "0.75rem" }}>
            La tua mappa
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 300, color: "var(--gold)", marginBottom: "1rem" }}>
            Questa è la tua mappa
          </h1>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--gold-muted)", marginBottom: "1.5rem" }} />
          <p style={{ fontSize: "1.25rem", color: "var(--text2)", lineHeight: 1.85, marginBottom: "2.5rem" }}>
            {reportData.introText}
          </p>

          {/* Axis cards */}
          {reportData.axes.map(({ a, p, zone, zoneLabel, profileData, barPct }) => (
            <div
              key={a}
              className="axis-card-print"
              style={{
                backgroundColor: "var(--surface)",
                border: "0.5px solid var(--border)",
                padding: "1.5rem 1.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text3)", marginBottom: "0.25rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {p.title}
                  </p>
                  <p style={{ fontSize: "1.2rem", color: "var(--white)", fontWeight: 400 }}>
                    {profileData.name}
                  </p>
                </div>
                <span style={{ fontSize: "0.8rem", padding: "4px 12px", whiteSpace: "nowrap", letterSpacing: "0.08em", backgroundColor: zoneStyles[zone].bg, color: zoneStyles[zone].color }}>
                  {zoneLabel}
                </span>
              </div>

              {/* Bar */}
              <div style={{ height: "2px", backgroundColor: "var(--border)", marginBottom: "1.1rem" }}>
                <div style={{ height: "2px", width: `${barPct}%`, backgroundColor: zoneBarColor[zone], transition: "width 0.6s" }} />
              </div>

              <p style={{ fontSize: "1.1rem", color: "var(--text2)", lineHeight: 1.85 }}>
                {profileData.text}
              </p>

              {/* Article link */}
              <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "0.5px solid var(--border)" }}>
                <p style={{ fontSize: "0.8rem", color: "var(--text3)", marginBottom: "0.4rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Articolo correlato
                </p>
                <Link
                  href={p.articleSlug}
                  style={{ fontSize: "1rem", color: "var(--gold-muted)", textDecoration: "none", borderBottom: "0.5px solid var(--border)", paddingBottom: "1px", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gold-muted)")}
                >
                  {p.articleTitle}
                </Link>
              </div>
            </div>
          ))}

          {/* Footer row */}
          <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text3)", fontStyle: "italic" }}>
              © Yan Pastushenko · <em>Dalla separazione all'Uno</em> · 2026
            </p>
            <button
              className="no-print"
              onClick={() => window.print()}
              style={{ ...btnBase, display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.4rem", fontSize: "0.875rem", color: "var(--text2)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold-muted)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Scarica PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
