using FitnessAPI.Authentication;
using FitnessAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;


namespace FitnessAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemberShipController : ControllerBase
    {

        private IMongoCollection<MemberShip> _membership;

        public MemberShipController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _membership = database.GetCollection<MemberShip>("membership");
        }

        [HttpGet]
        public IEnumerable<MemberShip> Get()
        {
            return _membership.Find(el => el.IsDeleted == "false").ToList();
        }

        [HttpGet("{id}")]
        public IEnumerable<MemberShip> Get(string id)
        {
            var idk = _membership.Find(el => el.Id == id).ToList();
            return idk;

        }

        [HttpGet("{roomId}/{isAdmin}")]
        public IEnumerable<MemberShip> Get(string roomId, bool isAdmin)
        {
            var idk = _membership.Find(el => el.RoomId == roomId && el.IsDeleted == "false").ToList();
            return idk;
        }

        [HttpPost]
        public IEnumerable<MemberShip> Create([FromBody] MemberShip shipwreck)
        {
            _membership.InsertOne(shipwreck);
            var idk = _membership.Find(el => el.Id == shipwreck.Id).ToList();

            return idk;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _membership.Find(el => el.Id == id).ToList();
            if (result.Count < 0)
            {
                return StatusCode(404, new Response { Status = "Not Found or Error", Message = "Membership not found" });
            }
            var filter = Builders<MemberShip>.Filter.Eq("Id", id);
            var update = Builders<MemberShip>.Update.Set("IsDeleted", "true");
            _membership.UpdateOne(filter, update);

            return Ok();
        }

    }
}
