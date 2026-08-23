import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const question = body.question;
    const articles = body.articles;

    if (!question || !Array.isArray(articles)) {
      return NextResponse.json(
        { error: "Question and articles are required." },
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

The researcher asked:

"${question}"

Below are biomedical literature records retrieved directly from PubMed.

${evidence}

Create a concise research synthesis based ONLY on the supplied evidence.

Rules:
- Do not invent facts or studies.
- Do not use outside knowledge to fill missing information.
- Do not provide medical advice.
- Clearly mention uncertainty.
- Refer to sources using [1], [2], [3], etc.
- If evidence is insufficient, say so.
- Do not claim a study proves something unless the supplied evidence supports that wording.

Return exactly:

SUMMARY

KEY FINDINGS

LIMITATIONS

EVIDENCE STRENGTH
Choose Low, Moderate, or High and briefly explain why.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are BIOSAGE AI, a careful biomedical research synthesis assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const synthesis =
      completion.choices[0]?.message?.content ||
      "Unable to generate synthesis.";

    return NextResponse.json({
      synthesis,
      sourceCount: articles.length,
    });
  } catch (error) {
    console.error("Groq synthesis error:", error);

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