import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");

    if (!query || !query.trim()) {
      return NextResponse.json(
        { error: "A search query is required." },
        { status: 400 }
      );
    }

    const encodedQuery = encodeURIComponent(query.trim());

    // STEP 1:
    // Search PubMed for matching paper IDs.
    const searchUrl =
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi` +
      `?db=pubmed` +
      `&term=${encodedQuery}` +
      `&retmode=json` +
      `&retmax=5`;

    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      throw new Error("PubMed search failed.");
    }

    const searchData = await searchResponse.json();

    const ids: string[] = searchData?.esearchresult?.idlist ?? [];

    if (ids.length === 0) {
      return NextResponse.json({
        query,
        count: 0,
        articles: [],
      });
    }

    // STEP 2:
    // Get metadata from PubMed.
    const summaryUrl =
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi` +
      `?db=pubmed` +
      `&id=${ids.join(",")}` +
      `&retmode=json`;

    const summaryResponse = await fetch(summaryUrl);

    if (!summaryResponse.ok) {
      throw new Error("PubMed article retrieval failed.");
    }

    const summaryData = await summaryResponse.json();

    // STEP 3:
    // Get detailed article records including abstracts.
    const fetchUrl =
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi` +
      `?db=pubmed` +
      `&id=${ids.join(",")}` +
      `&retmode=xml`;

    const fetchResponse = await fetch(fetchUrl);

    if (!fetchResponse.ok) {
      throw new Error("PubMed abstract retrieval failed.");
    }

    const xmlText = await fetchResponse.text();

    // Extract abstracts from the PubMed XML.
    const abstractMap: Record<string, string> = {};

    for (const id of ids) {
      const articleStart = xmlText.indexOf(`<PMID>${id}</PMID>`);

      if (articleStart === -1) {
        abstractMap[id] = "Abstract unavailable.";
        continue;
      }

      const nextArticle = xmlText.indexOf("<PubmedArticle>", articleStart + 1);

      const articleEnd =
        nextArticle === -1 ? xmlText.length : nextArticle;

      const articleXml = xmlText.slice(articleStart, articleEnd);

      const abstractMatches = [
        ...articleXml.matchAll(
          /<AbstractText(?:[^>]*)>([\s\S]*?)<\/AbstractText>/g
        ),
      ];

      if (abstractMatches.length === 0) {
        abstractMap[id] = "Abstract unavailable.";
      } else {
        abstractMap[id] = abstractMatches
          .map((match) =>
            match[1]
              .replace(/<[^>]+>/g, " ")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/\s+/g, " ")
              .trim()
          )
          .join(" ");
      }
    }

    // STEP 4:
    // Combine metadata + abstract.
    const articles = ids.map((id) => {
      const article = summaryData?.result?.[id];

      return {
        pmid: id,
        title: article?.title ?? "Title unavailable",
        journal:
          article?.fulljournalname ??
          article?.source ??
          "Journal unavailable",
        publicationDate:
          article?.pubdate ??
          article?.epubdate ??
          "Date unavailable",
        authors:
          article?.authors
            ?.slice(0, 4)
            ?.map((author: { name?: string }) => author.name)
            ?.filter(Boolean) ?? [],
        abstract: abstractMap[id] ?? "Abstract unavailable.",
        pubmedUrl: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      };
    });

    return NextResponse.json({
      query,
      count: articles.length,
      articles,
      source: "PubMed / NCBI E-utilities",
    });
  } catch (error) {
    console.error("PubMed API error:", error);

    return NextResponse.json(
      {
        error: "Unable to retrieve PubMed data.",
      },
      { status: 500 }
    );
  }
}