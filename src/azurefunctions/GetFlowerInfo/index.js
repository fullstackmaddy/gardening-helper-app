const axios = require('axios');

const url = require('url');

module.exports = async function (context, req) {
    // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    context.log("Retrieving information about the flower");

    const flowerName = context.bindingData.flowerName;

    if(flowerName != null)
    {
        
        var result = await getFlowerInformation(flowerName);

        context.res = {
            status: 200,
            body: result
        };
        


    }
}


async function getFlowerInformation(flowerName){
    const trefleApiBase = process.env["TrefleAPIUrlBase"];

    var searchUrl = new URL('api/v1/plants/search', trefleApiBase);

    searchUrl.searchParams.append('q', flowerName);
    searchUrl.searchParams.append('token', process.env["TrefleAPIToken"]);

    const plants = await axios.get(searchUrl.toString());

    const slug = plants.data.data[0].slug;

    var plantUrl = new URL(`api/v1/plants/${slug}`, trefleApiBase);

    plantUrl.searchParams.append('token', process.env["TrefleAPIToken"]);

    const plantInfo = await axios.get(plantUrl.toString());

    const specifications = plantInfo.data.data.main_species.specifications;
    const growth = plantInfo.data.data.main_species.growth;

    response = new Object();

    response["growthHabit"] = specifications.growth_habit;
    response["averageHeightInCms"] = specifications.average_height.cm;
    response["maxiumumHeightInCms"] = specifications.maximum_height.cm;
    response["maximumSoilPh"] = growth.ph_maximum;
    response["minimumSoilPh"]= growth.ph_minimum;

    if(growth.light > 7)
    {
        response["lightining"] = "bright";
    }
    if(growth.light< 5)
    {
        response["lightining"] = "low"
    }
    else
    {
        response["lightining"] = "medium"
    }

    if(growth.atmospheric_humidity >9)
    {
        response["amtosphericHumidity"] = "high";
    }
    if(growth.atmospheric_humidity <5)
    {
        response["amtosphericHumidity"] = "low";
    }
    else
    {
        response["amtosphericHumidity"] = "medium"
    }

   
    return response;
}

