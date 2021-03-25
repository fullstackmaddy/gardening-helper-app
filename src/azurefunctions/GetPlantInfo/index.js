const axios = require('axios');

const url = require('url');

module.exports = async function (context, req) {

    context.log("Retrieving information about the flower");

    const plantName = context.bindingData.plantName;

    context.log(`Plant name is ${plantName}`);

    if(plantName != null)
    {
        
        var result = await getPlantInformation(plantName);

        context.log(result);

        context.res = {
            status: 200,
            body: result,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        


    }
}


async function getPlantInformation(plantName){
    const trefleApiBase = process.env["TrefleAPIUrlBase"];

    var searchUrl = new URL('api/v1/plants/search', trefleApiBase);

    searchUrl.searchParams.append('q', plantName);
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

