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
    public class EntriesController : ControllerBase
    {
        private IMongoCollection<Entries> _entries;

        public EntriesController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _entries = database.GetCollection<Entries>("entries");
        }

        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            var result = _entries.Find(el => el.ClientId == userId).ToList();
            if(result.Count < 0)
            {
                return StatusCode(404, new Response {Status="Not Found", Message="This client has no entries"});
            }
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Entries entrie)
        {
            entrie.Date = DateTime.UtcNow.ToString();
            _entries.InsertOne(entrie);

            return Ok();
        }

    }
}
