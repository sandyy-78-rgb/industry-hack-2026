"use client";

import Image from "next/image";
import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";

export default function Home() {
  const [question, setQuestion] = useState("");

  const handleExplore = () => {
    document
      .getElementById("research")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <button
            onClick={() => scrollTo("top")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-lg font-black text-black shadow-lg shadow-cyan-400/20">
              B
            </div>

            <div>
              <div className="text-xl font-bold tracking-tight">
                BIOSAGE
              </div>

              <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                Biomedical Intelligence
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <button
              onClick={() => scrollTo("problem")}
              className="transition hover:text-cyan-300"
            >
              Why BIOSAGE
            </button>

            <button
              onClick={() => scrollTo("features")}
              className="transition hover:text-cyan-300"
            >
              Features
            </button>

            <button
              onClick={() => scrollTo("how")}
              className="transition hover:text-cyan-300"
            >
              How it works
            </button>

            <button
              onClick={() => scrollTo("research")}
              className="transition hover:text-cyan-300"
            >
              Research
            </button>
          </div>

          <button
            onClick={handleExplore}
            className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
          >
            Explore BIOSAGE
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section id="top" className="relative overflow-hidden">

        <AnimatedBackground />

        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-32 pt-24 lg:grid-cols-2">

          {/* HERO COPY */}
          <div className="relative z-10">

            <div className="mb-7 inline-flex animate-pulse items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              AI-POWERED BIOMEDICAL RESEARCH
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Turn biomedical
              <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                evidence into insight.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
              BIOSAGE helps researchers explore diseases, compounds and
              scientific literature using AI grounded in real biomedical
              evidence.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleExplore}
                className="rounded-full bg-cyan-400 px-7 py-3.5 font-semibold text-black shadow-xl shadow-cyan-400/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300"
              >
                Start Research →
              </button>

              <button
                onClick={() => scrollTo("how")}
                className="rounded-full border border-white/15 px-7 py-3.5 text-center font-medium text-gray-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-white"
              >
                See how it works
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-xs text-gray-500">
              <span>✓ Evidence grounded</span>
              <span>✓ Source traceable</span>
              <span>✓ Research focused</span>
            </div>

            {/* MINI STATS */}
            <div className="mt-14 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <div className="text-2xl font-bold text-cyan-300">20M+</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                  Research papers
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <div className="text-2xl font-bold text-cyan-300">10M+</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                  Compounds
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <div className="text-2xl font-bold text-cyan-300">∞</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                  Research questions
                </div>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">

            {/* Biomedical image */}
            <div className="pointer-events-none absolute -right-24 -top-28 z-0 animate-pulse opacity-60">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[80px]" />

              <Image
                src="/hero-biotech.png"
                alt="Futuristic biomedical molecular network"
                width={600}
                height={600}
                priority
                className="relative object-contain drop-shadow-[0_0_60px_rgba(34,211,238,0.25)]"
              />
            </div>

            {/* Floating molecule dots */}
            <div className="absolute -left-6 top-10 h-3 w-3 animate-bounce rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.9)]" />

            <div className="absolute right-10 top-5 h-2 w-2 animate-ping rounded-full bg-blue-400" />

            <div className="absolute -bottom-5 left-16 h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />

            {/* AI Interface */}
            <div className="relative z-10 mt-10">

              <div className="absolute -inset-5 rounded-[40px] bg-cyan-400/5 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a1022]/95 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">

                {/* Window bar */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>

                  <span className="text-xs tracking-widest text-gray-600">
                    BIOSAGE RESEARCH
                  </span>
                </div>

                <div className="p-6">

                  <div className="text-xs uppercase tracking-widest text-gray-600">
                    Research question
                  </div>

                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-gray-300">
                      What is known about metformin and cancer?
                    </p>
                  </div>

                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-[10px] uppercase tracking-widest text-cyan-400">
                      Evidence synthesis
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <p className="text-sm leading-7 text-gray-300">
                    Metformin has been investigated across multiple cancer
                    contexts. Research has explored potential relationships
                    with cellular metabolism and signaling pathways.
                  </p>

                  {/* Evidence */}
                  <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-cyan-300">
                        EVIDENCE STATUS
                      </span>

                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] text-cyan-300">
                        REVIEW SOURCES
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-4/5 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                    </div>

                    <p className="mt-3 text-xs text-gray-500">
                      Retrieved biomedical literature will support the final
                      answer.
                    </p>
                  </div>

                  {/* Sources */}
                  <div className="mt-5">

                    <div className="mb-3 text-xs uppercase tracking-widest text-gray-600">
                      Sources
                    </div>

                    <div className="space-y-2">
                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-gray-400 transition hover:border-cyan-400/20 hover:text-gray-300">
                        [1] PubMed research literature
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-gray-400 transition hover:border-cyan-400/20 hover:text-gray-300">
                        [2] Biomedical compound database
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="relative mx-auto max-w-4xl px-6 pb-24 text-center">
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <p className="mt-8 text-xl font-medium leading-8 text-gray-300 md:text-2xl">
            “Somewhere, something incredible is waiting to be known.”
          </p>

          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cyan-400">
            — Carl Sagan
          </p>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section
        id="problem"
        className="border-y border-white/10 bg-white/[0.02] px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              The challenge
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Biomedical knowledge is growing faster than researchers can read.
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Important evidence is distributed across research papers,
              databases and scientific resources. Finding and connecting that
              information manually takes valuable research time.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Information overload",
                text: "Millions of research publications make it difficult to identify the evidence that matters.",
              },
              {
                number: "02",
                title: "Disconnected knowledge",
                text: "Diseases, compounds, targets and publications exist across different sources.",
              },
              {
                number: "03",
                title: "Verification matters",
                text: "Researchers need to know where an AI-generated insight comes from.",
              },
            ].map((item) => (

              <div
                key={item.number}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
              >

                <span className="text-sm text-cyan-400">
                  {item.number}
                </span>

                <h3 className="mt-8 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  {item.text}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">

        <div className="max-w-3xl">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            One research workspace
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            From question to evidence.
          </h2>

          <p className="mt-5 leading-8 text-gray-400">
            BIOSAGE is designed to help researchers move from a complex
            question to a structured understanding of the available evidence.
          </p>

        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">

          {[
            {
              icon: "⌁",
              title: "Evidence-grounded AI",
              text: "Ask questions about diseases, compounds and biomedical topics with answers grounded in retrieved research.",
            },
            {
              icon: "◇",
              title: "Compound intelligence",
              text: "Explore known properties and relationships for biomedical compounds.",
            },
            {
              icon: "◈",
              title: "Research discovery",
              text: "Surface relevant scientific literature around a disease or compound.",
            },
            {
              icon: "◎",
              title: "Traceable answers",
              text: "Connect AI-generated summaries back to the underlying research sources.",
            },
          ].map((feature) => (

            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5 text-2xl text-cyan-400 transition group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mt-7 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 max-w-lg leading-7 text-gray-500">
                {feature.text}
              </p>

            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how"
        className="border-y border-white/10 bg-white/[0.02] px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              How it works
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Research, without the information maze.
            </h2>

          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-4">

            {[
              ["01", "Ask", "Enter a biomedical research question."],
              ["02", "Retrieve", "Find relevant biomedical evidence."],
              ["03", "Analyze", "AI synthesizes the retrieved information."],
              ["04", "Verify", "Review the sources behind the answer."],
            ].map(([number, title, text]) => (

              <div
                key={number}
                className="group relative text-center"
              >

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5 text-sm font-bold text-cyan-400 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-400/10">
                  {number}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {text}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESEARCH ================= */}
      <section id="research" className="mx-auto max-w-5xl px-6 py-24">

        <div className="relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-cyan-400/[0.03] p-8 md:p-12">

          <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Research workspace
            </p>

            <h2 className="mt-5 text-4xl font-bold">
              Your research question starts here.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
              This interface will become the core BIOSAGE AI research assistant
              your team builds during the hackathon.
            </p>

          </div>

          <div className="relative mt-10">

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: What is known about metformin and cancer?"
              className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-[#050816] p-5 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
            />

            <button
              onClick={() => {
                alert(
                  "The BIOSAGE AI research engine will be connected here next."
                );
              }}
              className="mt-4 w-full rounded-2xl bg-cyan-400 py-4 font-semibold text-black shadow-lg shadow-cyan-400/10 transition hover:bg-cyan-300"
            >
              Search Biomedical Evidence →
            </button>
          </div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-5xl text-center">

          <div className="text-5xl text-cyan-400/40">
            “
          </div>

          <p className="mx-auto mt-3 max-w-3xl text-2xl font-medium leading-10 text-gray-300 md:text-3xl">
            Every dataset contains a signal.
            <span className="text-cyan-400">
              {" "}BIOSAGE helps researchers find it.
            </span>
          </p>

          <div className="mx-auto mt-8 h-px w-24 bg-cyan-400/40" />

          <p className="mt-5 text-xs uppercase tracking-[0.3em] text-gray-600">
            BIOSAGE AI
          </p>

        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="border-t border-white/10 px-6 py-24">

        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Trust & transparency
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Designed for evidence, not guesswork.
            </h2>

          </div>

          <div className="space-y-4">

            {[
              [
                "Grounded",
                "Answers should be supported by retrieved biomedical sources.",
              ],
              [
                "Transparent",
                "Users should be able to distinguish evidence from AI synthesis.",
              ],
              [
                "Uncertainty-aware",
                "When evidence is incomplete, BIOSAGE should say so.",
              ],
            ].map(([title, text]) => (

              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20"
              >

                <h3 className="text-lg font-semibold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {text}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-6 pb-24 pt-12">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center md:px-12">

          <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative">

            <h2 className="text-4xl font-bold md:text-5xl">
              Research faster.
              <span className="block text-cyan-400">
                Verify better.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-500">
              BIOSAGE brings biomedical evidence and AI-assisted research
              exploration into one workspace.
            </p>

            <button
              onClick={handleExplore}
              className="mt-8 rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black shadow-xl shadow-cyan-400/20 transition hover:-translate-y-1 hover:bg-cyan-300"
            >
              Explore BIOSAGE →
            </button>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm md:flex-row">

          <div>
            <span className="font-bold text-white">
              BIOSAGE AI
            </span>

            <span className="ml-3 text-gray-600">
              Biomedical Intelligence
            </span>
          </div>

          <p className="max-w-xl text-xs leading-6 text-gray-600 md:text-right">
            BIOSAGE is a research and informational tool. It is not intended
            to provide medical diagnosis, treatment recommendations, or
            medical advice.
          </p>

        </div>
      </footer>

    </main>
  );
}