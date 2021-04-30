using FitnessAPI.Authentication;
using FitnessAPI.AuthManager;
using FitnessAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateControllercs : ControllerBase
    {
        private readonly IJwtAuthManager jwTAuthenticationManager;
        private IMongoCollection<User> _user;

        public AuthenticateControllercs(IMongoClient client, IJwtAuthManager jwTAuthenticationManager)
        {
            var database = client.GetDatabase("Fitness");
            _user = database.GetCollection<User>("user");
            this.jwTAuthenticationManager = jwTAuthenticationManager;
        }



        [HttpPost]
        [Route("/login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var resultUser = _user.Find(el => el.UserEmail == loginModel.UserEmail && el.Password == loginModel.Password).ToList();
            if(resultUser.Count == 0)
            {
                return StatusCode(500, new Response { Status = "Error", Message = "Invalid username or password" });
            }

            var token = jwTAuthenticationManager.Authenticate(loginModel.UserEmail, loginModel.Password);
            if(token == null)
            {
                return Unauthorized();
            }

            var result = new Result { Token = token, Id = resultUser[0].Id, Email = resultUser[0].UserEmail, UserName = resultUser[0].UserName, Type = resultUser[0].Type };

            return Ok(result);

        }

        [HttpPost]
        [Route("/register")]
        public IActionResult Register([FromBody] User registerModel)
        {
            var resultUser = _user.Find(el => el.UserEmail == registerModel.UserEmail).ToList();
            if (resultUser.Count > 0)
            {
                return StatusCode(500, new Response { Status = "Error", Message = "User already exists" });
            }

            
            _user.InsertOne(registerModel);

            var token = jwTAuthenticationManager.Authenticate(registerModel.UserEmail, registerModel.Password);
            if (token == null)
            {
                return Unauthorized();
            }

            var result = new Result { Token = token, Id = registerModel.Id, Email = registerModel.UserEmail, UserName = registerModel.UserName, Type = registerModel.Type };

            return Ok(result);

        }
    }
}
