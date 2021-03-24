using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrainingApp
{
    public interface ICustomVisionHelper
    {
        public Task CreateProjectAsync(string name, string description);

        public Task BatchUploadImagesAsync(string directoryPath);

        public Task TrainProjectAsync();

        public Task PublishIterationAsync(string predictionResourceId);

    }
}