using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessAPI.AuthManager
{
    public interface IJwtAuthManager
    {
        string Authenticate(string useremail, string password);
    }
}
