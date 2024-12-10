import os
from azure.identity import DefaultAzureCredential
credential = DefaultAzureCredential()
import asyncio
from azure.ai.evaluation import RelevanceEvaluator, CoherenceEvaluator, SimilarityEvaluator, F1ScoreEvaluator, BleuScoreEvaluator
import sys
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
    input_query = sys.argv[0]
    ground_truth = sys.argv[1]
    model_response = sys.argv[2]
    obj = {
        "query": "What are the questions raised in the ISO-NE PUBLIC problem statement/scoping discussion?",
        "ground_truth": "The questions raised in the ISO-NE PUBLIC problem statement/scoping discussion are: \n1. Is one mechanism more cost effective for the ISO to implement? \n2. Does one mechanism provide more comparable treatment of resources in the clearing of the auction? \n3. Would either auction format provide more information about lower cost resources; and would that information provide value to the marketplace (after the results)? \n4. Which mechanism better facilitates the inclusion and consideration of new resources in mitigation and reliability reviews? \nAdditionally, there are other issues raised such as the implications of using a single round DCA that includes the cap down to the floor and whether mitigated price effectively collapses the DCA into a sealed bid format. [20151202_stakeholder_feedback.pdf]",
        "response": "The questions raised in the ISO-NE PUBLIC problem statement/scoping discussion are as follows:\n\n1. Are there inherent differences between auction structures used to procure load vs. procure supply?\n2. If information sharing is a benefit of an open auction, why have that structure when price/quantity pairs within rounds do not reveal information to other suppliers?\n3. Would a more competitive auction feature allow all resources to enter bids at the same time and be held to the submitted prices?\n4. Can the DCA format be changed to share more information?\n5. Would one of the auction formats better facilitate a design where costs could determine overlapping impacts/queue positions?\n6. Does one of the auction formats better facilitate changes to, or more flexibility in, the current timelines?\n7. Does one auction design encourage bidders to focus more on their individual cost recovery needs vs. trying to discover the actions/behavior of other bidders?\n8. Does one mechanism better model complex zonal configurations?\n9. Does one mechanism better attract new entry?\n10. Does one mechanism better facilitate reliability reviews?\n11. Is one mechanism more cost effective for the ISO to implement?\n12. Does one mechanism provide more comparable treatment of resources in the clearing of the auction?"
    }

    evaluation_result = getOneQuestionEval(obj)
    
    print("Evaluation Results: ", evaluation_result)

if __name__ == "__main__":
    main()