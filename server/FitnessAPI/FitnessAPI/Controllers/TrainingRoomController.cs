using FitnessAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;
using FitnessAPI.Authentication;

namespace FitnessAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrainingRoomController: ControllerBase
    {
        private IMongoCollection<TrainingRoom> _trainingRoomColletion;
        private IMongoCollection<ClientMemberships> _clientMemship;

        public TrainingRoomController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _trainingRoomColletion = database.GetCollection<TrainingRoom>("trainingroom");
            _clientMemship = database.GetCollection<ClientMemberships>("clientmembership");
        }

        [HttpGet]
        public IEnumerable<TrainingRoom> Get()
        {
            return _trainingRoomColletion.Find(el => el.IsDeleted == "false").ToList();
        }

        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            var clientMem = _clientMemship.Find(el => el.ClientId == userId).ToList();
            if(clientMem.Count < 0)
            {
                return StatusCode(404, new Response {Status="Error", Message= "This client have no membership yet" });
            }
            var roomResult = _trainingRoomColletion.Find(el => el.Id == clientMem[0].RoomId).ToList();
            return Ok(roomResult);
        }

        [HttpPost]
        public IEnumerable<TrainingRoom> Create([FromBody] TrainingRoom trainingRoom)
        {
            _trainingRoomColletion.InsertOne(trainingRoom);
            var result = _trainingRoomColletion.Find(el => el.Id == trainingRoom.Id).ToList();
            return result;
        }

        [HttpDelete("{id}")]
        public IActionResult  Delete(string id)
        {
            var result = _trainingRoomColletion.Find(el => el.Id == id).ToList();
            if (result.Count < 0)
            {
                return StatusCode(404, new Response { Status = "Not Found or Error", Message = "Training room not found" });
            }

            var filter = Builders<TrainingRoom>.Filter.Eq("Id", id);
            var update = Builders<TrainingRoom>.Update.Set("IsDeleted", "true");
            _trainingRoomColletion.UpdateOne(filter, update);

            return Ok();
        }
    }
}
