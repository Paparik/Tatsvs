using Tatsvs.Models.Navigation.Tables;

namespace Tatsvs.Models.Navigation
{
    public class NavigationElement
    {
        public string Title { get; set; }
        public List<Table> Tables { get; set; }
        public NavigationElement(string title, List<Table> tables)
        {

        }
    }
}