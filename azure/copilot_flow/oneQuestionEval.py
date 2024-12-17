import os
from azure.identity import DefaultAzureCredential
credential = DefaultAzureCredential()
import asyncio
from azure.ai.evaluation import RelevanceEvaluator, CoherenceEvaluator, SimilarityEvaluator, F1ScoreEvaluator, BleuScoreEvaluator
import sys
import json
os.environ["AZURE_OPENAI_ENDPOINT"] = "https://shazamy2.openai.azure.com/"
os.environ["AZURE_OPENAI_API_KEY"] = "4kN4ICJzB3sPWUJZg8i4JkgqiBDEKdTW2ry5kl04HM42Zvqua3lCJQQJ99ALACYeBjFXJ3w3AAABACOGh10v"
os.environ["AZURE_OPENAI_DEPLOYMENT"] = "gpt-4o"
os.environ["AZURE_OPENAI_API_VERSION"] = "2024-10-21"

def getOneQuestionEval(object):

    model_config = {
        "azure_endpoint": os.environ.get("AZURE_OPENAI_ENDPOINT"),
        "api_key": os.environ.get("AZURE_OPENAI_API_KEY"),
        "azure_deployment": os.environ.get("AZURE_OPENAI_DEPLOYMENT"),
        "api_version": os.environ.get("AZURE_OPENAI_API_VERSION"),
    }

    relevance_eval = RelevanceEvaluator(model_config)
    coherence_eval = CoherenceEvaluator(model_config)
    similarity_eval = SimilarityEvaluator(model_config)
    f1_eval = F1ScoreEvaluator()

    query_response = dict(
        query=object['query'],
        ground_truth=object["ground_truth"], 
        response=object["response"]
    )   

    relevance_score = relevance_eval(
        **query_response
    )
    coherence_score = coherence_eval(
        **query_response
    )
    similarity_score = similarity_eval(
        **query_response
    )
    f1_score = f1_eval(
        **query_response
    )

    new_obj = {
        "query": object['query'], 
        "ground_truth": object['ground_truth'],
        "response": object['response'],
        "relevance": relevance_score["relevance"],
        "coherence": coherence_score["coherence"],
        "similarity": similarity_score["similarity"],
        "f1_score": f1_score["f1_score"]
    }

    return new_obj

def main():
    input_query = sys.argv[1]
    ground_truth = sys.argv[2]
    model_response = sys.argv[3]
    obj = {
        "query":input_query,
        "ground_truth": ground_truth,
        "response": model_response
    }

    evaluation_result = getOneQuestionEval(obj)

    print(json.dumps(evaluation_result), flush=True)

if __name__ == "__main__":
    main()