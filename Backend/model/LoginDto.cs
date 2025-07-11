namespace Backend.model
{
    public class LoginDto
    {
        public required string Username { get; set; }  // Changed from Email to Username
        public required string Password { get; set; }
    }
}