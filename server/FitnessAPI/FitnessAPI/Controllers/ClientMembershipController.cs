using FitnessAPI.Authentication;
using FitnessAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientMembershipController : ControllerBase
    {

        private IMongoCollection<ClientMemberships> _clientMembership;

        public ClientMembershipController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _clientMembership = database.GetCollection<ClientMemberships>("clientmembership");
        }

        // GET api/<ClientMembershipController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var result = _clientMembership.Find(el => el.ClientId == id).ToList();
            if(result.Count < 0)
            {
                return StatusCode(404, new Response { Status = "Not Found", Message = "User has no Memberships or the client id is incorrect" });
            }

            return Ok(result);
        }

        // POST api/<ClientMembershipController>
        [HttpPost]
        public IActionResult Post([FromBody] ClientMemberships value)
        {
            var check = _clientMembership.Find(el => el.RoomId == value.RoomId && el.ClientId == value.ClientId).ToList();
            if(check.Count > 0)
            {
                return StatusCode(403, new Response { Status="Error", Message="Sorry but this user already have a membership in this room" });
            }
            _clientMembership.InsertOne(value);
            return Ok(new Response {Status = "success", Message="Nice" });
        }

        // DELETE api/<ClientMembershipController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _clientMembership.Find(el => el.Id == id).ToList();
            if(result.Count < 0)
            {
                return StatusCode(404, new Response { Status = "Not Found or Error", Message = "Client membership not found" });
            }

            var filter = Builders<ClientMemberships>.Filter.Eq("Id", id);
            var update = Builders<ClientMemberships>.Update.Set("IsDeleted", "true");
            _clientMembership.UpdateOne(filter, update);

            return Ok();
        }
    }
}
