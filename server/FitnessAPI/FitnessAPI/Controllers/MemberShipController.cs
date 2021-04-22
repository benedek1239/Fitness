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

        private IMongoCollection<MemberShip> _shipwreckCollection;

        public MemberShipController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _shipwreckCollection = database.GetCollection<MemberShip>("membership");
        }

        [HttpGet]
        public IEnumerable<MemberShip> Get()
        {
            return _shipwreckCollection.Find(el => true).ToList();

        }

        [HttpGet("{id}")]
        public IEnumerable<MemberShip> Get(string id)
        {
            var idk = _shipwreckCollection.Find(el => el.Id == id).ToList();
            return idk;

        }

        [HttpPost]
        public IEnumerable<MemberShip> Create([FromBody] MemberShip shipwreck)
        {
            _shipwreckCollection.InsertOne(shipwreck);
           var idk = _shipwreckCollection.Find(el => el.Id == shipwreck.Id).ToList();

            return idk;
        }
    }
}
