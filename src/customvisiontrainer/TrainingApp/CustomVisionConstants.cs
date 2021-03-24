using System;   
using System.Collections.Generic;
using System.Text;

namespace TrainingApp
{
    public static class CustomVisionConstants
    {
        public const string ProjectName = "Flower-Identification";

        public const string ProjectDescription = "This is project is built for identifying flowers.";

        /// You can obtain these values from the Keys and Endpoint page for your Custom Vision Prediction resource in the Azure Portal.
        public const string TrainingKey = "a31441f2dd104a7a885fcd934407e57f";

        // You can obtain these values from the Keys and Endpoint page for your Custom Vision Prediction resource in the Azure Portal.
        public const string TrainingEndpoint = "https://ai-gardening-helper-custom-vision-01.cognitiveservices.azure.com/";

        // You can obtain this value from the Properties page for your Custom Vision Prediction resource in the Azure Portal. See the "Resource ID" field. This typically has a value such as:
        // /subscriptions/<your subscription ID>/resourceGroups/<your resource group>/providers/Microsoft.CognitiveServices/accounts/<your Custom Vision prediction resource name>
        public const string PredictionResourceId ="/subscriptions/7d567fe6-c301-4658-ac28-86987b61e3b2/resourceGroups/rg-gardening-helper-01/providers/Microsoft.CognitiveServices/accounts/aigardeninghelperc-Prediction";

    }
}