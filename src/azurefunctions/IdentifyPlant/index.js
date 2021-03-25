const msRest = require('@azure/ms-rest-js');
const predictionApi = require('@azure/cognitiveservices-customvision-prediction');
const util = require('util');
const fs = require('fs');



module.exports = async function (context, req) {

    context.log('Starting function Identify Plant');

    
    const image = req.body.image;

    context.log(image);
    var imageData = image.split("base64,")[1];

    if(imageData != null)
    {
        const result = await classifyImage(imageData, context);

        context.log("result returned is ");
        context.log(result);

        const predictions = result.predictions;

        const predictedTag = getHighestPrediction(predictions);

        context.log(`Predicted plant is ${predictedTag}`);

        context.log(predictedTag);

        context.res = {
            status: 200,
            body: {'identifiedPlant': predictedTag},
            headers: {
                'Content-Type': 'application/json'
            }
        };

    }
    else
    {
        context.res = {
            status: 400,
            body: {'error': 'imagedata is a mandatory field'}
        };
    }
    
}


async function classifyImage(imageString, context){

    const credentials = new msRest.ApiKeyCredentials(
        {
            inHeader: {
                "Prediction-key" : process.env["CustomVisionPredictionKey"]
            }            
        });
        
        const predictionEndpoint = process.env["CustomVisionEndPoint"];

        const projectId = process.env["CustomVisionProjectId"];
        const publishedIterationName = process.env["CustomVisionIterationName"];

        const predictionClient = new predictionApi.PredictionAPIClient(
            credentials, predictionEndpoint
        );
        
        context.log("Parsing Image data");

        const image = Buffer.from(imageString, 'base64');

        const result = await predictionClient.classifyImage(
            projectId, publishedIterationName, image
        );

        context.log("Retrieved response from prediction endpoint");

        return result;

}

function getHighestPrediction(predictions){
    const res = Object.values(predictions.reduce((acc, o) => {
        acc[o.name] = acc[o.name] || o;
        if (o.value > acc[o.name].value)
          acc[o.name] = o;
        return acc;
      }, {}));

      if(res == null || res[0].probability < 0.85)
      {
          return '';
      }
      else
      {
          return res[0].tagName;
      }
      
}