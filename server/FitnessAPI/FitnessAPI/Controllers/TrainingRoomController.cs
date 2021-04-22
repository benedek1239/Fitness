using FitnessAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;


namespace FitnessAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrainingRoomController
    {
        private IMongoCollection<TrainingRoom> _trainingRoomColletion;

        public TrainingRoomController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _trainingRoomColletion = database.GetCollection<TrainingRoom>("trainingroom");
        }

        [HttpGet]
        public IEnumerable<TrainingRoom> Get()
        {
            return _trainingRoomColletion.Find(el => true).ToList();
        }

        [HttpPost]
        public IEnumerable<TrainingRoom> Create([FromBody] TrainingRoom trainingRoom)
        {
            Console.WriteLine(trainingRoom);
            _trainingRoomColletion.InsertOne(trainingRoom);
            var result = _trainingRoomColletion.Find(el => el.Id == trainingRoom.Id).ToList();
            return result;
        }
    }
}
