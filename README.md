# gardening-helper-app
This repository contains the code to create a gardening helper which tells the process to plant and care for a particular species of flower

[![production-deployment-pipeline](https://github.com/fullstackmaddy/gardening-helper-app/actions/workflows/deploy.yaml/badge.svg)](https://github.com/fullstackmaddy/gardening-helper-app/actions/workflows/deploy.yaml)

Following is sample for settings.json

```json

{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "CustomVisionEndPoint": "https://Someendporint.cognitiveservices.azure.com",
    "CustomVisionPredictionKey":"5asdas5e6f953b43a9a40c12a0c4f00935",
    "CustomVisionIterationName": "Iteration_1",
    "CustomVisionProjectId": "145e6gt526-e9a2-4fe2-a76f-1e3e14bb9fcf",
    "TrefleAPIUrlBase": "http://trefle.io",
    "TrefleAPIToken":"Trefle API Token"
  }
}
```
