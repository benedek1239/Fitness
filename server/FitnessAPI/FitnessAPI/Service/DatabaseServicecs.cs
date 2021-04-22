using FitnessAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessAPI.Service
{
    public class DatabaseServicecs
    {
        private IMongoCollection<MemberShip> _shipwreckCollection;

        public DatabaseServicecs()
        {
            var client = new MongoClient("mongodb://localhost:27017/");
            var database = client.GetDatabase("Fitness");
            _shipwreckCollection = database.GetCollection<MemberShip>("membership");
        }

        public List<MemberShip> Get() =>
            _shipwreckCollection.Find(el => true).ToList();
        
        public MemberShip Create(MemberShip shipwreck)
        {
            _shipwreckCollection.InsertOne(shipwreck);
            return shipwreck;
        }

        public MemberShip Get(string id) =>
            _shipwreckCollection.Find(el => el.Id == id).FirstOrDefault();
    }
}
