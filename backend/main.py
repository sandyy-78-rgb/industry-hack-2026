from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import xml.etree.ElementTree as ET

app = FastAPI(
    title="Biomedical AI API",
    description="Backend for Industry Hack 2026",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SearchRequest(BaseModel):
    query: str
    limit: int = 10


@app.get("/")
def root():
    return {
        "message": "Biomedical AI backend is running",
        "status": "ok"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/api/pubmed/search")
def search_pubmed(request: SearchRequest):

    if not request.query.strip():
        raise HTTPException(
            status_code=400,
            detail="Search query cannot be empty"
        )

    limit = min(max(request.limit, 1), 20)

    # STEP 1: Search PubMed
    search_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"

    search_params = {
        "db": "pubmed",
        "term": request.query,
        "retmode": "json",
        "retmax": limit,
        "sort": "relevance"
    }

    try:
        search_response = requests.get(
            search_url,
            params=search_params,
            timeout=15
        )
        search_response.raise_for_status()

        search_data = search_response.json()

        result = search_data["esearchresult"]

        pmids = result.get("idlist", [])
        total_count = result.get("count", "0")

        if not pmids:
            return {
                "query": request.query,
                "count": total_count,
                "results": []
            }

        # STEP 2: Fetch article details
        fetch_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"

        fetch_params = {
            "db": "pubmed",
            "id": ",".join(pmids),
            "retmode": "xml"
        }

        fetch_response = requests.get(
            fetch_url,
            params=fetch_params,
            timeout=20
        )
        fetch_response.raise_for_status()

        root = ET.fromstring(fetch_response.text)

        articles = []

        for article in root.findall(".//PubmedArticle"):

            # PMID
            pmid_element = article.find(".//PMID")
            pmid = (
                pmid_element.text
                if pmid_element is not None
                else ""
            )

            # Title
            title_element = article.find(".//ArticleTitle")
            title = (
                "".join(title_element.itertext())
                if title_element is not None
                else "No title available"
            )

            # Abstract
            abstract_parts = []

            for abstract_text in article.findall(".//Abstract/AbstractText"):
                text = "".join(abstract_text.itertext())

                label = abstract_text.attrib.get("Label")

                if label:
                    abstract_parts.append(f"{label}: {text}")
                else:
                    abstract_parts.append(text)

            abstract = " ".join(abstract_parts)

            if not abstract:
                abstract = "No abstract available"

            # Authors
            authors = []

            for author in article.findall(".//AuthorList/Author"):

                collective = author.find("CollectiveName")

                if collective is not None and collective.text:
                    authors.append(collective.text)
                    continue

                last_name = author.find("LastName")
                initials = author.find("Initials")

                name_parts = []

                if last_name is not None and last_name.text:
                    name_parts.append(last_name.text)

                if initials is not None and initials.text:
                    name_parts.append(initials.text)

                if name_parts:
                    authors.append(" ".join(name_parts))

            # Journal
            journal_element = article.find(".//Journal/Title")

            journal = (
                journal_element.text
                if journal_element is not None
                else "Unknown journal"
            )

            # Publication date
            year = article.find(".//PubDate/Year")
            month = article.find(".//PubDate/Month")
            medline_date = article.find(".//PubDate/MedlineDate")

            if year is not None and year.text:
                published = year.text

                if month is not None and month.text:
                    published += f"-{month.text}"

            elif medline_date is not None and medline_date.text:
                published = medline_date.text

            else:
                published = "Unknown date"

            articles.append({
                "pmid": pmid,
                "title": title,
                "authors": authors,
                "journal": journal,
                "published": published,
                "abstract": abstract,
                "pubmed_url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
            })

        return {
            "query": request.query,
            "count": total_count,
            "results": articles
        }

    except requests.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"PubMed request failed: {str(e)}"
        )

    except ET.ParseError:
        raise HTTPException(
            status_code=502,
            detail="Could not parse PubMed response"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Backend error: {str(e)}"
        )