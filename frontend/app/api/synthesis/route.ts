import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const question = body.question;
    const articles = body.articles;

    if (!question || !articles || !Array.isArray(articles)) {
      return NextResponse.json(
        {
          error: "Question and articles are required.",
        },
        { status: 400 }
      );
    }

    const evidence = articles
      .map(
        (
          article: {
            pmid: string;
            title: string;
            journal: string;
            publicationDate: string;
            authors: string[];
            abstract?: string;
          },
          index: number
        ) => `
SOURCE [${index + 1}]
PMID: ${article.pmid}
Title: ${article.title}
Journal: ${article.journal}
Publication date: ${article.publicationDate}
Authors: ${article.authors?.join(", ") || "Not available"}

ABSTRACT:
${article.abstract || "Abstract unavailable."}
`
      )
      .join("\n");

    const prompt = `
You are BIOSAGE AI, a biomedical research assistant.

The user asked:

"${question}"

Below are real biomedical literature records retrieved directly from PubMed.
Each source may contain an abstract.

${evidence}

Create a concise, evidence-grounded research synthesis based ONLY on
the supplied PubMed information.

IMPORTANT RULES:

1. Base claims primarily on the supplied abstracts and article information.
2. Do not invent facts, studies, compounds, results, statistics, or citations.
3. Do not use outside knowledge to fill missing information.
4. Clearly distinguish AI-generated synthesis from retrieved evidence.
5. Do not provide medical advice, diagnosis, or treatment recommendations.
6. Mention uncertainty or limitations when evidence is insufficient.
7. Refer to supporting sources using [1], [2], [3], etc.
8. Keep the answer suitable for biomedical researchers.
9. Do not claim that a paper proves something if it only investigates,
   reports, or suggests it.
10. If the retrieved papers are not directly relevant to the question,
    explicitly say so.
11. If an abstract is unavailable, do not assume what the paper found.

Return exactly these sections:

SUMMARY

A concise synthesis of the most relevant evidence.

KEY FINDINGS

3 to 5 important findings. Include source numbers such as [1] or [2].

LIMITATIONS

Important gaps, uncertainty, study limitations, or relevance issues.

EVIDENCE STRENGTH

Choose one:
Low
Moderate
High

Then briefly explain why.
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    return NextResponse.json({
      synthesis: response.output_text,
      sourceCount: articles.length,
    });
  } catch (error) {
  console.error("AI synthesis error:", error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "Unknown AI synthesis error.",
    },
    { status: 500 }
  );
}
}