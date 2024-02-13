using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Tatsvs.Models;

namespace Tatsvs.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;


        public HomeController(ILogger<HomeController> logger, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _logger = logger;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Authorization(AuthModel model)
        {
            try
            {
                /*User users = new()
                {
                    UserName = "paparik",
                    Email = "nigmatik12@mail.ru"
                };
                await _userManager.CreateAsync(users, "asd1asd");*/

                if (ModelState.IsValid)
                {
                    User? user = await _userManager.FindByNameAsync(model.Username);
                    if (user == null)
                    {
                        ModelState.AddModelError("Password", "Неверные логин или пароль");
                        return View("Index", model);
                    }
                    Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

                    if (!result.Succeeded)
                    {
                        ModelState.AddModelError("Password", "Неверные логин или пароль");
                        return View("Index", model);
                    }

                    return RedirectToAction("Index", "Home");
                }
                return View("Index");
            }
            catch (Exception ex) { return StatusCode(404); }
        }
    }
}